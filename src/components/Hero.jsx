import { profile, proof } from '../content/portfolio'

// Served from public/ rather than imported, so the URLs are stable and index.html
// can <link rel="preload"> them. This is the LCP element; a hashed webpack URL is
// not knowable at author time and left it undiscoverable until the bundle ran.
//
// Width descriptors rather than 1x/2x: on a phone this slot renders the portrait
// at roughly 160 CSS px, so a density-based set was shipping a 760px-wide image
// to fill a 142px box.
const AVIF = '/img/portrait-320.avif 320w, /img/portrait-400.avif 400w, /img/portrait-760.avif 760w'
const WEBP = '/img/portrait-320.webp 320w, /img/portrait-400.webp 400w, /img/portrait-760.webp 760w'
const SIZES = '(max-width: 860px) 160px, 380px'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="shell hero__inner">
        <div className="hero__body">
          <p className="eyebrow hero__eyebrow">{profile.role}</p>

          <h1 className="display hero__name">{profile.name}</h1>

          <p className="hero__thesis">{profile.thesis}</p>

          {/* MG-003 is graded `partial` — this is the environment he works in,
              deliberately not phrased as something he built. */}
          <p className="hero__context">{profile.context.text}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href={`mailto:${profile.email}`}>
              Get in touch
            </a>
            <a
              className="btn"
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </a>
          </div>
        </div>

        <figure className="hero__portrait">
          {/* LCP element. Dimensions are explicit and the source is local, so
              there is no layout shift and no cross-origin redirect to wait on. */}
          <picture>
            <source type="image/avif" srcSet={AVIF} sizes={SIZES} />
            <source type="image/webp" srcSet={WEBP} sizes={SIZES} />
            <img
              src="/img/portrait-400.webp"
              sizes={SIZES}
              alt={`${profile.name}, ${profile.role}`}
              width="380"
              height="691"
              fetchpriority="high"
              decoding="async"
            />
          </picture>
        </figure>

        <dl className="hero__proof">
          {proof.map((item) => (
            <div className="hero__proof-item" key={item.value}>
              <dt className="mono hero__proof-value">{item.value}</dt>
              <dd className="hero__proof-label">{item.unit}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
