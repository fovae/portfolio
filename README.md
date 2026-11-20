# FOVAE: portfolio

Static site on Astro. No framework JS is shipped: the only scripts are small vanilla TypeScript modules
(`src/scripts`). Neon HUD look inspired by Steam profiles.

## Run

Needs Node.js 20+.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview
```

## Structure

```
src/data/        projects.ts (all case studies), site.ts (nav, socials, stack, process), icons.ts
src/components/  Header, Background, ProjectCard, Cover, CaseStudy, art/ (SVG covers: Phantom, Transit)
src/pages/       index, projects/[slug] (one page per project), 404
src/scripts/     reveal, background (video), menu, cursor, clock
src/styles/      base (tokens, cursor, reveal), hud (header, menu), sections
src/assets/      images optimized by Astro at build (webp + srcset)
public/          video, icons, og-image.jpg, robots.txt
scripts/og.mjs   regenerates the og-image from the SOMN key art (npm run og)
```

Add a project: append an entry to `src/data/projects.ts` (`tier: 'flagship'` for a big card, `'file'` for a
SOMN case file). Its page is generated automatically.

## Performance notes

- The page never waits for the video. The poster is a CSS background; the video loads on idle and is skipped for
  reduced motion and data saver, and paused when the tab is hidden.
- `backdrop-filter` is used only on the header. Cards use a more opaque glass instead (blur over a video is the
  most expensive thing on the old version).
- The custom cursor runs only with a real mouse, and its animation loop sleeps when the cursor is still.
- Fonts are self-hosted (`@fontsource-variable`), no requests to Google.

## TODO before release

- Real domain in `astro.config.mjs` (`site`) and a `og-image.jpg` at exactly 1200×630 (now 1200×620).
- Convert `public/video` to a shorter, lower-bitrate loop if needed.
- Contact e-mail (currently only social links).
