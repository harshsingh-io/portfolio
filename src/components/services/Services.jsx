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
    <section id="services">
      <section id="services">
        <h5>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={[
              'W',
              'h',
              'a',
              't',
              ' ',
              'I',
              ' ',
              'O',
              'f',
              'f',
              'e',
              'r',
            ]}
            idx={15}
          />
        </h5>
        <h2>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={['S', 'e', 'r', 'v', 'i', 'c', 'e', 's']}
            idx={15}
          />
        </h2>

        <div className="container services__container">
          <article className="services">
            <div className="service__head">
              <h3>Android Development</h3>
            </div>

            <ul className="service__list">
              <li>
                <BiCheck className="service__list-icon" />
                <p>
                  I leverage my knowledge of Kotlin and Java to build apps that
                  seamlessly integrate with the Android ecosystem, taking full
                  advantage of the platform's features and functionalities.
                </p>
              </li>
              <li>
                <BiCheck className="service__list-icon" />
                <p>
                  I prioritize user experience by designing beautiful and
                  engaging interfaces that adhere to the latest Android design
                  guidelines. This ensures users feel comfortable and familiar
                  while interacting with your app.
                </p>
              </li>
              <li>
                <BiCheck className="service__list-icon" />
                <p>
                  I write clean, maintainable code using best practices,
                  resulting in reliable and efficient applications that can grow
                  and adapt to your needs.
                </p>
              </li>
            </ul>
          </article>
          {/* End of Android App Development */}
          <article className="services">
            <div className="service__head">
              <h3>Flutter Development</h3>
            </div>

            <ul className="service__list">
              <li>
                <BiCheck className="service__list-icon" />
                <p>
                  Leveraging Flutter's strengths, I develop stunning apps that
                  work seamlessly on multiple platforms, saving you time and
                  resources.
                </p>
              </li>
              <li>
                <BiCheck className="service__list-icon" />
                <p>
                  I specialize in crafting bespoke mobile apps tailored to your
                  unique needs. Whether it's a social media sensation or a
                  game-changing business tool, I'll design and implement user
                  interfaces that are both beautiful and intuitive.
                </p>
              </li>
              <li>
                <BiCheck className="service__list-icon" />
                <p>
                  My commitment extends beyond launch. I provide ongoing
                  maintenance and support to ensure your app stays bug-free,
                  optimized for the latest devices, and secure.
                </p>
              </li>
            </ul>
          </article>
          {/* End of Software Engineering */}
          <article className="services">
            <div className="service__head">
              <h3>Team Collaboration & Problem Solving</h3>
            </div>

            <ul className="service__list">
              <li>
                <BiCheck className="service__list-icon" />
                <p>
                  I use GitHub, Slack, and Trello to keep projects on track.
                  Version control, clear communication, and organized workflows
                  are my jam.
                </p>
              </li>
              <li>
                <BiCheck className="service__list-icon" />
                <p>
                  I bring strong communication and problem-solving skills to the
                  table. We'll tackle any challenge together and find the best
                  approach.
                </p>
              </li>
              <li>
                <BiCheck className="service__list-icon" />
                <p>
                  My deep technical knowledge and innovative thinking ensure I
                  deliver effective solutions that make a real difference.
                </p>
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