import { defineConfig } from 'astro/config';

// Static output, zero framework JS: the only scripts are small vanilla TS modules.
// SITE_URL / BASE_PATH come from the deploy workflow. GitHub Pages serves the site at
// https://fovae.github.io/portfolio/, so the base is /portfolio. With a custom domain,
// set SITE_URL to it and BASE_PATH to / (or drop both).
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://fovae.github.io',
  base: process.env.BASE_PATH ?? '/',
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  // case pages are fetched on hover, so they open instantly
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
