# harshsingh.io — portfolio

Personal site for Harsh Singh, backend & data engineer.
Live at **https://singhcerely.tech**.

Create React App + Sass, deployed to GitHub Pages from the `gh-pages` branch.

```bash
npm install
npm start        # dev server on :3000
npm run build    # facts check, then résumé, then builds
npm run deploy   # verifies build/CNAME, then publishes build/ to gh-pages
```

## The two guard rails

Both exist because the previous version of this site failed in exactly these ways.

### `scripts/check-facts.mjs` — content provenance

Runs on `prebuild`. Two passes, because there are two ways a claim goes wrong.

**Pass 1 — citations resolve.** Every `factIds: [...]` in `src/` must reference an
ID that exists in `facts.yaml`, is graded `defensibility: strong`, **and** has a
graded `scope`. Both, because `scope` is what decides the permitted verbs —
`contributed-a-part` bans *Designed* and *Architected*, `solo` permits them. The
pass read `defensibility` alone until 2026-10-22, which left a strong fact with
an ungraded scope fully citable in any wording. That is the MG-002 trap: commit
authorship proves who wrote the code, never who decided the design.

**Pass 2 — no uncited numbers.** Pass 1 only validates the IDs that are *present*;
it cannot see a number added with no citation at all. That is the shape of the
original bug — the retired figures ("160K+ docs", "10x concurrent users",
"reduced migration time by 80%") lived in the `public/index.html` meta
description, which pass 1 does not even read. Pass 2 scans `src/content/portfolio.js`
**and** `public/index.html` for claim-shaped numbers (`+` suffix, `%`, `x`
multiplier, `→` transition, comma-grouped thousands) and requires each to be
numerically traceable to a cited fact's `claim` or `metric.value`.

Two things that pass 2 deliberately does not read, because both quote the retired
figures in order to tombstone them: `depth_notes`/`clarify_note` in `facts.yaml`,
and source comments. Scraping either would whitelist the exact numbers the gate
exists to catch.

**Pass 3 — the Stack section names nothing the site cannot back.** `portfolio.js`
declares "Only technologies that appear in a cited fact's `technologies` list" as a
comment, and that invariant breaks silently: when a fact stops being cited, the
technologies it justified stay in the Stack section. Neither pass above notices —
pass 1 only validates `factIds` that are present, pass 2 only reads numbers, and
"Jetpack Compose" is neither. This pass makes the comment executable. Names are
normalised for case, punctuation and a trailing API/SDK, so `Gemini 2.5 Pro API`
matches facts.yaml's `Gemini 2.5 Pro`.

This is not hypothetical: it fired the first time it ran. Dropping the mobile line
from the MathonGo role decited MG-022/MG-024/MG-028, which left Kotlin, Jetpack
Compose, FCM and Firestore sitting in the Stack section with nothing behind them.

**Pass 4 — retired phrasings stay retired.** Passes 1–3 read IDs, numbers and
technology names. None of them reads a *sentence*. So when "92% measured
precision" was corrected to "92% QC pass rate" in the copy on 2026-10-22, the
identical phrase survived in the `public/index.html` meta description and all
three passes stayed green: 92 is a real, cited, traceable number, and
"precision" is the word that was false. The same miss left a source comment
asserting that a Redisson lock "guarantees idempotency".

Pass 4 is a denylist of wordings already found to be wrong (`RETIRED_PHRASINGS`).
It cannot judge whether a *new* sentence is true — only stop an old false one
from reappearing. **Add a row whenever a claim is corrected.** It reads comments,
unlike passes 2 and 3, because that is where one of the two misses was.

One consequence, which fired the first time it ran: a comment tombstoning a
correction must **paraphrase** the old wording, not quote it. There is
deliberately no escape marker to exempt a line — an exemption is how a gate like
this rots, and paraphrasing costs a tombstone nothing.

**One warning, not a pass.** The build also prints `cited with no depth_notes:
...` for any fact that is live on the site with that field empty — a published
claim with nothing written down about how to defend it. It does **not** fail the
build, because the field is Harsh's to write and a gate that blocks a deploy
until someone else types something is a gate that gets deleted.

What none of this catches: a real number attached to the wrong project. The old
site put MG-021's genuine "80%" under the tagging work instead of the asset
platform — every pass sees a cited, traceable number in permitted words. That one
needs a reader. **The gate verifies provenance, not truth.** All five claims
corrected on 2026-10-22 passed every pass that existed at the time.

`facts.yaml` is the single source of truth for every verifiable claim on the site.

One `partial`-graded fact is allowlisted in the script (`MG-003`, the 300K DAU
scale figure) because Harsh approved it individually, with a constraint on how it
may be phrased: environment context only, never ownership. See the comments in
`src/content/portfolio.js`. Do not add to that allowlist without asking him.

```bash
npm run check:facts
```

### `scripts/build-resume.mjs` — one source of truth, two outputs

Also runs on `prebuild`, after the facts gate. Renders `public/resume.html` from
`src/content/portfolio.js` — the same copy the page ships, so the résumé inherits
all four passes above and cannot drift from the site or reintroduce a retired
figure. Print to PDF from that page; it is styled for A4 and hides nothing but
its own footer.

