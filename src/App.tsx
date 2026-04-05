const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Wagenhallenweg 8, 56566 Neuwied");

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
  { href: "#ebike-vermietung", label: "E-Bike Vermietung" },
  { href: "#leistungen", label: "Leistungen" },
  { href: "#verleih", label: "Fahrradverleih" },
  { href: "#verkauf", label: "Fahrradverkauf" },
  { href: "#kontakt", label: "Kontakt" },
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
    availability: "2 Stück verfügbar — beide in Weiß.",
    countNote:
      "Zwei identische E-Bikes dieses Modells — ideal für Paare oder Gruppen.",
    image: "/images/cube-touring-hybrid-m.png",
    imageAlt:
      "CUBE Touring Hybrid E-Bike in Weiß, Größe M — Trekking und Alltag",
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

const services = [
  {
    title: "Fahrrad-Reparatur & Inspektion",
    text: "Von der schnellen Pannenhilfe bis zur kompletten Inspektion: Bremsen, Schaltung, Lager und Sicherheit — für Trekkingrad, MTB und Alltagsbike.",
    image: "/images/werkstatt.jpg",
    imageAlt:
      "Fahrradwerkstatt: Werkzeug und Fahrradreifen — Reparatur und Inspektion",
  },
  {
    title: "E-Bike Service & Diagnose",
    text: "E-Bike Reparatur mit Fokus auf Antrieb, Akku-Handling und Software-Updates. Sorgfältige Fehleranalyse für zuverlässige Reichweite und Sicherheit.",
    image: "/images/ebike.jpg",
    imageAlt: "E-Bike und klassisches Fahrrad — Diagnose im Fachbetrieb",
  },
  {
    title: "Zubehör & kleine Upgrades",
    text: "Schlösser, Beleuchtung, Schutzbleche, Pedale und mehr — montiert und eingestellt, damit Ihr Fahrrad alltagstauglich bleibt.",
    image: "/images/zubehoer.jpg",
    imageAlt: "Fahrradlenker und Komponenten — Zubehör und Upgrade-Service",
  },
];

