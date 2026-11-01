import ContactBlock from "../sections/ContactBlock";
import { CONTACT } from "../fixbikeConstants";
import { ADDRESS_LINE, hoursShort } from "../siteData";

export default function KontaktPage() {
  return (
    <>
      <section className="section" aria-labelledby="kontakt-heading">
        <div className="container">
          <header className="section__head reveal">
            <p className="eyebrow">Kontakt</p>
            <h1 id="kontakt-heading" className="mask-title">
              <span className="mask-title__clip">
                <span className="mask-title__inner">Kontakt &amp; Anfahrt in Koblenz</span>
              </span>
            </h1>
            <p>
              FixBike finden Sie in {ADDRESS_LINE}. {hoursShort}.{" "}
              {CONTACT.hoursNote}. Kleine Reparaturen und Teilewechsel nur nach
              Termin — keine offene Werkstatt ohne Absprache.
            </p>
          </header>
        </div>
      </section>
      <ContactBlock heading="h2" />
      <section
        id="kleine-reparaturen"
        className="note reveal"
        aria-labelledby="kleine-reparaturen-heading"
      >
        <div className="container container--narrow">
          <h2 id="kleine-reparaturen-heading">Kleine Reparaturen</h2>
          <p>
            Nach Termin: kleine Reparaturen an Fahrrad und E-Bike sowie
            Teilewechsel am Rad. Größere Arbeiten bieten wir nicht an.
          </p>
        </div>
      </section>
    </>
  );
}
