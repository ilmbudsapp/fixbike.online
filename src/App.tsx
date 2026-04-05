const nav = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#verleih", label: "Fahrradverleih" },
  { href: "#verkauf", label: "Fahrradverkauf" },
  { href: "#kontakt", label: "Kontakt" },
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
                <a className="btn btn--ghost btn--lg" href="#verleih">
                  Fahrrad mieten
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
                <div className="hero__photo-wrap">
                  <img
                    className="hero__photo"
                    src="/images/hero.jpg"
                    width={900}
                    height={1125}
                    alt="Geparkte Fahrräder in der Stadt — Fixbike Fahrradwerkstatt und Service"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
                <figcaption className="visually-hidden">
                  Symbolfoto: Fahrräder und Mobilität in der Stadt
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
              <h2>Kontakt &amp; Öffnungszeiten</h2>
              <p>
                Adresse, Telefon und finale Zeiten tragen Sie hier ein, sobald
                sie feststehen — Platzhalter unten bitte ersetzen.
              </p>
            </header>
            <div className="contact-grid">
              <address className="contact-card">
                <h3>Werkstatt</h3>
                <p>
                  <strong>Fixbike</strong>
                  <br />
                  Straße Hausnr.
                  <br />
                  PLZ Ort, Deutschland
                </p>
                <p>
                  <a href="tel:+490000000000">Telefon: +49 …</a>
                  <br />
                  <a href="mailto:info@fixbike.online">info@fixbike.online</a>
                </p>
              </address>
              <div className="contact-card">
                <h3>Öffnungszeiten</h3>
                <p className="hours">
                  <span>Mo–Fr</span>
                  <span>09:00–18:00</span>
                  <span>Sa</span>
                  <span>nach Vereinbarung</span>
                </p>
                <p className="muted small">
                  Bitte passen Sie die Zeiten an Ihren echten Betrieb an.
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
              Fixbike
              <br />
              [Name / Rechtsform]
              <br />
              [Anschrift]
              <br />
              [Kontakt: E-Mail, Telefon]
              <br />
              [USt-IdNr. falls vorhanden]
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
              Verantwortliche Stelle: [wie Impressum]. Diese Website kann
              technisch notwendige Daten verarbeiten (z. B. Server-Logs beim
              Hosting-Anbieter).
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
