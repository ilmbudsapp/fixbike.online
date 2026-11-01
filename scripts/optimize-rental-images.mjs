import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const originals = path.resolve("public/images/rental/originals");
const outDir = path.resolve("public/images");
await mkdir(outDir, { recursive: true });

const files = [
  "cube-touring-hybrid-m.png",
  "cube-touring-hybrid-l.png",
  "cube-stereo-hybrid-m.png",
];

for (const file of files) {
  const input = path.join(originals, file);
  const base = file.replace(/\.png$/i, "");

  await sharp(input)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(outDir, `${base}.webp`));

  await sharp(input)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(outDir, `${base}.jpg`));

  console.log("optimized", file);
}
