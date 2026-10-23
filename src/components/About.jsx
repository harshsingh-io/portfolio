import { about, profile, anchorAliases } from '../content/portfolio'
import aboutWebp from '../assets/img/about-430.webp'
import aboutWebp2x from '../assets/img/about-860.webp'

// The body comes FIRST in the DOM and the photograph second, but the grid
// places the photograph in columns 1-4 and the body in 6-12. Source order is
// what the stacked layout gets — heading, then the positions, then the
// photograph — and explicit placement is what keeps the picture on the left of
// the desktop composition. The hero puts its figure on the right; this section
// mirrors it rather than repeating it.
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

          {/* An ordered list, not a run of paragraphs: these are three
              positions and the numerals say so. <ol> because the order is
              load-bearing — the first is what the job is, the second how it
              starts, the third where the judgment goes. */}
          <ol className="about__points measure enter">
            {about.paragraphs.map((paragraph, i) => (
              <li className="about__point" key={paragraph.slice(0, 32)}>
                <span className="mono about__point-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p>{paragraph}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="about__side enter">
          {/* The same drafting plate the case figures use, so the one
              photograph on the page sits in the page's own register instead of
              floating as a bare square. 3:4, the asset's native ratio — the
              previous treatment forced it to a square crop. */}
          <figure className="about__figure">
            <img
              src={aboutWebp}
              srcSet={`${aboutWebp} 1x, ${aboutWebp2x} 2x`}
              alt={`${profile.name} at work`}
              width="430"
              height="573"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="mono about__caption">
              {profile.name} · Bengaluru
            </figcaption>
          </figure>

          <p className="about__aside">{about.aside}</p>
        </div>
      </div>
    </section>
  )
}
