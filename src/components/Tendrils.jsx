import { useEffect, useRef } from 'react'

// Gooey ink tendrils between the pointer and the hero CTAs, ported from the
// reference Harsh supplied. The three buttons are treated as ONE element: the
// strands root along the perimeter of `.hero__actions`, not of any single link.
//
// FOUR THINGS IN THE REFERENCE ARE NOT PORTED VERBATIM, each because it would
// break something the rest of the site guarantees:
//
//   1. `cursor: none !important` on `*`. In the demo the page is one button; on
//      a real page that kills the pointer over every link, the nav and the
//      résumé CTA. Here the glove replaces the cursor only inside an activation
//      zone around the buttons, and the system cursor is restored on exit.
//   2. `touch-action: none` on body. That disables scrolling. This whole effect
//      is gated to `(pointer: fine)` instead, so a touch device never loads it.
//   3. A permanently running rAF. The page sits at 10-70ms TBT and a forever
//      loop clearing a fullscreen canvas would spend that budget on an effect
//      nobody is looking at. The loop starts when the pointer enters the zone
//      and stops once the strands have snapped and the last particle has faded.
//   4. The pill geometry. The reference parameterises a capsule because its
//      button is `border-radius: 999px`. Every control here is radius 0, so the
//      perimeter walk below is a rectangle — same arc-length idea, four edges
//      instead of two edges and two caps.
//
// Under `prefers-reduced-motion: reduce` none of this mounts at all. That is
// the stricter reading of the contract than animating instantly: there is no
// content here, so the honest reduced-motion behaviour is absence.

const STRAND_COUNT = 16
const HOVER_PAD = 10 // how close the fingertip must get to grab the goo
const ZONE_PAD = 130 // how close the pointer must get before the glove appears
const TAU = Math.PI * 2
const HOTSPOT = { x: 24.5, y: 5 } // index fingertip; must match the CSS transform-origin
const PALM = { x: 3, y: 24 } // where the strands meet the glove, before tilt

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

