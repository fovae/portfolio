import type { IconName } from './icons';

export const site = {
  name: 'fovae',
  title: 'Fovae | Frontend Developer & UX/UI Designer, Dublin',
  description:
    'Fovae is a frontend developer and UX/UI designer in Dublin. Offline-first PWAs, design systems and neon worlds in Roblox. Case studies: Project: SOMN and Simple Training.',
  headline: 'Frontend developer & UX/UI designer',
  tagline:
    'I design and build interfaces that feel fast and look deliberate: offline-first web apps, design systems, and neon worlds in Roblox.',
  motto: 'Spec first, system second, real devices before anything ships.',
  location: 'Dublin, IE',
  timeZone: 'Europe/Dublin',
  status: 'AVAILABLE',
} as const;

export const nav = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Process', href: '/#process' },
  { label: 'Stack', href: '/#stack' },
  { label: 'Contact', href: '/#contact' },
] as const;

/** Direct lines, shown as rows in the Contact section. */
export const contacts: { label: string; value: string; href: string; icon: IconName; copy?: string }[] = [
  { label: 'Email', value: 'fovae.work@gmail.com', href: 'mailto:fovae.work@gmail.com', icon: 'mail', copy: 'fovae.work@gmail.com' },
  { label: 'WhatsApp', value: '+353 85 140 8639', href: 'https://wa.me/353851408639', icon: 'whatsapp', copy: '+353851408639' },
  { label: 'Telegram', value: '@fovaedev', href: 'https://t.me/fovaedev', icon: 'telegram' },
];

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
  { group: 'Quality & delivery', items: ['Playwright', 'axe-core', 'ESLint', 'Prettier', 'GitHub Actions', 'Cloudflare Pages', 'Strict CSP'] },
  { group: 'Roblox', items: ['Luau', 'Roblox Studio', 'Procedural building', 'CollectionService', 'UI kits in code'] },
  { group: 'Design', items: ['UX / UI', 'Design systems', 'Style guides', 'Motion', 'Accessibility (WCAG AA)', 'Art direction'] },
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
