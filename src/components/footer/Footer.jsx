import React from 'react'
import './footer.css'
import{BsLinkedin} from 'react-icons/bs'
import{GrFacebook} from 'react-icons/gr'
import{AiFillInstagram} from 'react-icons/ai'
import{FaTwitterSquare} from 'react-icons/fa'
const Footer = () => {
  return (
    <footer>
      <a href="https://codeenemy.hashnode.dev/" className='footer__logo'>CODE ENEMY</a>

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
        <a href="https://x.com/harshsingh_io"><FaTwitterSquare/></a>
        <a href="https://fb.com/harshtobekind"><GrFacebook/></a>
        <a href="https://instagram.com/harshsingh_io"><AiFillInstagram/></a>

      </div>

      <div className="footer__copyright">
        <small>&copy; Harsh Singh. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer