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
      closer through reflections and partial glimpses of the car.
    </>
  ),
  why: (
    <>
      A curtain asks people to wait. A reflection asks them to move: every step around the
      ring shows a different slice of the car and a different slice of themselves.
    </>
  ),
  how: [
    <>In Grasshopper, an attractor curve shapes the wave.</>,
    <>Panel spacing and rotation control what visitors can see as they move around it.</>,
    <>Physical prototypes and on-site checks explored the balance between reflection,
      concealment and the weight of the assembly.</>,
  ],
  outcome: (
    <>
      At the reveal, the enclosure lifts: the object that first captured everyone&rsquo;s
      attention gives way to the car hidden inside.
    </>
  ),
}

export default spine
