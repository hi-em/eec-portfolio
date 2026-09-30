// P-104 · A Ballooning Market. Card copy migrated verbatim from
// data/projects.tsx (locked blurb; dek signed 2026-07-10). The spine is
// TRIMMED from the retired P-104 sheet: the solver-goals listing did not
// migrate (the blog tells the long version). The instructive fail stays
// filed as the outcome, on purpose.
// Spine prose SIGNED by Emilie (G4, 2026-07-12).
import type { ProjectMeta } from './types'

const ballooningMarket: ProjectMeta = {
  slug: 'ballooning-market',
  title: 'A Ballooning Market',
  lens: 'computation',
  meta: 'MACAD · SOLO',
  where: 'IAAC · MACAD',
  who: 'SOLO',
  dek: 'Physics is the difference between a mess and a roof: the balloons ghosted through each other until Kangaroo gave them awareness.',
  dekSigned: true,
  // THE QUESTION (D4 round 2, Emilie 2026-07-14: she hated the mess line as
  // lead, loved the touch-nothing and teach-balloons ones, asked for the
  // pneumatic-simulation register; fused below). Question + dot set SIGNED by Emilie (REINDEX batch C, 2026-07-16).
  question: 'Can balloons roof a historic market without touching it? A pneumatic simulation.',
  tech: 'GRASSHOPPER · KANGAROO · DENDRO · D5',
  // THE PAIR, RE-CHOSEN FROM HER ENHANCED RENDERS (the book swap v2,
  // 2026-09-30, her combination). PAGE TWO: the exploded layers lead (the whole
  // idea, frame + spine tunnel + balloons, in one drawing), then her watercolour
  // plan, the net canopy and the Grasshopper algorithm.
  // THE CROPS STAND (Emilie, 2026-08-12): every studio sheet arrived with its
  // own heading burnt in, in a face the book uses nowhere else, so the heading
  // band is cropped and the book's captions do the labelling. Measured off each
  // image's ink profile: exploded-layers' "// filling the void" sits in the top
  // 12%, the algorithm's in the top 15%. The layer labels inside the drawing stay.
  // (was, 2026-08-12 to 2026-09-30) the algorithm led, with the process sheet
  // and render-3 in the register.
  bookLead: { slug: 'ballooning-market', name: 'exploded-layers', corner: 'top-bound', crop: { top: 0.12 } },
  bookRegister: [
    { slug: 'ballooning-market', name: 'plan-sketch' },
    { slug: 'ballooning-market', name: 'net-canopy' },
    { slug: 'ballooning-market', name: 'algorithm', crop: { top: 0.15 } },
  ],
  links: [
    { label: 'BLOG', href: 'https://blog.iaac.net/a-ballooning-market-why-i-decided-to-fill-a-historic-market-with-balloons-and-how-i-almost-failed/' },
  ],
  // THE COVER = THE INFLATION, ALIVE (Emilie, 2026-07-15): the Kangaroo
  // process gif, still at rest, playing on hover; render-1 moved into the
  // strip and stays the book plate below.
  image: { slug: 'ballooning-market', name: 'process', alt: 'The Kangaroo inflation running: balloons seeding, anchoring and settling into a roof over Bab al-Luq market' },
  // THE PLATE = THE GROUND FLOOR (her pick, 2026-09-30): the souk under the
  // balloons with the net bridge overhead, her enhanced render, from her 4K
  // export (3840px, baked to the 1800px plate rung like every other plate).
  // No spreadFit, and that is still the rule (Emilie, 2026-08-12): a render
  // crops to the plate's shape and loses only framing.
  // (was) render-1, the aerial over Bab al-Luq.
  spreadAssets: [{ slug: 'ballooning-market', name: 'ground-floor' }],

  showcaseDraft: false, // spine signed by Emilie (G4, 2026-07-12)
}

export default ballooningMarket
