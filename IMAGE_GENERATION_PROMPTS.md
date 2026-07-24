# Image Generation Prompts — Pala Homes Concept Collection

Use these prompts to produce a **coherent, photographic set** for each concept property —
the same building rendered from 9 angles, rather than unrelated stock photos. This closes
the one gap the current reference photography cannot: single-building coherence.

> **Status: PENDING.** No image generator is available in the build environment, so the
> site currently ships original vector visualisations plus curated reference photography.
> When you generate these, drop the results into `src/assets/concepts/<property-id>/` and
> point each view's `image` (in `src/data/conceptImagery.ts` or the property data) at the
> local file.

## How to keep angles coherent (critical)

1. Generate the **exterior hero first**. Treat it as the visual reference for the property.
2. For every other angle, feed the hero back as an image reference (Midjourney `--cref` /
   `--sref`, DALL·E edit/reference, Firefly Structure/Style reference, or a fixed seed).
3. Keep constant across all angles: **materials, window proportions, floor levels,
   furniture language, landscaping, lighting direction, colour palette, pool shape, and
   skyline/canal/courtyard context.**
4. Generate **multiple angles of the same design** — never a new house per image.

## Global master style (prepend to every prompt)

> High-end editorial architectural photography of an original luxury Florida residence,
> realistic architecture, believable construction, refined tropical landscaping, premium
> materials, natural light, cinematic but realistic colour grading, warm cream limestone,
> subtle emerald accents, brass details, no people dominating the frame, no logos, no text,
> no watermark, no exaggerated fantasy architecture, no impossible structures, no warped
> windows, no duplicate furniture, no distorted geometry, photographed with a professional
> full-frame architectural camera, realistic wide-angle lens, highly detailed, premium
> real-estate editorial quality.

## Global negative prompt

> people crowding frame, text, watermark, logo, signage, distorted geometry, warped
> windows, extra floors, duplicated furniture, fisheye distortion, low resolution,
> oversaturated, HDR halos, cartoon, illustration, CGI plastic look, snow, mountains,
> unrelated landscape.

## Aspect ratios & filenames

Per property, generate into `src/assets/concepts/<property-id>/`:

| Purpose | Ratio | Filename |
| --- | --- | --- |
| Desktop hero | 16:10 | `exterior-hero.webp` |
| Mobile hero crop | 4:5 | `exterior-hero-mobile.webp` |
| Exterior angle | 16:10 | `exterior-angle.webp` |
| Entrance | 3:2 | `entrance.webp` |
| Living | 3:2 | `living-room.webp` |
| Kitchen / dining | 3:2 | `kitchen-dining.webp` |
| Primary bedroom | 3:2 | `primary-bedroom.webp` |
| Primary bathroom | 3:2 | `primary-bathroom.webp` |
| Outdoor (pool/terrace/courtyard) | 16:10 | `outdoor-view.webp` |
| Evening / dusk | 16:10 | `evening-view.webp` |

Keep the main subject off the extreme edges so responsive cropping stays safe.

---

## Property 01 — Solara Bay Residence (Miami, waterfront sky residence)

**Reference (exterior hero):** contemporary waterfront sky residence in Miami, warm
limestone tower with bronze metal detailing, floor-to-ceiling glazing, expansive private
terrace, soft emerald interior accents, panoramic bay and city views, golden-hour light.

1. Exterior / tower hero — full tower against the bay, golden hour.
2. Terrace three-quarter angle — wraparound terrace, bronze railings, water beyond.
3. Main living room — open plan, full-height glass, emerald accents, bay view.
4. Kitchen & dining — limestone island, bronze fittings, dining beyond glazing.
5. Primary bedroom — calm palette, bay outlook, morning light.
6. Primary bathroom — stone, freestanding tub by the glazing.
7. Sunset balcony view — terrace at dusk, skyline silhouette.
8. Architectural material detail — limestone + bronze + glass joinery, macro.
9. Evening exterior alternate — tower glowing with warm interior light after dark.

## Property 02 — Casa Nila (Fort Lauderdale, canal-front villa)

**Reference:** modern canal-front villa, white limestone exterior, timber soffits, private
boat dock, tropical landscaping, double-height living room, indoor-outdoor transitions,
calm water reflections, warm luxury.

1. Waterfront exterior hero — villa low on the canal, golden hour, reflection.
2. Front entrance angle — timber-lined entry, tropical planting.
3. Pool & dock view — infinity-edge pool leading to the dock.
4. Double-height living room — sliding glass open to terrace.
5. Kitchen & dining — timber ceiling, bright, island.
6. Primary bedroom — serene, canal outlook.
7. Primary bathroom — limestone, garden outlook.
8. Sunset canal view — pool terrace and canal at dusk.
9. Night exterior — villa glowing over the water.

## Property 03 — Orchid Courtyard House (Orlando, courtyard residence)

**Reference:** private modern courtyard residence, warm stucco, clay-toned surfaces, shaded
tropical garden, central reflecting pool, natural timber, soft daylight, subtle
Kerala-inspired courtyard influence (restrained, not a traditional Kerala house).

1. Front architectural hero — warm stucco street elevation, low planting.
2. Courtyard wide view — shaded central courtyard, still reflecting pool.
3. Entrance walkway — timber-shaded walk beside the garden.
4. Living room opening to courtyard — sliding walls, indoor-outdoor.
5. Kitchen — warm timber and stone.
6. Primary bedroom — restful, garden view.
7. Bathroom — clay tones, natural light.
8. Garden pavilion — timber pavilion by the reflecting pool.
9. Dusk courtyard — warm lantern light.

## Property 04 — Saffron Coast Estate (Palm Beach, coastal estate)

**Reference:** coastal contemporary estate, warm travertine, pale cream render, large framed
openings, ocean-influenced landscaping, elegant pool terrace, sculptural staircase,
sophisticated neutral interiors, subtle brass detailing.

1. Front exterior hero — broad cream/travertine elevation, golden hour.
2. Three-quarter exterior — estate from an angle, framed openings.
3. Rear pool terrace — generous terrace, framed openings, ocean landscaping.
4. Main living space — large neutral volume, sculptural.
5. Kitchen & dining — travertine, expansive.
6. Sculptural staircase — curving stair in a bright double-height hall.
7. Primary suite — large, framed ocean-side outlook.
8. Primary bathroom — travertine, brass fittings.
9. Evening pool view — pool terrace glowing at night.
