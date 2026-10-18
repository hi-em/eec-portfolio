// THE ORGANISM (flow lab, 2026-10-18, UNSIGNED). Born as direction d's canvas
// stand-in; round 2 (her ruling: "less gimmicky, more professional") gave every
// motion ONE fact from the data, so nothing moves just to move:
//
//   BREATH = HOW RECENT. A soma breathes in proportion to its place in time:
//     the newest marks breathe, 2020 rests. The growth sits where the mind is.
//   SPIKE = A REAL THREAD. A dot travels a signed link from its first end to
//     its second (the tuple's fire direction) and the thread is never drawn:
//     the resting map stays a constellation (her 2026-08-08 ruling).
//   RATE = STRENGTH. Her hand-set 1-3 weights how often a thread fires.
//   A SPIKE THAT DIES AT A GAP = A NEAR MISS. Now and then one runs out along
//     a near-miss arm and fades before the brink: close, not yet.
//   QUIET WHEN YOU ENGAGE. Hovering, holding or choosing stops new spikes.
//
// WIRED (her pick T2): nothing moves; every thread is drawn once, faintly, as
// structure, and redrawn only when the map moves. Reduced motion lands here.
//
// One canvas UNDER the drawing, zero SVG style writes. A phone runs at most
// three spikes and four breaths at once (the map's own budget).
import { WORLD } from './worldGraph'
import { LENSES } from '../../components/Lens'
import type { NodeHandle } from './useProximityEngine'

type Poly = { pts: Float32Array; len: number }
const VVIEW = 860
const ease = (e: number) => e * e * (3 - 2 * e)

function resolve(css: string, probe: HTMLElement) {
  probe.style.color = css
  const m = getComputedStyle(probe).color.match(/[\d.]+/g) ?? ['0', '0', '0']
  return `${m[0]},${m[1]},${m[2]}`
}
const rgba = (rgb: string, a: number) => `rgba(${rgb},${Math.max(0, a).toFixed(3)})`

export interface OrganismApi {
  stop: () => void
  setMode: (m: 'living' | 'wired') => void
}

