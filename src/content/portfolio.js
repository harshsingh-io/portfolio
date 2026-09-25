// Single source of copy for the site.
//
// Every claim carries the facts.yaml IDs it derives from. `scripts/check-facts.mjs`
// runs on `prebuild` and fails the build if any referenced ID is missing or is not
// graded `strong` — with a narrow allowlist for the one `partial` fact Harsh
// approved. Nothing goes on this page that cannot be defended in a room.
//
// Grading rules that constrain the wording here:
//   MG-002  scope: contributed-a-part  → verb is "Tuned", never "Designed"
//   MG-003  partial                    → environment context only, never ownership

export const profile = {
  name: 'Harsh Singh',
  role: 'Backend & Data Engineer',
  // Thesis. Derived from MG-001 (backend) + MG-012 (pipelines) + MG-019 (both).
  thesis:
    'I build the services that run MathonGo’s exam platform, and the pipelines that keep its data honest.',
  // MG-003 is graded `partial`: defensible as the environment he works in, never
  // as something he built. The wording below is deliberate — "on a backend serving",
  // not "built a backend serving".
  context: {
    text: 'Currently SDE-1 at MathonGo, on a backend serving 300K+ daily active users.',
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

// Three numbers, above the fold. Each is `strong` and each belongs to a different
// piece of work, so they read as range rather than one project restated.
export const proof = [
  { value: '250K+', unit: 'questions reclassified', factIds: ['MG-013'] },
  { value: '40→8', unit: 'hrs/week of manual work', factIds: ['MG-021'] },
  { value: '99.2%', unit: 'uptime across 2,500+ videos', factIds: ['MG-011'] },
]

export const cases = [
  {
    id: 'pooling',
    index: '01',
    title: 'Surviving exam-day load',
    standfirst:
      'Mock tests put tens of thousands of submissions through the platform in the same few minutes. Two pools, at different layers, keep the database from being the thing that falls over.',
    factIds: ['MG-002', 'MG-001', 'MG-003'],
    stack: ['Java', 'Spring Boot', 'MongoDB', 'PostgreSQL', 'PgBouncer'],
    metrics: [
      { value: '15', label: 'connections per pod', factIds: ['MG-002'] },
      { value: '1500ms', label: 'queue timeout before failure', factIds: ['MG-002'] },
      { value: '750→33', label: 'pod connections to Postgres sockets', factIds: ['MG-002'] },
    ],
    // Deliberately "Tuned". MG-002's scope is contributed-a-part, which bans
    // Designed/Architected until Harsh confirms he designed the architecture.
    body: [
      'Tuned a two-tier connection-pooling setup so read/write spikes during Mock Tests, QFTs and AYNR degrade gracefully instead of exhausting the database.',
      'On the client side, each pod holds a MongoDB driver pool of 15 connections opened at startup, so a checkout costs under 0.1ms. The 16th concurrent request queues against a 1500ms timeout rather than opening an unbounded connection or crashing the pod.',
      'On the server side, PgBouncer fronts Postgres: roughly 750 persistent client connections collapse onto about 33 real TCP sockets, with a socket reassigned the moment a transaction commits. The pool is sized from the standard formula — vCPU × 2 + spindles, or 16 × 2 + 1.',
    ],
    schematic: true,
  },
  {
    id: 'classification',
    index: '02',
    title: '250,000 questions, reclassified and measured',
    standfirst:
      'The content team was tagging exam questions by hand. An LLM pipeline replaced the tagging; a sampled QC process replaced the guesswork about whether it worked.',
    factIds: ['MG-012', 'MG-013', 'MG-014'],
    stack: ['Python', 'Gemini 2.5 Pro', 'ETL', 'MongoDB'],
    metrics: [
      { value: '250K+', label: 'questions reclassified', factIds: ['MG-013'] },
      { value: '92%', label: 'classification precision', factIds: ['MG-014'] },
      { value: '3,000', label: 'questions in the QC sample', factIds: ['MG-014'] },
    ],
    body: [
      'Built an ETL pipeline over the Gemini 2.5 Pro API that classifies exam questions by topic, concept, hints and quicknotes — replacing an error-prone manual process owned by the content team.',
      'Image-based Physics, Chemistry and Biology questions needed their context extracted before they could be tagged at all, which is most of what made the naive version fail.',
      'Precision is 92%, and that number has a method behind it: the content team QC’d a 3,000-question sample — 500 each across Physics, Chemistry, Maths, Biology, English and Logical Reasoning — after several rounds of prompt refinement. It is a measured pass rate on the MVP, not an estimate.',
    ],
  },
  {
    id: 'lms-assets',
    index: '03',
    title: 'Forty hours a week, down to eight',
    standfirst:
      'Teachers shared files, the content team watermarked them by hand, dropped Drive links into a spreadsheet, and someone ran a script. Now teachers drive it themselves.',
    factIds: ['MG-019', 'MG-020', 'MG-021'],
    stack: ['Java', 'Python', 'Google Drive API', 'Slack API'],
    // 40→8 and "80%" are the same measurement stated twice — MG-021 carries both.
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
    index: '04',
    title: 'Catching bad questions before students do',
    standfirst:
      'Student error rates are a signal about the question, not only about the student. A weekly pass turns that signal into a list someone can act on.',
    factIds: ['MG-030'],
    stack: ['Python', 'Google Drive API', 'Slack API'],
    metrics: [
      { value: '0.5%', label: 'unique-user error-rate threshold', factIds: ['MG-030'] },
      { value: 'Weekly', label: 'automated, replacing a manual report', factIds: ['MG-030'] },
    ],
    body: [
      'Built a weekly quality pipeline for the MARKS question banks. Each user-reported question is scored by its all-time unique-user error rate, and anything above a 0.5% threshold is flagged — alongside a monitored backlog of questions flagged in earlier runs.',
      'For each flagged question the pipeline reverse-resolves where it actually lives in the product catalogue, updates the Live and Historical Drive workbooks, and posts a digest to the stakeholders on Slack. It replaced a report that used to be assembled by hand every week.',
    ],
  },
]

export const alsoShipped = [
  {
    id: 'zoom-pipeline',
    title: 'Live-class recording pipeline',
    factIds: ['MG-007', 'MG-008'],
    summary:
      'Zoom and VdoCipher webhooks into Spring Boot REST endpoints and S3, handling 100+ recordings a month and removing 5+ hrs/week of manual uploading from the content team.',
    stack: ['Java', 'Spring Boot', 'Zoom', 'VdoCipher', 'S3'],
  },
  {
    id: 'video-analytics',
    title: 'Serverless video analytics',
    // A distinct system from the pipeline above — facts.yaml flags the distinction
    // twice (MG-007 and MG-010). Do not merge them.
    factIds: ['MG-010', 'MG-011'],
    summary:
      'AWS Lambda and Python pulling VdoCipher metadata into Google Sheets dashboards on an EventBridge cron, with CloudWatch alerting. 2,500+ videos at 99.2% uptime.',
    stack: ['Python', 'AWS Lambda', 'EventBridge', 'CloudWatch'],
  },
  {
    id: 'rate-limiter',
    title: 'Distributed API rate limiter',
    factIds: ['PRJ-005'],
    summary:
      'A Redis Lua script gives atomic, race-free counters in a single round trip — no check-then-set window. Fixed-window algorithm, tiered per-API-key limits (FREE 100/min, PRO 1000/min), and an annotation-based @RateLimit AOP aspect that intercepts ahead of business logic and returns RFC rate-limit headers.',
    stack: ['Java', 'Spring Boot 3', 'Spring AOP', 'Redis', 'Lua'],
    href: 'https://github.com/harshsingh-io/rate-limiter',
  },
  {
    id: 'task-queue',
    title: 'Distributed job queue',
    factIds: ['PRJ-006'],
    summary:
      'Redisson per-job distributed locks make execution idempotent across workers. Exponential-backoff retries at 1s/2s/4s, a dead-letter queue with manual replay, Redis sorted sets for timestamp-ordered delayed scheduling, and PostgreSQL jsonb tracking the PENDING → RUNNING → FAILED lifecycle.',
    stack: ['Java 17', 'Spring Boot 3', 'Redis', 'Redisson', 'PostgreSQL'],
    href: 'https://github.com/harshsingh-io/task_queue',
  },
]

export const roles = [
  {
    id: 'mathongo',
    company: 'MathonGo',
    title: 'SDE-1',
    period: 'Aug 2025 — present',
    current: true,
    logo: 'mathongo.webp',
    bullets: [
      {
        text: 'Backend services for the MARKS platform in Java and Spring Boot against PostgreSQL and MongoDB, plus Python for the ETL pipelines.',
        factIds: ['MG-001'],
      },
      {
        text: 'Debugged and maintained existing MARKS modules — CPYQB, Digital Books, NCERT, Mock Test, Bookmarks and Exam Updates.',
        factIds: ['MG-004'],
      },
      {
        text: 'Unit and integration tests — JUnit on the backend, PyTest on the ETLs — to catch regressions before release.',
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
    period: 'Feb 2025 — Jul 2025',
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
// no bullets. Collapsed into one line rather than two empty rows — the chronology
// stays continuous without a reader stopping on a blank.
export const earlierRoles = {
  label: 'Earlier',
  items: [
    { company: 'Persist Ventures', period: 'Nov 2024 — Jan 2025' },
    { company: 'BlueMango Labs', period: 'Jan 2024 — Sep 2024' },
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
  // Firestore, which were justified by MG-022, MG-024 and MG-028 — and when the
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
    'Most of what I have built at MathonGo started as something a person was doing by hand every week — tagging questions, mapping course files into batches, assembling a quality report. The interesting part is rarely the automation itself. It is working out what the manual process was actually protecting, and making sure the automated one still protects it.',
    'Outside work I have solved 300+ data structures and algorithms problems, and I build small distributed systems to understand them properly — a rate limiter and a job queue, both of which taught me more about Redis semantics than reading about them did.',
  ],
  factIds: ['ACH-001'],
}

export const nav = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
  { href: '#about', label: 'About' },
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
