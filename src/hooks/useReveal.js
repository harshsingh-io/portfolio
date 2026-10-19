import { useEffect, useRef } from 'react'

// Reveal-on-scroll, with content safety as the first priority.
//
// Read this before touching anything below: `.enter` sets `opacity: 0` inside
// `prefers-reduced-motion: no-preference`, so under that media query content is
// genuinely hidden until something adds `is-in`. This hook is the only thing
// that does. The media query is not a safety net for it; it is the condition
// that creates the hazard. (A previous version of this comment claimed content
// stayed visible "if this hook never runs at all", then described the failsafe
// that exists because it does not. Both cannot be true.)
//
// So the guarantee is made here, on three paths: the observer fires, the API is
// missing, or the timeout below trips. Under `reduce` the opacity rule never
// applies and the first branch reveals everything immediately anyway. With JS
// disabled outright, CRA renders an empty #root and the <noscript> block in
// index.html is the fallback. A reader must never be left looking at an
// invisible section because a callback did not arrive.
const FAILSAFE_MS = 1500

export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = [...root.querySelectorAll('.enter')]
    if (!targets.length) return

    const revealAll = () => targets.forEach((el) => el.classList.add('is-in'))

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      revealAll()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
    )

    targets.forEach((el) => observer.observe(el))

    // If the observer has not reported anything by now — throttled rAF, a
    // background tab that never painted, a browser quirk — show everything
    // rather than leave the page blank.
    const failsafe = setTimeout(() => {
      if (targets.some((el) => el.classList.contains('is-in'))) return
      revealAll()
      observer.disconnect()
    }, FAILSAFE_MS)

    return () => {
      clearTimeout(failsafe)
      observer.disconnect()
    }
  }, [])

  return ref
}