It does **not** re-derive a selection from `facts.yaml`. That would be a third
curation to keep in step, and the whole reason the previous résumé was wrong is
that it was a second one. `portfolio.js` is pure data with no imports, so the
script evaluates it as a function body rather than importing it (this package is
CJS, that file is ESM). If anyone adds an `import` there, the script throws.

`resume.html` is generated but **committed**, so `npm start` and a plain
`git clone` both serve it. `prebuild` overwrites it, so a hand-edit cannot reach
a deploy.

### `scripts/check-cname.mjs` — deploy safety

Runs before `gh-pages -d build`. Refuses to publish if `build/CNAME` is missing or
does not say `singhcerely.tech`, or if `build/resume.html` is missing — the hero
links it, so publishing without it ships a 404 on a primary CTA.

The custom domain is configured by the `CNAME` file on the published branch. For a
long time `public/CNAME` here said `harshsingh.io` — a host that no longer resolves
— while the deployed branch said `singhcerely.tech`. The working value existed only
on `gh-pages`, one deploy away from being destroyed, with GitHub Pages re-reading
the file to set the custom-domain field.

**If the domain ever changes, update `public/CNAME`, the root `CNAME`, the
`EXPECTED` constant in `check-cname.mjs`, `homepage` in `package.json`, and the
canonical/OG/JSON-LD URLs in `public/index.html`.** Use an escaped dot when
find-and-replacing (`harshsingh\.io`) — the GitHub username `harshsingh-io` appears
~98 times in `src/` and an unescaped pattern matches it too.

## Layout

```
src/
  content/portfolio.js   all site copy, each claim tagged with its facts.yaml IDs
  components/            one file per section, no barrel files
  hooks/                 useReveal, useTheme, useHashScroll
  styles/
    index.scss           @use order matters: tokens -> base -> components
    _tokens.scss         design tokens; every colour pair carries its measured ratio
    _base.scss           reset, layout primitives, motion contract
    _components.scss     section styles
public/
  fonts/                 self-hosted woff2, declared inline in index.html
  img/                   the LCP portrait, served with a stable preloadable URL
  resume.html            GENERATED by scripts/build-resume.mjs — do not hand-edit
```

## Things that will bite you

- **Fonts and the LCP image live in `public/`, not `src/assets/`,** so their URLs
  are stable and `index.html` can preload them. A webpack-hashed URL cannot be
  preloaded at author time, and CRA's css-loader cannot resolve a root-relative
  `url()` at all.
- **`.enter` is only `opacity: 0` inside `@media (prefers-reduced-motion:
  no-preference)`.** Under that query content really is hidden until `useReveal`
  adds `is-in`, so that hook is the guarantee, not the media query: it reveals on
  three paths (observer fires, IntersectionObserver missing, or a 1.5s failsafe).
  Under `reduce` the opacity rule never applies. With JS disabled, CRA renders an
  empty `#root` and the `<noscript>` block is the fallback. Do not "simplify" this
  by moving the opacity rule out of the media query, and do not delete the
  failsafe on the assumption that CSS alone keeps the page readable.
- **`useHashScroll` deliberately avoids `requestAnimationFrame`** (deferred until
  first paint in some contexts) and deliberately scrolls instantly (`scroll-behavior:
  smooth` on the root otherwise swallows the programmatic scroll).
- **Retired anchors** — `#portfolio`, `#mobile`, `#skills`, `#services`,
  `#testimonial` — are kept alive as zero-height sentinels inside the sections that
  replaced them. Old links still resolve.
- **The PWA was removed, and the teardown is permanent.** `src/index.js` calls
  `unregister()` to kill service workers still installed in returning visitors'
  browsers, and clears the caches they left. **DECIDED 2026-10-22: this stays
  indefinitely, do not delete it.** The earlier note said "keep it for a release
  or two", which would have meant that anyone who had not loaded the site since
  September kept a stale cached shell forever — a visitor with no way to know they
  are reading old copy. The call costs a few bytes; a stale shell costs
  correctness, and this site's whole point is that its claims are current.
  (Lighthouse dropped the PWA category in 12.0, so there is no score to protect.)

## Measured

Lighthouse 13.5.0, production build, local static server. **Re-measured
2026-10-22** on the commit that added the résumé CTA.

| | Perf | A11y | Best practices | SEO |
|---|---|---|---|---|
| Desktop | 100 | 100 | 100 | 100 |
| Mobile | 97 | 100 | 100 | 100 |

Lighthouse 13 adds an *agentic browsing* category; it scores 100 on both.

| | LCP | CLS | TBT | Speed Index |
|---|---|---|---|---|
| Desktop | 0.5s | 0 | 0ms | 0.3s |
| Mobile | 2.6s | 0 | 10ms | 1.1s |

JS 56 KB gzip, CSS 5 KB gzip, three self-hosted font files at 67 KB total, ~505 KB
transferred in all.

Google Analytics is the largest single request on the page at ~187 KB — more than
the entire app bundle. Removing it does not change the Lighthouse score but does cut
total transfer from ~520 KB to ~336 KB and Speed Index from 1.6s to 1.1s. It is kept
for continuity of the existing property; delete the two `gtag` blocks in
`public/index.html` if that trade stops being worth it.
