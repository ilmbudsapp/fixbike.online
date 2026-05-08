import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const indexPath = resolve(process.cwd(), "index.html");
const html = await readFile(indexPath, "utf8");

if (!html.includes("<noscript>") || !html.includes("</noscript>")) {
  throw new Error("Noscript block not found in index.html");
}

if (!html.includes('href="https://fixbike.online/#verleih"')) {
  throw new Error("Expected internal links are missing in noscript menu.");
}

// Keep mirroring script idempotent: validate and re-save current static HTML.
await writeFile(indexPath, html, "utf8");
console.log("Noscript mirroring synced in index.html");
