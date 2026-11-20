import type { ImageMetadata } from 'astro';
import keyart from '../assets/somn/keyart.jpg';
import city from '../assets/somn/city.jpg';
import todayDark from '../assets/training/today-dark.webp';
import todayViolet from '../assets/training/today-violet.webp';
import todayLight from '../assets/training/today-light.webp';
import libraryDark from '../assets/training/library-dark.webp';
import auroraEngine from '../assets/aurora/engine.jpg';
import auroraTop from '../assets/aurora/top.jpg';
import auroraVsRef from '../assets/aurora/vs-ref.jpg';
import auroraGate from '../assets/aurora/gate.jpg';
import auroraTree from '../assets/aurora/tree.jpg';
import auroraAvenue from '../assets/aurora/avenue.jpg';
import auroraStreet from '../assets/aurora/street.jpg';
import auroraStation from '../assets/aurora/station.jpg';
import katana from '../assets/weapons/katana.jpg';
import scythe from '../assets/weapons/scythe.jpg';
import gloves from '../assets/weapons/gloves.jpg';
import kunai from '../assets/weapons/kunai.jpg';
import odachi from '../assets/weapons/odachi.jpg';
import knives from '../assets/weapons/knives.jpg';

export interface Shot {
  src: ImageMetadata;
  alt: string;
  caption?: string;
  /** spans the full gallery width */
  wide?: boolean;
}

export type Art = 'phantom' | 'transit';

