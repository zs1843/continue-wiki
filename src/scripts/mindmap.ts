import { Markmap, resolveViewOptions } from '@markmap/view';

const panel = document.querySelector<HTMLElement>('.map-viewer')!;
const svg = panel.querySelector<SVGSVGElement>('.knowledge-map')!;
const status = panel.querySelector<HTMLElement>('.map-status')!;
const fullscreen = panel.querySelector<HTMLButtonElement>('[data-map-action="fullscreen"]')!;
const buttons = panel.querySelectorAll<HTMLButtonElement>('[data-map-action]');
const loading = panel.querySelector<HTMLElement>('.map-loading')!;
let map: Markmap;
let frame = 0;
let previousFocus: HTMLElement | null = null;
let previousOverflow = '';

function isFullscreen() {
  return document.fullscreenElement === panel || panel.classList.contains('map-expanded');
}
function updateFullscreen() {
  const active = isFullscreen();
  fullscreen.setAttribute('aria-pressed', String(active));
  fullscreen.querySelector('span')!.textContent = active ? '退出全屏' : '全屏查看';
}
function setExpanded(active: boolean) {
  if (active) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  } else document.body.style.overflow = previousOverflow;
  panel.classList.toggle('map-expanded', active);
}
async function toggleFullscreen() {
  if (isFullscreen()) {
    if (document.fullscreenElement === panel) await document.exitFullscreen();
    else setExpanded(false);
    updateFullscreen();
    previousFocus?.focus({ preventScroll: true });
    return;
  }
  previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  // 支持时使用浏览器全屏；受嵌入环境或设备限制时展开到整个页面视口。
  try {
    if (!panel.requestFullscreen || !document.fullscreenEnabled) throw new Error('Fullscreen unavailable');
    await panel.requestFullscreen();
  } catch { setExpanded(true); }
  updateFullscreen();
  fullscreen.focus({ preventScroll: true });
}

async function initialize() {
  try {
    await document.fonts.ready;
    const root = JSON.parse(panel.querySelector('#mindmap-data')!.textContent!);
    const { options } = resolveViewOptions({}, {
      theme: 'cards', layout: 'two-sided', foldLevel: 2,
      color: ['#52796b', '#7b83a5', '#b2915c', '#6e9299', '#9780a1'], colorDepth: 2,
      wrapWidth: 220, levelGap: 64, siblingGap: 12,
      fitPadding: 32, fitMaxScale: 1.25, duration: 180,
    });
    map = Markmap.create(svg, root, options);
    const describeLinks = () => {
      svg.querySelectorAll<SVGAElement>('a[href]').forEach(link => {
        const label = link.previousElementSibling?.textContent?.trim();
        if (label) link.setAttribute('aria-label', label);
        link.setAttribute('target', '_self');
      });
    };
    // 动画会逐帧替换 SVG 内容，在新链接进入 DOM 后补上名称和跳转方式。
    const linkObserver = new MutationObserver(describeLinks);
    linkObserver.observe(svg, { childList: true, subtree: true });
    describeLinks();
    map.fit();
    loading.hidden = true;
    panel.dataset.ready = 'true';
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => map.fit());
    });
    observer.observe(panel.querySelector('.map-canvas')!);
    window.addEventListener('pagehide', event => {
      if (event.persisted) return;
      observer.disconnect(); linkObserver.disconnect(); cancelAnimationFrame(frame); map.destroy();
    }, { once: true });
  } catch {
    loading.textContent = '导图暂时无法显示，可以在下方按列表阅读知识点。';
    buttons.forEach(button => { button.disabled = true; });
    panel.dataset.ready = 'error';
    document.querySelector<HTMLDetailsElement>('.map-outline')!.open = true;
  }
}
buttons.forEach(button => button.addEventListener('click', () => {
  if (!map) return;
  switch (button.dataset.mapAction) {
    case 'zoom-in': map.zoomIn(); break;
    case 'zoom-out': map.zoomOut(); break;
    case 'fit': map.fit(); break;
    case 'expand': map.expandAll(); map.fit(); break;
    case 'collapse': map.foldToLevel(1); map.fit(); break;
    case 'fullscreen': toggleFullscreen().catch(() => { status.textContent = '无法切换全屏，请稍后重试。'; }); break;
  }
}));
document.addEventListener('fullscreenchange', updateFullscreen);
document.addEventListener('keydown', event => {
  if (!panel.classList.contains('map-expanded')) return;
  if (event.key === 'Escape') {
    setExpanded(false); updateFullscreen(); previousFocus?.focus({ preventScroll: true });
  } else if (event.key === 'Tab') {
    const elements = [...panel.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],[tabindex="0"]')].filter(el => el.getClientRects().length);
    const first = elements[0], last = elements.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
});
// 内部笔记在当前页定位；修饰键继续保留浏览器的新标签页操作。
svg.addEventListener('click', event => {
  const link = event.target instanceof Element ? event.target.closest('a') : null;
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
  const href = link.getAttribute('href');
  if (!href?.startsWith('/notes/')) return;
  event.preventDefault();
  window.location.assign(href);
});
initialize();
