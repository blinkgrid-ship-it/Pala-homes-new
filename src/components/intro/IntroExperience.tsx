import { motion } from 'framer-motion';
import { business } from '@/config/business';
import { conceptProperties } from '@/data/conceptProperties';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ArchScene } from '@/components/ui/ArchScene';
import './IntroExperience.css';

interface Props {
  onEnter: () => void;
}

/**
 * Cinematic opening. Uses the strongest concept property at dusk as a warm
 * architectural backdrop, reveals the wordmark and taglines in sequence, then
 * hands off to the collection. Respects reduced motion. The parent (App) is
 * responsible for skipping this entirely for returning visitors.
 */
export function IntroExperience({ onEnter }: Props) {
  const reduced = useReducedMotion();
  const hero = conceptProperties[0];
  const heroView = { render: 'exterior-hero' as const, time: 'dusk' as const };

  const seq = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: [0.22, 0.7, 0.2, 1], delay },
        };

  return (
    <motion.div
      className="intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      <motion.div
        className="intro__bg"
        initial={reduced ? { opacity: 0.5 } : { scale: 1.14, opacity: 0 }}
        animate={reduced ? { opacity: 0.5 } : { scale: 1.05, opacity: 0.6 }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
      >
        <ArchScene property={hero} view={heroView} />
      </motion.div>
      <div className="intro__scrim" />

      <div className="intro__inner">
        <motion.p className="intro__kicker" {...seq(0.15)}>
          {business.regions.join(' · ')}
        </motion.p>

        <motion.h1 className="intro__wordmark" {...seq(0.4)}>
          {business.name}
        </motion.h1>

        <motion.p className="intro__tagline" {...seq(0.7)}>
          {business.tagline}
        </motion.p>

        <motion.div
          className="intro__rule"
          initial={reduced ? { opacity: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 0.7, 0.2, 1], delay: reduced ? 0 : 1 }}
          aria-hidden="true"
        />

        <motion.p className="intro__mal font-mal" {...seq(1.1)}>
          {business.taglineMalayalam}
        </motion.p>

        <motion.p className="intro__mission" {...seq(1.3)}>
          {business.mission}
        </motion.p>

        <motion.div className="intro__actions" {...seq(1.55)}>
          <button className="intro__enter" onClick={onEnter}>
            Explore the collection ↓
          </button>
          <button className="intro__skip" onClick={onEnter}>
            Skip intro
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
