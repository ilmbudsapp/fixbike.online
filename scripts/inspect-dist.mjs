import fs from "node:fs";

const files = [
  "dist/index.html",
  "dist/verleih/index.html",
  "dist/verkauf/index.html",
  "dist/ersatzteile/index.html",
  "dist/kontakt/index.html",
  "dist/404.html",
];

for (const f of files) {
  const html = fs.readFileSync(f, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const can = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  const h1 = html
    .match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]
    ?.replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const json = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => JSON.parse(m[1]),
  );
  const types = json.flatMap((j) => (j["@graph"] || [j]).map((n) => n["@type"]));
  console.log("\n==", f, html.length);
  console.log("title:", title);
  console.log("canonical:", can);
  console.log("h1:", h1);
  console.log("ld types:", JSON.stringify(types));
}

console.log("\nSITEMAP\n", fs.readFileSync("dist/sitemap.xml", "utf8"));
console.log("ROBOTS\n", fs.readFileSync("dist/robots.txt", "utf8"));
