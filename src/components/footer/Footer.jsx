import React from 'react'
import './footer.css'
import{BsLinkedin} from 'react-icons/bs'
import{GrFacebook} from 'react-icons/gr'
import{AiFillInstagram} from 'react-icons/ai'
import{FaTwitterSquare} from 'react-icons/fa'
const Footer = () => {
  return (
    <footer>
      <a href="https://codenemy.blogspot.com/" className='footer__logo'>CODENEMY</a>

      <ul className="permalinks">
        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#testimonial">Testimonial</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="footer__socials">
        <a href="https://linkedin.com/in/harshsingh-io"><BsLinkedin/></a>
        <a href="https://fb.com/harshsingh.io"><GrFacebook/></a>
        <a href="https://instagram.com/harshsingh.io"><AiFillInstagram/></a>
        <a href="https://twitter.com/harshsingh_io"><FaTwitterSquare/></a>
      </div>

      <div className="footer__copyright">
        <small>&copy; Code Enemy. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer