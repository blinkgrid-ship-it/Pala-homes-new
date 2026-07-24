import { motion } from 'framer-motion';
import { serviceJourney, serviceCapabilities } from '@/data/services';
import { SectionLabel } from '@/components/ui/SectionLabel';
import './ServicesJourney.css';

export function ServicesJourney() {
  return (
    <section id="services" className="services" aria-labelledby="services-title">
      <div className="shell">
        <SectionLabel index="IV">Services</SectionLabel>
        <h2 id="services-title" className="services__title">
          A connected journey, end to end
        </h2>

        <ol className="services__steps">
          {serviceJourney.map((s, i) => (
            <motion.li
              key={s.no}
              className="services__step"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: [0.22, 0.7, 0.2, 1], delay: (i % 3) * 0.08 }}
            >
              <span className="services__no">{s.no}</span>
              <h3 className="services__step-title">{s.title}</h3>
              <p className="services__step-body">{s.body}</p>
            </motion.li>
          ))}
        </ol>

        <div className="services__caps">
          <h3 className="services__caps-title">Capabilities we help coordinate</h3>
          <ul className="services__chips">
            {serviceCapabilities.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="services__disclaimer">
            Regulated services are delivered through appropriate licensed professionals. Pala Homes
            coordinates introductions and does not itself claim to provide licensed services unless
            separately verified.
          </p>
        </div>
      </div>
    </section>
  );
}
