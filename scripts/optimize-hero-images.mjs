import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const originals = path.resolve("public/images/hero/originals");
const outDir = path.resolve("public/images/hero");
await mkdir(outDir, { recursive: true });

const files = ["fixbike-hero-1-cube.png", "fixbike-hero-2-cube.png"];

for (const file of files) {
  const input = path.join(originals, file);
  const base = file.replace(/\.png$/i, "");
  const image = sharp(input).rotate();
  const meta = await image.metadata();
  const width = meta.width ?? 1672;

  await sharp(input)
    .rotate()
    .resize({ width: Math.min(1672, width), withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(outDir, `${base}.webp`));

  await sharp(input)
    .rotate()
    .resize({ width: Math.min(960, width), withoutEnlargement: true })
    .webp({ quality: 76 })
    .toFile(path.join(outDir, `${base}-960.webp`));

  await sharp(input)
    .rotate()
    .resize({ width: Math.min(1400, width), withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(outDir, `${base}.jpg`));

  console.log("optimized", file);
}
