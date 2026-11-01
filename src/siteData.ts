/** Single confirmed business + route registry. Do not invent offers, stock, or credentials. */

export const SITE_ORIGIN = "https://fixbike.online";
export const BUSINESS_ID = `${SITE_ORIGIN}/#business`;

export const BUSINESS = {
  brandName: "FixBike",
  legalName: "FixBike Online",
  owner: "Adem Osmani",
  credential: "Certified E-Bike Specialist",
  street: "Wallersheimer Weg 16",
  postalCode: "56070",
  city: "Koblenz",
  region: "Rheinland-Pfalz",
  countryCode: "DE",
  countryName: "Deutschland",
  phoneDisplay: "+49 163 7046825",
  phoneTel: "+491637046825",
  email: "fixbike2025@gmail.com",
  steuernummer: "32/125/57407",
  appointmentOnly: true,
  hoursWeekdays: { label: "Mo–Fr", opens: "09:00", closes: "18:00" },
  hoursSaturday: { label: "Sa", opens: "09:00", closes: "14:00" },
  hoursNote: "Nur nach Terminvereinbarung",
  rental: {
    packagePrice: 105,
    packageDays: 7,
    equivalentPerDay: 15,
    currency: "EUR",
    priceLabel: "105 € / 7 Tage",
    equivalentLabel: "entspricht 15 € pro Tag",
  },
  areaServed: ["Koblenz", "Neuwied", "Rheinland-Pfalz"] as const,
  sameAs: [
    "https://www.instagram.com/fixbike.online/",
    "https://www.facebook.com/fixbike.online",
  ] as const,
} as const;

export const ADDRESS_LINE = `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`;

export const hoursShort = `${BUSINESS.hoursWeekdays.label} ${BUSINESS.hoursWeekdays.opens}–${BUSINESS.hoursWeekdays.closes}, ${BUSINESS.hoursSaturday.label} ${BUSINESS.hoursSaturday.opens}–${BUSINESS.hoursSaturday.closes}`;

export type RoutePath =
  | "/"
  | "/verleih"
  | "/verkauf"
  | "/ersatzteile"
  | "/kontakt"
  | "/impressum"
  | "/datenschutz";

export type PageDef = {
  path: RoutePath;
  title: string;
  description: string;
  ogImage: string;
  ogImageAlt: string;
  ogWidth: number;
  ogHeight: number;
  indexable: boolean;
  /** Significant content change of this URL — not the build date. */
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  breadcrumbName: string;
};

export const PAGES: Record<RoutePath, PageDef> = {
  "/": {
    path: "/",
    title: "FixBike Koblenz | E-Bike-Verleih & Fahrradverkauf",
    description:
      "FixBike in Koblenz: CUBE E-Bikes mieten, Fahrräder und E-Bikes kaufen sowie Ersatzteile anfragen. Persönliche Beratung nach Termin, Wallersheimer Weg 16.",
    ogImage: `${SITE_ORIGIN}/images/cube-touring-hybrid-m.jpg`,
    ogImageAlt: "CUBE Touring Hybrid E-Bike bei FixBike in Koblenz",
    ogWidth: 1200,
    ogHeight: 900,
    indexable: true,
    lastmod: "2026-11-01",
    changefreq: "weekly",
    priority: "1.0",
    breadcrumbName: "Startseite",
  },
  "/verleih": {
    path: "/verleih",
    title: "E-Bike mieten in Koblenz | 105 € / 7 Tage | FixBike",
    description:
      "CUBE E-Bikes in Koblenz mieten: 105 € für 7 Tage (entspricht 15 € pro Tag). Abholung nach Termin am Wallersheimer Weg 16. Verfügbarkeit wird persönlich bestätigt.",
    ogImage: `${SITE_ORIGIN}/images/cube-touring-hybrid-m.jpg`,
    ogImageAlt: "E-Bike mieten in Koblenz bei FixBike",
    ogWidth: 1200,
    ogHeight: 900,
    indexable: true,
    lastmod: "2026-11-01",
    changefreq: "weekly",
    priority: "0.9",
    breadcrumbName: "Verleih",
  },
  "/verkauf": {
    path: "/verkauf",
    title: "Fahrräder & E-Bikes kaufen in Koblenz | FixBike",
    description:
      "Fahrräder und E-Bikes kaufen in Koblenz bei FixBike. Persönliche Kaufberatung nach Termin. Verfügbare Modelle und Preise auf Anfrage.",
    ogImage: `${SITE_ORIGIN}/images/hero/fixbike-hero-1-cube.jpg`,
    ogImageAlt: "Fahrradverkauf in Koblenz bei FixBike",
    ogWidth: 1672,
    ogHeight: 941,
    indexable: true,
    lastmod: "2026-11-01",
    changefreq: "weekly",
    priority: "0.9",
    breadcrumbName: "Verkauf",
  },
  "/ersatzteile": {
    path: "/ersatzteile",
    title: "Fahrrad- & E-Bike-Ersatzteile in Koblenz | FixBike",
    description:
      "Ersatzteile für Fahrrad und E-Bike in Koblenz anfragen. FixBike klärt Ausführung, Kompatibilität und Verfügbarkeit persönlich — ohne Sofortbestellung.",
    ogImage: `${SITE_ORIGIN}/images/parts/fixbike-antrieb-bremsen.jpg`,
    ogImageAlt: "Fahrrad-Ersatzteile bei FixBike in Koblenz",
    ogWidth: 1536,
    ogHeight: 1024,
    indexable: true,
    lastmod: "2026-11-01",
    changefreq: "weekly",
    priority: "0.8",
    breadcrumbName: "Ersatzteile",
  },
  "/kontakt": {
    path: "/kontakt",
    title: "Kontakt & Anfahrt in Koblenz | FixBike",
    description:
      "Kontakt und Anfahrt zu FixBike in Koblenz, Wallersheimer Weg 16. Telefon, WhatsApp und E-Mail. Termine Mo–Fr 9:00–18:00, Sa 9:00–14:00 nach Vereinbarung.",
    ogImage: `${SITE_ORIGIN}/images/fixbike-logo.png`,
    ogImageAlt: "FixBike Logo",
    ogWidth: 160,
    ogHeight: 85,
    indexable: true,
    lastmod: "2026-11-01",
    changefreq: "monthly",
    priority: "0.8",
    breadcrumbName: "Kontakt",
  },
  "/impressum": {
    path: "/impressum",
    title: "Impressum | FixBike Koblenz",
    description: "Impressum von FixBike Online, Adem Osmani, Wallersheimer Weg 16, 56070 Koblenz.",
    ogImage: `${SITE_ORIGIN}/images/fixbike-logo.png`,
    ogImageAlt: "FixBike Logo",
    ogWidth: 160,
    ogHeight: 85,
    indexable: false,
    breadcrumbName: "Impressum",
  },
  "/datenschutz": {
    path: "/datenschutz",
    title: "Datenschutz | FixBike Koblenz",
    description:
      "Datenschutzerklärung von FixBike Online: notwendige Speicherung, Kontaktanfragen und optionale Karteninhalte.",
    ogImage: `${SITE_ORIGIN}/images/fixbike-logo.png`,
    ogImageAlt: "FixBike Logo",
    ogWidth: 160,
    ogHeight: 85,
    indexable: false,
    breadcrumbName: "Datenschutz",
  },
};

