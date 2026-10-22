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
  // Thesis, in segments so the two nouns that carry the positioning can hold full
  // ink while the connective tissue drops to secondary. Both halves matter equally
  //, backend AND data is the whole claim, so this emphasises rather than mutes
  // either side. Derived from MG-001 (backend) + MG-012 (pipelines) + MG-019 (both).
  thesis: [
    { text: 'I build the ' },
    { text: 'services', em: true },
    { text: ' that run MathonGo’s exam platform, and the ' },
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
    lines: ['Java · Spring Boot · Python', 'PostgreSQL · MongoDB · Redis'],
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
  },
  {
    id: 'pooling',
    index: '02',
    title: 'Surviving exam-day load',
    standfirst:
      'Mock tests put tens of thousands of submissions through the platform in the same few minutes. Two datastores, two different ways of not falling over.',
    factIds: ['MG-002', 'MG-001', 'MG-003'],
    stack: ['Java', 'Spring Boot', 'MongoDB', 'PostgreSQL', 'PgBouncer'],
    metrics: [
      { value: '15', label: 'connections per pod', factIds: ['MG-002'] },
      { value: '1500ms', label: 'queue timeout before failure', factIds: ['MG-002'] },
      { value: '750→33', label: 'pod connections to Postgres sockets', factIds: ['MG-002'] },
    ],
    // "Tuned" is correct and settled: confirmed 2026-10-22 that he tuned an
    // existing setup rather than designing it, so scope stays contributed-a-part
    // and Designed/Architected stay banned.
    body: [
      'The MARKS backend talks to two datastores, and each needed a different answer to the same question: what happens when ten thousand people submit at once. Tuned both so the big timed events (mock tests, QFTs, AYNR) degrade instead of exhausting a database.',
      'On the client side, each pod holds a MongoDB driver pool of 15 connections opened at startup, so a checkout costs under 0.1ms. The 16th concurrent request queues against a 1500ms timeout rather than opening an unbounded connection or crashing the pod.',
      'Postgres is a separate problem with a separate answer. PgBouncer sits in front of it, so roughly 750 persistent client connections collapse onto about 33 real TCP sockets, with a socket reassigned the moment a transaction commits. The pool is sized from the standard formula: vCPU × 2 + spindles, or 16 × 2 + 1.',
    ],
    schematic: true,
  },
  {
    id: 'classification',
    index: '03',
    title: '250,000 questions, reclassified and measured',
    standfirst:
      'The content team was tagging exam questions by hand. An LLM pipeline replaced the tagging; a sampled QC process replaced the guesswork about whether it worked.',
    factIds: ['MG-012', 'MG-013', 'MG-014'],
    stack: ['Python', 'Gemini 2.5 Pro', 'ETL', 'MongoDB'],
    metrics: [
      { value: '250K+', label: 'questions reclassified', factIds: ['MG-013'] },
      { value: '92%', label: 'QC pass rate on a sampled review', factIds: ['MG-014'] },
      { value: '3,000', label: 'questions in the QC sample', factIds: ['MG-014'] },
    ],
    body: [
      'Built an ETL pipeline over the Gemini 2.5 Pro API that classifies exam questions by topic, concept, hints and quicknotes, replacing an error-prone manual process owned by the content team.',
      'Image-based Physics, Chemistry and Biology questions needed their context extracted before they could be tagged at all, which is most of what made the naive version fail.',
      'The 92% is a QC pass rate, not precision: the content team reviewed a 3,000-question sample, 500 each across Physics, Chemistry, Maths, Biology, English and Logical Reasoning, and 92% came back correct. It was measured on the same version that went on to process all 250K, so it describes the real run rather than a pilot.',
    ],
  },
  {
    id: 'lms-assets',
    index: '04',
    title: 'Forty hours a week, down to eight',
    standfirst:
      'Teachers shared files, the content team watermarked them by hand, dropped Drive links into a spreadsheet, and someone ran a script. Now teachers drive it themselves.',
    factIds: ['MG-019', 'MG-020', 'MG-021'],
    stack: ['Java', 'Python', 'Google Drive API', 'Slack API'],
    // 40→8 and "80%" are the same measurement stated twice, MG-021 carries both.
    // One of them is padding in a three-metric row, so the ratio goes and the
    // absolute numbers stay.
    metrics: [
      { value: '40→8', label: 'hrs/week of manual work', factIds: ['MG-021'] },
      { value: '1,000+', label: 'multi-format files ingested', factIds: ['MG-020'] },
    ],
    body: [
      'Built a self-serve platform for MathonGo LMS course assets, end to end. Teachers upload PDFs, slides, class notes and DPP notes and configure placement from a panel; the backend ingests them through the Google Drive API and maps them into the right courses and batches automatically.',
      'The content team went from owning the whole chain to owning only QC, triggered by a Slack notification when a teacher uploads. That took their manual asset workload from about 40 hours a week to about 8.',
    ],
  },
  {
    id: 'quality-pipeline',
    index: '05',
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
  },
]

export const alsoShipped = [
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
      'At-least-once execution, with concurrent double-runs ruled out by a Redisson lock plus a status guard taken inside it: a worker only proceeds if the job is still pending or failed, and persists RUNNING before doing any work, so a second worker finds it taken and drops it. Exponential-backoff retries at 1s/2s/4s, a dead-letter queue with manual replay, Redis sorted sets for timestamp-ordered delayed scheduling, and Postgres tracking the full lifecycle across pending, running, done, failed, dead-letter and cancelled.',
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
    ],
    evidence: ['pooling', 'rate-limiter', 'task-queue'],
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

export const about = {
  paragraphs: [
    'I work on both sides of the same platform. The Java services that answer a student’s request, and the Python pipelines that decide what those services have to say.',
    'Most of what I have built at MathonGo started as something a person was doing by hand every week: tagging questions, mapping course files into batches, assembling a quality report. The interesting part is rarely the automation itself. It is working out what the manual process was actually protecting, and making sure the automated one still protects it.',
    'Outside work I have solved 300+ data structures and algorithms problems, and I build small distributed systems to understand them properly: a rate limiter and a job queue, both of which taught me more about Redis semantics than reading about them did.',
  ],
  factIds: ['ACH-001'],
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
