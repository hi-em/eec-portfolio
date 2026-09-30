// P-102 · NeuroSpace. Card copy migrated verbatim from data/projects.tsx
// (locked blurb; dek signed 2026-07-10). The spine is TRIMMED from the
// retired P-102 sheet (abstract / method / the honest part): the scoring
// listing did not migrate; the weights live in the public repo where anyone
// can argue with them. SOLO work, authorship woven as an ordinary sentence.
// Verb rule (dossier): NeuroSpace ESTIMATES and SCORES cortisol / circadian /
// cognitive-load effects, never MEASURES; no clinical claims. NO stat by
// ruling: the live app is the stronger proof than any digit.
// Spine prose SIGNED by Emilie (G4, 2026-07-12).
// REBUILT 2026-09-30 (her rulings 103-106): the app is v2, the room
// form-found in code as a force-density membrane, so the card leads with it:
// the tour video, the comparison cover, stills of the live app, and the first
// version as ONE picture grid at the end of the strip. NO version number on
// the card (ruling 104); the rebuild is context inside WHAT (her ruling 106).
// WHAT, HOW and WHAT CAME OF IT re-signed as drafted the same day.
import type { ProjectMeta } from './types'

const neurospace: ProjectMeta = {
  slug: 'neurospace',
  title: 'NeuroSpace',
  lens: 'computation',
  // · LIVE APP left the meta string 2026-08-20 (the TEAM-label ruling; see
  // sensi.ts). The book still prints it via `liveApp`.
  meta: 'MACAD · SOLO',
  where: 'IAAC · MACAD',
  who: 'SOLO',
  liveApp: true,
  dek: 'Your room is doing something to you right now: move a slider and watch a browser score it live.',
  dekSigned: true,
  // THE QUESTION (D4 round 2, Emilie’s direction 2026-07-14): visualize the
  // parameters + test the hypothesis. The QUESTION may ask "makes you feel"
  // (the locked hero asks the same); the TOOL’s claim stays score/estimate in
  // the dek and spine, never measure. Question + dot set SIGNED by Emilie (REINDEX batch A, 2026-07-16).
  question: 'Can you visualize the parameters that affect how a room makes you feel?',
  // v2 LEADS (her ruling 106, 2026-09-30): the stack the app runs on today.
  // Grasshopper and Rhino Compute live on where the first version does: the
  // WHAT and the Grasshopper-version grid. This supersedes the 16 Aug line
  // below knowingly (it guarded a v1 stack), and the new line is SHORTER, so
  // the book rail it was protecting still fits.
  // (was) ⚠ ALL FOUR ITEMS STAY (Emilie, 2026-08-16). Grasshopper was taken off this
  // line for one round, when the book’s footer rail started naming the thought
  // each project made her think of and this plate’s ran 96 characters against a
  // rail that measures 78. Trimming the stack was the wrong lever and it was
  // not enough anyway: she solved it in the words instead, and the rail now
  // prints the coinage’s short form, so the whole stack fits with room to
  // spare. If this line ever grows, printBook.test.tsx fails with the measured
  // ceiling rather than letting the PDF wrap.
  tech: 'VUE 3 · THREE.JS · FORCE DENSITY',
  links: [
    // THE LABEL IS WHOLE AGAIN (2026-09-30, her pick): v2 draws the room in the
    // browser, so the 2026-07-26 apology ("TRY IT LIVE, ALMOST (NO 3D)", written
    // when IAAC's Rhino Compute server died) retired with the server. Same
    // label as Sensi. A browser with WebGL switched off gets a picture of the
    // room and a line saying so, inside the app itself.
    // CONSTRAINT: `live` must survive as a standalone word or the red liveness
    // dot in the links row (WorkOverlay’s /\blive\b/i test) silently vanishes.
    { label: 'LIVE APP', href: 'https://hi-em.github.io/neurospace' },
    { label: 'GITHUB', href: 'https://github.com/hi-em/neurospace' },
    { label: 'BLOG', href: 'https://blog.iaac.net/the-data-pipeline-behind-neurospace-from-sliders-to-synapses/' },
  ],
  // THE COVER = THE COMPARISON (her pick B1, 2026-09-30, over a form-finding
  // and a day-long cover): the app's ordinary room against a rounded, open
  // one, the variant morphing live, the difference on the seam. The loop
  // opens on the result, so the resting face is the finished comparison.
  // Recorded headless from the live app; the red-room cover of 2026-07-15
  // stays in the manifest for print only (demo-cover, screen:false).
  image: {
    slug: 'neurospace',
    name: 'compare-cover',
    alt: 'The ordinary room against a rounded, open one: the variant form-finds live beside its control, the difference on the seam',
  },
  // THE BOOK PAIR, RE-BAKED FROM THE REBUILT LAB (the book swap v2,
  // 2026-09-30, her picks off real renders). It had to go: page one printed the
  // v1 red room, and page two's lead was the two-paths figure, whose slow path
  // was a server that "returns geometry", the server that died.
  // PAGE ONE = the comparison (her cover pick B1 carried into print): the
  // control room beside the variant, the difference on the seam. A 3840px
  // capture, baked to the 1800px plate rung.
  spreadAssets: [{ slug: 'neurospace', name: 'compare' }],
  // PAGE TWO, her composition (tried four ways on real renders): THE MATRIX
  // LEADS, cropped out of the Method drawer to the weights and nothing else
  // (measured off the capture), so the model itself is the page's first read:
  // its numbers print near 8pt. Then the rules and the form-finding diagrams
  // across the FULL measure, as large as the page allows (134mm each).
  // ⚠ THE DIAGRAMS ARE STILL PICTURES MORE THAN READING: drawn for a 3200px
  // screen, their words land near 3pt even here. She was shown it and ruled no
  // redraw; the captions carry the words. Their crops take only the white
  // bands above and below (3% / 1%), which is what lets a full-width row keep
  // the lead on the 84.9mm hemline.
  // (was, 2026-08-12 to 2026-09-30) the plate `view` and a lead drawn in
  // figures.tsx, `neuro-two-paths`, with score-1 and score-2 in the register.
  bookLead: { slug: 'neurospace', name: 'weights', corner: 'top-outer', crop: { top: 0.175, bottom: 0.495, left: 0.115, right: 0.115 } },
  bookRegister: [
    { slug: 'neurospace', name: 'the-rules', crop: { top: 0.03, bottom: 0.01 } },
    { slug: 'neurospace', name: 'the-form-finding', crop: { top: 0.03, bottom: 0.01 } },
  ],
  showcaseDraft: false, // spine signed by Emilie (G4, 2026-07-12)
}

export default neurospace
