import { useEffect, useMemo, useRef, useState } from 'react';
import type { Property, ViewCategory } from '@/types/property';
import { Modal } from '@/components/ui/Modal';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { ConceptBadge } from './ConceptBadge';
import { site } from '@/config/site';
import { formatRange } from '@/content/loader';
import './PropertyGallery.css';

interface Props {
  property: Property | null;
  open: boolean;
  onClose: () => void;
  startIndex?: number;
}

const ALL = 'All' as const;

/** Immersive gallery modal: stage, category filters, thumbnail rail, keyboard + swipe. */
export function PropertyGallery({ property, open, onClose, startIndex = 0 }: Props) {
  const [filter, setFilter] = useState<ViewCategory | typeof ALL>(ALL);
  const [index, setIndex] = useState(startIndex);
  const touch = useRef(0);

  const categories = useMemo(() => {
    if (!property) return [];
    const set = new Set<ViewCategory>(property.views.map((v) => v.category));
    return [ALL, ...Array.from(set)];
  }, [property]);

  const filtered = useMemo(() => {
    if (!property) return [];
    return filter === ALL ? property.views : property.views.filter((v) => v.category === filter);
  }, [property, filter]);

  // Reset when opening a property.
  useEffect(() => {
    if (open) {
      setFilter(ALL);
      setIndex(startIndex);
    }
  }, [open, startIndex, property]);

  // Clamp index when the filtered set changes.
  useEffect(() => {
    if (index >= filtered.length) setIndex(0);
  }, [filtered.length, index]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % Math.max(1, filtered.length));
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + filtered.length) % Math.max(1, filtered.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered.length]);

  if (!property) return null;
  const view = filtered[index] ?? filtered[0];

  const step = (d: number) => setIndex((i) => (i + d + filtered.length) % filtered.length);

  return (
    <Modal open={open} onClose={onClose} label={`${property.name} gallery`} panelClass="gallery">
      <header className="gallery__head">
        <div className="gallery__titles">
          <h2 className="gallery__title">{property.name}</h2>
          <p className="gallery__sub">
            {property.location} · Illustrative range {formatRange(property.priceRange.low, property.priceRange.high)}
          </p>
        </div>
        <div className="gallery__head-right">
          <ConceptBadge status={property.status} compact />
          <button className="gallery__close" onClick={onClose} aria-label="Close gallery">
            ✕
          </button>
        </div>
      </header>

      {/* category filters */}
      <div className="gallery__filters" role="tablist" aria-label="Room categories">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={filter === c}
            className={`gallery__filter ${filter === c ? 'is-active' : ''}`}
            onClick={() => {
              setFilter(c);
              setIndex(0);
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div
        className="gallery__stage"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        }}
      >
        {view && (
          <div className="gallery__frame" key={`${filter}-${index}`}>
            <ImageWithFallback property={property} view={view} eager />
          </div>
        )}
        <button className="gallery__nav gallery__nav--prev" onClick={() => step(-1)} aria-label="Previous image">
          ‹
        </button>
        <button className="gallery__nav gallery__nav--next" onClick={() => step(1)} aria-label="Next image">
          ›
        </button>
        <p className="sr-only" aria-live="polite">
          {view ? `${view.caption}. Image ${index + 1} of ${filtered.length}.` : ''}
        </p>
      </div>

      <footer className="gallery__foot">
        <div className="gallery__meta">
          <span className="gallery__cat">{view?.category}</span>
          <span className="gallery__cap">{view?.caption}</span>
          <span className="gallery__count">
            {index + 1} / {filtered.length}
          </span>
        </div>
        <div className="gallery__thumbs">
          {filtered.map((v, i) => (
            <button
              key={v.id}
              className={`gallery__thumb ${i === index ? 'is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`View ${v.label}`}
            >
              <ImageWithFallback property={property} view={v} />
            </button>
          ))}
        </div>
        {site.isConcept && <p className="gallery__disclaimer">{site.disclaimers.full}</p>}
      </footer>
    </Modal>
  );
}
