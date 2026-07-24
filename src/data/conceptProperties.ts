import type {
  Property,
  PropertyView,
  RenderScene,
  ViewCategory,
  SceneTime,
} from '@/types/property';
import { conceptImagery } from './conceptImagery';

/**
 * The Concept Property Collection.
 *
 * Every property here is an ORIGINAL architectural concept — not a real
 * listing. Prices are illustrative ranges; specifications are concept
 * specifications. Imagery is produced by the parametric render engine
 * (see components/ui/ArchScene). To go live, replace these objects with
 * verified data and attach real image paths to each view's `image` field.
 */

type ViewSeed = {
  id: string;
  label: string;
  category: ViewCategory;
  time: SceneTime;
  render: RenderScene;
  caption: string;
  alt: string;
};

function buildViews(propertyId: string, propertyName: string, seeds: ViewSeed[]): PropertyView[] {
  const images = conceptImagery[propertyId] ?? {};
  return seeds.map((s, i) => ({
    ...s,
    // First view is the hero and loads with priority; rest lazy-load.
    priority: i === 0,
    alt: `Reference visualisation for the ${propertyName} concept: ${s.alt}`,
    // Real reference photograph when curated; otherwise the render is used.
    image: images[s.id],
  }));
}

export const conceptProperties: Property[] = [
  {
    id: 'solara-bay',
    index: 1,
    name: 'Solara Bay Residence',
    kind: 'waterfront-tower',
    status: 'Waterfront Concept',
    theme: 'Waterfront',
    market: 'Miami',
    location: 'Miami, Florida',
    variant: 'full-bleed',
    palette: {
      sky: '#f4d9b0',
      skyLow: '#e6a86b',
      structure: '#e9dcc2',
      structureShade: '#c9b48c',
      accent: '#a67c2e',
      ground: '#2f6f7a',
      glass: '#1f6b52',
    },
    statement:
      'A sky residence where warm limestone meets the bay — tropical modernism at altitude.',
    narrative:
      'Solara Bay reimagines the Miami sky residence as something warm rather than cold. Floor-to-ceiling glazing frames the water while bronze detailing and soft emerald interior accents temper the light. An expansive private terrace turns the horizon into the primary room.',
    materials: ['Warm limestone', 'Bronze metalwork', 'Floor-to-ceiling glazing', 'Emerald accents'],
    specs: {
      beds: 3,
      baths: 3.5,
      sqft: 2850,
      highlights: ['Private terrace', 'Open-plan living', 'Panoramic bay & city views'],
    },
    priceRange: { low: 2_400_000, high: 2_800_000 },
    views: buildViews('solara-bay', 'Solara Bay Residence', [
      { id: 'exterior-hero', label: 'Tower', category: 'Exterior', time: 'golden', render: 'exterior-hero', caption: 'Waterfront sky residence at golden hour', alt: 'a warm limestone waterfront tower rising above the bay in late-afternoon light' },
      { id: 'terrace', label: 'Terrace', category: 'Outdoor', time: 'golden', render: 'terrace', caption: 'Expansive private terrace, three-quarter angle', alt: 'a wraparound terrace with bronze railings overlooking open water' },
      { id: 'living-room', label: 'Living', category: 'Living', time: 'day', render: 'living', caption: 'Open-plan living with floor-to-ceiling glazing', alt: 'an open living room with full-height glass and emerald accents' },
      { id: 'kitchen-dining', label: 'Kitchen', category: 'Kitchen', time: 'day', render: 'kitchen', caption: 'Kitchen and dining area', alt: 'a limestone island kitchen opening onto a dining space' },
      { id: 'primary-bedroom', label: 'Suite', category: 'Bedrooms', time: 'golden', render: 'bedroom', caption: 'Primary bedroom with bay view', alt: 'a calm primary bedroom facing the water' },
      { id: 'primary-bathroom', label: 'Bath', category: 'Bathrooms', time: 'day', render: 'bathroom', caption: 'Primary bathroom', alt: 'a stone primary bathroom with a freestanding tub by glazing' },
      { id: 'sunset-balcony', label: 'Sunset', category: 'Outdoor', time: 'dusk', render: 'terrace', caption: 'Sunset from the balcony', alt: 'the terrace at dusk with the city skyline beyond' },
      { id: 'material-detail', label: 'Detail', category: 'Details', time: 'day', render: 'detail', caption: 'Architectural material detail', alt: 'a close study of limestone, bronze and glass joinery' },
      { id: 'evening-view', label: 'Evening', category: 'Evening', time: 'evening', render: 'evening', caption: 'Evening exterior, alternate view', alt: 'the tower glowing with warm interior light after dark' },
    ]),
  },
  {
    id: 'casa-nila',
    index: 2,
    name: 'Casa Nila',
    nameMalayalam: 'കാസ നീല',
    kind: 'canal-villa',
    status: 'Waterfront Concept',
    theme: 'Waterfront',
    market: 'Fort Lauderdale',
    location: 'Fort Lauderdale, Florida',
    variant: 'editorial-split',
    palette: {
      sky: '#f6e4c4',
      skyLow: '#d6996a',
      structure: '#f3efe6',
      structureShade: '#d8cdb8',
      accent: '#a67c2e',
      ground: '#2b7c86',
      glass: '#1f6b52',
    },
    statement:
      'A canal-front villa of white limestone and timber — calm water, warm luxury.',
    narrative:
      'Casa Nila sits low and confident on the water. A double-height living room dissolves into the terrace through sliding glass, while timber soffits and tropical landscaping keep the mood warm rather than clinical. The private dock makes the canal an extension of the home.',
    materials: ['White limestone', 'Timber soffits', 'Sliding glass walls', 'Tropical planting'],
    specs: {
      beds: 4,
      baths: 4.5,
      sqft: 4100,
      highlights: ['Pool & private dock', 'Outdoor kitchen', 'Double-height living'],
    },
    priceRange: { low: 3_100_000, high: 3_700_000 },
    views: buildViews('casa-nila', 'Casa Nila', [
      { id: 'exterior-hero', label: 'Waterfront', category: 'Exterior', time: 'golden', render: 'exterior-hero', caption: 'Canal-front villa at golden hour', alt: 'a low white limestone villa reflected in a calm canal' },
      { id: 'entrance', label: 'Entrance', category: 'Exterior', time: 'day', render: 'entrance', caption: 'Front entrance angle', alt: 'a timber-lined entrance framed by tropical planting' },
      { id: 'pool-dock', label: 'Pool', category: 'Outdoor', time: 'day', render: 'pool', caption: 'Pool and dock view', alt: 'an infinity-edge pool leading to a private boat dock' },
      { id: 'living-room', label: 'Living', category: 'Living', time: 'day', render: 'living', caption: 'Double-height living room', alt: 'a double-height living room opening to the water' },
      { id: 'kitchen-dining', label: 'Kitchen', category: 'Kitchen', time: 'day', render: 'kitchen', caption: 'Kitchen and dining area', alt: 'a bright kitchen and dining area with timber ceiling' },
      { id: 'primary-bedroom', label: 'Suite', category: 'Bedrooms', time: 'golden', render: 'bedroom', caption: 'Primary bedroom', alt: 'a serene primary bedroom facing the canal' },
      { id: 'primary-bathroom', label: 'Bath', category: 'Bathrooms', time: 'day', render: 'bathroom', caption: 'Primary bathroom', alt: 'a limestone bathroom with garden outlook' },
      { id: 'sunset-canal', label: 'Sunset', category: 'Outdoor', time: 'dusk', render: 'pool', caption: 'Sunset canal view', alt: 'the pool terrace and canal at dusk' },
      { id: 'night-exterior', label: 'Night', category: 'Evening', time: 'evening', render: 'evening', caption: 'Night exterior with interior lights', alt: 'the villa at night glowing over the water' },
    ]),
  },
  {
    id: 'orchid-courtyard',
    index: 3,
    name: 'Orchid Courtyard House',
    kind: 'courtyard',
    status: 'Courtyard Concept',
    theme: 'Courtyard',
    market: 'Orlando',
    location: 'Orlando, Florida',
    variant: 'presentation-board',
    palette: {
      sky: '#f7e6c6',
      skyLow: '#e0b072',
      structure: '#e7d4b6',
      structureShade: '#c79a6a',
      accent: '#c07a4e',
      ground: '#6d8f52',
      glass: '#1f6b52',
    },
    statement:
      'A private courtyard residence — warm stucco, a still reflecting pool, dappled light.',
    narrative:
      'Orchid Courtyard turns inward. Rooms wrap a shaded central courtyard with a still reflecting pool, a restrained nod to Kerala courtyard living translated into warm Florida stucco and clay tones. Natural timber and soft daylight make it family-oriented without losing composure.',
    materials: ['Warm stucco', 'Clay-toned surfaces', 'Natural timber', 'Reflecting pool'],
    specs: {
      beds: 4,
      baths: 3.5,
      sqft: 3450,
      highlights: ['Private courtyard', 'Home office', 'Garden pavilion'],
    },
    priceRange: { low: 1_400_000, high: 1_800_000 },
    views: buildViews('orchid-courtyard', 'Orchid Courtyard House', [
      { id: 'exterior-hero', label: 'Front', category: 'Exterior', time: 'golden', render: 'exterior-hero', caption: 'Front architectural view', alt: 'a warm stucco courtyard house behind low planting' },
      { id: 'courtyard', label: 'Courtyard', category: 'Outdoor', time: 'day', render: 'courtyard', caption: 'Courtyard wide view', alt: 'a shaded central courtyard with a still reflecting pool' },
      { id: 'entrance-walk', label: 'Entrance', category: 'Exterior', time: 'day', render: 'entrance', caption: 'Entrance walkway', alt: 'a timber-shaded entrance walkway beside the garden' },
      { id: 'living-room', label: 'Living', category: 'Living', time: 'day', render: 'living', caption: 'Living room opening to the courtyard', alt: 'a living room that slides open onto the courtyard' },
      { id: 'kitchen', label: 'Kitchen', category: 'Kitchen', time: 'day', render: 'kitchen', caption: 'Kitchen', alt: 'a warm timber-and-stone kitchen' },
      { id: 'primary-bedroom', label: 'Suite', category: 'Bedrooms', time: 'golden', render: 'bedroom', caption: 'Primary bedroom', alt: 'a restful primary bedroom overlooking the garden' },
      { id: 'primary-bathroom', label: 'Bath', category: 'Bathrooms', time: 'day', render: 'bathroom', caption: 'Bathroom', alt: 'a naturally lit bathroom with clay tones' },
      { id: 'garden-pavilion', label: 'Pavilion', category: 'Outdoor', time: 'golden', render: 'pool', caption: 'Garden pavilion', alt: 'a timber garden pavilion beside the reflecting pool' },
      { id: 'dusk-courtyard', label: 'Dusk', category: 'Evening', time: 'dusk', render: 'evening', caption: 'Dusk courtyard view', alt: 'the courtyard at dusk with warm lantern light' },
    ]),
  },
  {
    id: 'saffron-coast',
    index: 4,
    name: 'Saffron Coast Estate',
    kind: 'coastal-estate',
    status: 'Coastal Estate Concept',
    theme: 'Coastal',
    market: 'Palm Beach',
    location: 'Palm Beach County, Florida',
    variant: 'full-bleed',
    palette: {
      sky: '#f6ddb4',
      skyLow: '#dfa06a',
      structure: '#f0e7d5',
      structureShade: '#d3c3a4',
      accent: '#a67c2e',
      ground: '#3a8f86',
      glass: '#1f6b52',
    },
    statement:
      'A coastal contemporary estate in travertine and cream — sculptural, serene, expansive.',
    narrative:
      'Saffron Coast is the collection at its most expansive. Warm travertine and pale cream render meet large framed openings and a sculptural staircase at the heart of the plan. Ocean-influenced landscaping and a generous pool terrace hold the composition together with quiet brass detailing.',
    materials: ['Warm travertine', 'Pale cream render', 'Large framed openings', 'Brass detailing'],
    specs: {
      beds: 5,
      baths: 5.5,
      sqft: 5600,
      highlights: ['Pool terrace', 'Library', 'Outdoor lounge'],
    },
    priceRange: { low: 4_600_000, high: 5_400_000 },
    views: buildViews('saffron-coast', 'Saffron Coast Estate', [
      { id: 'exterior-hero', label: 'Front', category: 'Exterior', time: 'golden', render: 'exterior-hero', caption: 'Front exterior', alt: 'a broad cream-and-travertine coastal estate at golden hour' },
      { id: 'exterior-angle', label: '3/4 View', category: 'Exterior', time: 'day', render: 'exterior-angle', caption: 'Three-quarter exterior', alt: 'the estate seen from a three-quarter angle' },
      { id: 'pool-terrace', label: 'Pool', category: 'Outdoor', time: 'golden', render: 'pool', caption: 'Rear pool terrace', alt: 'a generous rear pool terrace with framed openings' },
      { id: 'living-room', label: 'Living', category: 'Living', time: 'day', render: 'living', caption: 'Main living space', alt: 'a large neutral living space with sculptural volume' },
      { id: 'kitchen-dining', label: 'Kitchen', category: 'Kitchen', time: 'day', render: 'kitchen', caption: 'Kitchen and dining', alt: 'an expansive kitchen and dining area in travertine' },
      { id: 'staircase', label: 'Stair', category: 'Details', time: 'day', render: 'staircase', caption: 'Sculptural staircase', alt: 'a sculptural curving staircase in a bright double-height hall' },
      { id: 'primary-bedroom', label: 'Suite', category: 'Bedrooms', time: 'golden', render: 'bedroom', caption: 'Primary suite', alt: 'a large primary suite with framed ocean-side outlook' },
      { id: 'primary-bathroom', label: 'Bath', category: 'Bathrooms', time: 'day', render: 'bathroom', caption: 'Primary bathroom', alt: 'a travertine primary bathroom with brass fittings' },
      { id: 'evening-pool', label: 'Evening', category: 'Evening', time: 'evening', render: 'evening', caption: 'Evening pool view', alt: 'the pool terrace glowing at night' },
    ]),
  },
];

export const propertyThemes = ['Waterfront', 'Urban', 'Courtyard', 'Coastal'] as const;
export const propertyMarkets = ['Miami', 'Fort Lauderdale', 'Orlando', 'Palm Beach'] as const;

/** Format an illustrative price range as a compact label, e.g. "$2.4M–$2.8M". */
export function formatRange(low: number, high: number): string {
  const m = (n: number) => `$${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  return `${m(low)}–${m(high)}`;
}
