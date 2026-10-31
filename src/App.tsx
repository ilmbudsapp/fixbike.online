import {
  lazy,
  Suspense,
  useEffect,
  useState,
  type FormEvent,
} from "react";

const SiteFooter = lazy(() => import("./SiteFooter"));
import CookieConsent, { ConsentGate } from "./CookieConsent";
import {
  CONTACT,
  MAPS_EMBED_URL,
  MAPS_URL,
  nav,
  rentalEBikes,
} from "./fixbikeConstants";
import {
  HERO_MECHANIKER_FALLBACK,
  HERO_MECHANIKER_WEBP,
  webpToRasterPng,
} from "./imagePaths";
import WebpPicture from "./WebpPicture";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("page-loaded");
  }, []);

  useEffect(() => {
    const onScroll = () => {
      document.documentElement.classList.toggle("scrolled", window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.querySelectorAll(".reveal-scroll").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }
    const els = document.querySelectorAll(".reveal-scroll");
    if (els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const pathToSection: Record<string, string> = {
      "/werkstatt": "verkauf",
      "/service": "verkauf",
      "/verleih": "ebike-vermietung",
      "/kontakt": "contact",
      "/verkauf": "verkauf",
      "/ersatzteile": "ersatzteile",
    };
    const sectionId = pathToSection[window.location.pathname];
    if (!sectionId) return;
    const t = window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

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
        `Preis: Vermietung für eine Woche zum Preis von 105,00 € (15,00 € pro Tag).`,
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
            aria-label="FixBike — E-Bike & Fahrradverleih Koblenz. Zur Startseite."
          >
              <img
              className="brand__logo"
              src="/images/fixbike-logo.png"
              srcSet="/images/fixbike-logo.png 220w, /images/fixbike-logo.png 440w"
              sizes="(max-width: 640px) 140px, 220px"
              alt="FixBike Koblenz Logo - E-Bike Verleih und Fahrradverkauf"
              width={220}
              height={117}
              decoding="async"
            />
            <span className="brand__lockup">
              <span className="brand__seo-line">
                E-Bike &amp; Fahrradverleih Koblenz · Verkauf
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

          <a className="btn btn--primary header__cta" href="#ebike-vermietung">
            E-Bike mieten
          </a>
        </div>
      </header>

      <main id="main">
        <div id="top" className="hero-anchor" aria-hidden="true" />

        <section className="move-hero" aria-labelledby="move-heading">
          <img
            className="move-hero__photo"
            src={HERO_MECHANIKER_FALLBACK}
            alt="FixBike Koblenz — E-Bike Verleih und Fahrradverkauf"
            width={1600}
            height={1200}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <h1 id="move-heading" className="move-hero__title">
            JETZT IN KOBLENZ
          </h1>
          <p className="move-hero__address">
            Wallersheimer Weg 16, 56070 Koblenz
          </p>
        </section>

        <section className="hero hero--asymmetric" aria-labelledby="hero-heading">
          <div className="hero__frame" aria-hidden="true" />
          <div className="hero__noise" aria-hidden="true" />
          <div className="container container--wide hero__shell">
            <header className="hero__masthead reveal-scroll">
              <p className="hero__eyebrow">
                E-Bike &amp; Fahrradverleih Koblenz · Verkauf
              </p>
              <h2 id="hero-heading" className="hero__title">
                <span className="hero__title-line">
                  FixBike — E-Bike Verleih &amp; Fahrradverkauf Koblenz
                </span>
                <span className="hero__title-line hero__title-line--tagline">
                  Mieten Sie Ihr E-Bike für nur 15,00&nbsp;€ / Tag · 105,00&nbsp;€ / 7 Tage
                </span>
              </h2>
            </header>

            <div className="hero__editorial">
              <div className="hero__column hero__column--copy reveal-scroll">
                <p className="hero__lead">
                  <strong>Wir bei FixBike</strong> bieten{" "}
                  <strong>
                    <a href="/verleih">Fahrradverleih Koblenz</a>
                  </strong>{" "}
                  und günstig{" "}
                  <strong>
                    <a href="/verleih">Fahrrad mieten</a>
                  </strong>{" "}
                  (CUBE E-Bikes) — plus{" "}
                  <strong>
                    <a href="/verkauf">Verkauf von Fahrrädern und E-Bikes</a>
                  </strong>{" "}
                  sowie{" "}
                  <strong>
                    <a href="/ersatzteile">Ersatzteile</a>
                  </strong>
                  . Ehrliche Beratung, Abholung nach Termin —{" "}
                  <a href="/kontakt">so erreichen Sie uns</a>.
                </p>
                <p className="hero__price-ribbon" role="note">
                  <strong>E-Bike / Fahrrad mieten: ab 15,00&nbsp;€ / Tag · 105,00&nbsp;€ / 7 Tage</strong>
                  {" — "}
                  <span className="muted">FixBike Fahrradverleih Koblenz</span>
                </p>
                <div className="hero__actions">
                  <a className="btn btn--primary btn--lg" href="#ebike-vermietung">
                    Jetzt mieten (15,00&nbsp;€ / Tag · 105,00&nbsp;€ / 7 Tage)
                  </a>
                  <a
                    className="btn btn--whatsapp btn--lg"
                    href={CONTACT.whatsappRental}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp — Miete anfragen
                  </a>
                  <a className="btn btn--ghost btn--lg" href="#verkauf">
                    Fahrräder kaufen
                  </a>
                </div>
                <ul className="hero__badges" aria-label="Schwerpunkte">
                  <li>
                    <a href="/verleih">Fahrradverleih Koblenz</a>
                  </li>
                  <li>
                    <a href="/verleih">E-Bike mieten</a>
                  </li>
                  <li>
                    <a href="/verkauf">Fahrradverkauf</a>
                  </li>
                </ul>
              </div>

              <div className="hero__column hero__column--visual">
                <div className="hero__visual-stack">
                  <figure className="hero__figure">
                    <div className="hero__photo-wrap hero__photo-wrap--mechaniker">
                      <WebpPicture
                        webpSrc={HERO_MECHANIKER_WEBP}
                        fallbackSrc={HERO_MECHANIKER_FALLBACK}
                        alt="FixBike Koblenz - E-Bike Verleih und Fahrradverkauf"
                        width={1200}
                        height={800}
                        imgClassName="hero__photo hero__photo--mechaniker"
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 100vw, 55vw"
                      />
                    </div>
                    <figcaption className="visually-hidden">
                      FixBike Koblenz: Verleih und Verkauf von Fahrrad und E-Bike
                    </figcaption>
                  </figure>
                  <aside className="hero__panel" aria-label="Kurzinfo">
                    <div className="hero__stat">
                      <span className="hero__stat-label">7-Tage-Miete</span>
                      <span className="hero__stat-value">15,00&nbsp;€ / Tag</span>
                    </div>
                    <p className="hero__panel-text">
                      <strong>E-Bike mieten Koblenz</strong> oder ein Rad kaufen:
                      klassische Fahrräder und E-Bikes, plus Ersatzteile nach
                      Bedarf.
                    </p>
                    <a className="hero__panel-link" href="#verkauf">
                      Zum Fahrradverkauf →
                    </a>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="pricing-spotlight section--rhythm-tight reveal-scroll"
          aria-labelledby="preis-spotlight-heading"
        >
          <div className="container container--wide pricing-spotlight__inner">
            <h2 id="preis-spotlight-heading" className="pricing-spotlight__heading">
              Günstig Fahrrad mieten · Fahrradverleih Koblenz
            </h2>
            <p className="pricing-spotlight__lead">
              <strong>E-Bike / Fahrrad mieten ab 15,00&nbsp;€ / Tag · 105,00&nbsp;€ / 7 Tage</strong> — bei uns
              transparent, mit CUBE-Qualität. Ideal für Touren, Pendeln und Gäste in der Region Koblenz —{" "}
              <a href="/verleih">zur Modellübersicht und Buchung</a> oder{" "}
              <a href="/kontakt">direkt Kontakt</a>.
            </p>
            <div className="pricing-spotlight__pricebox" role="group" aria-label="Tagespreis und Wochenpreis">
              <span className="pricing-spotlight__amount">15,00&nbsp;€</span>
              <span className="pricing-spotlight__period">/ Tag · 105,00&nbsp;€ / 7 Tage</span>
            </div>
            <div className="pricing-spotlight__actions">
              <a className="btn btn--primary btn--lg" href="#ebike-vermietung">
                Modelle &amp; Buchung
              </a>
              <a className="btn btn--whatsapp btn--lg" href={CONTACT.whatsappRental} target="_blank" rel="noopener noreferrer">
                WhatsApp anfragen
              </a>
              <a className="btn btn--ghost btn--lg" href="#contact">
                Kontakt
              </a>
            </div>
          </div>
        </section>

        <section
          id="ebike-vermietung"
          className="section section--ebike-showcase section--rhythm-deep reveal-scroll"
          aria-labelledby="ebike-rental-heading"
        >
          <div className="container container--wide ebike__shell">
            <span className="section__index" aria-hidden="true">
              01
            </span>
            <header className="section__head section__head--ebike ebike__head">
              <p className="ebike-showcase__eyebrow">Fahrradverleih Koblenz</p>
              <h2 id="ebike-rental-heading">
                E-Bike mieten Koblenz — Fahrradverleih &amp; Pedelecs
              </h2>
              <h3 className="ebike-showcase__subheading">
                Günstig Fahrrad mieten in Deutschland — CUBE E-Bikes (M &amp; L) &amp; MTB
              </h3>
              <p className="section__head-lead">
                <strong>Unser Fahrradverleih in Koblenz</strong> mit hochwertigen{" "}
                <strong>CUBE</strong>-E-Bikes ab <strong>15€/Tag oder 105€/Woche</strong>. Reservierung per
                Telefon, <a href={CONTACT.whatsappRental} target="_blank" rel="noopener noreferrer"><strong>WhatsApp</strong></a> oder{" "}
                <a href="/kontakt">E-Mail über unsere Kontaktseite</a>. Interesse am Kauf?{" "}
                <a href="/verkauf">Fahrräder und E-Bikes kaufen</a>.
              </p>
            </header>

            <div className="pricing-table-wrap" aria-labelledby="mietpreise-heading">
              <h3 id="mietpreise-heading" className="pricing-table__title">
                Mietpreise — Fahrradverleih Koblenz
              </h3>
              <div className="pricing-table-scroll">
                <table className="pricing-table">
                  <caption className="visually-hidden">
                    Übersicht E-Bike mieten Koblenz — Wochenpauschale
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Angebot</th>
                      <th scope="col">Preis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="pricing-table__featured">
                      <td>
                        <strong>E-Bike / Fahrrad — 7 Tage Miete</strong>
                        <br />
                        <span className="muted small">
                          FixBike Fahrradverleih — günstig Fahrrad mieten (Deutschland)
                        </span>
                      </td>
                      <td>
                        <strong className="pricing-table__eur">105,00&nbsp;€</strong>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="pricing-table__note">
                        Inkl. Beratung zur Radgröße · Übergabe nach Termin ·{" "}
                        <a href="/kontakt">Kontakt für Verfügbarkeit</a> ·{" "}
                        <a href="/verkauf">Verkauf</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ebike-showcase__grid ebike-showcase__grid--editorial">
              {rentalEBikes.map((bike) => (
                <article key={`${bike.title}-${bike.size}`} className="ebike-card">
                  <div className="ebike-card__media">
                    <WebpPicture
                      webpSrc={bike.image}
                      fallbackSrc={webpToRasterPng(bike.image)}
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
                    <dl className="ebike-card__specs" aria-label="Technische Eckdaten">
                      {bike.specs.map((row) => (
                        <div key={row.label} className="ebike-card__spec-row">
                          <dt>{row.label}:</dt>
                          <dd>{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="ebike-card__note ebike-card__note--spacer">
                      Vermietung für eine Woche zum Preis von 105,00 € (15,00 € pro Tag).
                    </p>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        className="btn btn--primary ebike-card__cta-btn"
                        onClick={() =>
                          openBookingModal({ title: bike.title, size: bike.size })
                        }
                      >
                        Jetzt anfragen
                      </button>
                      <a
                        className="btn btn--whatsapp ebike-card__cta-btn"
                        href={CONTACT.whatsappRental}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="verkauf"
          className="section section--surface section--editorial-split section--rhythm-standard reveal-scroll"
        >
          <span id="service" className="visually-hidden" />
          <span className="section__index section__index--alt" aria-hidden="true">
            02
          </span>
          <div className="container container--wide split split--reverse split--bleed-start">
            <figure className="split__figure split__figure--lift split__figure--bleed">
              <div className="media-frame media-frame--soft">
                <WebpPicture
                  webpSrc="/images/verkauf.webp"
                  fallbackSrc="/images/verkauf.jpg"
                  alt="Fahrradverkauf Koblenz — Fahrräder und E-Bikes bei FixBike"
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>
            <div className="split__content">
              <h2>Fahrradverkauf Koblenz — klassisch und elektrisch</h2>
              <h3 className="split__subheading">
                Wir verkaufen Fahrräder und E-Bikes
              </h3>
              <p className="split__lead">
                Bei FixBike kaufen Sie <strong>normale Fahrräder</strong> und{" "}
                <strong>elektrische Fahrräder (E-Bikes)</strong>. Wir beraten zu
                Sitzposition, Einsatz (Alltag, Tour, Stadt) und Budget — sachlich
                und ohne Schnickschnack. Zum Ausprobieren:{" "}
                <a href="/verleih">E-Bike-Verleih</a>.
              </p>
              <ul className="hero__badges" aria-label="Verkauf">
                <li>City- und Trekkingräder</li>
                <li>E-Bikes / Pedelecs</li>
                <li>Beratung nach Termin</li>
              </ul>
              <p className="muted">
                Aktuelle Modelle und Preise erfragen Sie telefonisch, per WhatsApp
                oder E-Mail.
              </p>
              <div className="split__callout">
                <div className="callout callout--accent">
                  <h3 className="callout__title">Rad reservieren</h3>
                  <p>
                    Sagen Sie uns, ob Sie ein klassisches Fahrrad oder ein E-Bike
                    suchen — wir nennen Ihnen verfügbare Modelle.
                  </p>
                  <a className="btn btn--primary" href="#contact">
                    Kontakt aufnehmen
                  </a>
                  <a
                    className="btn btn--whatsapp"
                    href={CONTACT.whatsappSales}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: "0.5rem" }}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="ersatzteile"
          className="section section--surface section--rhythm-standard reveal-scroll"
          aria-labelledby="ersatzteile-heading"
        >
          <div className="container container--wide">
            <span className="section__index" aria-hidden="true">
              03
            </span>
            <header className="section__head">
              <h2 id="ersatzteile-heading">Ersatzteile zum Wechseln</h2>
              <p>
                Wir verkaufen <strong>Ersatzteile für Fahrrad und E-Bike</strong>:
                Verschleißteile, Antrieb, Bremsen, Reifen und weiteres Zubehör —
                nach Verfügbarkeit und passend zu Ihrem Rad.
              </p>
            </header>
            <div className="why-grid why-grid--mosaic">
              <article className="why-card">
                <h3>Verschleißteile</h3>
                <p>
                  Kette, Kassette, Bremsbeläge, Schläuche, Reifen und Beleuchtung
                  für Alltag und Tour.
                </p>
              </article>
              <article className="why-card">
                <h3>Antrieb &amp; Bremsen</h3>
                <p>
                  Komponenten von Marken wie <strong>Shimano</strong> und{" "}
                  <strong>SRAM</strong>, abgestimmt auf Ihr Modell.
                </p>
              </article>
              <article className="why-card">
                <h3>Beratung vor dem Kauf</h3>
                <p>
                  Nennen Sie Marke und Modell — wir sagen Ihnen, welches Teil
                  passt.{" "}
                  <a
                    href={CONTACT.whatsappParts}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp-Anfrage
                  </a>
                  .
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="ueber-uns"
          className="section section--about section--surface section--rhythm-standard reveal-scroll"
          aria-labelledby="ueber-uns-heading"
        >
          <div className="container container--wide about__shell">
            <span className="section__index" aria-hidden="true">
              04
            </span>
            <header className="section__head section__head--about">
              <h2 id="ueber-uns-heading">Über uns</h2>
              <div className="about__prose">
                <p>
                  Ich heiße Adem Osmani, Certified E-Bike Specialist. Fahrräder
                  sind für mich nicht nur ein Beruf, sondern eine echte
                  Leidenschaft. Durch meine langjährige Erfahrung in der Arbeit
                  mit Fahrrädern ist aus Interesse mit der Zeit eine echte
                  Begeisterung geworden. Ich lege großen Wert auf saubere
                  Arbeit und persönliche Beratung. Jeder Kauf und jede Miete wird
                  individuell geplant – nach Bestellung und Terminvereinbarung.
                </p>
                <p>
                  Wir arbeiten direkt mit Ihnen, daher bleibt jeder Schritt
                  transparent. Zuerst hören wir zu, damit Ihr Bedarf wirklich
                  passt: Sitzposition, Strecke und Budget. So sehen Sie klar,
                  warum unser Vorschlag zu Ihrem Alltag passt.
                </p>
                <p className="about__tagline muted">
                  Verkauf und Verleih{" "}
                  <span className="about__tagline-strong">nur nach Terminvereinbarung</span>.
                </p>
              </div>
            </header>
          </div>
        </section>

        <section
          id="warum-fixbike"
          className="section section--why section--rhythm-deep reveal-scroll"
          aria-labelledby="warum-heading"
        >
          <div className="container container--wide why__shell">
            <span className="section__index" aria-hidden="true">
              05
            </span>
            <header className="section__head section__head--why">
              <h2 id="warum-heading">Warum FixBike in Koblenz?</h2>
              <p>
                Ihr lokaler Partner für{" "}
                <strong>
                  <a href="/verleih">Fahrradverleih</a>
                </strong>
                ,{" "}
                <strong>
                  <a href="/verleih">E-Bike mieten</a>
                </strong>
                ,{" "}
                <strong>
                  <a href="/verkauf">Fahrrad- und E-Bike-Verkauf</a>
                </strong>{" "}
                und{" "}
                <strong>
                  <a href="/ersatzteile">Ersatzteile</a>
                </strong>
                .{" "}
                <a href="/kontakt">Kontakt &amp; Anfahrt</a> finden Sie hier.
              </p>
            </header>
            <div className="why-grid why-grid--mosaic">
              <article className="why-card">
                <h3>Lokal &amp; persönlich</h3>
                <p>
                  Kurze Wege in Koblenz und direkter Draht zu mir und unserem Team —{" "}
                  <a href="/kontakt">so erreichen Sie uns</a>.
                </p>
              </article>
              <article className="why-card">
                <h3>Fahrrad und E-Bike kaufen</h3>
                <p>
                  Klassische Räder und Pedelecs mit ehrlicher Beratung zu Größe,
                  Einsatz und Preis.
                </p>
              </article>
              <article className="why-card">
                <h3>Faire Preise &amp; Ersatzteile</h3>
                <p>
                  Qualitätskomponenten von <strong>Shimano</strong> und{" "}
                  <strong>SRAM</strong>, passend zu Ihrem Rad und unserem{" "}
                  <a href="/verleih">Verleih-Angebot</a>.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="section section--contact section--rhythm-wide reveal-scroll"
          aria-labelledby="contact-heading"
        >
          <div className="container container--wide contact__shell">
            <span className="section__index section__index--alt" aria-hidden="true">
              06
            </span>
            <header className="section__head section__head--contact">
              <h2 id="contact-heading">Kontakt &amp; Anfahrt</h2>
              <p>
                <strong>
                  <a href="/verleih">Fahrradverleih Koblenz</a>
                </strong>,{" "}
                <strong>
                  <a href="/verleih">E-Bike mieten Koblenz</a>
                </strong>{" "}
                und{" "}
                <strong>
                  <a href="/verkauf">Fahrradverkauf Koblenz</a>
                </strong>{" "}
                — Schreiben Sie uns per WhatsApp oder E-Mail —{" "}
                <a href="/kontakt">alle Kontaktwege</a>.
              </p>
            </header>

            <div className="contact__stage">
              <div className="contact-map" aria-label="Karte: Anfahrt FixBike">
                <ConsentGate
                  fallback={
                    <div className="consent-placeholder">
                      <p>Karte wird nur nach Cookie-Einwilligung geladen.</p>
                      <a className="btn btn--maps" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                        In Google Maps öffnen
                      </a>
                    </div>
                  }
                >
                  <iframe
                    title="Google Maps: FixBike, Wallersheimer Weg 16, 56070 Koblenz"
                    className="contact-map__iframe"
                    src={MAPS_EMBED_URL}
                    width={600}
                    height={380}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </ConsentGate>
              </div>

              <div className="contact-grid contact-grid--stack">
              <address className="contact-card">
                <h3>Adresse &amp; Erreichbarkeit</h3>
                <p>
                  <strong>FixBike Koblenz</strong>
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
                  Nur nach Terminvereinbarung. Mo–Fr 9:00–18:00, Sa 9:00–14:00.
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
                <h3>Termin — Verleih, Verkauf &amp; Ersatzteile</h3>
                <p>
                  Übergabe und Beratung erfolgen{" "}
                  <strong>nur nach Vereinbarung</strong>. Sie melden sich per
                  Telefon, WhatsApp oder E-Mail — wir planen Miete, Kauf oder
                  Ersatzteile individuell mit Ihnen.
                </p>
                <p className="muted small">
                  Wir nehmen uns Zeit für Ihr Rad, wenn der Termin passt.
                </p>
              </div>
            </div>
            </div>
          </div>
        </section>

        <section
          id="kleine-reparaturen"
          className="section section--surface section--rhythm-standard reveal-scroll"
          aria-labelledby="kleine-reparaturen-heading"
        >
          <span id="servis" className="visually-hidden" />
          <div className="container container--wide">
            <h2 id="kleine-reparaturen-heading">Kleine Reparaturen und Teilewechsel</h2>
            <p>
              Nach Terminvereinbarung übernehmen wir <strong>kleine Reparaturen</strong>{" "}
              an Fahrrädern und E-Bikes und wechseln <strong>Ersatzteile</strong> direkt
              am Rad — zum Beispiel Schlauch, Beläge, Kette oder Schaltungseinstellung.
            </p>
            <p className="muted">
              Größere Arbeiten bieten wir nicht an. Fragen Sie uns einfach per
              WhatsApp oder E-Mail, ob Ihr Fall dazu gehört.
            </p>
          </div>
        </section>

        <section
          id="fixbike-brojke"
          className="section section--surface section--rhythm-standard reveal-scroll"
          aria-labelledby="brojke-heading"
        >
          <div className="container container--wide">
            <h2 id="brojke-heading">FixBike Online in Zahlen — Kennzahlen</h2>
            <p className="section__head-lead">
              Als Team nennen wir messbare Zusagen: <strong>20 Jahre</strong> Erfahrung am Fahrrad,{" "}
              <strong>15+</strong> Fahrradtypen, <strong>500+</strong> zufriedene Kundinnen und Kunden in der Region,{" "}
              <strong>24 h</strong> typischer Rahmen für Übergabe und kleine Reparaturen, wenn Teile verfügbar sind,{" "}
              <strong>100&nbsp;%</strong> Originalteile nach Vereinbarung und Anfragen per WhatsApp, E-Mail und Formular.
            </p>
          </div>
        </section>

        <section
          id="partner-cert"
          className="section section--rhythm-tight reveal-scroll"
          aria-labelledby="partner-heading"
        >
          <div className="container container--wide">
            <h2 id="partner-heading">Partner &amp; Standards</h2>
            <p>
              FixBike Online orientiert sich an Herstellerhinweisen von{" "}
              <a href="https://www.bosch-ebike.com/" target="_blank" rel="noopener noreferrer">
                Bosch eBike Systems
              </a>{" "}
              und{" "}
              <a href="https://bike.shimano.com/" target="_blank" rel="noopener noreferrer">
                Shimano
              </a>
              ; ich habe Bosch-eBike-Module zur Diagnose von Antrieb und Akku absolviert.
              Ihr Fahrrad durchläuft dieselben Checklisten wie unsere eigene Flotte.
              Zusätzlich orientiere ich mich an{" "}
              <a
                href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Search Central
              </a>{" "}
              für eine klare Seitenstruktur.
            </p>
          </div>
        </section>

        <section
          id="service-video"
          className="section section--surface section--rhythm-standard reveal-scroll"
          aria-labelledby="service-video-heading"
        >
          <span id="werkstatt-video" className="visually-hidden" />
          <div className="container container--wide">
            <h2 id="service-video-heading">Video — Grundlagen zur Kettenpflege</h2>
            <p className="muted small">
              Park Tool auf YouTube. Ergänzung zur Fahrradpflege — unabhängig von Miete
              und Verkauf.
            </p>
            <ConsentGate
              fallback={
                <div className="consent-placeholder consent-placeholder--video">
                  <p>YouTube-Video wird nur nach Cookie-Einwilligung geladen.</p>
                  <a
                    className="btn btn--secondary"
                    href="https://www.youtube.com/watch?v=MuwS_nSevy4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Video auf YouTube öffnen
                  </a>
                </div>
              }
            >
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                  maxWidth: 960,
                  margin: "1rem auto 0",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 12,
                }}
              >
                <iframe
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                    borderRadius: 12,
                  }}
                  src="https://www.youtube-nocookie.com/embed/MuwS_nSevy4"
                  title="Park Tool — Kettenreinigung"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </ConsentGate>
          </div>
        </section>

        <Suspense fallback={null}>
          <SiteFooter />
        </Suspense>
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
                E-Mail
                <input
                  type="email"
                  required
                  value={bookingEmail}
                  onChange={(e) => setBookingEmail(e.target.value)}
                />
              </label>
              <label>
                Telefon / WhatsApp
                <input
                  type="text"
                  required
                  value={bookingPhone}
                  onChange={(e) => setBookingPhone(e.target.value)}
                />
              </label>
              <label>
                Abholdatum
                <input
                  type="date"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </label>
              <label>
                Rückgabedatum
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
      <CookieConsent />
    </>
  );
}

export default App;
