import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const pages = ["/", "/fleet", "/fleet/toyota-etios", "/destinations", "/destinations/goa", "/services", "/about", "/contact", "/gallery", "/booking", "/blog", "/blog/best-time-to-visit-coorg-from-bangalore"];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

for (const path of pages) {
  await page.goto(BASE + path, { waitUntil: "load", timeout: 20000 });
  await page.waitForTimeout(1200);

  const overflow = await page.evaluate(() => {
    const html = document.documentElement;
    return {
      scrollWidth: html.scrollWidth,
      clientWidth: html.clientWidth,
      overflowing: html.scrollWidth > html.clientWidth + 1,
    };
  });

  const tinyTapTargets = await page.evaluate(() => {
    const interactive = [...document.querySelectorAll("a, button")];
    return interactive
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && (r.width < 24 || r.height < 24);
      })
      .map((el) => ({
        tag: el.tagName,
        text: el.textContent?.trim().slice(0, 30),
        w: Math.round(el.getBoundingClientRect().width),
        h: Math.round(el.getBoundingClientRect().height),
      }))
      .slice(0, 10);
  });

  console.log(`\n=== ${path} ===`);
  console.log("overflow:", overflow);
  if (tinyTapTargets.length) console.log("tiny tap targets:", JSON.stringify(tinyTapTargets));

  const shotName = path === "/" ? "home" : path.replace(/\//g, "_");
  await page.screenshot({
    path: `.claude/skills/run-renuka-tours-travels/screenshots/mobile${shotName}.png`,
    fullPage: false,
  });
}

await browser.close();
