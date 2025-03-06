import React, { useState, useEffect } from 'react'
import './mobile-portfolio.css'
import MobileShowcase from './mobileShowcase/MobileShowcase'
import MobileProjects from './mobileProjects/MobileProjects'
import AnimatedLetters from '../AnimatedLetters'

const MobilePortfolio = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [activeSection, setActiveSection] = useState('showcase')

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  return (
    <section id="mobile">
      <h5>Mobile Application Development</h5>
      <h2>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={'Mobile Apps'.split('')}
          idx={15}
        />
      </h2>

      <div className="mobile__tabs">
        <button
          className={`mobile__tab ${
            activeSection === 'showcase' ? 'active' : ''
          }`}
          onClick={() => setActiveSection('showcase')}
        >
          Featured App
        </button>
        <button
          className={`mobile__tab ${
            activeSection === 'projects' ? 'active' : ''
          }`}
          onClick={() => setActiveSection('projects')}
        >
          All Projects
        </button>
      </div>

      <div className="mobile__content container">
        {activeSection === 'showcase' ? <MobileShowcase /> : <MobileProjects />}
      </div>
    </section>
  )
}

export default MobilePortfolio
