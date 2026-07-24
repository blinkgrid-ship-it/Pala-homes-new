import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/config/navigation';
import { business } from '@/config/business';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { ScrollProgress } from './ScrollProgress';
import './Header.css';

const IDS = navigation.map((n) => n.id);

export function Header() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(IDS);
  const menuRef = useRef<HTMLDivElement>(null);
  useFocusTrap(menuRef, menuOpen, () => setMenuOpen(false));

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <ScrollProgress />
      <header className={`header ${solid ? 'is-solid' : ''}`}>
        <div className="header__inner shell">
          <a
            className="header__brand"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="header__logo" aria-hidden="true">
              <svg viewBox="0 0 40 40">
                <path d="M20 5 L24 17 L16 17 Z" fill="var(--emerald)" />
                <rect x="17.5" y="15" width="5" height="9" fill="var(--emerald)" />
                <circle cx="20" cy="21" r="2.4" fill="var(--cream)" stroke="var(--brass)" strokeWidth="0.6" />
                <path d="M8 33 L20 24 L32 33 Z" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="header__name">
              {business.name}
              <span className="header__mal font-mal">{business.taglineMalayalam}</span>
            </span>
          </a>

          <nav className="header__nav" aria-label="Primary">
            {navigation.map((n) => (
              <a
                key={n.id}
                href={n.href}
                className={`header__link ${active === n.id ? 'is-active' : ''}`}
                aria-current={active === n.id ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(n.href);
                }}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="header__cta" onClick={(e) => { e.preventDefault(); go('#contact'); }}>
            Discuss your requirements
          </a>

          <button
            className={`header__burger ${menuOpen ? 'is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* mobile menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          {navigation.map((n) => (
            <a key={n.id} href={n.href} className="mobile-menu__link" onClick={(e) => { e.preventDefault(); go(n.href); }}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu__actions">
          <a className="mobile-menu__primary" href="#contact" onClick={(e) => { e.preventDefault(); go('#contact'); }}>
            Book a consultation
          </a>
        </div>
        <p className="mobile-menu__mal font-mal">{business.taglineMalayalam}</p>
      </div>
    </>
  );
}
