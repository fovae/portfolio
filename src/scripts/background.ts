/** Video is decoration: skip it for reduced motion / data saver, pause when hidden,
 *  and load it only after the page is interactive. */
export function initBackground(): void {
  const video = document.getElementById('bgVideo') as HTMLVideoElement | null;
  if (!video) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (reduce || conn?.saveData) {
    video.remove();
    return;
  }

  const start = () => {
    for (const pair of (video.dataset.sources ?? '').split(',')) {
      const [src, type] = pair.split('|');
      const s = document.createElement('source');
      s.src = src;
      s.type = type;
      video.appendChild(s);
    }
    video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
    video.load();
    video.play().catch(() => {
      /* autoplay blocked: the poster stays, which is fine */
    });
  };

  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1500 });
  else setTimeout(start, 300);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else if (video.classList.contains('is-playing')) video.play().catch(() => {});
  });
}
