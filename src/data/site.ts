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
  { label: 'Process', href: '/#process' },
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
  { group: 'Roblox', items: ['Luau', 'Roblox Studio', 'Procedural building', 'CollectionService', 'UI kits in code'] },
  { group: 'Design', items: ['UX / UI', 'Design systems', 'Style guides', 'Motion', 'Accessibility (WCAG AA)', 'Art direction'] },
  { group: 'Hosting', items: ['Cloudflare Pages', 'Strict CSP'] },
];

/** How I work: each step is something the projects on this site actually do. */
export const process = [
  {
    title: 'Write the source of truth',
    text: 'Every project starts with a written concept the code must match. Simple Training has a product document; SOMN has a game concept and two style guides, Reverie for the world and Phantom for the UI.',
  },
  {
    title: 'System before screens',
    text: 'Tokens and components first, screens second. Phantom is one Luau kit that every SOMN window is built from; Simple Training draws 11 themes from one set of tokens.',
  },
  {
    title: 'Budgets and audits',
    text: 'Limits are written down and checked by scripts: parts and light sources per build phase, an audit for every region, WCAG AA contrast for every theme, translations for every language.',
  },
  {
    title: 'Real devices, green CI',
    text: 'Play-mode walks and phone checks for SOMN. Playwright on iPhone, Android and desktop profiles for Simple Training, and a pipeline that deploys only when everything passes.',
  },
];
