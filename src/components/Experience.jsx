import { roles, earlierRoles } from '../content/portfolio'
import logoMathongo from '../assets/img/logo-mathongo.webp'
import logoOutlier from '../assets/img/logo-outlier.webp'

const LOGO_FOR = { mathongo: logoMathongo, outlier: logoOutlier }

// Broadsheet story rows. One full-width column per role, hairline divider between
// rows, bold small metadata carrying the date. The kicker leads because a reader
// scanning a work history reads chronology first and the role second.
export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="shell">
        <div className="section__head enter">
          <h2 className="display section__title">Where the work happened</h2>
        </div>

        <ol className="broadsheet">
          {roles.map((role) => (
            <li className="broadsheet__row enter" key={role.id}>
              <p className="broadsheet__kicker">
                {role.current && (
                  <span className="broadsheet__now" aria-hidden="true" />
                )}
                {role.period}
              </p>

              <div className="broadsheet__lede">
                <img
                  className="broadsheet__mark"
                  src={LOGO_FOR[role.id]}
                  alt=""
                  width="40"
                  height="40"
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="display broadsheet__title">
                  {role.title}
                  <span className="broadsheet__org">
                    {role.company}
                    {role.note && (
                      <span className="broadsheet__note"> ({role.note})</span>
                    )}
                  </span>
                </h3>
              </div>

              <ul className="broadsheet__points measure">
                {role.bullets.map((bullet) => (
                  <li
                    key={bullet.text.slice(0, 32)}
                    className={bullet.secondary ? 'is-secondary' : undefined}
                  >
                    {bullet.text}
                  </li>
                ))}
              </ul>
            </li>
          ))}

          {/* Persist Ventures and BlueMango Labs have no `strong`-graded claims,
              so they carry no bullets. One collapsed line keeps the chronology
              continuous without leaving two empty rows on the page. */}
          <li className="broadsheet__row broadsheet__row--quiet enter">
            <p className="broadsheet__kicker">{earlierRoles.label}</p>
            <p className="broadsheet__earlier">
              {earlierRoles.items.map((item, i) => (
                <span key={item.company}>
                  {i > 0 && (
                    <span className="broadsheet__sep" aria-hidden="true">
                      {' · '}
                    </span>
                  )}
                  {item.company}
                  <span className="broadsheet__earlier-period">
                    {' '}
                    {item.period}
                  </span>
                </span>
              ))}
            </p>
          </li>
        </ol>
      </div>
    </section>
  )
}
