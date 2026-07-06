# Design-exploration kit { for Claude sessions outside this repo

> How to use: open a fresh Claude chat (claude.ai works great; artifacts can run
> interactive Three.js). Paste BLOCK 0 first, then ONE exploration prompt
> (X, A, B, or C). One question per chat. Attach 2-3 screenshots of the current
> build so it reacts to reality, not a blank page.
> Recommended order: X first (vision check on what exists), then A (EXPLORE mode).
>
> Ground rules for you, Emilie:
> 1. Ask for THREE divergent takes per session, not one polished answer.
> 2. The locked system is a constraint, not a suggestion. If a session tries to
>    re-pitch palettes or fonts, redirect it.
> 3. Bring winners back as screenshots + one line on WHY it wins. We translate
>    into the real stack (Vite + react-three-fiber); we never paste artifact code.
> 4. If an exploration makes you doubt a LOCKED decision, do not redesign there.
>    Write down what bothered you; that note comes to the build session.

---

## BLOCK 0 { paste this first, always

You are exploring design directions for one surface of an existing, locked design
system. Treat everything in this block as fixed constraints.

WHO: Emilie El Chidiac, Design Technology Architect (architect turned computational
designer, MaCAD at IAAC). Audience: hiring managers on European R&D and
design-technology teams. Brand spine: "Behavior Information Modeling" { design
technology that makes buildings responsive to the human mind.

VOICE: rigor + play. Radically honest, funny, technically fearless but legible.
HARD RULE: no em dashes anywhere, ever. Defensible verbs only (model, score,
estimate; never claims like "optimizes your mind").

THE SITE: two modes. READ mode is built: an editorial "drawing set" (cool drafting
film, plotter ink, drawing-set title block header, sheet numbers per page).
EXPLORE mode is next: a dark 3D orb network of projects and thoughts. The mode
toggle is a rubber stamp reading ISSUED FOR: READ / EXPLORE.

LOCKED DESIGN SYSTEM ("Pen Table"): color appears ONLY as information.
- Grounds: Mylar #F7F7F4 (light), Carbon #0B0E13 (dark)
- Ink: #16181D on light, #E8EAED on dark; annotation gray #565B63 / #8A919C
- Redline = interaction + liveness ONLY, never a category: #BE123C text,
  #E11D48 thick strokes, #FF4D6D on dark
- Three lens colors encode project categories, always paired with a shape tick
  and label: cyan #0E7490/#22D3EE + square (Computation & Research), magenta
  #A8186B/#F472B6 + diamond (Design & Practice), olive #7A5E00 / yellow #FACC15
  + triangle (Explorations). Each color has a light "pen" and dark "wire" state.
- Type: Archivo (display/UI, variable width), Source Serif 4 (prose only),
  Martian Mono (every number, all labels, never above 14px)
- Motion: one-shot ceremonies 150-900ms, always reduced-motion safe

LOGO (locked): the EEC mark is an isometric wireframe cube of 8 strokes whose
faces spell E (left), E (top), C (right), drawn as a graph: nodes at the seven
vertices, one redline node where the three letters meet. Three edges are
deliberately missing; the eye completes them.

LOCKED HERO COPY (for reference, do not rewrite): "I started asking buildings a
question my software couldn't answer: how will this space make someone feel?"

Your job is defined in the next message. Produce three genuinely different
options, each as a self-contained interactive artifact where possible, each with
a two-line rationale. Do not re-pitch colors, fonts, the logo, or the copy.

---

## PROMPT X { vision check: review the current design, edit it, play with it

Attach screenshots of the current build first (Home, Work, About, CV; desktop
and mobile). Your job has three phases. Do not skip phase 2.

PHASE 1, REPLICA: rebuild a faithful interactive replica of the Home page as a
single HTML artifact, matching the screenshots plus these implementation facts:
H1 at clamp(1.75rem, 4.6vw, 2.9rem), weight 600, tracking -0.015em, with the
question clause in serif italic; the word "feel?" circled by a hand-wobbled red
ellipse (3px, #E11D48); subhead serif 17.5px line-height 1.6, max 58ch, with
NeuroSpace and Sensi as small bordered mono chips; kicker as mono 12px annotation
with a red leader line (dot, elbow, arrowhead); header is a title block: logo
cube 34px, name in expanded caps 12px over a 9px mono status line, keynote nav
(01 WORK 02 ABOUT 03 CV), sheet number A-000, and a red ISSUED FOR: READ /
explore stamp rotated -1 degree; below the hero a legend of three lens chips
(mono 10px, bordered, tick shapes per BLOCK 0); project cards with 1px ink
borders, grayscale images, mono meta rows, serif blurbs. Ground Mylar, everything
left-aligned. Use system font stand-ins but match the sizes and spacing.

PHASE 2, PLAY PANEL: add a fixed control panel to the artifact so I can feel
variations live without redesigning:
- H1 scale (80% to 120%) and the serif-question treatment (italic serif as now /
  all grotesque / all serif)
- logo stroke weight (6 to 11) and node radius (0 to 16; 0 = no nodes)
- red presence: whisper (ellipse only) / current / alive (more redline moments,
  still only ever interaction and liveness, never categories)
- drawing-set furniture: minimal (no stamp, no sheet numbers) / current / one
  notch more (tick marks in margins)
- spacing rhythm: tighter / current / airier
- card images: grayscale at rest (current) / always color / ink duotone
  (label the non-current image options PREVIEW ONLY: they bend a locked rule
  and are for my eyes, not for shipping without discussion)

PHASE 3, INTERVIEW AND MEMO: while I play, interview me one question at a time,
maximum seven questions, comparing what I see against what I imagined. The
questions I need asked: Does this feel like MY drawings or like A drawing set?
Is the red pen alive enough to carry the "behavior data speaking" idea? Does the
hero read as rigor AND play, or rigor with a wink? Is anything costume? Would a
Foster or Zaha CODE lead trust this in five seconds? What is missing that I
imagined? What surprised me positively?

Then end with a REDLINE MEMO in exactly three lists, no em dashes anywhere:
- KEEP: what matched the vision (element + one reason)
- ADJUST: specific edits within the locked system (property, current value,
  wanted value)
- QUESTION FOR THE BUILD SESSION: anything that touches locked decisions (the
  hexes, the three fonts, the logo geometry, the copy). Record why it bothered
  me; do NOT redesign it here.
The memo is the deliverable. I will paste it into my build session verbatim.

## PROMPT A { EXPLORE mode: the 3D orb network (the big one)

Explore the feel of EXPLORE mode: a dark (Carbon #0B0E13) 3D network where orbs
are projects AND thoughts, connected by shared themes (AI, geometry, XR, neuro,
research). This mode is itself a portfolio piece: it must demonstrate real
creative-coding taste to a computational-design audience.

Build three interactive Three.js prototypes (mouse orbit + hover at minimum),
each exploring a DIFFERENT character:

1. One where the network reads like a living instrument (signals travel edges,
   orbs breathe, hovering an orb makes it settle with a damped spring overshoot,
   like a Kangaroo physics solver relaxing).
2. One where it reads like a drawing that learned to float (wireframe pen-plot
   aesthetics in 3D: same uniform stroke language as the logo, nodes as the
   cube's vertex dots, camera moves like panning across a sheet).
3. One wildcard with a real aesthetic risk.

Constraints: orbs colored ONLY by the three wire-state lens colors (#22D3EE,
#F472B6, #FACC15) on Carbon, redline #FF4D6D reserved for the hovered/active
node, edges in #E8EAED at low opacity, labels in a monospace. Projects should
read differently from thoughts (size? stroke vs fill? orbit?). Show what
"flying into a node" could feel like on click, even roughly.

Also sketch (static is fine) the TOGGLE MOMENT: how READ flips to EXPLORE.
The working metaphor is "the light table switches off": the drafting film goes
dark and the drawing lifts off the sheet. Show me one alternative metaphor too.

## PROMPT B { case-study page as a drawing sheet

READ mode has project cards that currently link out to blog posts. Explore what
an in-site case-study page looks like inside the locked system: a drawing sheet
that documents one project deeply (process, epic fails, GIFs, code snippets,
live scores). Use the real project "A Ballooning Market" (solo project: filling
Cairo's historic Bab al-Luq market with Kangaroo-simulated balloons; her blog
post voice: "why I decided to fill a historic market with balloons, and how I
almost failed").

Three takes: (1) strict documentation set (numbered sheets, keynotes, revision
history as the process story), (2) editorial longread with drawing-set furniture
only at the seams, (3) something between a paper and a lab notebook (figures,
captions, honest margin notes in redline). Each as an HTML artifact with real
typographic hierarchy using system font stand-ins (name the intended faces:
Archivo / Source Serif 4 / Martian Mono).

## PROMPT C { motion language within the governance

Using only HTML/CSS/JS artifacts, explore the site's motion vocabulary under
these rules: one-shot ceremonies, 150-900ms, scoped to elements (never full-page
filters), everything renders its final state under prefers-reduced-motion.

Demos wanted: (1) the redline pass (a red ellipse hand-draws around one word,
then a leader line inks toward a link), (2) scores that settle-count to resting
values in a monospace (cortisol 62, circadian 78), (3) a project card whose
image takes color as data "arrives", (4) page-to-page transition that feels like
flipping to the next sheet in a set WITHOUT sliding the whole viewport. Three
intensity levels of the same vocabulary: whisper, normal, showcase. Recommend
which level ships.
