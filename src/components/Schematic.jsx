// One figure per case: the mechanism the prose describes, drawn.
//
// All four share a viewBox of 680 x 232. That is not cosmetic — the 560px rule in
// _components.scss pans the figure horizontally with `min-width: 520px`, so a
// figure of a different width would need its own mobile treatment, and a figure
// of a different height would change the aspect ratio and reintroduce layout
// shift. Keep new figures at this size.
//
// PAINTING ORDER MATTERS, and getting it wrong is silent: `.schematic__box`
// carries a `fill`, so a box drawn after a label paints over it. Every figure
// below is ordered flows → nodes → floating figures, and `Flow`/`Node`/`Float`
// exist partly to make that order hard to get wrong.
//
// `--i` is the build-in stage, authored in reading order. `pathLength="1"` on
// every stroked path is what lets one keyframe draw paths of any length at the
// same apparent speed.
//
// EVERY NUMBER HERE IS A CITED CLAIM. This file is scanned by pass 2 of
// check-facts, so a figure invented in a diagram fails the build the same way one
// invented in the copy does. It was not scanned until 2026-10-22, which meant the
// one surface on the site made of nothing but numbers was the one surface the
// gate could not see.

function Node({ x, y, w, h, label, note, variant = '', i }) {
  return (
    <g className="schematic__part" transform={`translate(${x}, ${y})`} style={{ '--i': i }}>
      <rect
        width={w}
        height={h}
        className={`schematic__box ${variant}`}
        strokeWidth={variant.includes('accent') ? 1.25 : 1}
      />
      <text x="16" y={note ? 26 : h / 2 + 5} className="schematic__label">
        {label}
      </text>
      {note && (
        <text x="16" y="46" className="schematic__num">
          {note}
        </text>
      )}
    </g>
  )
}

function Flow({ d, variant = '', i }) {
  return (
    <path
      d={d}
      pathLength="1"
      className={`schematic__flow ${variant}`}
      strokeWidth="1.25"
      style={{ '--i': i }}
    />
  )
}

function Float({ x, y, children, accent = true, i }) {
  return (
    <text
      x={x}
      y={y}
      className={`schematic__num schematic__part${accent ? ' schematic__num--float' : ''}`}
      style={{ '--i': i }}
    >
      {children}
    </text>
  )
}

// ── Fig. 1 · pooling (case 02) ───────────────────────────────────────────────
// CORRECTED 2026-10-22, and the correction is the reason this drawing exists in
// this shape. An earlier version drew three pods carrying "15 conns" into a
// single arrow at PgBouncer, which asserted that the MongoDB driver pool and the
// Postgres proxy pool were two tiers of one path. They are two datastores with
// two unrelated pooling problems. It also invited an arithmetic objection —
// 3 pods x 15 is 45, not the ~750 downstream — because those numbers were never
// on the same path. One pod box marked x N now forks, which is honest about the
// count as well as the topology.
function Pooling() {
  return (
    <>
      <Flow d="M140 100 C 210 100, 230 48, 300 48" i={1} />
      <Flow d="M140 130 C 210 130, 228 164, 294 164" i={3} />
      <Flow d="M438 168 L 518 168" variant="schematic__flow--trunk" i={5} />

      <Node x={8} y={82} w={132} h={66} label="app pods" note="× N" i={0} />
      <Node x={300} y={20} w={190} h={58} label="MongoDB" note="16th req queues, 1500ms" i={2} />
      <Node
        x={294}
        y={136}
        w={144}
        h={64}
        label="PgBouncer"
        note="reused on COMMIT"
        variant="schematic__box--accent"
        i={4}
      />
      <Node x={518} y={136} w={154} h={64} label="PostgreSQL" note="16 vCPU × 2 + 1" i={6} />

      <Float x={178} y={72} i={7}>
        15 conns/pod
      </Float>
      <Float x={168} y={196} i={7}>
        ~750 conns
      </Float>
      <Float x={446} y={160} i={8}>
        ~33
      </Float>
    </>
  )
}

