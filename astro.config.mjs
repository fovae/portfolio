import { defineConfig } from 'astro/config';

// Static output, zero framework JS: the only scripts are small vanilla TS modules.
export default defineConfig({
  site: 'https://fovae.dev', // TODO: replace with the real domain at release
  output: 'static',
  build: { inlineStylesheets: 'auto' },
});
