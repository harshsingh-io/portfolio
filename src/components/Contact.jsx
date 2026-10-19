import { useRef, useState } from 'react'
import { profile } from '../content/portfolio'

// Public by design and rate-limited on Web3Forms' side. Carried over unchanged
// from the previous build, which worked.
const ACCESS_KEY = 'c2b5be86-e5ec-4f7a-9582-fe7e177202ad'

export default function Contact() {
  const form = useRef(null)
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  async function onSubmit(event) {
    event.preventDefault()
    setStatus({ state: 'sending', message: '' })

    try {
      const data = new FormData(form.current)
      data.append('access_key', ACCESS_KEY)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const result = await response.json()

      if (result.success) {
        form.current.reset()
        setStatus({
          state: 'success',
          message: 'Thanks, that’s sent. I’ll reply from my inbox.',
        })
      } else {
        setStatus({
          state: 'error',
          message: `That didn’t send: ${result.message || 'unknown error'}. Email works too.`,
        })
      }
    } catch (error) {
      setStatus({
        state: 'error',
        message: `That didn’t send: ${error.message || 'network error'}. Email works too.`,
      })
    }
  }

  const sending = status.state === 'sending'

  return (
    <section id="contact" className="section contact">
      <div className="shell contact__inner">
        <div className="contact__lead">
          <div className="section__head enter">
            <h2 className="display section__title">Get in touch</h2>
          </div>

          <ul className="contact__direct enter">
            <li>
              <span className="eyebrow">Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <span className="eyebrow">LinkedIn</span>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer noopener">
                in/harshsingh-io
              </a>
            </li>
            <li>
              <span className="eyebrow">GitHub</span>
              <a href={profile.links.github} target="_blank" rel="noreferrer noopener">
                @harshsingh-io
              </a>
            </li>
            <li>
              <span className="eyebrow">Based in</span>
              <span>{profile.location}</span>
            </li>
          </ul>
        </div>

        <form ref={form} onSubmit={onSubmit} className="contact__form enter">
          <div className="field">
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" type="text" name="name" required disabled={sending} />
          </div>

          <div className="field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              disabled={sending}
            />
          </div>

          <div className="field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows="6"
              required
              disabled={sending}
            />
          </div>

          <button type="submit" className="btn btn--primary" disabled={sending}>
            {sending ? 'Sending…' : 'Send message'}
          </button>

          {/* Announced to screen readers without stealing focus. */}
          <p
            className={`form-status is-${status.state}`}
            role="status"
            aria-live="polite"
          >
            {status.message}
          </p>
        </form>
      </div>
    </section>
  )
}
