export function initClock(): void {
  const el = document.getElementById('local-clock');
  if (!el) return;
  const tz = el.dataset.tz ?? 'Europe/Dublin';
  const label = el.dataset.label ?? 'DUB';
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const tick = () => {
    if (!document.hidden) el.textContent = `${label} ${fmt.format(new Date())}`;
  };
  tick();
  setInterval(tick, 1000);
}
