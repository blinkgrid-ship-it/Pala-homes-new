import type { PropertyKind } from '@/types/property';

export interface Area {
  name: string;
  /** Short atmosphere line. */
  atmosphere: string;
  /** Investment context — framed as perspective, never a guarantee. */
  context: string;
  /** Reuses a property render family for a coherent visual thumbnail. */
  render: PropertyKind;
}

/**
 * Selected Florida markets — intended for future Pala Homes coverage and
 * professional-network development. Not a claim of verified present coverage.
 */
export const areas: Area[] = [
  { name: 'Miami', atmosphere: 'Skyline living, bay light, urban energy.', context: 'A global city market with strong appetite for waterfront and tower residences.', render: 'waterfront-tower' },
  { name: 'Fort Lauderdale', atmosphere: 'Canal-front calm, boating culture, warm luxury.', context: 'Waterway estates and dockside villas define the premium tier here.', render: 'canal-villa' },
  { name: 'Orlando', atmosphere: 'Green, family-oriented, steadily growing.', context: 'Space and value support courtyard and garden-oriented family homes.', render: 'courtyard' },
  { name: 'Palm Beach', atmosphere: 'Coastal elegance, established prestige.', context: 'A market for expansive coastal estates and considered architecture.', render: 'coastal-estate' },
  { name: 'Tampa', atmosphere: 'Bayfront revival, momentum, opportunity.', context: 'An emerging premium market with room for architectural ambition.', render: 'waterfront-tower' },
  { name: 'Jacksonville', atmosphere: 'River city, space, and coastline.', context: 'Breadth of land supports estate-scale and coastal concepts alike.', render: 'coastal-estate' },
];
