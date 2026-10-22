// Single source of copy for the site.
//
// Every claim carries the facts.yaml IDs it derives from. `scripts/check-facts.mjs`
// runs on `prebuild` and fails the build if any referenced ID is missing or is not
// graded `strong`, with a narrow allowlist for the one `partial` fact Harsh
// approved. Nothing goes on this page that cannot be defended in a room.
//
// Grading rules that constrain the wording here:
//   MG-002  scope: contributed-a-part  → verb is "Tuned", never "Designed"
//   MG-003  partial                    → environment context only, never ownership

export const profile = {
  name: 'Harsh Singh',
  role: 'Backend & Data Engineer',
  // CORRECTED 2026-10-22. This used to name a MathonGo product that does not
  // exist. MathonGo is the parent and a course platform; MARKS is the practice
  // platform; Quizrr is the test-series platform. Inventing a product name for
  // the company you work at is the kind of error an interviewer spots in five
  // seconds, and it was in the single most prominent sentence on the site.
  // (Paraphrased deliberately: pass 4 now denylists the old wording and reads
  // comments, so quoting it here would fail the build.)
  // MARKS is named rather than described because the cases below say "the MARKS
  // backend" repeatedly — a reader meeting it cold in case 02 is better served
  // by having met it here. Breadth across the other products stays where it
  // belongs, in the Experience bullets (MG-016).
  //
  // Thesis, in segments so the two nouns that carry the positioning can hold full
  // ink while the connective tissue drops to secondary. Both halves matter equally
  //, backend AND data is the whole claim, so this emphasises rather than mutes
  // either side. Derived from MG-001 (backend) + MG-012 (pipelines) + MG-019 (both).
  thesis: [
    { text: 'I build the ' },
    { text: 'services', em: true },
    { text: ' that run MARKS, MathonGo’s practice platform, and the ' },
    { text: 'pipelines', em: true },
    { text: ' that keep its data honest.' },
  ],
  // MG-003 is graded `partial`: defensible as the environment he works in, never
  // as something he built. "The backend I work on serves" keeps it environmental, 
  // it must never become "built a backend serving". The role itself moved to the
  // facts strip below, so this line now carries only the scale context.
  context: {
    text: 'The backend I work on serves 300K+ daily active users.',
    factIds: ['MG-003'],
  },
  location: 'Bengaluru, India',
  email: 'harshsingh704888@gmail.com',
  links: {
    github: 'https://github.com/harshsingh-io',
    linkedin: 'https://www.linkedin.com/in/harshsingh-io',
    telegram: 'https://telegram.me/harshsingh_io',
  },
}

// Scannable identity strip, sitting between the hero and the proof numbers.
// Four things a hiring manager needs before reading a word of prose: what he does
// now, where he is (with the UTC offset that actually decides overlap), what he
// works in, and how to reach him. Deliberately carries no availability line.
//
// The stack line repeats the Stack section on purpose, this strip is an index,
// and an index that makes you scroll to find the answer has failed.
export const facts = [
  { label: 'Now', lines: ['SDE-1 · MathonGo'] },
  { label: 'Based', lines: ['Bengaluru, India', 'IST · UTC+5:30'] },
  {
    label: 'Stack',
    // Node joined this strip 2026-10-22, late. The strip is the index a scanner
    // reads instead of scrolling, and it was omitting the language of the LEAD
    // case while the About section two screens down had the same gap. Both are
    // backed by MG-031. Three short lines rather than two long ones: an index
    // that wraps mid-list is harder to scan than one that breaks where you would.
    lines: ['Java · Spring Boot', 'Node.js · Python', 'PostgreSQL · MongoDB · Redis'],
  },
  {
    label: 'Links',
    links: [
      { text: 'GitHub', href: 'https://github.com/harshsingh-io' },
      { text: 'LinkedIn', href: 'https://www.linkedin.com/in/harshsingh-io' },
      { text: 'Email', href: 'mailto:harshsingh704888@gmail.com' },
    ],
  },
]

// Three numbers, above the fold. Each is `strong` and each belongs to a different
// piece of work, so they read as range rather than one project restated.
export const proof = [
  { value: '250K+', unit: 'questions reclassified', factIds: ['MG-013'] },
  { value: '40→8', unit: 'hrs/week of manual work', factIds: ['MG-021'] },
  { value: '2,500+', unit: 'videos under automated monitoring', factIds: ['MG-011'] },
]

