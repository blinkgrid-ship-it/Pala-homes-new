import { useId, type ReactNode } from 'react';
import type { Property, PropertyView } from '@/types/property';

/**
 * ArchScene — parametric architectural visualisation engine.
 *
 * Renders an ORIGINAL, deliberately non-photographic vector scene for a given
 * property + view. Every angle of one property shares the same palette and
 * massing signature, so the collection reads as coherent multi-angle views of
 * a single design rather than unrelated stock images. This is honest concept
 * imagery: it never pretends to be a photograph. Real photographs, when
 * available, are layered on top via ImageWithFallback.
 *
 * Output is a 16:10 SVG that scales to fill its container (slice crop), with a
 * subtle time-of-day grade so day / golden / dusk / evening feel distinct.
 */

const W = 1600;
const H = 1000;

interface Props {
  property: Pick<Property, 'palette' | 'kind'>;
  view: Pick<PropertyView, 'render' | 'time'>;
  className?: string;
}

/** Deterministic tint + light-source per time of day. */
function grade(time: PropertyView['time']) {
  switch (time) {
    case 'golden':
      return { tint: 'rgba(255,178,92,0.16)', dark: 0.1, sun: '#ffd27a', sunY: 300, glow: 0.5 };
    case 'dusk':
      return { tint: 'rgba(196,86,96,0.3)', dark: 0.28, sun: '#ff9d6b', sunY: 420, glow: 0.55 };
    case 'evening':
      return { tint: 'rgba(18,26,54,0.55)', dark: 0.5, sun: '#fff0c4', sunY: 220, glow: 0.28 };
    default:
      return { tint: 'rgba(150,196,214,0.12)', dark: 0.04, sun: '#fff3d0', sunY: 240, glow: 0.4 };
  }
}

export function ArchScene({ property, view, className }: Props) {
  const uid = useId().replace(/[:]/g, '');
  const p = property.palette;
  const g = grade(view.time);
  const isEvening = view.time === 'evening' || view.time === 'dusk';

  const scene = view.render;
  const isInterior = ['living', 'kitchen', 'bedroom', 'bathroom', 'staircase'].includes(scene);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sky} />
          <stop offset="1" stopColor={p.skyLow} />
        </linearGradient>
        <linearGradient id={`ground-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.ground} stopOpacity="0.95" />
          <stop offset="1" stopColor={p.ground} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.glass} stopOpacity="0.55" />
          <stop offset="1" stopColor={p.sky} stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={`struc-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={p.structure} />
          <stop offset="1" stopColor={p.structureShade} />
        </linearGradient>
        <radialGradient id={`sun-${uid}`} cx="0.72" cy={`${g.sunY / H}`} r="0.6">
          <stop offset="0" stopColor={g.sun} stopOpacity={g.glow} />
          <stop offset="0.4" stopColor={g.sun} stopOpacity={g.glow * 0.3} />
          <stop offset="1" stopColor={g.sun} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`floor-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.structureShade} />
          <stop offset="1" stopColor={p.structure} />
        </linearGradient>
      </defs>

      {isInterior
        ? renderInterior(scene, p, g, uid, isEvening)
        : renderExterior(scene, property.kind, p, g, uid, isEvening)}

      {/* time-of-day grade + vignette */}
      <rect x="0" y="0" width={W} height={H} fill={g.tint} />
      <rect x="0" y="0" width={W} height={H} fill="#000" opacity={g.dark} />
      <rect x="0" y="0" width={W} height={H} fill={`url(#vig-${uid})`} />
      <radialGradient id={`vig-${uid}`} cx="0.5" cy="0.45" r="0.75">
        <stop offset="0.55" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.45" />
      </radialGradient>
    </svg>
  );
}

/* ============================ exteriors ============================ */

