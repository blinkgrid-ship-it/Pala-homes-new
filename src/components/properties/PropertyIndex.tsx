import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Property } from '@/types/property';
import { properties, formatRange } from '@/content/loader';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { ConceptBadge } from './ConceptBadge';
import { site } from '@/config/site';
import './PropertyIndex.css';

interface Props {
  onExploreAngles: (p: Property) => void;
  onStepInside: (p: Property, index: number) => void;
}

type Filter = { label: string; test: (p: Property) => boolean };

const FILTERS: Filter[] = [
  { label: 'All Concepts', test: () => true },
  { label: 'Waterfront', test: (p) => p.theme === 'Waterfront' },
  { label: 'Courtyard', test: (p) => p.theme === 'Courtyard' },
  { label: 'Coastal', test: (p) => p.theme === 'Coastal' },
  { label: 'Miami', test: (p) => p.market === 'Miami' },
  { label: 'Fort Lauderdale', test: (p) => p.market === 'Fort Lauderdale' },
  { label: 'Orlando', test: (p) => p.market === 'Orlando' },
  { label: 'Palm Beach', test: (p) => p.market === 'Palm Beach' },
];

/** Editorial, asymmetric index of the collection with restrained filtering. */
export function PropertyIndex({ onExploreAngles, onStepInside }: Props) {
  const [active, setActive] = useState(0);
  const filtered = useMemo(() => properties.filter(FILTERS[active].test), [active]);

  return (
    <section id="index" className="pindex" aria-labelledby="pindex-title">
      <div className="shell">
        <SectionLabel index="II">The Collection, indexed</SectionLabel>
        <h2 id="pindex-title" className="pindex__title">
          Four original architectural concepts
        </h2>
        {site.isConcept && <p className="pindex__note">{site.disclaimers.full}</p>}

        <div className="pindex__filters" role="group" aria-label="Filter concepts">
          {FILTERS.map((f, i) => (
            <button
              key={f.label}
              className={`pindex__filter ${i === active ? 'is-active' : ''}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div layout className="pindex__grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 0.7, 0.2, 1] }}
                className={`pindex__card pindex__card--${i % 3}`}
              >
                <div className="pindex__media">
                  <ImageWithFallback property={p} view={p.views[0]} />
                  <span className="pindex__badge">
                    <ConceptBadge status={p.status} compact />
                  </span>
                </div>
                <div className="pindex__body">
                  <div className="pindex__head">
                    <div>
                      <p className="pindex__loc">{p.location}</p>
                      <h3 className="pindex__name">{p.name}</h3>
                    </div>
                    <span className="pindex__style">{p.status}</span>
                  </div>
                  <div className="pindex__facts">
                    <span>{p.specs.beds} bd</span>
                    <span>{p.specs.baths} ba</span>
                    <span>{p.specs.sqft.toLocaleString()} sqft</span>
                    <span className="pindex__range">{formatRange(p.priceRange.low, p.priceRange.high)}</span>
                  </div>
                  <div className="pindex__actions">
                    <button className="pindex__btn pindex__btn--primary" onClick={() => onExploreAngles(p)}>
                      Quick view
                    </button>
                    <button className="pindex__btn" onClick={() => onStepInside(p, 0)}>
                      Explore angles
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
