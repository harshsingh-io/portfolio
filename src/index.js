import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

ReactDOM.render(<App />, document.querySelector("#root"))

// Register service worker for PWA functionality
serviceWorkerRegistration.register({
    onSuccess: () => console.log('[PWA] Service worker registered successfully'),
    onUpdate: (registration) => {
        console.log('[PWA] New content available, please refresh')
        // Optional: Show update notification to user
    }
})