export const INDEXABLE_PATHS = (
  Object.values(PAGES).filter((p) => p.indexable) as PageDef[]
).map((p) => p.path);

export const NOT_FOUND_PAGE = {
  title: "Seite nicht gefunden | FixBike",
  description: "Diese Seite gibt es bei FixBike nicht. Zur Startseite, zum Verleih oder zum Kontakt.",
  canonical: `${SITE_ORIGIN}/404`,
  robots: "noindex, follow",
} as const;

export const nav = [
  { href: "/verleih", label: "Verleih" },
  { href: "/verkauf", label: "Verkauf" },
  { href: "/ersatzteile", label: "Ersatzteile" },
  { href: "/#ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export function canonicalFor(path: string): string {
  const clean = normalizePath(path);
  if (clean === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${clean}`;
}

export function normalizePath(path: string): string {
  const noQuery = path.split("?")[0].split("#")[0];
  if (!noQuery || noQuery === "/") return "/";
  return noQuery.replace(/\/+$/, "") || "/";
}

export function resolvePage(path: string): PageDef | null {
  const clean = normalizePath(path) as RoutePath;
  return PAGES[clean] ?? null;
}

function businessNode() {
  return {
    "@type": ["BikeStore", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: BUSINESS.legalName,
    alternateName: BUSINESS.brandName,
    url: `${SITE_ORIGIN}/`,
    telephone: BUSINESS.phoneDisplay,
    email: BUSINESS.email,
    image: `${SITE_ORIGIN}/images/fixbike-logo.png`,
    logo: `${SITE_ORIGIN}/images/fixbike-logo.png`,
    description:
      "E-Bike-Verleih, Fahrradverkauf und Ersatzteile in Koblenz. Termine nach Vereinbarung.",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      postalCode: BUSINESS.postalCode,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.countryCode,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: BUSINESS.hoursWeekdays.opens,
        closes: BUSINESS.hoursWeekdays.closes,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: BUSINESS.hoursSaturday.opens,
        closes: BUSINESS.hoursSaturday.closes,
      },
    ],
    areaServed: BUSINESS.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    sameAs: [...BUSINESS.sameAs],
    founder: { "@id": `${SITE_ORIGIN}/#author` },
  };
}

function personNode() {
  return {
    "@type": "Person",
    "@id": `${SITE_ORIGIN}/#author`,
    name: BUSINESS.owner,
    jobTitle: BUSINESS.credential,
    worksFor: { "@id": BUSINESS_ID },
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    name: BUSINESS.legalName,
    url: `${SITE_ORIGIN}/`,
    inLanguage: "de-DE",
    publisher: { "@id": BUSINESS_ID },
  };
}

function breadcrumbNode(page: PageDef) {
  const items =
    page.path === "/"
      ? [
          {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: `${SITE_ORIGIN}/`,
          },
        ]
      : [
          {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: `${SITE_ORIGIN}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.breadcrumbName,
            item: canonicalFor(page.path),
          },
        ];
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalFor(page.path)}#breadcrumb`,
    itemListElement: items,
  };
}

function webPageNode(page: PageDef) {
  return {
    "@type": "WebPage",
    "@id": `${canonicalFor(page.path)}#webpage`,
    url: canonicalFor(page.path),
    name: page.title,
    description: page.description,
    inLanguage: "de-DE",
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    about: { "@id": BUSINESS_ID },
    breadcrumb: { "@id": `${canonicalFor(page.path)}#breadcrumb` },
  };
}

export type FaqItem = { q: string; a: string };

function faqNode(pagePath: RoutePath, items: readonly FaqItem[]) {
  return {
    "@type": "FAQPage",
    "@id": `${canonicalFor(pagePath)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

function rentalServiceNode() {
  return {
    "@type": "Service",
    "@id": `${SITE_ORIGIN}/#rental-service`,
    name: "E-Bike-Verleih (7 Tage)",
    serviceType: "E-Bike-Vermietung",
    provider: { "@id": BUSINESS_ID },
    areaServed: BUSINESS.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    description:
      "Wochenmiete für CUBE E-Bikes in Koblenz: 105 EUR für 7 Tage, entspricht 15 EUR pro Tag. Abholung nach Termin. Verfügbarkeit wird persönlich bestätigt, keine Sofortbuchung.",
    offers: {
      "@type": "Offer",
      "@id": `${SITE_ORIGIN}/#rental-offer-7days`,
      name: "E-Bike-Wochenmiete",
      price: "105.00",
      priceCurrency: "EUR",
      description:
        "Miete für sieben Tage. Entspricht 15 EUR pro Tag. Kein eigenständiges Tagesangebot.",
    },
  };
}

export function buildJsonLd(path: string, faqItems?: readonly FaqItem[]): object {
  const page = resolvePage(path);
  if (!page) {
    return { "@context": "https://schema.org", "@graph": [businessNode()] };
  }

  const graph: object[] = [
    businessNode(),
    personNode(),
    websiteNode(),
    webPageNode(page),
    breadcrumbNode(page),
  ];

  if (page.path === "/" || page.path === "/verleih") {
    graph.push(rentalServiceNode());
  }

  if (faqItems && faqItems.length > 0 && (page.path === "/" || page.path === "/verleih")) {
    graph.push(faqNode(page.path, faqItems));
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function buildHead(path: string, faqItems?: readonly FaqItem[]): {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  jsonLd: object;
  ogImage: string;
  ogImageAlt: string;
  ogWidth: number;
  ogHeight: number;
} {
  const page = resolvePage(path);
  if (!page) {
    return {
      title: NOT_FOUND_PAGE.title,
      description: NOT_FOUND_PAGE.description,
      canonical: "",
      robots: NOT_FOUND_PAGE.robots,
      jsonLd: buildJsonLd(path, faqItems),
      ogImage: `${SITE_ORIGIN}/images/fixbike-logo.png`,
      ogImageAlt: "FixBike Logo",
      ogWidth: 160,
      ogHeight: 85,
    };
  }
  return {
    title: page.title,
    description: page.description,
    canonical: canonicalFor(page.path),
    robots: page.indexable
      ? "index, follow, max-image-preview:large"
      : "noindex, follow",
    jsonLd: buildJsonLd(page.path, faqItems),
    ogImage: page.ogImage,
    ogImageAlt: page.ogImageAlt,
    ogWidth: page.ogWidth,
    ogHeight: page.ogHeight,
  };
}

export function headHtml(path: string, faqItems?: readonly FaqItem[]): string {
  const h = buildHead(path, faqItems);
  const json = JSON.stringify(h.jsonLd, null, 2);
  const canonicalTag = h.canonical
    ? `<link rel="canonical" href="${escapeAttr(h.canonical)}" />`
    : "";
  const ogUrl = h.canonical
    ? `<meta property="og:url" content="${escapeAttr(h.canonical)}" />`
    : "";
  return [
    `<title>${escapeHtml(h.title)}</title>`,
    `<meta name="description" content="${escapeAttr(h.description)}" />`,
    `<meta name="robots" content="${escapeAttr(h.robots)}" />`,
    canonicalTag,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="de_DE" />`,
    ogUrl,
    `<meta property="og:title" content="${escapeAttr(h.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(h.description)}" />`,
    `<meta property="og:site_name" content="FixBike Online" />`,
    `<meta property="og:image" content="${escapeAttr(h.ogImage)}" />`,
    `<meta property="og:image:width" content="${h.ogWidth}" />`,
    `<meta property="og:image:height" content="${h.ogHeight}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(h.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(h.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(h.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(h.ogImage)}" />`,
    `<script type="application/ld+json">${json}</script>`,
  ]
    .filter(Boolean)
    .join("\n    ");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replaceAll('"', "&quot;");
}
