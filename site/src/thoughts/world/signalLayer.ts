// THE SIGNAL LAYER (her pick off the /thoughts lab, 2026-09-29: "A + B's
// cones, but the cones very subtle"). Two motions, and both say something
// the still map already says, only in time:
//
//   THE SIGNAL. Every thread that is drawn carries impulses, older to newer
//   (all forward), in its lens accent (the colour the thread's own pulse fires
//   in, never the live red). A near-miss arm carries one too, and it dies at
//   the arm's tip: the signal reaches the brink and nothing is there to take it.
//   Arriving at the newer mark, it leaves a thin ring.
//   THE GROWTH CONES. The two arms of a near-miss reach toward each other and
//   pull back, a stem and two splayed filopodia, very faint. `coneAt` bounds
//   them so a fifth of every gap is always empty paper (signalLayer.test.ts):
//   close, and never touching.
//
// ⚠ WHY A CANVAS, AND WHY UNDER. The phone's cliff is how many marks are lit
// at once, each writing inline styles into ~1559 SVG elements. This layer
// writes NO style to any SVG element: it reads the engine's own energies
// (NodeHandle.E, ConnHandle.E) and draws on one canvas beneath the drawing, so
// the SVG keeps the names, focus, a11y and the prerender untouched. Measured
// on the production build at 390x844 with the CPU throttled 4x, it holds the
// baseline (the numbers are in the commit).
//
// It is never prerendered, never loaded under reduced motion (NeuralWorld
// gates both), lives in its own chunk, and rests in the chosen rung, where the
// fold's own pulse already names the subject.
import { WORLD } from './worldGraph'
import { LENSES } from '../../components/Lens'
import type { ConnHandle, NodeHandle } from './useProximityEngine'

export interface SignalEnv {
  stage: HTMLElement
  svg: SVGSVGElement
  nodes: Map<string, NodeHandle>
  conns: Map<string, ConnHandle>
  vertical: boolean
}

const ease = (e: number) => e * e * (3 - 2 * e)
const VVIEW = 860
/** A near-miss answers only a mark that is truly awake (hovered, held, the
 *  button's full sweep). The arrival wave peaks at 0.75 and never reaches it,
 *  so the door stays the constellation she ruled, and the phone pays nothing
 *  for this layer during the one sweep it cannot skip. Threads use the
 *  synapse's own 0.82 for the same reason. */
const AWAKE = 0.8
const DRAWN = 0.82

/** THE GAP NEVER CLOSES. One growth cone's extent toward the other across a
 *  tip-to-tip distance d: the stem's reach (k is its phase x wake, 0-1), then
 *  two filopodia splayed at least 0.9 rad off the forward line. Whatever the
 *  phase, both cones together stay under 80% of d, so at least a fifth of the
 *  gap is always empty paper. Kept small on purpose: her dial was "very
 *  subtle". */
export function coneAt(d: number, k: number, strain: number) {
  const spread = 0.9 + 0.3 * strain
  const L = Math.min(7 + 3 * strain, 0.2 * d)
  const fwd = L * Math.cos(0.9) // the widest forward reach a filopodium has
  const reach = Math.max(0, Math.min(34, (0.8 * d - 2 * fwd) / 2)) * Math.max(0, Math.min(1, k))
  return { reach, L, spread, fwd: L * Math.cos(spread) }
}

/** A path, sampled once into world-space points. */
type Poly = { pts: Float32Array; len: number; x0: number; y0: number; x1: number; y1: number }
function sampler() {
  const host = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  host.setAttribute('width', '0')
  host.setAttribute('height', '0')
  host.style.position = 'absolute'
  host.style.visibility = 'hidden'
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  host.appendChild(p)
  document.body.appendChild(host)
  const sample = (d: string, step: number): Poly => {
    p.setAttribute('d', d)
    const len = p.getTotalLength()
    const n = Math.max(2, Math.ceil(len / step) + 1)
    const pts = new Float32Array(n * 2)
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
    for (let i = 0; i < n; i++) {
      const q = p.getPointAtLength((i / (n - 1)) * len)
      pts[i * 2] = q.x
      pts[i * 2 + 1] = q.y
      x0 = Math.min(x0, q.x)
      x1 = Math.max(x1, q.x)
      y0 = Math.min(y0, q.y)
      y1 = Math.max(y1, q.y)
    }
    return { pts, len, x0, y0, x1, y1 }
  }
  return { sample, done: () => host.remove() }
}