function renderExterior(
  scene: string,
  kind: Property['kind'],
  p: Property['palette'],
  g: ReturnType<typeof grade>,
  uid: string,
  evening: boolean,
) {
  const horizon = 560;
  const litWindow = evening ? p.sky : `url(#glass-${uid})`;
  const winOpacity = evening ? 0.9 : 1;

  // shared sky + sun + ground/water
  const base = (
    <>
      <rect x="0" y="0" width={W} height={H} fill={`url(#sky-${uid})`} />
      <rect x="0" y="0" width={W} height={H} fill={`url(#sun-${uid})`} />
      <circle cx="1150" cy={g.sunY} r={evening ? 46 : 70} fill={g.sun} opacity={evening ? 0.85 : 0.7} />
      <rect x="0" y={horizon} width={W} height={H - horizon} fill={`url(#ground-${uid})`} />
    </>
  );

  // massing per architectural family
  let building: ReactNode = null;

  if (scene === 'pool' || scene === 'terrace' || scene === 'courtyard') {
    return (
      <>
        {base}
        {renderOutdoor(scene, p, g, evening)}
      </>
    );
  }
  if (scene === 'detail') {
    return renderDetail(p, uid, evening);
  }

  switch (kind) {
    case 'waterfront-tower':
      building = towerMass(p, uid, litWindow, winOpacity, evening, scene);
      break;
    case 'canal-villa':
      building = villaMass(p, uid, litWindow, winOpacity, evening, scene);
      break;
    case 'courtyard':
      building = courtyardMass(p, uid, litWindow, winOpacity, evening, scene);
      break;
    case 'coastal-estate':
      building = estateMass(p, uid, litWindow, winOpacity, evening, scene);
      break;
  }

  return (
    <>
      {base}
      {/* water/ground reflection band */}
      <rect x="0" y={horizon} width={W} height="16" fill="#fff" opacity="0.06" />
      {building}
      {landscaping(horizon)}
    </>
  );
}

function towerMass(
  p: Property['palette'],
  uid: string,
  win: string,
  winOp: number,
  evening: boolean,
  scene: string,
) {
  const x = scene === 'exterior-angle' ? 640 : 560;
  const w = 380;
  const top = 150;
  const base = 620;
  const glazingRows = 11;
  const rowH = (base - top) / glazingRows;
  return (
    <g>
      {/* body */}
      <rect x={x} y={top} width={w} height={base - top} fill={`url(#struc-${uid})`} />
      {/* setback side volume */}
      <rect x={x - 120} y={top + 130} width={120} height={base - top - 130} fill={p.structureShade} />
      {/* glazing grid */}
      {Array.from({ length: glazingRows }).map((_, r) => (
        <rect
          key={r}
          x={x + 26}
          y={top + 22 + r * rowH}
          width={w - 52}
          height={rowH - 14}
          fill={win}
          opacity={evening ? (r % 2 === 0 ? winOp : winOp * 0.5) : winOp * 0.85}
        />
      ))}
      {/* bronze mullions */}
      <rect x={x + w / 2 - 3} y={top} width={6} height={base - top} fill={p.accent} opacity="0.6" />
      {/* rooftop terrace hint */}
      <rect x={x - 8} y={top - 16} width={w + 16} height={16} fill={p.accent} opacity="0.7" />
      {/* reflection */}
      <rect x={x} y={620} width={w} height={90} fill={`url(#struc-${uid})`} opacity="0.2" transform={`scale(1,-1) translate(0,${-620 * 2 - 90})`} />
    </g>
  );
}

function villaMass(
  p: Property['palette'],
  uid: string,
  win: string,
  winOp: number,
  evening: boolean,
  scene: string,
) {
  const y = 360;
  const shift = scene === 'entrance' ? 120 : 0;
  return (
    <g transform={`translate(${shift},0)`}>
      {/* long low body */}
      <rect x="360" y={y} width="760" height="200" fill={`url(#struc-${uid})`} />
      {/* raised wing */}
      <rect x="900" y={y - 120} width="260" height="320" fill={p.structureShade} />
      {/* timber soffit line */}
      <rect x="360" y={y - 14} width="800" height="14" fill={p.accent} opacity="0.8" />
      <rect x="360" y={y + 186} width="760" height="14" fill={p.accent} opacity="0.45" />
      {/* full-height glazing bays */}
      {[400, 520, 640, 760].map((gx) => (
        <rect key={gx} x={gx} y={y + 20} width="90" height="160" fill={win} opacity={evening ? winOp : winOp * 0.85} />
      ))}
      {[940, 1050].map((gx) => (
        <rect key={gx} x={gx} y={y - 90} width="80" height="250" fill={win} opacity={evening ? winOp : winOp * 0.8} />
      ))}
      {/* reflection in canal */}
      <rect x="360" y="560" width="800" height="120" fill={p.structure} opacity="0.14" />
    </g>
  );
}

