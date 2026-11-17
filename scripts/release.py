"""Server-side release utility. Linux + Python standard library only."""
import fcntl
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import sys
import tarfile

MARKER = '.ai-wiki-root'
MANIFEST = 'release-manifest.json'


def safe_root(value):
    root = Path(value)
    if not root.is_absolute() or len(root.parts) < 3 or '..' in root.parts:
        raise ValueError('Deployment root must be a dedicated absolute directory')
    for parent in [root, *root.parents]:
        if parent.is_symlink():
            raise ValueError('Deployment root cannot contain symlinks')
    return root


def prepare(root):
    if root.exists() and not (root / MARKER).is_file() and any(root.iterdir()):
        raise ValueError('Refusing to initialize a nonempty unmanaged directory')
    root.mkdir(parents=True, exist_ok=True)
    marker = root / MARKER
    if marker.is_symlink():
        raise ValueError('Invalid root marker')
    marker.touch(exist_ok=True)
    for name in ['releases', 'uploads']:
        directory = root / name
        if directory.is_symlink():
            raise ValueError('Managed directory cannot be a symlink')
        directory.mkdir(exist_ok=True)


def valid_id(value):
    if not re.fullmatch(r'\d{8}T\d{6}Z-[a-f0-9]{8}', value):
        raise ValueError('Invalid release ID')
    return value


def validate_release(directory):
    if (directory / MANIFEST).is_symlink():
        raise ValueError('Manifest cannot be a symlink')
    manifest = json.loads((directory / MANIFEST).read_text())
    files = manifest.get('files')
    if manifest.get('version') != 1 or not isinstance(files, dict) or not files:
        raise ValueError('Invalid release manifest')
    required = {'index.html', '404.html', 'sitemap.xml', 'favicon.svg'}
    if not required.issubset(files) or not any(p.startswith('pagefind/') for p in files):
        raise ValueError('Release is incomplete')
    actual = set()
    for item in directory.rglob('*'):
        if item.is_symlink():
            raise ValueError('Release contains a symlink')
        if item.is_file() and item.name != MANIFEST:
            actual.add(item.relative_to(directory).as_posix())
    if actual != set(files):
        raise ValueError('Manifest file list mismatch')
    for name, expected in files.items():
        relative = Path(name)
        if relative.is_absolute() or '..' in relative.parts or not re.fullmatch(r'[a-f0-9]{64}', str(expected)):
            raise ValueError('Invalid manifest entry')
        if hashlib.sha256((directory / relative).read_bytes()).hexdigest() != expected:
            raise ValueError('Release checksum mismatch')


def switch(root, release_id):
    current = root / 'current'
    if current.exists() and not current.is_symlink():
        raise ValueError('Refusing to replace a real current directory')
    temporary = root / '.current-next'
    if os.path.lexists(temporary):
        raise ValueError('Temporary switch path already exists')
    temporary.symlink_to(f'releases/{release_id}')
    try:
        os.replace(temporary, current)
    finally:
        if temporary.is_symlink():
            temporary.unlink()


def prune(root, active):
    releases = root / 'releases'
    candidates = sorted([p for p in releases.iterdir() if re.fullmatch(r'\d{8}T\d{6}Z-[a-f0-9]{8}', p.name) and p.is_dir() and not p.is_symlink()], reverse=True)
    keep = {active}
    for candidate in candidates:
        if len(keep) < 3:
            keep.add(candidate.name)
    for candidate in candidates:
        if candidate.name not in keep:
            # Never traverse a symlink during cleanup, even if a tree was externally changed.
            if any(p.is_symlink() for p in candidate.rglob('*')):
                raise ValueError('Refusing to prune a release containing symlinks')
            shutil.rmtree(candidate)


def publish(root, release_id):
    archive = root / 'uploads' / f'{release_id}.tar.gz'
    destination = root / 'releases' / release_id
    staging = root / 'releases' / f'.{release_id}.incoming'
    if destination.exists() or staging.exists() or staging.is_symlink() or destination.is_symlink():
        raise ValueError('Release already exists')
    if archive.is_symlink():
        raise ValueError('Archive cannot be a symlink')
    staging.mkdir()
    try:
        with tarfile.open(archive, 'r:gz') as tar:
            members = tar.getmembers()
            if len(members) > 50000 or sum(m.size for m in members) > 512 * 1024 * 1024:
                raise ValueError('Archive exceeds release limits')
            names = set()
            for member in members:
                member_path = Path(member.name)
                if member_path.is_absolute() or '..' in member_path.parts or not (member.isdir() or member.isfile()):
                    raise ValueError('Unsafe archive entry')
                normalized = member_path.as_posix()
                if normalized in names:
                    raise ValueError('Duplicate archive entry')
                names.add(normalized)
            if hasattr(tarfile, 'data_filter'):
                tar.extractall(staging, members=members, filter='data')
            else:
                # Older Python: names/types were validated above; links are forbidden.
                tar.extractall(staging, members=members)
        validate_release(staging)
        staging.rename(destination)
        switch(root, release_id)
    except Exception:
        if staging.exists():
            shutil.rmtree(staging)
        raise
    finally:
        if archive.exists() and not archive.is_symlink():
            archive.unlink()
    # A cleanup problem does not roll back an already validated successful switch.
    try:
        prune(root, release_id)
    except Exception:
        print('Warning: release is live; old-release cleanup needs attention', file=sys.stderr)
    print(f'Published {release_id}')


def main():
    action, root_value, *args = sys.argv[1:]
    root = safe_root(root_value)
    if action not in ['prepare', 'publish', 'rollback', 'list']:
        raise ValueError('Unsupported action')
    prepare(root)
    lock_path = root / '.release.lock'
    if lock_path.is_symlink():
        raise ValueError('Invalid lock path')
    with lock_path.open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        if action == 'prepare':
            print('Deployment directory ready')
        elif action == 'publish':
            publish(root, valid_id(args[0]))
        elif action == 'rollback':
            release_id = valid_id(args[0])
            target = root / 'releases' / release_id
            if target.is_symlink():
                raise ValueError('Rollback target cannot be a symlink')
            validate_release(target)
            switch(root, release_id)
            print(f'Rolled back to {release_id}')
        elif action == 'list':
            current = root / 'current'
            active = current.readlink().name if current.is_symlink() else None
            for release in sorted((root / 'releases').iterdir(), reverse=True):
                if re.fullmatch(r'\d{8}T\d{6}Z-[a-f0-9]{8}', release.name) and release.is_dir() and not release.is_symlink():
                    print(f'{release.name}' + (' (current)' if release.name == active else ''))


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        print(f'Release failed: {error}', file=sys.stderr)
        sys.exit(1)