export const cases = [
  {
    id: 'cache-invalidation',
    index: '01',
    title: 'Clearing a cache without clearing the wrong thing',
    standfirst:
      'Invalidating part of a shared Redis keyspace by hand is one wildcard away from flushing something load-bearing. This makes you look before it lets you delete, and refuses the keys nobody should be touching.',
    factIds: ['MG-031', 'MG-032', 'MG-033', 'MG-034'],
    stack: ['Node.js', 'Redis', 'MongoDB', 'Express'],
    metrics: [
      { value: '20', label: 'product areas mapped before any of it was built', factIds: ['MG-034'] },
      { value: '5,000', label: 'keys per scan batch, nothing held in memory', factIds: ['MG-033'] },
    ],
    body: [
      'You cannot safely clear what you have not mapped, so the first thing I wrote was not the tool. It was an inventory of the keyspace: which cache keys each of 20 product areas owns, and what breaks if they go. Everything after that is built against it.',
      'Clearing runs in two steps. A preview resolves whatever you are targeting into key patterns, walks the keyspace, and stores what it found as a job. Deleting is a separate call against that stored job, so the destructive step is something you confirm rather than something you trigger.',
      'The walk is one pass. Redis matches patterns by filtering what a scan returns, not by indexing, so it reads every key no matter how narrow the glob is. Checking N patterns with N scans costs N full traversals of the keyspace; one streaming pass that matches all of them in process costs one. Batches of 5,000, nothing accumulated in memory.',
      'The part I would want to be asked about is the denylist. Protected keys are filtered again at the moment of deletion, not only during preview, because a preview is a snapshot: rules change, keyspaces change, and acting on a stored preview means deleting against a stale picture of what is safe. Anything the filter withholds is reported back counted by the rule that caught it, so a refusal is visible instead of silent.',
    ],
    schematic: 'cache',
  },
  {
    id: 'pooling',
    index: '02',
    title: 'Surviving exam-day load',
    standfirst:
      'A live test on Quizrr puts tens of thousands of submissions through the platform in the same few minutes. Two datastores, two different ways of not falling over.',
    factIds: ['MG-002', 'MG-001', 'MG-003'],
    stack: ['Java', 'Spring Boot', 'MongoDB', 'PostgreSQL', 'PgBouncer'],
    metrics: [
      { value: '15', label: 'connections per pod', factIds: ['MG-002'] },
      { value: '1500ms', label: 'queue timeout before failure', factIds: ['MG-002'] },
      { value: '750→33', label: 'pod connections to Postgres sockets', factIds: ['MG-002'] },
    ],
    // PRODUCT CORRECTED 2026-10-22: this is QUIZRR, the test-series platform,
    // not MARKS. The fact itself had the wrong product, so the page inherited it.
    // Cases 01, 03 and 04 are MARKS; this one is not. Both are MathonGo products
    // and they are not interchangeable.
    //
    // "Tuned" is correct and settled: confirmed 2026-10-22 that he tuned an
    // existing setup rather than designing it, so scope stays contributed-a-part
    // and Designed/Architected stay banned.
    body: [
      'The Quizrr backend talks to two datastores, and each needed a different answer to the same question: what happens when ten thousand people submit at once. Tuned both so the big timed events (AYJR, AYNR) degrade instead of exhausting a database.',
      'On the client side, each pod holds a MongoDB driver pool of 15 connections opened at startup, so a checkout costs under 0.1ms. The 16th concurrent request queues against a 1500ms timeout rather than opening an unbounded connection or crashing the pod.',
      'Postgres is a separate problem with a separate answer. PgBouncer sits in front of it, so roughly 750 persistent client connections collapse onto about 33 real TCP sockets, with a socket reassigned the moment a transaction commits. The pool is sized from the standard formula: vCPU × 2 + spindles, or 16 × 2 + 1.',
    ],
    schematic: 'pooling',
  },
  // REPLACED the classification case 2026-10-22. Harsh's own read was that the
  // tagging pipeline was "just a normal task" — an ETL with a model in it. This
  // is the same domain and a different class of work: every selection decision
  // here has a measurement behind it, and the guardrails are the interesting
  // part. Classification moved to Also shipped rather than being dropped; its
  // numbers are still real.
  //
  // MG-040..044 are graded strong/solo, AI-ASSISTED IMPLEMENTATION, his design.
  // `solo` makes "Designed" available, which raises rather than lowers the bar:
  // everything below has to be defensible unaided.
  {
    id: 'bucket-tagging',
    index: '03',
    title: 'Which questions are worth a student’s time',
    standfirst:
      'A student cannot practise seventeen thousand past questions. Ranking them by difficulty is someone’s opinion; ranking them by how closely they resemble what the exam is asking now is a measurement.',
    factIds: ['MG-040', 'MG-041', 'MG-042', 'MG-043'],
    stack: ['Node.js', 'MongoDB', 'OpenRouter'],
    metrics: [
      { value: '13,154', label: 'questions scored against their chapter', factIds: ['MG-040'] },
      { value: '11%', label: 'corrected by a cap the model cannot override', factIds: ['MG-041'] },
      { value: '63%', label: 'of input tokens served from cache', factIds: ['MG-043'] },
    ],
    body: [
      'Two curated buckets hang off every JEE Main chapter in MARKS, behind the premium tier, and the question they answer is: if a student can only do a few dozen questions here, which ones? Each of 13,154 past questions is scored out of 100 for how likely its topic, format and reasoning are to show up again, judged against a profile of what the last two years of papers actually asked.',
      'A model asked to score will rationalise, so the limits live in code where it cannot argue with them. The one I would want to be asked about refuses a high score when a question’s topic appears nowhere in its chapter’s recent profile — it stops the model bridging a dead topic to a live one, inflating an old question because something adjacent is trending. That single cap corrected 1,492 of the 13,154 scores, 11% of the run, which is the difference between a guardrail and a precaution.',
      'Picking the top N by score would have failed, and the scores say why: 54% of questions score above 85, so a global threshold separates almost nothing, and the most pattern-heavy subject has three times the share of top-band scores of the flattest one, so a single ranking would have produced a bucket dominated by one subject. Instead each chapter competes against itself for its own quota, slots are shared across topics by largest-remainder apportionment so no topic is silently rounded away, and at most 30% of any topic’s picks may come from the two most recent years — recency bias measured, not assumed.',
      'Cost came from ordering rather than from a cache library. Questions are scored chapter by chapter, so the chapter’s profile sits unchanged at the front of every request in that batch and becomes a cacheable prefix: 63% of input tokens were served from cache, and the full 13,154-question run cost about 1,290 rupees.',
    ],
    schematic: 'buckets',
  },
  {
    id: 'quality-pipeline',
    index: '04',
    title: 'Catching bad questions before students do',
    standfirst:
      'If a lot of the students who attempt a question go on to report it, the question is usually the problem. A weekly pass turns that ratio into a list someone can act on.',
    factIds: ['MG-030'],
    stack: ['Python', 'Google Drive API', 'Slack API'],
    metrics: [
      { value: '0.5%', label: 'unique-user error-rate threshold', factIds: ['MG-030'] },
      { value: 'Weekly', label: 'automated, replacing a manual report', factIds: ['MG-030'] },
    ],
    body: [
      'Built a weekly quality pipeline for the MARKS question banks. Each question is scored by the ratio of unique users who reported it to unique users who attempted it, so a question only surfaces if the complaints are large relative to how many people actually saw it. Anything above a 0.5% report rate is flagged, alongside a monitored backlog from earlier runs.',
      'For each flagged question the pipeline reverse-resolves where it actually lives in the product catalogue, updates the Live and Historical Drive workbooks, and posts a digest to the stakeholders on Slack. It replaced a report that used to be assembled by hand every week.',
    ],
    schematic: 'quality',
  },
]

