# Content Required Before Public Launch

This site is a **concept demonstration**. The following must be supplied and verified before
it can be presented as a real, active Pala Homes property site. Until then, keep
`site.mode = 'concept'` in `src/config/site.ts`.

## Brand & legal
- [ ] Official Pala Homes logo (SVG preferred) — replace the inline placeholder in
      `components/layout/Header.tsx` and `public/favicon.svg`.
- [ ] Verified brokerage name and real-estate **licence number(s)**.
- [ ] Legal disclaimer reviewed by counsel.
- [ ] Privacy policy + cookie/consent handling.
- [ ] Confirmation of the Malayalam copy by a native speaker (taglines are supplied; the
      About accent line should be reviewed).

## Contact (currently placeholders in `src/config/business.ts`, `isPlaceholder: true`)
- [ ] Real email address.
- [ ] Real phone number (display + `tel:` href).
- [ ] Real WhatsApp number (digits-only international format).
- [ ] Social profile URLs (Instagram / Facebook / LinkedIn / YouTube).
- [ ] Office address / service regions if to be displayed.

## Properties
- [ ] Real, verified listings to replace `src/data/conceptProperties.ts`.
- [ ] Firm prices (replace the illustrative ranges — and update the range UI in
      `PropertyScene` / `PropertyQuickView` / `PropertyIndex`).
- [ ] Verified specifications (beds, baths, area, features).
- [ ] MLS numbers and listing status **only if genuine** (the concept status labels and the
      MLS-free UI are intentional — do not re-introduce fake statuses).
- [ ] Genuine, coherent property photography — ideally one real building per property.
      See `IMAGE_GENERATION_PROMPTS.md` and `IMAGE_SOURCES.md`.

## Service areas & services
- [ ] Confirm which Florida markets are genuinely covered (`src/data/areas.ts` currently
      says "intended for future coverage").
- [ ] Confirm which services are directly provided vs. coordinated, and that any regulated
      service claims are backed by the relevant licences (`src/data/services.ts`).

## Integrations
- [ ] Form backend for the enquiry form — wire the `INTEGRATION POINT` in
      `components/sections/ContactSection.tsx` (Formspree / Basin / custom API) and remove
      the "front-end demonstration" note once messages actually send.
- [ ] Analytics (if desired).

## SEO / metadata
- [ ] Real canonical domain (update `index.html`, `robots.txt` sitemap URL).
- [ ] Real Open Graph preview image (replace `public/social-preview.svg`).
- [ ] Add `Organization` structured data **only** once verified business details exist.
      (Property/listing structured data is intentionally omitted for fictional concepts.)

## Flip the switch
Once the above are in place:
1. Set `site.mode = 'live'` in `src/config/site.ts`.
2. Set `business.isPlaceholder = false` in `src/config/business.ts`.
3. Re-run `npm run build` and re-test accessibility, responsiveness and the form.