export default function Tendrils() {
  const canvasRef = useRef(null)
  const gloveRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduced.matches) return undefined

    const canvas = canvasRef.current
    const glove = gloveRef.current
    const group = document.querySelector('.hero__actions')
    if (!canvas || !glove || !group) return undefined
    const ctx = canvas.getContext('2d')

    let width = 0
    let height = 0
    let ink = '#12110d'
    const base = { cx: 0, cy: 0, w: 0, h: 0 }

    // Read the group's UNTRANSFORMED box. Reading it while a transform is
    // applied feeds the physics its own output and the whole thing jitters.
    const measure = () => {
      const prev = group.style.transform
      group.style.transform = 'none'
      const r = group.getBoundingClientRect()
      group.style.transform = prev
      base.cx = r.left + r.width / 2
      base.cy = r.top + r.height / 2
      base.w = r.width
      base.h = r.height
      ink = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || ink
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      measure()
    }

    // ── group transform, spring-driven ──────────────────────────────────────
    const g = { x: 0, y: 0, rot: 0, scale: 1, vx: 0, vy: 0, vr: 0, vs: 0 }
    const spring = (o, k, vk, target, stiff, damp, f) => {
      o[vk] += (target - o[k]) * stiff * f
      o[vk] *= Math.pow(damp, f)
      o[k] += o[vk] * f
    }

    const toLocal = (px, py) => {
      const a = (-g.rot * Math.PI) / 180
      const c = Math.cos(a)
      const s = Math.sin(a)
      const dx = px - base.cx - g.x
      const dy = py - base.cy - g.y
      return { x: (dx * c - dy * s) / g.scale, y: (dx * s + dy * c) / g.scale }
    }
    const toScreen = (lx, ly) => {
      const a = (g.rot * Math.PI) / 180
      const c = Math.cos(a)
      const s = Math.sin(a)
      const x = lx * g.scale
      const y = ly * g.scale
      return { x: base.cx + g.x + x * c - y * s, y: base.cy + g.y + x * s + y * c }
    }

    // ── rectangle perimeter, walked by arc length ───────────────────────────
    const perim = () => 2 * (base.w + base.h)

    const arcLengthAt = (px, py) => {
      const hw = base.w / 2
      const hh = base.h / 2
      const dT = Math.abs(py + hh)
      const dB = Math.abs(py - hh)
      const dL = Math.abs(px + hw)
      const dR = Math.abs(px - hw)
      const m = Math.min(dT, dB, dL, dR)
      if (m === dT) return clamp(px, -hw, hw) + hw
      if (m === dR) return base.w + (clamp(py, -hh, hh) + hh)
      if (m === dB) return base.w + base.h + (hw - clamp(px, -hw, hw))
      return 2 * base.w + base.h + (hh - clamp(py, -hh, hh))
    }

    const pointAt = (sRaw) => {
      const P = perim()
      const hw = base.w / 2
      const hh = base.h / 2
      let s = ((sRaw % P) + P) % P
      if (s < base.w) return { x: -hw + s, y: -hh }
      s -= base.w
      if (s < base.h) return { x: hw, y: -hh + s }
      s -= base.h
      if (s < base.w) return { x: hw - s, y: hh }
      s -= base.w
      return { x: -hw, y: hh - s }
    }

    const nearGroup = (px, py, pad) => {
      const p = toLocal(px, py)
      const dx = Math.abs(p.x) - base.w / 2
      const dy = Math.abs(p.y) - base.h / 2
      return Math.hypot(Math.max(dx, 0), Math.max(dy, 0)) <= pad
    }

    // ── pointer ─────────────────────────────────────────────────────────────
    const mouse = { x: -9999, y: -9999, present: false }
    let lastFrameX = 0
    let smoothVx = 0
    let tilt = -12
    let inZone = false

    // ── strands ─────────────────────────────────────────────────────────────
    let strands = []
    let connected = false
    let activeCount = 0
    const particles = []

    const makeStrand = (i, x, y) => {
      const norm = i / (STRAND_COUNT - 1) - 0.5
      const spread = Math.min(base.w * 0.9, 190)
      return {
        spreadOffset: norm * spread + (Math.random() - 0.5) * 8,
        handOffsetX: norm * 16 + (Math.random() - 0.5) * 5,
        handOffsetY: (Math.random() - 0.5) * 6,
        thickness: i % 4 === 0 ? 2.4 + Math.random() * 1.6 : 0.7 + Math.random() * 1.1,
        maxDist: 210 + Math.random() * 100 + (1 - Math.abs(norm * 2)) * 60,
        sagFactor: 0.12 + Math.random() * 0.25,
        stiff: 0.14 + Math.random() * 0.1,
        damping: 0.72 + Math.random() * 0.08,
        midX: x,
        midY: y,
        vx: 0,
        vy: 0,
        ax: x,
        ay: y,
        hx: x,
        hy: y,
        tension: 0,
        snapped: false,
        beads: Array.from({ length: 2 }, () => ({
          t: Math.random(),
          speed: 0.004 + Math.random() * 0.008,
          size: 1.6 + Math.random() * 2,
        })),
        bridge: Math.random() > 0.25,
        bridgeT1: 0.18 + Math.random() * 0.25,
        bridgeT2: 0.22 + Math.random() * 0.28,
      }
    }

    const curvePoint = (s, t) => {
      const mt = 1 - t
      return {
        x: mt * mt * s.ax + 2 * mt * t * s.midX + t * t * s.hx,
        y: mt * mt * s.ay + 2 * mt * t * s.midY + t * t * s.hy,
      }
    }

    const connect = (x, y) => {
      if (!connected) {
        strands = Array.from({ length: STRAND_COUNT }, (_, i) => makeStrand(i, x, y))
        connected = true
        return
      }
      // Only regrow what already snapped, so surviving strands do not pop.
      for (let i = 0; i < strands.length; i += 1) {
        if (strands[i].snapped) strands[i] = makeStrand(i, x, y)
      }
    }

    const snap = (s) => {
      s.snapped = true
      const m = curvePoint(s, 0.5)
      for (let k = 0; k < 3; k += 1) {
        particles.push({
          x: m.x + (Math.random() - 0.5) * 20,
          y: m.y + (Math.random() - 0.5) * 20,
          vx: (s.ax - s.hx) * 0.04 + (Math.random() - 0.5) * 4,
          vy: (s.ay - s.hy) * 0.04 + (Math.random() - 0.5) * 4,
          r: 1.8 + Math.random() * 2.2,
          alpha: 1,
        })
      }
    }

    const release = () => {
      if (connected) strands.forEach((s) => !s.snapped && snap(s))
      connected = false
      activeCount = 0
    }

    // Leaving the activation zone must NOT kill the strands. The zone is 130px
    // and strands snap between 210 and 310, so releasing on exit cut every one
    // of them before it could stretch — the whole point of the effect is
    // dragging the goo until it gives. The zone governs the glove and the
    // cursor; distance governs the strands.
    const exitZone = () => {
      inZone = false
      document.documentElement.classList.remove('is-goo')
    }

    // Pointer gone from the window entirely: release, there is nothing holding
    // the far end any more.
    const leaveWindow = () => {
      inZone = false
      mouse.present = false
      glove.style.opacity = '0'
      document.documentElement.classList.remove('is-goo')
      release()
      start()
    }

    // ── loop, started on demand and stopped when there is nothing to draw ───
    let raf = 0
    let running = false
    let last = 0

    const frame = (now) => {
      const f = clamp((now - last) / 16.667, 0.25, 2)
      last = now

      const frameVx = (mouse.x - lastFrameX) / f
      lastFrameX = mouse.x
      smoothVx += (frameVx - smoothVx) * (1 - Math.pow(0.65, f))
      const targetTilt = clamp(smoothVx * 0.9 - 12, -28, 28)
      tilt += (targetTilt - tilt) * (1 - Math.pow(0.7, f))

      const ta = (tilt * Math.PI) / 180
      const tc = Math.cos(ta)
      const ts = Math.sin(ta)
      const glovePoint = (ox, oy) => ({
        x: mouse.x + ox * tc - oy * ts,
        y: mouse.y + ox * ts + oy * tc,
      })

      const pull = connected ? activeCount / STRAND_COUNT : 0
      spring(g, 'x', 'vx', clamp((mouse.x - base.cx) * 0.07, -28, 28) * pull, 0.12, 0.8, f)
      spring(g, 'y', 'vy', clamp((mouse.y - base.cy) * 0.07, -22, 22) * pull, 0.12, 0.8, f)
      spring(g, 'rot', 'vr', clamp((mouse.x - base.cx) * 0.012, -5, 5) * pull, 0.12, 0.8, f)
      spring(g, 'scale', 'vs', pull > 0 ? 1.02 : 1, 0.2, 0.75, f)

      const over = mouse.present && nearGroup(mouse.x, mouse.y, HOVER_PAD)
      const palm = glovePoint(PALM.x, PALM.y)
      if (over) connect(palm.x, palm.y)

      activeCount = 0
      if (connected) {
        const lp = toLocal(palm.x, palm.y)
        const s0 = arcLengthAt(lp.x, lp.y)
        for (const s of strands) {
          if (s.snapped) continue
          const lpt = pointAt(s0 + s.spreadOffset)
          const a = toScreen(lpt.x, lpt.y)
          const h = glovePoint(PALM.x + s.handOffsetX, PALM.y + s.handOffsetY)
          s.ax = a.x
          s.ay = a.y
          s.hx = h.x
          s.hy = h.y
          const dist = Math.hypot(h.x - a.x, h.y - a.y)
          if (dist > s.maxDist && !over) {
            snap(s)
            continue
          }
          activeCount += 1
          s.tension = Math.min(1, dist / s.maxDist)
          const tmx = (a.x + h.x) / 2
          const tmy = (a.y + h.y) / 2 + dist * s.sagFactor
          s.vx += (tmx - s.midX) * s.stiff * f
          s.vy += (tmy - s.midY) * s.stiff * f
          const d = Math.pow(s.damping, f)
          s.vx *= d
          s.vy *= d
          s.midX += s.vx * f
          s.midY += s.vy * f
          for (const b of s.beads) b.t = (b.t + b.speed * f) % 1
        }
        if (activeCount === 0) connected = false
      }

      ctx.clearRect(0, 0, width, height)

      if (connected) {
        ctx.fillStyle = ink
        ctx.strokeStyle = ink
        ctx.lineCap = 'round'
        for (const s of strands) {
          if (s.snapped) continue
          const w = Math.max(0.45, s.thickness * (1 - s.tension * 0.62))
          ctx.beginPath()
          ctx.arc(s.ax, s.ay, w * 2.1, 0, TAU)
          ctx.fill()
          ctx.lineWidth = w
          ctx.beginPath()
          ctx.moveTo(s.ax, s.ay)
          ctx.quadraticCurveTo(s.midX, s.midY, s.hx, s.hy)
          ctx.stroke()
          for (const b of s.beads) {
            const p = curvePoint(s, b.t)
            ctx.beginPath()
            ctx.arc(p.x, p.y, b.size * (1 - s.tension * 0.5), 0, TAU)
            ctx.fill()
          }
        }
        ctx.lineWidth = 0.85
        ctx.globalAlpha = 0.85
        for (let i = 0; i < strands.length - 1; i += 1) {
          const s1 = strands[i]
          const s2 = strands[i + 1]
          if (s1.snapped || s2.snapped || !s1.bridge) continue
          const p1 = curvePoint(s1, s1.bridgeT1)
          const p2 = curvePoint(s2, s2.bridgeT2)
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.quadraticCurveTo((p1.x + p2.x) / 2, (p1.y + p2.y) / 2 + 8, p2.x, p2.y)
          ctx.stroke()
        }
        ctx.globalAlpha = 1
      }

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i]
        p.x += p.vx * f
        p.y += p.vy * f
        p.vy += 0.25 * f
        p.alpha -= 0.04 * f
        if (p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = ink
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * p.alpha, 0, TAU)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      group.style.transform =
        `translate(${g.x.toFixed(2)}px, ${g.y.toFixed(2)}px) ` +
        `rotate(${g.rot.toFixed(3)}deg) scale(${g.scale.toFixed(4)})`
      glove.style.transform =
        `translate(${mouse.x - HOTSPOT.x}px, ${mouse.y - HOTSPOT.y}px) rotate(${tilt.toFixed(2)}deg)`

      // Idle = nothing on screen and the group has settled back. Stop the loop
      // rather than spin it at 60fps over a static hero.
      // The glove belongs on screen for as long as something is attached to it.
      if (!inZone && !connected && mouse.present) {
        mouse.present = false
        glove.style.opacity = '0'
      }

      const settled =
        !connected &&
        particles.length === 0 &&
        Math.abs(g.x) < 0.1 &&
        Math.abs(g.y) < 0.1 &&
        Math.abs(g.rot) < 0.05 &&
        Math.abs(g.scale - 1) < 0.002
      if (settled && !inZone) {
        running = false
        group.style.transform = ''
        ctx.clearRect(0, 0, width, height)
        return
      }
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      const wasIn = inZone
      inZone = nearGroup(mouse.x, mouse.y, ZONE_PAD)
      if (inZone && !wasIn) {
        mouse.present = true
        lastFrameX = mouse.x
        glove.style.opacity = '1'
        document.documentElement.classList.add('is-goo')
        measure()
        start()
      } else if (!inZone && wasIn) {
        exitZone()
        start()
      }
      if (connected) start()
      if (inZone) start()
    }

    const onScroll = () => {
      if (inZone || running) measure()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resize)
    window.addEventListener('blur', leaveWindow)
    document.documentElement.addEventListener('pointerleave', leaveWindow)

    resize()
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
      window.removeEventListener('blur', leaveWindow)
      document.documentElement.removeEventListener('pointerleave', leaveWindow)
      document.documentElement.classList.remove('is-goo')
      group.style.transform = ''
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="goo__canvas" aria-hidden="true" />
      <div ref={gloveRef} className="goo__glove" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 44 48" fill="none" focusable="false">
          <g stroke="#111" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 39 H33 V43 C33 44.5 31.5 45.5 30 45.5 H18 C16.5 45.5 15 44.5 15 43 Z" fill="#fff" />
            <path
              d="M14 25 C10.5 23.5 8 25.5 9.5 29.5 L13 36.5 C14 38.5 15 39.5 16.5 39.5 H31.5 C34.5 39.5 36.5 36.5 36.5 32.5 V21.5 C36.5 19 33 19 33 21.5 V19.5 C33 17 29 17 29 19.5 V18 C29 15.5 25 15.5 25 18 V8.5 C25 5 20 5 20 8.5 V26.5"
              fill="#fff"
            />
            <line x1="25" y1="18" x2="25" y2="25.5" />
            <line x1="29" y1="19.5" x2="29" y2="26.5" />
            <line x1="33" y1="21.5" x2="33" y2="27.5" />
            <line x1="22.5" y1="31" x2="22.5" y2="35.5" strokeWidth="2.1" />
            <line x1="26.5" y1="30.5" x2="27" y2="35.5" strokeWidth="2.1" />
            <line x1="30.5" y1="31.5" x2="31.5" y2="35.5" strokeWidth="2.1" />
          </g>
        </svg>
      </div>
    </>
  )
}