export const alsoShipped = [
  {
    id: 'classification',
    kicker: 'MathonGo',
    title: 'Question classification pipeline',
    factIds: ['MG-012', 'MG-013', 'MG-014'],
    summary:
      'An ETL over the Gemini 2.5 Pro API that tags exam questions by topic, concept and hints, replacing manual tagging by the content team. Image-based Physics, Chemistry and Biology questions have their context extracted first, which was most of what made the naive version fail. 250K+ questions reclassified, with a 3,000-question sample reviewed at a 92% QC pass rate.',
    stack: ['Python', 'Gemini 2.5 Pro', 'ETL', 'MongoDB'],
  },
  // DEMOTED from a lead case 2026-10-22. Five cases was one too many, and this was
  // the weakest of them on mechanism: its interesting part is the outcome (40 hrs/week
  // to 8), not how it works, so a reader who clicked in for the engineering found a
  // workflow description. The numbers are the point and they survive intact here.
  // MG-019/020/021 stay cited, so the Stack section keeps Google Drive API and Slack API.
  {
    id: 'lms-assets',
    kicker: 'MathonGo',
    title: 'Self-serve LMS asset platform',
    factIds: ['MG-019', 'MG-020', 'MG-021'],
    summary:
      'Teachers upload PDFs, slides and notes and configure placement themselves; the backend ingests through the Google Drive API and maps them into the right courses and batches, with a Slack notification putting the content team on QC only. 1,000+ multi-format files ingested, and their manual asset work went from about 40 hrs/week to about 8.',
    stack: ['Java', 'Python', 'Google Drive API', 'Slack API'],
  },
  {
    id: 'zoom-pipeline',
    kicker: 'MathonGo',
    title: 'Live-class recording pipeline',
    factIds: ['MG-007', 'MG-008'],
    summary:
      'Zoom and VdoCipher webhooks into Spring Boot REST endpoints and S3, handling 100+ recordings a month and removing 5+ hrs/week of manual uploading from the content team.',
    stack: ['Java', 'Spring Boot', 'Zoom', 'VdoCipher', 'S3'],
  },
  {
    id: 'video-analytics',
    kicker: 'MathonGo',
    title: 'Serverless video analytics',
    // A distinct system from the pipeline above, facts.yaml flags the distinction
    // twice (MG-007 and MG-010). Do not merge them.
    factIds: ['MG-010', 'MG-011'],
    summary:
      'AWS Lambda and Python pulling VdoCipher metadata into Google Sheets dashboards on an EventBridge cron, with CloudWatch alerting. 2,500+ videos under automated monitoring.',
    stack: ['Python', 'AWS Lambda', 'EventBridge', 'CloudWatch'],
  },
  // MG-038, added 2026-10-22 once blame confirmed the scope. The only one of the
  // five internal-panel facts with a design idea rather than a feature list, and
  // the partial-failure question is answered in the code: no transaction, writes
  // settled independently, every target reported back as updated/created/failed.
  //
  // PUBLICATION SAFETY: mechanism only. No collection names, no field names, no
  // product internals — the same bar the lead case clears.
  {
    id: 'banner-reconcile',
    kicker: 'MathonGo',
    title: 'Editing a campaign as one operation',
    factIds: ['MG-038'],
    summary:
      'A dashboard campaign is stored as one banner per screen, so editing it meant one call per screen. The API now takes the campaign plus the screens it should cover and converges on that: existing screens updated, missing ones cloned from a sibling with the edit applied. Writes settle independently rather than in a transaction, and each screen reports back as updated, created or failed, so a half-applied campaign is visible.',
    stack: ['Node.js', 'Express', 'MongoDB'],
  },
  // DECIDED, reviewed 2026-09-25, full technical depth kept on both of these.
  //
  // PRJ-005 and PRJ-006 are both marked AI-assisted in facts.yaml, each with an
  // explicit "MUST be able to defend" list: why the Redis Lua script is atomic,
  // fixed versus sliding window, why the Redisson lock plus the status guard
  // taken inside it rules out a concurrent double-run without making execution
  // idempotent, and the six-state lifecycle. Publishing at this depth invites
  // exactly those questions.
  //
  // CORRECTED 2026-10-22 along with the copy below. This list used to credit the
  // lock with a property it does not have, and would have sent a reader off to
  // study the wrong defence: a lock serialises, it does not make a re-run a
  // no-op. The queue is at-least-once. (Paraphrased on purpose — pass 4 of
  // check-facts reads comments, so a tombstone that quotes the dead wording
  // verbatim fails the build. Describe the error, do not reproduce it.)
  //
  // The case for trimming was that the README carries the detail anyway. The
  // case for keeping, which Harsh took, is that the mechanism IS the reason
  // these are worth showing: a rate limiter without "Redis Lua for atomic
  // counters" is a tutorial project. The depth guarantees the follow-up; that
  // is good if the defend-lists have been studied, and facts.yaml lists exactly
  // what to study. A conscious trade, not an oversight.
  {
    id: 'rate-limiter',
    kicker: 'Personal project',
    title: 'Distributed API rate limiter',
    factIds: ['PRJ-005'],
    summary:
      'A Redis Lua script gives atomic, race-free counters in a single round trip, with no check-then-set window. Fixed-window algorithm, tiered per-API-key limits (FREE 100/min, PRO 1000/min), and an annotation-based @RateLimit AOP aspect that intercepts ahead of business logic and returns the conventional X-RateLimit headers, plus Retry-After on a 429.',
    stack: ['Java', 'Spring Boot 3', 'Spring AOP', 'Redis', 'Lua'],
    href: 'https://github.com/harshsingh-io/rate-limiter',
  },
  {
    id: 'task-queue',
    kicker: 'Personal project',
    title: 'Distributed job queue',
    factIds: ['PRJ-006'],
    summary:
      'At-least-once execution, with concurrent double-runs ruled out by a Redisson lock plus a status guard taken inside it: a worker proceeds only if the job is still pending or failed, and persists RUNNING before doing any work, so a second worker finds it taken and drops it. Then exponential-backoff retries at 1s/2s/4s, a dead-letter queue, Redis sorted sets for delayed scheduling, and a six-state lifecycle in Postgres.',
    stack: ['Java 17', 'Spring Boot 3', 'Spring Data JPA', 'Redis', 'Redisson', 'PostgreSQL'],
    href: 'https://github.com/harshsingh-io/task_queue',
  },
]