function courtyardMass(
  p: Property['palette'],
  uid: string,
  win: string,
  winOp: number,
  evening: boolean,
  scene: string,
) {
  const y = 380;
  const shift = scene === 'entrance' ? 90 : 0;
  return (
    <g transform={`translate(${shift},0)`}>
      {/* two wings framing an implied courtyard */}
      <rect x="330" y={y} width="330" height="200" fill={`url(#struc-${uid})`} />
      <rect x="940" y={y} width="330" height="200" fill={`url(#struc-${uid})`} />
      {/* low connecting volume (courtyard wall) */}
      <rect x="660" y={y + 70} width="280" height="130" fill={p.structureShade} />
      {/* deep timber overhangs */}
      <rect x="315" y={y - 12} width="360" height="12" fill={p.accent} opacity="0.8" />
      <rect x="925" y={y - 12} width="360" height="12" fill={p.accent} opacity="0.8" />
      {/* openings */}
      {[360, 470, 580, 980, 1090, 1200].map((gx) => (
        <rect key={gx} x={gx} y={y + 24} width="70" height="150" fill={win} opacity={evening ? winOp : winOp * 0.8} />
      ))}
      {/* courtyard opening (framed portal) */}
      <rect x="740" y={y + 90} width="120" height="110" fill={evening ? p.accent : p.glass} opacity="0.5" />
    </g>
  );
}

function estateMass(
  p: Property['palette'],
  uid: string,
  win: string,
  winOp: number,
  evening: boolean,
  scene: string,
) {
  const y = 320;
  const shift = scene === 'exterior-angle' ? 90 : 0;
  const skew = scene === 'exterior-angle' ? -0.06 : 0;
  return (
    <g transform={`translate(${shift},0) skewX(${skew * 100})`}>
      {/* central two-storey mass */}
      <rect x="520" y={y - 40} width="560" height="280" fill={`url(#struc-${uid})`} />
      {/* flanking single-storey wings */}
      <rect x="300" y={y + 80} width="230" height="160" fill={p.structureShade} />
      <rect x="1070" y={y + 80} width="230" height="160" fill={p.structureShade} />
      {/* large framed openings */}
      {[560, 700, 840, 960].map((gx) => (
        <rect key={gx} x={gx} y={y} width="90" height="200" fill={win} opacity={evening ? winOp : winOp * 0.82} />
      ))}
      {/* brass cornice */}
      <rect x="510" y={y - 52} width="580" height="12" fill={p.accent} opacity="0.75" />
      {/* wing openings */}
      {[330, 420, 1100, 1190].map((gx) => (
        <rect key={gx} x={gx} y={y + 110} width="60" height="110" fill={win} opacity={evening ? winOp : winOp * 0.75} />
      ))}
    </g>
  );
}

