import React from 'react'
import './nav.css'
import { AiOutlineHome } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { MdOutlineBook } from 'react-icons/md'
import { RiServiceLine } from 'react-icons/ri'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { useState } from 'react'

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#')
  const [hover, setHover] = useState(false)

  const hoverHandler = () => {
    setHover((prev) => !prev)
  }
  return (
    <nav>
      <a
        href="#"
        onMouseEnter={hoverHandler}
        onMouseLeave={hoverHandler}
        onClick={() => setActiveNav('#')}
        className={activeNav === '#' ? 'active' : ''}
      >
        <AiOutlineHome />{' '}
        <span className="iconname">{(hover || activeNav) && 'Home'}</span>{' '}
      </a>
      <a
        href="#about"
        onMouseEnter={hoverHandler}
        onMouseLeave={hoverHandler}
        onClick={() => setActiveNav('#about')}
        className={activeNav === '#about' ? 'active' : ''}
      >
        <AiOutlineUser />{' '}
        <span className="iconname">{(hover || activeNav) && 'About'}</span>
      </a>
      <a
        href="#experience"
        onMouseEnter={hoverHandler}
        onMouseLeave={hoverHandler}
        onClick={() => setActiveNav('#experience')}
        className={activeNav === '#experience' ? 'active' : ''}
      >
        <MdOutlineBook />
        <span className="iconname">{(hover || activeNav) && 'Experience'}</span>
      </a>
      <a
        href="#services"
        onMouseEnter={hoverHandler}
        onMouseLeave={hoverHandler}
        onClick={() => setActiveNav('#services')}
        className={activeNav === '#services' ? 'active' : ''}
      >
        <RiServiceLine />
        <span className="iconname">{(hover || activeNav) && 'Services'}</span>
      </a>
      <a
        href="#contact"
        onMouseEnter={hoverHandler}
        onMouseLeave={hoverHandler}
        onClick={() => setActiveNav('#contact')}
        className={activeNav === '#contact' ? 'active' : ''}
      >
        <BiMessageSquareDetail />
        <span className="iconname">{(hover || activeNav) && 'Contact'}</span>
      </a>
    </nav>
  )
}

export default Nav
