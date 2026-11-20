/** Fullscreen HUD menu: inert while closed, Escape closes, focus returns to the button. */
export function initMenu(): void {
  const btn = document.querySelector<HTMLButtonElement>('.burger-btn');
  const menu = document.getElementById('hud-menu');
  if (!btn || !menu) return;

  const set = (open: boolean) => {
    document.body.classList.toggle('hud-open', open);
    btn.setAttribute('aria-expanded', String(open));
    menu.toggleAttribute('inert', !open);
    menu.setAttribute('aria-hidden', String(!open));
    if (open) menu.querySelector<HTMLElement>('a')?.focus();
  };

  btn.addEventListener('click', () => set(!document.body.classList.contains('hud-open')));
  menu.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    if (t.closest('.hud-link') || !t.closest('.hud-nav')) set(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('hud-open')) {
      set(false);
      btn.focus();
    }
  });
  matchMedia('(min-width: 769px)').addEventListener('change', (e) => e.matches && set(false));
}
