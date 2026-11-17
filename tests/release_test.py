import hashlib
import importlib.util
import io
import json
from pathlib import Path
import subprocess
import sys
import tarfile
import tempfile
import unittest

SCRIPT = Path(__file__).resolve().parents[1] / 'scripts' / 'release.py'


class ReleaseTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(prefix='ai-wiki-release-')
        self.root = Path(self.tmp.name).resolve() / 'site'
        self.call('prepare')

    def tearDown(self):
        self.tmp.cleanup()

    def call(self, action, release=None, succeeds=True, root=None):
        result = subprocess.run([sys.executable, str(SCRIPT), action, str(root or self.root), *([release] if release else [])], capture_output=True, text=True)
        self.assertEqual(result.returncode == 0, succeeds, result.stdout + result.stderr)
        return result

    def archive(self, release, corrupt=False, unsafe=False):
        files = {'index.html': b'<h1>Home</h1>', '404.html': b'Not found', 'sitemap.xml': b'<urlset/>', 'favicon.svg': b'<svg/>', 'pagefind/search.js': b'index'}
        manifest = {'version': 1, 'files': {name: hashlib.sha256(content).hexdigest() for name, content in files.items()}}
        if corrupt:
            files['index.html'] = b'Corrupted'
        files['release-manifest.json'] = json.dumps(manifest).encode()
        archive = self.root / 'uploads' / f'{release}.tar.gz'
        with tarfile.open(archive, 'w:gz') as tar:
            for name, content in files.items():
                info = tarfile.TarInfo(name)
                info.size = len(content)
                tar.addfile(info, io.BytesIO(content))
            if unsafe:
                info = tarfile.TarInfo('../escape.txt')
                info.size = 1
                tar.addfile(info, io.BytesIO(b'x'))

    def test_publish_failure_rollback_and_retention(self):
        ids = [f'20261117T00000{i}Z-0000000{i}' for i in range(1, 6)]
        first, second, corrupt, fourth, fifth = ids
        self.archive(first)
        self.call('publish', first)
        self.assertEqual((self.root / 'current').readlink().as_posix(), f'releases/{first}')
        self.archive(corrupt, corrupt=True)
        self.call('publish', corrupt, succeeds=False)
        self.assertEqual((self.root / 'current').readlink().as_posix(), f'releases/{first}')
        for release in [second, fourth, fifth]:
            self.archive(release)
            self.call('publish', release)
        self.assertEqual(len(list((self.root / 'releases').iterdir())), 3)
        self.assertFalse((self.root / 'releases' / first).exists())
        self.call('rollback', second)
        self.assertEqual((self.root / 'current').readlink().as_posix(), f'releases/{second}')
        versions = self.call('list').stdout
        self.assertIn(f'{second} (current)', versions)
        self.assertNotIn(first, versions)
        self.call('rollback', corrupt, succeeds=False)
        self.assertEqual((self.root / 'current').readlink().as_posix(), f'releases/{second}')

    def test_archive_traversal_is_rejected(self):
        release = '20261117T000001Z-00000001'
        self.archive(release, unsafe=True)
        self.call('publish', release, succeeds=False)
        self.assertFalse((self.root / 'releases' / 'escape.txt').exists())
        self.assertFalse((self.root / 'current').exists())

    def test_unmanaged_directory_and_symlink_are_rejected(self):
        existing = Path(self.tmp.name).resolve() / 'existing-site'
        existing.mkdir()
        (existing / 'keep.txt').write_text('keep')
        self.call('prepare', root=existing, succeeds=False)
        self.assertEqual((existing / 'keep.txt').read_text(), 'keep')
        linked = Path(self.tmp.name).resolve() / 'linked'
        linked.symlink_to(self.root)
        self.call('prepare', root=linked, succeeds=False)

    def test_current_real_directory_is_preserved(self):
        (self.root / 'current').mkdir()
        (self.root / 'current' / 'keep.txt').write_text('keep')
        release = '20261117T000001Z-00000001'
        self.archive(release)
        self.call('publish', release, succeeds=False)
        self.assertEqual((self.root / 'current' / 'keep.txt').read_text(), 'keep')


if __name__ == '__main__':
    unittest.main(verbosity=2)
