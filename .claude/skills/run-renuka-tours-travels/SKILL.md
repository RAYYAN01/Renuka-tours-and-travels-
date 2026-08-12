---
name: run-renuka-tours-travels
description: Build, run, and drive the Renuka Tours & Travels Next.js site. Use when asked to start the dev server, build it, run lint, take a screenshot of a page, or click/fill through a flow (booking form, gallery filters, nav) to confirm a change works.
---

Next.js 16 App Router site (React 19, Tailwind v4). No backend — every
page is either static or client-rendered from local data in `src/lib/`.
Drive it via `.claude/skills/run-renuka-tours-travels/driver.mjs`, a
small headless-Chromium REPL (Playwright) that reads chromium-cli-style
commands from stdin. All paths below are relative to the repo root.

## Prerequisites

Windows/PowerShell environment (this repo was authored and verified
on Windows, not Linux — commands below use `curl`/`node`/PowerShell,
not `lsof`). Node.js and npm already on PATH.

## Setup

```bash
npm install
npm install -D playwright   # only if not already a devDependency
npx playwright install chromium
```

`node_modules/.bin` and the Playwright Chromium download must both be
present before the driver will run.

## Build

```bash
npm run build
```

Emits a report of every route (static vs. SSG) — 32 routes as of this
writing (9 fleet detail pages, 9 destination detail pages, plus the
top-level pages). No `.env` file or secrets are required.

## Run (agent path)

Start the dev server in the background and poll the port instead of
sleeping:

```bash
npm run dev &
timeout=30; for i in $(seq 1 $timeout); do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/)
  [ "$code" = "200" ] && break
  sleep 1
done
```

Drive it by piping a command script to the driver:

```bash
node .claude/skills/run-renuka-tours-travels/driver.mjs <<'EOF'
nav http://localhost:3000
wait-for text=Journeys
wait 1000
screenshot home
console --errors
EOF
```

Screenshots land in `.claude/skills/run-renuka-tours-travels/screenshots/<name>.png`.

| command | what it does |
|---|---|
| `nav <url>` | navigate |
| `wait-for text=<text>` | wait until text appears anywhere on the page |
| `wait-for <css-selector>` | wait until a selector is attached |
| `click <css-selector>` | click — supports `:has-text("...")` |
| `fill <selector> <value>` | fill an input; value is the rest of the line |
| `press <key>` | `page.keyboard.press`, e.g. `Enter` |
| `wait <ms>` | pause — see Gotchas, this matters here |
| `screenshot [name]` | save PNG, default name `shot-NN` |
| `console --errors` | print every captured `console.error`/`pageerror` since launch |
| `eval <js-expression>` | `page.evaluate`, prints the JSON result |
| `quit` | close the browser early (otherwise closes at EOF) |

Stop the dev server when done (Windows has no `lsof`; this is the
verified equivalent):

```bash
powershell -Command "Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id \$_ -Force -ErrorAction SilentlyContinue }"
```

## Run (human path)

`npm run dev` → opens on `http://localhost:3000`, Ctrl-C to stop.
`npm run start` requires `npm run build` first (no dev overlay, closer
to production).

## Test

```bash
npm run lint
```

No unit/e2e test suite exists in this repo — `lint` (ESLint via
`next lint`) is the only automated check besides `npm run build`
itself (which also runs `tsc` as part of the Next.js build step).

## Gotchas

- **Screenshots taken right after `wait-for` catch the site's
  scroll-reveal animations mid-flight.** Every heading/card fades and
  translates in via `anime.js` (`Reveal`/`SplitReveal` components,
  used on nearly every page) — even instant navigation to a `#`-free
  URL still runs the entrance animation once the target text mounts.
  Verified: a `screenshot` taken immediately after `wait-for text=...`
  shows headings mid-fade and gallery thumbnails at partial opacity.
  Fix: add `wait 1000` (or more, `SplitReveal` staggers can run past
  1.5s on sections with many words) between `wait-for` and
  `screenshot`.
- **`readline`'s line-by-line async event handling races with piped
  heredoc input.** The driver does *not* use Node's `readline` "line"
  event API for this reason — an early version did, and stdin's
  `close` event fired (closing the browser) while the first command's
  `page.goto()` was still in flight, because Node emits every buffered
  line from a heredoc synchronously in one tick, before an `async`
  line-handler's first `await` ever runs. The driver instead reads all
  of stdin up front and awaits commands in a plain `for...of` loop.
  Relevant if you ever extend `driver.mjs` — don't reintroduce
  event-driven per-line processing without re-verifying against a
  multi-line heredoc.
- **A React hydration-mismatch warning was observed once on `/`, but
  did not reproduce on two subsequent fresh-server retries.** When it
  fired, `console --errors` reported it against the pickup/destination/
  date/passenger `<input>` elements in `QuickSearch.tsx` — server HTML
  missing a `style={{caret-color:"transparent"}}` that gets applied
  client-side. Likely a dev-mode-only timing fluke (first-compile
  race?), not a reliable repro. Mentioned so that if you see it once
  and can't get it to recur, you know that's consistent with what was
  seen while authoring this skill — not a regression you need to chase.
- **No `lsof` on Windows.** The port-kill line in this doc uses
  `Get-NetTCPConnection` + `Stop-Process`, not the `lsof -ti:3000`
  pattern common in Linux-container skills. `$!` after `npm run dev &`
  is also unreliable here for the same reason it is everywhere else —
  npm's wrapper process isn't the actual `next dev` server process.

## Troubleshooting

- **`Error: Executable doesn't exist at ...\chrome_headless_shell...`**
  (or similar Playwright browser-not-found error): `npx playwright
  install chromium` wasn't run, or ran against a different Playwright
  version than what's in `node_modules`. Re-run install after any
  `npm install` that touches the `playwright` version.
- **`net::ERR_ABORTED` on the first `nav` with no other output before
  it**: almost always means the dev server wasn't actually up yet —
  confirm the port-polling loop in "Run (agent path)" actually saw a
  `200` before invoking the driver, don't replace it with a fixed
  `sleep`.
- **Port 3000 already in use / `EADDRINUSE`** on `npm run dev`: a
  previous dev server from an earlier session is still bound to the
  port. Run the port-kill command above before relaunching.