// ── Fig. 2 · cache invalidation (case 01) ────────────────────────────────────
// Two ideas, and they are the two the prose says to ask about. First, the scan is
// ONE pass: Redis filters what a scan returns rather than indexing it, so a
// narrow glob costs the same read as a broad one and there is no point issuing
// several. Second, the denylist is consulted twice — at preview and again at the
// moment of deletion — which is why it hangs below the line and reaches up into
// two separate stages instead of sitting in the pipeline as a step.
function Cache() {
  return (
    <>
      <Flow d="M166 59 L 192 59" i={1} />
      <Flow d="M360 59 L 386 59" i={3} />
      <Flow d="M538 59 L 564 59" variant="schematic__flow--trunk" i={5} />
      <Flow d="M418 148 L 418 90" variant="schematic__flow--dep" i={8} />
      <Flow d="M512 150 C 566 150, 588 126, 614 92" variant="schematic__flow--dep" i={9} />

      <Node x={6} y={28} w={160} h={62} label="a target" note="entity, glob, list" i={0} />
      <Node x={192} y={28} w={168} h={62} label="one scan pass" note="5,000 keys/batch" i={2} />
      <Node x={386} y={28} w={152} h={62} label="preview job" note="stored, not run" i={4} />
      <Node
        x={564}
        y={28}
        w={110}
        h={62}
        label="delete"
        variant="schematic__box--accent"
        i={6}
      />
      <Node
        x={360}
        y={148}
        w={176}
        h={62}
        label="denylist"
        note="re-filtered"
        variant="schematic__box--accent"
        i={7}
      />

      <Float x={540} y={20} i={6}>
        confirm
      </Float>
      <Float x={176} y={174} accent={false} i={10}>
        checked at preview
      </Float>
      <Float x={176} y={192} accent={false} i={10}>
        and again at delete
      </Float>
    </>
  )
}

// ── Fig. 3 · bucket tagging (case 03) ───────────────────────────────────────
// The shape of the argument, not the shape of the code. Scoring is the top row
// and is the part a model does; the bottom row is everything that happens to the
// model's answer afterwards, which is where the work actually is. The caps box
// is drawn in the path rather than beside it because nothing reaches a quota
// without passing through it — the model cannot route around a clamp applied
// after it has already answered.
function Buckets() {
  return (
    <>
      <Flow d="M158 50 L 186 50" i={1} />
      <Flow d="M336 50 L 364 50" i={3} />
      <Flow d="M444 80 C 444 112, 300 110, 268 138" i={5} />
      <Flow d="M356 168 L 388 168" i={7} />
      <Flow d="M556 168 L 584 168" variant="schematic__flow--trunk" i={9} />

      <Node x={8} y={22} w={150} h={56} label="2025–26 papers" i={0} />
      <Node x={186} y={22} w={150} h={56} label="chapter profile" i={2} />
      <Node x={364} y={22} w={166} h={56} label="score each" note="13,154 questions" i={4} />

      <Node
        x={180}
        y={138}
        w={176}
        h={60}
        label="caps, in code"
        note="11% corrected"
        variant="schematic__box--accent"
        i={6}
      />
      <Node x={388} y={138} w={168} h={60} label="per-chapter quota" note="30% recent ceiling" i={8} />
      <Node x={584} y={138} w={88} h={60} label="bucket" i={10} />

      <Float x={286} y={100} i={5}>
        after the model answers
      </Float>
      <Float x={548} y={44} i={11}>
        63% cached
      </Float>
    </>
  )
}

// ── Fig. 4 · quality pipeline (case 04) ──────────────────────────────────────
// The scoring is the insight and the threshold is where it pays off. A raw count
// of reports finds popular questions; a ratio of unique reporters to unique
// solvers finds questions that are actually broken. So the divider is drawn as a
// division, and the dots sort either side of the line — the muted ones below it
// are the questions the pipeline deliberately leaves alone, drawn because
// omitting them would overstate what it does.
function Quality() {
  return (
    <>
      <Flow d="M112 108 L 152 108" i={1} />
      <Flow d="M328 108 L 356 108" i={3} />
      <Flow d="M452 100 C 466 100, 470 92, 480 90" i={6} />
      <Flow d="M528 118 L 528 150" variant="schematic__flow--trunk" i={8} />

      <Node x={8} y={80} w={104} h={56} label="weekly" i={0} />
      <Node
        x={152}
        y={76}
        w={176}
        h={64}
        label="score"
        note="reports ÷ attempts"
        variant="schematic__box--accent"
        i={2}
      />

      {/* The threshold, and five questions scored against it. */}
      <g className="schematic__part" style={{ '--i': 4 }}>
        <path d="M356 108 L 452 108" className="schematic__rule" strokeWidth="1.25" />
        <circle cx={372} cy={88} r={3.4} className="schematic__dot" />
        <circle cx={396} cy={82} r={3.4} className="schematic__dot" />
        <circle cx={424} cy={90} r={3.4} className="schematic__dot" />
        <circle cx={382} cy={128} r={3.4} className="schematic__dot schematic__dot--under" />
        <circle cx={418} cy={134} r={3.4} className="schematic__dot schematic__dot--under" />
      </g>

      <Node x={480} y={62} w={96} h={56} label="flagged" i={7} />
      <Node
        x={440}
        y={150}
        w={232}
        h={58}
        label="resolve location, then write"
        note="Drive workbooks · Slack"
        i={9}
      />

      <Float x={356} y={70} i={5}>
        0.5% threshold
      </Float>
    </>
  )
}

// Keyed by the `schematic` value on a case in portfolio.js. No figure numbers
// here on purpose — Work.jsx assigns those from page order, because a number
// that has to agree with a position is a number that goes stale when the
// position changes.
//
// Each title is the figure's text alternative and has to carry the whole
// mechanism in prose: the drawing is decorative-redundant (the body above says
// the same thing), so a screen reader gets the sentence, not the geometry.
const FIGURES = {
  pooling: {
    Body: Pooling,
    title:
      'Two separate pooling paths out of the same application pods. One goes to MongoDB, where each pod holds a driver pool of 15 connections and a sixteenth concurrent request queues against a 1500 millisecond timeout. The other goes to PostgreSQL through PgBouncer, which collapses roughly 750 client connections onto about 33 real sockets.',
    caption: (
      <>
        Two datastores, two pooling strategies. Mongo is pooled in the driver, on
        each pod. Postgres is pooled in front of the database, by a proxy sized
        from <span className="mono">vCPU × 2 + spindles</span>.
      </>
    ),
  },
  cache: {
    Body: Cache,
    title:
      'A target becomes key patterns, which are resolved by a single scan pass over the keyspace in batches of 5,000 keys. What that pass matched is stored as a preview job rather than executed. Deleting is a separate confirmed step. A denylist of protected keys is consulted twice: once when the preview is built, and again at the moment of deletion.',
    caption: (
      <>
        One pass, because Redis filters a scan rather than indexing it. The
        denylist is applied twice — a key protected after the preview was taken is
        still protected at <span className="mono">delete</span>.
      </>
    ),
  },
  buckets: {
    Body: Buckets,
    title:
      'Questions from the two most recent papers are read to build a profile of what each chapter is currently being asked. Every one of 13,154 historical questions is then scored out of 100 against its own chapter profile. Caps applied in code after the model answers correct scores the model should not have given, which affected 11 percent of the run. What survives is allocated by a per-chapter quota, with at most 30 percent of any topic coming from the most recent two years, and the result becomes the chapter bucket.',
    caption: (
      <>
        The model scores. Everything after it is the part that decides what a
        student sees, and none of it is negotiable by the model:
        <span className="mono"> caps</span> apply to an answer already given.
      </>
    ),
  },
  quality: {
    Body: Quality,
    title:
      'A weekly run scores every question by the ratio of unique users who reported it to unique users who attempted it. Questions above a 0.5 percent threshold are flagged; those below are left alone. For each flagged question the pipeline resolves where it lives in the product catalogue, then writes to the Drive workbooks and notifies Slack.',
    caption: (
      <>
        A ratio, not a count. Report volume finds popular questions;
        <span className="mono"> reports ÷ attempts</span> finds broken ones.
      </>
    ),
  },
}

export default function Schematic({ kind, n }) {
  const figure = FIGURES[kind]
  // A case can carry a `schematic` key this file has no figure for — render
  // nothing rather than crash the section. Work.jsx also guards, so this only
  // fires on a typo in portfolio.js.
  if (!figure) return null

  const { Body, title, caption } = figure
  const titleId = `schematic-${kind}-title`

  return (
    // `enter` so useReveal observes the FIGURE, not the case article around it.
    // See the build-in comment in _components.scss: inheriting the trigger from
    // the article meant the sequence finished ~580px below the fold.
    <figure className="schematic enter">
      <svg viewBox="0 0 680 232" role="img" aria-labelledby={titleId}>
        <title id={titleId}>{title}</title>
        <g className="schematic__g" fill="none" strokeLinecap="round">
          <Body />
        </g>
      </svg>
      <figcaption className="schematic__caption">
        <span className="mono schematic__fig">Fig. {n}</span>
        {caption}
      </figcaption>
    </figure>
  )
}
