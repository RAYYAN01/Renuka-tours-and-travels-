#!/usr/bin/env node
// Automated technical-SEO validation against a running instance of this
// site (dev or production build — point it at either via BASE_URL).
// No new dependencies: plain fetch + regex-based HTML extraction, since
// the HTML Next.js emits here is well-formed and this only needs to
// pull a handful of well-known tags out of it.
//
// Usage:
//   node scripts/seo-check.mjs                       # http://localhost:3000
//   BASE_URL=https://www.renukatoursandtravel.com node scripts/seo-check.mjs

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

const errors = [];
const warnings = [];
function fail(msg) {
  errors.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: "manual" });
  return { res, body: res.status < 300 || res.status >= 400 ? await res.text().catch(() => "") : "" };
}

function extract(html, re) {
  const m = html.match(re);
  return m ? m[1] : null;
}
function extractAll(html, re) {
  return [...html.matchAll(re)].map((m) => m[1]);
}

async function main() {
  console.log(`SEO check against ${BASE_URL}\n`);

  // 1. robots.txt
  const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
  const robotsBody = await robotsRes.text();
  if (robotsRes.status !== 200) fail(`robots.txt returned HTTP ${robotsRes.status}`);
  const sitemapLine = robotsBody.match(/Sitemap:\s*(\S+)/i);
  if (!sitemapLine) fail("robots.txt does not declare a Sitemap: line");
  if (/Disallow:\s*\/\s*$/im.test(robotsBody)) fail("robots.txt disallows the entire site (Disallow: /)");
  console.log(`robots.txt: HTTP ${robotsRes.status}, sitemap declared: ${sitemapLine ? sitemapLine[1] : "MISSING"}`);

  // 2. sitemap.xml
  const sitemapUrl = sitemapLine ? sitemapLine[1] : `${BASE_URL}/sitemap.xml`;
  const sitemapRes = await fetch(sitemapUrl);
  const sitemapBody = await sitemapRes.text();
  if (sitemapRes.status !== 200) fail(`sitemap.xml returned HTTP ${sitemapRes.status}`);
  if (!sitemapBody.startsWith("<?xml")) fail("sitemap.xml does not start with an XML declaration");
  const sitemapUrls = extractAll(sitemapBody, /<loc>([^<]+)<\/loc>/g);
  console.log(`sitemap.xml: HTTP ${sitemapRes.status}, ${sitemapUrls.length} URLs\n`);

  const dupUrls = sitemapUrls.filter((u, i) => sitemapUrls.indexOf(u) !== i);
  if (dupUrls.length) fail(`sitemap.xml has duplicate URLs: ${[...new Set(dupUrls)].join(", ")}`);

  // 3. Crawl every sitemap URL
  const seenTitles = new Map();
  const seenDescriptions = new Map();
  const internalLinksFound = new Set();

  for (const sitemapEntryUrl of sitemapUrls) {
    const localUrl = sitemapEntryUrl.replace(sitemapUrl.replace("/sitemap.xml", ""), BASE_URL);
    const { res, body } = await fetchText(localUrl);
    const path = localUrl.replace(BASE_URL, "") || "/";

    if (res.status !== 200) {
      fail(`${path}: sitemap URL returned HTTP ${res.status} (must be 200)`);
      continue;
    }

    const title = extract(body, /<title>([^<]*)<\/title>/);
    const description = extract(body, /<meta name="description" content="([^"]*)"/);
    const canonical = extract(body, /<link rel="canonical" href="([^"]*)"/);
    const robotsMeta = extract(body, /<meta name="robots" content="([^"]*)"/);
    const h1s = extractAll(body, /<h1[^>]*>/g);
    const ogTitle = extract(body, /<meta property="og:title" content="([^"]*)"/);
    const ogUrl = extract(body, /<meta property="og:url" content="([^"]*)"/);
    const hasJsonLd = /<script type="application\/ld\+json">/.test(body);

    if (!title) fail(`${path}: missing <title>`);
    if (!description) fail(`${path}: missing meta description`);
    if (!canonical) fail(`${path}: missing canonical link`);
    else if (canonical !== sitemapEntryUrl) {
      fail(`${path}: canonical (${canonical}) does not match its own sitemap URL (${sitemapEntryUrl})`);
    }
    if (robotsMeta && /noindex/i.test(robotsMeta)) {
      fail(`${path}: is in sitemap.xml but has a noindex robots meta tag`);
    }
    if (h1s.length === 0) fail(`${path}: no <h1> found`);
    if (h1s.length > 1) fail(`${path}: ${h1s.length} <h1> tags found (should be exactly 1)`);
    if (!ogTitle) warn(`${path}: missing og:title`);
    if (ogUrl && ogUrl !== sitemapEntryUrl) {
      fail(`${path}: og:url (${ogUrl}) does not match its own canonical/sitemap URL`);
    }
    if (!hasJsonLd) warn(`${path}: no JSON-LD structured data found`);

    if (title) {
      const key = title.trim();
      if (seenTitles.has(key)) fail(`Duplicate <title> "${key}": ${seenTitles.get(key)} and ${path}`);
      else seenTitles.set(key, path);
    }
    if (description) {
      const key = description.trim();
      if (seenDescriptions.has(key)) fail(`Duplicate meta description: ${seenDescriptions.get(key)} and ${path}`);
      else seenDescriptions.set(key, path);
    }

    for (const href of extractAll(body, /href="(\/[^"#?]*)/g)) {
      internalLinksFound.add(href);
    }

    console.log(`${res.status}  ${path}  h1=${h1s.length}  title="${(title || "").slice(0, 50)}"`);
  }

  // 4. Orphan-page check: every sitemap page should be reachable via
  // at least one internal <a href> found while crawling the site.
  const sitemapPaths = new Set(sitemapUrls.map((u) => u.replace(sitemapUrl.replace("/sitemap.xml", ""), "") || "/"));
  for (const p of sitemapPaths) {
    if (p === "/") continue; // homepage is the crawl root, never "linked to" itself
    if (!internalLinksFound.has(p)) {
      warn(`${p}: in sitemap.xml but no internal <a href="${p}"> found on any crawled page (possible orphan)`);
    }
  }

  // 5. 404 behavior
  const notFoundUrl = `${BASE_URL}/this-page-should-not-exist-${Date.now()}`;
  const notFoundRes = await fetch(notFoundUrl);
  if (notFoundRes.status !== 404) fail(`Nonexistent URL returned HTTP ${notFoundRes.status}, expected 404`);
  else console.log(`\n404 check: HTTP ${notFoundRes.status} for a nonexistent URL — correct`);

  // Report
  console.log(`\n${"=".repeat(60)}`);
  console.log(`SEO CHECK RESULT: ${errors.length} error(s), ${warnings.length} warning(s)`);
  console.log("=".repeat(60));
  if (warnings.length) {
    console.log("\nWarnings:");
    for (const w of warnings) console.log(`  - ${w}`);
  }
  if (errors.length) {
    console.log("\nErrors:");
    for (const e of errors) console.log(`  - ${e}`);
    process.exit(1);
  }
  console.log("\nAll checks passed.");
}

main().catch((e) => {
  console.error("seo-check crashed:", e);
  process.exit(1);
});
