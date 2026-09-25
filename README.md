# harshsingh.io — portfolio

Personal site for Harsh Singh, backend & data engineer.
Live at **https://singhcerely.tech**.

Create React App + Sass, deployed to GitHub Pages from the `gh-pages` branch.

```bash
npm install
npm start        # dev server on :3000
npm run build    # runs the facts check, then builds
npm run deploy   # verifies build/CNAME, then publishes build/ to gh-pages
```

## The two guard rails

Both exist because the previous version of this site failed in exactly these ways.

### `scripts/check-facts.mjs` — content provenance

Runs on `prebuild`. Two passes, because there are two ways a claim goes wrong.

**Pass 1 — citations resolve.** Every `factIds: [...]` in `src/` must reference an
ID that exists in `facts.yaml` and is graded `defensibility: strong`.

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

What it still cannot catch: a real number attached to the wrong project. The old
site put MG-021's genuine "80%" under the tagging work instead of the asset
platform — both passes see a cited, traceable number. That one needs a reader.

`facts.yaml` is the single source of truth for every verifiable claim on the site.

Three `partial`-graded facts are allowlisted in the script because they were
approved individually, each with a constraint on how it may be phrased (see the
comments in `src/content/portfolio.js`). Do not add to that allowlist without
asking Harsh.

```bash
npm run check:facts
```

### `scripts/check-cname.mjs` — deploy safety

Runs before `gh-pages -d build`. Refuses to publish if `build/CNAME` is missing or
does not say `singhcerely.tech`.

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
```

## Things that will bite you

- **Fonts and the LCP image live in `public/`, not `src/assets/`,** so their URLs
  are stable and `index.html` can preload them. A webpack-hashed URL cannot be
  preloaded at author time, and CRA's css-loader cannot resolve a root-relative
  `url()` at all.
- **`.enter` is only `opacity: 0` inside `@media (prefers-reduced-motion:
  no-preference)`.** Content is never hidden by default — if JS fails, everything
  renders. `useReveal` also has a 1.5s failsafe. Do not "simplify" this by moving
  the opacity rule out of the media query.
- **`useHashScroll` deliberately avoids `requestAnimationFrame`** (deferred until
  first paint in some contexts) and deliberately scrolls instantly (`scroll-behavior:
  smooth` on the root otherwise swallows the programmatic scroll).
- **Retired anchors** — `#portfolio`, `#mobile`, `#skills`, `#services`,
  `#testimonial` — are kept alive as zero-height sentinels inside the sections that
  replaced them. Old links still resolve.
- **The PWA was removed.** `src/index.js` calls `unregister()` to tear down service
  workers still installed in returning visitors' browsers, and clears the caches
  they left. Keep that call for a release or two. (Lighthouse dropped the PWA
  category in 12.0, so there is no score to protect.)

## Measured

Lighthouse, production build, local server:

| | Perf | A11y | Best practices | SEO |
|---|---|---|---|---|
| Desktop | 100 | 100 | 100 | 100 |
| Mobile | 97 | 100 | 100 | 100 |

CLS 0 on both. JS 54 KB gzip, CSS 5 KB gzip, three self-hosted font files at 67 KB
total.

Google Analytics is the largest single request on the page at ~187 KB — more than
the entire app bundle. Removing it does not change the Lighthouse score but does cut
total transfer from ~520 KB to ~336 KB and Speed Index from 1.6s to 1.1s. It is kept
for continuity of the existing property; delete the two `gtag` blocks in
`public/index.html` if that trade stops being worth it.
