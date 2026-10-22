// The one expressive moment on the site: the pooling from MG-002, drawn.
//
// CORRECTED 2026-10-22. The previous version drew pods carrying "15 conns" with a
// single arrow into PgBouncer, which said the MongoDB driver pool and the Postgres
// proxy pool were two tiers of one path. They are two datastores with two separate
// pooling problems, and that diagram was the clearest statement of the wrong idea
// on the page. It also invited an arithmetic objection: 3 drawn pods x 15 is 45,
// not the ~750 labelled downstream, because those two numbers were never on the
// same path. One pod box marked x N now carries both branches, which is honest
// about the count as well.
//
// Numbers must match the case metrics: 15 per pod, ~750 client connections,
// ~33 Postgres sockets. Inside `prefers-reduced-motion: no-preference` the flow
// strokes draw once on entry; otherwise it is static. It is decorative, the same
// facts are in the prose above, so it is hidden from assistive tech behind a text
// alternative.

export default function Schematic() {
  return (
    <figure className="schematic">
      <svg viewBox="0 0 680 232" role="img" aria-labelledby="schematic-title">
        <title id="schematic-title">
          Two separate pooling paths out of the same application pods. One goes to
          MongoDB, where each pod holds a driver pool of 15 connections and a
          sixteenth concurrent request queues against a 1500 millisecond timeout.
          The other goes to PostgreSQL through PgBouncer, which collapses roughly
          750 client connections onto about 33 real sockets.
        </title>

        <g className="schematic__g" fill="none" strokeLinecap="round">
          {/* Painting order matters: .schematic__box carries a fill, so any box
              drawn after a label covers it. Flows, then boxes, then every
              floating label last. */}
          <path
            d="M140 100 C 210 100, 230 48, 300 48"
            className="schematic__flow"
            strokeWidth="1.25"
            style={{ '--i': 0 }}
          />
          <path
            d="M140 130 C 210 130, 228 164, 294 164"
            className="schematic__flow"
            strokeWidth="1.25"
            style={{ '--i': 1 }}
          />
          <path
            d="M438 168 L 518 168"
            className="schematic__flow schematic__flow--trunk"
            strokeWidth="1.25"
            style={{ '--i': 2 }}
          />

          <g transform="translate(8, 82)">
            <rect width="132" height="66" className="schematic__box" strokeWidth="1" />
            <text x="16" y="26" className="schematic__label">
              app pods
            </text>
            <text x="16" y="46" className="schematic__num">
              × N
            </text>
          </g>

          <g transform="translate(300, 20)">
            <rect width="158" height="58" className="schematic__box" strokeWidth="1" />
            <text x="18" y="26" className="schematic__label">
              MongoDB
            </text>
            <text x="18" y="44" className="schematic__num">
              16th req queues, 1500ms
            </text>
          </g>

          <g transform="translate(294, 136)">
            <rect
              width="144"
              height="64"
              className="schematic__box schematic__box--accent"
              strokeWidth="1.25"
            />
            <text x="18" y="26" className="schematic__label">
              PgBouncer
            </text>
            <text x="18" y="46" className="schematic__num">
              reused on COMMIT
            </text>
          </g>

          <g transform="translate(518, 136)">
            <rect width="154" height="64" className="schematic__box" strokeWidth="1" />
            <text x="18" y="26" className="schematic__label">
              PostgreSQL
            </text>
            <text x="18" y="46" className="schematic__num">
              16 vCPU × 2 + 1
            </text>
          </g>

          <text x="178" y="72" className="schematic__num schematic__num--float">
            15 conns/pod
          </text>
          <text x="168" y="196" className="schematic__num schematic__num--float">
            ~750 conns
          </text>
          <text x="446" y="160" className="schematic__num schematic__num--float">
            ~33
          </text>
        </g>
      </svg>
      <figcaption className="schematic__caption">
        <span className="mono schematic__fig">Fig. 1</span>
        Two datastores, two pooling strategies. Mongo is pooled in the driver, on
        each pod. Postgres is pooled in front of the database, by a proxy sized
        from <span className="mono">vCPU × 2 + spindles</span>.
      </figcaption>
    </figure>
  )
}
