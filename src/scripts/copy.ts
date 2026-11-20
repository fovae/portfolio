/** "COPY" buttons next to contact lines. */
export function initCopy(): void {
  document.addEventListener('click', async (e) => {
    const btn = (e.target as Element).closest<HTMLButtonElement>('[data-copy]');
    if (!btn) return;
    const label = btn.textContent;
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? '');
      btn.textContent = 'COPIED';
    } catch {
      btn.textContent = 'FAILED';
    }
    btn.classList.add('is-done');
    setTimeout(() => {
      btn.textContent = label;
      btn.classList.remove('is-done');
    }, 1600);
  });
}
