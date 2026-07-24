import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import './AboutSection.css';

const reveal = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.7, 0.2, 1], delay: i * 0.1 } }),
};

export function AboutSection() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="shell about__inner">
        <div className="about__lead">
          <SectionLabel index="III">About Pala Homes</SectionLabel>
          <motion.h2
            id="about-title"
            className="about__title"
            variants={reveal}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            Florida opportunity.<br />
            <span className="about__title-accent">Pala trust.</span>
          </motion.h2>
          <motion.p className="about__mal font-mal" variants={reveal} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}>
            വിശ്വാസത്തോടെ, നിങ്ങളുടെ ഫ്ലോറിഡ യാത്ര.
          </motion.p>
        </div>

        <div className="about__body">
          <motion.p variants={reveal} custom={1} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            Pala Homes is designed around a simple belief: property guidance should feel clear,
            personal and thoughtfully presented. Our concept collection demonstrates how future
            Florida opportunities can be explored through architecture, context and informed
            conversation.
          </motion.p>
          <motion.p variants={reveal} custom={2} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            The current collection is a design demonstration — original architectural concepts
            rather than active listings. As verified properties become available, they will
            replace this portfolio within the same considered experience, combining personal
            guidance, professional coordination and cultural familiarity.
          </motion.p>

          <motion.dl className="about__stats" variants={reveal} custom={3} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <div><dt>Concept residences</dt><dd>04</dd></div>
            <div><dt>Florida markets in focus</dt><dd>06</dd></div>
            <div><dt>Angles per concept</dt><dd>09</dd></div>
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
