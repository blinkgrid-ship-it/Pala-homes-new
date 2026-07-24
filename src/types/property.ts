/**
 * Core domain types for the Pala Homes property system.
 *
 * These types are deliberately generic so that verified real-listing data can
 * replace the concept collection later without touching the UI layer. See
 * `src/data/conceptProperties.ts` for the concept dataset and
 * `CONTENT_REQUIRED.md` for the fields that must be supplied before launch.
 */

/** Architectural family — drives the parametric render engine (ArchScene). */
export type PropertyKind = 'waterfront-tower' | 'canal-villa' | 'courtyard' | 'coastal-estate';

/** Editorial layout variant used by PropertyScene. */
export type SceneVariant = 'editorial-split' | 'full-bleed' | 'presentation-board';

/** Concept status labels — intentionally NOT active-listing states. */
export type ConceptStatus =
  | 'Waterfront Concept'
  | 'Urban Residence Concept'
  | 'Courtyard Concept'
  | 'Coastal Estate Concept'
  | 'Architectural Study';

/** Filter facets for the property index. */
export type PropertyTheme = 'Waterfront' | 'Urban' | 'Courtyard' | 'Coastal';
export type FloridaMarket = 'Miami' | 'Fort Lauderdale' | 'Orlando' | 'Palm Beach' | 'Tampa' | 'Jacksonville';

/** Room / view category — used for gallery filters and accessible captions. */
export type ViewCategory =
  | 'Exterior'
  | 'Living'
  | 'Kitchen'
  | 'Bedrooms'
  | 'Bathrooms'
  | 'Outdoor'
  | 'Details'
  | 'Evening';

/** Lighting mood — the render engine and day-to-dusk transitions read this. */
export type SceneTime = 'day' | 'golden' | 'dusk' | 'evening';

/**
 * A single view of a property. The render engine (ArchScene) produces the
 * visual from `render`; when a real photograph is supplied its path goes in
 * `image` and ImageWithFallback prefers it over the generated render.
 */
export interface PropertyView {
  /** Stable id, e.g. "exterior-hero". Also the intended asset filename stem. */
  id: string;
  /** Short human label for the angle strip, e.g. "Front". */
  label: string;
  category: ViewCategory;
  /** Lighting mood for the parametric render. */
  time: SceneTime;
  /** Which generated scene composition to render. */
  render: RenderScene;
  caption: string;
  /** Descriptive alt text for accessibility. */
  alt: string;
  /** Optional real image path (drop-in replacement for the generated render). */
  image?: string;
  /** Optional mobile-cropped image path. */
  imageMobile?: string;
  priority?: boolean;
}

/** Named scene compositions the ArchScene engine can draw. */
export type RenderScene =
  | 'exterior-hero'
  | 'exterior-angle'
  | 'entrance'
  | 'terrace'
  | 'living'
  | 'kitchen'
  | 'bedroom'
  | 'bathroom'
  | 'pool'
  | 'courtyard'
  | 'staircase'
  | 'detail'
  | 'evening';

/** Per-property colour + material identity so every angle stays coherent. */
export interface PropertyPalette {
  sky: string;
  skyLow: string;
  structure: string;
  structureShade: string;
  accent: string;
  ground: string;
  glass: string;
}

export interface ConceptSpecs {
  beds: number;
  baths: number;
  /** Approximate interior area in square feet. */
  sqft: number;
  highlights: string[];
}

export interface Property {
  id: string;
  index: number;
  name: string;
  /** Malayalam rendering of the name, when supplied. */
  nameMalayalam?: string;
  kind: PropertyKind;
  status: ConceptStatus;
  theme: PropertyTheme;
  market: FloridaMarket;
  /** e.g. "Miami, Florida" */
  location: string;
  variant: SceneVariant;
  palette: PropertyPalette;
  /** One-line architectural statement shown during the disclosure reveal. */
  statement: string;
  /** Longer editorial narrative for quick-view and index. */
  narrative: string;
  materials: string[];
  specs: ConceptSpecs;
  /** Illustrative price range — never a firm asking price. */
  priceRange: { low: number; high: number };
  views: PropertyView[];
}
