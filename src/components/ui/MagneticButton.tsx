import { useRef, type ReactNode } from 'react';
import { site } from '@/config/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  children: ReactNode;
  className?: string;
  /** Pull strength in px. */
  strength?: number;
}

/**
 * Wraps content in a container that gently follows the cursor on desktop.
 * Disabled for touch, reduced-motion, and when the feature flag is off.
 * Purely decorative — never wrap essential-only controls that must stay put.
 */
export function MagneticButton({ children, className, strength = 14 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const enabled = site.features.magneticButtons && !reduced;

  const onMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    ref.current.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  return (
    <span
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ display: 'inline-flex', transition: 'transform 0.25s var(--ease-out)', willChange: 'transform' }}
    >
      {children}
    </span>
  );
}
