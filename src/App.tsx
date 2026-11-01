import {
  lazy,
  Suspense,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";

const SiteFooter = lazy(() => import("./SiteFooter"));
import CookieConsent, { ConsentGate } from "./CookieConsent";
import {
  CONTACT,
  MAPS_EMBED_URL,
  MAPS_URL,
  faqItems,
  nav,
  rentalEBikes,
} from "./fixbikeConstants";
import ErsatzteileSection from "./ErsatzteileSection";
import { webpToRasterPng } from "./imagePaths";
import ScenePhoto from "./ScenePhoto";
import WebpPicture from "./WebpPicture";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "";

function App() {
  const menuId = useId();
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.documentElement.classList.add("page-loaded");
  }, []);

  useEffect(() => {
    const onScroll = () => {
      document.documentElement.classList.toggle("scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealAllIn = (root: ParentNode) => {
      root.querySelectorAll(".reveal, .stagger, .media-reveal, .mask-title").forEach((el) => {
        el.classList.add("is-revealed");
      });
    };
    const revealHashTarget = () => {
      const id = window.location.hash.replace("#", "");
      const pathMap: Record<string, string> = {
        "/werkstatt": "verkauf",
        "/service": "verkauf",
        "/verleih": "ebike-vermietung",
        "/kontakt": "contact",
        "/verkauf": "verkauf",
      };
      const sectionId = id || pathMap[window.location.pathname];
      if (!sectionId) return;
      const section = document.getElementById(sectionId);
      if (section) revealAllIn(section);
    };

    if (reduced) {
      revealAllIn(document);
      return;
    }

    document.documentElement.classList.add("motion-on");
    const nodes = document.querySelectorAll(".reveal, .stagger, .media-reveal, .mask-title");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    nodes.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        el.classList.add("is-revealed");
      } else {
        obs.observe(el);
      }
    });
    revealHashTarget();
    window.addEventListener("hashchange", revealHashTarget);
    return () => {
      obs.disconnect();
      window.removeEventListener("hashchange", revealHashTarget);
    };
  }, []);

  useEffect(() => {
    const pathToSection: Record<string, string> = {
      "/werkstatt": "verkauf",
      "/service": "verkauf",
      "/verleih": "ebike-vermietung",
      "/kontakt": "contact",
      "/verkauf": "verkauf",
    };
    const sectionId = pathToSection[window.location.pathname];
    if (!sectionId) return;
    const t = window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
      menuToggleRef.current?.focus();
    };
  }, [menuOpen]);

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

  useEffect(() => {
    if (!selectedBike) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeBookingModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selectedBike]);

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

  const closeMenu = () => setMenuOpen(false);
  const isErsatzteilePage =
    window.location.pathname.replace(/\/+$/, "") === "/ersatzteile";
  const navHref = (href: string) => {
    if (!isErsatzteilePage) return href;
    if (href === "#ersatzteile") return "/ersatzteile";
    return `/${href}`;
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Zum Inhalt springen
      </a>

      <div className="topbar">
      <div className="announce" role="note">
        In Koblenz · Wallersheimer Weg 16
      </div>

      <header className="site-header">
        <div className="container header__inner">
          <a
            className="brand"
            href="https://fixbike.online/"
            aria-label="FixBike — E-Bike Verleih und Fahrradverkauf Koblenz. Zur Startseite."
          >
            <img
              className="brand__logo"
              src="/images/fixbike-logo.png"
              srcSet="/images/fixbike-logo.png 220w, /images/fixbike-logo.png 440w"
              sizes="(max-width: 640px) 120px, 160px"
              alt="FixBike Logo"
              width={160}
              height={85}
              decoding="async"
            />
            <span className="brand__lockup">
              <span className="brand__seo-line">
                E-Bike &amp; Fahrradverleih Koblenz · Verkauf
              </span>
            </span>
          </a>

          <nav className="nav nav--header" aria-label="Hauptnavigation">
            <ul className="nav__list">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={navHref(item.href)}
                    aria-current={
                      item.href === "#ersatzteile" && isErsatzteilePage
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a className="btn btn--primary header__cta" href={navHref("#ebike-vermietung")}>
            E-Bike mieten
          </a>

          <button
            ref={menuToggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="visually-hidden">{menuOpen ? "Menü schließen" : "Menü öffnen"}</span>
            <span className="nav-toggle__bars" aria-hidden="true" />
          </button>
        </div>

        <div
          id={menuId}
          className={`nav-drawer ${menuOpen ? "is-open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <nav aria-label="Mobilnavigation">
            <ul className="nav-drawer__list">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={navHref(item.href)} onClick={closeMenu}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a className="btn btn--primary" href={navHref("#ebike-vermietung")} onClick={closeMenu}>
              E-Bike mieten
            </a>
          </nav>
        </div>
      </header>
      </div>

      <main id="main">
        {isErsatzteilePage ? <ErsatzteileSection variant="page" /> : null}
        {isErsatzteilePage ? null : (
          <>
        <section className="hero" aria-labelledby="hero-heading">
          <figure className="hero__stage">
            <ScenePhoto
              srcBase="/images/hero/fixbike-hero-1-cube"
              alt=""
              className="hero__photo"
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
            />
            <span className="hero__veil" aria-hidden="true" />
          </figure>
          <div className="hero__copy">
            <h1 id="hero-heading">
              <span className="mask-title__clip">
                <span className="mask-title__inner">Dein nächster Weg.</span>
              </span>
              <span className="mask-title__clip">
                <span className="mask-title__inner">Wird eine</span>
              </span>
              <span className="mask-title__clip">
                <span className="mask-title__inner">gute Fahrt.</span>
              </span>
              <span className="mask-title__clip hero__seo-clip">
                <span className="mask-title__inner">
                  E-Bike-Verleih und Fahrradverkauf in Koblenz
                </span>
              </span>
            </h1>
            <p className="hero__lead">
              Hochwertige CUBE E-Bikes mit persönlicher Beratung. Abholung nach
              Termin.
            </p>
            <p className="hero__price">
              105&nbsp;€ / 7 Tage · entspricht 15&nbsp;€ pro Tag
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary btn--lg" href="#ebike-vermietung">
                E-Bike auswählen <span className="btn__arrow" aria-hidden="true">→</span>
              </a>
              <a className="btn btn--ghost btn--lg" href="#verkauf">
                Kaufberatung anfragen
              </a>
            </div>
            <p className="scene-note scene-note--inline">
              Symbolbild. Verfügbare Modelle auf Anfrage.
            </p>
          </div>
        </section>

        <section className="facts stagger" aria-label="Kurzinfos">
          <div className="container facts__row">
            <p>CUBE E-Bikes</p>
            <p>Persönliche Beratung</p>
            <p>Abholung in Koblenz</p>
            <p>Transparente Preise</p>
          </div>
        </section>

        <section
          id="ebike-vermietung"
          className="section section--catalog"
          aria-labelledby="ebike-rental-heading"
        >
          <span id="verleih" className="visually-hidden" />
          <div className="container">
            <header className="section__head reveal">
              <p className="eyebrow">Verleih</p>
              <h2 id="ebike-rental-heading" className="mask-title">
                <span className="mask-title__clip">
                  <span className="mask-title__inner">CUBE E-Bikes mieten</span>
                </span>
              </h2>
              <p>
                Drei Räder in der Flotte. Anfrage zur Verfügbarkeit — Übergabe nach
                Termin in Koblenz.
              </p>
            </header>
            <div className="bike-grid stagger">
              {rentalEBikes.map((bike) => (
                <article key={`${bike.title}-${bike.size}`} className="bike-card">
                  <div className="bike-card__media">
                    <WebpPicture
                      webpSrc={bike.image}
                      fallbackSrc={webpToRasterPng(bike.image)}
                      alt={bike.imageAlt}
                      width={1024}
                      height={768}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="bike-card__body">
                    <h3>{bike.title}</h3>
                    <p className="bike-card__size">{bike.size}</p>
                    <p>{bike.countNote}</p>
                    <dl className="bike-card__specs">
                      {bike.specs.map((row) => (
                        <div key={row.label}>
                          <dt>{row.label}</dt>
                          <dd>{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="bike-card__price">
                      105&nbsp;€ / 7 Tage · entspricht 15&nbsp;€ pro Tag
                    </p>
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={() =>
                        openBookingModal({ title: bike.title, size: bike.size })
                      }
                    >
                      Verfügbarkeit anfragen <span className="btn__arrow" aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--steps" aria-labelledby="ablauf-heading">
          <div className="container">
            <header className="section__head reveal">
              <p className="eyebrow">Ablauf</p>
              <h2 id="ablauf-heading" className="mask-title">
                <span className="mask-title__clip">
                  <span className="mask-title__inner">So funktioniert die Miete</span>
                </span>
              </h2>
            </header>
            <ol className="steps stagger">
              <li>
                <strong>Rad auswählen.</strong>
                <span>Modell und Größe, die zu Ihrer Tour passen.</span>
              </li>
              <li>
                <strong>Verfügbarkeit anfragen.</strong>
                <span>Formular, WhatsApp oder Telefon — wir antworten persönlich.</span>
              </li>
              <li>
                <strong>Termin vereinbaren und abholen.</strong>
                <span>Übergabe in Koblenz nach Bestätigung. Keine Online-Zahlung.</span>
              </li>
            </ol>
          </div>
        </section>

        <section id="verkauf" className="photo-band">
          <span id="service" className="visually-hidden" />
          <div className="photo-band__media">
            <ScenePhoto
              srcBase="/images/hero/fixbike-hero-2-cube"
              alt=""
              className="photo-band__photo"
              loading="lazy"
              sizes="100vw"
            />
          </div>
          <div className="photo-band__copy reveal">
            <p className="eyebrow">Verkauf</p>
            <h2 className="mask-title">
              <span className="mask-title__clip">
                <span className="mask-title__inner">Bereit für Ihren nächsten Weg?</span>
              </span>
            </h2>
            <p>
              Ob Alltag oder sportliche Tour: Wir beraten Sie persönlich zum
              passenden Fahrrad oder E-Bike. Verfügbare Modelle und Preise auf
              Anfrage.
            </p>
            <a className="btn btn--primary" href="#contact">
              Kaufberatung anfragen <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
            <p className="scene-note scene-note--inline">
              Symbolbild. Verfügbare Modelle auf Anfrage.
            </p>
          </div>
        </section>

        <ErsatzteileSection variant="home" />

        <section
          id="ueber-uns"
          className="section section--story"
          aria-labelledby="ueber-uns-heading"
        >
          <div className="container split">
            <figure className="story__media media-reveal">
              <img
                src="/images/hero-mechaniker.png"
                alt="Adem Osmani, Inhaber von FixBike in Koblenz"
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="reveal">
              <p className="eyebrow">Über uns</p>
              <h2 id="ueber-uns-heading" className="mask-title">
                <span className="mask-title__clip">
                  <span className="mask-title__inner">Adem Osmani</span>
                </span>
              </h2>
              <p>
                Certified E-Bike Specialist. Fahrräder sind Beruf und Leidenschaft.
                Ich lege Wert auf saubere Arbeit und persönliche Beratung — Kauf und
                Miete nach Terminvereinbarung.
              </p>
              <p>
                Zuerst hören wir zu: Sitzposition, Strecke, Budget. Dann ein klarer
                Vorschlag, der zu Ihrem Alltag passt.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--faq" aria-labelledby="faq-heading">
          <div className="container container--narrow">
            <header className="section__head reveal">
              <p className="eyebrow">FAQ</p>
              <h2 id="faq-heading" className="mask-title">
                <span className="mask-title__clip">
                  <span className="mask-title__inner">Häufige Fragen</span>
                </span>
              </h2>
            </header>
            <div className="faq reveal">
              {faqItems.map((item, index) => {
                const open = openFaq === index;
                return (
                  <div className={`faq__item ${open ? "is-open" : ""}`} key={item.q}>
                    <button
                      type="button"
                      className="faq__q"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : index)}
                    >
                      {item.q}
                    </button>
                    <div className="faq__panel">
                      <p className="faq__a">{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="section section--contact"
          aria-labelledby="contact-heading"
        >
          <div className="container contact">
            <header className="section__head reveal">
              <p className="eyebrow">Kontakt</p>
              <h2 id="contact-heading" className="mask-title">
                <span className="mask-title__clip">
                  <span className="mask-title__inner">Adresse &amp; Termin</span>
                </span>
              </h2>
              <p>Nur nach Vereinbarung. Mo–Fr 9:00–18:00, Sa 9:00–14:00.</p>
            </header>
            <div className="contact__grid">
              <address className="contact__card">
                <p>
                  <strong>FixBike Koblenz</strong>
                  <br />
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                    {CONTACT.street}
                    <br />
                    {CONTACT.zipCity}
                  </a>
                </p>
                <p>
                  <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phoneDisplay}</a>
                  <br />
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </p>
                <div className="contact__actions">
                  <a className="btn btn--primary" href={`tel:${CONTACT.phoneTel}`}>
                    Anrufen
                  </a>
                  <a
                    className="btn btn--ghost"
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>
              </address>
              <div className="contact-map" aria-label="Karte: Anfahrt FixBike">
                <ConsentGate
                  fallback={
                    <div className="consent-placeholder">
                      <p>Karte wird nur nach Cookie-Einwilligung geladen.</p>
                      <a className="btn btn--ghost" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
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
            </div>
          </div>
        </section>

        <section
          id="kleine-reparaturen"
          className="note reveal"
          aria-labelledby="kleine-reparaturen-heading"
        >
          <span id="servis" className="visually-hidden" />
          <div className="container container--narrow">
            <h2 id="kleine-reparaturen-heading">Kleine Reparaturen</h2>
            <p>
              Nach Termin: kleine Reparaturen an Fahrrad und E-Bike sowie
              Teilewechsel am Rad. Größere Arbeiten bieten wir nicht an.
            </p>
          </div>
        </section>
          </>
        )}

        <Suspense fallback={null}>
          <SiteFooter />
        </Suspense>
      </main>

      <div className="mobile-dock" aria-label="Schnellkontakt">
        <a href={`tel:${CONTACT.phoneTel}`}>Anrufen</a>
        <a href={navHref("#ebike-vermietung")}>E-Bike mieten</a>
      </div>

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
                Danke. Wir melden uns per E-Mail oder Telefon.
              </p>
            ) : null}
            {bookingStatus === "error" ? (
              <p className="booking-modal__error">
                Senden fehlgeschlagen. Bitte erneut versuchen.
              </p>
            ) : null}
            <form className="booking-form" onSubmit={handleBookingSubmit}>
              <label>
                Name
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                />
              </label>
              <label>
                E-Mail
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={bookingEmail}
                  onChange={(e) => setBookingEmail(e.target.value)}
                />
              </label>
              <label>
                Telefon / WhatsApp
                <input
                  type="tel"
                  required
                  autoComplete="tel"
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
                Rückgabedatum (7 Tage)
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
