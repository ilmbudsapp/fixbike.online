import { ConsentGate } from "../CookieConsent";
import { CONTACT, MAPS_EMBED_URL, MAPS_URL } from "../fixbikeConstants";
import { hoursShort } from "../siteData";

export default function ContactBlock({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const Heading = heading;
  return (
    <section
      id="contact"
      className="section section--contact"
      aria-labelledby="contact-heading"
    >
      <div className="container contact">
        <header className="section__head reveal">
          <p className="eyebrow">Kontakt</p>
          <Heading id="contact-heading" className="mask-title">
            <span className="mask-title__clip">
              <span className="mask-title__inner">Adresse &amp; Termin</span>
            </span>
          </Heading>
          <p>
            {hoursShort}. {CONTACT.hoursNote}
          </p>
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
  );
}
