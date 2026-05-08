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

if (maxWords < 3083) {
  throw new Error(
    `Noscript text too short: ${maxWords} words (minimum 3083 for full-page mirror).`
  );
}

const absoluteInternal =
  (html.match(/href="https:\/\/fixbike\.online\/#/g) || []).length;
const rootRelativeInternal = (html.match(/href="\/#/g) || []).length;
const internal = absoluteInternal + rootRelativeInternal;
if (internal < 85 || absoluteInternal < 75) {
  throw new Error(
    `Expected internal fragment links (absolute ≥75, total ≥85): absolute=${absoluteInternal}, root-relative=${rootRelativeInternal}, total=${internal}.`
  );
}

await writeFile(indexPath, html, "utf8");
console.log(
  `Noscript mirroring synced in index.html (${maxWords} words, ${internal} internal links: ${absoluteInternal} absolute + ${rootRelativeInternal} /#).`
);
