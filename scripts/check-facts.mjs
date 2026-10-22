#!/usr/bin/env node
// Provenance gate. Runs on `prebuild`.
//
// Four passes, because there are four ways a claim goes wrong.
//
// PASS 1 — citations resolve.
//   Every `factIds: [...]` in src/ must reference an ID that exists in facts.yaml,
//   is graded `defensibility: strong`, AND has a graded `scope`. One `partial`
//   fact is allowlisted because Harsh approved it individually, with a constraint
//   on how it may be phrased (see the comments in src/content/portfolio.js).
//
// PASS 2 — no uncited numbers.
//   Pass 1 only validates the IDs that are present. It cannot see a number that
//   was added with no citation at all — which is the shape of the original bug:
//   the retired figures ("160K+ docs", "reduced migration time by 80%", "5x
//   concurrent users") lived in the public/index.html meta description, a file
//   pass 1 does not even read. So pass 2 scans the copy AND the document head for
//   claim-shaped numbers and requires each to appear somewhere in facts.yaml.
//
//   Claim-shaped means the shapes inflation actually uses: a `+` suffix, a `%`,
//   an `x` multiplier, a `→` transition, or comma-grouped thousands. Bare integers
//   are not checked, so "Spring Boot 3" and "Java 17" pass without an allowlist.
//   Comparison is numeric, not textual, so "250,000" matches facts.yaml's "250K+".
//
// PASS 3 — the Stack section names nothing the site cannot back.
//   portfolio.js declares "Only technologies that appear in a cited fact's
//   `technologies` list" as a comment, with nothing enforcing it. That invariant
//   breaks silently: when a fact stops being cited, the technologies it used to
//   justify stay in the Stack section, and neither of the passes above notices —
//   pass 1 only validates factIds that are present, pass 2 only reads numbers,
//   and "Jetpack Compose" is neither. This pass makes the comment executable.
//
// PASS 4 — retired phrasings stay retired.
//   Passes 1-3 are about IDs, numbers and technology names. None of them reads a
//   sentence. So when "92% measured precision" was corrected to "92% QC pass
//   rate" in the copy, the identical phrase survived in the index.html meta
//   description and all three passes stayed green: 92 is a real cited number and
//   "precision" is the word that was false. Pass 4 is a denylist of wordings
//   already found to be wrong. It cannot judge a new sentence, only stop an old
//   false one from reappearing.
//
//   What none of this catches: a real number attached to the wrong project. The old
//   site put MG-021's genuine "80%" under the tagging work instead of the asset
//   platform. Every pass sees a cited, traceable number in permitted words. That
//   one needs a reader. The gate verifies provenance, not truth.

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const ALLOWLIST = {
  'MG-003': 'environment context only — never phrased as ownership',
}

// Numbers that are real but are not claims about Harsh's work.
const NOT_A_CLAIM = new Set([
  1200, 630, // og:image dimensions
])

// ── facts.yaml ─────────────────────────────────────────────────────────────
function parseFacts(text) {
  const facts = new Map()
  let current = null
  for (const line of text.split('\n')) {
    const id = line.match(/^-\s+id:\s*(\S+)/)
    if (id) {
      current = { id: id[1], assertion: '', technologies: [] }
      facts.set(id[1], current)
      continue
    }
    if (!current) continue
    const kv = line.match(/^\s+(defensibility|scope|claim):\s*(.+)$/)
    if (kv) current[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '')
    // depth_notes needs the QUOTED value, not the rest of the line: an entry may
    // carry a trailing YAML comment (`depth_notes: ""  # Harsh to fill`) and a
    // naive capture reads that comment as content, so an empty field looks full.
    // That is not hypothetical — it defeated the first version of this check and
    // an audit script before it.
    const depth = line.match(/^\s+depth_notes:\s*"((?:[^"\\]|\\.)*)"/)
    if (depth) current.depth_notes = depth[1]
    // `assertion` is what the fact ACTUALLY claims: the claim line and the
    // metric values. It deliberately excludes depth_notes and clarify_note,
    // which quote the retired and false figures in order to tombstone them —
    // scraping those would whitelist the exact numbers this gate exists to
    // catch. ("The old '...160K+ docs...' claim was FALSE" is in MG-016.)
    const metric = line.match(/^\s+metric:\s*\{value:\s*\[([^\]]*)\]/)
    if (kv && kv[1] === 'claim') current.assertion += ' ' + kv[2]
    if (metric) current.assertion += ' ' + metric[1]
    const tech = line.match(/^\s+technologies:\s*\[([^\]]*)\]/)
    if (tech) current.technologies = tech[1].split(',').map((t) => t.trim()).filter(Boolean)
  }
  return facts
}

