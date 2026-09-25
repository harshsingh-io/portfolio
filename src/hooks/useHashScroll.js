import { useEffect } from 'react'

// The browser resolves a fragment before React has rendered anything, so a cold
// load of /#work — or any of the retired aliases like /#portfolio — lands at the
// top of the page instead of the section. This re-runs the scroll once the DOM
// exists.
//
// Two deliberate choices:
//
// - No requestAnimationFrame. rAF is throttled or deferred until first paint in
//   several environments, which silently loses the scroll. useEffect runs after
//   the DOM is committed, so measurements here are valid, and every image on the
//   page carries explicit dimensions, so layout does not shift underneath it.
//
// - Scrolls instantly rather than smoothly. A deep link has no meaningful "from"
//   position to animate out of, and `scroll-behavior: smooth` on the root will
//   otherwise swallow a programmatic scroll entirely. In-page anchor clicks still
//   glide, because those go through the browser's own handling.
//
// Only fires on mount; once the document exists the browser handles later hash
// changes natively.
export function useHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return

    const target = document.getElementById(id)
    if (!target) return

    const root = document.documentElement
    // scroll-padding-top keeps the section clear of the sticky nav; a manual
    // scroll has to apply it by hand.
    const padding = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0
    const top = target.getBoundingClientRect().top + window.scrollY - padding

    const previous = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, Math.max(0, top))
    root.style.scrollBehavior = previous
  }, [])
}
