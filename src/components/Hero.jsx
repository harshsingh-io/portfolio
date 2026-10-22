import { useRef } from 'react'
import { profile, proof, facts } from '../content/portfolio'
import CtaInk from './CtaInk'

// Served from public/ rather than imported, so the URLs are stable and index.html
// can <link rel="preload"> them. This is the LCP element; a hashed webpack URL is
// not knowable at author time and left it undiscoverable until the bundle ran.
//
// Still transparent cut-outs, deliberately — the background was removed on
// purpose and putting a plate back behind it was tried and rejected. What the
// asset carries instead is a baked shadow lift so the dark suit separates from
// the dark page; see the contrast note on .hero__portrait img.
//
// Width descriptors rather than 1x/2x: on a phone this slot renders the portrait
// at roughly 160 CSS px, so a density-based set was shipping a 760px-wide image
// to fill a 142px box.
const AVIF = '/img/portrait-320.avif 320w, /img/portrait-400.avif 400w, /img/portrait-760.avif 760w'
const WEBP = '/img/portrait-320.webp 320w, /img/portrait-400.webp 400w, /img/portrait-760.webp 760w'
const SIZES = '(max-width: 860px) 200px, 380px'


// The artwork behind the portrait, built to Harsh's reference. Decorative in
// full, so it is aria-hidden; everything sits behind the figure at z-index 0.
//
// GEOMETRY IS PLACED AGAINST A MEASURED OCCUPANCY MAP of the asset's alpha, not
// by eye. In this 1200x925 box the figure spans x 460-1158 from y 53, its head
// occupies x 704-896 down to 45% height, and the torso widens below that. So
// the two labels and the bracket live left of x=460 and right of x=1018, which
// are clear at those heights, and the arch top sits at y=210 — below the head
// top at y=123, which is what lets the head break out of it.
//
// The arc is deliberately allowed to run behind the shoulder. Passing behind is
// not covering: the figure is opaque there and paints over it, which is what
// the reference shows.
//
// The arch is the one curve in a system that is otherwise radius-0 everywhere.
// It is a drawn shape rather than UI chrome, which is the distinction that
// keeps it from reading as a rounded corner.
function Artwork() {
  return (
    <div className="hero__art" aria-hidden="true">
      <svg viewBox="0 0 1200 925" preserveAspectRatio="xMidYMax meet" focusable="false">
        <defs>
          <pattern id="ha-dots" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="1.6" cy="1.6" r="1.6" className="hero__art-dot-fill" />
          </pattern>
          <radialGradient id="ha-fade" cx="56%" cy="44%" r="64%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="58%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="ha-mask">
            <rect width="1200" height="925" fill="url(#ha-fade)" />
          </mask>
        </defs>

        {/* The arch. Top at y=210, under the head, over the shoulders. */}
        <path d="M470 925 V 550 A 340 340 0 0 1 1150 550 V 925 Z" className="hero__art-arch" />

        {/* Grid over the arch, faded out before it reaches the heading. */}
        <rect width="1200" height="925" fill="url(#ha-dots)" mask="url(#ha-mask)" />

        {/* FIG. 01, upper left, with its leader angling in toward the figure. */}
        <text x="175" y="215" className="hero__art-label">FIG. 01</text>
        <path d="M175 238 H 390 L 452 308" className="hero__art-line" />
        <circle cx="175" cy="238" r="5" className="hero__art-node" />
        <circle cx="452" cy="308" r="5" className="hero__art-node" />

        {/* Left bracket. */}
        <path d="M268 390 V 788 M232 760 H 352" className="hero__art-line" />
        <circle cx="268" cy="390" r="5" className="hero__art-node" />
        <circle cx="232" cy="760" r="5" className="hero__art-node" />

        {/* BENGALURU / IST. Lifted to 37% height after the first placement at
            44% straddled the row where the shoulder starts and lost its left
            end behind the figure. At rows 8-9 the frame is clear from col 12
            out, i.e. from x=879, and the label starts at x=963. */}
        <text x="1185" y="375" textAnchor="end" className="hero__art-label">
          BENGALURU / IST
        </text>
        <path d="M1046 400 H 1180" className="hero__art-line" />
        <circle cx="1180" cy="400" r="5" className="hero__art-node" />
        <circle cx="1046" cy="400" r="5" className="hero__art-node" />

        {/* The arc, running behind the shoulder. */}
        <path d="M1035 535 A 175 175 0 0 1 1062 872" className="hero__art-line" />

        {/* Registration crosses. */}
        <path
          d="M344 173 h 22 M355 162 v 22
             M987 281 h 22 M998 270 v 22
             M234 630 h 22 M245 619 v 22
             M1063 822 h 22 M1074 811 v 22"
          className="hero__art-line hero__art-line--cross"
        />
      </svg>
    </div>
  )
}