// Every number anywhere in a fact's text — claim, metric values, depth_notes.
// Deliberately generous: this is the set a site number is allowed to come from.
function numbersIn(text) {
  const found = new Set()
  for (const m of text.matchAll(/(\d[\d,]*(?:\.\d+)?)\s*([KM])?/gi)) {
    const value = parseFloat(m[1].replace(/,/g, ''))
    if (!Number.isFinite(value)) continue
    const scale = (m[2] || '').toUpperCase()
    found.add(scale === 'K' ? value * 1e3 : scale === 'M' ? value * 1e6 : value)
  }
  return found
}

// Claim-shaped tokens only.
const CLAIM_SHAPES = [
  /\d[\d,]*(?:\.\d+)?[KM]?\+/gi, //  250K+, 1,000+, 5+ — adjacent, so "2 + 1" is not a claim
  /\d[\d,]*(?:\.\d+)?\s*%/g, //        92%, 99.2%
  /\d+(?:\.\d+)?\s*x\b/gi, //          10x, 5x  <- what BM-001 and PV-005 were retired for
  /\d[\d,]*\s*→\s*\d[\d,]*/g, //       40→8, 750→33
  /\b\d{1,3}(?:,\d{3})+\b/g, //        250,000
]

// Comments are not shipped claims — and both files carry comments that quote the
// retired figures in order to explain why they are absent, which would otherwise
// trip this check on the very text documenting it. (CRA strips HTML comments from
// the production build anyway.)
function stripComments(text) {
  return text
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/^\s*\/\/.*$/gm, ' ')
}

function claimTokens(text) {
  const tokens = []
  for (const shape of CLAIM_SHAPES) {
    for (const m of stripComments(text).matchAll(shape)) tokens.push(m[0].trim())
  }
  return [...new Set(tokens)]
}

// ── collect from src/ ──────────────────────────────────────────────────────
function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) yield* walk(path)
    else if (/\.(js|jsx)$/.test(entry)) yield path
  }
}

const facts = parseFacts(readFileSync(join(root, 'facts.yaml'), 'utf8'))
const problems = []

// ── PASS 1 ─────────────────────────────────────────────────────────────────
const refs = []
for (const file of walk(join(root, 'src'))) {
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      const block = line.match(/factIds:\s*\[([^\]]*)\]/)
      if (!block) return
      for (const m of block[1].matchAll(/['"]([A-Z]+-\d+)['"]/g)) {
        refs.push({ id: m[1], file: file.slice(root.length + 1), line: i + 1 })
      }
    })
}

for (const ref of refs) {
  const fact = facts.get(ref.id)
  if (!fact) {
    problems.push(`${ref.file}:${ref.line}  ${ref.id} does not exist in facts.yaml`)
  } else if (fact.defensibility !== 'strong' && !ALLOWLIST[ref.id]) {
    problems.push(
      `${ref.file}:${ref.line}  ${ref.id} is graded \`${fact.defensibility}\`, not \`strong\`` +
        `\n      claim: ${(fact.claim || '').slice(0, 96)}`
    )
  } else if (fact.scope === 'ungraded' || !fact.scope) {
    // `scope` decides which verbs the copy may use: contributed-a-part bans
    // Designed and Architected, solo permits them. Until this session the pass
    // read `defensibility` only, so a fact graded strong with scope still
    // ungraded was fully citable with no constraint on how it was phrased —
    // which is precisely the MG-002 trap (commit authorship proved he wrote the
    // code, it did not prove he decided the design). Grading one field without
    // the other is not a grading.
    problems.push(
      `${ref.file}:${ref.line}  ${ref.id} is graded \`strong\` but its \`scope\` is ungraded` +
        `\n      claim: ${(fact.claim || '').slice(0, 96)}` +
        `\n      scope decides the permitted verbs. Set solo / pair / contributed-a-part` +
        `\n      in facts.yaml before citing it.`
    )
  }
}

