import { Link } from "react-router";

import { CONTACT } from "../fixbikeConstants";
import ErsatzteileSection from "../ErsatzteileSection";
import ScenePhoto from "../ScenePhoto";
import ContactBlock from "../sections/ContactBlock";
import FaqList from "../sections/FaqList";
import RentalFleet from "../sections/RentalFleet";
import { BUSINESS } from "../siteData";

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <figure className="hero__stage">
          <ScenePhoto
            srcBase="/images/hero/fixbike-hero-2-cube"
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
              <span className="mask-title__inner">Dein nächster Weg. </span>
            </span>
            <span className="mask-title__clip">
              <span className="mask-title__inner">Wird eine </span>
            </span>
            <span className="mask-title__clip">
              <span className="mask-title__inner">gute Fahrt. </span>
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
            {BUSINESS.rental.priceLabel} · {BUSINESS.rental.equivalentLabel}
          </p>
          <div className="hero__actions">
            <Link className="btn btn--primary btn--lg" to="/verleih">
              E-Bike auswählen <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
            <Link className="btn btn--ghost btn--lg" to="/verkauf">
              Kaufberatung anfragen
            </Link>
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
            <p>
              <Link to="/verleih">Zur Verleih-Seite mit Preisen, Größen und Anfrage</Link>
            </p>
          </header>
          <RentalFleet />
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
            srcBase="/images/hero/fixbike-hero-1-cube"
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
          <Link className="btn btn--primary" to="/verkauf">
            Zur Verkaufsseite <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
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
          <FaqList />
        </div>
      </section>

      <ContactBlock heading="h2" />

      <section
        id="kleine-reparaturen"
        className="note reveal"
        aria-labelledby="kleine-reparaturen-heading"
      >
        <span id="servis" className="visually-hidden" />
        <span id="werkstatt" className="visually-hidden" />
        <div className="container container--narrow">
          <h2 id="kleine-reparaturen-heading">Kleine Reparaturen</h2>
          <p>
            Nach Termin: kleine Reparaturen an Fahrrad und E-Bike sowie
            Teilewechsel am Rad. Größere Arbeiten bieten wir nicht an. Anfragen
            unter {CONTACT.phoneDisplay} oder über die{" "}
            <Link to="/kontakt">Kontaktseite</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
