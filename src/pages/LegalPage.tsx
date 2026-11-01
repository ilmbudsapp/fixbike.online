import { CONTACT } from "../fixbikeConstants";
import { impressum, privacyPolicy } from "../legal/legalContent";

function LegalBlock({
  title,
  subtitle,
  sections,
}: {
  title: string;
  subtitle?: string;
  sections: { id: string; title: string; paragraphs: string[] }[];
}) {
  return (
    <div className="legal container container--wide">
      <h1>{title}</h1>
      {subtitle ? <p className="muted small legal__subtitle">{subtitle}</p> : null}
      <div className="legal__sections">
        {sections.map((section) => (
          <section key={section.id} className="legal__section">
            <h2>{section.title}</h2>
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

export function ImpressumPage() {
  return (
    <section className="section">
      <LegalBlock
        title={impressum.title}
        subtitle={impressum.subtitle}
        sections={impressum.sections}
      />
      <div className="legal container container--wide">
        <section className="legal__section">
          <h2>AGB (Allgemeine Geschäftsbedingungen)</h2>
          <p className="legal__paragraph">
            Diese AGB gelten für alle Aufträge zwischen FixBike und dem Kunden.
            Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer,
            sofern USt ausgewiesen wird (Kleinunternehmerregelung siehe unten).
            Gewährleistungsansprüche richten sich nach den gesetzlichen
            Bestimmungen. Änderungen und Ergänzungen bedürfen der Schriftform.
          </p>
        </section>
        <section className="legal__section">
          <h2>Widerrufsbelehrung</h2>
          <p className="legal__paragraph">
            Verbrauchern steht ein 14-tägiges Widerrufsrecht zu. Der Widerruf ist
            zu richten an: FixBike, {CONTACT.street}, {CONTACT.zipCity},{" "}
            {CONTACT.email}. Bei bereits begonnener Dienstleistung mit
            ausdrücklicher Zustimmung des Verbrauchers erlischt das Widerrufsrecht
            nach vollständiger Erbringung der Leistung.
          </p>
        </section>
        <section className="legal__section">
          <h2>Kleinunternehmerregelung (§ 19 UStG)</h2>
          <p className="legal__paragraph">
            Gemäß § 19 UStG wird keine Umsatzsteuer berechnet. Es wird daher keine
            Umsatzsteuer ausgewiesen.
          </p>
        </section>
      </div>
    </section>
  );
}

export function DatenschutzPage() {
  return (
    <section className="section">
      <LegalBlock
        title={privacyPolicy.title}
        subtitle={`${privacyPolicy.subtitle} · Stand: ${privacyPolicy.lastUpdated}`}
        sections={privacyPolicy.sections}
      />
    </section>
  );
}
