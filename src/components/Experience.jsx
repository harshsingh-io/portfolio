import { roles, earlierRoles } from '../content/portfolio'
import logoMathongo from '../assets/img/logo-mathongo.webp'
import logoOutlier from '../assets/img/logo-outlier.webp'

const LOGO_FOR = { mathongo: logoMathongo, outlier: logoOutlier }

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="shell">
        <div className="section__head enter">
          <p className="eyebrow">Experience</p>
          <h2 className="display section__title">Where the work happened</h2>
        </div>

        <ol className="roles">
          {roles.map((role) => (
            <li className="role enter" key={role.id}>
              <div className="role__meta">
                <p className="mono role__period">
                  {role.current && (
                    <span className="role__now" aria-hidden="true" />
                  )}
                  {role.period}
                </p>
              </div>

              <div className="role__main">
                <div className="role__head">
                  <img
                    className="role__logo"
                    src={LOGO_FOR[role.id]}
                    alt=""
                    width="40"
                    height="40"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <h3 className="display role__title">{role.title}</h3>
                    <p className="role__company">
                      {role.company}
                      {role.note && (
                        <span className="role__note"> — {role.note}</span>
                      )}
                    </p>
                  </div>
                </div>

                <ul className="role__bullets measure">
                  {role.bullets.map((bullet) => (
                    <li key={bullet.text.slice(0, 32)}>{bullet.text}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}

          {/* Persist Ventures and BlueMango Labs have no `strong`-graded claims,
              so they carry no bullets. One collapsed line keeps the chronology
              continuous without leaving two empty rows on the page. */}
          <li className="role role--earlier enter">
            <div className="role__meta">
              <p className="mono role__period">{earlierRoles.label}</p>
            </div>
            <div className="role__main">
              <p className="role__earlier">
                {earlierRoles.items.map((item, i) => (
                  <span key={item.company}>
                    {i > 0 && (
                      <span className="role__sep" aria-hidden="true">
                        {' · '}
                      </span>
                    )}
                    {item.company}
                    <span className="mono role__earlier-period">
                      {' '}
                      {item.period}
                    </span>
                  </span>
                ))}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  )
}
