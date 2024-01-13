import React from 'react'
import './nav.css'
import{AiOutlineHome} from 'react-icons/ai'
import{AiOutlineUser} from 'react-icons/ai'
import{MdOutlineBook} from 'react-icons/md'
import{RiServiceLine} from 'react-icons/ri'
import{BiMessageSquareDetail} from 'react-icons/bi'
import { useState } from 'react'

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#')
  return (
    <nav>
      
      <a href="#" onClick={() => setActiveNav('#')} className={activeNav==='#' ? 'active' : ''}><AiOutlineHome/><span>Home</span></a>

      <a href="#about" onClick={() => setActiveNav('#about')} className={activeNav==='#about' ? 'active' : ''}><AiOutlineUser/><span>About Me</span></a>
      <a href="#experience"onClick={() => setActiveNav('#experience')} className={activeNav==='#experience' ? 'active' : ''}><MdOutlineBook/><span>Skills</span></a>
      <a href="#portfolio" onClick={() => setActiveNav('#portfolio')} className={activeNav==='#portfolio' ? 'active' : ''}><RiServiceLine/><span>Projects</span></a>
      <a href="#contact" onClick={() => setActiveNav('#contact')} className={activeNav==='#contact' ? 'active' : ''}><BiMessageSquareDetail/><span>Contact</span></a>
      
    </nav>
  )
}

export default Nav