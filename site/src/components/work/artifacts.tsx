// THE PLATE ARTIFACTS (WORK PAGE · LOOK & ORDER, Emilie's gate 2026-07-18):
// every /work tile rests as a designed ink drawing, the project's parti in a
// few strokes, drawn in the Pen Table grammar. One per project, keyed by
// registry id. Signed by Emilie on the round-3 board (in chat, 2026-07-18),
// with her tweaks: lEgoarCh = the studded lego castle, Ballooning = balloons
// over the canopy, Homage = option B "the three homages".
//
// Grammar (language.css .work-art): .ln = the ink line (1.6, currentColor),
// .th = the thin line (1, faded), .dt = the ink dot, .ac/.acs = the ONE
// accent per drawing, filled/stroked with the tile's lens pen colour via
// --plate-accent (colour never means alone: the plate's lens mark + label
// name the lens; the accent just warms the drawing). vector-effect keeps
// stroke weight honest at any tile size. The real cover stays one hover away
// (WorkCard reveals it); print and OG never use these (screen-only by intent).
import type { ReactNode } from 'react'

const VB = { viewBox: '0 0 160 90', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': true } as const

export const WORK_ARTIFACTS: Record<string, ReactNode> = {
  // Sensi · the relationship galaxy
  sensi: (
    <svg {...VB}>
      <path className="th" d="M38 34 61 24M61 24 84 42M84 42 108 28M108 28 126 47M84 42 66 62M66 62 98 66M98 66 126 47" />
      <circle className="dt" cx="38" cy="34" r="3" />
      <circle className="dt" cx="61" cy="24" r="2" />
      <circle className="ac" cx="84" cy="42" r="4" />
      <circle className="dt" cx="108" cy="28" r="2" />
      <circle className="dt" cx="126" cy="47" r="2.5" />
      <circle className="dt" cx="66" cy="62" r="2" />
      <circle className="dt" cx="98" cy="66" r="2.5" />
    </svg>
  ),
  // lEgoarCh · the brick castle, studs and all (her tweak: lego-like)
  legoarch: (
    <svg {...VB}>
      <rect className="ln" x="50" y="58" width="60" height="14" />
      <rect className="ln" x="56" y="53" width="9" height="5" />
      <rect className="ln" x="75" y="53" width="9" height="5" />
      <rect className="ln" x="94" y="53" width="9" height="5" />
      <rect className="ln" x="60" y="39" width="40" height="14" />
      <rect className="ln" x="66" y="34" width="9" height="5" />
      <rect className="ln" x="85" y="34" width="9" height="5" />
      <rect className="ln" x="71" y="20" width="18" height="14" />
      <rect className="ln" x="75" y="15" width="9" height="5" />
      <path className="th" d="M60 65h40M70 46h20" />
      <path className="ln" d="M80 15V7" />
      <path className="ac" d="M80 7h10l-10 6z" />
    </svg>
  ),
  // NeuroSpace · wireframe volumes on the grid
  neurospace: (
    <svg {...VB}>
      <path className="th" d="M32 70h96" />
      <path className="ln" d="M56 40l16-9 16 9v18l-16 9-16-9zM56 40l16 9 16-9M72 49v18" />
      <path className="ln" d="M98 52l10-6 10 6v11l-10 6-10-6zM98 52l10 6 10-6M108 58v11" />
      <circle className="ac" cx="72" cy="40" r="3.5" />
    </svg>
  ),
  // The Lungs · the tower breathing, one trunk branching
  lungs: (
    <svg {...VB}>
      <rect className="ln" x="62" y="16" width="36" height="56" />
      <path className="ln" d="M80 66V46M80 46c0-8-8-8-8-16M80 46c0-8 8-8 8-16M72 30c0-4-4-4-4-8M88 30c0-4 4-4 4-8" />
      <circle className="ac" cx="80" cy="66" r="2.5" />
    </svg>
  ),
  // The Huddle · voxels huddling around a center
  huddle: (
    <svg {...VB}>
      <rect className="ln" x="72" y="37" width="16" height="16" />
      <rect className="ln" x="56" y="41" width="12" height="12" />
      <rect className="ln" x="92" y="41" width="12" height="12" />
      <rect className="ln" x="64" y="25" width="12" height="12" />
      <rect className="ln" x="84" y="25" width="12" height="12" />
      <rect className="ln" x="64" y="57" width="12" height="12" />
      <rect className="ac" x="84" y="57" width="12" height="12" />
    </svg>
  ),
  // A Ballooning Market · balloons lifting the canopy (her tweak: more fun)
  ballooning: (
    <svg {...VB}>
      <circle className="ln" cx="66" cy="26" r="12" />
      <circle className="ln" cx="97" cy="33" r="8" />
      <circle className="ac" cx="46" cy="38" r="5.5" />
      <path className="th" d="M66 38q2 12 6 22M97 41q0 10-3 19M46 44q2 9 8 16M66 38l-3-3M66 38l3-3" />
      <path className="ln" d="M40 64q40-12 80 0" />
      <path className="th" d="M48 62v8M80 61v9M112 62v8" />
    </svg>
  ),
  // Encoding Urban Risk · the street network, one segment classified
  'urban-risk': (
    <svg {...VB}>
      <path className="ln" d="M38 62l16-6 12-22 20-8 22 10 16-6" />
      <path className="th" d="M54 56l10 12M66 34l-16-10M66 34l14 24 22 2M86 26l-4-12M108 36l-6 22M124 30l4 26" />
      <path className="acs" d="M80 58l22 2" />
      <circle className="dt" cx="66" cy="34" r="2" />
      <circle className="dt" cx="108" cy="36" r="2" />
      <circle className="dt" cx="80" cy="58" r="2" />
    </svg>
  ),
  // Cappelletti Pavilion · the crossing gridshell
  cappelletti: (
    <svg {...VB}>
      <path className="ln" d="M34 66Q80 14 126 66" />
      <path className="th" d="M44 66Q86 26 122 60M38 60Q74 26 116 66M52 66Q94 30 126 58M34 54Q66 24 104 66" />
      <path className="ln" d="M30 66h100" />
      <circle className="ac" cx="80" cy="40" r="2.5" />
    </svg>
  ),
  // Optimizing for the Mind · the waveform
  podcast: (
    <svg {...VB}>
      <path className="ln" d="M32 39v12M40 42v6M48 35v20M56 40v10M64 28v34M72 38v14M80 24v42M88 36v18M96 30v30M104 41v8M112 34v22M120 43v4M128 39v12" />
      <rect className="ac" x="78.5" y="24" width="3" height="42" rx="1.5" />
    </svg>
  ),
  // Narkomfin as a Graph · the long building becoming a graph
  narkomfin: (
    <svg {...VB}>
      <rect className="ln" x="34" y="42" width="76" height="20" />
      <path className="th" d="M34 50h76M34 56h76" />
      <path className="ln" d="M118 62V30" />
      <path className="th" d="M50 42V30l28-8 40 8" />
      <circle className="dt" cx="50" cy="30" r="2.5" />
      <circle className="dt" cx="78" cy="22" r="2.5" />
      <circle className="ac" cx="118" cy="30" r="3.5" />
      <circle className="dt" cx="118" cy="62" r="2.5" />
    </svg>
  ),
  // Data into Geometry · points flowing into a cube
  'data-geometry': (
    <svg {...VB}>
      <circle className="dt" cx="36" cy="28" r="2" />
      <circle className="dt" cx="34" cy="45" r="2" />
      <circle className="dt" cx="38" cy="62" r="2" />
      <path className="th" d="M40 28q28-6 50 12M38 45h52M42 62q24 6 48-14" />
      <path className="ln" d="M94 56V36l14-8 16 8v20l-16 8zM94 36l16 8 14-8M110 44v20" />
      <circle className="ac" cx="110" cy="44" r="2.5" />
    </svg>
  ),
  // Tsukiji Fish Market · the grid with one cell turning
  tsukiji: (
    <svg {...VB}>
      <rect className="ln" x="50" y="17" width="16" height="16" />
      <rect className="ln" x="72" y="17" width="16" height="16" />
      <rect className="ln" x="94" y="17" width="16" height="16" />
      <rect className="ln" x="50" y="39" width="16" height="16" />
      <rect className="ac" x="72" y="39" width="16" height="16" transform="rotate(28 80 47)" fillOpacity=".85" />
      <rect className="ln" x="94" y="39" width="16" height="16" />
      <rect className="ln" x="50" y="61" width="16" height="16" />
      <rect className="ln" x="72" y="61" width="16" height="16" />
      <rect className="ln" x="94" y="61" width="16" height="16" />
    </svg>
  ),
  // Chair Simulation · the voxel chair in profile
  'chair-sim': (
    <svg {...VB}>
      <rect className="ln" x="62" y="14" width="12" height="12" />
      <rect className="ln" x="62" y="26" width="12" height="12" />
      <rect className="ln" x="62" y="38" width="12" height="12" />
      <rect className="ln" x="74" y="38" width="12" height="12" />
      <rect className="ac" x="86" y="38" width="12" height="12" />
      <rect className="ln" x="62" y="50" width="12" height="12" />
      <rect className="ln" x="86" y="50" width="12" height="12" />
    </svg>
  ),
  // Astroidal Ellipsoid · the exact astroid
  astroidal: (
    <svg {...VB}>
      <path className="ln" d="M80 15C85 37 100 44 126 45C100 46 85 53 80 75C75 53 60 46 34 45C60 44 75 37 80 15Z" />
      <ellipse className="th" cx="80" cy="45" rx="42" ry="14" />
      <circle className="ac" cx="80" cy="45" r="2.5" />
    </svg>
  ),
  // A Playscape · nets sagging between posts
  playscape: (
    <svg {...VB}>
      <path className="ln" d="M42 24v44M118 28v40" />
      <path className="ln" d="M42 28q38 26 76 4" />
      <path className="th" d="M42 40q38 24 76 8M42 52q38 18 76 12" />
      <path className="ln" d="M32 68h96" />
      <circle className="ac" cx="80" cy="43" r="2.5" />
    </svg>
  ),
  // XR for Education · the visor and the molecule
  xr: (
    <svg {...VB}>
      <rect className="ln" x="34" y="32" width="48" height="24" rx="9" />
      <path className="ln" d="M52 56q6-6 12 0" />
      <path className="th" d="M34 40q-8 3 0 9M82 40q8 3 0 9" />
      <circle className="dt" cx="47" cy="43" r="2.5" />
      <circle className="dt" cx="69" cy="43" r="2.5" />
      <path className="ln" d="M112 34l12 7v14l-12 7-12-7V41z" />
      <path className="th" d="M112 34v-9M124 55l9 6M100 55l-9 6" />
      <circle className="dt" cx="112" cy="25" r="2.5" />
      <circle className="ac" cx="133" cy="61" r="2.5" />
    </svg>
  ),
  // Rings of Mars · rings in the crater
  mars: (
    <svg {...VB}>
      <path className="th" d="M26 62q28-10 54-4t54-2" />
      <ellipse className="ln" cx="80" cy="47" rx="34" ry="17" />
      <ellipse className="ln" cx="80" cy="47" rx="22" ry="11" />
      <ellipse className="th" cx="80" cy="47" rx="11" ry="5.5" />
      <circle className="ac" cx="80" cy="47" r="2.5" />
    </svg>
  ),
  // Verve City Walk · the towers in the AR frame
  soma: (
    <svg {...VB}>
      <path className="ln" d="M62 68V32h12v36M86 68V24h14v44" />
      <path className="th" d="M62 42h12M62 52h12M86 36h14M86 48h14M86 60h14M58 68h48" />
      <path className="ln" d="M40 22v-6h10M120 16h10v6M40 68v6h10M130 68v6h-10" />
      <circle className="ac" cx="93" cy="24" r="2.5" />
    </svg>
  ),
  // The Encounter · the spire at sunrise
  encounter: (
    <svg {...VB}>
      <path className="ln" d="M76 66L79 18M84 66L81 18" />
      <path className="ln" d="M50 66h60" />
      <path className="th" d="M50 72h44" />
      <circle className="ac" cx="106" cy="30" r="4.5" />
      <path className="th" d="M100 22l3 3M112 22l-3 3" />
    </svg>
  ),
  // Falcon Square · the takeoff lines become the falcon
  falcon: (
    <svg {...VB}>
      <path className="ln" d="M34 66Q76 58 124 27" />
      <path className="th" d="M34 54q44-10 90-27M40 32q46 0 84-5" />
      <path className="ac" d="M124 27l10-4-6 9z" />
      <circle className="dt" cx="34" cy="66" r="2" />
      <circle className="dt" cx="34" cy="54" r="1.6" />
      <circle className="dt" cx="40" cy="32" r="1.6" />
    </svg>
  ),
  // The Homage · the three homages: past, present, future (option B, her pick)
  homage: (
    <svg {...VB}>
      <path className="ln" d="M30 66Q56 22 82 66" />
      <path className="th" d="M56 66Q82 22 108 66" />
      <path className="th" strokeDasharray="4 5" d="M82 66Q108 22 134 66" />
      <path className="ln" d="M22 66h116" />
      <circle className="ac" cx="56" cy="44" r="2.5" />
    </svg>
  ),
  // Tideline · the base ring, its fins, and the crest they ride (her pick T4,
  // 2026-09-27: "a mix" of the ring and the tide line, three waves around).
  // Generated from the ring: fins sample the crest h(t) = 20 + 9 sin(3t + 0.4).
  tideline: (
    <svg {...VB}>
      <path className="th" d="M32.4 58.3V44.7M33.6 56.6V45M35.7 55V44M38.4 53.5V41.8M41.9 52.1V38.4M46.1 50.8V34.2M50.8 49.7V29.6M56 48.7V25.2M61.6 48V21.6M67.6 47.4V19.1M73.7 47.1V18.1M80 47V18.7M86.3 47.1V20.8M92.4 47.4V24.1M98.4 48V28.1M104 48.7V32.2M109.2 49.7V36.1M113.9 50.8V39.1M118.1 52.1V41.1M121.6 53.5V41.8M124.3 55V41.3M126.4 56.6V40M127.6 58.3V38.2" />
      <ellipse className="ln" cx="80" cy="60" rx="48" ry="13" />
      <path className="th" d="M128 60V36.5M127.6 61.7V35.3M126.4 63.4V35M124.3 65V36M121.6 66.5V38.2M118.1 67.9V41.6M113.9 69.2V45.8M109.2 70.3V50.4M104 71.3V54.8M98.4 72V58.4M92.4 72.6V60.9M86.3 72.9V61.9M80 73V61.3M73.7 72.9V59.2M67.6 72.6V55.9M61.6 72V51.9M56 71.3V47.8M50.8 70.3V43.9M46.1 69.2V40.9M41.9 67.9V38.9M38.4 66.5V38.2M35.7 65V38.7M33.6 63.4V40M32.4 61.7V41.8M32 60V43.5" />
      <path className="acs" d="M128 36.5L127.9 35.9L127.7 35.5L127.4 35.1L127 35L126.4 35L125.7 35.3L124.8 35.7L123.9 36.3L122.8 37.2L121.6 38.2L120.3 39.4L118.8 40.8L117.3 42.4L115.7 44.1L113.9 45.8L112.1 47.6L110.2 49.5L108.2 51.3L106.1 53.1L104 54.8L101.8 56.3L99.5 57.8L97.2 59L94.8 60.1L92.4 60.9L90 61.5L87.5 61.8L85 61.9L82.5 61.7L80 61.3L77.5 60.6L75 59.7L72.5 58.6L70 57.4L67.6 55.9L65.2 54.4L62.8 52.8L60.5 51.1L58.2 49.4L56 47.8L53.9 46.1L51.8 44.6L49.8 43.2L47.9 42L46.1 40.9L44.3 39.9L42.7 39.2L41.2 38.7L39.7 38.3L38.4 38.2L37.2 38.3L36.1 38.5L35.2 38.9L34.3 39.4L33.6 40L33 40.7L32.6 41.4L32.3 42.1L32.1 42.8L32 43.5L32.1 44.1L32.3 44.5L32.6 44.9L33 45L33.6 45L34.3 44.7L35.2 44.3L36.1 43.7L37.2 42.8L38.4 41.8L39.7 40.6L41.2 39.2L42.7 37.6L44.3 35.9L46.1 34.2L47.9 32.4L49.8 30.5L51.8 28.7L53.9 26.9L56 25.2L58.2 23.7L60.5 22.2L62.8 21L65.2 19.9L67.6 19.1L70 18.5L72.5 18.2L75 18.1L77.5 18.3L80 18.7L82.5 19.4L85 20.3L87.5 21.4L90 22.6L92.4 24.1L94.8 25.6L97.2 27.2L99.5 28.9L101.8 30.6L104 32.2L106.1 33.9L108.2 35.4L110.2 36.8L112.1 38L113.9 39.1L115.7 40.1L117.3 40.8L118.8 41.3L120.3 41.7L121.6 41.8L122.8 41.7L123.9 41.5L124.8 41.1L125.7 40.6L126.4 40L127 39.3L127.4 38.6L127.7 37.9L127.9 37.2L128 36.5Z" />
    </svg>
  ),
  // Codependent · the two masters in axonometric, exploded: the white one
  // standing (outline), the black one lying flat (solid), slot facing slot,
  // the accent the joint between them (her pick A, refined 2026-09-27: "white
  // always vertical, black horizontal"). The real master: a square with a
  // slot mid-side on all four sides and rounded corners, drawn to 780/120/50.
  codependent: (
    <svg {...VB}>
      <path className="ln" d="M37.95 14.61L38 14.12L38.13 13.7L38.34 13.37L38.62 13.14L38.97 13.01L39.36 12.99L39.79 13.09L40.23 13.3L51.13 19.59L51.13 24.85L53.26 26.08L53.26 20.82L64.16 27.11L64.6 27.42L65.03 27.81L65.42 28.28L65.77 28.81L66.05 29.37L66.26 29.95L66.39 30.52L66.43 31.06L66.43 43.64L61.88 41L61.88 43.47L66.43 46.1L66.43 58.68L66.39 59.17L66.26 59.59L66.05 59.92L65.77 60.16L65.42 60.28L65.03 60.3L64.6 60.2L64.16 60L53.26 53.71L53.26 48.45L51.13 47.21L51.13 52.47L40.23 46.18L39.79 45.88L39.36 45.48L38.97 45.01L38.62 44.48L38.34 43.92L38.13 43.34L38 42.78L37.95 42.24L37.95 29.66L42.51 32.29L42.51 29.82L37.95 27.19Z" />
      <path className="dt" d="M92.64 46.18L93.12 45.95L93.68 45.78L94.29 45.67L94.91 45.64L95.54 45.67L96.15 45.78L96.7 45.95L97.19 46.18L108.09 52.47L103.53 55.1L105.67 56.34L110.22 53.71L121.12 60L121.52 60.28L121.82 60.6L122 60.95L122.06 61.31L122 61.68L121.82 62.02L121.52 62.35L121.12 62.63L110.22 68.92L105.67 66.29L103.53 67.52L108.09 70.15L97.19 76.44L96.7 76.67L96.15 76.84L95.54 76.95L94.91 76.99L94.29 76.95L93.68 76.84L93.12 76.67L92.64 76.44L81.74 70.15L86.3 67.52L84.16 66.29L79.61 68.92L68.71 62.63L68.31 62.35L68.01 62.02L67.83 61.68L67.77 61.31L67.83 60.95L68.01 60.6L68.31 60.28L68.71 60L79.61 53.71L84.16 56.34L86.3 55.1L81.74 52.47Z" />
      <path className="acs" d="M61.88 42.24L85.23 55.72" />
    </svg>
  ),
}