// ── PASS 2 ─────────────────────────────────────────────────────────────────
const cited = [...new Set(refs.map((r) => r.id))]
const allowed = new Set(NOT_A_CLAIM)
for (const id of cited) {
  const fact = facts.get(id)
  if (!fact) continue
  for (const n of numbersIn(fact.assertion)) allowed.add(n)
}

// Schematic.jsx joined this list on 2026-10-22. The figures are made of almost
// nothing BUT numbers — 15, 1500ms, ~750, ~33, 5,000, 250K+, 92%, 0.5% — and it
// was the one surface on the site the gate could not see, so a figure invented
// in a drawing would have shipped silently. SVG coordinates are bare integers
// and none of the claim shapes match a bare integer, so they cost nothing here.
const SCANNED = [
  'src/content/portfolio.js',
  'src/components/Schematic.jsx',
  'public/index.html',
]

for (const rel of SCANNED) {
  const text = readFileSync(join(root, rel), 'utf8')
  for (const token of claimTokens(text)) {
    const parts = [...numbersIn(token)]
    const orphan = parts.filter((n) => !allowed.has(n))
    if (!orphan.length) continue
    problems.push(
      `${rel}  "${token}" is not traceable to any cited fact` +
        `\n      ${orphan.join(', ')} appears in no facts.yaml entry this site cites`
    )
  }
}

// ── PASS 3 ─────────────────────────────────────────────────────────────────
// "Gemini 2.5 Pro API" and facts.yaml's "Gemini 2.5 Pro" are the same thing.
// Normalise away case, punctuation and a trailing API/SDK so the check tests
// substance rather than spelling.
const normalise = (t) =>
  t
    .toLowerCase()
    .replace(/\s+(apis?|sdk)$/, '')
    .replace(/[^a-z0-9]/g, '')

const backedTech = new Set()
for (const id of cited) {
  for (const t of facts.get(id)?.technologies || []) backedTech.add(normalise(t))
}

const content = readFileSync(join(root, 'src/content/portfolio.js'), 'utf8')

function reportUnbacked(surface, listed) {
  const unbacked = listed.filter((t) => !backedTech.has(normalise(t)))
  if (!unbacked.length) return
  problems.push(
    `src/content/portfolio.js  ${surface} names ${unbacked.length} technolog` +
      `${unbacked.length === 1 ? 'y' : 'ies'} no cited fact supports` +
      `\n      ${unbacked.join(', ')}` +
      `\n      Either cite a fact whose \`technologies\` list includes it, or drop it.`
  )
}

// Surface 1 — the Stack section.
const stackBlock = content.slice(content.indexOf('export const stack'))
for (const [, group, items] of stackBlock.matchAll(
  /group: '([^']+)',\s*\n\s*items: \[([^\]]*)\]/g
)) {
  reportUnbacked(
    `Stack group "${group}"`,
    [...items.matchAll(/'([^']+)'/g)].map((m) => m[1])
  )
}

// Surface 2 — the hero facts strip, which repeats the stack as an index and so
// is a second place the page names technologies. It is declared BEFORE
// `export const stack`, so the slice above cannot see it: a technology added
// only here passed the gate silently. Verified by injecting Kubernetes and Rust
// and watching all three passes go green.
//
// Its items are `·`-separated inside `lines` strings rather than a quoted list,
// so they need splitting before they can be compared.
const strip = content.match(/label: 'Stack',\s*\n\s*lines: \[([^\]]*)\]/)
if (strip) {
  reportUnbacked(
    'Hero facts strip',
    [...strip[1].matchAll(/'([^']+)'/g)]
      .flatMap((m) => m[1].split('·'))
      .map((t) => t.trim())
      .filter(Boolean)
  )
}