export function startOrganism(env: {
  stage: HTMLElement
  svg: SVGSVGElement
  nodes: Map<string, NodeHandle>
  vertical: boolean
  quiet?: () => boolean
  /** false while the map is not the page (a project opens as an overlay with
   *  the map still mounted underneath it): nothing is drawn, nothing spins */
  active?: () => boolean
  mode?: 'living' | 'wired'
  prm?: boolean
}): OrganismApi {
  const { stage, svg, vertical } = env
  const quiet = env.quiet ?? (() => false)
  const active = env.active ?? (() => true)
  let mode: 'living' | 'wired' = env.prm ? 'wired' : (env.mode ?? 'living')
  const cv = document.createElement('canvas')
  cv.setAttribute('aria-hidden', 'true')
  cv.className = 'nw-signal nw-organism'
  stage.parentElement!.insertBefore(cv, stage)
  const ctx = cv.getContext('2d')!
  const dpr = Math.min(devicePixelRatio || 1, 2)
  const coarse = matchMedia('(pointer: coarse)').matches
  const MAX_SPIKES = coarse ? 3 : 6
  const BREATHE = coarse ? 4 : 14
  const LAUNCH = coarse ? 1100 : 520
  const MISS_EVERY = coarse ? 7000 : 4200

  // colours
  const probe = document.createElement('span')
  probe.style.display = 'none'
  document.body.appendChild(probe)
  let ink = '', muted = ''
  let linkCol: string[] = []
  const paint = () => {
    ink = resolve('var(--lang-ink)', probe)
    muted = resolve('var(--lang-ink-muted)', probe)
    // C2 (her pick, 2026-10-18): a signal keeps its thread's lens colour,
    // EXCEPT practice, whose magenta two of five blind readers took for the
    // map's one red, "live". Practice signals travel in ink.
    linkCol = WORLD.links.map((l) =>
      resolve(l.lens && l.lens !== 'practice' ? LENSES[l.lens].accent : 'var(--lang-ink)', probe),
    )
    if (mode === 'wired') drawWired()
  }

  // geometry (the signal layer's mapping, cached; no per-frame layout reads)
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
    if (mode === 'wired') drawWired()
  }
  const sx = (x: number, y: number) => (vertical ? offX + (WORLD.h - y) * scale : offX - sl + x * scale)
  const sy = (x: number, y: number) => (vertical ? offY - st + (WORLD.w - x) * scale : offY + y * scale)
  const px = (r: number) => (vertical ? r * 0.78 : r * scale)
  const on = (x: number, y: number, pad = 20) => {
    const X = sx(x, y), Y = sy(x, y)
    return X > -pad && X < W + pad && Y > -pad && Y < H + pad
  }
  // world -> canvas as ONE matrix, so a whole thread strokes as a Path2D with
  // no sampling at all (Wired draws all eighty this way)
  const worldMatrix = () => {
    if (vertical) ctx.setTransform(0, -scale * dpr, -scale * dpr, 0, (offX + WORLD.h * scale) * dpr, (offY - st + WORLD.w * scale) * dpr)
    else ctx.setTransform(scale * dpr, 0, 0, scale * dpr, (offX - sl) * dpr, offY * dpr)
  }

  // paths: Path2D for Wired, sampled polylines (lazily) for a travelling dot
  const linkPath = WORLD.links.map((l) => new Path2D(l.pulseD))
  const armPaths = WORLD.reaches.flatMap((r) => [new Path2D(r.armA[0]!.d), new Path2D(r.armB[0]!.d)])
  const host = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  host.setAttribute('width', '0')
  host.setAttribute('height', '0')
  host.style.position = 'absolute'
  host.style.visibility = 'hidden'
  const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  host.appendChild(pathEl)
  document.body.appendChild(host)
  const polys = new Map<string, Poly>()
  const poly = (key: string, d: string): Poly => {
    let p = polys.get(key)
    if (p) return p
    pathEl.setAttribute('d', d)
    const len = pathEl.getTotalLength()
    const n = Math.max(2, Math.ceil(len / 10) + 1)
    const pts = new Float32Array(n * 2)
    for (let k = 0; k < n; k++) {
      const q = pathEl.getPointAtLength((k / (n - 1)) * len)
      pts[k * 2] = q.x
      pts[k * 2 + 1] = q.y
    }
    p = { pts, len }
    polys.set(key, p)
    return p
  }
  const at = (p: Poly, t: number): [number, number] => {
    const n = p.pts.length / 2
    const f = Math.max(0, Math.min(1, t)) * (n - 1)
    const i = Math.min(n - 2, Math.floor(f))
    const k = f - i
    return [p.pts[i * 2]! + (p.pts[i * 2 + 2]! - p.pts[i * 2]!) * k, p.pts[i * 2 + 1]! + (p.pts[i * 2 + 3]! - p.pts[i * 2 + 1]!) * k]
  }

  /** trace the stretch of a sampled thread between t0 and t1 */
  const trace = (p: Poly, t0: number, t1: number) => {
    const n = p.pts.length / 2
    const [ax, ay] = at(p, t0)
    ctx.moveTo(sx(ax, ay), sy(ax, ay))
    for (let i = Math.floor(t0 * (n - 1)) + 1; i < Math.ceil(t1 * (n - 1)); i++) {
      ctx.lineTo(sx(p.pts[i * 2]!, p.pts[i * 2 + 1]!), sy(p.pts[i * 2]!, p.pts[i * 2 + 1]!))
    }
    const [bx, by] = at(p, t1)
    ctx.lineTo(sx(bx, by), sy(bx, by))
  }

  // BREATH = HOW RECENT: rank normalised, cubed, so only the recent end moves
  const ranks = WORLD.nodes.map((n) => n.rank)
  const r0 = Math.min(...ranks), r1 = Math.max(...ranks)
  const recency = new Map(WORLD.nodes.map((n) => [n.id, Math.pow((n.rank - r0) / (r1 - r0 || 1), 3)]))
  const phase = new Map(WORLD.nodes.map((n, i) => [n.id, (i * 2.399) % (Math.PI * 2)]))
  const radius = (n: (typeof WORLD.nodes)[number]) => (n as unknown as { style?: { r: number } }).style?.r ?? 5
  const nodeBy = new Map(WORLD.nodes.map((n) => [n.id, n]))

  type Spike = { key: string; d: string; t0: number; dur: number; to: string | null; col: string; dies: boolean }
  const spikes: Spike[] = []
  const ripples: { x: number; y: number; r: number; t0: number }[] = []
  let lastLaunch = 0
  let lastMiss = 0
  let raf = 0
  let alive = true

  function drawWired() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, cv.width, cv.height)
    if (stage.classList.contains('is-folded')) return
    worldMatrix()
    ctx.lineCap = 'round'
    WORLD.links.forEach((l, i) => {
      ctx.strokeStyle = rgba(ink, 0.1 + 0.05 * l.strength)
      ctx.lineWidth = (0.5 + 0.3 * l.strength) / scale
      ctx.stroke(linkPath[i]!)
    })
    // the near misses: both arms, never dashed (her ruling), never touching
    ctx.strokeStyle = rgba(muted, 0.4)
    ctx.lineWidth = 0.9 / scale
    for (const p of armPaths) ctx.stroke(p)
  }

  let idle = 0
  const frame = (now: number) => {
    if (!alive || mode !== 'living') return
    // UNDER AN OVERLAY THE ORGANISM SLEEPS (pre-ship check 2026-10-19: it
    // kept animating behind /work/:id, a phone's CPU spent on a map nobody
    // could see). It clears once and looks again twice a second, not 60 times.
    if (!active()) {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, cv.width, cv.height)
      spikes.length = 0
      ripples.length = 0
      idle = window.setTimeout(() => {
        if (alive && mode === 'living') raf = requestAnimationFrame(frame)
      }, 500)
      return
    }
    raf = requestAnimationFrame(frame)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, W, H)
    ctx.lineCap = 'round'
    // the chosen rung rests: its camera is not this canvas's mapping
    if (stage.classList.contains('is-folded') || stage.dataset.landing === '1') return
    const hush = quiet()

    // BREATH: the most recent marks on screen, strongest first
    const vis = WORLD.nodes
      .filter((n) => n.id !== 'now' && (recency.get(n.id) ?? 0) > 0.12 && on(n.x, n.y))
      .sort((a, b) => (recency.get(b.id) ?? 0) - (recency.get(a.id) ?? 0))
      .slice(0, BREATHE)
    for (const n of vis) {
      const a = recency.get(n.id) ?? 0
      const s = 0.5 + 0.5 * Math.sin(now / 2400 + phase.get(n.id)!)
      ctx.beginPath()
      ctx.arc(sx(n.x, n.y), sy(n.x, n.y), px(radius(n)) + 2 + 4 * a * s, 0, Math.PI * 2)
      ctx.strokeStyle = rgba(muted, (0.06 + 0.2 * a * s) * (hush ? 0.4 : 1))
      ctx.lineWidth = 0.8
      ctx.stroke()
    }

    // SPIKES: a thread with an end on screen, weighted by her strength
    if (!hush && now - lastLaunch > LAUNCH && spikes.length < MAX_SPIKES) {
      lastLaunch = now
      let total = 0
      const cand: { i: number; w: number }[] = []
      WORLD.links.forEach((l, i) => {
        const A = nodeBy.get(l.a), B = nodeBy.get(l.b)
        const onA = !!A && on(A.x, A.y)
        const onB = !!B && on(B.x, B.y)
        if (onA || onB) {
          // a thread with BOTH ends in view fires three times as often: a
          // signal seen leaving one mark and arriving at another is what says
          // "these connect"; one arriving from off-screen says less
          const w = l.strength * (onA && onB ? 3 : 1)
          cand.push({ i, w })
          total += w
        }
      })
      let pick = Math.random() * total
      for (const c of cand) {
        pick -= c.w
        if (pick <= 0) {
          const l = WORLD.links[c.i]!
          const p = poly(`l${c.i}`, l.pulseD)
          spikes.push({ key: `l${c.i}`, d: l.pulseD, t0: now, dur: Math.max(900, Math.min(3600, p.len / 0.26)), to: l.b, col: linkCol[c.i]!, dies: false })
          break
        }
      }
    }
    // A NEAR MISS: a spike runs out along an arm and dies before the brink
    if (!hush && now - lastMiss > MISS_EVERY && spikes.length < MAX_SPIKES) {
      lastMiss = now
      const near = WORLD.reaches.filter((r) => {
        const A = nodeBy.get(r.a), B = nodeBy.get(r.b)
        return (A && on(A.x, A.y)) || (B && on(B.x, B.y))
      })
      const r = near[Math.floor(Math.random() * near.length)]
      if (r) {
        const fromA = nodeBy.get(r.a) && on(nodeBy.get(r.a)!.x, nodeBy.get(r.a)!.y)
        const d = (fromA ? r.armA : r.armB)[0]!.d
        const key = `r${r.a}|${r.b}|${fromA ? 'a' : 'b'}`
        const p = poly(key, d)
        spikes.push({ key, d, t0: now, dur: Math.max(700, p.len / 0.18), to: null, col: muted, dies: true })
      }
    }
    for (let k = spikes.length - 1; k >= 0; k--) {
      const s = spikes[k]!
      const t = (now - s.t0) / s.dur
      if (t >= 1) {
        const nb = s.to ? nodeBy.get(s.to) : null
        if (nb) ripples.push({ x: nb.x, y: nb.y, r: radius(nb), t0: now })
        spikes.splice(k, 1)
        continue
      }
      const p = poly(s.key, s.d)
      // a dying spike stops at 94% of the arm and fades over its last third
      const tt = s.dies ? t * 0.94 : ease(t)
      const fade = s.dies ? (t < 0.66 ? 1 : 1 - (t - 0.66) / 0.34) : 1
      // A SIGNAL, NOT A SPECK (the final review, 2026-10-18: at 1.9px with a
      // dotted wake, 2 of 5 blind readers took the dots for "loading noise").
      // A 3px head with a short fading trace ALONG ITS OWN THREAD: the eye
      // reads a line being travelled. The trace exists only under the moving
      // head and is gone behind it, so the resting map stays a constellation.
      const T = Math.min(0.4, 170 / p.len)
      ctx.lineWidth = 1.4
      for (let seg = 0; seg < 3; seg++) {
        const a0 = Math.max(0, tt - T + (seg * T) / 3)
        const a1 = Math.max(0, tt - T + ((seg + 1) * T) / 3)
        if (a1 <= a0) continue
        ctx.beginPath()
        trace(p, a0, a1)
        ctx.strokeStyle = rgba(s.col, (0.1 + seg * 0.16) * fade)
        ctx.stroke()
      }
      const [hx, hy] = at(p, tt)
      ctx.beginPath()
      ctx.arc(sx(hx, hy), sy(hx, hy), 3, 0, Math.PI * 2)
      ctx.fillStyle = rgba(s.col, 0.95 * fade)
      ctx.fill()
    }
    for (let k = ripples.length - 1; k >= 0; k--) {
      const rp = ripples[k]!
      const age = (now - rp.t0) / 900
      if (age >= 1) {
        ripples.splice(k, 1)
        continue
      }
      ctx.beginPath()
      ctx.arc(sx(rp.x, rp.y), sy(rp.x, rp.y), px(rp.r) + 3 + age * 12, 0, Math.PI * 2)
      // the landing: a firmer ring, so arriving reads as arriving
      ctx.strokeStyle = rgba(ink, 0.5 * (1 - age))
      ctx.lineWidth = 1.3
      ctx.stroke()
    }
  }

  let wiredRaf = 0
  const onScroll = () => {
    sl = stage.scrollLeft
    st = stage.scrollTop
    if (mode === 'wired') {
      cancelAnimationFrame(wiredRaf)
      wiredRaf = requestAnimationFrame(drawWired)
    }
  }
  const onVis = () => {
    cancelAnimationFrame(raf)
    if (!document.hidden && alive && mode === 'living') raf = requestAnimationFrame(frame)
  }
  // Wired redraws when the stage enters or leaves the chosen rung
  const cls = new MutationObserver(() => mode === 'wired' && drawWired())
  cls.observe(stage, { attributes: true, attributeFilter: ['class'] })
  const theme = new MutationObserver(paint)
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] })
  stage.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('visibilitychange', onVis)
  const ro = new ResizeObserver(measure)
  ro.observe(stage)
  ro.observe(svg)
  paint()
  measure()
  if (mode === 'living') raf = requestAnimationFrame(frame)
  else drawWired()

  return {
    setMode: (m) => {
      if (env.prm) m = 'wired'
      if (m === mode) return
      mode = m
      cancelAnimationFrame(raf)
      window.clearTimeout(idle)
      spikes.length = 0
      ripples.length = 0
      if (mode === 'living') raf = requestAnimationFrame(frame)
      else drawWired()
    },
    stop: () => {
      alive = false
      cancelAnimationFrame(raf)
      window.clearTimeout(idle)
      cancelAnimationFrame(wiredRaf)
      ro.disconnect()
      cls.disconnect()
      theme.disconnect()
      stage.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVis)
      cv.remove()
      host.remove()
      probe.remove()
    },
  }
}