export default function Hero() {
  const actionsRef = useRef(null)

  return (
    <section id="home" className="hero">
      <div className="shell hero__inner">
        <div className="hero__body">
          <p className="eyebrow hero__eyebrow">{profile.role}</p>

          <h1 className="display hero__name">{profile.name}</h1>

          {/* Segments, not a string: the two nouns carrying the positioning hold
              full ink, the connective tissue drops to secondary. <em> rather than
              <span> because the emphasis is semantic, not decoration. */}
          <p className="hero__thesis">
            {profile.thesis.map((part, i) =>
              part.em ? <em key={i}>{part.text}</em> : part.text
            )}
          </p>

          {/* MG-003 is graded `partial`, this is the environment he works in,
              deliberately not phrased as something he built. */}
          <p className="hero__context">{profile.context.text}</p>

          {/* REVERSED 2026-10-22. The 2026-09-25 decision was two CTAs and no
              résumé, because the only candidates were a dead host
              (harshsingh-io.github.io/resume/, 301 to a name that no longer
              resolves) and a PDF from c50867a that predates fact-grading and
              still carries the retired claims. Both reasons were about those
              two artefacts, not about having a résumé.

              /resume.html is generated by scripts/build-resume.mjs from
              src/content/portfolio.js on every prebuild, so it renders the same
              gated copy as this page and cannot drift from it or reintroduce a
              retired figure. It is a print-to-PDF page, not a PDF. */}
          {/* The ink canvas is a sibling of the buttons, not a wrapper, so it
              cannot affect their layout or their hit areas. It paints behind
              them and is pointer-events: none. */}
          <div className="hero__actions" ref={actionsRef}>
            <CtaInk targetRef={actionsRef} />
            <a className="btn btn--primary" href={`mailto:${profile.email}`}>
              Get in touch
            </a>
            <a className="btn" href="/resume.html" target="_blank" rel="noreferrer">
              Résumé
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

        {/* The block is a ::before on the figure, not an element: it is pure
            decoration and should not be in the DOM for a screen reader to meet.
            `inset: 22%` from the top is what lets the head break the top edge —
            the figure is not boxed, it stands in front of a panel. */}
        <figure className="hero__portrait">
          <Artwork />
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
              height="475"
              fetchpriority="high"
              decoding="async"
            />
          </picture>
        </figure>

        {/* Identity strip. A <dl> because it is genuinely label/value pairs, which
            also gives a screen reader the pairing for free. */}
        <dl className="hero__facts">
          {facts.map((fact) => (
            <div className="hero__fact" key={fact.label}>
              <dt className="eyebrow hero__fact-label">{fact.label}</dt>
              <dd className="hero__fact-value">
                {fact.links
                  ? fact.links.map((link) => (
                      <a
                        key={link.text}
                        href={link.href}
                        {...(link.href.startsWith('http')
                          ? { target: '_blank', rel: 'noreferrer noopener' }
                          : {})}
                      >
                        {link.text}
                      </a>
                    ))
                  : fact.lines.map((line) => <span key={line}>{line}</span>)}
              </dd>
            </div>
          ))}
        </dl>

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
