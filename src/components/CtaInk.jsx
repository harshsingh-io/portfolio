import { useEffect, useRef } from 'react'

// Viscous ink strands that reach from the hero buttons toward the pointer,
// stretch, thin, and snap. Ported from a reference implementation; the physics
// is the same idea, the rest is deliberately not.
//
// FOUR THINGS FROM THE REFERENCE ARE NOT HERE, and two of them were bugs:
//
//  1. `touch-action: none` on the body. That disables page scrolling on every
//     touch device. The effect is pointer-only here and never arms on a coarse
//     pointer, so nothing has to be taken away from touch to get it.
//  2. `cursor: none` with a cartoon glove drawn in its place. Hiding the system
//     cursor site-wide is an accessibility regression, and the glove belongs to
//     a different design language than Newsreader and hairlines.
//  3. A glossy pill button with four box-shadows. This system is radius-0 with
//     no shadows anywhere, both on purpose, so the buttons keep their own look
//     and the ink simply attaches to them.
//  4. Dragging the button toward the pointer. Moving a target as someone
//     reaches for it is hostile — Fitts's law in reverse. The strands move; the
//     buttons stay exactly where they were clicked for.
//
// THE LOOP IS IDLE UNTIL IT IS NEEDED. requestAnimationFrame only runs while
// strands exist or the pointer is inside the arming radius, and stops itself
// otherwise. A permanently running canvas would show up in Total Blocking Time
// on a page that currently measures 0ms, and Lighthouse never hovers anything,
// so an always-on loop would be pure cost for an effect no audit would see.
//
// Buttons are rectangles here, not pills, so a strand's anchor walks the
// perimeter of a box rather than a pill's arc length — which makes the
// attachment maths considerably shorter than the reference's.

const STRANDS = 12
// How close the pointer must come before ink forms. Small on purpose: at 150
// the ink armed from 150px AWAY from any button, so strands grew out of empty
// space below the row where there is no button at all. Ink belongs to the
// button, so you have to actually reach it — the reference used an 8px pad for
// the same reason. Once formed, strands stretch and snap at their own maxDist,
// which is what gives the pull its range.
const ARM_PAD = 10
const TAU = Math.PI * 2
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

// Walk the perimeter of a rect, returning a point at arc length s.
function rectPointAt(s, w, h) {
  const p = 2 * (w + h)
  s = ((s % p) + p) % p
  if (s < w) return { x: s, y: 0 }
  s -= w
  if (s < h) return { x: w, y: s }
  s -= h
  if (s < w) return { x: w - s, y: h }
  return { x: 0, y: h - (s - w - h) }
}

// Arc length of the point on the perimeter nearest to (px, py), rect-local.
function nearestArcLength(px, py, w, h) {
  const cands = [
    { d: Math.abs(py), s: clamp(px, 0, w) },
    { d: Math.abs(w - px), s: w + clamp(py, 0, h) },
    { d: Math.abs(h - py), s: w + h + (w - clamp(px, 0, w)) },
    { d: Math.abs(px), s: 2 * w + h + (h - clamp(py, 0, h)) },
  ]
  return cands.reduce((a, b) => (a.d <= b.d ? a : b)).s
}

function makeStrand(i, x, y) {
  const norm = i / (STRANDS - 1) - 0.5
  return {
    spread: norm * 62 + (Math.random() - 0.5) * 7,
    offX: norm * 11 + (Math.random() - 0.5) * 4,
    offY: (Math.random() - 0.5) * 5,
    thickness: i % 4 === 0 ? 2.1 + Math.random() * 1.2 : 0.7 + Math.random() * 0.9,
    maxDist: 125 + Math.random() * 70 + (1 - Math.abs(norm * 2)) * 40,
    sag: 0.1 + Math.random() * 0.2,
    spring: 0.15 + Math.random() * 0.09,
    damping: 0.72 + Math.random() * 0.08,
    midX: x, midY: y, vx: 0, vy: 0,
    ax: x, ay: y, hx: x, hy: y,
    tension: 0,
    snapped: false,
    bead: { t: Math.random(), speed: 0.005 + Math.random() * 0.007, size: 1.4 + Math.random() * 1.6 },
    bridge: Math.random() > 0.3,
    b1: 0.2 + Math.random() * 0.22,
    b2: 0.24 + Math.random() * 0.24,
  }
}

