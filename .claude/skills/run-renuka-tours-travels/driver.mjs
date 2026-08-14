#!/usr/bin/env node
// Minimal chromium-cli-style REPL driver for driving this Next.js app
// headlessly. Reads newline-delimited commands from stdin, keeps one
// browser page open across the whole session, exits at EOF.
//
// Commands:
//   nav <url>                 - navigate
//   wait-for text=<text>      - wait until text appears on the page
//   wait-for <css-selector>   - wait until a selector is attached
//   click <css-selector>      - click (supports :has-text("..."))
//   fill <selector> <value>   - fill an input (value = rest of line)
//   press <key>               - keyboard.press, e.g. Enter
//   wait <ms>                 - pause (use after wait-for, to let the
//                                site's anime.js scroll-reveal animations
//                                finish before a screenshot — see Gotchas)
//   scroll <y>                - window.scrollTo(0, y)
//   screenshot [name]         - save PNG to ./screenshots/
//   console --errors          - print captured console.error / pageerror messages
//   eval <js-expression>      - page.evaluate and print the result
//   quit                      - close browser and exit
//
// Usage:
//   node .claude/skills/run-renuka-tours-travels/driver.mjs <<'EOF'
//   nav http://localhost:3000
//   wait-for text=Journeys
//   screenshot home
//   EOF

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

async function readAllStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

const SKILL_DIR = dirname(fileURLToPath(import.meta.url));
const SHOTS_DIR = join(SKILL_DIR, "screenshots");
mkdirSync(SHOTS_DIR, { recursive: true });

const consoleErrors = [];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message}`));
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(`console.error: ${msg.text()}`);
});

let shotCount = 0;

async function run(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return;

  const spaceIdx = trimmed.indexOf(" ");
  const cmd = spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx);
  const rest = spaceIdx === -1 ? "" : trimmed.slice(spaceIdx + 1).trim();

  try {
    switch (cmd) {
      case "nav": {
        await page.goto(rest, { waitUntil: "load", timeout: 45000 });
        console.log(`ok: navigated to ${rest}`);
        break;
      }
      case "wait-for": {
        if (rest.startsWith("text=")) {
          await page.getByText(rest.slice(5)).first().waitFor({ timeout: 20000 });
        } else {
          await page.waitForSelector(rest, { timeout: 20000 });
        }
        console.log(`ok: found ${rest}`);
        break;
      }
      case "click": {
        await page.click(rest, { timeout: 15000 });
        console.log(`ok: clicked ${rest}`);
        break;
      }
      case "fill": {
        const m = rest.match(/^(\S+)\s+(.*)$/);
        if (!m) throw new Error("usage: fill <selector> <value>");
        await page.fill(m[1], m[2], { timeout: 15000 });
        console.log(`ok: filled ${m[1]}`);
        break;
      }
      case "wait": {
        await page.waitForTimeout(Number(rest) || 500);
        console.log(`ok: waited ${rest}ms`);
        break;
      }
      case "press": {
        await page.keyboard.press(rest);
        console.log(`ok: pressed ${rest}`);
        break;
      }
      case "scroll": {
        const y = Number(rest) || 0;
        await page.evaluate((amount) => window.scrollTo(0, amount), y);
        console.log(`ok: scrolled to ${y}`);
        break;
      }
      case "screenshot": {
        shotCount += 1;
        const name = rest || `shot-${String(shotCount).padStart(2, "0")}`;
        const path = join(SHOTS_DIR, `${name}.png`);
        await page.screenshot({ path });
        console.log(`ok: screenshot -> ${path}`);
        break;
      }
      case "console": {
        if (rest === "--errors") {
          if (consoleErrors.length === 0) console.log("ok: no console errors");
          else console.log("errors:\n" + consoleErrors.join("\n"));
        }
        break;
      }
      case "eval": {
        // Pass the function itself to page.evaluate (which serializes
        // and runs it inside the browser) — do NOT invoke it here, that
        // would run `rest` in Node's context, where `document`/`window`
        // don't exist. (An earlier version did exactly that.)
        const result = await page.evaluate(new Function(`return (${rest})`));
        console.log("ok:", JSON.stringify(result));
        break;
      }
      case "quit":
      case "exit": {
        await browser.close();
        process.exit(0);
        break;
      }
      default:
        console.log(`error: unknown command "${cmd}"`);
    }
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
}

// Read the whole script up front and run commands strictly in order —
// readline's per-line "line"/"close" events race with async handlers
// on piped (non-TTY) input, since Node emits all buffered lines
// synchronously before an async handler's first await ever runs. That
// let "close" fire (closing the browser) while the first command was
// still in flight. Reading everything first and awaiting a plain
// for-of loop avoids the race entirely.
const script = await readAllStdin();
for (const line of script.split("\n")) {
  await run(line);
}
await browser.close();
process.exit(0);
