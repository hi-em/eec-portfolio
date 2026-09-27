// THE SPINE of codependent: WHAT / WHY / HOW / WHAT CAME OF IT. Lazy, like
// every spine. WHAT, WHY, HOW 1 + 3 and OUTCOME are Emilie's own concept
// paragraphs, verbatim (the event's name swapped for "It"); HOW 2 was drafted
// from the design-space clip. SIGNED by her as drafted, Gate 2, 2026-09-27.
import type { ProjectSpine } from './types'

const spine: ProjectSpine = {
  alsoAnswers: [
    { q: 'Can a booth stand without glue or screws?', beat: 'what' },
    { q: 'Why make mutual support the idea?', beat: 'why' },
    { q: 'How does a rule grow an assembly?', beat: 'how' },
    { q: 'What happened when pieces went missing on site?', beat: 'outcome' },
  ],
  what: (
    <>
      It begins with a simple idea: each piece needs another to stand. Two interlocking
      wooden panel types form a modular assembly without glue or screws between pieces.
    </>
  ),
  why: (
    <>
      Mutual support becomes both a construction method and a place to gather. The same
      system creates seats, counters and open edges where people can stop, meet and move
      through.
    </>
  ),
  how: [
    <>The Grasshopper definition explores how that system can grow, using connection rules,
      spatial limits and support checks.</>,
    <>Thirty arrangements narrow to ten, and ten to one: option 29, 34 parts.</>,
    <>The selected option becomes numbered parts and cutting layouts.</>,
  ],
  outcome: (
    <>
      On site, misplaced pieces and no spares made that adaptability real. Connections had
      to be reconsidered while keeping the seating and counters useful. We designed a
      puzzle, and then had to solve it together.
    </>
  ),
}

export default spine