function landscaping(horizon: number) {
  const palm = (x: number, s: number) => (
    <g key={x} transform={`translate(${x},${horizon + 40}) scale(${s})`} opacity="0.9">
      <rect x="-6" y="-160" width="12" height="160" fill="#3c5a37" />
      {[-1, -0.5, 0, 0.5, 1].map((a, i) => (
        <path
          key={i}
          d={`M0,-160 q ${60 * a},-30 ${90 * a},20`}
          stroke="#4f7a44"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </g>
  );
  return (
    <g>
      {palm(150, 1.1)}
      {palm(1440, 0.9)}
      {palm(1360, 1.15)}
      {/* hedge */}
      <rect x="0" y={horizon + 150} width={W} height="18" fill="#3c5a37" opacity="0.7" rx="9" />
    </g>
  );
}

function renderOutdoor(
  scene: string,
  p: Property['palette'],
  g: ReturnType<typeof grade>,
  evening: boolean,
) {
  const deckY = 620;
  return (
    <g>
      {/* deck */}
      <rect x="0" y={deckY} width={W} height={H - deckY} fill={p.structure} opacity="0.9" />
      <rect x="0" y={deckY} width={W} height="10" fill={p.accent} opacity="0.5" />
      {/* pool / reflecting water */}
      <rect x="180" y={deckY + 70} width="1240" height="250" rx="8" fill={p.ground} opacity="0.92" />
      <rect x="180" y={deckY + 70} width="1240" height="40" fill="#fff" opacity="0.08" />
      {/* water shimmer */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={260 + i * 300} y={deckY + 130 + (i % 2) * 40} width="180" height="6" fill="#fff" opacity="0.12" rx="3" />
      ))}
      {/* pavilion / cabana for courtyard-pavilion + estate */}
      {(scene === 'courtyard' || scene === 'terrace') && (
        <g>
          <rect x="1120" y={deckY - 180} width="300" height="180" fill={p.structureShade} opacity="0.95" />
          <rect x="1108" y={deckY - 192} width="324" height="14" fill={p.accent} opacity="0.8" />
          {evening && <rect x="1150" y={deckY - 150} width="240" height="120" fill={g.sun} opacity="0.4" />}
        </g>
      )}
      {/* loungers */}
      {[420, 620].map((x) => (
        <g key={x} transform={`translate(${x},${deckY + 20})`}>
          <rect x="0" y="0" width="130" height="26" rx="13" fill={p.structureShade} />
        </g>
      ))}
      {/* planting edge */}
      <rect x="0" y={deckY + 40} width="150" height="22" fill="#3c5a37" opacity="0.7" rx="11" />
      <rect x="1450" y={deckY + 40} width="150" height="22" fill="#3c5a37" opacity="0.7" rx="11" />
    </g>
  );
}

function renderDetail(p: Property['palette'], uid: string, evening: boolean) {
  return (
    <g>
      <rect x="0" y="0" width={W} height={H} fill={`url(#struc-${uid})`} />
      {/* stacked material bands: limestone / bronze / glass joinery */}
      <rect x="0" y="0" width={W} height="360" fill={p.structure} />
      <rect x="0" y="360" width={W} height="40" fill={p.accent} />
      <rect x="0" y="400" width={W} height="300" fill={`url(#glass-${uid})`} opacity={evening ? 0.9 : 0.7} />
      <rect x="0" y="700" width={W} height="30" fill={p.accent} opacity="0.7" />
      <rect x="0" y="730" width={W} height={H - 730} fill={p.structureShade} />
      {/* seams */}
      {[300, 600, 900, 1200].map((x) => (
        <rect key={x} x={x} y="0" width="3" height="360" fill={p.structureShade} opacity="0.6" />
      ))}
      {/* bronze reveal shadow */}
      <rect x="0" y="356" width={W} height="6" fill="#000" opacity="0.2" />
    </g>
  );
}

/* ============================ interiors ============================ */

function renderInterior(
  scene: string,
  p: Property['palette'],
  g: ReturnType<typeof grade>,
  uid: string,
  evening: boolean,
) {
  const wallTop = 0;
  const floorY = 700;
  const windowGlow = evening ? p.skyLow : p.sky;

  return (
    <g>
      {/* wall */}
      <rect x="0" y={wallTop} width={W} height={floorY} fill={p.structure} />
      <rect x="0" y={wallTop} width={W} height={floorY} fill="#000" opacity="0.06" />
      {/* floor */}
      <rect x="0" y={floorY} width={W} height={H - floorY} fill={`url(#floor-${uid})`} />
      {/* floor reflection */}
      <rect x="0" y={floorY} width={W} height="40" fill="#fff" opacity="0.05" />

      {/* large window with exterior glow — the constant across interiors */}
      <g>
        <rect x="120" y="70" width="620" height="560" fill={windowGlow} opacity={evening ? 0.85 : 0.95} />
        <rect x="120" y="70" width="620" height="560" fill={`url(#sun-${uid})`} />
        {/* mullions */}
        <rect x="120" y="70" width="620" height="10" fill={p.accent} opacity="0.8" />
        <rect x="120" y="620" width="620" height="12" fill={p.accent} opacity="0.8" />
        <rect x="426" y="70" width="8" height="560" fill={p.accent} opacity="0.7" />
        <rect x="120" y="340" width="620" height="6" fill={p.accent} opacity="0.5" />
        {/* distant landscape hint */}
        <rect x="120" y="470" width="620" height="160" fill={p.ground} opacity="0.5" />
      </g>

      {/* emerald accent wall panel */}
      <rect x="820" y="120" width="640" height="440" fill={p.glass} opacity="0.16" rx="6" />

      {sceneFurniture(scene, p, floorY, evening, g)}

      {/* ceiling shadow gradient */}
      <rect x="0" y="0" width={W} height="120" fill="#000" opacity="0.12" />
    </g>
  );
}

function sceneFurniture(
  scene: string,
  p: Property['palette'],
  floorY: number,
  evening: boolean,
  g: ReturnType<typeof grade>,
) {
  const c = p.structureShade;
  const warm = p.accent;
  switch (scene) {
    case 'living':
      return (
        <g>
          {/* low sofa */}
          <rect x="820" y={floorY - 130} width="520" height="90" rx="16" fill={c} />
          <rect x="820" y={floorY - 165} width="520" height="45" rx="14" fill={p.structure} />
          {/* cushions */}
          {[850, 1000, 1150].map((x) => (
            <rect key={x} x={x} y={floorY - 158} width="120" height="40" rx="10" fill={p.glass} opacity="0.4" />
          ))}
          {/* rug */}
          <rect x="800" y={floorY} width="600" height="150" rx="8" fill={warm} opacity="0.18" />
          {/* coffee table */}
          <rect x="960" y={floorY + 20} width="220" height="40" rx="8" fill={warm} opacity="0.6" />
          {/* floor lamp */}
          <rect x="1400" y={floorY - 260} width="8" height="260" fill={warm} />
          <circle cx="1404" cy={floorY - 270} r="30" fill={evening ? g.sun : p.structure} opacity="0.8" />
        </g>
      );
    case 'kitchen':
      return (
        <g>
          {/* island */}
          <rect x="820" y={floorY - 120} width="560" height="120" rx="6" fill={p.structure} />
          <rect x="820" y={floorY - 128} width="560" height="14" fill={warm} opacity="0.7" />
          {/* stools */}
          {[900, 1020, 1140, 1260].map((x) => (
            <g key={x}>
              <rect x={x} y={floorY - 6} width="46" height="10" rx="5" fill={c} />
              <rect x={x + 18} y={floorY + 4} width="8" height="90" fill={c} />
            </g>
          ))}
          {/* back cabinetry */}
          <rect x="820" y="300" width="640" height="180" fill={c} opacity="0.8" />
          <rect x="820" y="300" width="640" height="12" fill={warm} opacity="0.5" />
          {/* pendant lights */}
          {[960, 1120, 1280].map((x) => (
            <g key={x}>
              <rect x={x} y="120" width="4" height="120" fill={warm} />
              <circle cx={x + 2} cy="250" r="20" fill={evening ? g.sun : p.structureShade} opacity="0.85" />
            </g>
          ))}
        </g>
      );
    case 'bedroom':
      return (
        <g>
          {/* bed */}
          <rect x="820" y={floorY - 90} width="560" height="90" rx="8" fill={p.structure} />
          <rect x="820" y={floorY - 150} width="560" height="60" rx="10" fill={c} />
          {/* headboard */}
          <rect x="820" y={floorY - 300} width="560" height="150" rx="8" fill={warm} opacity="0.35" />
          {/* pillows */}
          {[860, 1010, 1160].map((x) => (
            <rect key={x} x={x} y={floorY - 140} width="130" height="42" rx="12" fill="#f4ecd8" opacity="0.5" />
          ))}
          {/* bench */}
          <rect x="880" y={floorY + 20} width="440" height="34" rx="8" fill={c} />
          {/* bedside + lamp */}
          <rect x="1400" y={floorY - 120} width="90" height="120" fill={c} />
          <circle cx="1445" cy={floorY - 150} r="24" fill={evening ? g.sun : p.structure} opacity="0.85" />
        </g>
      );
    case 'bathroom':
      return (
        <g>
          {/* freestanding tub */}
          <rect x="880" y={floorY - 110} width="360" height="110" rx="55" fill={p.structure} />
          <rect x="880" y={floorY - 118} width="360" height="18" rx="9" fill={warm} opacity="0.5" />
          {/* vanity */}
          <rect x="1300" y={floorY - 160} width="200" height="160" fill={c} />
          <rect x="1300" y="360" width="200" height="180" fill={p.glass} opacity="0.25" />
          {/* tall mirror */}
          <rect x="1330" y="300" width="140" height="240" fill={warm} opacity="0.3" rx="70" />
          {/* stone bands */}
          <rect x="0" y="540" width={W} height="8" fill={warm} opacity="0.4" />
        </g>
      );
    case 'staircase':
      return (
        <g>
          {/* sculptural curved stair */}
          <path
            d={`M900,${floorY} C 900,${floorY - 260} 1240,${floorY - 300} 1360,120`}
            stroke={p.structure}
            strokeWidth="120"
            fill="none"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d={`M900,${floorY} C 900,${floorY - 260} 1240,${floorY - 300} 1360,120`}
            stroke={warm}
            strokeWidth="10"
            fill="none"
            opacity="0.7"
          />
          {/* treads */}
          {Array.from({ length: 9 }).map((_, i) => (
            <rect
              key={i}
              x={910 + i * 44}
              y={floorY - 40 - i * 58}
              width="90"
              height="16"
              rx="4"
              fill={p.structureShade}
            />
          ))}
        </g>
      );
    default:
      return null;
  }
}
