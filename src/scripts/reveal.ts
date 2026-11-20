/** Reveal blocks on load and on scroll. Independent of the video: if anything here
 *  fails, the .js class is removed so content is never stuck invisible. */
export function initReveal(): void {
  const root = document.documentElement;
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  const show = (el: HTMLElement) => el.classList.add('is-in');

  const failsafe = window.setTimeout(() => root.classList.remove('js'), 2500);

  requestAnimationFrame(() => {
    window.clearTimeout(failsafe);
    document.body.classList.add('is-ready');

    if (!('IntersectionObserver' in window)) {
      items.forEach(show);
      return;
    }
    // When a block shows up, everything above it shows too: fast scrolls and anchor jumps
    // never leave skipped blocks invisible.
    let revealed = 0;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting && e.boundingClientRect.top > 0) continue;
          const idx = items.indexOf(e.target as HTMLElement);
          for (let i = revealed; i <= idx; i++) {
            show(items[i]);
            io.unobserve(items[i]);
          }
          revealed = Math.max(revealed, idx + 1);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    items.forEach((el) => io.observe(el));
  });

  let scrolled = false;
  const onScroll = () => {
    const next = window.scrollY > 50;
    if (next !== scrolled) {
      scrolled = next;
      document.body.classList.toggle('scrolled', next);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
