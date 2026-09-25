import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.scss'
import { unregister } from './serviceWorkerRegistration'

createRoot(document.querySelector('#root')).render(<App />)

// The PWA was removed. This tears down any service worker still registered in a
// returning visitor's browser — without it they keep being served the old cached
// shell. Keep this call for a release or two, then delete it along with
// serviceWorkerRegistration.js.
unregister()
