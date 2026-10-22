#!/usr/bin/env node
// Generates public/resume.html from src/content/portfolio.js.
//
// WHY GENERATED, AND WHY FROM portfolio.js: a hand-written resume is a second
// source of truth, and a second source of truth drifts. The old one did exactly
// that — it still carried figures facts.yaml had retired. The fix is not to
// re-derive a resume from facts.yaml (that is a *third* curation to keep in
// step) but to render the copy the site already ships. That copy is gated by
// scripts/check-facts.mjs on every build: every claim cites a fact graded
// `strong`, and no uncited number survives pass 2. The resume inherits all of
// it for free and cannot assert anything the page does not.
//
// Run after the facts gate, not before — `npm run build` order matters.
//
// Print-first: open public/resume.html and use the browser's Save as PDF.
// No dependency, no PDF toolchain, no second design system.
//
// TWO PAGES, AND THE SPACING BELOW IS LOAD-BEARING. Measured at the real print
// column (A4 less the @page margin = 182mm x 271mm = 688 x 1024 CSS px at 96dpi):
// 1933px of content against a 2048px two-page limit, so ~114px of headroom. The
// two rules added after that measurement (the hanging indent on .figures/.techs
// and the .earlier top margin) cost a few px more and were not re-measured.
//
// It got there by a margin pass, not by luck. The first draft measured 2043px —
// five pixels of headroom — because one work item overshot the page-1 boundary
// by 7px and `break-inside: avoid` moved the whole thing to page 2, pushing
// everything after it down 112px. Shaving ~16px above that item pulled it back
// onto page 1 and recovered the entire shift.
//
// NO STACK SECTION, and that is the page budget talking. Adding the campaign-
// reconciliation item took the document to 2086px effective — three pages, with
// the third holding nothing but Education. Of the four ways out, only two gave a
// comfortable fit: dropping the grouped Stack section (-123px, 109px headroom) or
// dropping every per-item technology line (-199px). The per-item lines are the
// ones a technical reader actually uses — they say what each project was built
// with — and the grouped section repeated them with nothing added, so the group
// went. Every technology it listed still appears in the document: in an item's own
// tech line, a role bullet, or a summary. Verified by set difference, not assumed.
//
// AND NO FLAT KEYWORD LINE IN THE HEADER EITHER — tried and measured, 2026-10-22.
// The argument for one was ATS: with the grouped section gone, the technologies
// are spread across ten per-item lines and the prose rather than sitting in one
// block. The argument assumed a single line. It cannot be a single line: 25 names
// is 283 characters, which wraps to three lines in a 688px column, and dropping
// the type to 8.8px still wraps to three. Fifty pixels of mono tooling between the
// job title and the contact details is the loudest thing on the page, bigger than
// the thesis, and it reads as "here are all the words, match one" — the exact
// register the grouped section was cut to escape. It also cost 147px rather than
// 55px, because the extra height pushed a work item across the page-1 fold and
// that item jumped whole. Three pages again, Education orphaned again.
//
// Every one of those 25 names already appears in the document. An ATS reads text,
// not visual grouping. If a concentrated keyword block is ever genuinely needed,
// the END of the document measured at 2 pages with 47px of headroom — but 47px is
// inside the range where one printer-margin setting flips it, so it is not free.
//
// Shrinking margins does NOT work here and is measured, not guessed: taking .item
// to 5px and bullets to 2px removes 22px of raw height and moves the effective
// bottom by zero, because the Education block simply starts 22px higher and still
// straddles the fold, so it is still pushed whole to the next page. Under ~38px of
// raw saving you buy nothing but a tighter-looking page.
//
// So: lengthening the copy in portfolio.js can cost a third page in a single
// step, and that third page would hold two lines of Education. If you add a case
// or a role bullet, re-measure at 688px rather than eyeballing it on screen —
// the screen layout is 860px wide with padding and tells you nothing about the
// fold. Simulate the break too: a raw height under 2048 is not a fit, because
// any item straddling the fold jumps whole to the next page.

import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// portfolio.js is ESM, this package is CJS, so a plain import() of a `.js` file
// fails. It is also pure data with zero imports, so evaluating it as a function
// body is enough and keeps one copy of the content. If anyone ever adds an
// `import` to portfolio.js this throws loudly, which is the right failure.
function loadContent() {
  const src = readFileSync(join(root, 'src/content/portfolio.js'), 'utf8')
  if (/^\s*import\s/m.test(src)) {
    throw new Error('portfolio.js now has imports; load it as a real module instead')
  }
  const body = `${src.replace(/^export const /gm, 'const ')}
    return { profile, roles, earlierRoles, cases, alsoShipped }`
  // eslint-disable-next-line no-new-func
  return new Function(body)()
}

