// THE SPINE of sensi: WHAT / WHY / HOW / WHAT CAME OF IT.
// Split out of sensi.tsx on 2026-08-03 (the phone pass). This module is
// LAZY: content/projects/index.ts reaches it through import.meta.glob, so a
// visitor downloads one project’s prose, not all 21. The meta half stays in
// sensi.ts and is still statically barrelled, because the grid, the plate
// face, the CV line, headData and the OG card all need it synchronously.
import NB from '../../components/ui/NB'
import type { ProjectSpine } from './types'

const spine: ProjectSpine = {
  alsoAnswers: [
    { q: 'Can a copilot score how a floor plan will feel, before anyone builds it?', beat: 'what' },
    { q: 'What does comfort look like when it is scored for you, not the average?', beat: 'why' },
    { q: 'Can AI read a floor plan and tell you where the comfort breaks?', beat: 'how' },
    { q: 'How do you bench an LLM’s judgment before trusting its comfort scores?', beat: 'outcome' },
  ],
  what: (
    <>
      Every tool in the stack could tell us how a building performs. None of them would say how a
      room feels. Sensi closes that gap: a copilot that reads a floor plan and scores comfort
      across six senses (thermal, visual, acoustic, spatial, olfactory, tactile), calibrated to
      one person at a time, not an average. It was prototyped first as an MCP tool, then rebuilt
      as a standalone app. Project lead, A to Z, built by a team of four: Lakzhmy Mari Zaro,
      María Sánchez Domínguez, Charles Abi Chahine and me.
    </>
  ),
  why: (
    <>
      {/* A statement, no I and no we (Emilie, 2026-09-10, the walkthrough
          reopen): the motivation reads as the project's, not a person's. */}
      Comfort is usually the thing that shows up, or does not, after the design is done. Sensi
      makes it a layer you can interrogate while the plan is still soft, because you do not walk
      into a room and average your experience: the thing that is wrong is the thing you notice.
      And nothing you fix stays fixed alone: the whole project is the ripple, what a change drags
      along.
    </>
  ),
  how: [
    <>
      {/* THE SHORT HOW (Emilie, 2026-09-11): 12 lines to 9 so the sheet fits
          her 1080-tall screen without scrolling; measured at the real wrap.
          The facts did not move, the words did. */}
      Onboarding calibrates it to one person: thermal grudges, noise tolerance.
    </>,
    <>
      {/* The evals clause (the researcher pass, Emilie 2026-08-26, "c and a
          mix"): drafted from the repo's own code — nodes/quality/evaluator.py
          gates every reply APPROVED or REVISE, nodes/scoring/
          suggestion_critic.py reads each suggestion for feasibility and
          cross-sense consequences. draftCopy until she signs the words. */}
      One LLM call per turn routes each request through a LangGraph graph: analyze, edit,
      preview, audit. Two evals ride inside: a critic on every suggestion, an evaluator on every
      reply.
    </>,
    <>
      A coupling matrix ripples every change into the neighboring senses, so a fix that quietly
      breaks another score gets flagged, not hidden.
      <NB note={'the six scores argue like a family. the coupling matrix is the dinner table.'} />
    </>,
    <>
      Edits preview before they commit, then a vision model redraws the room, structure intact,
      and hands over the report.
    </>,
  ],
  outcome: (
    <>
      {/* THE SHORT OUTCOME (Emilie, 2026-09-11): 11 lines to 8, same reason
          as the HOW above. "agreement is not truth" is her frozen line. */}
      Two LLM providers scored the same three scenes, one arranged to fail, and mostly agreed.
      Easy to call that validation. We wrote agreement is not truth into the notes instead, and
      kept every disagreement as data.
      {/* The a sentence (same ruling): drafted from bench_quality.py — the
          blind A/B that replays each node's captured prompts through the old
          and new model before a swap is adopted. draftCopy until signed. */}{' '}
      It hardened into evals: swap a model and the same apartment replays through the same
      prompts, judged blind before the swap is believed.
      {/* THE LIMITS (Emilie, 2026-09-10, after the Hesham Shawqy review): the
          walkthrough ends on what the built tool does not do, in the order she
          ruled: validation first, then estimates, then the labelled couplings.
          Facts from the repo: README ("it models and estimates; it does not
          measure"), python/comfort/sense_model.py (every coupling tagged
          verified or inferred). draftCopy until she signs the words. */}{' '}
      Nobody has stood in a room Sensi scored and said whether it was right. It estimates, it does
      not measure, and every coupling in the code is labeled verified or inferred, so you can see
      which links rest on research and which on our reasoning.
    </>
  ),
}

export default spine