function App() {
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
        aria-label="Fixbike per WhatsApp Business kontaktieren"
      >
        <span className="float-wa__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </span>
        <span className="float-wa__text">WhatsApp</span>
      </a>

      <header className="site-header">
        <div className="container header__inner">
          <a className="brand" href="#top" aria-label="Fixbike Startseite">
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__text">
              <span className="brand__name">Fixbike</span>
              <span className="brand__tag">Fahrradwerkstatt</span>
            </span>
          </a>

          <nav className="nav" aria-label="Hauptnavigation">
            <ul className="nav__list">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <a className="btn btn--primary header__cta" href="#kontakt">
            Termin anfragen
          </a>
        </div>
      </header>

      <main id="main">
        <div id="top" className="hero-anchor" aria-hidden="true" />

        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero__glow" aria-hidden="true" />
          <div className="container hero__grid">
            <div className="hero__copy">
              <p className="hero__eyebrow">Fahrradwerkstatt · E-Bike Service</p>
              <h1 id="hero-heading">
                Reparatur, Verleih &amp; Verkauf — alles rund ums Fahrrad
              </h1>
              <p className="hero__lead">
                Professionelle <strong>Fahrrad Reparatur</strong> für klassische
                Bikes und <strong>E-Bikes</strong>, transparenter{" "}
                <strong>Fahrradverleih</strong> und ausgewählter{" "}
                <strong>Fahrradverkauf</strong>. Schnelle Hilfe, ehrliche
                Beratung, feste Qualität.
              </p>
              <div className="hero__actions">
                <a className="btn btn--primary btn--lg" href="#kontakt">
                  Werkstatt-Termin
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
            <div className="hero__shots">
              <figure className="hero__figure">
                <div className="hero__photo-wrap hero__photo-wrap--werkstatt">
                  <img
                    className="hero__photo hero__photo--werkstatt"
                    src="/images/hero-werkstatt.png"
                    width={1200}
                    height={800}
                    alt="Fixbike Werkstatt: E-Bike-Service und Reparatur am CUBE Stereo Hybrid"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
                <figcaption className="visually-hidden">
                  Werkstatt: professionelle Fahrrad- und E-Bike-Reparatur bei
                  Fixbike
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
                  Ob <strong>Zweirad Werkstatt</strong> für den Arbeitsweg oder
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
        </section>

        <section
          id="ebike-vermietung"
          className="section section--ebike-showcase"
          aria-labelledby="ebike-rental-heading"
        >
          <div className="container">
            <header className="section__head section__head--ebike">
              <p className="ebike-showcase__eyebrow">E-Bike Vermietung</p>
              <h2 id="ebike-rental-heading">
                Elektrische Fahrräder zur Miete (E-Bikes)
              </h2>
              <p className="section__head-lead">
                Hochwertige <strong>CUBE</strong> E-Bikes in{" "}
                <strong>Größe M</strong> — Abholung nach Terminvereinbarung.
                Reservierung per Telefon, WhatsApp oder E-Mail.
              </p>
            </header>
            <div className="ebike-showcase__grid">
              {rentalEBikes.map((bike) => (
                <article key={bike.title} className="ebike-card">
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
                    <a className="ebike-card__cta" href="#kontakt">
                      Miete anfragen →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="leistungen" className="section section--surface">
          <div className="container">
            <header className="section__head">
              <h2>Fahrradwerkstatt-Leistungen</h2>
              <p>
                Von der <strong>Fahrrad Reparatur</strong> bis zum{" "}
                <strong>E-Bike Service</strong> — wir arbeiten präzise und
                erklären, was Ihr Bike wirklich braucht.
              </p>
            </header>
            <ul className="cards">
              {services.map((s) => (
                <li key={s.title} className="card">
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

        <section id="verleih" className="section">
          <div className="container split">
            <figure className="split__figure split__figure--lift">
              <div className="media-frame">
                <img
                  src="/images/verleih.jpg"
                  alt="Fahrrad in der Stadt — Fahrradverleih und flexible Mobilität"
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>
            <div className="split__content">
              <h2>Fahrradverleih — flexibel mobil</h2>
              <p className="split__lead">
                <strong>Fahrrad mieten</strong> für Gäste, Events oder den
                schnellen Ersatz, wenn Ihr eigenes Rad in der{" "}
                <strong>Fahrradwerkstatt</strong> ist. Reservierung und Details
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
                  <a className="btn btn--secondary" href="#kontakt">
                    Jetzt anfragen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="verkauf" className="section section--surface">
          <div className="container split split--reverse">
            <figure className="split__figure split__figure--lift">
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
              <h2>Fahrradverkauf — passend beraten</h2>
              <p className="split__lead">
                Ausgewählte Modelle und Gebrauchräder mit Check aus der
                Werkstatt. Beim <strong>Fahrrad kaufen</strong> zählen
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
                  <a className="btn btn--primary" href="#kontakt">
                    Kontakt aufnehmen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className="section section--contact">
          <div className="container">
            <header className="section__head section__head--tight">
              <h2>Kontakt</h2>
              <p>
                Rufen Sie uns an oder schreiben Sie uns — wir vereinbaren einen
                Termin, und erledigen Werkstatt, Verleih oder Beratung nach
                Absprache.
              </p>
            </header>
            <div className="contact-grid">
              <address className="contact-card">
                <h3>Werkstatt &amp; Adresse</h3>
                <p>
                  <strong>Fixbike</strong>
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
                <h3>Termin nach Vereinbarung</h3>
                <p>
                  Wir arbeiten <strong>nach vorheriger Absprache</strong>: Sie
                  rufen uns an oder schreiben uns (Telefon, WhatsApp oder
                  E-Mail), wir <strong>vereinbaren einen Termin</strong>, und zu
                  diesem Zeitpunkt kümmern wir uns um Ihr Anliegen — ob Reparatur,
                  Service, Verleih oder Beratung.
                </p>
                <p className="muted small">
                  Es gibt keine festen Ladenöffnungszeiten; so bleiben wir
                  flexibel und können uns Zeit für Sie nehmen.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container footer__grid">
            <div>
              <p className="footer__brand">Fixbike</p>
              <p className="footer__tagline">
                Fahrradwerkstatt · E-Bike Reparatur · Fahrradverleih ·
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

          <div id="impressum" className="legal container">
            <h2>Impressum</h2>
            <p className="muted small">
              <strong>Hinweis:</strong> Diese Angaben sind Platzhalter und müssen
              durch die vollständigen, rechtskonformen Impressumsdaten Ihres
              Betriebs ersetzt werden (§ 5 TMG / DDG).
            </p>
            <p>
              <strong>Fixbike</strong>
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

          <div id="datenschutz" className="legal container">
            <h2>Datenschutz</h2>
            <p className="muted small">
              <strong>Hinweis:</strong> Erstellen Sie eine vollständige
              Datenschutzerklärung (DSGVO) passend zu Formularen, Cookies,
              Analytics und Zahlungsanbietern — idealerweise mit
              Rechtsberatung.
            </p>
            <p>
              Verantwortliche Stelle: Fixbike, Adem Osmani, Wagenhallenweg 8,
              56566 Neuwied, Deutschland — Kontakt:{" "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. Diese
              Website kann technisch notwendige Daten verarbeiten (z. B.
              Server-Logs beim Hosting-Anbieter).
            </p>
          </div>

          <div className="footer__bottom container">
            <p>© {new Date().getFullYear()} Fixbike · fixbike.online</p>
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
    </>
  );
}

export default App;
