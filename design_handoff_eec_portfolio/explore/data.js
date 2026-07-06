// Shared graph for EXPLORE prototypes. Orbs = projects AND thoughts,
// edges = shared themes. Colors: lens wire states only; redline reserved
// for hover/active.

export const LENSES = {
  c: { wire: '#22D3EE', label: 'COMPUTATION & RESEARCH', tick: 'square' },
  p: { wire: '#F472B6', label: 'DESIGN & PRACTICE', tick: 'diamond' },
  e: { wire: '#FACC15', label: 'EXPLORATIONS', tick: 'triangle' },
};

export const REDLINE = '#FF4D6D';
export const EDGE = '#E8EAED';
export const CARBON = '#0B0E13';
export const ANNO = '#8A919C';

// [id, label, kind, lens, tags]
export const RAW = [
  ['sensi', 'SENSI', 'project', 'c', ['neuro', 'comfort', 'ai', 'research']],
  ['neurospace', 'NEUROSPACE', 'project', 'c', ['neuro', 'geometry', 'simulation', 'data', 'web']],
  ['huddle', 'THE HUDDLE', 'project', 'c', ['geometry', 'simulation', 'climate']],
  ['lungs', 'THE LUNGS', 'project', 'c', ['data', 'climate', 'web']],
  ['legoarch', 'LEGOARCH', 'project', 'c', ['ai', 'geometry', 'play']],
  ['ballooning', 'A BALLOONING MARKET', 'project', 'c', ['simulation', 'geometry', 'heritage', 'play']],
  ['podcast', 'OPTIMIZING FOR THE MIND', 'project', 'c', ['neuro', 'ai', 'research', 'future']],
  ['soma', 'TOWERS AT SOMA', 'project', 'p', ['geometry', 'practice', 'heritage']],
  ['mars', 'RING 4000', 'project', 'p', ['ai', 'practice', 'future']],
  ['cappelletti', 'CAPPELLETTI PAVILION', 'project', 'e', ['geometry', 'simulation', 'play', 'research']],
  ['xr', 'XR FOR EDUCATION', 'project', 'e', ['xr', 'research', 'play', 'education']],
  ['bim', 'behavior information modeling', 'thought', 'c', ['neuro', 'data', 'research', 'future']],
  ['neuroaes', 'neuroaesthetics', 'thought', 'c', ['neuro', 'research']],
  ['solvers', 'physics solvers', 'thought', 'e', ['simulation', 'geometry']],
  ['genai', 'generative ai', 'thought', 'c', ['ai', 'play', 'future']],
  ['xreal', 'extended reality', 'thought', 'e', ['xr', 'education', 'future']],
  ['comfort', 'comfort as data', 'thought', 'c', ['comfort', 'neuro', 'data']],
  ['drawiface', 'drawing as interface', 'thought', 'p', ['play', 'practice', 'web']],
  ['evosearch', 'evolutionary search', 'thought', 'e', ['simulation', 'ai']],
  ['heritage', 'heritage meets new tech', 'thought', 'p', ['heritage', 'practice']],
  ['respond', 'buildings that respond', 'thought', 'c', ['neuro', 'future', 'data', 'comfort']],
];

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeGraph() {
  const rnd = mulberry32(20260706);
  const nodes = RAW.map(([id, label, kind, lens, tags], i) => ({
    id, label, kind, lens, tags, i, deg: 0, x: 0, y: 0, z: 0,
    sheet: 'N-' + (101 + i),
  }));
  for (const n of nodes) {
    const u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, r = 90 + rnd() * 30;
    const s = Math.sqrt(1 - u * u);
    n.x = r * s * Math.cos(th); n.y = r * u; n.z = r * s * Math.sin(th);
  }
  const overlap = (a, b) => a.tags.filter((t) => b.tags.includes(t)).length;
  const key = (a, b) => (a < b ? a + '|' + b : b + '|' + a);
  const seen = new Set();
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const w = overlap(nodes[i], nodes[j]);
      if (w >= 2) { edges.push({ a: i, b: j, w, implied: false }); seen.add(key(nodes[i].id, nodes[j].id)); }
    }
  }
  const deg = new Array(nodes.length).fill(0);
  edges.forEach((e) => { deg[e.a]++; deg[e.b]++; });
  nodes.forEach((n, i) => {
    if (deg[i] < 2) {
      const cands = nodes
        .map((m, j) => ({ j, w: i === j ? -1 : overlap(n, m) }))
        .filter((c) => c.w >= 1 && !seen.has(key(n.id, nodes[c.j].id)))
        .sort((a, b) => b.w - a.w);
      for (let k = 0; k < cands.length && deg[i] < 2; k++) {
        edges.push({ a: i, b: cands[k].j, w: 1, implied: true });
        seen.add(key(n.id, nodes[cands[k].j].id));
        deg[i]++; deg[cands[k].j]++;
      }
    }
  });
  // Force relaxation (deterministic)
  for (let it = 0; it < 280; it++) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
        const d2 = dx * dx + dy * dy + dz * dz + 0.01;
        const d = Math.sqrt(d2);
        const f = Math.min(9, 5200 / d2) / d;
        a.x -= dx * f; a.y -= dy * f; a.z -= dz * f;
        b.x += dx * f; b.y += dy * f; b.z += dz * f;
      }
    }
    for (const e of edges) {
      const a = nodes[e.a], b = nodes[e.b];
      const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.01;
      const rest = e.implied ? 70 : 58 - 6 * Math.min(e.w, 3);
      const f = (0.02 * (d - rest)) / d;
      a.x += dx * f; a.y += dy * f; a.z += dz * f;
      b.x -= dx * f; b.y -= dy * f; b.z -= dz * f;
    }
    for (const n of nodes) { n.x *= 0.995; n.y *= 0.995; n.z *= 0.995; }
  }
  const dd = new Array(nodes.length).fill(0);
  edges.forEach((e) => { dd[e.a]++; dd[e.b]++; });
  nodes.forEach((n, i) => { n.deg = dd[i]; });
  return { nodes, edges };
}

export function neighbors(g, i) {
  const s = new Set();
  g.edges.forEach((e) => { if (e.a === i) s.add(e.b); if (e.b === i) s.add(e.a); });
  return s;
}

export const LEGEND_HTML =
  '<span class="li"><svg width="9" height="9" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="#22D3EE"></rect></svg>COMPUTATION &amp; RESEARCH</span>' +
  '<span class="li"><svg width="9" height="9" viewBox="0 0 10 10"><path d="M5 0 L10 5 L5 10 L0 5 Z" fill="#F472B6"></path></svg>DESIGN &amp; PRACTICE</span>' +
  '<span class="li"><svg width="9" height="9" viewBox="0 0 10 10"><path d="M5 0.5 L10 9.5 L0 9.5 Z" fill="#FACC15"></path></svg>EXPLORATIONS</span>';
