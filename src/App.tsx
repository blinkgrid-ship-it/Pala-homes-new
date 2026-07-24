import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { Property } from '@/types/property';
import { site } from '@/config/site';
import { business } from '@/config/business';
import { IntroExperience } from '@/components/intro/IntroExperience';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropertyReel } from '@/components/properties/PropertyReel';
import { PropertyIndex } from '@/components/properties/PropertyIndex';
import { PropertyQuickView } from '@/components/properties/PropertyQuickView';
import { PropertyGallery } from '@/components/properties/PropertyGallery';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesJourney } from '@/components/sections/ServicesJourney';
import { AreasSection } from '@/components/sections/AreasSection';
import { ContactSection, type ContactPrefill } from '@/components/sections/ContactSection';

const INTRO_KEY = 'palahomes.intro.seen.v1';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return localStorage.getItem(INTRO_KEY) !== '1';
    } catch {
      return true;
    }
  });

  const [quickView, setQuickView] = useState<Property | null>(null);
  const [gallery, setGallery] = useState<{ property: Property; index: number } | null>(null);
  const [prefill, setPrefill] = useState<ContactPrefill | undefined>(undefined);

  // Lock body scroll while the intro is up.
  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  const enter = useCallback(() => {
    try {
      localStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* storage unavailable — proceed anyway */
    }
    setShowIntro(false);
    // Let the intro finish fading before scrolling.
    window.setTimeout(() => {
      document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }, []);

  const openQuickView = useCallback((p: Property) => {
    setGallery(null);
    setQuickView(p);
  }, []);

  const openGallery = useCallback((property: Property, index: number) => {
    setQuickView(null);
    setGallery({ property, index });
  }, []);

  const discuss = useCallback((p: Property) => {
    setQuickView(null);
    setGallery(null);
    setPrefill({
      area: p.market,
      message: `I'm interested in a property similar to the ${p.name} concept (${p.location}). Please get in touch to discuss options.`,
    });
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  }, []);

  return (
    <>
      {/* filmic overlay */}
      {site.features.grain && (
        <div className="film" aria-hidden="true">
          <div className="grain" />
          <div className="vignette" />
        </div>
      )}

      <a className="skip-link" href="#collection">
        Skip to concept collection
      </a>

      <AnimatePresence>{showIntro && <IntroExperience key="intro" onEnter={enter} />}</AnimatePresence>

      <Header />

      <main id="top">
        <h1 className="sr-only">
          {business.name} — {business.mission}
        </h1>

        <PropertyReel onExploreAngles={openQuickView} onStepInside={openGallery} onDiscuss={discuss} />
        <PropertyIndex onExploreAngles={openQuickView} onStepInside={openGallery} />
        <AboutSection />
        <ServicesJourney />
        <AreasSection />
        <ContactSection prefill={prefill} />
      </main>

      <Footer />

      {/* shared modals */}
      <PropertyQuickView
        property={quickView}
        open={quickView !== null}
        onClose={() => setQuickView(null)}
        onOpenGallery={openGallery}
        onDiscuss={discuss}
      />
      <PropertyGallery
        property={gallery?.property ?? null}
        open={gallery !== null}
        startIndex={gallery?.index ?? 0}
        onClose={() => setGallery(null)}
      />
    </>
  );
}
