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
      one person at a time, not an average. Project lead in a team of four (Charles Abi Chahine, Lakzhmy
      Mari Zaro, María Sánchez Domínguez and me): we framed the question together.
    </>
  ),
  why: (
    <>
      {/* A statement, no I and no we (Emilie, 2026-09-10, the walkthrough
          reopen): the motivation reads as the project's, not a person's. */}
      Comfort is usually the thing that shows up, or does not, after the design is done. Sensi
      makes it a layer you can interrogate while the plan is still soft, because you do not walk
      into a room and average your experience: the thing that is wrong is the thing you notice.
    </>
  ),
  how: [
    <>
      {/* THE SHORT HOW (Emilie, 2026-09-11): 12 lines to 9 so the sheet fits
          her 1080-tall screen without scrolling; measured at the real wrap.
          The facts did not move, the words did. */}
      Calibrate it to one person at onboarding: thermal grudges, noise tolerance.
    </>,
    <>
      {/* The evals clause (the researcher pass, Emilie 2026-08-26, "c and a
          mix"): drafted from the repo's own code — nodes/quality/evaluator.py
          gates every reply APPROVED or REVISE, nodes/scoring/
          suggestion_critic.py reads each suggestion for feasibility and
          cross-sense consequences. draftCopy until she signs the words. */}
      Route each request, one LLM call per turn, through a LangGraph graph: analyze, edit,
      preview, audit. Two evals ride inside: a critic on every suggestion, an evaluator on every
      reply.
    </>,
    <>
      Ripple every change, through a coupling matrix, into the neighboring senses, so a fix that
      quietly breaks another score gets flagged, not hidden.
      <NB note={'the six scores argue like a family. the coupling matrix is the dinner table.'} />
    </>,
    <>
      Preview edits before they commit, then let a vision model redraw the room, structure
      intact, and hand over the report.
    </>,
  ],
  outcome: (
    <>
      {/* THE SHORT OUTCOME (Emilie, 2026-09-11): 11 lines to 8, same reason
          as the HOW above. "agreement is not truth" is her frozen line. */}
      Two LLM providers scored the same three scenes, one arranged to fail, and mostly agreed.
      Easy to call that validation. We wrote agreement is not truth into the notes instead, and
      kept every disagreement as data.
      {/* The evals sentence, cut to its first clause at the band pass (Emilie,
          2026-09-28: the blind A/B detail from bench_quality.py left for the
          range; evals stays named here, in HOW and in MY PART). */}{' '}
      It hardened into evals.
      {/* THE LIMITS (Emilie, 2026-09-10, after the Hesham Shawqy review): the
          walkthrough ends on what the built tool does not do: estimates, then
          the labelled couplings (the "nobody has stood in a room" validation
          line was cut at the band pass, her ruling 2026-09-28).
          Facts from the repo: README ("it models and estimates; it does not
          measure"), python/comfort/sense_model.py (every coupling tagged
          verified or inferred). draftCopy until she signs the words. */}{' '}
      It estimates, it does not measure, and every coupling in the code is labeled verified or inferred, so you can see
      which links rest on research and which on our reasoning.
    </>
  ),
}

export default spine
