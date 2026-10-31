/** Shared site data — used by App + lazy-loaded sections */

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Wallersheimer Weg 16, 56070 Koblenz");

export const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=" +
  encodeURIComponent("Wallersheimer Weg 16, 56070 Koblenz, Deutschland") +
  "&hl=de&z=15&ie=UTF8&iwloc=B&output=embed";

export const CONTACT = {
  phoneDisplay: "+49 163 7046825",
  phoneTel: "+491637046825",
  whatsapp: "https://wa.me/491637046825",
  whatsappRental: "https://wa.me/491637046825?text=Hallo%20FixBike%2C%20ich%20m%C3%B6chte%20ein%20E-Bike%20mieten.%20Bitte%20Informieren%20Sie%20mich%20%C3%BCber%20Verf%C3%BCgbarkeit%20und%20Termine.",
  whatsappSales: "https://wa.me/491637046825?text=Hallo%20FixBike%2C%20ich%20interessiere%20mich%20f%C3%BCr%20den%20Kauf%20eines%20Fahrrads%20oder%20E-Bikes.%20Bitte%20kontaktieren%20Sie%20mich.",
  whatsappParts: "https://wa.me/491637046825?text=Hallo%20FixBike%2C%20ich%20suche%20Ersatzteile%20f%C3%BCr%20mein%20Fahrrad%20oder%20E-Bike.%20Bitte%20kontaktieren%20Sie%20mich.",
  email: "fixbike2025@gmail.com",
  steuernummer: "32/125/57407",
  street: "Wallersheimer Weg 16",
  zipCity: "56070 Koblenz",
} as const;

export const nav = [
  { href: "#ebike-vermietung", label: "Verleih" },
  { href: "#verkauf", label: "Verkauf" },
  { href: "#ersatzteile", label: "Ersatzteile" },
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
