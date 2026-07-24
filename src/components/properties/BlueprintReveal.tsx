import './BlueprintReveal.css';

interface Props {
  /** Play the reveal once this becomes true. */
  active: boolean;
  reduced: boolean;
}

/**
 * "Blueprint-to-Built" — the signature disclosure animation.
 *
 * Phase 1 (trace): brass architectural lines draw over a darkened frame.
 * Phase 2 (material reveal): three panels retract along vertical building lines
 *   to uncover the image beneath.
 *
 * Entirely CSS/compositor-driven (opacity + transform + stroke-dashoffset) so it
 * never blocks the main thread, causes no layout shift, and is pointer-transparent
 * — the user can interact with the scene before it finishes. Skipped for reduced motion.
 */
export function BlueprintReveal({ active, reduced }: Props) {
  if (reduced) return null;
  return (
    <div className={`blueprint ${active ? 'is-playing' : ''}`} aria-hidden="true">
      {/* darkening veil */}
      <div className="blueprint__veil" />

      {/* phase 1: architectural trace */}
      <svg className="blueprint__trace" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="var(--gold)" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
          <path className="bp-line bp-1" pathLength={1} d="M120 640 H1480" />
          <path className="bp-line bp-2" pathLength={1} d="M300 640 V220 H1120 V640" />
          <path className="bp-line bp-3" pathLength={1} d="M470 640 V330 H950 V640" />
          <path className="bp-line bp-4" pathLength={1} d="M710 330 V150 L820 150 V330" />
          <path className="bp-line bp-5" pathLength={1} d="M300 300 H1120 M300 440 H1120" />
        </g>
      </svg>

      {/* phase 2: material-reveal panels */}
      <div className="blueprint__panels">
        <span className="blueprint__panel bp-p1" />
        <span className="blueprint__panel bp-p2" />
        <span className="blueprint__panel bp-p3" />
      </div>
    </div>
  );
}
