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

console.log(`  ✓ build/CNAME is "${actual}" — safe to publish`)
