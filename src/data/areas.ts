export interface Area {
  name: string;
  /** Short 3-letter market code used in the editorial card motif. */
  code: string;
  /** Short atmosphere line. */
  atmosphere: string;
  /** Investment context — framed as perspective, never a guarantee. */
  context: string;
  /** Accent drawn from the palette; rotates so neighbouring cards read distinctly. */
  accent: 'tide' | 'champagne' | 'clay';
}

/**
 * Selected Florida markets — intended for future Pala Homes coverage and
 * professional-network development. Not a claim of verified present coverage.
 *
 * No photography is attached to these cards: they represent real cities we do
 * not yet have verified, licensed photography of, so each uses an original
 * typographic/editorial motif (see AreasSection) rather than a stand-in photo
 * or an illustrated building — honest concept treatment over false specificity.
 */
export const areas: Area[] = [
  { name: 'Miami', code: 'MIA', atmosphere: 'Skyline living, bay light, urban energy.', context: 'A global city market with strong appetite for waterfront and tower residences.', accent: 'tide' },
  { name: 'Fort Lauderdale', code: 'FTL', atmosphere: 'Canal-front calm, boating culture, warm luxury.', context: 'Waterway estates and dockside villas define the premium tier here.', accent: 'champagne' },
  { name: 'Orlando', code: 'ORL', atmosphere: 'Green, family-oriented, steadily growing.', context: 'Space and value support courtyard and garden-oriented family homes.', accent: 'clay' },
  { name: 'Palm Beach', code: 'PBC', atmosphere: 'Coastal elegance, established prestige.', context: 'A market for expansive coastal estates and considered architecture.', accent: 'champagne' },
  { name: 'Tampa', code: 'TPA', atmosphere: 'Bayfront revival, momentum, opportunity.', context: 'An emerging premium market with room for architectural ambition.', accent: 'tide' },
  { name: 'Jacksonville', code: 'JAX', atmosphere: 'River city, space, and coastline.', context: 'Breadth of land supports estate-scale and coastal concepts alike.', accent: 'clay' },
];
