#!/usr/bin/env node
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(repoRoot, "dist");

const expected = [
  {
    file: "index.html",
    url: "/",
    title: "FixBike Koblenz | E-Bike-Verleih &amp; Fahrradverkauf",
    canonical: "https://fixbike.online/",
    h1: "Dein nächster Weg.",
    snippet: "E-Bike-Verleih und Fahrradverkauf in Koblenz",
  },
  {
    file: path.join("verleih", "index.html"),
    url: "/verleih",
    title: "E-Bike mieten in Koblenz | 105 € / 7 Tage | FixBike",
    canonical: "https://fixbike.online/verleih",
    h1: "E-Bike mieten in Koblenz",
    snippet: "105",
  },
  {
    file: path.join("verkauf", "index.html"),
    url: "/verkauf",
    title: "Fahrräder &amp; E-Bikes kaufen in Koblenz | FixBike",
    canonical: "https://fixbike.online/verkauf",
    h1: "Fahrräder und E-Bikes kaufen in Koblenz",
    snippet: "Kaufberatung",
  },
  {
    file: path.join("ersatzteile", "index.html"),
    url: "/ersatzteile",
    title: "Fahrrad- &amp; E-Bike-Ersatzteile in Koblenz | FixBike",
    canonical: "https://fixbike.online/ersatzteile",
    h1: "Ersatzteile für Fahrrad und E-Bike",
    snippet: "Ersatzteile",
  },
  {
    file: path.join("kontakt", "index.html"),
    url: "/kontakt",
    title: "Kontakt &amp; Anfahrt in Koblenz | FixBike",
    canonical: "https://fixbike.online/kontakt",
    h1: "Kontakt &amp; Anfahrt in Koblenz",
    snippet: "Wallersheimer Weg 16",
  },
];

let failed = 0;
function fail(msg) {
  failed += 1;
  console.error(`FAIL: ${msg}`);
}

function stripTags(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ");
}

for (const row of expected) {
  const filePath = path.join(distDir, row.file);
  if (!fs.existsSync(filePath)) {
    fail(`missing ${row.file}`);
    continue;
  }
  const html = fs.readFileSync(filePath, "utf8");
  if (!html.includes(`<title>${row.title}</title>`)) {
    fail(`${row.url} title mismatch`);
  }
  if (!html.includes(`rel="canonical" href="${row.canonical}"`)) {
    fail(`${row.url} canonical mismatch`);
  }
  if (!html.includes(`property="og:url" content="${row.canonical}"`)) {
    fail(`${row.url} og:url mismatch`);
  }
  if (html.includes("hreflang")) fail(`${row.url} still has hreflang`);
  if (html.includes("BicycleRentalService")) fail(`${row.url} BicycleRentalService`);
  if (html.includes("VideoObject")) fail(`${row.url} VideoObject`);
  if (html.includes("SearchAction")) fail(`${row.url} SearchAction`);
  if (html.includes("priceValidUntil")) fail(`${row.url} priceValidUntil`);
  if (html.includes("InStock")) fail(`${row.url} InStock`);
  if (!html.includes(row.h1)) fail(`${row.url} missing H1 text: ${row.h1}`);
  if (!html.includes(row.snippet)) fail(`${row.url} missing snippet`);
  if (!html.includes('"@id": "https://fixbike.online/#business"') && !html.includes('"@id":"https://fixbike.online/#business"')) {
    fail(`${row.url} missing business @id`);
  }
  const jsonBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (jsonBlocks.length === 0) fail(`${row.url} no JSON-LD`);
  for (const m of jsonBlocks) {
    try {
      JSON.parse(m[1]);
    } catch {
      fail(`${row.url} JSON-LD parse error`);
    }
  }
}

const notFound = path.join(distDir, "404.html");
if (!fs.existsSync(notFound)) fail("missing 404.html");
else {
  const html = fs.readFileSync(notFound, "utf8");
  if (!html.includes("Seite nicht gefunden")) fail("404.html missing heading");
  if (!html.includes("noindex")) fail("404.html should be noindex");
}

