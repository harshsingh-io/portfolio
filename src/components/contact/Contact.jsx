import './contact.css'
import { MdOutlineEmail } from 'react-icons/md'
import { FaWhatsapp } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import { TbBrandTelegram } from 'react-icons/tb'
import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])
  const form = useRef()
  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm('service_3fi7qrd', 'template_5k9zfma', form.current, {
        publicKey: 'jWyP779mY_ZDKBnxq',
      })
      .then(
        () => {
          console.log('SUCCESS!')
        },
        (error) => {
          console.log('FAILED...', error.text)
        }
      )
    e.target.reset()
  }
  return (  
    <section id="contact">
      <h5>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={[
            'G',
            'e',
            't',
            ' ',
            'I',
            'n',
            ' ',
            'T',
            'o',
            'u',
            'c',
            'h',
          ]}
          idx={15}
        />
      </h5>
      <h2>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'M', 'e']}
          idx={15}
        />
      </h2>
      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <MdOutlineEmail className="contact__option-icon" />
            <h4>Email</h4>
            <h4>harshsingh704888@gmail.com</h4>
            <a href="mailto:harshsingh704888@gmail.com">SEND A MESSAGE</a>
          </article>
          <article className="contact__option">
            <FaWhatsapp className="contact__option-icon" />
            <h4>WhatsApp</h4>
            <h5>+917047272436</h5>
            <a href="https://wa.me/917047272436?text=Hello%20Harsh%2C%20I%20have%20some%20queries%20related%20to%20your%20work%3F">
              SEND A MESSAGE
            </a>
          </article>
          <article className="contact__option">
            <TbBrandTelegram className="contact__option-icon" />
            <h4>Telegram</h4>
            <h5>@harshsingh_io</h5>
            <a href="https://telegram.me/harshsingh_io">SEND A MESSAGE</a>
          </article>
        </div>
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
          />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea
            name="message"
            rows="7"
            placeholder="Your Message"
            required
          ></textarea>
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
