import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { Property } from '@/types/property';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { site } from '@/config/site';
import { formatRange } from '@/content/loader';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { CountUp } from '@/components/ui/CountUp';
import { ConceptBadge } from './ConceptBadge';
import { BlueprintReveal } from './BlueprintReveal';
import './PropertyScene.css';

interface Props {
  property: Property;
  onExploreAngles: (p: Property) => void;
  onStepInside: (p: Property, startIndex: number) => void;
  onDiscuss: (p: Property) => void;
}

/** Fade-up reveal used for staggered content disclosure (phases 3–6). */
const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 0.7, 0.2, 1], delay: 0.55 + i * 0.12 },
  }),
};

export function PropertyScene({ property, onExploreAngles, onStepInside, onDiscuss }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });

  // Subtle parallax: hero image drifts slower than the section.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-6%', '6%']);

  const hero = property.views[0];
  const firstInterior = Math.max(0, property.views.findIndex((v) => ['Living', 'Kitchen', 'Bedrooms'].includes(v.category)));
  // Prefer alternate angles that have real photography; only fall back to a
  // render-only view if fewer than two photographed alternates exist, so the
  // floating boards never expose a bare vector illustration beside a photo.
  const others = property.views.filter((v) => v.id !== hero.id);
  const photographed = others.filter((v) => v.image);
  const anglePanels = (photographed.length >= 2 ? photographed : others).slice(0, 2);

  return (
    <section
      ref={ref}
      className={`scene scene--${property.variant} ${inView ? 'is-in' : ''}`}
      aria-labelledby={`prop-${property.id}-name`}
    >
      {/* full-bleed hero + parallax */}
      <motion.div className="scene__bg" style={{ y }}>
        <ImageWithFallback property={property} view={hero} eager={property.index === 1} />
      </motion.div>
      <div className="scene__scrim" />

      {/* signature disclosure animation */}
      <BlueprintReveal active={inView} reduced={reduced} />

      {/* alternate-angle presentation boards (phase 5) */}
      <div className="scene__boards" aria-hidden="true">
        {anglePanels.map((v, i) => (
          <motion.div
            key={v.id}
            className={`scene__board scene__board--${i}`}
            variants={reduced ? undefined : rise}
            custom={4 + i}
            initial={reduced ? undefined : 'hidden'}
            animate={inView ? 'show' : 'hidden'}
          >
            <ImageWithFallback property={property} view={v} />
            <span className="scene__board-tag">{v.label}</span>
          </motion.div>
        ))}
      </div>

      {/* editorial content */}
      <div className="scene__content">
        <motion.div variants={reduced ? undefined : rise} custom={0} initial={reduced ? undefined : 'hidden'} animate={inView ? 'show' : 'hidden'}>
          <div className="scene__topline">
            <ConceptBadge status={property.status} />
            <span className="scene__index">
              {String(property.index).padStart(2, '0')} / {String(4).padStart(2, '0')}
            </span>
          </div>
        </motion.div>

        <motion.p className="scene__loc" variants={reduced ? undefined : rise} custom={1} initial={reduced ? undefined : 'hidden'} animate={inView ? 'show' : 'hidden'}>
          {property.location}
        </motion.p>

        <motion.h2
          id={`prop-${property.id}-name`}
          className="scene__name"
          variants={reduced ? undefined : rise}
          custom={1}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'show' : 'hidden'}
        >
          {property.name}
          {property.nameMalayalam && <span className="scene__name-mal font-mal"> · {property.nameMalayalam}</span>}
        </motion.h2>

        <motion.p className="scene__statement" variants={reduced ? undefined : rise} custom={2} initial={reduced ? undefined : 'hidden'} animate={inView ? 'show' : 'hidden'}>
          {property.statement}
        </motion.p>

        {/* facts (phase 4) */}
        <motion.dl className="scene__facts" variants={reduced ? undefined : rise} custom={3} initial={reduced ? undefined : 'hidden'} animate={inView ? 'show' : 'hidden'}>
          <div className="scene__fact">
            <dt>Beds</dt>
            <dd><CountUp to={property.specs.beds} play={inView} /></dd>
          </div>
          <div className="scene__fact">
            <dt>Baths</dt>
            <dd><CountUp to={property.specs.baths} play={inView} decimals={property.specs.baths % 1 ? 1 : 0} /></dd>
          </div>
          <div className="scene__fact">
            <dt>Approx.</dt>
            <dd><CountUp to={property.specs.sqft} play={inView} /> <span className="scene__unit">sqft</span></dd>
          </div>
          <div className="scene__fact scene__fact--price">
            <dt>{site.isConcept ? 'Illustrative range' : 'Price'}</dt>
            <dd>{formatRange(property.priceRange.low, property.priceRange.high)}</dd>
          </div>
        </motion.dl>

        {/* actions (phase 6) */}
        <motion.div className="scene__actions" variants={reduced ? undefined : rise} custom={4} initial={reduced ? undefined : 'hidden'} animate={inView ? 'show' : 'hidden'}>
          <button className="scene__btn scene__btn--primary" onClick={() => onExploreAngles(property)}>
            Explore angles →
          </button>
          <button className="scene__btn" onClick={() => onStepInside(property, firstInterior)}>
            Step inside
          </button>
          <button className="scene__btn scene__btn--text" onClick={() => onDiscuss(property)}>
            Discuss a similar property
          </button>
        </motion.div>

        {site.isConcept && <p className="scene__disclaimer">{site.disclaimers.short}</p>}
      </div>
    </section>
  );
}
