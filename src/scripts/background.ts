/** Seamless background loop.
 *  A native `loop` stalls for a moment at the wrap point in Chrome and Safari, so two muted
 *  layers take turns instead: shortly before the active one ends, the other starts from 0 and
 *  fades in over it. `loop` stays on as a fallback if a hand-off is ever missed.
 *  Skipped for reduced motion and data saver; paused while the tab is hidden. */
const FADE = 1.2; // seconds of cross-fade

export function initBackground(): void {
  const wrap = document.querySelector<HTMLElement>('.mv-back-wrap');
  if (!wrap) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (reduce || conn?.saveData) return;

  const sources = (wrap.dataset.sources ?? '').split(',').map((s) => s.split('|') as [string, string]);
  const make = () => {
    const v = document.createElement('video');
    v.className = 'bg-video';
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.preload = 'auto';
    v.setAttribute('aria-hidden', 'true');
    for (const [src, type] of sources) {
      const s = document.createElement('source');
      s.src = src;
      s.type = type;
      v.appendChild(s);
    }
    wrap.appendChild(v);
    return v;
  };

  const start = () => {
    let active = make();
    let idle: HTMLVideoElement | null = null; // created lazily, after the first play
    let timer = 0;

    const schedule = () => {
      clearTimeout(timer);
      if (!idle || !Number.isFinite(active.duration) || active.duration < FADE * 3) return;
      const wait = (active.duration - active.currentTime - FADE) / (active.playbackRate || 1);
      timer = window.setTimeout(swap, Math.max(0, wait * 1000));
    };

    const swap = () => {
      if (!idle || document.hidden) return;
      const next = idle;
      next.currentTime = 0;
      next.play().then(() => {
        // incoming fades in on top; the outgoing layer stays opaque underneath, so no dip
        next.classList.add('is-on', 'is-top');
        const prev = active;
        prev.classList.remove('is-top');
        active = next;
        idle = prev;
        setTimeout(() => {
          prev.classList.remove('is-on');
          prev.pause();
        }, FADE * 1000 + 100);
        schedule();
      }).catch(() => {});
    };

    active.addEventListener('playing', () => {
      active.classList.add('is-on');
      if (!idle) {
        idle = make();
        idle.load();
      }
      schedule();
    }, { once: true });
    // re-sync the timer whenever playback position jumps (tab switch, stall)
    wrap.addEventListener('seeked', schedule, true);

    active.play().catch(() => {
      /* autoplay blocked: the poster stays, which is fine */
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearTimeout(timer);
        active.pause();
      } else if (active.classList.contains('is-on')) {
        active.play().then(schedule).catch(() => {});
      }
    });
  };

  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1500 });
  else setTimeout(start, 300);
}
