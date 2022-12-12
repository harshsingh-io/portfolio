import React from 'react'
import './services.css'
import {BiCheck} from 'react-icons/bi'

const Services = () => {
  return (
    <section id='services'>
      <section id='services'>
        <h5>What I Offer</h5>
        <h2>Services</h2>

        <div className="container services__container">
          <article className='services'>
            <div className='service__head'>
              <h3>App Development</h3>
            </div>

            <ul className='service__list'>
            <li>
                <BiCheck className='service__list-icon' />
                <p>Designing</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Development</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Enhancement</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>I integrate the developed apps with the back-end web service</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>All supported Android OS</p>
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
                <p>In-depth understanding of DSA</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>OOPs Concept</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Learning skills quickly</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Excellent analytical problem solving communication and inter-personal skills</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Experience with Object Oriented programmings such as core Java SE, including Collections API, threads, multithreading,</p>
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
                <p>C</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Java</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>CPP</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Kotlin</p>
              </li>
              <li>
                <BiCheck className='service__list-icon' />
                <p>Python</p>
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