# Image Sources

This project uses two kinds of imagery:

1. **Original vector visualisations** — generated at runtime by the parametric render
   engine (`src/components/ui/ArchScene.tsx`). These are original to this project, contain
   no third-party content, and are used as the fallback whenever a view has no photograph.

2. **Representative reference photography** — freely-licensed photographs of *other, real*
   buildings, interiors and resorts, used to convey the mood of each concept. **They are
   not photographs of the concept properties** (which are fictional), and different angles
   of one concept may show different real buildings. Sourced from **Wikimedia Commons**.

> Status: the coherent, single-building photographic set for each concept is **pending**.
> To produce it, follow `IMAGE_GENERATION_PROMPTS.md` and place the results in
> `src/assets/concepts/<property-id>/`, then point each view's `image` at the local file.

## Reference photography (Wikimedia Commons)

All files below are hosted on `upload.wikimedia.org` and referenced in
`src/data/conceptImagery.ts`. Each links to its Commons file page, where the exact licence
(CC0 / CC BY / CC BY-SA / public domain) and author attribution are recorded. Verify and,
where required, reproduce attribution before any public/commercial launch.

Date curated: 2026-07-24. Method: Wikimedia Commons API keyword search, hand-selected.

### Solara Bay Residence (Miami — waterfront tower)
| View | File (Commons) |
| --- | --- |
| exterior-hero | `Brickell Flatiron - Completed.jpg` |
| terrace | `Brickell City Centre - Flickr - Phillip Pessar.jpg` |
| living-room | `Modern living room with large windows showing view of trees and lake in daylight.jpg` |
| kitchen-dining | `Modern kitchen and dining area with stylish furnishings and natural light in a contemporary home setting.jpg` |
| primary-bedroom | `Hotel bedroom windows (Unsplash).jpg` |
| primary-bathroom | `White towel in tiled bathroom (Unsplash).jpg` |
| sunset-balcony | `DFC 5166 Rooftop lounge glow overlooking Pattayas coastline at night.jpg` |
| material-detail | `Twisting building facade (Unsplash).jpg` |
| evening-view | `Northern Brickell skyline at night 20081203.jpg` |

### Casa Nila (Fort Lauderdale — canal villa)
| View | File (Commons) |
| --- | --- |
| exterior-hero | `3D Rendering of Modern Luxury Villa Exterior with Pool.jpg` |
| entrance | `Black Ember residence - AKL Architects.jpg` |
| pool-dock | `Infinity Edge Pool, Mauritius.JPG` |
| living-room | `Modern luxury living room with kitchen interior.jpg` |
| kitchen-dining | `Blue white kitchen interior (Unsplash).jpg` |
| primary-bedroom | `Canopy bed of Amantaka Suite ... Luang Prabang Laos.jpg` |
| primary-bathroom | `Bathroom of Khan Pool Suite ... Luang Prabang Laos.jpg` |
| sunset-canal | `Infinity pool at Coco Ocean Resort & Spa (The Gambia).jpg` |
| night-exterior | `Dreams-Curacao-Infinity-Pool.jpg` |

### Orchid Courtyard House (Orlando — courtyard)
| View | File (Commons) |
| --- | --- |
| exterior-hero | `Modern residential facade (Unsplash).jpg` |
| courtyard | `Courtyards of SPB 03.jpg` |
| entrance-walk | `Bright white building facade (Unsplash).jpg` |
| living-room | `Modern wooden house interior (Unsplash).jpg` |
| kitchen | `Elegant dining setup ... in a modern room.jpg` |
| primary-bedroom | `NY loft bedroom (Unsplash).jpg` |
| primary-bathroom | `Bathtub of Khan Pool Suite ... Luang Prabang Laos.jpg` |
| garden-pavilion | `Infinity Pool in Buhi Resort.jpg` |
| dusk-courtyard | `Infinity pool at The Lalu Resort, Sun Moon Lake, Taiwan.jpg` |

### Saffron Coast Estate (Palm Beach — coastal estate)
| View | File (Commons) |
| --- | --- |
| exterior-hero | `Infinity Pool Lopesan Costa Meloneras, May 2018.jpg` |
| pool-terrace | `Infinity Pool (1471310973).jpg` |
| living-room | `Modern living room with stylish furniture and a view of the outdoors ... .jpg` |
| staircase | `White staircase (Unsplash).jpg` |
| primary-bedroom | `Bedroom window (Unsplash).jpg` |
| evening-pool | `Infinity pool at Coco Ocean Resort & Spa (The Gambia).jpg` |
| *(exterior-angle, kitchen-dining, primary-bathroom)* | *no photo — original vector render used* |

## Branding

- `src/assets/logo-mark.png`, `src/assets/logo-full.png`, `public/favicon-32.png`,
  `public/favicon-256.png` — cropped from the official Pala Homes logo file supplied
  directly by the client (`src/assets/logo.png.jpeg`, the untouched original). Not
  sourced from Wikimedia/Unsplash/any external search — client-provided brand asset.
- `public/social-preview.svg` — original placeholder, created for this project;
  still worth replacing with a proper OG image built from the new logo before launch.
- `public/favicon.svg` — superseded by the PNG favicons above; no longer referenced,
  kept only for reference and can be deleted.
