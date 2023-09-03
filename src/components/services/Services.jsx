import React from 'react'
import './services.css'
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import {BiCheck} from 'react-icons/bi'

const Services = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])
  return (
    <section id='services'>
      <section id='services'>
        <h5><AnimatedLetters
  letterClass={letterClass}
  strArray={['W', 'h', 'a', 't', ' ', 'I', ' ', 'O', 'f', 'f', 'e', 'r']}
  idx={15}
/>
</h5>
        <h2><AnimatedLetters
  letterClass={letterClass}
  strArray={['S', 'e', 'r', 'v', 'i', 'c', 'e', 's']}
  idx={15}
/>
</h2>

<div className="container services__container">
  <article className='services'>
    <div className='service__head'>
      <h3>Android App Development</h3>
    </div>

    <ul className='service__list'>
      <li>
        <BiCheck className='service__list-icon' />
        <p>Proficient in developing high-quality Android apps using Kotlin and Java.</p>
      </li>
      <li>
        <BiCheck className='service__list-icon' />
        <p>Create user-friendly and engaging Android applications that meet client and user needs.</p>
      </li>
      <li>
        <BiCheck className='service__list-icon' />
        <p>Expertise in Android Studio and Android SDK for efficient app development.</p>
      </li>
      <li>
        <BiCheck className='service__list-icon' />
        <p>Ability to ensure reliability and bug-free performance through comprehensive debugging and testing.</p>
      </li>
    </ul>
  </article>
  {/* End of Android App Development */}
  <article className='services'>
    <div className='service__head'>
      <h3>Software Engineering</h3>
    </div>

    <ul className='service__list'>
      <li>
        <BiCheck className='service__list-icon' />
        <p>Strong foundation in software design, problem-solving, and coding best practices.</p>
      </li>
      <li>
        <BiCheck className='service__list-icon' />
        <p>Experience working on diverse software projects, ranging from web applications to backend systems.</p>
      </li>
      <li>
        <BiCheck className='service__list-icon' />
        <p>Proficiency in a wide range of programming languages, including Java, Kotlin, C/C++, and Python.</p>
      </li>
    </ul>
  </article>
  {/* End of Software Engineering */}
  <article className='services'>
    <div className='service__head'>
      <h3>Team Collaboration & Problem Solving</h3>
    </div>

    <ul className='service__list'>
      <li>
        <BiCheck className='service__list-icon' />
        <p>Effective collaboration within teams using tools like GitHub, Slack, and Trello.</p>
      </li>
      <li>
        <BiCheck className='service__list-icon' />
        <p>Strong communication, problem-solving skills, and a proven ability to work seamlessly with colleagues to achieve project goals.</p>
      </li>
      <li>
        <BiCheck className='service__list-icon' />
        <p>Adept at tackling complex technical challenges and providing innovative solutions, benefiting project success.</p>
      </li>
    </ul>
  </article>
  {/* End of Team Collaboration & Problem Solving */}

        </div>
      </section>
    </section>
  )
}

export default Services