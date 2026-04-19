import { useState, type ReactNode } from "react";
import { CONTACT } from "./fixbikeConstants";

export default function SiteFooter() {
  const [openLegalItem, setOpenLegalItem] = useState<string | null>(null);

  const legalItems: { id: string; title: string; content: ReactNode }[] = [
    {
      id: "agb",
      title: "AGB (Allgemeine Geschaftsbedingungen)",
      content: (
        <p>
          Diese AGB gelten fur alle Auftrage zwischen FixBike und dem Kunden.
          Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.
          Gewahrleistungsanspruche richten sich nach den gesetzlichen
          Bestimmungen. Anderungen und Erganzungen bedurfen der Schriftform.
        </p>
      ),
    },
    {
      id: "widerruf",
      title: "Widerrufsbelehrung",
      content: (
        <p>
          Verbrauchern steht ein 14-tagiges Widerrufsrecht zu. Der Widerruf ist
          zu richten an: FixBike, [Adresse]. Bei bereits begonnener
          Dienstleistung mit ausdrucklicher Zustimmung des Verbrauchers erlischt
          das Widerrufsrecht nach vollstandiger Erbringung der Leistung.
        </p>
      ),
    },
    {
      id: "kleinunternehmer",
      title: "Kleinunternehmerregelung (§19 UStG)",
      content: (
        <p>
          Gemas § 19 UStG wird keine Umsatzsteuer berechnet. Es wird daher keine
          Umsatzsteuer ausgewiesen.
        </p>
      ),
    },
    {
      id: "faq",
      title: "FAQ (Haufig gestellte Fragen)",
      content: (
        <>
          <p>
            <strong>F:</strong> Wie lange dauert eine Reparatur?
            <br />
            <strong>A:</strong> Einfache Reparaturen werden meist am gleichen Tag
            erledigt. Aufwendigere Arbeiten konnen 1-3 Werktage in Anspruch
            nehmen.
          </p>
          <p>
            <strong>F:</strong> Muss ich einen Termin vereinbaren?
            <br />
            <strong>A:</strong> Fur großere Reparaturen empfehlen wir eine
            vorherige Kontaktaufnahme per E-Mail:{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
          <p>
            <strong>F:</strong> Welche Zahlungsmethoden werden akzeptiert?
            <br />
            <strong>A:</strong> Wir akzeptieren Barzahlung, Uberweisung per IBAN
            sowie Zahlung per PayPal, Visa und Mastercard.
          </p>
        </>
      ),
    },
  ];

  return (
    <footer className="footer">
      <div className="container container--wide footer__grid">
        <div>
          <p className="footer__brand">FixBike</p>
          <p className="footer__tagline">
            Fahrradverleih Neuwied · Fahrrad-Servis · E-Bike Service · Verkauf
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

      <div className="legal-extra container container--wide" id="rechtliches">
        <h2 className="legal-extra__heading">Rechtliches</h2>
        <div className="legal-accordion" role="region" aria-label="Rechtliches">
          {legalItems.map((item) => {
            const isOpen = openLegalItem === item.id;
            return (
              <section className="legal-accordion__item" key={item.id}>
                <button
                  type="button"
                  className="legal-accordion__trigger"
                  aria-expanded={isOpen}
                  aria-controls={`legal-panel-${item.id}`}
                  onClick={() =>
                    setOpenLegalItem((prev) => (prev === item.id ? null : item.id))
                  }
                >
                  <span>{item.title}</span>
                  <span className="legal-accordion__icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  id={`legal-panel-${item.id}`}
                  className={`legal-accordion__panel ${isOpen ? "is-open" : ""}`}
                >
                  <div className="legal-accordion__panel-inner">{item.content}</div>
                </div>
              </section>
            );
          })}
        </div>

        <div className="payment-icons" aria-label="Zahlungsarten">
          <p className="payment-icons__label">Zahlungsarten:</p>
          <div className="payment-icons__row">
            <span className="payment-icons__pill" aria-label="Visa">
              <img
                src="https://cdn.simpleicons.org/visa"
                alt="Visa"
                loading="lazy"
              />
            </span>
            <span className="payment-icons__pill" aria-label="Mastercard">
              <img
                src="https://cdn.simpleicons.org/mastercard"
                alt="Mastercard"
                loading="lazy"
              />
            </span>
            <span className="payment-icons__pill" aria-label="PayPal">
              <img
                src="https://cdn.simpleicons.org/paypal"
                alt="PayPal"
                loading="lazy"
              />
            </span>
            <span className="payment-icons__pill payment-icons__pill--text">
              SEPA Lastschrift
            </span>
          </div>
        </div>
      </div>

      <div className="footer__bottom container container--wide">
        <div className="footer__bottom-row">
          <p>© {new Date().getFullYear()} FixBike · fixbike.online</p>
          <p className="footer__designer-credit">
            Web Design{" "}
            <a
              href="https://agrmultimedia.eu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              AGRMULTIMEDIA
            </a>{" "}
            Agron Osmani
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
  );
}
