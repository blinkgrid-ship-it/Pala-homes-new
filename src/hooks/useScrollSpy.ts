import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently dominating the viewport.
 * Observes the given element ids with a single IntersectionObserver.
 */
export function useScrollSpy(ids: string[], offset = 0.4): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = '';
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      { threshold: [0.1, 0.25, 0.5, 0.75], rootMargin: `-${offset * 100}% 0px -${(1 - offset) * 100}% 0px` },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, offset]);

  return active;
}
