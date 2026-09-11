// THE READING LINE (Emilie's A, 2026-09-11): one mono line at the foot of a
// note naming the research it leans on, first author and year, each a door to
// the paper. It is what makes the sourcing rule visible: a PERSON is credited
// in the prose only when their words or idea were taken; a FACT cites its
// paper here; the pointer that led her to the paper (a podcast, a feed) is
// never named. The prose stays light and the work is still shown.
//
// JSX-free, like openings.ts, so an index surface could import it without
// dragging the note prose into its chunk.
//
// EVERY LINK IS VERIFIED BEFORE IT SHIPS (her instruction: "double check that
// no links there doesn't work or leads to a dead end"). Method, 2026-09-11:
// each DOI was looked up on api.crossref.org (title, journal and year matched
// the citation) and resolved through doi.org (302 to the publisher). The two
// books have no DOI and link to their Internet Archive records, both 200 with
// the right title; the publisher's page for Ellard's book is a 404, which is
// why it is not used. Order within a note = the order the note leans on them.
export interface Reading {
  /** First author and year, the way a reader scans a bibliography. */
  label: string
  /** The paper's title, carried as the link's tooltip and accessible name. */
  title: string
  href: string
}

export const THOUGHT_READING: Record<string, readonly Reading[]> = {
  // T-120 · we see in silence
  dark: [
    {
      label: 'Hagins 1970',
      title: 'Dark current and photocurrent in retinal rods (Hagins, Penn & Yoshikami, Biophysical Journal)',
      href: 'https://doi.org/10.1016/S0006-3495(70)86308-1',
    },
    {
      label: 'Rao & Ballard 1999',
      title: 'Predictive coding in the visual cortex: a functional interpretation of some extra-classical receptive-field effects (Nature Neuroscience)',
      href: 'https://doi.org/10.1038/4580',
    },
    {
      label: 'Schultz 1997',
      title: 'A neural substrate of prediction and reward (Schultz, Dayan & Montague, Science)',
      href: 'https://doi.org/10.1126/science.275.5306.1593',
    },
    {
      label: 'Goldstein 2022',
      title: 'Shared computational principles for language processing in humans and deep language models (Nature Neuroscience)',
      href: 'https://doi.org/10.1038/s41593-022-01026-4',
    },
    {
      label: 'Ellard 2015',
      title: 'Places of the Heart: the psychogeography of everyday life (Internet Archive)',
      href: 'https://archive.org/details/placesofheartpsy0000ella',
    },
    {
      label: 'Berlyne 1971',
      title: 'Aesthetics and Psychobiology (Internet Archive)',
      href: 'https://archive.org/details/aestheticspsycho0000berl',
    },
  ],
  // T-121 · where the plant is
  plant: [
    {
      label: 'Leitereg 1971',
      title: 'Chemical and sensory data supporting the difference between the odors of the enantiomeric carvones (Journal of Agricultural and Food Chemistry)',
      href: 'https://doi.org/10.1021/jf60176a035',
    },
    {
      label: 'Friedman & Miller 1971',
      title: 'Odor incongruity and chirality (Science)',
      href: 'https://doi.org/10.1126/science.172.3987.1044',
    },
    {
      label: 'Buck & Axel 1991',
      title: 'A novel multigene family may encode odorant receptors: a molecular basis for odor recognition (Cell)',
      href: 'https://doi.org/10.1016/0092-8674(91)90418-X',
    },
    {
      label: 'Dehaene 2010',
      title: 'Why do children make mirror errors in reading? Neural correlates of mirror invariance in the visual word form area (NeuroImage)',
      href: 'https://doi.org/10.1016/j.neuroimage.2009.09.024',
    },
    {
      label: 'Høydal 2019',
      title: 'Object-vector coding in the medial entorhinal cortex (Høydal, Skytøen, Andersson, Moser & Moser, Nature)',
      href: 'https://doi.org/10.1038/s41586-019-1077-7',
    },
  ],
}
