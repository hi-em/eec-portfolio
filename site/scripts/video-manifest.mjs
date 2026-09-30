// Curated video picks from incoming/ (git-ignored staging; since the
// 2026-07-16 reorg every slug lives under academic/iaac/<slug>/) -> web
// mp4 + poster webp ladder (scripts/optimize-videos.mjs). Emilie's picks
// 2026-07-08: the scored Sensi demo + the silent report flow only (onboard
// and shape stay in staging, unencoded). audio: keep-and-transcode the
// source track; silent sources encode with -an. posterAt: seconds into the
// ENCODED clip for the representative poster frame. crf: the flagship demo
// encodes richer than flow captures.
export const VIDEOS = {
  // lEgoarCh 60s edit v2 (2026-07-15, Emilie's rounds: Sensi-45s film
  // grammar, REAL brand cards from incoming/legoarch/brand, sfx audio kept).
  // Master assembled from gen-ai-linked-01-base.mp4 (her sfx-only base) with
  // the browser chrome cropped OUT of every segment (privacy: the raw
  // recording shows personal tabs); cards carry silent tracks. Cards
  // regenerate from the session scratchpad script; card copy SIGNED by
  // Emilie (REINDEX batch A, 2026-07-16: the question card, the five act
  // cards and the award closer).
  legoarch: [
    { src: 'academic/iaac/legoarch/legoarch-60s-edit.mp4', name: 'demo', audio: true, posterAt: 22, crf: 23 },
  ],
  // (Optimizing for the Mind: the quote reel is the CARD-FACE cover only, a
  // gif in image-manifest with coverMontage: true, so the plate flips the 7
  // real quote cards instead of replaying the reel. No video entry, 2026-07-16.)
  // The Lungs 42.5s edit (2026-07-15, Emilie's spec: her StudioDemo_Edit
  // re-cut SILENT, sped 1.6x, title/credits cards dropped, the two
  // teammate-name segments SKIPPED (team cards + the Ready checklist), and
  // cropped below the app header so the logged-in teammate chip never ships
  // (crop=2560:1200:0:192; privacy, binding). The film leads the plate, which
  // also answers the IAAC-gated live app: the demo shows what the login hides.
  lungs: [
    { src: 'academic/iaac/lungs/lungs-45s-edit.mp4', name: 'demo', audio: false, posterAt: 15, crf: 23 },
  ],
  // flow-report DELETED (Emilie, 2026-08-25, the sensi asset pass): built
  // since the demo round but shown nowhere — only vids[0] ever leads the
  // plate, and the report flow lives inside the scored demo. The folder
  // tells no lies (her pick over leaving it unused).
  sensi: [
    { src: 'academic/iaac/sensi/demos/sensi-45s-16x9-scored.mp4', name: 'demo', audio: true, posterAt: 12, crf: 23 },
  ],
  // NeuroSpace THE TOUR (2026-09-30, rulings 103-106; cut 2 after her notes: a
  // split-view beat with several parameters, plants on empty floor, SOUND, up
  // to 1:30): ~86 s, captured headless
  // from the LIVE app at 3840x2160 (no browser frame ever in shot), a visible
  // cursor making real clicks, captions composited after capture in the app's
  // own Inter + Roboto Mono so it reads without sound, ending on the mark.
  // The sound is synthesised from the take's own cues (every click, drag,
  // score change, plant, step and drawer), in the language of her films.
  // The old slider-tour left the page (her ruling 106: the first
  // version is one picture grid at the end, "dont want to give it importance").
  neurospace: [
    { src: 'academic/iaac/neurospace/v2/neuro-tour.mp4', name: 'tour', audio: true, posterAt: 9, crf: 23 },
  ],
  // (XR for Education: NO video entry, decided S2 2026-07-16. A 12s clip of
  // the SN2 render was encoded and REJECTED as the plate lead: the molecule
  // reads near-blank at poster size, and the hero rule would have put that
  // gray frame first. The reaction ships as the hover-play card cover
  // (xr-cover-web.webp in image-manifest) + the sn1 stills instead; the
  // multi-GB SN1/E2 .avi masters stay in staging for the future expansion.)
}

// Output ceiling: 720p-class. Sheets render video at <= ~900 CSS px; 1280w
// covers desktop and DPR-3 phones, and CRF matters more than resolution for
// screen-capture text. Poster ladder matches the images.json gallery ladder.
export const MAX_W = 1280
export const POSTER_SIZES = [640, 1024]
