import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

import App from "./App";
import { faqItems } from "./fixbikeConstants";
import { headHtml, INDEXABLE_PATHS, PAGES } from "./siteData";

export { INDEXABLE_PATHS, PAGES, headHtml };

export const PRERENDER_PATHS = [
  "/",
  "/verleih",
  "/verkauf",
  "/ersatzteile",
  "/kontakt",
  "/impressum",
  "/datenschutz",
  "/__404",
] as const;

export function render(url: string): string {
  const location = url === "/__404" ? "/audit-nicht-vorhanden-84721" : url;
  return renderToString(
    <StaticRouter location={location}>
      <App />
    </StaticRouter>,
  );
}

export function getHeadHtml(url: string): string {
  const path = url === "/__404" ? "/__404" : url;
  const faq = path === "/" || path === "/verleih" ? faqItems : undefined;
  return headHtml(path, faq);
}
