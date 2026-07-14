# AURUM Index

AURUM Index is a fictional contemporary art gallery website conceived as an interactive digital museum. The experience prioritizes silence, editorial pacing, black-and-paper contrast, and spatial GSAP motion over conventional e-commerce or portfolio patterns.

## Art Direction

Museum-minimal Swiss editorial luxury:
- Instrument Serif for monumental headings
- Manrope for interface and body copy
- Obsidian black, museum paper, limestone neutrals, and a restrained oxide accent
- Wide gutters, precise hairlines, sparse metadata, and cinematic image framing

## Architecture

- `index.html`: sandbox shell, import map, Tailwind config, script order
- `src/App.tsx`: hash router and route rendering
- `src/lib/*`: utility, GSAP registration, Lenis setup
- `src/hooks/*`: reduced motion, theme, GSAP context helper
- `src/data/*`: seeded artworks, exhibitions, articles, FAQs
- `src/components/ui/*`: local shadcn-style primitives
- `src/components/motion/*`: magnetic button, split text, marquee, cursor follower
- `src/components/layout/*`: sticky header, footer, page frame
- `src/components/sections/Hero.tsx`: primary entrance timeline
- `src/pages/*`: Index, Exhibitions, Collection, Journal, Visit, NotFound

## Motion System

GSAP drives the premium layer:
- Page-load style hero curtain reveal
- Split text word reveal in the entrance hero
- Scroll-triggered section reveals
- Pinned horizontal journey on the home page
- Pinned orbit collection scene with anti-clockwise rotation
- Count-up museum stats
- Infinite marquee with hover slowdown
- Magnetic button hover offset
- Cursor follower with context labels
- Modal entrance animation

Reduced motion gracefully falls back to static editorial layouts.

## Token Map

All design tokens live in `src/styles/tokens.css`:
- Brand stops: `--brand-50` to `--brand-900`
- Surfaces: `--bg`, `--surface`, `--surface-2`, `--surface-3`
- Typography: families, scale, line heights, tracking, weights
- Radii: `--r-xs` through `--r-pill`
- Spacing: `--s-1` through `--s-32`
- Shadows, motion easings, durations, focus ring

## Page Map

- `#/` — Digital museum entrance, hero, featured exhibition, horizontal journey, about, stats, marquee
- `#/exhibitions` — Filtered exhibition index with Flip transitions and error simulation
- `#/collection` — Pinned orbit collection with active metadata and modal detail drawer
- `#/journal` — Editorial notes with skeleton loading and marquee
- `#/visit` — Visit information, zod-validated contact form, FAQ accordion
- Unknown route — museum-toned 404 state

## Content Strategy

Seeded content includes:
- 12 artworks with realistic names, prices, media, dimensions, and descriptions
- 4 exhibitions with dates, statuses, room assignments, and curator notes
- 10 editorial articles
- 7 visitor FAQs

## Accessibility

- Semantic landmarks
- Skip link
- Focus-visible ring via tokens
- Keyboard accessible menu, tabs, accordion, modal, and buttons
- Theme toggle with localStorage persistence
- Reduced motion support

## Notes

The project is built for a browser-native sandbox using React 19, TypeScript via Babel Standalone, Tailwind Play CDN, and esm.sh imports instead of a local build step.
