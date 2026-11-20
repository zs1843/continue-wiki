import { activeHeadingIndex } from '../lib/outline.mjs';

const storage = {
  get(key: string) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key: string, value: string) { try { localStorage.setItem(key, value); } catch { /* 阅读不依赖存储权限 */ } },
};

const menu = document.querySelector<HTMLButtonElement>('.menu-button')!;
const sidebar = document.querySelector<HTMLElement>('.sidebar')!;
const workspace = document.querySelector<HTMLElement>('.workspace')!;
const supportsPin = matchMedia('(min-width: 640px)');
const pinButton = document.querySelector<HTMLButtonElement>('.pin-toggle')!;
let pinnedPreference = storage.get('ai-wiki:sidebar-mode') !== 'floating';
let drawerOpen = false;
function syncLayout() {
  const pinned = supportsPin.matches && pinnedPreference;
  document.documentElement.dataset.sidebarMode = pinned ? 'pinned' : 'floating';
  document.body.classList.toggle('drawer-open', !pinned && drawerOpen);
  sidebar.inert = !pinned && !drawerOpen;
  workspace.inert = !pinned && drawerOpen;
  menu.setAttribute('aria-expanded', String(pinned || drawerOpen));
  menu.setAttribute('aria-label', drawerOpen ? '关闭目录' : '打开目录');
  pinButton.setAttribute('aria-pressed', String(pinned));
  pinButton.setAttribute('aria-label', pinned ? '取消固定目录' : '固定目录');
  pinButton.title = pinned ? '取消固定，收起目录' : '固定目录，阅读时保持展开';
}
function setDrawer(open: boolean) {
  drawerOpen = open;
  syncLayout();
  if (open) sidebar.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
  else menu.focus();
}
menu.addEventListener('click', () => setDrawer(!drawerOpen));
pinButton.addEventListener('click', () => {
  pinnedPreference = !pinnedPreference;
  drawerOpen = false;
  storage.set('ai-wiki:sidebar-mode', pinnedPreference ? 'pinned' : 'floating');
  syncLayout();
  if (!pinnedPreference) menu.focus();
});
document.querySelector('.drawer-close')?.addEventListener('click', () => setDrawer(false));
document.querySelector('.drawer-shade')?.addEventListener('click', () => setDrawer(false));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !document.querySelector('dialog[open]') && document.body.classList.contains('drawer-open')) setDrawer(false);
  if (event.key === 'Tab' && document.body.classList.contains('drawer-open')) {
    const focusable = [...sidebar.querySelectorAll<HTMLElement>('a,button,summary')].filter(el => el.getClientRects().length);
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
});
supportsPin.addEventListener('change', () => {
  drawerOpen = false;
  syncLayout();
});
syncLayout();

document.querySelectorAll<HTMLElement>('.prose :is(h1,h2,h3,h4,h5,h6)[id]').forEach(heading => {
  if (heading.querySelector('a')) return;
  const anchor = document.createElement('a');
  anchor.href = `#${heading.id}`;
  anchor.className = 'heading-anchor';
  anchor.textContent = '#';
  anchor.setAttribute('aria-label', `链接到：${heading.textContent}`);
  heading.append(anchor);
});
document.querySelectorAll<HTMLPreElement>('.prose pre').forEach(pre => {
  const code = pre.querySelector('code');
  if (!code) return;
  const button = document.createElement('button');
  button.className = 'copy-code';
  button.textContent = '复制';
  button.setAttribute('aria-label', '复制代码');
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent ?? '');
      button.textContent = '已复制';
    } catch { button.textContent = '请选中复制'; }
    setTimeout(() => { button.textContent = '复制'; }, 1800);
  });
  pre.append(button);
});

const dialog = document.querySelector<HTMLDialogElement>('#search-dialog')!;
let initialized = false;
let searchTrigger: HTMLElement | null = null;
async function openSearch(trigger?: HTMLElement) {
  searchTrigger = trigger ?? [...document.querySelectorAll<HTMLElement>('.search-trigger')].find(el => !el.closest('[inert]') && el.getClientRects().length) ?? null;
  dialog.showModal();
  if (!initialized) {
    initialized = true;
    try {
      await new Promise<void>((resolve, reject) => {
        if ('PagefindUI' in window) return resolve();
        const script = document.createElement('script');
        script.src = '/pagefind/pagefind-ui.js';
        script.onload = () => resolve();
        script.onerror = () => { script.remove(); reject(new Error('Search unavailable')); };
        document.head.append(script);
      });
      document.querySelector('#search')!.replaceChildren();
      const SearchUI = (window as unknown as { PagefindUI: new (options: object) => unknown }).PagefindUI;
      new SearchUI({ element: '#search', showSubResults: true, showImages: false, resetStyles: false, translations: { placeholder: '试试“上下文”或 Function Calling', zero_results: '没有找到“[SEARCH_TERM]”相关笔记', clear_search: '清空', searching: '正在查找…', load_more: '更多结果' } });
    } catch {
      initialized = false;
      const message = document.createElement('p');
      message.className = 'search-loading';
      message.textContent = '搜索暂时不可用，请稍后再试。';
      document.querySelector('#search')!.replaceChildren(message);
    }
  }
  dialog.querySelector<HTMLInputElement>('input')?.focus();
}
document.querySelectorAll<HTMLElement>('.search-trigger').forEach(trigger => trigger.addEventListener('click', () => openSearch(trigger)));
document.querySelector('.close-search')?.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const r = dialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
});
dialog.addEventListener('close', () => searchTrigger?.focus());
document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); if (!dialog.open) openSearch(); }
});

// Keep the outline in sync with the document; only scroll its own list when following.
const outline = document.querySelector<HTMLElement>('.outline-nav');
if (outline) {
  const entries = [...outline.querySelectorAll<HTMLAnchorElement>('a[data-heading-id]')]
    .map(link => ({ link, heading: document.getElementById(link.dataset.headingId ?? '') }))
    .filter((entry): entry is { link: HTMLAnchorElement; heading: HTMLElement } => entry.heading !== null);
  let active = -1;
  let scheduled = false;
  function updateOutline() {
    scheduled = false;
    const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const readingLine = Math.max(padding, document.querySelector('.topbar')!.getBoundingClientRect().bottom + 24) + 8;
    const atEnd = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    const next = activeHeadingIndex(entries.map(({ heading }) => heading.getBoundingClientRect().top), readingLine, atEnd);
    if (next === active) return;
    if (active >= 0) entries[active].link.removeAttribute('aria-current');
    active = next;
    if (active < 0) return;
    const link = entries[active].link;
    link.setAttribute('aria-current', 'location');
    const viewport = outline!.getBoundingClientRect();
    const item = link.getBoundingClientRect();
    if (viewport.height && item.top < viewport.top + 8) outline!.scrollTop -= viewport.top + 8 - item.top;
    else if (viewport.height && item.bottom > viewport.bottom - 8) outline!.scrollTop += item.bottom - viewport.bottom + 8;
  }
  function scheduleOutline() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateOutline); }
  }
  window.addEventListener('scroll', scheduleOutline, { passive: true });
  window.addEventListener('resize', scheduleOutline);
  window.addEventListener('hashchange', scheduleOutline);
  window.addEventListener('pageshow', scheduleOutline);
  const prose = document.querySelector('.prose');
  if (prose) new ResizeObserver(scheduleOutline).observe(prose);
  document.fonts.ready.then(scheduleOutline);
  updateOutline();
}
