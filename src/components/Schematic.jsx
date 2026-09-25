// The one expressive moment on the site: the two-tier pool from MG-002, drawn.
// Numbers here must match the case metrics — 15 per pod, ~750 client connections,
// ~33 Postgres sockets.
//
// Inside `prefers-reduced-motion: no-preference` the flow strokes draw once on
// entry; otherwise it is a static diagram. It is decorative — the same facts are
// in the prose above it — so it is hidden from assistive tech and carries a
// text alternative for anyone who lands on it.

export default function Schematic() {
  return (
    <figure className="schematic">
      <svg viewBox="0 0 680 232" role="img" aria-labelledby="schematic-title">
        <title id="schematic-title">
          Application pods hold MongoDB driver pools of 15 connections each. Their
          roughly 750 Postgres client connections pass through PgBouncer, which
          collapses them onto about 33 real database sockets.
        </title>

        <g className="schematic__g" fill="none" strokeLinecap="round">
          {/* pods */}
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(8, ${14 + i * 72})`}>
              <rect
                width="122"
                height="52"
                rx="4"
                className="schematic__box"
                strokeWidth="1"
              />
              <text x="14" y="22" className="schematic__label">
                pod
              </text>
              <text x="14" y="39" className="schematic__num">
                15 conns
              </text>
            </g>
          ))}

          {/* pods -> pgbouncer */}
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M130 ${40 + i * 72} C 190 ${40 + i * 72}, 200 116, 258 116`}
              className="schematic__flow"
              strokeWidth="1.25"
              style={{ '--i': i }}
            />
          ))}

          <text x="152" y="188" className="schematic__num schematic__num--float">
            ~750 client conns
          </text>

          {/* pgbouncer */}
          <g transform="translate(258, 78)">
            <rect
              width="150"
              height="76"
              rx="4"
              className="schematic__box schematic__box--accent"
              strokeWidth="1.25"
            />
            <text x="18" y="30" className="schematic__label">
              PgBouncer
            </text>
            <text x="18" y="50" className="schematic__num">
              socket reused
            </text>
            <text x="18" y="65" className="schematic__num">
              on COMMIT
            </text>
          </g>

          {/* pgbouncer -> postgres */}
          <path
            d="M408 116 L 520 116"
            className="schematic__flow schematic__flow--trunk"
            strokeWidth="1.25"
            style={{ '--i': 3 }}
          />
          <text x="424" y="104" className="schematic__num schematic__num--float">
            ~33 sockets
          </text>

          {/* postgres */}
          <g transform="translate(520, 78)">
            <rect
              width="150"
              height="76"
              rx="4"
              className="schematic__box"
              strokeWidth="1"
            />
            <text x="18" y="30" className="schematic__label">
              PostgreSQL
            </text>
            <text x="18" y="50" className="schematic__num">
              16 vCPU × 2 + 1
            </text>
          </g>
        </g>
      </svg>
      <figcaption className="schematic__caption">
        <span className="mono schematic__fig">Fig. 1</span>
        Pool sizing follows <span className="mono">vCPU × 2 + spindles</span>. The
        client-side MongoDB pools and the PgBouncer proxy pool solve the same
        problem at two different layers.
      </figcaption>
    </figure>
  )
}
