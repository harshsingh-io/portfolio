// Teardown for the removed PWA service worker.
//
// Deleting public/service-worker.js is not enough: a worker already registered in
// a returning visitor's browser keeps controlling the page and serving its cached
// shell. This unregisters it on their next visit.

export function unregister() {
  if (!('serviceWorker' in navigator)) return

  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      registrations.forEach((registration) => registration.unregister())
    })
    .catch(() => {
      // A browser that refuses to enumerate registrations has nothing we can do
      // about it, and it must not break the page.
    })

  // The old worker also left named caches behind.
  if ('caches' in window) {
    caches
      .keys()
      .then((keys) =>
        keys
          .filter((key) => key.startsWith('harshsingh-portfolio') || key.startsWith('harshsingh-runtime'))
          .forEach((key) => caches.delete(key))
      )
      .catch(() => {})
  }
}
