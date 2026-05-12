#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(repoRoot, "sitemap.xml");
const targetDir = path.join(repoRoot, "public");
const target = path.join(targetDir, "sitemap.xml");

if (!fs.existsSync(source)) {
  console.error(`FAIL: missing root sitemap at ${source}`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });
fs.copyFileSync(source, target);

const xml = fs.readFileSync(target, "utf8").replace(/^\uFEFF/, "");
if (!xml.startsWith("<?xml")) {
  console.error("FAIL: root sitemap.xml must start with an XML declaration");
  process.exit(1);
}

console.log(`OK: synced ${source} -> ${target}`);
