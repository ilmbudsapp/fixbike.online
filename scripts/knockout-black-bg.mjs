import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";

const input = "public/images/fixbike-logo-src.png";
const output = "public/images/fixbike-logo.png";

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const pixels = new Uint8Array(data);
const { width, height } = info;

for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];
  // Entfernt die schwarze Kachel um das Logo (sehr dunkles Grau/Schwarz)
  if (r <= 32 && g <= 32 && b <= 32) {
    pixels[i + 3] = 0;
  }
}

await sharp(Buffer.from(pixels), {
  raw: { width, height, channels: 4 },
})
  .png()
  .trim({ threshold: 1 })
  .toFile(output);

console.log("Wrote", output, `${width}x${height}`);
