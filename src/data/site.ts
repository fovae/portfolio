import type { IconName } from './icons';

export const site = {
  name: 'fovae',
  title: 'Fovae | Frontend Developer & UX/UI',
  description:
    'Frontend developer and UX/UI designer from Dublin. Offline-first PWAs, fast interfaces and neon worlds in Roblox.',
  headline: 'Frontend developer & UX/UI designer',
  tagline: 'I build fast interfaces, offline-first PWAs and neon worlds in Roblox.',
  location: 'Ireland',
  timeZone: 'Europe/Dublin',
  status: 'AVAILABLE',
} as const;

export const nav = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Stack', href: '/#stack' },
  { label: 'Contact', href: '/#contact' },
] as const;

export const socials: { name: string; icon: IconName; href: string }[] = [
  { name: 'GitHub', icon: 'github', href: 'https://github.com/fovae' },
  { name: 'Telegram', icon: 'telegram', href: 'https://t.me/fovaedev' },
  { name: 'Discord', icon: 'discord', href: 'https://discord.com/users/1468713991852396557' },
  { name: 'Instagram', icon: 'instagram', href: 'https://instagram.com/vfovae' },
  { name: 'Steam', icon: 'steam', href: 'https://steamcommunity.com/profiles/76561199357477994/' },
];

export const stack = [
  {
    group: 'Web',
    items: ['TypeScript', 'Astro', 'Vite', 'Preact + Signals', 'CSS (no framework)', 'PWA / Workbox', 'IndexedDB'],
  },
  { group: 'Quality', items: ['Playwright', 'axe-core', 'ESLint', 'Prettier', 'GitHub Actions'] },
  { group: 'Roblox', items: ['Luau', 'Roblox Studio', 'Level & UI design'] },
  { group: 'Design', items: ['UX / UI', 'Design systems', 'Motion', 'Accessibility (WCAG AA)'] },
  { group: 'Hosting', items: ['Cloudflare Pages', 'Strict CSP'] },
];
