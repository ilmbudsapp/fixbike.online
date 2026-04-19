/** Shared site data — used by App + lazy-loaded sections */

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Wagenhallenweg 8, 56566 Neuwied");

export const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=" +
  encodeURIComponent("Wagenhallenweg 8, 56566 Neuwied, Deutschland") +
  "&hl=de&z=15&ie=UTF8&iwloc=B&output=embed";

export const CONTACT = {
  phoneDisplay: "+49 163 7046825",
  phoneTel: "+491637046825",
  whatsapp: "https://wa.me/491637046825",
  email: "fixbike2025@gmail.com",
  steuernummer: "32/125/57407",
  street: "Wagenhallenweg 8",
  zipCity: "56566 Neuwied",
} as const;

export const nav = [
  { href: "#ebike-vermietung", label: "Verleih" },
  { href: "#werkstatt", label: "Werkstatt" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#contact", label: "Kontakt" },
] as const;

export const rentalEBikes: {
  title: string;
  size: string;
  availability?: string;
  countNote: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    title: "CUBE Touring Hybrid",
    size: "Größe M",
    countNote:
      "Komfortables Trekking-E-Bike für Alltag, Touren und längere Strecken.",
    image: "/images/cube-touring-hybrid-m.png",
    imageAlt:
      "CUBE Touring Hybrid E-Bike in Weiß, Größe M — Trekking und Alltag",
  },
  {
    title: "CUBE Touring Hybrid",
    size: "Größe L",
    countNote:
      "Dasselbe Modell in Größe L für größere Fahrerinnen und Fahrer mit komfortabler Sitzposition.",
    image: "/images/cube-touring-hybrid-l.png",
    imageAlt:
      "CUBE Touring Hybrid E-Bike in Weiß, Größe L — Trekking und Alltag",
  },
  {
    title: "CUBE Stereo Hybrid",
    size: "Größe M",
    countNote:
      "E-Mountainbike mit Vollfederung — komfortabel und kräftig für anspruchsvolleres Gelände.",
    image: "/images/cube-stereo-hybrid-m.png",
    imageAlt:
      "CUBE Stereo Hybrid E-MTB in Dunkelgrau, Größe M — Full-Suspension",
  },
];

export const serviceBlocks = [
  {
    title: "Fahrrad Reparatur",
    text: "Fahrradreparatur Neuwied: Bremsen, Schaltung, Reifen und Gangschaltung — von der Pannenhilfe bis zur kompletten Überholung für Trekkingrad, MTB und Alltagsbike in unserer Fahrradwerkstatt.",
    image: "/images/service-reparatur.png",
    imageAlt:
      "Werkstatt: Mechaniker am CUBE E-Bike — Fahrrad Reparatur Neuwied",
  },
  {
    title: "E-Bike Service Neuwied",
    text: "E-Bike Service Neuwied mit Batterie-Check, Software-Update, Motor-Service und Systemdiagnose — damit Ihr Pedelec sicher fährt und zuverlässige Reichweite liefert.",
    image: "/images/leistung-ebike-weiss.png",
    imageAlt:
      "CUBE E-Bike in Weiß — E-Bike Service Neuwied",
  },
  {
    title: "Saison Wartung",
    text: "Saison Wartung in der Fahrradwerkstatt Neuwied: Jahresinspektion, Winter-Check und Sommer-Service — Lager, Schaltung, Bremsen und Sicherheit, damit Ihr Rad fit in die Saison startet.",
    image: "/images/leistung-ebike-mtb.png",
    imageAlt:
      "CUBE E-MTB — Saison Wartung und Inspektion Neuwied",
  },
] as const;
