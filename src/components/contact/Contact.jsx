import './contact.css'
import { MdOutlineEmail } from 'react-icons/md'
import { FaWhatsapp } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import { TbBrandTelegram } from 'react-icons/tb'
import React, { useRef } from 'react'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  const form = useRef()

  const sendEmail = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    setMessageType('')

    try {
      const formData = new FormData(form.current)

      // Add Web3Forms access key (safe to expose - it's rate-limited and public by design)
      formData.append('access_key', 'c2b5be86-e5ec-4f7a-9582-fe7e177202ad')

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        console.log('Web3Forms Success:', data)
        setMessage('Thank you! Your message has been sent successfully.')
        setMessageType('success')
        form.current.reset()
      } else {
        console.error('Web3Forms Error:', data)
        setMessage(
          `Failed to send message: ${data.message || 'Unknown error'}`
        )
        setMessageType('error')
      }
    } catch (error) {
      console.error('Network Error:', error)
      setMessage(
        `Failed to send message: ${error.message || 'Network error. Please try again.'
        }`
      )
      setMessageType('error')
    } finally {
      setIsLoading(false)
      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage('')
        setMessageType('')
      }, 5000)
    }
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
            disabled={isLoading}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            disabled={isLoading}
          />
          <textarea
            name="message"
            rows="7"
            placeholder="Your Message"
            required
            disabled={isLoading}
          ></textarea>

          {/* Message display */}
          {message && (
            <div className={`form-message ${messageType}`}>{message}</div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