export const roles = [
  {
    id: 'mathongo',
    company: 'MathonGo',
    title: 'SDE-1',
    period: 'Aug 2025 to present',
    current: true,
    logo: 'mathongo.webp',
    bullets: [
      {
        text: 'Backend services for the MARKS platform in Java and Spring Boot against PostgreSQL and MongoDB, plus Python for the ETL pipelines.',
        factIds: ['MG-001'],
      },
      {
        text: 'Debugged and maintained existing MARKS modules: CPYQB, Digital Books, NCERT, Mock Test, Bookmarks and Exam Updates.',
        factIds: ['MG-004'],
      },
      {
        text: 'Unit and integration tests (JUnit on the backend, PyTest on the ETLs) to catch regressions before release.',
        factIds: ['MG-005'],
      },
      {
        text: 'Content-level migrations across MathonGo’s platforms: MARKS, Quizrr and the main MathonGo product, in both directions.',
        factIds: ['MG-016'],
      },
      {
        text: 'Design and code reviews, and production debugging.',
        factIds: ['MG-006'],
      },
    ],
  },
  {
    id: 'outlier',
    company: 'Outlier',
    title: 'AI Engineer (Freelance)',
    period: 'Feb 2025 to Jul 2025',
    logo: 'outlier.png',
    note: 'a Scale AI company',
    bullets: [
      {
        text: 'Wrote 500+ tested code solutions with error handling as ground-truth training examples for code-generation models.',
        factIds: ['OUT-002'],
      },
      {
        text: 'Evaluated AI-generated code for correctness, security vulnerabilities and performance bottlenecks, delivering detailed reviews.',
        factIds: ['OUT-003'],
      },
      {
        text: 'Standardised annotation workflows while training agentic models.',
        factIds: ['OUT-004'],
      },
    ],
  },
]

