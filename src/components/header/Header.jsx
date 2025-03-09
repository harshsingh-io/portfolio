import React from 'react'
import './header.css'
import CTA from './CTA'
import { useEffect, useState } from 'react'
import ME from '../../assets/meo.webp'
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
    <header>
      <div className="container header__container">
        <h5>
          <span className={letterClass}>H</span>
          <span className={`${letterClass} _12`}>e</span>
          <span className={`${letterClass} _13`}>l</span>
          <span className={`${letterClass} _14`}>l</span>
          <span className={`${letterClass} _15`}>o,</span>
          <span className={`${letterClass} _16`}>I</span>
          <span className={`${letterClass} _17`}>'m</span>
        </h5>

        <h1>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={nameArray}
            idx={15}
          />
        </h1>
        <h5 className="text-light">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={jobArray}
            idx={19}
          />
        </h5>
        <CTA />
        <HeaderSocials />
        <div className="me">
          <img src={ME} alt="me" />
        </div>
        <a href="#contact" className="scroll__down">
          Scroll Down
        </a>
      </div>
    </header>
  )
}

export default Header
