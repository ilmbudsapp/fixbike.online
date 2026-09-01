import { useState, type ReactNode } from "react";

import { CONTACT } from "./fixbikeConstants";

import { impressum, privacyPolicy } from "./legal/legalContent";



function LegalBlock({

  id,

  title,

  subtitle,

  sections,

}: {

  id: string;

  title: string;

  subtitle?: string;

  sections: { id: string; title: string; paragraphs: string[] }[];

}) {

  return (

    <div id={id} className="legal container container--wide">

      <h2>{title}</h2>

      {subtitle ? <p className="muted small legal__subtitle">{subtitle}</p> : null}

      <div className="legal__sections">

        {sections.map((section) => (

          <section key={section.id} className="legal__section">

            <h3>{section.title}</h3>

            {section.paragraphs.map((p, idx) => (

              <p key={idx} className="legal__paragraph">

                {p.split("\n").map((line, lineIdx, arr) => (

                  <span key={lineIdx}>

                    {line}

                    {lineIdx < arr.length - 1 ? <br /> : null}

                  </span>

                ))}

              </p>

            ))}

          </section>

        ))}

      </div>

    </div>

  );

}



export default function SiteFooter() {

  const [openLegalItem, setOpenLegalItem] = useState<string | null>(null);



  const legalItems: { id: string; title: string; content: ReactNode }[] = [

    {

      id: "agb",

      title: "AGB (Allgemeine Geschäftsbedingungen)",

      content: (

        <p>

          Diese AGB gelten für alle Aufträge zwischen FixBike und dem Kunden.

          Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer,

          sofern USt ausgewiesen wird (Kleinunternehmerregelung siehe unten).

          Gewährleistungsansprüche richten sich nach den gesetzlichen

          Bestimmungen. Änderungen und Ergänzungen bedürfen der Schriftform.

        </p>

      ),

    },

    {

      id: "widerruf",

      title: "Widerrufsbelehrung",

      content: (

        <p>

          Verbrauchern steht ein 14-tägiges Widerrufsrecht zu. Der Widerruf ist

          zu richten an: FixBike, {CONTACT.street}, {CONTACT.zipCity},{" "}

          {CONTACT.email}. Bei bereits begonnener Dienstleistung mit

          ausdrücklicher Zustimmung des Verbrauchers erlischt das Widerrufsrecht

          nach vollständiger Erbringung der Leistung.

        </p>

      ),

    },

    {

      id: "kleinunternehmer",

      title: "Kleinunternehmerregelung (§ 19 UStG)",

      content: (

        <p>

          Gemäß § 19 UStG wird keine Umsatzsteuer berechnet. Es wird daher keine

          Umsatzsteuer ausgewiesen.

        </p>

      ),

    },

    {

      id: "faq",

      title: "FAQ (Häufig gestellte Fragen)",

      content: (

        <>

          <p>

            <strong>F:</strong> Wie lange dauert eine Reparatur?

            <br />

            <strong>A:</strong> Einfache Reparaturen werden meist am gleichen Tag

            erledigt. Aufwendigere Arbeiten können 1–3 Werktage in Anspruch

            nehmen.

          </p>

          <p>

            <strong>F:</strong> Muss ich einen Termin vereinbaren?

            <br />

            <strong>A:</strong> Für größere Reparaturen empfehlen wir eine

            vorherige Kontaktaufnahme per E-Mail:{" "}

            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>

          </p>

          <p>

            <strong>F:</strong> Welche Zahlungsmethoden werden akzeptiert?

            <br />

            <strong>A:</strong> Wir akzeptieren Barzahlung, Überweisung per IBAN

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

            Fahrradverleih Neuwied · Fahrrad-Service · E-Bike Service · Verkauf —{" "}

            <a href="/verleih">Verleih</a> · <a href="/werkstatt">Werkstatt</a> ·{" "}

            <a href="/kontakt">Kontakt</a>

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



      <LegalBlock

        id="impressum"

        title={impressum.title}

        subtitle={impressum.subtitle}

        sections={impressum.sections}

      />



      <LegalBlock

        id="datenschutz"

        title={privacyPolicy.title}

        subtitle={`${privacyPolicy.subtitle} · Stand: ${privacyPolicy.lastUpdated}`}

        sections={privacyPolicy.sections}

      />



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

            <span className="payment-icons__pill payment-icons__pill--text">Visa</span>

            <span className="payment-icons__pill payment-icons__pill--text">Mastercard</span>

            <span className="payment-icons__pill payment-icons__pill--text">PayPal</span>

            <span className="payment-icons__pill payment-icons__pill--text">Bar / IBAN</span>

            <span className="payment-icons__pill payment-icons__pill--text">SEPA Lastschrift</span>

          </div>

        </div>

      </div>



      <div className="footer__bottom container container--wide">

        <div className="footer__bottom-row">

          <p>© {new Date().getFullYear()} FixBike · fixbike.online</p>

          <p className="footer__page-meta" lang="de">

            Zuletzt aktualisiert: Mai 2026

          </p>

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


