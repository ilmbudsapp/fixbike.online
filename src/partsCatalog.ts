const WA_NUMBER = "491637046825";

export function whatsappHref(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export type PartsCategory = {
  id: string;
  title: string;
  description: string;
  imageBase: string;
  alt: string;
  objectPosition: string;
  ctaLabel: string;
  whatsapp: string;
};

const genericCta = "Teil anfragen";

export const PARTS_INTRO = {
  imageBase: "/images/parts/fixbike-antrieb-bremsen",
  alt: "Fahrradkette, Ritzel und Felgenbremse auf dunklem Untergrund",
  objectPosition: "58% 48%",
  titleLines: ["Kleine Teile.", "Großer Unterschied."],
  description:
    "Antrieb, Bremsen und Zubehör: Beschreib uns, was du benötigst — wir klären die passende Ausführung und Verfügbarkeit.",
  ctaLabel: genericCta,
  whatsapp: whatsappHref(
    "Hallo FixBike, ich suche ein Ersatzteil für mein Fahrrad oder E-Bike. Fahrradmarke/Modell: … Benötigtes Teil: … Könnt ihr mir bei der passenden Ausführung und Verfügbarkeit helfen?",
  ),
} as const;

export const PARTS_CATEGORIES: readonly PartsCategory[] = [
  {
    id: "schaltung",
    title: "Schaltung & Kette",
    description:
      "Ketten, Kassetten und Schaltkomponenten müssen zum vorhandenen Antrieb passen. Nenne uns die Schaltung und die Anzahl der Gänge oder sende ein Foto.",
    imageBase: "/images/parts/klasicni-lanac-menjac",
    alt: "Kette, Ritzel und Schaltwerk eines Fahrrads",
    objectPosition: "52% 50%",
    ctaLabel: genericCta,
    whatsapp: whatsappHref(
      "Hallo FixBike, ich suche ein Teil für Schaltung oder Kette. Fahrradmarke/Modell: … Vorhandene Schaltung/Gänge: … Könnt ihr mir bei der passenden Ausführung und Verfügbarkeit helfen?",
    ),
  },
  {
    id: "kurbeln",
    title: "Kurbeln & Pedale",
    description:
      "Pedale, Kurbeln und Kettenblätter für unterschiedliche Fahrradtypen. Wir klären mit dir die benötigte Ausführung und die passenden Anschlüsse.",
    imageBase: "/images/parts/klasicni-pedale-pogon",
    alt: "Pedale, Kurbelarm und Kettenblatt",
    objectPosition: "48% 55%",
    ctaLabel: genericCta,
    whatsapp: whatsappHref(
      "Hallo FixBike, ich suche Pedale, Kurbeln oder ein Kettenblatt. Fahrradmarke/Modell: … Vorhandene Anschlüsse/Ausführung: … Könnt ihr mir bei der passenden Ausführung und Verfügbarkeit helfen?",
    ),
  },
  {
    id: "kontaktpunkte",
    title: "Sattel, Lenker & Griffe",
    description:
      "Kontaktpunkte beeinflussen Sitzgefühl und Kontrolle. Frag nach Sätteln, Griffen, Lenkern oder Sattelstützen passend zu deinem Fahrrad.",
    imageBase: "/images/parts/klasicni-sediste-volan",
    alt: "Fahrradsattel, Lenker und Griffe",
    objectPosition: "50% 42%",
    ctaLabel: genericCta,
    whatsapp: whatsappHref(
      "Hallo FixBike, ich suche Sattel, Lenker, Griffe oder eine Sattelstütze. Fahrradmarke/Modell: … Benötigtes Teil: … Könnt ihr mir bei der passenden Ausführung und Verfügbarkeit helfen?",
    ),
  },
  {
    id: "felgenbremsen",
    title: "Felgenbremsen & Bremszüge",
    description:
      "Bremsbeläge, Bremszüge und Komponenten für Felgenbremsen. Ein Foto der vorhandenen Bremse hilft uns bei der Zuordnung.",
    imageBase: "/images/parts/klasicni-kocnice",
    alt: "Felgenbremse mit Bremszug am Laufrad",
    objectPosition: "50% 48%",
    ctaLabel: genericCta,
    whatsapp: whatsappHref(
      "Hallo FixBike, ich suche Teile für eine Felgenbremse oder Bremszüge. Fahrradmarke/Modell: … Vorhandene Bremse: … Könnt ihr mir bei der passenden Ausführung und Verfügbarkeit helfen?",
    ),
  },
  {
    id: "scheibenbremsen",
    title: "Scheibenbremsen",
    description:
      "Bei Bremsscheiben und Bremskomponenten kommt es auf die genaue Ausführung an. Sende uns Hersteller, Modell und möglichst ein Foto.",
    imageBase: "/images/parts/fixbike-kocnica-detalj",
    alt: "Bremsscheibe und Bremssattel in der Nahaufnahme",
    objectPosition: "55% 50%",
    ctaLabel: genericCta,
    whatsapp: whatsappHref(
      "Hallo FixBike, ich suche ein Teil für die Scheibenbremse. Fahrradmarke/Modell: … Hersteller/Modell der Bremse: … Könnt ihr mir bei der passenden Ausführung und Verfügbarkeit helfen?",
    ),
  },
  {
    id: "reifen",
    title: "Reifen & Beleuchtung",
    description:
      "Reifen und Beleuchtung für Alltag und Tour. Für Reifen benötigen wir die Größenangabe auf der Reifenflanke; bei Beleuchtung klären wir Befestigung und Stromversorgung.",
    imageBase: "/images/parts/fixbike-gume-svetla",
    alt: "Fahrradreifen neben einem Scheinwerfer",
    objectPosition: "46% 50%",
    ctaLabel: genericCta,
    whatsapp: whatsappHref(
      "Hallo FixBike, ich suche Reifen oder Beleuchtung. Fahrradmarke/Modell: … Reifengröße bzw. Art der Beleuchtung: … Könnt ihr mir bei der passenden Ausführung und Verfügbarkeit helfen?",
    ),
  },
];

export const EBKE_INQUIRY_CATEGORIES: readonly PartsCategory[] = [
  {
    id: "akku",
    title: "E-Bike-Akkus & Ladegeräte",
    description:
      "Bei Akkus und Ladegeräten ist die genaue Systemzuordnung entscheidend. Sende Hersteller, Modell und die Angaben vom Typenschild — wir klären, ob wir weiterhelfen können.",
    imageBase: "/images/parts/fixbike-baterija",
    alt: "E-Bike-Akku auf dunklem Untergrund",
    objectPosition: "50% 48%",
    ctaLabel: "Anfrage zum E-Bike-System",
    whatsapp: whatsappHref(
      "Hallo FixBike, ich habe eine Frage zu einem E-Bike-Akku oder Ladegerät. Fahrradmarke/Modell: … Antriebssystem: … Angaben vom Typenschild: … Könnt ihr mir weiterhelfen?",
    ),
  },
  {
    id: "antrieb-display",
    title: "E-Bike-Antrieb & Display",
    description:
      "Motor und Display gehören zu einem abgestimmten E-Bike-System. Nenne uns das verbaute System und dein Anliegen, damit wir die Möglichkeiten prüfen können.",
    imageBase: "/images/parts/fixbike-motor-displej",
    alt: "E-Bike-Motor und Display",
    objectPosition: "48% 52%",
    ctaLabel: "Anfrage zum E-Bike-System",
    whatsapp: whatsappHref(
      "Hallo FixBike, ich habe eine Frage zu E-Bike-Antrieb oder Display. Fahrradmarke/Modell: … Antriebssystem: … Anliegen: … Könnt ihr mir weiterhelfen?",
    ),
  },
];

export const HOME_PARTS_IDS = [
  "schaltung",
  "kurbeln",
  "scheibenbremsen",
  "reifen",
] as const;

export const HOME_PARTS_CATEGORIES = HOME_PARTS_IDS.map(
  (id) => PARTS_CATEGORIES.find((item) => item.id === id)!,
);