const curveAt = (s, t) => {
  const m = 1 - t
  return {
    x: m * m * s.ax + 2 * m * t * s.midX + t * t * s.hx,
    y: m * m * s.ay + 2 * m * t * s.midY + t * t * s.hy,
  }
}

export default function CtaInk({ targetRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = targetRef.current
    if (!canvas || !host) return

    // Both gates are checked once and re-checked on change: no ink for anyone
    // who asked for less motion, and none on a coarse pointer, where there is
    // no hover to drive it and the loop would only cost battery.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const allowed = () => !reduce.matches && fine.matches

    const ctx = canvas.getContext('2d')
    let raf = null
    let strands = []
    let particles = []
    let pointer = { x: 0, y: 0, inside: false }
    let box = null // canvas bounding rect in page coords
    let buttons = []
    let anchorIdx = -1
    let last = performance.now()

    function measure() {
      const r = canvas.getBoundingClientRect()
      box = r
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(r.width * dpr)
      canvas.height = Math.round(r.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buttons = [...host.querySelectorAll('.btn')].map((b) => {
        const br = b.getBoundingClientRect()
        return { x: br.left - r.left, y: br.top - r.top, w: br.width, h: br.height }
      })
    }

    function nearestButton(x, y) {
      let bestI = -1
      let bestD = Infinity
      for (let i = 0; i < buttons.length; i++) {
        const b = buttons[i]
        const dx = x - clamp(x, b.x, b.x + b.w)
        const dy = y - clamp(y, b.y, b.y + b.h)
        const d = Math.hypot(dx, dy)
        if (d < bestD) {
          bestD = d
          bestI = i
        }
      }
      return { index: bestI, dist: bestD }
    }

    function snap(s) {
      s.snapped = true
      const m = curveAt(s, 0.5)
      for (let k = 0; k < 2; k++) {
        particles.push({
          x: m.x + (Math.random() - 0.5) * 14,
          y: m.y + (Math.random() - 0.5) * 14,
          vx: (s.ax - s.hx) * 0.035 + (Math.random() - 0.5) * 3,
          vy: (s.ay - s.hy) * 0.035 + (Math.random() - 0.5) * 3,
          r: 1.5 + Math.random() * 1.8,
          a: 1,
        })
      }
    }

    function draw(ink) {
      ctx.fillStyle = ink
      ctx.strokeStyle = ink
      ctx.lineCap = 'round'

      for (const s of strands) {
        if (s.snapped) continue
        const w = Math.max(0.4, s.thickness * (1 - s.tension * 0.6))
        ctx.beginPath()
        ctx.arc(s.ax, s.ay, w * 1.9, 0, TAU)
        ctx.fill()
        ctx.lineWidth = w
        ctx.beginPath()
        ctx.moveTo(s.ax, s.ay)
        ctx.quadraticCurveTo(s.midX, s.midY, s.hx, s.hy)
        ctx.stroke()
        const p = curveAt(s, s.bead.t)
        ctx.beginPath()
        ctx.arc(p.x, p.y, s.bead.size * (1 - s.tension * 0.5), 0, TAU)
        ctx.fill()
      }

      // Cross-fibres near the root, which is what sells it as viscous rather
      // than as a bundle of separate lines.
      ctx.lineWidth = 0.7
      ctx.globalAlpha = 0.8
      for (let i = 0; i < strands.length - 1; i++) {
        const a = strands[i]
        const b = strands[i + 1]
        if (a.snapped || b.snapped || !a.bridge) continue
        const p1 = curveAt(a, a.b1)
        const p2 = curveAt(b, b.b2)
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.quadraticCurveTo((p1.x + p2.x) / 2, (p1.y + p2.y) / 2 + 6, p2.x, p2.y)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    }

    function frame(now) {
      const f = clamp((now - last) / 16.667, 0.25, 2)
      last = now

      const ink = getComputedStyle(canvas).color
      ctx.clearRect(0, 0, box.width, box.height)

      const near = pointer.inside ? nearestButton(pointer.x, pointer.y) : { index: -1, dist: Infinity }
      const arming = near.index >= 0 && near.dist < ARM_PAD

      if (arming) {
        // The anchor is latched when the ink forms and held until it is gone.
        // Re-deriving it each frame let a stretched strand jump to a different
        // button the moment that one became the nearer of the two.
        if (!strands.length) anchorIdx = near.index
        if (!strands.length) strands = Array.from({ length: STRANDS }, (_, i) => makeStrand(i, pointer.x, pointer.y))
        else strands = strands.map((s, i) => (s.snapped ? makeStrand(i, pointer.x, pointer.y) : s))
      }

      // Read through the index rather than holding the rect: measure() rebuilds
      // these on resize and scroll, and a held rect would go stale.
      const anchor = anchorIdx >= 0 ? buttons[anchorIdx] : null

      let alive = 0
      if (strands.length && anchor) {
        const base = nearestArcLength(pointer.x - anchor.x, pointer.y - anchor.y, anchor.w, anchor.h)
        for (const s of strands) {
          if (s.snapped) continue
          const a = rectPointAt(base + s.spread, anchor.w, anchor.h)
          s.ax = anchor.x + a.x
          s.ay = anchor.y + a.y
          s.hx = pointer.x + s.offX
          s.hy = pointer.y + s.offY
          const d = Math.hypot(s.hx - s.ax, s.hy - s.ay)
          if (d > s.maxDist && !arming) {
            snap(s)
            continue
          }
          alive++
          s.tension = Math.min(1, d / s.maxDist)
          const tmx = (s.ax + s.hx) / 2
          const tmy = (s.ay + s.hy) / 2 + d * s.sag
          s.vx += (tmx - s.midX) * s.spring * f
          s.vy += (tmy - s.midY) * s.spring * f
          const damp = Math.pow(s.damping, f)
          s.vx *= damp
          s.vy *= damp
          s.midX += s.vx * f
          s.midY += s.vy * f
          s.bead.t = (s.bead.t + s.bead.speed * f) % 1
        }
        if (!alive) {
          strands = []
          anchorIdx = -1
        } else draw(ink)
      } else if (strands.length) {
        strands.forEach((s) => !s.snapped && snap(s))
        strands = []
        anchorIdx = -1
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx * f
        p.y += p.vy * f
        p.vy += 0.22 * f
        p.a -= 0.045 * f
        if (p.a <= 0) {
          particles.splice(i, 1)
          continue
        }
        ctx.globalAlpha = p.a
        ctx.fillStyle = ink
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * p.a, 0, TAU)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // Stop rather than spin. This is the whole reason the effect costs
      // nothing when nobody is pointing at it.
      if (alive || particles.length || arming) raf = requestAnimationFrame(frame)
      else raf = null
    }

    function kick() {
      if (raf === null) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }

    function onMove(e) {
      if (!allowed()) return
      if (!box) measure()
      const x = e.clientX - box.left
      const y = e.clientY - box.top
      pointer = { x, y, inside: true }
      const { dist } = nearestButton(x, y)
      if (dist < ARM_PAD || strands.length) kick()
    }

    function onLeave() {
      pointer.inside = false
      kick()
    }

    // Measured on the next frame as well as now: on first mount the canvas can
    // be read before the stylesheet has applied, in which case it reports its
    // intrinsic 300x150 and every coordinate afterwards is wrong. A
    // ResizeObserver then keeps it correct through font swaps and reflow, which
    // a one-shot measure cannot.
    measure()
    requestAnimationFrame(measure)
    const ro = new ResizeObserver(measure)
    ro.observe(host)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, { passive: true })

    return () => {
      ro.disconnect()
      if (raf !== null) cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
    }
  }, [targetRef])

  return <canvas ref={canvasRef} className="hero__ink" aria-hidden="true" />
}
