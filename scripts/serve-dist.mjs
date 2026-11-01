import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const distDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");

function mime(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=UTF-8";
  if (filePath.endsWith(".js")) return "text/javascript; charset=UTF-8";
  if (filePath.endsWith(".css")) return "text/css; charset=UTF-8";
  if (filePath.endsWith(".xml")) return "application/xml; charset=UTF-8";
  if (filePath.endsWith(".webp")) return "image/webp";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  if (filePath.endsWith(".woff2")) return "font/woff2";
  if (filePath.endsWith(".woff")) return "font/woff";
  return "application/octet-stream";
}

function resolveStatic(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  const candidates = [];
  if (clean === "/") candidates.push(path.join(distDir, "index.html"));
  else {
    const rel = clean.replace(/^\/+/, "");
    candidates.push(path.join(distDir, rel));
    candidates.push(path.join(distDir, rel, "index.html"));
  }
  for (const file of candidates) {
    const resolved = path.resolve(file);
    if (!resolved.startsWith(path.resolve(distDir))) continue;
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) return { status: 200, file: resolved };
  }
  return { status: 404, file: path.join(distDir, "404.html") };
}

const server = http.createServer((req, res) => {
  const mapped = resolveStatic(req.url ?? "/");
  res.writeHead(mapped.status, { "Content-Type": mime(mapped.file) });
  fs.createReadStream(mapped.file).pipe(res);
});

server.listen(4178, "127.0.0.1", () => {
  console.log("serving dist on http://127.0.0.1:4178");
});
