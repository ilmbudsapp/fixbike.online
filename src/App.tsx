import { useEffect, useState, type FormEvent } from "react";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Wagenhallenweg 8, 56566 Neuwied");

/** Google Maps Embed (ohne API-Key) — Standort: Wagenhallenweg 8, Neuwied */
const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=" +
  encodeURIComponent("Wagenhallenweg 8, 56566 Neuwied, Deutschland") +
  "&hl=de&z=15&ie=UTF8&iwloc=B&output=embed";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "";

const CONTACT = {
  phoneDisplay: "+49 163 7046825",
  phoneTel: "+491637046825",
  whatsapp: "https://wa.me/491637046825",
  email: "fixbike2025@gmail.com",
  steuernummer: "32/125/57407",
  street: "Wagenhallenweg 8",
  zipCity: "56566 Neuwied",
} as const;

const nav = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#contact", label: "Kontakt" },
];

const rentalEBikes: {
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

const serviceBlocks = [
  {
    title: "Fahrrad Reparatur",
    text: "Fahrrad Reparatur Neuwied: Bremsen, Schaltung, Reifen und Gangschaltung — von der Pannenhilfe bis zur kompletten Überholung für Trekkingrad, MTB und Alltagsbike im Fahrradservice Neuwied.",
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
    text: "Saison Wartung im Fahrradservice Neuwied: Jahresinspektion, Winter-Check und Sommer-Service — Lager, Schaltung, Bremsen und Sicherheit, damit Ihr Rad fit in die Saison startet.",
    image: "/images/leistung-ebike-mtb.png",
    imageAlt:
      "CUBE E-MTB — Saison Wartung und Inspektion Neuwied",
  },
] as const;

function App() {
  const [selectedBike, setSelectedBike] = useState<{
    title: string;
    size: string;
  } | null>(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [bookingStatus, setBookingStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (!pickupDate) {
      setReturnDate("");
      return;
    }

    const start = new Date(`${pickupDate}T12:00:00`);
    start.setDate(start.getDate() + 7);
    const yyyy = start.getFullYear();
    const mm = String(start.getMonth() + 1).padStart(2, "0");
    const dd = String(start.getDate()).padStart(2, "0");
    setReturnDate(`${yyyy}-${mm}-${dd}`);
  }, [pickupDate]);

  const openBookingModal = (bike: { title: string; size: string }) => {
    setSelectedBike(bike);
    setBookingStatus("idle");
    setBookingName("");
    setBookingEmail("");
    setBookingPhone("");
    setPickupDate("");
    setReturnDate("");
  };

  const closeBookingModal = () => {
    setSelectedBike(null);
    setBookingStatus("idle");
  };

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedBike || bookingStatus === "loading") return;

    setBookingStatus("loading");

    try {
      if (!WEB3FORMS_ACCESS_KEY) {
        throw new Error("Missing Web3Forms configuration");
      }

      const messageBody = [
        `Fahrrad: ${selectedBike.title}`,
        `Größe: ${selectedBike.size}`,
        "",
        `Name: ${bookingName}`,
        `E-Mail: ${bookingEmail}`,
        `Telefon/WhatsApp: ${bookingPhone}`,
        `Abholung: ${pickupDate}`,
        `Rückgabe (+7 Tage): ${returnDate}`,
        "",
        `Preis: Vermietung für eine Woche zum Preis von 210,00 €.`,
      ].join("\n");

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Mietanfrage: ${selectedBike.title} (${selectedBike.size})`,
          name: bookingName,
          email: bookingEmail,
          message: messageBody,
        }),
      });

      const data = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Request failed");
      }

      setBookingStatus("success");
      setBookingName("");
      setBookingEmail("");
      setBookingPhone("");
      setPickupDate("");
      setReturnDate("");
    } catch {
      setBookingStatus("error");
    }
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Zum Inhalt springen
      </a>

      <a
        className="float-wa"
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="FixBike per WhatsApp Business kontaktieren"
      >
        <span className="float-wa__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </span>
        <span className="float-wa__text">WhatsApp</span>
      </a>

      <header className="site-header">
        <div className="container container--wide header__inner">
          <a
            className="brand"
            href="https://fixbike.online/"
            aria-label="FixBike Fahrradservice Neuwied — E-Bike Service und Fahrrad Reparatur. Zur Startseite."
          >
            <img
              className="brand__logo"
              src="/images/fixbike-logo.png"
              alt="FixBike"
              width={220}
              height={117}
              decoding="async"
            />
            <span className="brand__lockup">
              <span className="brand__seo-line">
                E-Bike Service · Fahrradvermietung &amp; Reparatur · Neuwied
              </span>
            </span>
          </a>

          <nav className="nav nav--header" aria-label="Hauptnavigation">
            <ul className="nav__list nav__list--compact">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <a className="btn btn--primary header__cta" href="#contact">
            Termin anfragen
          </a>
        </div>
      </header>

      <main id="main">
        <div id="top" className="hero-anchor" aria-hidden="true" />

        <section className="hero hero--asymmetric" aria-labelledby="hero-heading">
          <div className="hero__frame" aria-hidden="true" />
          <div className="hero__noise" aria-hidden="true" />
          <div className="container container--wide hero__shell">
            <header className="hero__masthead">
              <p className="hero__eyebrow">Fahrradservice · E-Bike Service</p>
              <h1 id="hero-heading" className="hero__title">
                <span className="hero__title-line">
                  Fahrradservice &amp; <span className="no-break">E-Bike</span>
                </span>
                <span className="hero__title-line">
                  Service Neuwied I Schnelle Reparatur
                </span>
              </h1>
            </header>

            <div className="hero__editorial">
              <div className="hero__column hero__column--copy">
                <p className="hero__lead">
                  Professionelle <strong>Fahrrad Reparatur Neuwied</strong> für
                  klassische Bikes und <strong>E-Bike Service Neuwied</strong>,
                  transparenter <strong>Fahrradverleih</strong> und ausgewählter{" "}
                  <strong>Fahrradverkauf</strong>. Schnelle Hilfe, ehrliche
                  Beratung — Ihr <strong>Fahrradservice Neuwied</strong>.
                </p>
                <div className="hero__actions">
                  <a className="btn btn--primary btn--lg" href="#contact">
                    Service-Termin
                  </a>
                  <a
                    className="btn btn--whatsapp btn--lg"
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                  <a className="btn btn--ghost btn--lg" href="#ebike-vermietung">
                    E-Bike mieten
                  </a>
                </div>
                <ul className="hero__badges" aria-label="Schwerpunkte">
                  <li>E-Bike Diagnose</li>
                  <li>Fahrrad Inspektion</li>
                  <li>City- &amp; Trekkingräder</li>
                </ul>
              </div>

              <div className="hero__column hero__column--visual">
                <div className="hero__visual-stack">
                  <figure className="hero__figure">
                    <div className="hero__photo-wrap hero__photo-wrap--mechaniker">
                      <img
                        className="hero__photo hero__photo--mechaniker"
                        src="/images/hero-mechaniker.png"
                        width={1200}
                        height={800}
                        alt="FixBike Service: E-Bike-Reparatur am CUBE Stereo Hybrid"
                        fetchPriority="high"
                        decoding="async"
                      />
                    </div>
                    <figcaption className="visually-hidden">
                      Service: professionelle Fahrrad- und E-Bike-Reparatur bei
                      FixBike
                    </figcaption>
                  </figure>
                  <aside className="hero__panel" aria-label="Kurzinfo">
                    <div className="hero__stat">
                      <span className="hero__stat-label">Schwerpunkt</span>
                      <span className="hero__stat-value">
                        Service &amp; Sicherheit
                      </span>
                    </div>
                    <p className="hero__panel-text">
                      Ob <strong>Zweirad Service</strong> für den Arbeitsweg oder
                      Vorbereitung auf die Saison — wir kümmern uns um Schaltung,
                      Bremsen, Reifen und Antrieb, damit Sie wieder zuverlässig
                      unterwegs sind.
                    </p>
                    <a className="hero__panel-link" href="#leistungen">
                      Leistungen ansehen →
                    </a>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="ueber-uns"
          className="section section--about section--surface section--rhythm-standard"
          aria-labelledby="ueber-uns-heading"
        >
          <div className="container container--wide about__shell">
            <span className="section__index" aria-hidden="true">
              01
            </span>
            <header className="section__head section__head--about">
              <h2 id="ueber-uns-heading">Über uns</h2>
              <div className="about__prose">
                <p>
                  Ich heiße Adem Osmani. Fahrräder sind für mich nicht nur ein
                  Beruf, sondern eine echte Leidenschaft. Durch meine
                  langjährige Erfahrung in der Arbeit mit Fahrrädern ist aus
                  Interesse mit der Zeit eine echte Begeisterung geworden. Ich
                  lege großen Wert auf saubere Arbeit, persönliche Beratung und
                  zuverlässigen Service. Jeder Auftrag wird individuell geplant
                  – nach Bestellung und Terminvereinbarung.
                </p>
                <p className="about__tagline muted">
                  Nur nach Terminvereinbarung und Bestellung.{" "}
                  <span className="about__tagline-strong">Termine nach Vereinbarung.</span>
                </p>
              </div>
            </header>
          </div>
        </section>

        <section
          id="ebike-vermietung"
          className="section section--ebike-showcase section--rhythm-deep"
          aria-labelledby="ebike-rental-heading"
        >
          <div className="container container--wide ebike__shell">
            <span className="section__index" aria-hidden="true">
              02
            </span>
            <header className="section__head section__head--ebike ebike__head">
              <p className="ebike-showcase__eyebrow">E-Bike Vermietung</p>
              <h2 id="ebike-rental-heading">
                E-Bike Vermietung Neuwied — elektrische Fahrräder mieten
              </h2>
              <h3 className="ebike-showcase__subheading">
                E-Bike Service Neuwied: CUBE Pedelecs zur Miete
              </h3>
              <p className="section__head-lead">
                Hochwertige <strong>CUBE</strong> E-Bikes in{" "}
                <strong>Größe M</strong> — Abholung nach Terminvereinbarung im{" "}
                <strong>Fahrradservice Neuwied</strong>. Reservierung per
                Telefon, WhatsApp oder E-Mail.{" "}
                <strong>Termine nach Vereinbarung.</strong>
              </p>
            </header>
            <div className="ebike-showcase__grid ebike-showcase__grid--editorial">
              {rentalEBikes.map((bike) => (
                <article key={`${bike.title}-${bike.size}`} className="ebike-card">
                  <div className="ebike-card__media">
                    <img
                      src={bike.image}
                      alt={bike.imageAlt}
                      width={900}
                      height={675}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="ebike-card__body">
                    <div className="ebike-card__titles">
                      <h3>{bike.title}</h3>
                      <p className="ebike-card__size">{bike.size}</p>
                    </div>
                    {bike.availability ? (
                      <p className="ebike-card__availability" role="status">
                        {bike.availability}
                      </p>
                    ) : null}
                    <p className="ebike-card__note">{bike.countNote}</p>
                    <p className="ebike-card__note">
                      Vermietung für eine Woche zum Preis von 210,00 €.
                    </p>
                    <button
                      type="button"
                      className="btn btn--primary ebike-card__cta-btn"
                      onClick={() =>
                        openBookingModal({ title: bike.title, size: bike.size })
                      }
                    >
                      Miete anfragen
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="leistungen"
          className="section section--surface section--services section--rhythm-standard"
          aria-labelledby="leistungen-heading"
        >
          <div className="container container--wide services__shell">
            <span className="section__index section__index--alt" aria-hidden="true">
              03
            </span>
            <header className="section__head section__head--split-intro">
              <h2 id="leistungen-heading">
                Leistungen — Fahrradservice Neuwied
              </h2>
              <p>
                Von der <strong>Fahrrad Reparatur Neuwied</strong> bis zum{" "}
                <strong>E-Bike Service Neuwied</strong> — wir arbeiten präzise
                und erklären, was Ihr Bike wirklich braucht.{" "}
                <strong>Nur nach Terminvereinbarung und Bestellung.</strong>
              </p>
            </header>
            <ul className="cards cards--bento">
              {serviceBlocks.map((s, i) => (
                <li
                  key={s.title}
                  className={
                    i === 0
                      ? "card card--bento-lead"
                      : i === 1
                        ? "card card--bento card--bento-mid"
                        : "card card--bento card--bento-overlap"
                  }
                >
                  <div className="card__media">
                    <img
                      src={s.image}
                      alt={s.imageAlt}
                      width={640}
                      height={400}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="card__body">
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="warum-fixbike"
          className="section section--why section--rhythm-deep"
          aria-labelledby="warum-heading"
        >
          <div className="container container--wide why__shell">
            <span className="section__index" aria-hidden="true">
              04
            </span>
            <header className="section__head section__head--why">
              <h2 id="warum-heading">Warum FixBike in Neuwied?</h2>
              <p>
                Ihr <strong>Fahrradservice Neuwied</strong> mit Fokus auf
                Qualität, Transparenz und schnelle Hilfe bei{" "}
                <strong>Fahrrad Reparatur</strong> und{" "}
                <strong>E-Bike Service</strong>.
              </p>
            </header>
            <div className="why-grid why-grid--mosaic">
              <article className="why-card">
                <h3>Fahrradservice Neuwied — lokal &amp; persönlich</h3>
                <p>
                  Kurze Wege in der Region Neuwied, direkter Draht zum Service
                  und keine anonyme Kette.
                </p>
              </article>
              <article className="why-card">
                <h3>Schnelle Fahrrad Reparatur Neuwied</h3>
                <p>
                  Pannen und sicherheitsrelevante Themen priorisieren wir — Sie
                  wissen, woran Sie sind.
                </p>
              </article>
              <article className="why-card">
                <h3>Faire Preise &amp; Ersatzteile</h3>
                <p>
                  Qualitätskomponenten von Herstellern wie{" "}
                  <strong>Shimano</strong> und <strong>SRAM</strong>, abgestimmt
                  auf Ihr Rad und Ihre Nutzung.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="verleih"
          className="section section--editorial-split section--rhythm-tight"
        >
          <div className="container container--wide split split--bleed-end">
            <figure className="split__figure split__figure--lift split__figure--bleed">
              <div className="media-frame">
                <img
                  src="/images/verleih.jpg"
                  alt="Fahrradverleih Neuwied — flexible Mobilität und Ausleihe"
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>
            <div className="split__content">
              <h2>Fahrradverleih Neuwied — flexibel mobil</h2>
              <h3 className="split__subheading">
                Fahrrad Reparatur Neuwied während Ihr Ersatzrad rollt
              </h3>
              <p className="split__lead">
                <strong>Fahrrad mieten</strong> für Gäste, Events oder den
                schnellen Ersatz, wenn Ihr eigenes Rad bei uns im{" "}
                <strong>Fahrradservice</strong> ist. Reservierung und Details
                folgen hier in Kürze — sprechen Sie uns gern direkt an.
              </p>
              <ul className="checklist">
                <li>Cityräder &amp; Alltagsbikes</li>
                <li>E-Bikes auf Anfrage</li>
                <li>Klare Mietbedingungen &amp; Übergabe</li>
              </ul>
              <div className="split__callout">
                <div className="callout">
                  <h3 className="callout__title">Verleih-Anfrage</h3>
                  <p>
                    Nennen Sie Zeitraum, Radtyp und Körpergröße — wir melden uns
                    mit Verfügbarkeit und Preis.
                  </p>
                  <a className="btn btn--secondary" href="#contact">
                    Jetzt anfragen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="verkauf"
          className="section section--surface section--editorial-split section--rhythm-standard"
        >
          <div className="container container--wide split split--reverse split--bleed-start">
            <figure className="split__figure split__figure--lift split__figure--bleed">
              <div className="media-frame media-frame--soft">
                <img
                  src="/images/verkauf.jpg"
                  alt="Fahrräder im Geschäft — Fahrradverkauf und Beratung"
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>
            <div className="split__content">
              <h2>Fahrradverkauf Neuwied — passend beraten</h2>
              <h3 className="split__subheading">
                Fahrradservice Neuwied prüft jedes Rad vor dem Verkauf
              </h3>
              <p className="split__lead">
                Ausgewählte Modelle und Gebrauchräder mit Check durch unseren
                Service. Beim <strong>Fahrrad kaufen</strong> zählen
                Sitzposition, Komponenten und Wartungsfreundlichkeit — wir
                beraten sachlich und ohne Schnickschnack.
              </p>
              <p className="muted">
                Online-Shop und Zahlungsoptionen werden ergänzt — bis dahin
                erreichen Sie uns über die Kontaktwege unten.
              </p>
              <div className="split__callout">
                <div className="callout callout--accent">
                  <h3 className="callout__title">Stöbern &amp; reservieren</h3>
                  <p>
                    Aktuelle Räder und Preise können Sie telefonisch oder per
                    E-Mail erfragen — wir halten Sie auf dem Laufenden.
                  </p>
                  <a className="btn btn--primary" href="#contact">
                    Kontakt aufnehmen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="section section--contact section--rhythm-wide"
          aria-labelledby="contact-heading"
        >
          <div className="container container--wide contact__shell">
            <span className="section__index section__index--alt" aria-hidden="true">
              05
            </span>
            <header className="section__head section__head--contact">
              <h2 id="contact-heading">Kontakt &amp; Anfahrt</h2>
              <p>
                <strong>Fahrradservice Neuwied</strong> —{" "}
                <strong>Nur nach Terminvereinbarung und Bestellung.</strong>{" "}
                <strong>Termine nach Vereinbarung.</strong> Kontaktieren Sie uns
                per WhatsApp oder E-Mail für{" "}
                <strong>Fahrrad Reparatur</strong>,{" "}
                <strong>E-Bike Service Neuwied</strong>, Verleih oder Beratung.
              </p>
            </header>

            <div className="contact__stage">
              <div className="contact-map" aria-label="Karte: Anfahrt FixBike">
                <iframe
                  title="Google Maps: FixBike, Wagenhallenweg 8, 56566 Neuwied"
                  className="contact-map__iframe"
                  src={MAPS_EMBED_URL}
                  width={600}
                  height={380}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="contact-grid contact-grid--stack">
              <address className="contact-card">
                <h3>Adresse &amp; Erreichbarkeit</h3>
                <p>
                  <strong>FixBike Neuwied Fahrradservice</strong>
                  <br />
                  <a
                    className="contact-card__maps"
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {CONTACT.street}
                    <br />
                    {CONTACT.zipCity}
                    <br />
                    Deutschland
                  </a>
                </p>
                <p>
                  <a href={`tel:${CONTACT.phoneTel}`}>
                    {CONTACT.phoneDisplay}
                  </a>
                  <br />
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </p>
                <p className="contact-card__appointment-lead">
                  Nur nach Terminvereinbarung und Bestellung. Termine nach
                  Vereinbarung.
                </p>
                <p className="contact-card__appointment-contact">
                  Kontakt: WhatsApp{" "}
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {CONTACT.phoneDisplay}
                  </a>{" "}
                  | E-Mail{" "}
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </p>
                <p className="contact-card__appointment-community">
                  Flexibel für Kunden aus Balkan-Community in Deutschland.
                </p>
                <p className="contact-card__actions">
                  <a
                    className="btn btn--maps"
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    In Google Maps öffnen
                  </a>
                  <a
                    className="btn btn--whatsapp"
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Business
                  </a>
                </p>
              </address>
              <div className="contact-card contact-card--highlight">
                <h3>Termin — Fahrrad Reparatur &amp; E-Bike Service</h3>
                <p>
                  Service und Übergabe erfolgen{" "}
                  <strong>nur nach Vereinbarung</strong>. Sie melden sich per
                  Telefon, WhatsApp oder E-Mail — wir planen Reparatur,
                  Inspektion, <strong>E-Bike Service Neuwied</strong> oder
                  Verleih individuell mit Ihnen.
                </p>
                <p className="muted small">
                  Termine nach Vereinbarung — wir nehmen uns Zeit für Ihr Rad,
                  wenn es passt.
                </p>
              </div>
            </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container container--wide footer__grid">
            <div>
              <p className="footer__brand">FixBike</p>
              <p className="footer__tagline">
                Fahrradservice · E-Bike Reparatur · Fahrradverleih ·
                Fahrradverkauf
              </p>
            </div>
            <nav aria-label="Fußnavigation">
              <ul className="footer__links">
                <li>
                  <a href="#impressum">Impressum</a>
                </li>
                <li>
                  <a href="#datenschutz">Datenschutz</a>
                </li>
              </ul>
            </nav>
          </div>

          <div id="impressum" className="legal container container--wide">
            <h2>Impressum</h2>
            <p className="muted small">
              <strong>Hinweis:</strong> Diese Angaben sind Platzhalter und müssen
              durch die vollständigen, rechtskonformen Impressumsdaten Ihres
              Betriebs ersetzt werden (§ 5 TMG / DDG).
            </p>
            <p>
              <strong>FixBike</strong>
              <br />
              Adem Osmani
              <br />
              Wagenhallenweg 8
              <br />
              56566 Neuwied
              <br />
              Deutschland
            </p>
            <p>
              <strong>Kontakt:</strong>
              <br />
              E-Mail:{" "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <br />
              Telefon:{" "}
              <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phoneDisplay}</a>
            </p>
            <p>
              <strong>Steuernummer:</strong> {CONTACT.steuernummer}
              <br />
              <span className="muted small">
                (Eine <strong>USt-IdNr.</strong> im Format DE… erteilt das
                Finanzamt gesondert — bitte ergänzen, sobald vorliegend.)
              </span>
            </p>
          </div>

          <div id="datenschutz" className="legal container container--wide">
            <h2>Datenschutz</h2>
            <p className="muted small">
              <strong>Hinweis:</strong> Erstellen Sie eine vollständige
              Datenschutzerklärung (DSGVO) passend zu Formularen, Cookies,
              Analytics und Zahlungsanbietern — idealerweise mit
              Rechtsberatung.
            </p>
            <p>
              Verantwortliche Stelle: FixBike, Adem Osmani, Wagenhallenweg 8,
              56566 Neuwied, Deutschland — Kontakt:{" "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. Diese
              Website kann technisch notwendige Daten verarbeiten (z. B.
              Server-Logs beim Hosting-Anbieter).
            </p>
          </div>

          <div className="footer__bottom container container--wide">
            <div className="footer__bottom-row">
              <p>© {new Date().getFullYear()} FixBike · fixbike.online</p>
              <p className="footer__designer-credit">
                <a
                  href="https://agrmultimedia.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AGRMULTIMEDIA
                </a>
                {" "}
                — Web Design Agron Osmani
              </p>
            </div>
            <p className="footer__photos">
              Symbolfotos über{" "}
              <a
                href="https://www.pexels.com/license/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pexels
              </a>{" "}
              — kann durch eigene Betriebsfotos ersetzt werden.
            </p>
          </div>
        </footer>
      </main>

      {selectedBike ? (
        <div
          className="booking-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <div className="booking-modal__backdrop" onClick={closeBookingModal} />
          <div className="booking-modal__panel">
            <button
              type="button"
              className="booking-modal__close"
              onClick={closeBookingModal}
              aria-label="Modal schließen"
            >
              ×
            </button>
            <h3 id="booking-modal-title">Mietanfrage — {selectedBike.title}</h3>
            <p className="booking-modal__meta">{selectedBike.size}</p>

            {bookingStatus === "success" ? (
              <p className="booking-modal__success">
                Danke! Ihre Anfrage wurde gesendet. Wir melden uns bald per
                E-Mail oder Telefon.
              </p>
            ) : null}
            {bookingStatus === "error" ? (
              <p className="booking-modal__error">
                Senden fehlgeschlagen. Bitte versuchen Sie es erneut.
              </p>
            ) : null}

            <form className="booking-form" onSubmit={handleBookingSubmit}>
              <label>
                Name
                <input
                  type="text"
                  required
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  required
                  value={bookingEmail}
                  onChange={(e) => setBookingEmail(e.target.value)}
                />
              </label>
              <label>
                Phone/WhatsApp
                <input
                  type="text"
                  required
                  value={bookingPhone}
                  onChange={(e) => setBookingPhone(e.target.value)}
                />
              </label>
              <label>
                Pickup date
                <input
                  type="date"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </label>
              <label>
                Return date
                <input type="date" value={returnDate} readOnly />
              </label>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={bookingStatus === "loading"}
              >
                {bookingStatus === "loading" ? "Wird gesendet..." : "Anfrage senden"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
