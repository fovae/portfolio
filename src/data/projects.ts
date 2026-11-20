import type { ImageMetadata } from 'astro';
import keyart from '../assets/somn/keyart.png';
import aurora from '../assets/somn/aurora.png';
import city from '../assets/somn/city.png';
import todayDark from '../assets/training/today-dark.webp';
import todayViolet from '../assets/training/today-violet.webp';
import todayLight from '../assets/training/today-light.webp';
import libraryDark from '../assets/training/library-dark.webp';

export interface Shot {
  src: ImageMetadata;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  status: 'LIVE' | 'IN DEVELOPMENT';
  cover: ImageMetadata;
  coverAlt: string;
  /** phone screenshots are tall; they get a different layout */
  shotsKind: 'wide' | 'phone';
  meta: { label: string; value: string }[];
  tags: string[];
  intro: string[];
  highlights: { title: string; text: string }[];
  shots: Shot[];
  links: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    slug: 'somn',
    title: 'Project: SOMN',
    kicker: 'Multiplayer Roblox game',
    summary:
      'A neon megacity where players arrive from the world of dreams. One city, three regions, three ways to play.',
    status: 'IN DEVELOPMENT',
    cover: keyart,
    coverAlt: 'Project: SOMN key art',
    shotsKind: 'wide',
    meta: [
      { label: 'Role', value: 'Creator: world, UI and gameplay design, building' },
      { label: 'Platform', value: 'Roblox (Luau)' },
      { label: 'Status', value: 'In development, not public yet' },
      { label: 'Scale', value: '2040 × 2040 studs map, 100K+ parts' },
    ],
    tags: ['Roblox', 'Luau', 'Level design', 'UI', 'Game design'],
    intro: [
      'SOMN is a multiplayer Roblox game set in a futuristic neon metropolis inhabited by Dreamers, players who came to the city from the world of dreams.',
      'The city is one place with three characters. Fighters live in Obsidian (combat, arena, ranked), Builders in Velora (housing, crafting, trade) and Travelers in Aurora (exploration, story, calm). Every class can go anywhere; a class gives bonuses and work, not walls.',
    ],
    highlights: [
      {
        title: 'Readable from the first minute',
        text: 'Three regions mean three silhouettes, three key colors and three landmarks, so a new player always knows where they are. A central Plaza hub connects them.',
      },
      {
        title: 'One design grammar',
        text: 'The world follows a written style guide (architecture, thin neon on edges, no clutter) and the UI follows a separate one. Beauty over quantity.',
      },
      {
        title: 'Performance budgets',
        text: 'Every build phase has hard limits on parts and light sources, and is verified in Play mode and on a phone before it ships.',
      },
      {
        title: 'Fair economy',
        text: 'The premium currency and VIP never give combat power. Social features (hub, trade, housing as a showcase, Hall of Fame) come first.',
      },
    ],
    shots: [
      { src: aurora, alt: 'Aurora region concept: neon dream city' },
      { src: city, alt: 'Project: SOMN city view' },
    ],
    links: [],
  },
  {
    slug: 'training',
    title: 'Simple Training',
    kicker: 'Offline-first PWA',
    summary:
      'A workout planner and logger with no accounts, no ads and no cookies. Installs from a link, works offline, and keeps all data on the device.',
    status: 'LIVE',
    cover: todayDark,
    coverAlt: 'Simple Training: the Today screen in the dark theme',
    shotsKind: 'phone',
    meta: [
      { label: 'Role', value: 'Product, design and development' },
      { label: 'Platform', value: 'iPhone, Android, desktop (PWA)' },
      { label: 'Status', value: 'Released' },
      { label: 'Scale', value: '253 exercises, 6 languages, 11 themes' },
    ],
    tags: ['TypeScript', 'Preact', 'Signals', 'PWA', 'IndexedDB', 'Playwright'],
    intro: [
      'Simple Training lets you build your week from a library of ready exercises, log sets and see your history. It is deliberately small: no streaks, no badges, no pressure.',
      'Everything lives in IndexedDB on the device. There are no servers for user data, no analytics and no requests to third-party domains.',
    ],
    highlights: [
      {
        title: 'Offline and installable',
        text: 'A Workbox service worker precaches the whole app, including all languages. On iPhone an install screen guides the user to Add to Home Screen first, because Safari tabs and installed apps keep separate storage.',
      },
      {
        title: 'Own content only',
        text: '253 exercises with original diagrams, muscles, technique, mistakes and safety notes. Soft rule-based tips work offline and can be turned off with one switch.',
      },
      {
        title: 'Tested like a product',
        text: 'Hundreds of Playwright end-to-end tests run on iPhone, Android and desktop profiles, with accessibility checks and WCAG AA contrast verified for every theme.',
      },
      {
        title: 'Strict by default',
        text: 'Strict TypeScript, translation completeness checks, a content security policy with no external domains, and CI that deploys to Cloudflare Pages only after everything is green.',
      },
    ],
    shots: [
      { src: todayViolet, alt: 'Today screen in the Violet Dusk theme' },
      { src: libraryDark, alt: 'Exercise library in the dark theme' },
      { src: todayLight, alt: 'Today screen in the light theme' },
    ],
    links: [{ label: 'Open the app', href: 'https://simpletraining.app/' }],
  },
];

/** Placeholder cards in HUD style: honest "not yet" rather than invented work. */
export const sealed = [
  { code: 'PRJ_03', clearance: 'CLEARANCE 3', state: 'IN DEVELOPMENT' },
  { code: 'PRJ_04', clearance: 'CLEARANCE 4', state: 'ENCRYPTED' },
  { code: 'PRJ_05', clearance: 'CLEARANCE 5', state: 'ACCESS DENIED' },
];
