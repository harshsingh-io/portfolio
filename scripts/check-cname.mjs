#!/usr/bin/env node
// Deploy guard. Runs before `gh-pages -d build`.
//
// The live custom domain is configured by the CNAME file on the gh-pages branch.
// For a long time this repo's public/CNAME said `harshsingh.io` (a host that no
// longer resolves) while the deployed branch said `singhcerely.tech` — meaning the
// working value existed *only* on the published branch, one deploy away from being
// destroyed, with GitHub Pages re-reading the file to set the custom-domain field.
//
// This refuses to publish a build whose CNAME does not match the expected host.

import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const EXPECTED = 'singhcerely.tech'

const buildCname = join(root, 'build', 'CNAME')

if (!existsSync(buildCname)) {
  console.error(
    `\n  ✗ deploy blocked — build/CNAME is missing.\n` +
      `      Publishing without it drops the custom domain and the site falls back\n` +
      `      to the github.io URL. Check that public/CNAME exists before building.\n`
  )
  process.exit(1)
}

const actual = readFileSync(buildCname, 'utf8').trim()

if (actual !== EXPECTED) {
  console.error(
    `\n  ✗ deploy blocked — build/CNAME says "${actual}", expected "${EXPECTED}".\n` +
      `      Publishing this would repoint the live custom domain.\n` +
      `      Fix public/CNAME, rebuild, and try again.\n`
  )
  process.exit(1)
}

// The hero links /resume.html, so a build missing that file ships a dead CTA —
// which is the exact failure the "no résumé" decision was avoiding before the
// page existed. It is generated in `prebuild`, so this only trips if someone
// deploys a stale or hand-assembled build/ directory.
if (!existsSync(join(root, 'build', 'resume.html'))) {
  console.error(
    `\n  ✗ deploy blocked — build/resume.html is missing.\n` +
      `      The hero's Résumé button links /resume.html; publishing without it\n` +
      `      ships a 404 on a primary CTA. Run \`npm run build\` rather than\n` +
      `      deploying an existing build/ directory.\n`
  )
  process.exit(1)
}

console.log(`  ✓ build/CNAME is "${actual}" — safe to publish, résumé present`)
