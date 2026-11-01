import { Link } from "react-router";

import { CONTACT } from "../fixbikeConstants";
import ScenePhoto from "../ScenePhoto";

export default function VerkaufPage() {
  return (
    <section id="verkauf" className="photo-band photo-band--page">
      <div className="photo-band__media">
        <ScenePhoto
          srcBase="/images/hero/fixbike-hero-1-cube"
          alt=""
          className="photo-band__photo"
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
      </div>
      <div className="photo-band__copy reveal">
        <p className="eyebrow">Verkauf</p>
        <h1 className="mask-title">
          <span className="mask-title__clip">
            <span className="mask-title__inner">Fahrräder und E-Bikes kaufen in Koblenz</span>
          </span>
        </h1>
        <p>
          Ob Alltag oder sportliche Tour: Wir beraten Sie persönlich zum
          passenden Fahrrad oder E-Bike. Verfügbare Modelle und Preise auf
          Anfrage — ohne Online-Shop und ohne Sofortkauf.
        </p>
        <p>
          Termine nach Vereinbarung in Koblenz, {CONTACT.street}. Schreiben Sie
          uns oder rufen Sie an.
        </p>
        <Link className="btn btn--primary" to="/kontakt">
          Kaufberatung anfragen <span className="btn__arrow" aria-hidden="true">→</span>
        </Link>
        <a
          className="btn btn--ghost"
          href={CONTACT.whatsappSales}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <p className="scene-note scene-note--inline">
          Symbolbild. Verfügbare Modelle auf Anfrage.
        </p>
      </div>
    </section>
  );
}
