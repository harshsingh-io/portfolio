import { stack, anchorAliases } from '../content/portfolio'

export default function Stack() {
  return (
    <section id="stack" className="section stack">
      {anchorAliases.stack.map((alias) => (
        <span key={alias} id={alias} className="anchor-alias" aria-hidden="true" />
      ))}

      <div className="shell">
        <div className="section__head enter">
          <p className="eyebrow">Stack</p>
          <h2 className="display section__title">
            Everything here appears somewhere above
          </h2>
          <p className="section__lede measure">
            Grouped by what it was actually used for, not by how it looks on a
            keyword scan.
          </p>
        </div>

        <div className="stack__groups">
          {stack.map((group) => (
            <div
              className={`stack__group enter${group.secondary ? ' is-secondary' : ''}`}
              key={group.group}
            >
              <h3 className="stack__group-name">{group.group}</h3>
              <ul className="chips">
                {group.items.map((item) => (
                  <li className="mono chip" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
