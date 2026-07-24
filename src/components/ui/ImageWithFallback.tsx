import { useState } from 'react';
import type { Property, PropertyView } from '@/types/property';
import { ArchScene } from './ArchScene';

interface Props {
  property: Property;
  view: PropertyView;
  className?: string;
  /** Hint eager loading for above-the-fold heroes. */
  eager?: boolean;
}

/**
 * Renders a real photograph when `view.image` is supplied and loads
 * successfully; otherwise falls back to the parametric ArchScene render.
 * This is the single seam through which verified imagery replaces concept
 * imagery — no other component needs to change.
 */
export function ImageWithFallback({ property, view, className, eager }: Props) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(view.image) && !failed;

  return (
    <div className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <ArchScene property={property} view={view} className="arch-scene" />
      {showPhoto && (
        <img
          src={view.image}
          srcSet={view.imageMobile ? `${view.imageMobile} 800w, ${view.image} 1600w` : undefined}
          sizes="100vw"
          alt={view.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
    </div>
  );
}