// ── PASS 4 ─────────────────────────────────────────────────────────────────
// Retired phrasings must not come back.
//
// This exists because of an actual recurrence, not a hypothetical. On
// 2026-10-22 five claims were corrected in portfolio.js — and the
// public/index.html meta description kept saying "92% measured precision" for
// another day, because every pass above is about numbers and IDs. 92 is a real,
// cited, traceable number; "precision" is the part that was false, and nothing
// read the words. The same miss left a source comment telling a future reader
// that a Redisson lock "guarantees idempotency".
//
// A denylist is the cheap half of a semantic check: it cannot tell whether a new
// sentence is true, but it can guarantee a sentence already found to be false
// never silently reappears — in copy, in the document head, or in a comment
// (which is why this pass reads comments, where passes 2 and 3 skip them).
//
// Consequence, and it fired the first time this ran: a comment that tombstones a
// correction must PARAPHRASE the old wording, not quote it. There is deliberately
// no escape marker to exempt a line — an exemption is how a gate like this rots,
// and paraphrasing costs a tombstone nothing. This file is not in SCANNED, which
// is the only reason the quoted examples above are allowed to exist.
//
// Add a row whenever a claim is corrected. Each one is a wording that was on the
// site and was wrong; the fact ID's clarify_note carries the full reasoning.
const RETIRED_PHRASINGS = [
  ['two-tier connection pool', 'MG-002: two datastores, two pooling problems, not two tiers of one path'],
  ['measured precision', 'MG-014: the 92% is a QC pass rate on a sample, not precision'],
  ['classification precision', 'MG-014: same — it is a QC pass rate'],
  ['guarantees idempotency', 'PRJ-006: the lock serialises; execution is at-least-once'],
  ['idempotent execution', 'PRJ-006: at-least-once, with concurrent double-runs ruled out'],
  ['99.2% uptime', 'MG-011: graded strong, but pulled from the site — he cannot say how it was measured'],
  ['RFC-compliant rate limit', 'PRJ-005: the headers are conventional, not an RFC standard'],
]

for (const rel of SCANNED) {
  const text = readFileSync(join(root, rel), 'utf8').toLowerCase()
  for (const [phrase, why] of RETIRED_PHRASINGS) {
    if (!text.includes(phrase.toLowerCase())) continue
    problems.push(
      `${rel}  retired phrasing is back: "${phrase}"` +
        `\n      ${why}` +
        `\n      This wording was corrected because it was false. Do not restore it.`
    )
  }
}

// ── Report ─────────────────────────────────────────────────────────────────
if (problems.length) {
  console.error('\n  ✗ facts check failed\n')
  for (const p of problems) console.error(`      ${p}`)
  console.error(
    `\n  ${problems.length} problem(s). Either cite a \`strong\` fact, or get the grading` +
      `\n  changed in facts.yaml. Do not add to the allowlist without asking Harsh.\n`
  )
  process.exit(1)
}

const usedAllowlist = Object.keys(ALLOWLIST).filter((id) => cited.includes(id))
const staleAllowlist = Object.keys(ALLOWLIST).filter((id) => !cited.includes(id))
// A WARNING, not a failure, and deliberately so.
//
// depth_notes is what Harsh must be able to say out loud about a claim. A fact
// cited on the site with the field still empty is a published claim with no
// written prep behind it — which is survivable (he may simply know it) but is
// worth seeing on every build. MG-038 shipped in exactly that state on
// 2026-10-22.
//
// This does not fail the build because the field is HIS to write, and a gate that
// blocks a deploy until someone else types something is a gate that gets deleted.
// The three hard passes enforce what can be checked mechanically; this one just
// refuses to let the gap go quiet.
const citedNoDepth = cited.filter((id) => !(facts.get(id)?.depth_notes || '').trim())

const scannedCount = SCANNED.reduce(
  (n, rel) => n + claimTokens(readFileSync(join(root, rel), 'utf8')).length,
  0
)

console.log(
  `  ✓ facts check passed` +
    `\n    pass 1 — ${refs.length} citations to ${cited.length} facts, all citable` +
    (usedAllowlist.length ? ` (allowlisted partials: ${usedAllowlist.join(', ')})` : '') +
    `\n    pass 2 — ${scannedCount} claim-shaped numbers across ${SCANNED.length} files, all traceable` +
    `\n    pass 3 — ${backedTech.size} technologies backed by cited facts, Stack section and hero strip clean` +
    `\n    pass 4 — ${RETIRED_PHRASINGS.length} retired phrasings absent from copy, head and comments` +
    (citedNoDepth.length
      ? `\n\n  ! cited with no depth_notes: ${citedNoDepth.join(', ')}` +
        `\n    These are live on the site with nothing written down about how to` +
        `\n    defend them. Fill depth_notes in facts.yaml.`
      : '') +
    (staleAllowlist.length
      ? `\n\n  ! allowlist entries no longer cited: ${staleAllowlist.join(', ')}` +
        `\n    Remove them — a stale entry silently re-permits a \`partial\` fact later.`
      : '')
)
