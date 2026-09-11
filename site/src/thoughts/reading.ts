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
// each DOI was looked up on api.crossref.org (title, first author and year
// matched the citation) and resolved through doi.org (302 to the publisher);
// arXiv papers were fetched at arxiv.org/abs and their titles matched; books
// have no DOI and link to the Internet Archive's own lending records, found
// through its search API and fetched (200, right title). Order within a note
// is the order the note leans on them.
//
// THE CAP IS FOUR (Emilie, 2026-09-11: "max 3-4 per thought"), and a note
// carries a line only if it actually states something the literature holds:
// `charcoal` and `explain` make no such claim and carry none. Candidates that
// could not be verified were DROPPED, not guessed: Eberhard's Brain Landscape,
// Woodbury's Elements of Parametric Design and Muller's Tyranny of Metrics have
// no Archive record; the publisher page for Ellard's book is a 404; one
// escholarship permalink answers a bot challenge instead of the paper, so the
// adaptive-comfort citation is the 2002 journal version with a DOI.
export interface Reading {
  /** First author and year, the way a reader scans a bibliography. */
  label: string
  /** The paper's title, carried as the link's tooltip and accessible name. */
  title: string
  href: string
}

const ULRICH_1984: Reading = {
  label: 'Ulrich 1984',
  title: 'View through a window may influence recovery from surgery (Science)',
  href: 'https://doi.org/10.1126/science.6143402',
}
const VARTANIAN_2013: Reading = {
  label: 'Vartanian 2013',
  title: 'Impact of contour on aesthetic judgments and approach-avoidance decisions in architecture (PNAS)',
  href: 'https://doi.org/10.1073/pnas.1301227110',
}
const VALENTINE_2024: Reading = {
  label: 'Valentine 2024',
  title: 'The impact of architectural form on physiological stress: a systematic review (Frontiers in Computer Science)',
  href: 'https://doi.org/10.3389/fcomp.2023.1237531',
}

