import { Link } from "react-router";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container container--wide footer__grid">
        <div>
          <p className="footer__brand">FixBike</p>
          <p className="footer__tagline">
            Fahrradverleih Koblenz · Verkauf · Ersatzteile —{" "}
            <Link to="/verleih">Verleih</Link> · <Link to="/verkauf">Verkauf</Link> ·{" "}
            <Link to="/ersatzteile">Ersatzteile</Link> ·{" "}
            <Link to="/kontakt">Kontakt</Link>
          </p>
        </div>
        <nav aria-label="Fußnavigation">
          <ul className="footer__links">
            <li>
              <Link to="/impressum">Impressum</Link>
            </li>
            <li>
              <Link to="/datenschutz">Datenschutz</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="legal-extra container container--wide" id="rechtliches">
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
            Zuletzt aktualisiert: November 2026
          </p>
          <p className="footer__designer-credit">
            Web Design{" "}
            <a
              href="https://www.agrmultimedia.com/"
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
