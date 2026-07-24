import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  to: number;
  /** Play only when true; the animation runs at most once. */
  play: boolean;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}

/**
 * Counts up to `to` exactly once when `play` first becomes true.
 * Never re-runs on scroll jitter. Reduced motion jumps straight to the value.
 */
export function CountUp({ to, play, decimals = 0, prefix = '', suffix = '', durationMs = 1100 }: Props) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!play || done.current) return;
    done.current = true;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, to, reduced, durationMs]);

  return (
    <span>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
