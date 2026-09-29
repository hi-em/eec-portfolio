// THE /thoughts VISUAL LAB (branch thoughts-lab, 2026-09-29). Reached ONLY by
// `?lab=a|b|c`: never linked, never prerendered (NeuralWorld mounts it behind
// PRERENDERING and reduced motion), loaded as its own chunk.
//
// ONE RULE MAKES IT PHONE-SAFE. Every new motion is drawn on ONE canvas UNDER
// the SVG, reading the engine's own energies (NodeHandle.E, ConnHandle.E). It
// writes no style to any SVG element, so the lit-mark cliff (inline styles into
// ~1559 elements) cannot grow; the SVG keeps the labels, focus and a11y.
//
//   a · SIGNAL  impulses travel every drawn thread older to newer; the
//               near-miss arms carry a signal to the brink and it dies there.
//   b · STRAIN  growth cones: the near-miss arms reach toward each other and
//               pull back, never closing; awake somas breathe a membrane.
//   c · DEPTH   a neuropil at two depths behind the map, denser where the
//               record is dense, moving slower than the map, bending to attention.
import { WORLD } from '../worldGraph'
import { LENSES } from '../../../components/Lens'
import type { ConnHandle, NodeHandle } from '../useProximityEngine'

export type LabKind = 'a' | 'b' | 'c'
export interface LabEnv {
  stage: HTMLElement
  svg: SVGSVGElement
  nodes: Map<string, NodeHandle>
  conns: Map<string, ConnHandle>
  vertical: boolean
}

const ease = (e: number) => e * e * (3 - 2 * e)
const VVIEW = 860

/** A path, sampled once into world-space points (every ~5 units). */
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
  const sample = (d: string, step = 5): Poly => {
    p.setAttribute('d', d)
    const len = p.getTotalLength()
    const n = Math.max(2, Math.ceil(len / step) + 1)
    const pts = new Float32Array(n * 2)
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
    for (let i = 0; i < n; i++) {
      const q = p.getPointAtLength((i / (n - 1)) * len)
      pts[i * 2] = q.x
      pts[i * 2 + 1] = q.y
      if (q.x < x0) x0 = q.x
      if (q.x > x1) x1 = q.x
      if (q.y < y0) y0 = q.y
      if (q.y > y1) y1 = q.y
    }
    return { pts, len, x0, y0, x1, y1 }
  }
  return { sample, done: () => host.remove() }
}

/** CSS colour (tokens, light-dark()) to a canvas colour, resolved once. */
function resolver() {
  const probe = document.createElement('span')
  probe.style.display = 'none'
  document.body.appendChild(probe)
  const cache = new Map<string, string>()
  const get = (css: string) => {
    let v = cache.get(css)
    if (!v) {
      probe.style.color = css
      v = getComputedStyle(probe).color
      cache.set(css, v)
    }
    return v
  }
  return { get, done: () => probe.remove() }
}

const withA = (rgb: string, a: number) => {
  const m = rgb.match(/[\d.]+/g) ?? ['0', '0', '0']
  return `rgba(${m[0]},${m[1]},${m[2]},${a.toFixed(3)})`
}