export const THOUGHT_READING: Record<string, readonly Reading[]> = {
  // T-101 · behavior information modeling
  bim: [ULRICH_1984, VARTANIAN_2013, VALENTINE_2024],
  // T-102 · neuroaesthetics
  neuroaes: [
    {
      label: 'Chatterjee & Vartanian 2014',
      title: 'Neuroaesthetics (Trends in Cognitive Sciences)',
      href: 'https://doi.org/10.1016/j.tics.2014.03.003',
    },
    VARTANIAN_2013,
    {
      label: 'Coburn 2017',
      title: 'Buildings, beauty, and the brain: a neuroscience of architectural experience (Coburn, Vartanian & Chatterjee, Journal of Cognitive Neuroscience)',
      href: 'https://doi.org/10.1162/jocn_a_01146',
    },
    VALENTINE_2024,
  ],
  // T-103 · physics solvers
  solvers: [
    {
      label: 'Piker 2013',
      title: 'Kangaroo: form finding with computational physics (Architectural Design)',
      href: 'https://doi.org/10.1002/ad.1569',
    },
    {
      label: 'Bouaziz 2014',
      title: 'Projective dynamics: fusing constraint projections for fast simulation (ACM Transactions on Graphics)',
      href: 'https://doi.org/10.1145/2601097.2601116',
    },
  ],
  // T-104 · generative ai
  genai: [
    {
      label: 'Ho 2020',
      title: 'Denoising diffusion probabilistic models (Ho, Jain & Abbeel, arXiv)',
      href: 'https://arxiv.org/abs/2006.11239',
    },
    {
      label: 'Rombach 2022',
      title: 'High-resolution image synthesis with latent diffusion models (CVPR)',
      href: 'https://doi.org/10.1109/CVPR52688.2022.01042',
    },
  ],
  // T-105 · extended reality
  xreal: [
    {
      label: 'Makransky 2019',
      title: 'Adding immersive virtual reality to a science lab simulation causes more presence but less learning (Learning and Instruction)',
      href: 'https://doi.org/10.1016/j.learninstruc.2017.12.007',
    },
    {
      label: 'Radianti 2020',
      title: 'A systematic review of immersive virtual reality applications for higher education (Computers & Education)',
      href: 'https://doi.org/10.1016/j.compedu.2019.103778',
    },
  ],
  // T-106 · comfort as data
  comfort: [
    {
      label: 'Fanger 1970',
      title: 'Thermal Comfort: analysis and applications in environmental engineering (Internet Archive)',
      href: 'https://archive.org/details/thermalcomfortan0000fang',
    },
    {
      label: 'de Dear & Brager 2002',
      title: 'Thermal comfort in naturally ventilated buildings: revisions to ASHRAE Standard 55 (Energy and Buildings)',
      href: 'https://doi.org/10.1016/S0378-7788(02)00005-1',
    },
    {
      label: 'Torresin 2018',
      title: 'Combined effects of environmental factors on human perception and objective performance: a review of experimental laboratory works (Indoor Air)',
      href: 'https://doi.org/10.1111/ina.12457',
    },
  ],
  // T-107 · drawing as interface
  drawiface: [
    {
      label: 'Goldschmidt 1991',
      title: 'The dialectics of sketching (Creativity Research Journal)',
      href: 'https://doi.org/10.1080/10400419109534381',
    },
    {
      label: 'Schön 1983',
      title: 'The Reflective Practitioner: how professionals think in action (Internet Archive)',
      href: 'https://archive.org/details/reflectivepracti0000scho',
    },
  ],
  // T-108 · evolutionary search
  evosearch: [
    {
      label: 'Holland 1975',
      title: 'Adaptation in Natural and Artificial Systems (Internet Archive)',
      href: 'https://archive.org/details/adaptationinnatu0000holl',
    },
    {
      label: 'Rutten 2013',
      title: 'Galapagos: on the logic and limitations of generic solvers (Architectural Design)',
      href: 'https://doi.org/10.1002/ad.1568',
    },
    {
      label: 'Deb 2002',
      title: 'A fast and elitist multiobjective genetic algorithm: NSGA-II (IEEE Transactions on Evolutionary Computation)',
      href: 'https://doi.org/10.1109/4235.996017',
    },
  ],
  // T-109 · heritage meets new tech
  heritage: [
    {
      label: 'Otto 1973',
      title: 'Tensile Structures: design, structure, and calculation of buildings of cables, nets, and membranes (Internet Archive)',
      href: 'https://archive.org/details/tensilestructure0000otto',
    },
    {
      label: 'Herzog 1976',
      title: 'Pneumatic Structures: a handbook of inflatable architecture (Internet Archive)',
      href: 'https://archive.org/details/pneumaticstructu0000herz',
    },
  ],
  // T-110 · buildings that respond
  respond: [
    {
      label: 'Negroponte 1975',
      title: 'Soft Architecture Machines (MIT Press, on the Internet Archive)',
      href: 'https://archive.org/details/mit_press_book_9780262367837',
    },
    {
      label: 'Sternberg 2009',
      title: 'Healing Spaces: the science of place and well-being (Internet Archive)',
      href: 'https://archive.org/details/healingspacessci0000ster',
    },
  ],
  // T-114 · adjacency is not access
  adjacency: [
    {
      label: 'Hillier & Hanson 1984',
      title: 'The Social Logic of Space (Cambridge University Press)',
      href: 'https://doi.org/10.1017/CBO9780511597237',
    },
    {
      label: 'Benedikt 1979',
      title: 'To take hold of space: isovists and isovist fields (Environment and Planning B)',
      href: 'https://doi.org/10.1068/b060047',
    },
    {
      label: 'Turner 2001',
      title: 'From isovists to visibility graphs: a methodology for the analysis of architectural space (Environment and Planning B)',
      href: 'https://doi.org/10.1068/b2684',
    },
  ],
  // T-115 · experiences are data
  learning: [
    {
      label: 'LeCun 2015',
      title: 'Deep learning (LeCun, Bengio & Hinton, Nature)',
      href: 'https://doi.org/10.1038/nature14539',
    },
    ULRICH_1984,
  ],
  // T-116 · what an llm actually is
  llm: [
    {
      label: 'Vaswani 2017',
      title: 'Attention is all you need (arXiv)',
      href: 'https://arxiv.org/abs/1706.03762',
    },
    {
      label: 'Brown 2020',
      title: 'Language models are few-shot learners (arXiv)',
      href: 'https://arxiv.org/abs/2005.14165',
    },
    {
      label: 'Wei 2022',
      title: 'Emergent abilities of large language models (arXiv)',
      href: 'https://arxiv.org/abs/2206.07682',
    },
    {
      label: 'Schaeffer 2023',
      title: 'Are emergent abilities of large language models a mirage? (arXiv)',
      href: 'https://arxiv.org/abs/2304.15004',
    },
  ],
  // T-117 · latent space
  latent: [
    {
      label: 'Mikolov 2013',
      title: 'Efficient estimation of word representations in vector space (arXiv)',
      href: 'https://arxiv.org/abs/1301.3781',
    },
    {
      label: 'Kingma & Welling 2013',
      title: 'Auto-encoding variational Bayes (arXiv)',
      href: 'https://arxiv.org/abs/1312.6114',
    },
    {
      label: 'Bengio 2013',
      title: 'Representation learning: a review and new perspectives (Bengio, Courville & Vincent, IEEE TPAMI)',
      href: 'https://doi.org/10.1109/TPAMI.2013.50',
    },
  ],
  // T-118 · when the tool scores people
  scoring: [
    {
      label: "O'Neil 2016",
      title: 'Weapons of Math Destruction: how big data increases inequality and threatens democracy (Internet Archive)',
      href: 'https://archive.org/details/weaponsofmathdes0000onei_u8q4',
    },
    {
      label: 'Campbell 1979',
      title: 'Assessing the impact of planned social change (Evaluation and Program Planning)',
      href: 'https://doi.org/10.1016/0149-7189(79)90048-X',
    },
  ],
  // T-119 · computation
  rules: [
    {
      label: 'Terzidis 2006',
      title: 'Algorithmic Architecture (Internet Archive)',
      href: 'https://archive.org/details/algorithmicarchi0000terz',
    },
  ],
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
  ],
  // T-121 · where the plant is
  plant: [
    {
      label: 'Leitereg 1971',
      title: 'Chemical and sensory data supporting the difference between the odors of the enantiomeric carvones (Journal of Agricultural and Food Chemistry)',
      href: 'https://doi.org/10.1021/jf60176a035',
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
