# Handoff: EEC Portfolio { Pen Table, Session 3 decisions

## Overview
Design exploration results for Emilie El Chidiac's portfolio (eec-portfolio repo). This session locked three surfaces against the existing Pen Table design system: the EXPLORE mode (dark 3D word network), the in-site case-study sheet (P-104, A Ballooning Market), and the site's motion vocabulary. It also produced an adjusted READ Home (A-000) applying the session's redline memo. The memo at the bottom of this document is the contract: KEEP items are locked, ADJUST items are the work, QUESTION items need Emilie's decision before implementation.

## About the Design Files
The HTML files in this bundle are **design references** built in a prototyping environment, not production code. `*.dc.html` files contain the markup between `<x-dc>` tags plus a small logic class; treat them as living specs for layout, spacing, and behavior. The task is to **recreate these designs in the target codebase**: the existing repo at `site/` (React 18 + Vite + Tailwind v4 CSS-first tokens + react-router). Reuse the repo's existing components (`SheetPage`, `TitleBlock`, `LogoMark`, `ProjectCard`, `Kicker`, `RevisionWord`, `Lens`) and its tokens in `src/index.css`; do not port the inline styles verbatim.

## Fidelity
**High-fidelity.** Colors, type, spacing, and motion values are exact and match the repo's locked tokens. Recreate pixel-perfectly, but express values through the repo's Tailwind theme tokens, not hex literals (governance: no hex outside tokens).

## Screens / Views

