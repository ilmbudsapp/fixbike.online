import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const originals = path.resolve("public/images/parts/originals");
const outDir = path.resolve("public/images/parts");
await mkdir(outDir, { recursive: true });

const files = (await readdir(originals)).filter((f) => f.toLowerCase().endsWith(".png"));

for (const file of files) {
  const input = path.join(originals, file);
  const base = file.replace(/\.png$/i, "");
  const image = sharp(input).rotate();
  const meta = await image.metadata();
  const width = meta.width ?? 1600;

  await sharp(input)
    .rotate()
    .resize({ width: Math.min(1600, width), withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(outDir, `${base}.webp`));

  await sharp(input)
    .rotate()
    .resize({ width: Math.min(1200, width), withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(outDir, `${base}.jpg`));

  console.log("optimized", file);
}
