import { useCallback, useEffect, useState } from 'react'

const KEY = 'theme'

function initial() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(KEY)
}

// null = follow the system. 'light' / 'dark' = explicit override.
export function useTheme() {
  const [theme, setTheme] = useState(initial)

  useEffect(() => {
    const root = document.documentElement
    if (theme) {
      root.setAttribute('data-theme', theme)
      window.localStorage.setItem(KEY, theme)
    } else {
      root.removeAttribute('data-theme')
      window.localStorage.removeItem(KEY)
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const resolved =
        current ??
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      return resolved === 'dark' ? 'light' : 'dark'
    })
  }, [])

  return { theme, toggle }
}
