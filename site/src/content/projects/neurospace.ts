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
  // G5: the book spread’s dominant plate (print-assets.mjs bakes the rung).
  // THE PLATE MOVED (Emilie, 2026-08-11): `landing` is the marketing page, all
  // white space and a headline. `view` is the tool working, the red room with
  // the live score answering a slider.
  spreadAssets: [{ slug: 'neurospace', name: 'view' }],
  // FITTED, not cropped (Emilie, 2026-08-11). Filling the plate cut the slider
  // panel off one edge; cropping the other way saved the sliders and lost the
  // score. Both are the point of the tool, so it fits whole on the app’s own
  // near-white ground, where the letterbox is invisible.
  // ⚠ THE GROUND WAS RESAMPLED (2026-08-12). It was #f4f5f6, chosen by eye, and
  // measuring the image showed why it never sat right: the plate’s real edges are
  // MID GREY (#a5a3a0 at the top, #b4aeac at the bottom), so a near-white band
  // blended with the PAGE and not with the PICTURE, and the seam showed on every
  // print. Split further, the left 18% is the parameters panel (#ebe9e8) and the
  // right 82% is the 3D viewport (#959491), so no flat colour is exact; the
  // viewport dominates and the value below is the mean of the two edge strips.
  // The ground’s job is to be the plate’s own field, which means matching the
  // image rather than the paper. Same reasoning as Sensi’s near-black.
  // spreadFit left at round 2 (Emilie, 2026-08-19): the plate takes the
  // screenshot's own ~1.88 ratio now, so the hero fills with no ground.
  // PAGE TWO: four large. How it is built, what the score is actually made of,
  // and the two report pages it produces. pipeline and score-formula are 875px
  // originals, all that exists, so they get the largest size they can honestly
  // carry rather than being blown up.
  // Already four, so nothing is cut. At 1.54 the pipeline is the SQUAREST lead
  // in the book, which means it stands 123mm tall against a 190mm width and
  // leaves the shallowest meta column of the eight.
  //
  // The second of the two bottom leads, for the same reason as lEgoarCh’s: the
  // formula and the two scored rooms are the evidence, and the pipeline is what
  // made them, so it reads better underneath than above.
  // ⚠ EVERY LEAD IS 'top-outer' (Emilie, 2026-08-12, on seeing the eight asset
  // pages side by side). The corner used to vary per project and the intent was
  // variety; laid out together it read as inconsistency, because a reader flips
  // the pair rhythm and the lead was in a different place five times out of
  // eight. Two of them were worse than inconsistent: a bottom lead puts the
  // REGISTER ABOVE THE LEAD, so the page is read bottom-up, and it inverts the
  // whole furniture block into a running head so the page loses its foot rule.
  // Her ruling: make all eight follow page 4. EVERY LEAD IS NOW AT THE TOP.
  // ⚠ But the EDGE still alternates, outer / bound / outer, because she asked
  // for exactly that one round earlier ("not always upper left, you know mix
  // and match") and printBook.test.tsx guards it. The two instructions are
  // compatible: what read as inconsistency on the contact sheet was the
  // BOTTOM and FIELD leads, not which trim edge a top lead bleeds from.
  // ⚠ THE LEAD IS A DRAWING THE BOOK MAKES, not a picture of a diagram
  // (Emilie, 2026-08-12: "I don’t like both diagrams, they feel like they don’t
  // fit the aesthetic and they are too small ... if there is a way to merge them
  // into one new meta diagram").
  //
  // What was here: `pipeline`, an exported architecture diagram in coloured
  // rounded boxes and another type family, 875px drawn 171mm wide, about
  // 130dpi. Beside it in the register sat `score-formula`, the same problem
  // twice. They were the only two assets the census had to sanction on
  // resolution, and they were the only two pictures in the book carrying type
  // that is not the book’s.
  //
  // What replaced them: ONE figure, src/print/figures.tsx, drawn in the book’s
  // ink and set in its own mono. It merges both because they are two halves of
  // the same sentence, and that sentence is already signed in the spine: the
  // server returns geometry on the slow path, the browser returns a score on the
  // fast one. Being vector it has no resolution, so the exception disappears
  // rather than being sanctioned again.
  //
  // ⚠ THE DRAWING IS draftCopy until Emilie signs it. It states nothing the
  // record does not: four HOW steps, five weights off the formula sheet, and
  // that sheet’s own four bands.
  //
  // The knock-on is the reason it is worth doing twice over: absorbing the
  // formula sheet takes page two from four assets to three, so the two report
  // screens are drawn 130mm wide instead of 87, which is where their dials and
  // contribution bars stop being decoration.
  bookLead: {
    slug: 'neurospace',
    name: 'two-paths',
    figure: 'neuro-two-paths',
    corner: 'top-outer',
    caption:
      'One slider move, two paths: the server returns geometry, the browser returns a score before you let go',
  },
  bookRegister: [
    { slug: 'neurospace', name: 'score-1' },
    { slug: 'neurospace', name: 'score-2' },
  ],
  showcaseDraft: false, // spine signed by Emilie (G4, 2026-07-12)
}

export default neurospace
