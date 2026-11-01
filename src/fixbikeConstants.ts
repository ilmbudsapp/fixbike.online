/** Shared site data — UI catalog and contact aliases from BUSINESS. */

import { BUSINESS } from "./siteData";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(`${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`);

export const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=" +
  encodeURIComponent(
    `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}, ${BUSINESS.countryName}`,
  ) +
  "&hl=de&z=15&ie=UTF8&iwloc=B&output=embed";

const WHATSAPP_NUMBER = BUSINESS.phoneTel.replace("+", "");

export function whatsappLink(text?: string): string {
  if (!text) return `https://wa.me/${WHATSAPP_NUMBER}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const CONTACT = {
  phoneDisplay: BUSINESS.phoneDisplay,
  phoneTel: BUSINESS.phoneTel,
  whatsapp: whatsappLink(),
  whatsappRental: whatsappLink(
    "Hallo FixBike, ich möchte ein E-Bike mieten. Bitte informieren Sie mich über Verfügbarkeit und Termine.",
  ),
  whatsappWeeklyRental: whatsappLink(
    "Hallo FixBike, ich interessiere mich für die CUBE E-Bike-Wochenmiete für 105 €. Mein gewünschter Zeitraum ist: … Welche Modelle und Größen sind verfügbar?",
  ),
  whatsappSales: whatsappLink(
    "Hallo FixBike, ich interessiere mich für den Kauf eines Fahrrads oder E-Bikes. Bitte kontaktieren Sie mich.",
  ),
  whatsappParts: whatsappLink(
    "Hallo FixBike, ich suche Ersatzteile für mein Fahrrad oder E-Bike. Bitte kontaktieren Sie mich.",
  ),
  email: BUSINESS.email,
  steuernummer: BUSINESS.steuernummer,
  street: BUSINESS.street,
  zipCity: `${BUSINESS.postalCode} ${BUSINESS.city}`,
  hoursNote: BUSINESS.hoursNote,
} as const;

export { nav } from "./siteData";

export const rentalEBikes: {
  title: string;
  size: string;
  availability?: string;
  countNote: string;
  image: string;
  imageAlt: string;
  specs: readonly { label: string; value: string }[];
}[] = [
  {
    title: "CUBE Touring Hybrid",
    size: "Größe M",
    countNote: "Komfortables Trekking-E-Bike für Alltag, Pendeln und Touren.",
    image: "/images/cube-touring-hybrid-m.webp",
    imageAlt: "CUBE Touring Hybrid E-Bike Größe M - E-Bike mieten in Koblenz bei FixBike",
    specs: [
      { label: "Motor", value: "Bosch Performance Line (bis ca. 250 W Nennleistung)" },
      { label: "Rahmen", value: "Trekking / Hybrid, CUBE" },
      { label: "Einsatz", value: "Alltag, Pendeln, Touren" },
    ],
  },
  {
    title: "CUBE Touring Hybrid",
    size: "Größe L",
    countNote: "Dieselbe Touring-Geometrie in Größe L — passend für größere Fahrerinnen und Fahrer.",
    image: "/images/cube-touring-hybrid-l.webp",
    imageAlt: "CUBE Touring Hybrid E-Bike Größe L - Fahrradverleih Koblenz bei FixBike",
    specs: [
      { label: "Motor", value: "Bosch Performance Line (bis ca. 250 W Nennleistung)" },
      { label: "Rahmen", value: "Trekking / Hybrid, CUBE" },
      { label: "Einsatz", value: "Alltag, Pendeln, Touren" },
    ],
  },
  {
    title: "CUBE Stereo Hybrid",
    size: "Größe M",
    countNote: "Vollgefedertes E-MTB für Wald, Trail und sportliche Touren.",
    image: "/images/cube-stereo-hybrid-m.webp",
    imageAlt: "CUBE Stereo Hybrid MTB E-Bike Größe M - E-Bike mieten in Koblenz bei FixBike",
    specs: [
      { label: "Motor", value: "Bosch Performance CX (bis ca. 250 W Nennleistung)" },
      { label: "Federung", value: "Vollfederung (MTB)" },
      { label: "Einsatz", value: "Wald, Trail, sportliche Touren" },
    ],
  },
];

export const faqItems = [
  {
    q: "Was kostet die E-Bike-Miete?",
    a: "Die Miete gilt für sieben Tage: 105 €, das entspricht 15 € pro Tag. Eine kürzere Tagesmiete ist derzeit nicht das Standardangebot.",
  },
  {
    q: "Welche Größen gibt es?",
    a: "CUBE Touring Hybrid in Größe M und L sowie CUBE Stereo Hybrid in Größe M. Wir beraten Sie zur Passform vor der Übergabe.",
  },
  {
    q: "Wie frage ich die Verfügbarkeit an?",
    a: "Über das Formular am gewählten Rad, per WhatsApp, Telefon oder E-Mail. Wir bestätigen den Termin persönlich — es gibt keine sofortige Online-Buchung.",
  },
  {
    q: "Wo hole ich das Rad ab?",
    a: "Nach Vereinbarung bei uns in Koblenz, Wallersheimer Weg 16, 56070 Koblenz.",
  },
  {
    q: "Brauche ich einen Termin?",
    a: "Ja. Verleih, Verkauf, Ersatzteile und kleine Reparaturen nur nach Terminvereinbarung. Mo–Fr 9:00–18:00, Sa 9:00–14:00.",
  },
  {
    q: "Wie erreiche ich FixBike?",
    a: "Telefon oder WhatsApp +49 163 7046825, E-Mail fixbike2025@gmail.com.",
  },
] as const;