export function startLab(kind: LabKind, env: LabEnv): () => void {
  const { stage, svg, nodes, conns, vertical } = env
  const S = sampler()
  const C = resolver()
  const ink = C.get('var(--lang-ink)')
  const muted = C.get('var(--lang-ink-muted)')

  // ---- the canvas: fixed over the stage's own rect, one layer UNDER it ----
  const cv = document.createElement('canvas')
  cv.setAttribute('aria-hidden', 'true')
  cv.className = 'nw-lab'
  stage.parentElement!.insertBefore(cv, stage)
  stage.classList.add('has-lab')
  // the stage paints the ground itself (a utility class), so it goes clear here
  stage.style.backgroundColor = 'transparent'
  const ctx = cv.getContext('2d')!
  const coarse = matchMedia('(pointer: coarse)').matches
  const dpr = Math.min(devicePixelRatio || 1, coarse ? 2 : 2)

  // ---- cached geometry (the engine's rule: no per-frame layout reads) ----
  let W = 0, H = 0, left = 0, top = 0, offX = 0, offY = 0, scale = 1
  let sl = stage.scrollLeft, st = stage.scrollTop
  const measure = () => {
    const r = stage.getBoundingClientRect()
    const b = svg.getBoundingClientRect()
    sl = stage.scrollLeft
    st = stage.scrollTop
    W = r.width
    H = r.height
    left = r.left
    top = r.top
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

  // ---- the world, sampled once ----
  const nodeBy = new Map(WORLD.nodes.map((n) => [n.id, n]))
  const links = WORLD.links.map((l) => {
    const key = `${l.a}>${l.b}`
    const lens = l.lens ? LENSES[l.lens].accent : 'var(--lang-ink)'
    return { key, a: l.a, b: l.b, poly: S.sample(l.pulseD, 4), col: C.get(lens) }
  })
  const reaches = WORLD.reaches.map((r) => ({
    a: r.a,
    b: r.b,
    gap: r.gap,
    armA: S.sample(r.armA[0]!.d, 3),
    armB: S.sample(r.armB[0]!.d, 3),
    wA: r.armA[0]!.w,
    wB: r.armB[0]!.w,
  }))
  S.done()
  C.done()

  const at = (p: Poly, t: number): [number, number] => {
    const n = p.pts.length / 2
    const f = Math.max(0, Math.min(1, t)) * (n - 1)
    const i = Math.min(n - 2, Math.floor(f))
    const k = f - i
    const q = p.pts
    return [q[i * 2]! + (q[i * 2 + 2]! - q[i * 2]!) * k, q[i * 2 + 1]! + (q[i * 2 + 3]! - q[i * 2 + 1]!) * k]
  }
  /** stroke the stretch of a polyline between t0 and t1 */
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

  // ---- c · the neuropil, seeded from the record's own density ----
  type Strand = { pts: number[]; depth: number; a: number; x0: number; y0: number; x1: number; y1: number }
  const strands: Strand[] = []
  if (kind === 'c') {
    let s = 7
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647)
    const gauss = () => (rnd() + rnd() + rnd() - 1.5) * 1.15
    const src = WORLD.nodes.filter((n) => n.kind !== 'milestone')
    const N = coarse ? 240 : 380
    for (let i = 0; i < N; i++) {
      const n = src[Math.floor(rnd() * src.length)]!
      const depth = rnd() < 0.5 ? 0.55 : 0.8
      let x = n.x + gauss() * 260
      let y = n.y + gauss() * 150
      let ang = rnd() * Math.PI * 2
      const pts = [x, y]
      const segs = 5 + Math.floor(rnd() * 4)
      for (let k = 0; k < segs; k++) {
        ang += (rnd() - 0.5) * 0.9
        const L = 22 + rnd() * 30
        x += Math.cos(ang) * L
        y += Math.sin(ang) * L * 0.6
        pts.push(x, y)
      }
      const xs = pts.filter((_, j) => j % 2 === 0), ys = pts.filter((_, j) => j % 2 === 1)
      strands.push({ pts, depth, a: 0.05 + rnd() * 0.07, x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) })
    }
  }

  // ---- effects ----
  const ripples: { x: number; y: number; r: number; t0: number }[] = []
  const lastPhase = new Map<string, number>()
  let pointer: { x: number; y: number } | null = null

  // ---- the loop: runs only while something is awake, like the engine ----
  let raf = 0
  let running = false
  let quietSince = 0
  function wake() {
    if (running || document.hidden) return
    running = true
    quietSince = 0
    raf = requestAnimationFrame(frame)
  }

  function frame(now: number) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, W, H)
    const folded = stage.classList.contains('is-folded')
    let busy = false
    if (!folded) {
      if (kind === 'a') busy = drawSignal(now)
      else if (kind === 'b') busy = drawStrain(now)
      else busy = drawDepth(now)
    }
    if (busy) quietSince = 0
    else if (!quietSince) quietSince = now
    if (!busy && now - quietSince > 400) {
      running = false
      return
    }
    raf = requestAnimationFrame(frame)
  }

  // a · SIGNAL -------------------------------------------------------------
  const SPEED = 0.22 // world units per ms
  function drawSignal(now: number): boolean {
    let busy = false
    ctx.lineCap = 'round'
    for (const l of links) {
      const c = conns.get(l.key)
      if (!c || c.E < 0.82) continue
      busy = true
      if (!onScreen(l.poly)) continue
      const k = ease((c.E - 0.82) / 0.18)
      // a train, spaced ~260 units, all forward (older a -> newer b)
      const count = Math.max(1, Math.round(l.poly.len / 260))
      const period = l.poly.len / SPEED
      const base = (now % period) / period
      const prev = lastPhase.get(l.key) ?? base
      if (base < prev) {
        const nb = nodeBy.get(l.b)
        if (nb) ripples.push({ x: nb.x, y: nb.y, r: nb.style.r, t0: now })
      }
      lastPhase.set(l.key, base)
      const tail = Math.min(0.35, 34 / l.poly.len)
      for (let i = 0; i < count; i++) {
        const t = (base + i / count) % 1
        // the comet: three strokes, wider and denser toward the head
        for (let s = 0; s < 3; s++) {
          ctx.beginPath()
          stretch(l.poly, Math.max(0, t - tail * (1 - s / 3)), t)
          ctx.strokeStyle = withA(l.col, (0.25 + s * 0.3) * k)
          ctx.lineWidth = 1 + s * 0.9
          ctx.stroke()
        }
      }
    }
    // the near-miss arms: a signal to the brink, dying before the gap
    for (const r of reaches) {
      const na = nodes.get(r.a), nb = nodes.get(r.b)
      const e = Math.max(na?.E ?? 0, nb?.E ?? 0)
      if (e < 0.05) continue
      busy = true
      for (const arm of [r.armA, r.armB]) {
        if (!onScreen(arm)) continue
        const t = ((now % 1400) / 1400)
        const fade = t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3
        ctx.beginPath()
        stretch(arm, Math.max(0, t - 0.3), t * 0.94)
        ctx.strokeStyle = withA(muted, 0.75 * ease(e) * fade)
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
      ctx.arc(sx(rp.x, rp.y), sy(rp.x, rp.y), (rp.r + 3 + age * 14) * scale * (vertical ? 1.3 : 1), 0, Math.PI * 2)
      ctx.strokeStyle = withA(ink, 0.45 * (1 - age))
      ctx.lineWidth = 1
      ctx.stroke()
    }
    return busy
  }

  // b · STRAIN -------------------------------------------------------------
  function drawStrain(now: number): boolean {
    let busy = false
    ctx.lineCap = 'round'
    for (const r of reaches) {
      const na = nodes.get(r.a), nb = nodes.get(r.b)
      const e = Math.max(na?.E ?? 0, nb?.E ?? 0)
      if (e < 0.04) continue
      busy = true
      if (!onScreen(r.armA, 120) && !onScreen(r.armB, 120)) continue
      const [ax, ay] = at(r.armA, 1)
      const [bx, by] = at(r.armB, 1)
      const dx = bx - ax, dy = by - ay
      const d = Math.hypot(dx, dy) || 1
      const ux = dx / d, uy = dy / d
      // each side closes at most 38%: the gap left is never under 24%
      const cyc = 0.5 - 0.5 * Math.cos((now / 2600) * Math.PI * 2 + (r.gap % 7))
      const reach = Math.min(d * 0.38, 72) * ease(cyc) * ease(e)
      const strain = cyc > 0.8 ? (cyc - 0.8) / 0.2 : 0
      for (const [sx0, sy0, sgn, w] of [[ax, ay, 1, r.wA], [bx, by, -1, r.wB]] as const) {
        const tx = sx0 + ux * sgn * reach
        const ty = sy0 + uy * sgn * reach
        // the tremor at full stretch: a hair perpendicular, never forward
        const jit = strain * Math.sin(now / 38 + sgn) * 0.9
        const px = -uy * jit, py = ux * jit
        ctx.beginPath()
        ctx.moveTo(sx(sx0, sy0), sy(sx0, sy0))
        ctx.lineTo(sx(tx, ty) + px, sy(tx, ty) + py)
        ctx.strokeStyle = withA(ink, 0.7 * ease(e))
        ctx.lineWidth = Math.max(1.4, w * scale)
        ctx.stroke()
        // the growth cone: two filopodia splaying as it strains
        const spread = 0.35 + 0.35 * strain
        for (const s of [-1, 1]) {
          const ang = Math.atan2(uy * sgn, ux * sgn) + s * spread
          const L = 13 + 7 * strain
          ctx.beginPath()
          ctx.moveTo(sx(tx, ty) + px, sy(tx, ty) + py)
          const fx = tx + Math.cos(ang) * L, fy = ty + Math.sin(ang) * L
          ctx.lineTo(sx(fx, fy) + px, sy(fx, fy) + py)
          ctx.lineWidth = 1.2
          ctx.stroke()
        }
      }
    }
    // the membrane: awake somas breathe, each at its own phase
    nodes.forEach((n) => {
      if (n.kind === 'milestone' || n.E < 0.05) return
      busy = true
      const X = sx(n.x, n.y), Y = sy(n.x, n.y)
      if (X < -30 || X > W + 30 || Y < -30 || Y > H + 30) return
      const node = nodeBy.get(n.id)
      const r0 = (node?.style.r ?? 6) * scale * (vertical ? 1.3 : 1)
      const br = 0.5 + 0.5 * Math.sin(now / 820 + (n.x % 11))
      ctx.beginPath()
      ctx.arc(X, Y, r0 + 3 + br * 3, 0, Math.PI * 2)
      ctx.strokeStyle = withA(ink, (0.18 + 0.2 * br) * ease(n.E))
      ctx.lineWidth = 1
      ctx.stroke()
    })
    return busy
  }

  // c · DEPTH --------------------------------------------------------------
  let depthDirty = true
  function drawDepth(_now: number): boolean {
    // parallax: a strand at depth k sees only k of the scroll
    const px = pointer
    let held: NodeHandle | null = null
    nodes.forEach((n) => {
      if (n.forceT > 0.5 && (!held || n.E > held.E)) held = n
    })
    const h = held as NodeHandle | null
    const hx = h ? sx(h.x, h.y) : 0, hy = h ? sy(h.x, h.y) : 0
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    for (const s of strands) {
      // a plane at depth d is the world scaled by d about the frame's centre:
      // the time at the centre lines up, the plane moves d of the scroll, and
      // it draws smaller, which is the depth cue itself
      const d = s.depth
      const PX = (X: number) => (vertical ? W / 2 + (X - W / 2) * (0.6 + 0.4 * d) : W / 2 + (X - W / 2) * d)
      const PY = (Y: number) => (vertical ? H / 2 + (Y - H / 2) * d : H / 2 + (Y - H / 2) * (0.6 + 0.4 * d))
      const X0 = PX(Math.min(sx(s.x0, s.y0), sx(s.x1, s.y1)))
      const X1 = PX(Math.max(sx(s.x0, s.y0), sx(s.x1, s.y1)))
      const Y0 = PY(Math.min(sy(s.x0, s.y0), sy(s.x1, s.y1)))
      const Y1 = PY(Math.max(sy(s.x0, s.y0), sy(s.x1, s.y1)))
      if (X1 < -20 || X0 > W + 20 || Y1 < -20 || Y0 > H + 20) continue
      let lift = 0
      ctx.beginPath()
      for (let j = 0; j < s.pts.length; j += 2) {
        let X = PX(sx(s.pts[j]!, s.pts[j + 1]!))
        let Y = PY(sy(s.pts[j]!, s.pts[j + 1]!))
        // attention bends the field toward it (pointer or the held mark)
        const wells: [number, number, number][] = []
        if (px) wells.push([px.x, px.y, 150])
        if (h) wells.push([hx, hy, 220])
        for (const [ax, ay, R] of wells) {
          const dx = ax - X, dy = ay - Y
          const d = Math.hypot(dx, dy)
          if (d < R) {
            const k = ease(1 - d / R)
            X += dx * 0.18 * k
            Y += dy * 0.18 * k
            lift = Math.max(lift, k)
          }
        }
        if (j === 0) ctx.moveTo(X, Y)
        else ctx.lineTo(X, Y)
      }
      ctx.strokeStyle = withA(ink, s.a * (s.depth > 0.7 ? 1 : 0.7) + lift * 0.14)
      ctx.lineWidth = s.depth > 0.7 ? 1 : 0.7
      ctx.stroke()
    }
    const busy = depthDirty || !!h
    depthDirty = false
    return busy
  }

  // ---- input ----
  const onScroll = () => {
    sl = stage.scrollLeft
    st = stage.scrollTop
    depthDirty = true
    wake()
  }
  const onMove = (e: PointerEvent) => {
    pointer = { x: e.clientX - left, y: e.clientY - top }
    depthDirty = true
    wake()
  }
  const onAny = () => {
    depthDirty = true
    wake()
  }
  const onVis = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf)
      running = false
    } else wake()
  }
  stage.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onAny, { passive: true })
  window.addEventListener('keydown', onAny)
  window.addEventListener('focusin', onAny)
  document.addEventListener('visibilitychange', onVis)
  const ro = new ResizeObserver(measure)
  ro.observe(stage)
  ro.observe(svg)
  measure()
  // the engine's energies move without input (arrival sweep, a held mark):
  // a slow heartbeat re-wakes the layer when the engine is awake and it is not
  const beat = window.setInterval(() => {
    if (running) return
    for (const c of conns.values()) if (c.E > 0.05) return wake()
    for (const n of nodes.values()) if (n.E > 0.05) return wake()
  }, 250)

  return () => {
    cancelAnimationFrame(raf)
    window.clearInterval(beat)
    ro.disconnect()
    stage.removeEventListener('scroll', onScroll)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerdown', onAny)
    window.removeEventListener('keydown', onAny)
    window.removeEventListener('focusin', onAny)
    document.removeEventListener('visibilitychange', onVis)
    stage.classList.remove('has-lab')
    stage.style.backgroundColor = ''
    cv.remove()
  }
}