const { profile, roles, earlierRoles, cases, alsoShipped } = loadContent()

// Education is not a claim about work, so it is not in facts.yaml. Recovered
// from the JSON-LD this site shipped before the rebuild (git show f62d748).
const EDUCATION = {
  school: 'Sagar Institute of Research & Technology, Bhopal',
  degree: 'B.Tech, Computer Science',
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const thesis = profile.thesis.map((seg) => seg.text).join('')

const role = (r) => `    <section class="block">
      <h2>${esc(r.company)}${r.note ? ` <span class="note">(${esc(r.note)})</span>` : ''}</h2>
      <p class="meta">${esc(r.title)} · ${esc(r.period)}</p>
      <ul>
${r.bullets.map((b) => `        <li>${esc(b.text)}</li>`).join('\n')}
      </ul>
    </section>`

// A case contributes its standfirst (what the problem was) plus its metrics as a
// mono tail. The full four-paragraph body belongs on the site, not on A4.
//
// No per-item employer tag. The site needs one because its cases and its roles
// are far apart; here the section heading sits directly above and the tag was
// printing MATHONGO seven times in one column, immediately under an Experience
// section that had already established MathonGo.
const workItem = (c) => {
  const metrics = (c.metrics || []).map((m) => `${m.value} ${m.label}`).join(' · ')
  const stackLine = (c.stack || []).join(' · ')
  return `      <li class="item">
        <p class="item-title">${esc(c.title)}${
    c.href ? ` <a class="repo" href="${c.href}">${esc(c.href.replace(/^https:\/\//, ''))}</a>` : ''
  }</p>
        <p>${esc(c.standfirst || c.summary)}</p>
        ${metrics ? `<p class="figures">${esc(metrics)}</p>` : ''}
        ${stackLine ? `<p class="techs">${esc(stackLine)}</p>` : ''}
      </li>`
}

// Partitioned on the kicker rather than hardcoded, so a new entry in either
// group lands in the right section without touching this script.
const isPersonal = (c) => /^personal/i.test(c.kicker || '')
const allWork = [...cases, ...alsoShipped]
const employerWork = allWork.filter((c) => !isPersonal(c))
const personalWork = allWork.filter(isPersonal)

const workSection = (heading, items) =>
  items.length
    ? `  <h3>${esc(heading)}</h3>
  <ul>
${items.map(workItem).join('\n')}
  </ul>
`
    : ''

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${esc(profile.name)} · ${esc(profile.role)}</title>
<style>
  /* resume.html is standalone — it does not load the app's CSS bundle, so the
     two faces it uses have to be declared here or it falls back to system sans
     with no visible error. Same stable /fonts/ URLs index.html uses. */
  @font-face {
    font-family: 'Geist'; font-style: normal; font-weight: 100 900; font-display: swap;
    src: url('/fonts/geist-sans-var.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Geist Mono'; font-style: normal; font-weight: 100 900; font-display: swap;
    src: url('/fonts/geist-mono-var.woff2') format('woff2');
  }

  @page { size: A4; margin: 13mm 14mm; }
  :root {
    --ink: #16150f; --ink-2: #413e37; --ink-3: #6e6a60;
    --rule: #d6d2c6; --accent: #1a48c4;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0 auto; max-width: 860px; padding: 44px 36px; background: #fff;
    color: var(--ink-2); font-size: 10pt; line-height: 1.48;
    font-family: Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;
  }
  p { margin: 0 0 3px; }
  a { color: inherit; text-decoration: none; border-bottom: 1px solid var(--rule); }
  header { border-bottom: 1.5px solid var(--ink); padding-bottom: 9px; margin-bottom: 14px; }
  h1 { margin: 0; color: var(--ink); font-size: 20pt; font-weight: 600; letter-spacing: -0.02em; }
  .role { margin: 1px 0 7px; color: var(--accent); font-size: 10pt; font-weight: 500; }
  /* 8.4pt rather than 8.8: at the print column the four contact items wrapped,
     dropping the LinkedIn URL alone onto a second line at the top of the page. */
  .contact { font-size: 8.4pt; color: var(--ink-3); }
  .thesis { margin: 0 0 12px; color: var(--ink); font-size: 10.5pt; }
  h2 { margin: 0; color: var(--ink); font-size: 11pt; font-weight: 600; letter-spacing: -0.01em; }
  h2 .note { color: var(--ink-3); font-size: 8.8pt; font-weight: 400; }
  h3 {
    margin: 15px 0 8px; padding-bottom: 4px; border-bottom: 1px solid var(--rule);
    color: var(--ink); font-size: 8.5pt; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
  }
  .meta, .figures, .techs, .repo, .earlier {
    font-family: 'Geist Mono', ui-monospace, Menlo, monospace;
  }
  .meta { margin: 0 0 5px; color: var(--ink-3); font-size: 8.5pt; }
  .block { margin-bottom: 11px; break-inside: avoid; }
  ul { margin: 0; padding: 0; list-style: none; }
  .block li { margin-bottom: 3px; padding-left: 11px; text-indent: -11px; }
  .block li::before { content: '— '; color: var(--ink-3); }
  .item { margin-bottom: 7px; break-inside: avoid; }
  .item-title { color: var(--ink); font-weight: 600; }
  .repo { color: var(--accent); font-size: 8.2pt; font-weight: 400; border: 0; }
  /* Hanging indent on both mono tails. When a figures line wrapped, the orphan
     word landed flush-left under the bold title and read for a beat as a new
     line of content rather than a continuation. Three of nine items wrap. */
  .figures, .techs { padding-left: 13px; text-indent: -13px; font-size: 8.6pt; }
  .figures { color: var(--ink); }
  .techs { color: var(--ink-3); }
  /* Spaced off the bullets above it: the Earlier line sits directly under
     Outlier's last bullet at the same left margin, and without this it scans as
     a fourth bullet. The bullets carry an em-dash marker, this does not. */
  .earlier { margin-top: 9px; color: var(--ink-3); font-size: 9pt; }

  /* On paper the @page margin IS the margin, so the screen padding has to go or
     it is added on top of it. Measured: 2127px of content at the print column
     width (182mm x 271mm = 688 x 1024 CSS px) with the padding, 1932px without.
     One A4 page is 1024px, so the padding is the whole difference between two
     pages and three — and the third held nothing but the Education block, with
     its heading orphaned at the foot of page two.

     break-after:avoid on h3 stops a section heading being stranded from the
     block it introduces, independently of the length.

     Do NOT hide .note here. The only one left is the "(a Scale AI company)"
     qualifier on Outlier, which is a credential and must print. An earlier
     draft hid it alongside per-line fact IDs that no longer exist in the output.

     (No backticks in these comments: the whole document is one JS template
     literal, so a backtick here is a syntax error in the generator.) */
  @media print {
    body { padding: 0; max-width: none; }
    h3 { break-after: avoid; }
  }
</style>
</head>
<body>
  <header>
    <h1>${esc(profile.name)}</h1>
    <p class="role">${esc(profile.role)}</p>
    <p class="contact">
      ${esc(profile.location)} · <a href="mailto:${profile.email}">${esc(profile.email)}</a>
      · <a href="https://singhcerely.tech">singhcerely.tech</a>
      · <a href="${profile.links.github}">${esc(
        profile.links.github.replace(/^https:\/\//, '')
      )}</a>
      · <a href="${profile.links.linkedin}">${esc(
        profile.links.linkedin.replace(/^https:\/\/www\./, '')
      )}</a>
    </p>
  </header>

  <p class="thesis">${esc(thesis)} ${esc(profile.context.text)}</p>

  <h3>Experience</h3>
${roles.map(role).join('\n')}
    <p class="earlier">${esc(earlierRoles.label)} · ${earlierRoles.items
  .map((i) => `${esc(i.company)}, ${esc(i.period)}`)
  .join(' · ')}</p>

${workSection('Selected work at MathonGo', employerWork)}${workSection(
  'Personal projects',
  personalWork
)}
  <h3>Education</h3>
  <section class="block">
    <h2>${esc(EDUCATION.school)}</h2>
    <p class="meta">${esc(EDUCATION.degree)}</p>
  </section>
</body>
</html>
`

writeFileSync(join(root, 'public/resume.html'), html)
console.log(
  `  ✓ resume built — ${roles.length} roles, ${cases.length + alsoShipped.length} work items, ` +
    `${Math.round(html.length / 1024)} KB`
)
