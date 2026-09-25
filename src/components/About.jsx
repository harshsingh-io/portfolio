import { about, profile, anchorAliases } from '../content/portfolio'
import aboutWebp from '../assets/img/about.webp'
import aboutWebp2x from '../assets/img/about@2x.webp'

export default function About() {
  return (
    <section id="about" className="section about">
      {anchorAliases.about.map((alias) => (
        <span key={alias} id={alias} className="anchor-alias" aria-hidden="true" />
      ))}

      <div className="shell about__inner">
        <div className="about__body">
          <div className="section__head enter">
            <p className="eyebrow">About</p>
            <h2 className="display section__title">How I work</h2>
          </div>

          <div className="about__prose measure enter">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <figure className="about__figure enter">
          <img
            src={aboutWebp}
            srcSet={`${aboutWebp} 1x, ${aboutWebp2x} 2x`}
            alt={`${profile.name} outdoors`}
            width="480"
            height="480"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  )
}
