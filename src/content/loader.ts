import type { Property } from '@/types/property';

/**
 * The content-adapter seam. Every listing lives as one JSON file in
 * `src/content/listings/`, edited by the owner through the CMS admin at
 * `/admin` (see public/admin/config.yml) or directly on disk. No other part
 * of the app imports listing data any other way — swapping this source for
 * a database later means editing only this file.
 */
const modules = import.meta.glob('./listings/*.json', { eager: true }) as Record<
  string,
  { default: Omit<Property, 'views'> & { views: Array<Property['views'][number] & { alt: string }> } }
>;

export const properties: Property[] = Object.values(modules)
  .map((m) => {
    const raw = m.default;
    return {
      ...raw,
      views: raw.views.map((v) => ({
        ...v,
        // The CMS only asks the owner for a short descriptive alt phrase;
        // the accessible-name boilerplate is applied consistently here.
        alt: `Reference visualisation for the ${raw.name} concept: ${v.alt}`,
      })),
    };
  })
  .sort((a, b) => a.index - b.index);

export function getProperty(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

/** Format an illustrative price range as a compact label, e.g. "$2.4M–$2.8M". */
export function formatRange(low: number, high: number): string {
  const m = (n: number) => `$${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  return `${m(low)}–${m(high)}`;
}
