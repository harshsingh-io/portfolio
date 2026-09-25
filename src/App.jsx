import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Experience from './components/Experience'
import Stack from './components/Stack'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useReveal } from './hooks/useReveal'
import { useHashScroll } from './hooks/useHashScroll'

export default function App() {
  const ref = useReveal()
  useHashScroll()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main" ref={ref}>
        <Hero />
        <hr className="rule shell-rule" />
        <Work />
        <hr className="rule shell-rule" />
        <Experience />
        <hr className="rule shell-rule" />
        <Stack />
        <hr className="rule shell-rule" />
        <About />
        <hr className="rule shell-rule" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
