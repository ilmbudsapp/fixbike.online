const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const key = "fixbike-online-indexnow-2026";
const keyLocation = "https://fixbike.online/indexnow-key.txt";

const urls = [
  "https://fixbike.online/",
  "https://fixbike.online/#ebike-vermietung",
  "https://fixbike.online/#servis",
  "https://fixbike.online/#contact"
];

const payload = {
  host: "fixbike.online",
  key,
  keyLocation,
  urlList: urls
};

const response = await fetch(INDEXNOW_ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload)
});

if (!response.ok) {
  const errorText = await response.text();
  throw new Error(`IndexNow ping failed: ${response.status} ${errorText}`);
}

console.log("IndexNow ping sent successfully.");
