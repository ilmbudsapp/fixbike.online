import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section className="section">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">404</p>
          <h1>Seite nicht gefunden</h1>
          <p>
            Diese Adresse gibt es bei FixBike nicht. Bitte wählen Sie eine der
            folgenden Seiten.
          </p>
        </header>
        <ul className="footer__links">
          <li>
            <Link to="/">Startseite</Link>
          </li>
          <li>
            <Link to="/verleih">E-Bike-Verleih</Link>
          </li>
          <li>
            <Link to="/verkauf">Verkauf</Link>
          </li>
          <li>
            <Link to="/ersatzteile">Ersatzteile</Link>
          </li>
          <li>
            <Link to="/kontakt">Kontakt</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