export interface Project {
  slug: string;
  /** flagship = big card; file = SOMN case file */
  tier: 'flagship' | 'file';
  title: string;
  kicker: string;
  summary: string;
  status: 'LIVE' | 'IN DEVELOPMENT' | 'IN GAME' | 'CONCEPT';
  /** image cover, or an SVG drawing when there is no screenshot */
  cover?: ImageMetadata;
  art?: Art;
  coverAlt: string;
  /** phone screenshots are tall; they get a different layout */
  shotsKind: 'wide' | 'phone';
  stats: { value: string; label: string }[];
  meta: { label: string; value: string }[];
  tags: string[];
  intro: string[];
  highlights: { title: string; text: string }[];
  palette?: { name: string; hex: string; role: string }[];
  shots: Shot[];
  links: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    slug: 'somn',
    tier: 'flagship',
    title: 'Project: SOMN',
    kicker: 'Multiplayer Roblox game',
    summary:
      'A neon megacity where players arrive from the world of dreams. One city, three regions, three ways to play.',
    status: 'IN DEVELOPMENT',
    cover: keyart,
    coverAlt: 'Project: SOMN key art',
    shotsKind: 'wide',
    stats: [
      { value: '2040²', label: 'studs map' },
      { value: '3', label: 'regions & classes' },
      { value: '97K', label: 'parts in the world' },
      { value: '2', label: 'written style guides' },
    ],
    meta: [
      { label: 'Role', value: 'Creator: game, world and UI design, building, scripting' },
      { label: 'Platform', value: 'Roblox (Luau)' },
      { label: 'Status', value: 'In development, not public yet' },
      { label: 'Case files', value: 'Phantom UI · Aurora · Systems · Weapon archive' },
    ],
    tags: ['Roblox', 'Luau', 'Game design', 'Level design', 'UI'],
    intro: [
      'SOMN is a multiplayer Roblox game set in a futuristic neon metropolis inhabited by Dreamers, players who came to the city from the world of dreams through the Mist.',
      'The city is one place with three characters. Fighters live in Obsidian (combat, arena, ranked), Builders in Velora (housing, crafting, trade) and Travelers in Aurora (exploration, story, calm). Every class can go anywhere: a class gives bonuses and work, not walls. The Plaza hub in the middle holds the spawn, terminals, portals and the Hall of Fame.',
    ],
    highlights: [
      {
        title: 'Readable from the first minute',
        text: 'Three regions mean three silhouettes, three key colours and three landmarks. Aurora, the softest region, sits right next to the spawn, so a new player starts somewhere calm.',
      },
      {
        title: 'Two style guides',
        text: 'Reverie defines the world (stone tone ladder, neon hierarchy, facade grammar) and Phantom defines the interface. Both were measured from the live place and are handed to every collaborator.',
      },
      {
        title: 'Performance budgets',
        text: 'Every build phase has hard limits on parts and light sources, an audit script, and a walk test in Play mode and on a phone before it is accepted.',
      },
      {
        title: 'Fair economy',
        text: 'The premium currency and VIP never give combat power. Social features come first: the hub, trade, housing as a showcase and the Hall of Fame.',
      },
    ],
    shots: [
      { src: auroraEngine, alt: 'Aurora region built in Roblox Studio, view from the Plaza', caption: 'Aurora, in engine' },
      { src: city, alt: 'Project: SOMN promo art: a Dreamer runs across neon rooftops', caption: 'Promo art' },
    ],
    links: [],
  },
  {
    slug: 'training',
    tier: 'flagship',
    title: 'Simple Training',
    kicker: 'Offline-first PWA',
    summary:
      'A workout planner and logger with no accounts, no ads and no cookies. Installs from a link, works offline, and keeps all data on the device.',
    status: 'LIVE',
    cover: todayDark,
    coverAlt: 'Simple Training: the Today screen in the dark theme',
    shotsKind: 'phone',
    stats: [
      { value: '253', label: 'exercises' },
      { value: '6', label: 'languages' },
      { value: '11', label: 'themes, WCAG AA' },
      { value: '560+', label: 'e2e tests' },
    ],
    meta: [
      { label: 'Role', value: 'Product, design and development' },
      { label: 'Platform', value: 'iPhone, Android, desktop (PWA)' },
      { label: 'Status', value: 'Released, v0.1' },
      { label: 'Stack', value: 'Vite, TypeScript, Preact + Signals, Workbox, IndexedDB' },
    ],
    tags: ['TypeScript', 'Preact', 'Signals', 'PWA', 'IndexedDB', 'Playwright'],
    intro: [
      'Simple Training lets you build your week from a library of ready exercises, log sets and see your history. It is deliberately small: no streaks, no badges, no pressure, no AI coach.',
      'Everything lives in IndexedDB on the device. There are no servers for user data, no analytics and no requests to third-party domains. Backups go through the system Share sheet.',
    ],
    highlights: [
      {
        title: 'Offline and installable',
        text: 'A Workbox service worker precaches the whole app, all languages included. On iPhone an install screen first guides the user to Add to Home Screen, because Safari tabs and installed apps keep separate storage.',
      },
      {
        title: 'Own content only',
        text: '253 exercises with original diagrams, muscles, technique, common mistakes and safety notes. Soft rule-based tips work offline and turn off with one switch.',
      },
      {
        title: 'Tested like a product',
        text: 'Playwright end-to-end tests run on iPhone, Android and desktop profiles with axe accessibility checks. A script verifies WCAG AA contrast in every theme, another one that every string exists in every language.',
      },
      {
        title: 'Strict by default',
        text: 'Strict TypeScript, a content security policy with no external domains, and a CI pipeline (lint, translations, build, e2e) that deploys to Cloudflare Pages only when everything is green.',
      },
    ],
    shots: [
      { src: todayViolet, alt: 'Today screen in the Violet Dusk theme' },
      { src: libraryDark, alt: 'Exercise library in the dark theme' },
      { src: todayLight, alt: 'Today screen in the light theme' },
    ],
    links: [{ label: 'Open the app', href: 'https://simpletraining.app/' }],
  },
  {
    slug: 'phantom-ui',
    tier: 'file',
    title: 'Phantom UI',
    kicker: 'SOMN · Interface system',
    summary:
      'A cold, quiet HUD language grown from a single cursor: graphite glass, silver hairlines, sharp corners and diamonds. One kit for every screen.',
    status: 'IN GAME',
    art: 'phantom',
    coverAlt: 'Phantom reticle and a Profile window, recreated from the style guide',
    shotsKind: 'wide',
    stats: [
      { value: '1', label: 'accent colour' },
      { value: '0', label: 'rounded corners' },
      { value: '20+', label: 'kit components' },
      { value: '4', label: 'core screens' },
    ],
    meta: [
      { label: 'Role', value: 'Design system, UI design, implementation' },
      { label: 'Platform', value: 'Roblox, Luau (SOMN_UIKit)' },
      { label: 'Screens', value: 'HUD, Profile, Settings, Hall of Fame' },
      { label: 'Input', value: 'Mouse, keyboard, touch' },
    ],
    tags: ['Design system', 'UI', 'Luau', 'Motion', 'Accessibility'],
    intro: [
      'Phantom started as the shift-lock cursor, the Phantom Reticle: a graphite diamond, a white core, eight dashes and four guide lines that fade into nothing. Its anatomy became the vocabulary for the whole interface.',
      'Everything is drawn in code from one Luau module, SOMN_UIKit: tokens for colour, type and motion, and components such as window, tabs, toggle, slider, keybind, bar, toast, confirm dialog and the reticle avatar. New screens are only allowed to use the kit.',
    ],
    highlights: [
      {
        title: 'Colour as a rare event',
        text: 'About 95% of any screen is Ink, Line, Gray and Text. Ice is the one accent, used only for ready, active or key values. Magenta is kept for danger; the early neon palette was deliberately retired.',
      },
      {
        title: 'Motion with meaning',
        text: 'The reticle appears in a cascade from the centre outward and breathes at rest. Ability cooldowns are shown on the eight dashes, so the cursor itself is a status display.',
      },
      {
        title: 'Built for phones too',
        text: 'Safe-area insets, a landscape layout where tabs move into the title row, tap targets for every action, text scaling and a reduced-motion setting in the Settings window.',
      },
      {
        title: 'Written down',
        text: 'A full style document (tokens, components, motion, phone rules, checklist) measured from the live kit, so any collaborator, human or agent, builds the same thing.',
      },
    ],
    palette: [
      { name: 'Ink', hex: '#0E1015', role: 'panels, glass' },
      { name: 'Ink2', hex: '#343A46', role: 'graphite, hover' },
      { name: 'Line', hex: '#DCE1E9', role: 'silver hairlines' },
      { name: 'Gray', hex: '#929AA7', role: 'secondary lines' },
      { name: 'Text', hex: '#F0F2F6', role: 'primary text' },
      { name: 'Ice', hex: '#AFFAFF', role: 'the only accent' },
    ],
    shots: [],
    links: [],
  },
  {
    slug: 'aurora',
    tier: 'file',
    title: 'Aurora',
    kicker: 'SOMN · Concept to engine',
    summary:
      'A whole region rebuilt from one concept image by procedural Luau generators: gardens, canals, a crystal Dream Tree and a skyline, with zero light sources.',
    status: 'IN GAME',
    cover: auroraEngine,
    coverAlt: 'Aurora region in Roblox Studio, seen from the Plaza',
    shotsKind: 'wide',
    stats: [
      { value: '24,446', label: 'parts' },
      { value: '0', label: 'light sources' },
      { value: '12', label: 'generator phases' },
      { value: '−30,845', label: 'old parts removed' },
    ],
    meta: [
      { label: 'Role', value: 'Level design, procedural build scripts, art direction' },
      { label: 'Platform', value: 'Roblox Studio, Luau' },
      { label: 'Area', value: '2040 × 680 studs, south of the Plaza' },
      { label: 'Process', value: 'Concept → plan → generators → audit → walk test' },
    ],
    tags: ['Level design', 'Procedural', 'Luau', 'Performance'],
    intro: [
      'Aurora is the Traveler region: exploration, story and calm. The old district was measured, archived and demolished (30,845 parts), then the region was rebuilt from a single concept image.',
      'Nothing was placed by hand. Each layer is a Luau generator that rebuilds its own folder: ground, wall and gate, water, the Dream Tree, towers, blocks, low gardens, landmarks, bridges, vegetation and decor. A final audit script checks counts, anchoring, height limits and that the protected Plaza folders did not change.',
    ],
    highlights: [
      {
        title: 'Matching a reference',
        text: 'A fixed camera reproduces the concept framing, and every phase is screenshotted side by side with the reference and scored against a written rubric. The scores in the log are honest, not all of them are perfect.',
      },
      {
        title: 'Light without lights',
        text: 'The whole region uses zero light sources. The glow comes from neon edges, emissive windows and 21 particle emitters, which keeps it cheap on phones.',
      },
      {
        title: 'Re-runnable',
        text: 'Generators read each other\'s footprints, so moving a building and re-running vegetation and decor re-fits the region around it. Shared preludes hold the plan and the parts kit.',
      },
      {
        title: 'Safe demolition',
        text: 'Before anything was removed, the place was copied and every folder was measured. Rules defined exactly which parts were inside the work area.',
      },
    ],
    shots: [
      { src: auroraVsRef, alt: 'Concept image above, the built region below, same camera', caption: 'Concept (top) vs engine (bottom), same camera', wide: true },
      { src: auroraGate, alt: 'The Aurora gate seen from the spawn', caption: 'Spawn view: the Aurora gate' },
      { src: auroraTree, alt: 'The crystal Dream Tree over the pond', caption: 'The Dream Tree' },
      { src: auroraStreet, alt: 'Avenue towards the Dream Tree framed by neon arches', caption: 'Gate street' },
      { src: auroraAvenue, alt: 'Cherry trees and a canal at night', caption: 'Pond avenue' },
      { src: auroraStation, alt: 'A glass station hall in Kairos quarter', caption: 'Kairos quarter' },
      { src: auroraTop, alt: 'Top-down view of the Lyra gardens with the Dream Tree', caption: 'Top-down: Lyra gardens' },
    ],
    links: [],
  },
  {
    slug: 'systems',
    tier: 'file',
    title: 'City systems',
    kicker: 'SOMN · Gameplay engineering',
    summary:
      'A bus network that circles the whole city, terminals with live screens and telescopic doors, and a steerable dash that stays smooth when many players use it at once.',
    status: 'IN GAME',
    art: 'transit',
    coverAlt: 'Map of SOMN with the SOMN Loop bus ring',
    shotsKind: 'wide',
    stats: [
      { value: '6,840', label: 'stud bus loop' },
      { value: '16 / 32', label: 'stations / stops' },
      { value: '3', label: 'terminals' },
      { value: '0.5 s', label: 'dash, ~43 studs' },
    ],
    meta: [
      { label: 'Role', value: 'Systems design, Luau scripting, testing' },
      { label: 'Platform', value: 'Roblox, Luau (client + server)' },
      { label: 'Systems', value: 'SOMN Loop, terminals, ShadowStep dash' },
      { label: 'Tested', value: 'Play mode, iPhone layout' },
    ],
    tags: ['Luau', 'Gameplay', 'Networking', 'Performance'],
    intro: [
      'The SOMN Loop is a ring route through all three regions: 16 stations, 32 stops, two buses running in opposite directions with right-hand traffic. Stops are tagged with direction, station index and next stop, so the buses and the UI read the network from the map itself.',
      'Three terminals share one builder: the design is changed in code and the buildings are regenerated. Inside, departure boards, event screens and a touch totem run on tags, and doors are telescopic with one critically damped spring per group.',
    ],
    highlights: [
      {
        title: 'ShadowStep dash',
        text: 'A steerable dash on Ctrl: about 43 studs in half a second, 0.8 s cooldown, steered by the camera. Swept collision handles stairs and slides along walls at shallow angles; hits are confirmed against real geometry, not bounding boxes.',
      },
      {
        title: 'Fixing a frame-rate drop',
        text: 'Several players dashing together dropped FPS on PC. The cause was cloning the whole character for every afterimage. Afterimages now come from a per-character pool of bare templates moved in bulk, and phones get a smaller effects budget.',
      },
      {
        title: 'Map as data',
        text: 'Bus bays, terminal screens and doors are found by CollectionService tags and attributes, not hard-coded paths, so the map can be rebuilt without touching the scripts.',
      },
      {
        title: 'Audited geometry',
        text: 'A scratch audit for coplanar faces and overlapping boxes found the causes of z-fighting and clipping in the terminals, and the builder was fixed instead of the models.',
      },
    ],
    shots: [],
    links: [],
  },
  {
    slug: 'weapon-archive',
    tier: 'file',
    title: 'Weapon archive',
    kicker: 'SOMN · Art direction',
    summary:
      '120 cosmetic skin concepts for six weapon classes, organised as collections that read as one family across every weapon.',
    status: 'CONCEPT',
    cover: katana,
    coverAlt: 'Katana archive: 20 skin concepts on one sheet',
    shotsKind: 'wide',
    stats: [
      { value: '6', label: 'weapon classes' },
      { value: '120', label: 'skin concepts' },
      { value: '20', label: 'per class' },
      { value: '0', label: 'combat power' },
    ],
    meta: [
      { label: 'Role', value: 'Art direction, naming, curation' },
      { label: 'Made with', value: 'AI-assisted concept boards' },
      { label: 'Classes', value: 'Katana, odachi, scythe, kunai, throwing knives, gloves' },
      { label: 'Status', value: 'Concepts for the cosmetic shop' },
    ],
    tags: ['Art direction', 'Game economy', 'Visual design'],
    intro: [
      'Weapons in SOMN are cosmetic: skins never change damage, which keeps the economy fair. That makes them a pure design problem: each skin has to be desirable and still read clearly in a fight.',
      'The katana, kunai, throwing knives and gloves share one set of 20 themed lines (Prism, Phantom Protocol, Neon Silk, Mirror Chrome, Scarlet Phoenix, Moon Garden, Oni Mask, Ice Saint, Dreamfall and more), so a player can collect a matching set. The heavy weapons, odachi and scythe, get their own grander set.',
    ],
    highlights: [
      {
        title: 'Collections, not one-offs',
        text: 'The same theme appears on every light weapon, so the shop can sell sets and a player looks coherent.',
      },
      {
        title: 'One archive format',
        text: 'Every class uses the same sheet: numbered 5 × 4 grid, name per skin, SOMN header. It works as a review board and later as a production checklist.',
      },
    ],
    shots: [
      { src: katana, alt: 'Katana archive sheet', caption: 'Katana' },
      { src: odachi, alt: 'Odachi archive sheet', caption: 'Odachi' },
      { src: scythe, alt: 'Scythe archive sheet', caption: 'Scythe' },
      { src: kunai, alt: 'Kunai archive sheet', caption: 'Kunai' },
      { src: knives, alt: 'Throwing knife archive sheet', caption: 'Throwing knives' },
      { src: gloves, alt: 'Combat glove archive sheet', caption: 'Combat gloves' },
    ],
    links: [],
  },
];

export const flagships = projects.filter((p) => p.tier === 'flagship');
export const caseFiles = projects.filter((p) => p.tier === 'file');
