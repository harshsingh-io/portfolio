import { cases, alsoShipped, anchorAliases } from '../content/portfolio'
import Schematic from './Schematic'

function Case({ item }) {
  return (
    <article className="case enter" id={`case-${item.id}`}>
      <div className="case__head">
        <p className="mono case__index" aria-hidden="true">
          {item.index}
        </p>
        <h3 className="display case__title">{item.title}</h3>
        <p className="case__standfirst">{item.standfirst}</p>
      </div>

      <div className="case__detail">
        <dl className="case__metrics">
          {item.metrics.map((metric) => (
            <div className="case__metric" key={metric.label}>
              <dt className="mono case__metric-value">{metric.value}</dt>
              <dd className="case__metric-label">{metric.label}</dd>
            </div>
          ))}
        </dl>

        <div className="case__body measure">
          {item.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        {item.schematic && <Schematic />}

        <ul className="chips" aria-label="Technologies used">
          {item.stack.map((tech) => (
            <li className="mono chip" key={tech}>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function Work() {
  return (
    <section id="work" className="section work">
      {anchorAliases.work.map((alias) => (
        <span key={alias} id={alias} className="anchor-alias" aria-hidden="true" />
      ))}

      <div className="shell">
        <div className="section__head enter">
          <p className="eyebrow">Selected work</p>
          <h2 className="display section__title">
            Four things I built, and how they actually work
          </h2>
        </div>

        <div className="work__cases">
          {cases.map((item) => (
            <Case item={item} key={item.id} />
          ))}
        </div>

        <div className="work__also">
          <h3 className="eyebrow work__also-head enter">Also shipped</h3>
          <ul className="work__also-list">
            {alsoShipped.map((item) => (
              <li className="side enter" key={item.id}>
                <h4 className="display side__title">
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer noopener">
                      {item.title}
                      <svg
                        className="side__arrow"
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          d="M2.2 8.8 8.8 2.2M3.6 2.2h5.2v5.2"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  ) : (
                    item.title
                  )}
                </h4>
                <p className="side__summary">{item.summary}</p>
                <ul className="chips" aria-label="Technologies used">
                  {item.stack.map((tech) => (
                    <li className="mono chip" key={tech}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
