/** Custom cursor. Only for real mice (hover + fine pointer). The rAF loop sleeps when the
 *  cursor has settled and when the tab is hidden, so it costs nothing at rest. */
export function initCursor(): void {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cursor = document.querySelector<HTMLElement>('.mc-cursor');
  const core = document.querySelector<HTMLElement>('.mc-cur-core');
  const sight = document.querySelector<HTMLElement>('.mc-cur-sight');
  if (!cursor || !core || !sight) return;

  // cursor:none is applied only once this script is running
  document.documentElement.classList.add('has-cursor');

  const BASE_LERP = 0.12;
  const SELECTOR = 'a, button, .mc-avatar-w, .mc-rank-circle, .mc-soc-item, .burger-btn';
  const MAGNETIC = 'button, .mc-avatar-w, .mc-rank-circle, .burger-btn';

  let tx = -100, ty = -100;
  let cx = tx, cy = ty;
  let sx = tx, sy = ty;
  let last = performance.now();
  let raf = 0;
  let hovered = false;
  let magnet: { el: HTMLElement; x: number; y: number } | null = null;

  const frame = (now: number) => {
    const dt = Math.min((now - last) / 16.666, 3);
    last = now;
    const kc = 1 - Math.pow(1 - BASE_LERP, dt);
    const ks = 1 - Math.pow(1 - BASE_LERP * 0.7, dt);
    cx += (tx - cx) * kc;
    cy += (ty - cy) * kc;
    sx += (tx - sx) * ks;
    sy += (ty - sy) * ks;

    if (magnet) {
      magnet.el.style.transform = `translate3d(${(tx - magnet.x) * 0.28}px, ${(ty - magnet.y) * 0.28}px, 0)`;
    }
    core.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate3d(-50%, -50%, 0)`;
    sight.style.transform = `translate3d(${sx}px, ${sy}px, 0) translate3d(-50%, -50%, 0)${hovered ? ' rotate(45deg) scale(1.2)' : ''}`;

    const settled = Math.abs(tx - sx) < 0.1 && Math.abs(ty - sy) < 0.1 && Math.abs(tx - cx) < 0.1 && Math.abs(ty - cy) < 0.1;
    raf = settled && !magnet ? 0 : requestAnimationFrame(frame);
  };
  const wake = () => {
    if (!raf && !document.hidden) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };

  const reset = () => {
    if (!hovered && !magnet) return;
    hovered = false;
    cursor.classList.remove('is-hover', 'is-magnetic');
    if (magnet) {
      magnet.el.style.transform = '';
      magnet = null;
    }
    wake();
  };

  addEventListener(
    'pointermove',
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
      wake();
    },
    { passive: true },
  );

  document.addEventListener('pointerover', (e) => {
    const t = (e.target as Element).closest<HTMLElement>(SELECTOR);
    if (!t) return;
    hovered = true;
    cursor.classList.add('is-hover');
    if (t.matches(MAGNETIC)) {
      const r = t.getBoundingClientRect(); // once per hover, never per frame
      magnet = { el: t, x: r.left + r.width / 2, y: r.top + r.height / 2 };
      cursor.classList.add('is-magnetic');
    }
    wake();
  });
  document.addEventListener('pointerout', (e) => {
    const t = (e.target as Element).closest(SELECTOR);
    if (t && !(e.relatedTarget as Element | null)?.closest?.(SELECTOR)) reset();
  });
  document.addEventListener('click', (e) => {
    if ((e.target as Element).closest(SELECTOR)) setTimeout(reset, 50);
  });
  addEventListener('blur', reset);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else wake();
  });
}
