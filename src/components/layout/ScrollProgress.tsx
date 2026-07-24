import { useScrollProgress } from '@/hooks/useScrollProgress';

/** Thin gold reading-progress bar fixed to the top of the viewport. */
export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="scroll-progress" aria-hidden="true">
      <span className="scroll-progress__bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
