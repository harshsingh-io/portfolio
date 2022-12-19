import React from 'react'
import './about.css'
import ME from '../../assets/harsh-about.webp'
import{FaAward} from 'react-icons/fa'
import{FiUsers} from 'react-icons/fi'
import{GoProject} from 'react-icons/go'
const About = () => {
  return (
    <section id='about'>
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className='about__me'>
          <div className="about__me-image">
            <img src={ME} alt="Image Of Me" />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className='about__icon'/>
              <h5>Experience</h5>
              <small>No Work Experience</small>
            </article>
            <article className="about__card">
              <FiUsers className='about__icon'/>
              <h5>Clients</h5>
              <small>0 Clients</small>
            </article>
            <article className="about__card">
              <GoProject className='about__icon'/>
              <h5>Projects</h5>
              <small>5+</small>
            </article>
          </div>
          <p>
          CS student at SIRT Bhopal. Currently learning Android App Development and DSA with JAVA. There are some side hustles where i give my free time these are Blogging, Video Editing, Youtube, Image Editing, Testing
          </p>

          <a href="#contact" className="btn btn-primary">Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default About