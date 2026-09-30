// THE SPINE of tideline: WHAT / WHY / HOW / WHAT CAME OF IT. Lazy, like every
// spine (content/projects/index.ts globs it). WHAT, HOW and OUTCOME are
// Emilie's own concept paragraphs, verbatim; WHY was drafted from them.
// SIGNED by her as drafted, Gate 2, 2026-09-27.
import type { ProjectSpine } from './types'

const spine: ProjectSpine = {
  alsoAnswers: [
    { q: 'How do you reveal a car without a curtain?', beat: 'what' },
    { q: 'Why hide the thing everyone came to see?', beat: 'why' },
    { q: 'How does an attractor curve become sixty fins?', beat: 'how' },
    { q: 'What happened at the reveal?', beat: 'outcome' },
  ],
  what: (
    <>
      The installation turns concealment into the main attraction. Instead of hiding the
      Lincoln behind a curtain, a wave-inspired enclosure of mirrored fins draws visitors
      closer through reflections and partial glimpses of the car. Sixty parametrically
      generated fins, 1.70 m high, ring a 7 by 4 m ellipse on two metal perimeter rings: foam
      core, a thin wood layer, reflective aluminum.
    </>
  ),
  why: (
    <>
      A curtain asks people to wait. A reflection asks them to move: every step around the
      ring shows a different slice of the car and a different slice of themselves.
    </>
  ),
  how: [
    <>Shape the wave in Grasshopper with an attractor curve.</>,
    <>Set panel spacing and rotation to control what visitors can see as they move around it.</>,
    // THE CLIENT WALKTHROUGH (ruling 99; her words, shaped 2026-09-30, T1):
    // she built it in Unreal before the build. No number: she has none.
    <>Walk the client around each option in Unreal VR: how much of the car shows? Then
      simplify to cut production cost.</>,
    <>Test the balance between reflection, concealment and the weight of the assembly with
      physical prototypes and on-site checks.</>,
    <>Take the same definition to fabrication: profiles, ring intersections, part numbers,
      flattening and nesting, 62 parts in all.</>,
  ],
  outcome: (
    <>
      At the reveal, the enclosure lifts: the object that first captured everyone&rsquo;s
      attention gives way to the car hidden inside. It was a real showpiece, the unpredictable thing in
      the event: people were very curious what this structure was, and stopped to photograph
      it. Concept to reveal took under a month.
    </>
  ),
}

export default spine
