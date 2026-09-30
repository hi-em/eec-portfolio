// THE SPINE of neurospace: WHAT / WHY / HOW / WHAT CAME OF IT.
// Split out of neurospace.tsx on 2026-08-03 (the phone pass). This module is
// LAZY: content/projects/index.ts reaches it through import.meta.glob, so a
// visitor downloads one project’s prose, not all 21. The meta half stays in
// neurospace.ts and is still statically barrelled, because the grid, the plate
// face, the CV line, headData and the OG card all need it synchronously.
import NB from '../../components/ui/NB'
import type { ProjectSpine } from './types'

const spine: ProjectSpine = {
  alsoAnswers: [
    { q: "What if a room could tell you what it’s doing to you, while you design it?", beat: 'what' },
    { q: 'Does ceiling height really change how stressed you are?', beat: 'how' },
    { q: 'Does the score prove the hypothesis, hand you a new one, or the opposite?', beat: 'outcome' },
    { q: 'What happens when BIM starts describing you instead of the building?', beat: 'why' },
  ],
  // WHAT, HOW and WHAT CAME OF IT re-signed by Emilie as drafted, 2026-09-30
  // (the v2 rebuild; her rulings 103-106). The rebuild lives here as
  // context, not as a tag or a dated line (her ruling).
  what: (
    <>
      You are sitting in a room right now, and its defaults are quietly working on you: the
      ceiling height nudging your cortisol, the daylight setting your circadian clock. NeuroSpace
      makes that invisible layer legible: change one thing, and a membrane room form-finds itself
      live while a score answers back. The first version ran its geometry through Grasshopper, on
      a server that has since died. This one runs entirely in your browser.
    </>
  ),
  why: (
    <>
      This is the thesis I keep circling: BIM, reframed from Building Information Modeling to
      Behavior Information Modeling. The information that matters is not just what a building is
      made of; it is what the building is doing to the person inside it.
    </>
  ),
  // The Claude Code clause is hers to keep (ruling 106): two of her four target
  // roles are AI-centric, and the clause shows the work directed and checked.
  how: [
    <>
      Describe the room as parameters, not geometry: ceiling, walls, openings, organic form,
      plants, each a slider.
    </>,
    <>
      Form-find it as one tensioned membrane by force density, the method written for Frei Otto’s
      Munich Olympic roof: each drag re-solves it in milliseconds.
    </>,
    <>
      Score it in the browser against a control room: a transparent weighted sum you can split the
      screen with, or flip to by holding F.
    </>,
    <>
      Write every rule in code with Claude Code as a pair: I set the rule, then check it against
      its source.
    </>,
  ],
  // ✔ SIGNED by Emilie, 2026-08-18 (the book audit): the slot used to carry no
  // event at all; it now leads with the checkable and keeps every honesty line.
  // REOPENED KNOWINGLY at the words pass (2026-08-19, her ruling): the Valentine
  // line joins the end. She is the podcast's guest and a named researcher in the
  // field; her feedback on NeuroSpace itself came up in the interview round.
  outcome: (
    <>
      It shipped live, then the server under it died. I rebuilt it instead of letting it go,
      partly for Dr. Cleo Valentine’s note, the frame I kept: treat every score as a hypothesis.
      So the lab now tests one at a time, against a control. Partly as an excuse to form-find
      without Grasshopper. The weights sit in the public repo, to argue with.
      <NB note="a score you can argue with beats a number you have to trust." /> The score stays a
      heuristic: it never measures your body.
    </>
  ),
}

export default spine
