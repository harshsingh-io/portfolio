import { cases, alsoShipped, anchorAliases } from '../content/portfolio'
import Schematic from './Schematic'

// Spelled out because the heading is prose, not a stat. Falls back to the digit
// rather than rendering "undefined" if the list ever outgrows the list.
const NUMBER_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven']
const CASE_COUNT_WORD = NUMBER_WORDS[cases.length] ?? String(cases.length)

// Fig. numbers come from page order, not from the figure definitions. Hardcoding
// them in Schematic.jsx put "Fig. 2" on the first case the moment a second figure
// was added — the same defect as spelling the case count above by hand. Reorder a
// case or drop one and the captions renumber themselves.
const FIGURE_NUMBERS = new Map(
  cases.filter((c) => c.schematic).map((c, i) => [c.schematic, i + 1])
)

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

        {item.schematic && (
          <Schematic kind={item.schematic} n={FIGURE_NUMBERS.get(item.schematic)} />
        )}

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
          {/* Counted from the array, not typed. It has already been wrong twice:
              "Four things I built" survived the fifth case being added, and
              "Five systems" survived the LMS case being demoted to Also shipped
              on 2026-10-22. A number in prose that must equal an array length is
              a claim like any other, so it is derived rather than maintained. */}
          <h2 className="display section__title">
            {CASE_COUNT_WORD} systems, and how they actually work
          </h2>
        </div>

        <div className="work__cases">
          {cases.map((item) => (
            <Case item={item} key={item.id} />
          ))}
        </div>

        <div className="work__also">
          <h3 className="work__also-head enter">Also shipped</h3>
          <ol className="broadsheet broadsheet--compact">
            {alsoShipped.map((item) => (
              <li className="broadsheet__row enter" key={item.id}>
                <p className="broadsheet__kicker">{item.kicker}</p>

                <h4 className="display broadsheet__title">
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer noopener">
                      {item.title}
                      <svg
                        className="broadsheet__arrow"
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

                <p className="broadsheet__summary measure">{item.summary}</p>

                <ul className="chips" aria-label="Technologies used">
                  {item.stack.map((tech) => (
                    <li className="mono chip" key={tech}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
