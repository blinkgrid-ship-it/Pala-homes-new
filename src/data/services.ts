export interface ServiceStep {
  no: string;
  title: string;
  body: string;
}

/** Services presented as a connected journey (see ServicesJourney). */
export const serviceJourney: ServiceStep[] = [
  { no: '01', title: 'Discover', body: 'Understand goals, locations and the kind of property that fits your life.' },
  { no: '02', title: 'Explore', body: 'Review opportunities, neighbourhoods and architectural possibilities together.' },
  { no: '03', title: 'Evaluate', body: 'Coordinate tours, inspections and professional review before decisions.' },
  { no: '04', title: 'Acquire', body: 'Support the purchase process through appropriate licensed professionals.' },
  { no: '05', title: 'Improve', body: 'Connect owners with builders, contractors and trusted service providers.' },
  { no: '06', title: 'Maintain & Learn', body: 'Support continued ownership and ongoing property education.' },
];

/** Capability references — coordination-focused, no unverified regulated claims. */
export const serviceCapabilities: string[] = [
  'Residential property guidance',
  'Investment opportunity review',
  'Builder & developer connections',
  'Contractor coordination',
  'Plumbing service coordination',
  'Licensed inspection coordination',
  'Property education & training',
];