// Persist Ventures and BlueMango Labs have no claims graded `strong`, so they carry
// no bullets. Collapsed into one line rather than two empty rows, the chronology
// stays continuous without a reader stopping on a blank.
//
// DECIDED, reviewed 2026-09-25 and kept bare.
// The alternative was citing PV-005 ("Built a FastAPI and Redis backend", no
// metrics) so the row is not a blank that invites "so what did you do there?".
// That needs PV-005 deliberately allowlisted as a `partial`, the same treatment
// MG-003 has, and once cited, pass 3 would automatically permit FastAPI back
// into the Stack section, which the stack audit removed. Harsh chose bare.
// Do not add the line without re-deciding both of those consequences.
export const earlierRoles = {
  label: 'Earlier',
  items: [
    { company: 'Persist Ventures', period: 'Nov 2024 to Jan 2025' },
    { company: 'BlueMango Labs', period: 'Jan 2024 to Sep 2024' },
  ],
}

// Only technologies that appear in a cited fact's `technologies` list. Flutter,
// DynamoDB, MQTT, SQLAlchemy, SQLite, FastAPI, TensorFlow, Docker, CI/CD and Agile
// were all on the old site and all trace to weak, retired or non-existent facts.
export const stack = [
  {
    group: 'Backend',
    // Node.js and Express were missing until 2026-10-22 while the LEAD CASE was a
    // Node.js tool — a reader scanning this index would not have known he writes it.
    // Both are backed by MG-031, so pass 3 permits them.
    items: [
      'Java',
      'Spring Boot 3',
      'Spring AOP',
      'Spring Data JPA',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Redisson',
      'Lua',
      'PgBouncer',
      'REST',
      'JUnit',
      'Node.js',
      'Express',
    ],
    evidence: ['cache-invalidation', 'pooling', 'rate-limiter', 'task-queue'],
  },
  {
    group: 'Data & pipelines',
    items: [
      'Python',
      'PyTest',
      'ETL',
      'Gemini 2.5 Pro API',
      'Google Drive API',
      'Slack API',
      'Google Sheets',
    ],
    evidence: ['classification', 'lms-assets', 'quality-pipeline'],
  },
  {
    group: 'Cloud',
    items: ['AWS Lambda', 'S3', 'EventBridge', 'CloudWatch'],
    evidence: ['video-analytics', 'zoom-pipeline'],
  },
  // The Mobile group is gone. It listed Kotlin, Jetpack Compose, FCM and
  // Firestore, which were justified by MG-022, MG-024 and MG-028, and when the
  // mobile line was dropped from the MathonGo role, those facts stopped being
  // cited anywhere, leaving four technologies on the page with nothing behind
  // them. Pass 3 of check-facts now fails the build on exactly this.
  //
  // If mobile should come back: MG-024 (FCM + Firestore) is graded `strong` and
  // needs no allowlist entry, so citing it restores two of the four honestly.
  // MG-022 and MG-028 are `partial` and would need Harsh's approval again.
]

