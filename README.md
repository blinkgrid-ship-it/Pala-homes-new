# Pala Homes — Concept Property Experience

A cinematic, production-quality concept website for **Pala Homes**, a South-Florida /
Orlando property brand. The creative direction is *"Kerala warmth meets modern Florida
architecture"* — a premium architectural-magazine feel with understated Malayalam identity.

> **This is a concept demonstration.** Every showcased property is an original, fictional
> architectural concept — **not an active listing**. Prices are illustrative ranges,
> specifications are concept specifications, and imagery is representative reference
> photography combined with original vector visualisations. See
> [`CONTENT_REQUIRED.md`](./CONTENT_REQUIRED.md) for what must be supplied before a public launch.

---

## Highlights

- **Cinematic intro** with brand reveal, English + Malayalam taglines, and a remembered
  "seen" state (localStorage) so returning visitors skip it.
- **Four original concept properties**, each with **9 coherent angles**, three editorial
  scene layouts, and the signature **"Blueprint-to-Built" disclosure animation**.
- **Multi-angle viewer** — angle strip, drag-to-explore, keyboard, touch swipe, and a
  cinematic auto-preview that stops on interaction and is disabled for reduced motion.
- **Immersive gallery** with room-category filters, thumbnails, keyboard + swipe, and full
  modal semantics (focus trap, Escape, focus restoration).
- **Editorial property index** with restrained, animated filtering.
- **Services journey**, **Florida areas**, **About**, and a **cinematic closing** with a
  validated enquiry form.
- Accessibility, reduced-motion support, responsive from 320 → 1920px, and a graceful
  **image-fallback** system.

## Tech stack

- [Vite](https://vite.dev/) + [React 18](https://react.dev/) + **TypeScript** (strict)
- [Framer Motion](https://www.framer.com/motion/) for orchestrated animation
- Plain modern CSS (design tokens, no UI framework)

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

```bash
npm run dev        # start the dev server
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build
npm run lint       # ESLint (zero warnings enforced)
npm run typecheck  # tsc project references, no emit
```

## Architecture

```
src/
  config/        site.ts (siteMode), business.ts (brand/contact), navigation.ts
  data/          conceptProperties.ts, conceptImagery.ts, services.ts, areas.ts
  types/         property.ts (domain model)
  hooks/         useReducedMotion, useScrollProgress, useScrollSpy, useFocusTrap
  components/
    layout/      Header, ScrollProgress, Footer
    intro/       IntroExperience
    properties/  PropertyReel, PropertyScene, BlueprintReveal, PropertyAngleViewer,
                 PropertyGallery, PropertyQuickView, PropertyIndex, ConceptBadge
    sections/    AboutSection, ServicesJourney, AreasSection, ContactSection
    ui/          ArchScene (render engine), ImageWithFallback, Button, Modal,
                 CountUp, MagneticButton, SectionLabel
  styles/        tokens.css, globals.css
  App.tsx, main.tsx
```

### The render engine + image seam

`components/ui/ArchScene.tsx` is a **parametric SVG engine** that draws original,
non-photographic architectural visualisations that stay coherent across all angles of one
property (shared palette + massing). `components/ui/ImageWithFallback.tsx` prefers a real
photograph (`view.image`) when present and **falls back to the render** if it is missing or
fails to load. This single seam is how concept imagery becomes real imagery — no other
component changes.

## Concept mode

`src/config/site.ts` exposes the master switch:

```ts
export const site = { mode: 'concept' as SiteMode /* | 'live' */, ... };
```

In `concept` mode the UI shows concept badges + disclaimers, hides MLS/active-listing
claims, labels prices as *illustrative ranges* and specs as *concept specifications*, and
**does not** emit property structured data. To disable concept mode once verified data
exists, set `mode: 'live'` and supply real values (see below).

## Replacing concept data with real listings

The domain model in `src/types/property.ts` is generic. To go live:

1. Replace the objects in `src/data/conceptProperties.ts` with verified data (name,
   location, specs, and a **firm price** instead of a range — update the price UI in
   `PropertyScene` / `PropertyQuickView` if you switch from ranges).
2. Attach real image paths (see below).
3. Set `site.mode = 'live'` in `src/config/site.ts`.
4. Add licence / brokerage details and organisation structured data only once verified.

## Replacing / adding images

Each property view can carry a real `image` (and optional `imageMobile`). Two options:

- **Local files (recommended for production):** drop optimised files into
  `src/assets/concepts/<property-id>/<view-id>.webp`, import them, and set `view.image`.
- **Remote URLs:** current concept reference photos live in `src/data/conceptImagery.ts`
  (stable Wikimedia Commons URLs). Replace URLs there per property/view.

If a view has no image, the parametric render is shown automatically. To generate a
coherent photographic set for a single design, use
[`IMAGE_GENERATION_PROMPTS.md`](./IMAGE_GENERATION_PROMPTS.md).

## Business configuration

`src/config/business.ts` holds brand strings, regions, socials, and **placeholder**
contact details (`isPlaceholder: true`). The UI flags placeholders. Replace with verified
values and set `isPlaceholder: false`.

## Form integration

The enquiry form in `components/sections/ContactSection.tsx` POSTs its field data as JSON to
`/api/contact`, a small Cloudflare Worker route (`worker/index.js`) that forwards it on via
Brevo's transactional email API. No form-provider dashboard involved — the worker is the whole
backend for this. See `worker/index.js` for the required environment secrets
(`BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `CONTACT_TO_EMAIL`).

## CMS admin login

`/admin` uses Sveltia CMS with a GitHub OAuth backend (see `public/admin/config.yml`), proxied
through the same worker's `/auth` and `/callback` routes (`GITHUB_CLIENT_ID` /
`GITHUB_CLIENT_SECRET` secrets required). The owner logs in with a GitHub account that has push
access to this repo — no separate Identity/invite system involved.

## Deployment

Hosted on **Cloudflare Workers** (static assets + the two API routes above, see
`wrangler.jsonc`):

```bash
npm run build       # outputs to dist/
npx wrangler deploy # or let Cloudflare's Git integration build+deploy on push
```

Update the canonical URL, `robots.txt` sitemap URL, and `og:image` for the
real domain.

## Git workflow

Conventional commits; work on `main`. See the commit history for the feature-by-feature
build. Remote: `https://github.com/blinkgrid-ship-it/Pala-homes-new.git`.
