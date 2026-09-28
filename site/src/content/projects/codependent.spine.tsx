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
      wooden panel types form a modular assembly without glue or screws between pieces. An exhibition stand on a 6 by 6 m platform: 780 mm
      panels, white and black, slot into a structure 2.94 m high, and the same system becomes
      seats at 408 mm and counters at 948 mm.
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
    <>Explore how that system can grow in the Grasshopper definition, using connection rules,
      spatial limits and support checks.</>,
    <>Narrow thirty arrangements to ten, and ten to one: option 29, 34 parts.</>,
    <>Turn the selected option into numbered parts and CNC cutting layouts, each part ID tied
      to its geometry, assembly and parts schedule.</>,
  ],
  outcome: (
    <>
      Option 29 went to site as 34 panels with no spares, and some were misplaced. We went
      back and cut new ones, but pieces were already connected, so the layout had to be
      improvised around them: the booth stood with 39, still balanced. We designed a puzzle,
      and then had to solve it together. Afterwards the panels moved into the brand&rsquo;s
      office as small grouped pieces.
    </>
  ),
}

export default spine