### 1. Home A-000, adjusted (`Site Home.dc.html`)
Purpose: READ-mode landing. Changes vs the current repo Home, per memo:
- **Title block goes minimal**: keep logo cell (34px mark), name + status cell (12px Archivo expanded 600 / 9px Martian Mono status, `OPEN TO R&D ROLES IN EUROPE` in redline), keynote nav. REMOVE: sheet-number cell, ISSUED FOR stamp. The mode toggle becomes a plain mono redline link: `MODE: READ / EXPLORE >` (10px, letter-spacing 0.12em, underline offset 4px).
- **One logo per page**: header only. Remove hero cube and footer mark.
- **Header draw-in ceremony (one-shot, on load)**: the header's bottom rule is a 1px ink line that scales from 0 to full width over 700ms ease-out, with a 7px redline (#E11D48) dot riding its leading edge, fading out 250ms after arrival. Reduced motion: rule rendered complete, dot never shown.
- **Hero = Em first**: grid `minmax(0,7fr) minmax(0,3fr)`, gap 2.5rem, padding-top 3rem. Left: locked H1 (clamp(1.75rem, 4.6vw, 2.9rem), weight 600, tracking -0.015em, line-height 1.16, max 24ch, question clause in Source Serif 4 italic 500) with the RevisionWord ellipse on "feel?" (3px #E11D48, 600ms draw, 900ms delay so it follows the header rule); locked subhead (serif 17.5px/1.625, max 58ch, mono bordered chips for NeuroSpace/Sensi); locked Kicker. Right: **headshot** (`site/public/assets/brand/headshot-800.webp`), 4:5 crop, 1px ink/35 border, grayscale at rest, colors on hover (0.4s), mono caption `EM · BARCELONA VIA BEIRUT` (9px, tracking 0.1em, anno).
- **Proof pair immediately after hero** (`#work`): two ProjectCards (Sensi, NeuroSpace), locked card copy, images cropped 4:3 (aspect-ratio + object-fit cover; uniform crops are a memo requirement), grayscale at rest, color on hover/focus-within. Below: two redline mono links: `SHEET P-104: A BALLOONING MARKET >` and `OR EXPLORE THE WHOLE MIND >`.
- **Footer minimal**: carbon strip, name + role, EMAIL/LINKEDIN/GITHUB (hover redline-wire). No mark, no sheet number.
- **Mode toggle transition ("the light table switches off")**: on click, a fixed carbon overlay fades in over 550ms while the page content lifts (translateY(-8px) scale(1.005)), then navigate to EXPLORE. Reduced motion: navigate immediately.

### 2. EXPLORE mode (`Site Explore.html`, prototype of record: `explore/5a-words-in-focus.html`)
Purpose: the dark network of projects and thoughts; itself a portfolio piece. Three.js (repo may use vanilla Three or R3F; match repo conventions).
- Ground Carbon #0B0E13. Orthographic camera at (140, 115, 140) looking at origin, frustum half-height 150; damped orbit; idle drift of the target on a slow lissajous after 3s without interaction.
- Drafting dot grid: 25×25 points, 22 units apart, y = -110, #E8EAED at 10%, 1.4px screen-space.
- **Nodes are words** (canvas-texture sprites): projects = Martian Mono 26px caps in lens wire color with a lens tick (square/diamond/triangle) before the word; thoughts = Source Serif 4 italic 30px lowercase at 78% alpha, also ticked. Graph data + deterministic force layout: `explore/data.js` (21 nodes, tag-overlap edges, implied edges flagged).
- **Entry ceremony (the sanctioned SHOWCASE moment, once per arrival)**: each word assembles from 26 scan-scatter points, staggered 28ms per node, 620ms each (cubic ease-out), word fades in during the last 65% with a 14% scale settle. Reduced motion: final state instantly.
- **Rest state**: no edges at all. Gentle 1.4-unit y bob per word (disable under PRM).
- **Hover**: word swaps to redline #FF4D6D texture, spring-scales to 1.16 (stiffness 0.16, damping 0.8, slight overshoot); its edges only fade in at #E8EAED 35% over 250ms; a redline leader line draws on a 2D overlay canvas in 450ms: 2.5px dot at the word, elbow up-right, arrowhead, then annotation label (9px mono, #FF4D6D). Cursor: pointer.
- **Click**: camera zoom tweens to 2.9 and target to the word (800ms ease-in-out); non-neighbors dim to 7%; info card bottom-right (1px #E8EAED/25 border, rgba(11,14,19,0.9) bg, 10px mono): lens, name in redline, kind, thread list, and for A BALLOONING MARKET a link `OPEN SHEET P-104 >`; all other nodes say `SHEET: IN PREPARATION` until their sheets exist. ESC or background click returns.
- **Toggle back**: top-right mono redline link `ISSUED FOR: READ >`.
- HUD top-left: 10px mono, tracking 0.12em, anno-dark; legend bottom-left with the three ticked lens labels plus `MONO CAPS = PROJECT · SERIF ITALIC = THOUGHT`.
- Governance on carbon: lens wire colors only (#22D3EE / #F472B6 / #FACC15), #FF4D6D strictly hover/active, edges #E8EAED low alpha, never color without tick + label.

### 3. Case-study sheet P-104 (`Site P-104.dc.html`)
Purpose: in-site deep documentation of A Ballooning Market; the destination of the EXPLORE fly-in. Format = paper × lab notebook.
- Nav strip: 1px ink bottom border; `< A-000 HOME` and `MODE: EXPLORE >` in redline mono; center label anno mono.
- Sheet: 1040px column, padding 44px 48px. Header row (9px mono anno): `EL CHIDIAC, E. · COMPLEX FORMING · P-104` / `RECEIVED: LATE, ACCEPTED: EVENTUALLY`. Title: Archivo 30px/1.2 600, tracking -0.01em, max 26ch.
- Two columns: `minmax(0,1fr) 235px`, gap 36px.
- Main column: ABSTRACT label (9px mono anno, tracking 0.12em) + serif 15.5px/1.65 abstract; METHOD ordered list (serif 15.5px/1.7); LISTING 1 code block (10px mono, 1px ink/35 border, ink/4 bg); figure grid 2×2, gap 18px, **every figure 4:3 crop**, 1px ink/35 border, 9px mono captions (`FIG. 1 SETTLED CLUSTER, D5` etc.). Fig 2 is the epic-fail animated webp; the failure is part of the method.
- **Inline n.b. dots**: 8px redline #E11D48 circles, superscript, placed exactly where Em noted things in the prose (two in the abstract, two in the method). Hover or tap reveals a floating note card (218px, mylar bg, 1px ink/35 border, soft shadow) with the handwritten note; 300ms overshoot ease (cubic-bezier(0.34,1.56,0.64,1)); dot drops to 45% opacity while open. Reduced motion: no transition.
- **Margin column**: `GENERAL NOTES` label + handwritten notes, always visible.
- **Handwriting treatment (pending Q1 in the memo)**: Caveat, 18px/1.3, ink in annotation gray #565B63, only the `n.b.` marker in redline #BE123C. Margin notes only, never UI, never above 19px. Five notes per sheet maximum.
- Footer rule: stack line + `P-104 · 1 OF 1`.

## Interactions & Behavior (motion spec, LOCKED at NORMAL)
Reference: `Motion Language.dc.html`. Rules: one-shot ceremonies, 150-900ms, scoped to elements, everything renders final state under prefers-reduced-motion.
1. **Redline pass**: ellipse hand-draws around one word (600ms ease-out, stroke-dashoffset), then the leader line inks toward the link (dot 150ms, line 300ms, arrowhead 150ms). No link-underline animation at NORMAL.
2. **Settle counters**: numbers count up over 600ms with a slight overshoot (easeOutBack, c1 ≈ 0.93), rendered in redline while moving, settling to ink at rest; bars fill on the same curve.
3. **Color = data arriving**: card images rest grayscale; color fades in over 400ms on hover/arrival; mono caption appears 200ms after.
4. **Next sheet**: page transitions never slide the viewport. The old sheet lifts (translateY(-16px) + fade, 400ms ease-in) while the next sheet, already beneath, settles from scale 0.99.
- WHISPER (shorter, ellipse-only, no overshoot) is for dense/embedded views. SHOWCASE (wipe reveal + percentage, link underline) is reserved for the EXPLORE entry ceremony only.

## State Management
- Home: `leaving` flag for the mode-toggle transition.
- EXPLORE: `entryDone`, `hovered`, `focused` node index, saved camera state for the return tween. Keep slide/route position in the URL.
- P-104: per-note revealed map + hover index for inline dots.
- No data fetching; graph content is static (`explore/data.js`).

## Design Tokens
All already exist in `site/src/index.css` (Tailwind v4 `@theme`); use them, never raw hex:
- Grounds: mylar #F7F7F4, carbon #0B0E13. Ink #16181D / #E8EAED. Annotation #565B63 / #8A919C. Rules: ink at 20% standard, 35% emphasized, nothing else.
- Redline: #BE123C text, #E11D48 strokes/fills ≥3px, #FF4D6D on carbon. Interaction and liveness ONLY, never category.
- Lens pens/wires: cyan #0E7490/#22D3EE (square), magenta #A8186B/#F472B6 (diamond), yellow #7A5E00/#FACC15 (triangle). Never color without tick + label.
- Type: Archivo (display/UI; width tokens 120%/80% only), Source Serif 4 (prose only), Martian Mono (every number and label, never above 0.875rem).
- NEW, pending memo Q1: one handwriting face (Caveat previewed) for margin notes only.

## Assets
All assets referenced are already in the repo:
- `site/public/assets/brand/headshot-800.webp` (hero portrait)
- `site/public/assets/projects/sensi/app-shape-*.webp`, `site/public/assets/projects/neurospace/landing-*.webp` (proof pair)
- `site/public/assets/projects/ballooning-market/render-1-*.webp`, `render-3-*.webp`, `epic-fails-640.webp` (animated), `process-640.webp` (animated) for P-104
- Fonts: `site/src/assets/fonts/` (archivo-var, source-serif-var + italic, martian-mono-400). Caveat would come from Google Fonts if adopted.
- The EEC logo mark: use the repo's `LogoMark.tsx` as-is (locked geometry).

## Files
- `Site Home.dc.html` { adjusted A-000 (design of record for READ Home)
- `Site Explore.html` { EXPLORE mode, wired (Three.js, imports `explore/data.js`)
- `explore/5a-words-in-focus.html` { the locked EXPLORE prototype before site wiring
- `explore/data.js` { graph content, edge derivation, deterministic layout
- `Site P-104.dc.html` { case-study sheet with inline n.b. notes
- `Motion Language.dc.html` { interactive motion spec, NORMAL stamped

## REDLINE MEMO (paste-ready contract; no em dashes anywhere, defensible verbs only)

KEEP
- The red pen as a character: it leads hovers, notes, and the plot.
- Hero rigor and play balance: serif italic question plus the circled "feel?".
- Pen Table grounds, ink, and type scale.
- EXPLORE = Words, In Focus: entry ceremony once, quiet after, edges only on request, leader-line hover, click flies to the P-sheet.
- Toggle metaphor = the light table switches off.
- Case study = P-104 settled sheet: paper × lab notebook, aligned 4:3 figures, the epic fail filed as method.
- Notes: handwriting in annotation gray, red n.b. marker only, inline dots where Em noted things plus general notes in the margin, five per sheet maximum.
- Motion at NORMAL, locked; whisper for dense views; showcase for the EXPLORE entry only.

ADJUST
- Logo instances: one per page (was three).
- Furniture: minimal; stamp removed pending the toggle exploration.
- Hierarchy: Em and the projects first, proof before preamble.
- Content density: show the most with the least.
- Scroll axis: prototype a horizontal drawing-roll scroll before committing.
- Red presence: alive with character, interaction and liveness only.
- Figures: uniform 4:3 crops sitewide.
- EXPLORE node click routes to P-sheets; sheets for the remaining projects need building.
- Commit-graph year axis: parked for the CV page.

QUESTION FOR THE BUILD SESSION
- Logo geometry (locked): repetition made it feel decorative; revisit desired. Recorded, not redesigned.
- Hero and card copy (locked): simplify toward mind, psychology, technology, future. Recorded, untouched.
- The ISSUED FOR stamp as toggle (locked concept): alternatives wanted; current build uses a plain mono redline link as a placeholder.
- Where persona lives: EXPLORE primary, READ minimal; notebook-site direction recorded, not decided.
- Fourth typeface for handwriting: adopt with hard caps (margin notes only, never UI, never above 19px)?
- The red n.b. marker: liveness or a new sanctioned exception; the rule text needs one sentence.
- Note and pull-quote copy are drafts in Emilie's voice, pending sign-off.