/** A CSS colour (a token, a light-dark() pair) as the canvas's rgb. Resolved
 *  on start and again when the theme flips. */
function resolve(css: string, probe: HTMLElement) {
  probe.style.color = css
  const m = getComputedStyle(probe).color.match(/[\d.]+/g) ?? ['0', '0', '0']
  return `${m[0]},${m[1]},${m[2]}`
}
const rgba = (rgb: string, a: number) => `rgba(${rgb},${a.toFixed(3)})`

export function startSignal(env: SignalEnv): () => void {
  const { stage, svg, nodes, conns, vertical } = env

  // ---- the canvas: fixed on the stage's own rect, one layer UNDER it ----
  // ⚠ MOUNTED ONLY WHILE SOMETHING IS DRAWN. The stage paints the ground
  // itself, and it has to go clear for a canvas beneath it to show; measured
  // on the phone, a clear full-screen scroller over a canvas cost fps on the
  // arrival sweep even with nothing drawn on it. So at rest, and through every
  // sweep a phone does not draw, the canvas is not in the page at all and the
  // map is exactly what it was.
  const cv = document.createElement('canvas')
  cv.setAttribute('aria-hidden', 'true')
  cv.className = 'nw-signal'
  let mounted = false
  let unmountTimer = 0
  const mount = () => {
    window.clearTimeout(unmountTimer)
    if (mounted) return
    mounted = true
    stage.parentElement!.insertBefore(cv, stage)
    stage.style.backgroundColor = 'transparent'
    measure()
  }
  const unmount = () => {
    if (!mounted) return
    mounted = false
    cv.remove()
    stage.style.backgroundColor = ''
  }
  const ctx = cv.getContext('2d')!
  const dpr = Math.min(devicePixelRatio || 1, 2)
  // THE PHONE'S BUDGET. WATCH IT GROW lights every thread at once, which is
  // this layer's worst case: on a coarse pointer an impulse is one stroke, not
  // three, and a frame draws at most 60 of them.
  const coarse = matchMedia('(pointer: coarse)').matches
  const STROKES = coarse ? 1 : 3
  const BUDGET = coarse ? 60 : 400
  // AND ON A PHONE IT ANSWERS ONLY WHAT YOU TOUCHED. Measured with every
  // thread lit by WATCH IT GROW (390x844, CPU 4x, 3 runs), the layer still cost
  // ~2.7fps against the map without it, so a phone draws only the threads and
  // near-misses of a mark you are holding. The button's flood stays the SVG's.
  const touched = (id: string) => !coarse || (nodes.get(id)?.forceT ?? 0) > 0.5

  // ---- colours ----
  const probe = document.createElement('span')
  probe.style.display = 'none'
  document.body.appendChild(probe)
  let ink = '', muted = ''
  const linkCss = WORLD.links.map((l) => (l.lens ? LENSES[l.lens].accent : 'var(--lang-ink)'))
  let linkCol: string[] = []
  const paint = () => {
    ink = resolve('var(--lang-ink)', probe)
    muted = resolve('var(--lang-ink-muted)', probe)
    linkCol = linkCss.map((c) => resolve(c, probe))
    wake()
  }
  const theme = new MutationObserver(paint)
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] })
  const scheme = matchMedia('(prefers-color-scheme: dark)')
  scheme.addEventListener('change', paint)

  // ---- cached geometry (the engine's rule: no per-frame layout reads) ----
  let W = 0, H = 0, offX = 0, offY = 0, scale = 1
  let sl = stage.scrollLeft, st = stage.scrollTop
  const measure = () => {
    const r = stage.getBoundingClientRect()
    const b = svg.getBoundingClientRect()
    sl = stage.scrollLeft
    st = stage.scrollTop
    W = r.width
    H = r.height
    offX = b.left - r.left + sl
    offY = b.top - r.top + st
    scale = vertical ? b.width / VVIEW : b.height / WORLD.h
    cv.style.left = `${r.left}px`
    cv.style.top = `${r.top}px`
    cv.style.width = `${W}px`
    cv.style.height = `${H}px`
    cv.width = Math.round(W * dpr)
    cv.height = Math.round(H * dpr)
    wake()
  }
  // world (x, y) -> canvas px. Turned: (x, y) -> (h - y, w - x), as the SVG.
  const sx = (x: number, y: number) => (vertical ? offX + (WORLD.h - y) * scale : offX - sl + x * scale)
  const sy = (x: number, y: number) => (vertical ? offY - st + (WORLD.w - x) * scale : offY + y * scale)
  const onScreen = (p: { x0: number; y0: number; x1: number; y1: number }, pad = 40) => {
    const ax = sx(p.x0, p.y0), bx = sx(p.x1, p.y1), ay = sy(p.x0, p.y0), by = sy(p.x1, p.y1)
    return Math.max(ax, bx) > -pad && Math.min(ax, bx) < W + pad && Math.max(ay, by) > -pad && Math.min(ay, by) < H + pad
  }
  // a soma's drawn radius in canvas px (NeuralWorld's `vr`, turned: r x VTYPE)
  const px = (r: number) => (vertical ? r * 0.78 : r * scale)

  // ---- the world, sampled LAZILY ----
  // ⚠ Sampling every thread up front measured ~1s of blocked main thread at
  // load (getPointAtLength walks the path from its start on every call), and it
  // landed in the middle of the arrival sweep. A thread is sampled the first
  // time it carries a signal, which is the held mark's handful, not all 80.
  const S = sampler()
  const nodeBy = new Map(WORLD.nodes.map((n) => [n.id, n]))
  const lazy = (d: string, step: number) => {
    let p: Poly | null = null
    return () => {
      if (!p) {
        const t0 = performance.now()
        p = S.sample(d, step)
        const w = window as unknown as Record<string, number>
        w.__nwSampleMs = (w.__nwSampleMs ?? 0) + performance.now() - t0
      }
      return p
    }
  }
  const links = WORLD.links.map((l, i) => ({ i, key: `${l.a}>${l.b}`, b: l.b, poly: lazy(l.pulseD, 8) }))
  const reaches = WORLD.reaches.map((r) => ({
    a: r.a,
    b: r.b,
    gap: r.gap,
    phase: r.gap % 7,
    armA: lazy(r.armA[0]!.d, 4),
    armB: lazy(r.armB[0]!.d, 4),
  }))

  const at = (p: Poly, t: number): [number, number] => {
    const n = p.pts.length / 2
    const f = Math.max(0, Math.min(1, t)) * (n - 1)
    const i = Math.min(n - 2, Math.floor(f))
    const k = f - i
    const q = p.pts
    return [q[i * 2]! + (q[i * 2 + 2]! - q[i * 2]!) * k, q[i * 2 + 1]! + (q[i * 2 + 3]! - q[i * 2 + 1]!) * k]
  }
  /** trace the stretch of a polyline between t0 and t1 */
  const stretch = (p: Poly, t0: number, t1: number) => {
    const n = p.pts.length / 2
    const i0 = Math.max(0, Math.floor(t0 * (n - 1)))
    const i1 = Math.min(n - 1, Math.ceil(t1 * (n - 1)))
    const [ax, ay] = at(p, t0)
    ctx.moveTo(sx(ax, ay), sy(ax, ay))
    for (let i = i0 + 1; i < i1; i++) {
      const x = p.pts[i * 2]!, y = p.pts[i * 2 + 1]!
      ctx.lineTo(sx(x, y), sy(x, y))
    }
    const [bx, by] = at(p, t1)
    ctx.lineTo(sx(bx, by), sy(bx, by))
  }

  // ---- the loop: runs only while something is awake, like the engine ----
  const ripples: { x: number; y: number; r: number; t0: number }[] = []
  const lastPhase = new Map<string, number>()
  let raf = 0
  let running = false
  let quietSince = 0
  function wake() {
    if (running || document.hidden) return
    running = true
    quietSince = 0
    raf = requestAnimationFrame(frame)
  }
  let drew = true
  function frame(now: number) {
    if (!mounted) {
      if (!wanted()) {
        running = false
        return
      }
      mount()
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    // an empty canvas is not cleared again: a clear is a full-screen repaint
    if (drew || ripples.length) ctx.clearRect(0, 0, W, H)
    ctx.lineCap = 'round'
    // the chosen rung rests: the fold's own pulse names the subject there
    let busy = false
    if (!stage.classList.contains('is-folded')) {
      const a = drawSignal(now)
      const b = drawCones(now)
      busy = a || b
    }
    drew = busy
    if (busy) quietSince = 0
    else if (!quietSince) quietSince = now
    if (!busy && now - quietSince > 400) {
      running = false
      unmountTimer = window.setTimeout(() => !running && unmount(), 1200)
      return
    }
    raf = requestAnimationFrame(frame)
  }

  // THE SIGNAL ---------------------------------------------------------------
  const SPEED = 0.22 // world units per ms
  function drawSignal(now: number): boolean {
    let busy = false
    let spent = 0
    for (const l of links) {
      const c = conns.get(l.key)
      // only a thread that is DRAWN carries signal: the synapse's own
      // threshold, so a sweep's constellation stays marks without wiring
      if (!c || c.E < DRAWN || !(touched(c.a) || touched(c.b))) continue
      busy = true
      const poly = l.poly()
      if (!onScreen(poly)) continue
      const k = ease((c.E - DRAWN) / (1 - DRAWN))
      const count = Math.max(1, Math.round(poly.len / 260))
      const period = poly.len / SPEED
      const base = (now % period) / period
      const prev = lastPhase.get(l.key) ?? base
      if (base < prev) {
        const nb = nodeBy.get(l.b)
        if (nb) ripples.push({ x: nb.x, y: nb.y, r: nb.style.r, t0: now })
      }
      lastPhase.set(l.key, base)
      const tail = Math.min(0.35, 34 / poly.len)
      const col = linkCol[l.i]!
      for (let i = 0; i < count && spent < BUDGET; i++, spent++) {
        const t = (base + i / count) % 1
        // the impulse: strokes wider and denser toward the head (one, on a phone)
        for (let s = 3 - STROKES; s < 3; s++) {
          ctx.beginPath()
          stretch(poly, Math.max(0, t - tail * (1 - s / 3)), t)
          ctx.strokeStyle = rgba(col, (0.25 + s * 0.3) * k)
          ctx.lineWidth = 1 + s * 0.9
          ctx.stroke()
        }
      }
    }
    // the near-miss arms: a signal to the brink, dying before the gap
    for (const r of reaches) {
      const E = Math.max(nodes.get(r.a)?.E ?? 0, nodes.get(r.b)?.E ?? 0)
      if (E < AWAKE || !(touched(r.a) || touched(r.b))) continue
      busy = true
      const e = (E - AWAKE) / (1 - AWAKE)
      const t = (now % 1400) / 1400
      const fade = t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3
      for (const arm of [r.armA(), r.armB()]) {
        if (!onScreen(arm)) continue
        ctx.beginPath()
        stretch(arm, Math.max(0, t - 0.3), t * 0.94)
        ctx.strokeStyle = rgba(muted, 0.75 * ease(e) * fade)
        ctx.lineWidth = 1.8
        ctx.stroke()
      }
    }
    // arrivals: a thin ring leaves the newer soma
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i]!
      const age = (now - rp.t0) / 750
      if (age >= 1) {
        ripples.splice(i, 1)
        continue
      }
      busy = true
      ctx.beginPath()
      ctx.arc(sx(rp.x, rp.y), sy(rp.x, rp.y), px(rp.r + 3 + age * 14), 0, Math.PI * 2)
      ctx.strokeStyle = rgba(ink, 0.45 * (1 - age))
      ctx.lineWidth = 1
      ctx.stroke()
    }
    return busy
  }

  // THE GROWTH CONES (very subtle) -------------------------------------------
  function drawCones(now: number): boolean {
    let busy = false
    for (const r of reaches) {
      const E = Math.max(nodes.get(r.a)?.E ?? 0, nodes.get(r.b)?.E ?? 0)
      if (E < AWAKE || !(touched(r.a) || touched(r.b))) continue
      busy = true
      const e = (E - AWAKE) / (1 - AWAKE)
      const armA = r.armA(), armB = r.armB()
      if (!onScreen(armA, 80) && !onScreen(armB, 80)) continue
      const [ax, ay] = at(armA, 1)
      const [bx, by] = at(armB, 1)
      const dx = bx - ax, dy = by - ay
      const d = Math.hypot(dx, dy) || 1
      const ux = dx / d, uy = dy / d
      const cyc = 0.5 - 0.5 * Math.cos((now / 3200) * Math.PI * 2 + r.phase)
      const strain = cyc > 0.8 ? (cyc - 0.8) / 0.2 : 0
      // the snapshot's gap is the clear space between the arms, twigs included,
      // so it binds when it is the shorter of the two
      const cone = coneAt(Math.min(d, r.gap), ease(cyc) * ease(e), strain)
      ctx.strokeStyle = rgba(muted, 0.32 * ease(e))
      for (const [x0, y0, sgn] of [[ax, ay, 1], [bx, by, -1]] as const) {
        const tx = x0 + ux * sgn * cone.reach
        const ty = y0 + uy * sgn * cone.reach
        ctx.beginPath()
        ctx.moveTo(sx(x0, y0), sy(x0, y0))
        ctx.lineTo(sx(tx, ty), sy(tx, ty))
        const fwd = Math.atan2(uy * sgn, ux * sgn)
        for (const s of [-1, 1]) {
          const ang = fwd + s * cone.spread
          ctx.moveTo(sx(tx, ty), sy(tx, ty))
          ctx.lineTo(sx(tx + Math.cos(ang) * cone.L, ty + Math.sin(ang) * cone.L), sy(tx + Math.cos(ang) * cone.L, ty + Math.sin(ang) * cone.L))
        }
        ctx.lineWidth = 0.9
        ctx.stroke()
      }
    }
    return busy
  }

  /** Is there anything this layer would draw? The same gates the drawing uses. */
  function wanted(): boolean {
    for (const n of nodes.values()) if (n.E >= AWAKE && touched(n.id)) return true
    if (!coarse) for (const c of conns.values()) if (c.E >= DRAWN) return true
    return false
  }

  // ---- input: the layer wakes with the engine ----
  const onScroll = () => {
    sl = stage.scrollLeft
    st = stage.scrollTop
    // a pan only needs a frame when something is on the canvas to move
    if (drew) wake()
  }
  const onVis = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf)
      running = false
    } else wake()
  }
  stage.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('pointermove', wake, { passive: true })
  window.addEventListener('pointerdown', wake, { passive: true })
  window.addEventListener('keydown', wake)
  window.addEventListener('focusin', wake)
  document.addEventListener('visibilitychange', onVis)
  const ro = new ResizeObserver(measure)
  ro.observe(stage)
  ro.observe(svg)
  paint()
  // The engine's energies also move with no input at all (the arrival sweep,
  // WATCH IT GROW, a deep link's wake), so a slow check re-wakes the layer
  // whenever the engine is awake and the layer is not. Cheap: two map walks,
  // four times a second, and only while idle; it wakes at the same thresholds
  // the drawing uses, so a sweep that lights nothing starts nothing.
  const beat = window.setInterval(() => {
    if (!running && wanted()) wake()
  }, 250)

  return () => {
    cancelAnimationFrame(raf)
    window.clearInterval(beat)
    window.clearTimeout(unmountTimer)
    ro.disconnect()
    theme.disconnect()
    scheme.removeEventListener('change', paint)
    stage.removeEventListener('scroll', onScroll)
    window.removeEventListener('pointermove', wake)
    window.removeEventListener('pointerdown', wake)
    window.removeEventListener('keydown', wake)
    window.removeEventListener('focusin', wake)
    document.removeEventListener('visibilitychange', onVis)
    unmount()
    S.done()
    probe.remove()
  }
}
