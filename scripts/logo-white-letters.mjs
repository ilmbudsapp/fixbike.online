import sharp from "sharp";

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
  const a = pixels[i + 3];
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const isBlue = b > r + 25 && b > g;
  const isOrange = r > b + 40 && r > 80;

  if (a < 8) continue;

  if (!isBlue && !isOrange && chroma < 32 && lum < 95 && r < 95 && b < 95 && lum > 16) {
    pixels[i] = 245;
    pixels[i + 1] = 244;
    pixels[i + 2] = 239;
    continue;
  }

  if (!isBlue && !isOrange && lum <= 28) {
    pixels[i + 3] = 0;
  }
}

await sharp(Buffer.from(pixels), {
  raw: { width, height, channels: 4 },
})
  .png()
  .toFile(output);

console.log("Wrote", output, `${width}x${height}`);
