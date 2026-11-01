#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(repoRoot, "dist");
const ssrDir = path.join(repoRoot, "dist-ssr");
const templatePath = path.join(distDir, "index.html");

const ssrEntry = ["entry-server.js", "entry-server.mjs"].map((name) => path.join(ssrDir, name)).find((p) => fs.existsSync(p));
if (!ssrEntry) {
  console.error("FAIL: missing SSR bundle in dist-ssr");
  process.exit(1);
}

const { render, getHeadHtml, PRERENDER_PATHS, PAGES, INDEXABLE_PATHS } = await import(
  pathToFileURL(ssrEntry).href
);

const template = fs.readFileSync(templatePath, "utf8");

function inject(html, appHtml, headHtml) {
  let out = html;
  if (out.includes("<!--app-head-->") && out.includes("<!--/app-head-->")) {
    out = out.replace(
      /<!--app-head-->[\s\S]*?<!--\/app-head-->/,
      `<!--app-head-->\n    ${headHtml}\n    <!--/app-head-->`,
    );
  }
  out = out.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  return out;
}

function fileFor(url) {
  if (url === "/__404") return path.join(distDir, "404.html");
  if (url === "/") return path.join(distDir, "index.html");
  return path.join(distDir, url.replace(/^\//, ""), "index.html");
}

for (const url of PRERENDER_PATHS) {
  const appHtml = render(url);
  const head = getHeadHtml(url);
  const html = inject(template, appHtml, head);
  const outPath = fileFor(url);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`prerender ${url} -> ${path.relative(repoRoot, outPath)} (${html.length} bytes)`);
}

const urls = INDEXABLE_PATHS.map((p) => {
  const page = PAGES[p];
  const loc = p === "/" ? "https://fixbike.online/" : `https://fixbike.online${p}`;
  const lastmod = page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : "";
  const changefreq = page.changefreq ? `\n    <changefreq>${page.changefreq}</changefreq>` : "";
  const priority = page.priority ? `\n    <priority>${page.priority}</priority>` : "";
  return `  <url>\n    <loc>${loc}</loc>${lastmod}${changefreq}${priority}\n  </url>`;
}).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(repoRoot, "sitemap.xml"), sitemap);
fs.mkdirSync(path.join(repoRoot, "public"), { recursive: true });
fs.writeFileSync(path.join(repoRoot, "public", "sitemap.xml"), sitemap);
console.log("sitemap.xml written (indexable canonicals only)");
