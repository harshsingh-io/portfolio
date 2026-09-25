import { useEffect, useRef, useState } from 'react'
import { nav, profile } from '../content/portfolio'
import { useTheme } from '../hooks/useTheme'

const SECTIONS = nav.map((item) => item.href.slice(1))

export default function Nav() {
  const [active, setActive] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const burgerRef = useRef(null)
  const { toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes the panel and returns focus to the control that opened it.
  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      burgerRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const targets = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean)
    if (!targets.length || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="shell nav__inner">
        <a href="#home" className="nav__home">
          {profile.name}
          <span className="nav__home-role"> — {profile.role}</span>
        </a>

        <nav
          id="nav-sections"
          className={`nav__sections${open ? ' is-open' : ''}`}
          aria-label="Sections"
        >
          <ul className="nav__list">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`nav__link${isActive ? ' is-active' : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="nav__burger"
          ref={burgerRef}
          aria-expanded={open}
          aria-controls="nav-sections"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
            <path
              d={open ? 'M4 4l10 10M14 4L4 14' : 'M2 5h14M2 13h14'}
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button>

        <button type="button" className="nav__theme" onClick={toggle}>
          <span className="visually-hidden">Switch colour theme</span>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path
              d="M8 1.5v1.8M8 12.7v1.8M14.5 8h-1.8M3.3 8H1.5M12.6 3.4l-1.3 1.3M4.7 11.3l-1.3 1.3M12.6 12.6l-1.3-1.3M4.7 4.7L3.4 3.4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              className="nav__theme-rays"
            />
            <circle
              cx="8"
              cy="8"
              r="3.1"
              stroke="currentColor"
              strokeWidth="1.3"
              fill="none"
              className="nav__theme-core"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}
