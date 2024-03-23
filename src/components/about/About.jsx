import React from 'react'
import './about.css'
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import ME from '../../assets/harsh-about.webp'
import{FaAward} from 'react-icons/fa'
import{FiUsers} from 'react-icons/fi'
import{GoProject} from 'react-icons/go'
const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])
  return (
    <section id='about'>
      <h5><AnimatedLetters
              letterClass={letterClass}
              strArray={['G','e','t',' ','T','o',' ','K','n','o','w']}
              idx={15}
            /></h5>
      <h2> <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              idx={15}
            /></h2>

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
              <small>3 months</small>
            </article>
            <article className="about__card">
              <FiUsers className='about__icon'/>
              <h5>Contributions</h5>
              <small>15+ Contributions</small>
            </article>
            <article className="about__card">
              <GoProject className='about__icon'/>
              <h5>Projects</h5>
              <small>5+</small>
            </article>
          </div>
          <p>I am an aspiring software engineer with a passion for building innovative and user-friendly applications. I have strong skills in Java, Kotlin, Android development, and data structures and algorithms. I am also an active open-source contributor and have a proven track record of delivering high-quality work.</p>
          <p>In my previous role as an Android Lead for Google Developer Student Clubs Bhopal, I successfully executed 3 tech events with an average participation of 550+ students. I also managed a team of 10 volunteers, which increased the coding club's membership by more than 500 within a week.</p>
          <p>I am currently working on two open-source projects: a project management application that uses Firebase Firestore to store data in the cloud, and a workout application that allows users to track their workouts, set goals, and receive feedback.</p>
<p>I am eager to apply my skills and experience to a challenging software engineering internship where I can learn and grow. I am also passionate about making a positive impact on the world through technology.</p>

          <a href="#contact" className="btn btn-primary">Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default About