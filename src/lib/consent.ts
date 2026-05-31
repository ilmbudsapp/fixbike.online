/** Cookie / external-media consent — DSGVO (fixbike.online). No analytics on this site. */
export type ConsentChoice = "essential" | "all";

export type ConsentRecord = {
  choice: ConsentChoice;
  updatedAt: string;
};

const STORAGE_KEY = "fixbike-cookie-consent";

export function getConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed?.choice === "essential" || parsed?.choice === "all") return parsed;
  } catch {
    /* ignore */
  }
  return null;
}

export function hasExternalMediaConsent(): boolean {
  return getConsent()?.choice === "all";
}

export function setConsent(choice: ConsentChoice): ConsentRecord {
  const record: ConsentRecord = { choice, updatedAt: new Date().toISOString() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* ignore */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("fixbike-consent-change", { detail: record }));
  }
  return record;
}

export function consentNeedsPrompt(): boolean {
  return getConsent() === null;
}
