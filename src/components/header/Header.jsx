import React from 'react'
import './header.css'
import CTA from './CTA'
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import HeaderSocials from './HeaderSocials'

const Header = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  const nameArray = ['H', 'a', 'r', 's', 'h', ' ', 'S', 'i', 'n', 'g', 'h']
  const jobArray = [
    'S',
    'o',
    'f',
    't',
    'w',
    'a',
    'r',
    'e',
    ' ',
    'E',
    'n',
    'g',
    'i',
    'n',
    'e',
    'e',
    'r',
  ]

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)
  }, [])

  return (
    <header id="home">
      <div className="container header__container">
        <div className="header__content">
          <h5 className="header__greeting">
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>e</span>
            <span className={`${letterClass} _13`}>l</span>
            <span className={`${letterClass} _14`}>l</span>
            <span className={`${letterClass} _15`}>o,</span>
            <span className={`${letterClass} _16`}> I</span>
            <span className={`${letterClass} _17`}>'m</span>
          </h5>

          <h1 className="header__name">
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={15}
            />
          </h1>

          <div className="header__tagline">
            <h2 className="text-light header__title">
              <AnimatedLetters
                letterClass={letterClass}
                strArray={jobArray}
                idx={19}
              />
            </h2>
          </div>

          <CTA />
          <HeaderSocials />
        </div>

        <div className="me">
          <div className="me__wrapper">
            <img
              src={
                'https://github.com/harshsingh-io/portfolio/blob/master/src/assets/harsh_singh_image.png?raw=true'
              }
              alt="Harsh Singh, Software Engineer specializing in Mobile, Backend and Data Engineering"
              loading="eager"
            />
          </div>
        </div>

        <a href="#contact" className="scroll__down" aria-label="Scroll to contact section">
          Scroll Down
        </a>
      </div>
    </header>
  )
}

export default Header
