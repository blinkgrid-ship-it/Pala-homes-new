import { motion } from 'framer-motion';
import { areas } from '@/data/areas';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ArchScene } from '@/components/ui/ArchScene';
import { conceptProperties } from '@/data/conceptProperties';
import './AreasSection.css';

/** Borrow a coherent palette from a matching concept for each area thumbnail. */
import type { PropertyKind } from '@/types/property';

function paletteFor(kind: PropertyKind) {
  return (conceptProperties.find((p) => p.kind === kind) ?? conceptProperties[0]).palette;
}

export function AreasSection() {
  return (
    <section id="areas" className="areas" aria-labelledby="areas-title">
      <div className="shell">
        <SectionLabel index="V">Florida Areas</SectionLabel>
        <h2 id="areas-title" className="areas__title">
          Selected Florida markets
        </h2>
        <p className="areas__note">
          Areas intended for future Pala Homes coverage and professional-network development.
          Descriptions offer perspective, not a claim of verified present coverage or guaranteed returns.
        </p>

        <div className="areas__grid">
          {areas.map((a, i) => (
            <motion.article
              key={a.name}
              className="areas__card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 0.7, 0.2, 1] }}
            >
              <div className="areas__media">
                <ArchScene
                  property={{ palette: paletteFor(a.render), kind: a.render }}
                  view={{ render: 'exterior-hero', time: 'golden' }}
                  className="arch-scene"
                />
              </div>
              <div className="areas__body">
                <h3 className="areas__name">{a.name}</h3>
                <p className="areas__atmos">{a.atmosphere}</p>
                <p className="areas__ctx">{a.context}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