const sitemap = fs.readFileSync(path.join(distDir, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const expectedLocs = expected.map((r) => r.canonical);
if (locs.length !== 5) fail(`sitemap has ${locs.length} URLs, expected 5`);
for (const loc of expectedLocs) {
  if (!locs.includes(loc)) fail(`sitemap missing ${loc}`);
}
if (!sitemap.includes("<priority>1.0</priority>")) {
  fail("sitemap missing homepage priority 1.0");
}
if (!sitemap.includes("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")) {
  fail("sitemap missing XML 1.0 declaration");
}

const robots = fs.readFileSync(path.join(distDir, "robots.txt"), "utf8");
if (!robots.includes("User-agent: *") || !robots.includes("Allow: /") || !robots.includes("Sitemap: https://fixbike.online/sitemap.xml")) {
  fail("robots.txt unexpected");
}

const vercel = JSON.parse(fs.readFileSync(path.join(repoRoot, "vercel.json"), "utf8"));
if (Array.isArray(vercel.rewrites) && vercel.rewrites.length > 0) {
  fail("vercel.json still has catch-all rewrites");
}

if (failed) {
  console.error(`seo-check: ${failed} failure(s)`);
  process.exit(1);
}

console.log("OK: static HTML, JSON-LD, sitemap, robots, 404.html");

function mime(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=UTF-8";
  if (filePath.endsWith(".xml")) return "application/xml; charset=UTF-8";
  if (filePath.endsWith(".txt")) return "text/plain; charset=UTF-8";
  if (filePath.endsWith(".js")) return "text/javascript; charset=UTF-8";
  if (filePath.endsWith(".css")) return "text/css; charset=UTF-8";
  return "application/octet-stream";
}

function resolveStatic(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  const candidates = [];
  if (clean === "/") candidates.push(path.join(distDir, "index.html"));
  else {
    const rel = clean.replace(/^\/+/, "");
    candidates.push(path.join(distDir, rel));
    candidates.push(path.join(distDir, rel, "index.html"));
    candidates.push(path.join(distDir, `${rel}.html`));
  }
  for (const file of candidates) {
    const resolved = path.resolve(file);
    if (!resolved.startsWith(path.resolve(distDir))) continue;
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) return { status: 200, file: resolved };
  }
  return { status: 404, file: path.join(distDir, "404.html") };
}

const server = http.createServer((req, res) => {
  const mapped = resolveStatic(req.url ?? "/");
  const body = fs.readFileSync(mapped.file);
  res.writeHead(mapped.status, { "Content-Type": mime(mapped.file) });
  res.end(body);
});

await new Promise((resolve) => server.listen(4179, "127.0.0.1", resolve));
const base = "http://127.0.0.1:4179";

function get(urlPath) {
  return new Promise((resolve, reject) => {
    http
      .get(base + urlPath, (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          resolve({
            status: res.statusCode,
            body: Buffer.concat(chunks).toString("utf8"),
          });
        });
      })
      .on("error", reject);
  });
}

try {
  for (const row of expected) {
    const res = await get(row.url);
    if (res.status !== 200) fail(`HTTP ${res.status} for ${row.url}`);
    if (!res.body.includes(`<title>${row.title}</title>`)) fail(`HTTP title ${row.url}`);
    if (!res.body.includes(row.h1)) fail(`HTTP h1 ${row.url}`);
    if (!res.body.includes(`rel="canonical" href="${row.canonical}"`)) {
      fail(`HTTP canonical ${row.url}`);
    }
  }
  const missing = await get("/audit-nicht-vorhanden-84721");
  if (missing.status !== 404) fail(`unknown URL HTTP ${missing.status}, expected 404`);
  if (!missing.body.includes("Seite nicht gefunden")) fail("404 body missing heading");

  const sm = await get("/sitemap.xml");
  const xml = sm.body;
  const locList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locList) {
    const urlPath = loc.replace("https://fixbike.online", "") || "/";
    const res = await get(urlPath);
    if (res.status !== 200) fail(`sitemap URL ${loc} HTTP ${res.status}`);
    if (!res.body.includes(`rel="canonical" href="${loc}"`)) {
      fail(`sitemap URL ${loc} self-canonical mismatch`);
    }
  }
} finally {
  server.close();
}

if (failed) {
  console.error(`seo-check http: ${failed} failure(s)`);
  process.exit(1);
}
console.log("OK: HTTP GET without JS for five routes, sitemap URLs, true 404");
