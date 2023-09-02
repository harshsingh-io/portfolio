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
              <h3>App Development</h3>
            </div>

            <ul className='service__list'>
            <li>
                <BiCheck className='service__list-icon' />
                <p>Develop high-quality Android apps using Kotlin.
</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Create user-friendly and engaging Android apps.
</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Solve complex problems using Android app development.
</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Debug and test Android apps to ensure they are reliable and bug-free.
</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Use version control software to track changes to Android app code.
</p>
              </li>
            </ul>
          </article>
          {/* End of Android Development */}
          <article className='services'>
            <div className='service__head'>
              <h3>DSA</h3>
            </div>

            <ul className='service__list'>
            <li>
                <BiCheck className='service__list-icon' />
                <p>Contribute to open source projects related to data structures and algorithms.</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Write blog posts or articles about data structures and algorithms.</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Work on personal projects that use data structures and algorithms.</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Analyze the time and space complexity of algorithms.</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Present at conferences or meetups about data structures and algorithms.</p>
              </li>
            </ul>
          </article>
          {/* End of DSA */}
          <article className='services'>
            <div className='service__head'>
              <h3>Languages</h3>
            </div>

            <ul className='service__list'>
            <li>
                <BiCheck className='service__list-icon' />
                <p>C(Academics)</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Java(Experienced)</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>CPP(Academics)</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Kotlin(Android Development)</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Python(Basics)</p>
              </li>
            </ul>
          </article>
          {/* End of Android Development */}
        </div>
      </section>
    </section>
  )
}

export default Services