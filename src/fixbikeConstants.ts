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
  { href: "#servis", label: "Servis" },
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
  specs: readonly { label: string; value: string }[];
}[] = [
  {
    title: "CUBE Touring Hybrid",
    size: "Größe M",
    countNote:
      "Wir stellen dieses komfortable Trekking-E-Bike für Alltag, Touren und längere Strecken bereit — bei uns mit persönlicher Übergabe in Neuwied.",
    image: "/images/cube-touring-hybrid-m.webp",
    imageAlt: "E-Bike Mieten Neuwied — Fahrradverleih FixBike",
    specs: [
      { label: "Motor", value: "Bosch Performance Line (bis ca. 250 W Nennleistung)" },
      { label: "Rahmen", value: "Trekking / Hybrid, CUBE" },
      { label: "Einsatz", value: "Alltag, Pendeln, Touren" },
    ],
  },
  {
    title: "CUBE Touring Hybrid",
    size: "Größe L",
    countNote:
      "Dasselbe Modell in Größe L — wir beraten Sie, ob die Geometrie zu Ihrer Körpergröße und Route passt.",
    image: "/images/cube-touring-hybrid-l.webp",
    imageAlt: "Fahrradverleih FixBike — E-Bike Mieten Neuwied",
    specs: [
      { label: "Motor", value: "Bosch Performance Line (bis ca. 250 W Nennleistung)" },
      { label: "Rahmen", value: "Trekking / Hybrid, CUBE" },
      { label: "Einsatz", value: "Alltag, Pendeln, Touren" },
    ],
  },
  {
    title: "CUBE Stereo Hybrid",
    size: "Größe M",
    countNote:
      "Unser E-MTB mit Vollfederung — wir empfehlen es, wenn Sie mehr Gelände und Komfort wollen.",
    image: "/images/cube-stereo-hybrid-m.webp",
    imageAlt: "E-Bike Mieten Neuwied — Fahrradverleih FixBike",
    specs: [
      { label: "Motor", value: "Bosch Performance CX (bis ca. 250 W Nennleistung)" },
      { label: "Federung", value: "Vollfederung (MTB)" },
      { label: "Einsatz", value: "Wald, Trail, sportliche Touren" },
    ],
  },
];

export const serviceBlocks = [
  {
    title: "Fahrrad Reparatur",
    text: "Wir in FixBike reparieren Ihr Rad, als wäre es unser eigenes: Bremsen, Schaltung, Reifen und Gangschaltung in Neuwied — von der Pannenhilfe bis zur kompletten Überholung für Trekkingrad, MTB und Alltagsbike. Mehr dazu auch in unserem Verleih-Bereich, wenn Sie parallel ein E-Bike mieten möchten.",
    image: "/images/service-reparatur.webp",
    imageAlt: "Fahrradverleih FixBike — E-Bike Mieten Neuwied",
  },
  {
    title: "E-Bike Service Neuwied",
    text: "Wir warten Ihr Pedelec mit Batterie-Check, Software-Update, Motor-Service und Systemdiagnose — damit Sie sicher fahren und die Reichweite stimmt. Ich (Adem Osmani, Certified E-Bike Specialist) leite die Diagnose nach Herstellervorgaben.",
    image: "/images/leistung-ebike-weiss.webp",
    imageAlt: "E-Bike Mieten Neuwied — Fahrradverleih FixBike",
  },
  {
    title: "Saison Wartung",
    text: "Unsere Saison-Inspektion in Neuwied: Jahrescheck, Winter- und Sommer-Service — Lager, Schaltung, Bremsen und Sicherheit, damit Ihr Rad mit uns fit in die nächste Saison startet.",
    image: "/images/leistung-ebike-mtb.webp",
    imageAlt: "Fahrradverleih FixBike — E-Bike Mieten Neuwied",
  },
] as const;
