import QRCode from "qrcode";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "../public/fixbike-website-qr.png");
const url = "https://fixbike.online/";

await QRCode.toFile(outPath, url, {
  width: 512,
  margin: 2,
  color: {
    dark: "#28251d",
    light: "#f9f8f5",
  },
});

console.log("Wrote", outPath, "→", url);
