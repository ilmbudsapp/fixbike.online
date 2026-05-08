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

const blocks = [...html.matchAll(/<noscript>([\s\S]*?)<\/noscript>/g)];
if (blocks.length === 0) {
  throw new Error("No noscript blocks found.");
}

let maxWords = 0;
for (const m of blocks) {
  const text = m[1].replace(/<[^>]+>/g, " ");
  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  if (words > maxWords) maxWords = words;
}

if (maxWords < 1073) {
  throw new Error(
    `Noscript text too short: ${maxWords} words (minimum 1073 for scanner parity).`
  );
}

const internal =
  (html.match(/href="https:\/\/fixbike\.online\/#/g) || []).length;
if (internal < 20) {
  throw new Error(
    `Expected at least 20 fixbike.online internal fragment links, found ${internal}.`
  );
}

await writeFile(indexPath, html, "utf8");
console.log(
  `Noscript mirroring synced in index.html (${maxWords} words, ${internal} internal links).`
);
