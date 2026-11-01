import { useEffect } from "react";
import { useLocation } from "react-router";

import { faqItems } from "./fixbikeConstants";
import { buildHead } from "./siteData";

function upsertMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [key, val] = attr.split("=");
    el.setAttribute(key, val.replaceAll('"', ""));
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function upsertLink(rel: string, href: string | null) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const faq = pathname === "/" || pathname === "/verleih" ? faqItems : undefined;
    const head = buildHead(pathname, faq);
    document.title = head.title;
    upsertMeta('meta[name="description"]', "name=description", head.description);
    upsertMeta('meta[name="robots"]', "name=robots", head.robots);
    upsertLink("canonical", head.canonical || null);
    upsertMeta('meta[property="og:title"]', "property=og:title", head.title);
    upsertMeta(
      'meta[property="og:description"]',
      "property=og:description",
      head.description,
    );
    if (head.canonical) {
      upsertMeta('meta[property="og:url"]', "property=og:url", head.canonical);
    }
    upsertMeta('meta[property="og:image"]', "property=og:image", head.ogImage);
    upsertMeta(
      'meta[property="og:image:alt"]',
      "property=og:image:alt",
      head.ogImageAlt,
    );
    upsertMeta("meta[name=\"twitter:title\"]", "name=twitter:title", head.title);
    upsertMeta(
      'meta[name="twitter:description"]',
      "name=twitter:description",
      head.description,
    );
    upsertMeta('meta[name="twitter:image"]', "name=twitter:image", head.ogImage);

    let script = document.head.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(head.jsonLd);
  }, [pathname]);

  return null;
}
