// P-123 · Codependent (practice). Added 2026-09-27 at Emilie's ask: the
// modular booth she led at Dynamic Solution, Kuwait, December 2024. Title
// hers, from a board of support and missing-pieces names. The event's own
// name is NEVER used (it was the event, not the project). Charles stays on
// the site-board image only, no text credit (her ruling, 2026-09-27).
// This REVERSES the older rule that the current job's projects stay off the
// site (cv.ts, 2026-07-27): her call, knowingly, 2026-09-27.
// Her part, confirmed: design lead on the concept, the Grasshopper definition
// and the fabrication files; the panels were CNC cut (her answer). WHAT, WHY,
// HOW 1 + 3 and OUTCOME are her own concept paragraphs verbatim; the question,
// dek, HOW 2 and tech line were drafted from them and the design-space clip
// (thirty arrangements, ten candidates, option 29, 34 parts). ALL COPY
// SIGNED by Emilie as drafted (Gate 2, 2026-09-27).
// REOPENED knowingly at the band pass (2026-09-28): WHAT, HOW and OUTCOME gained
// her interview facts (dimensions, the definition-to-fabrication pipeline, the
// reveal or the 34-to-39 story), HOW turned imperative. Signed the same day.
import type { ProjectMeta } from './types'

const codependent: ProjectMeta = {
  slug: 'codependent',
  title: 'Codependent',
  lens: 'practice',
  meta: 'DYNAMIC SOLUTION · KUWAIT · 2024',
  where: 'DYNAMIC SOLUTION · KUWAIT',
  who: 'PRACTICE TEAM',
  myPart: 'design lead: concept, grasshopper, cnc cutting files',
  dek: 'Two interlocking wooden panels, no glue or screws: seats and counters that stand only because each piece holds up another.',
  dekSigned: true, // SIGNED by Emilie (Gate 2, 2026-09-27)
  question: 'What if no piece could stand on its own?',
  tech: 'RHINO · GRASSHOPPER · CNC CUTTING',
  links: [],
  image: {
    slug: 'codependent',
    name: 'codependent-cover',
    alt: 'The pre-assembly at speed: each white panel slots in upright and each black one lands flat until the booth stands',
  },
  // Her cover pick (B) is a 3x crop of the pre-assembly clip: a cut I made,
  // so card face ONLY; the full clip is its own deck page.
  coverMontage: true,
  showcaseDraft: false,
}

export default codependent
