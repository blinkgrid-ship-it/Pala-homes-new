import { business } from '@/config/business';
import { navigation } from '@/config/navigation';
import { site } from '@/config/site';
import './Footer.css';

export function Footer() {
  const year = 2026; // static: build environment forbids Date.now(); update on release.
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <span className="footer__name font-display">{business.name}</span>
          <span className="footer__mal font-mal">{business.brandLineMalayalam}</span>
          <p className="footer__mission">{business.mission}</p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          {navigation.map((n) => (
            <a key={n.id} href={n.href}>{n.label}</a>
          ))}
        </nav>

        <div className="footer__contact">
          <a href={`mailto:${business.contact.email}`}>{business.contact.email}</a>
          <a href={business.contact.phoneHref}>{business.contact.phoneDisplay}</a>
          <span className="footer__regions">{business.regions.join(' · ')}</span>
        </div>
      </div>

      {site.isConcept && (
        <div className="shell footer__disclaimer">
          <p>{site.disclaimers.full}</p>
          <p className="footer__render-note">{site.disclaimers.render}</p>
        </div>
      )}

      <div className="shell footer__base">
        <span>© {year} {business.name}. Concept demonstration.</span>
        <span className="font-mal">{business.taglineMalayalam}</span>
      </div>
    </footer>
  );
}