// REWRITTEN 2026-10-22, after the case list changed under it.
//
// Three things were wrong rather than merely tired. Para 1 said "Java services
// and Python pipelines" while two of the four cases above it — including the
// lead — are Node, so the section contradicted the evidence a reader had just
// scrolled past. Para 2's examples were tagging questions and mapping course
// files, both demoted to Also shipped the same day, so its illustrations pointed
// at two-line entries further down the page. And nothing here claimed the one
// thing the page now actually demonstrates: what you put around a model so its
// output is safe to ship.
//
// The last sentence is the sharpest claim on the site and it is deliberately
// placed last, where it is the thing a reader leaves with. It is also the one
// most likely to be asked about, which is the point — MG-041 is graded strong
// and the 11% is the evidence that the cap did real work.
export const about = {
  paragraphs: [
    'I work on both sides of the same platform: the services that answer a student\u2019s request, and the pipelines that decide what those services have to say. Which language depends on where the problem sits \u2014 Java and Spring Boot in the MARKS backend, Node and Python for most of what feeds it.',
    'Most of what I have built at MathonGo started as something a person was doing by hand every week: clearing caches, curating question lists, assembling a quality report. The interesting part is rarely the automation itself. It is working out what the manual process was actually protecting, and making sure the automated one still protects it.',
    'Several of them now have a model somewhere in the middle, which only moves that question rather than answering it. A model asked to score will rationalise, so the limits worth having live in code, where it cannot argue with them.',
    'Outside work I have solved 300+ data structures and algorithms problems, and I build small distributed systems to understand them properly: a rate limiter and a job queue, both of which taught me more about Redis semantics than reading about them did.',
  ],
  factIds: ['ACH-001', 'MG-031', 'MG-040', 'MG-041', 'MG-030'],
}


export const nav = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
  { href: '#about', label: 'How I work' },
  { href: '#contact', label: 'Contact' },
]

// Retired URLs that may still be linked externally. Rendered as zero-height
// sentinels inside the section that replaced them.
export const anchorAliases = {
  work: ['portfolio', 'mobile'],
  stack: ['skills', 'services'],
  about: ['testimonial'],
  home: [],
}
