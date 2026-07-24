import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Property } from '@/types/property';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { site } from '@/config/site';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import './PropertyAngleViewer.css';

interface Props {
  property: Property;
  /** Called when the user asks to open the full gallery at the current angle. */
  onOpenGallery?: (index: number) => void;
  /** Auto-cycle a short cinematic preview when idle. */
  autoPreview?: boolean;
  className?: string;
}

const AUTO_DELAY = 3200;
const AUTO_STEP = 2600;
const AUTO_MAX = 3;

/**
 * Multi-angle viewer for a single concept property.
 * - Angle strip (click / keyboard)
 * - Drag-to-explore on desktop, native swipe on touch
 * - Cinematic auto-preview when idle (disabled for reduced motion)
 * Every change updates caption, category, count and an aria-live status.
 */
export function PropertyAngleViewer({ property, onOpenGallery, autoPreview = true, className }: Props) {
  const views = property.views;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [interacted, setInteracted] = useState(false);
  const reduced = useReducedMotion();

  const stageRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<number>(0);
  const autoCountRef = useRef<number>(0);

  const go = useCallback(
    (next: number, viaUser = true) => {
      const n = views.length;
      const target = ((next % n) + n) % n;
      setDir(target > index || (index === n - 1 && target === 0) ? 1 : -1);
      setIndex(target);
      if (viaUser) setInteracted(true);
    },
    [index, views.length],
  );

  // ---- cinematic auto-preview ----
  const stopAuto = useCallback(() => {
    if (autoRef.current) {
      window.clearTimeout(autoRef.current);
      autoRef.current = 0;
    }
  }, []);

  useEffect(() => {
    const enabled = autoPreview && site.features.autoPreview && !reduced && !interacted;
    if (!enabled) {
      stopAuto();
      return;
    }
    const tick = () => {
      if (autoCountRef.current >= AUTO_MAX) return;
      autoCountRef.current += 1;
      setDir(1);
      setIndex((i) => (i + 1) % views.length);
      autoRef.current = window.setTimeout(tick, AUTO_STEP);
    };
    autoRef.current = window.setTimeout(tick, AUTO_DELAY);
    return stopAuto;
  }, [autoPreview, reduced, interacted, views.length, stopAuto]);

  // ---- keyboard ----
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(index - 1);
    }
  };

  // ---- drag / swipe ----
  const drag = useRef<{ x: number; active: boolean }>({ x: 0, active: false });
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, active: true };
    setInteracted(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    drag.current.active = false;
    if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
  };

  const view = views[index];

  const variants = {
    enter: (d: number) => ({ clipPath: d > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', opacity: 1 }),
    center: { clipPath: 'inset(0 0 0 0)', opacity: 1 },
    exit: (d: number) => ({ clipPath: d > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)', opacity: 1 }),
  };

  return (
    <div className={`angle-viewer ${className ?? ''}`.trim()}>
      <div
        ref={stageRef}
        className="angle-viewer__stage"
        role="group"
        aria-roledescription="carousel"
        aria-label={`${property.name} — angle viewer`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{ cursor: 'grab' }}
      >
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={index}
            className="angle-viewer__frame"
            custom={dir}
            variants={reduced ? undefined : variants}
            initial={reduced ? { opacity: 0 } : 'enter'}
            animate={reduced ? { opacity: 1 } : 'center'}
            exit={reduced ? { opacity: 0 } : 'exit'}
            transition={{ duration: reduced ? 0.3 : 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <ImageWithFallback property={property} view={view} eager={index === 0} />
          </motion.div>
        </AnimatePresence>

        {/* caption overlay */}
        <div className="angle-viewer__caption">
          <span className="angle-viewer__cat">{view.category}</span>
          <span className="angle-viewer__cap-text">{view.caption}</span>
        </div>

        {/* count */}
        <div className="angle-viewer__count">
          {index + 1} / {views.length}
        </div>

        {/* prev / next */}
        <button className="angle-viewer__nav angle-viewer__nav--prev" onClick={() => go(index - 1)} aria-label="Previous angle">
          ‹
        </button>
        <button className="angle-viewer__nav angle-viewer__nav--next" onClick={() => go(index + 1)} aria-label="Next angle">
          ›
        </button>

        {onOpenGallery && (
          <button className="angle-viewer__expand" onClick={() => onOpenGallery(index)} aria-label="Open full gallery">
            ⤢ Full gallery
          </button>
        )}

        {/* accessible live status */}
        <p className="sr-only" aria-live="polite">
          Angle {index + 1} of {views.length}: {view.label}, {view.category}. {view.caption}.
        </p>
      </div>

      {/* angle strip */}
      <div className="angle-strip" role="tablist" aria-label="Property angles">
        {views.map((v, i) => (
          <button
            key={v.id}
            role="tab"
            aria-selected={i === index}
            aria-label={`${v.label} — ${v.category}`}
            className={`angle-strip__item ${i === index ? 'is-active' : ''}`}
            onClick={() => go(i)}
          >
            <span className="angle-strip__thumb">
              <ImageWithFallback property={property} view={v} />
            </span>
            <span className="angle-strip__label">{v.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
