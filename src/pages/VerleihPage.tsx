import { rentalEBikes } from "../fixbikeConstants";
import FaqList from "../sections/FaqList";
import RentalFleet from "../sections/RentalFleet";
import { ADDRESS_LINE, BUSINESS } from "../siteData";

export default function VerleihPage() {
  return (
    <>
      <section className="section section--catalog" aria-labelledby="verleih-heading">
        <div className="container">
          <header className="section__head reveal">
            <p className="eyebrow">Verleih</p>
            <h1 id="verleih-heading" className="mask-title">
              <span className="mask-title__clip">
                <span className="mask-title__inner">E-Bike mieten in Koblenz</span>
              </span>
            </h1>
            <p className="aeo-answer">
              FixBike vermietet CUBE E-Bikes in Koblenz, {ADDRESS_LINE}. Das
              aktuelle Angebot ist die Wochenmiete: {BUSINESS.rental.priceLabel}{" "}
              ({BUSINESS.rental.equivalentLabel}). Abholung nach Termin vor Ort.
              Die Verfügbarkeit wird persönlich bestätigt — es gibt keine
              Sofortbuchung.
            </p>
          </header>

          <div className="fleet-table-wrap reveal">
            <table className="fleet-table">
              <caption>Aktuelle Mietflotte</caption>
              <thead>
                <tr>
                  <th scope="col">Modell</th>
                  <th scope="col">Größe</th>
                  <th scope="col">Einsatz</th>
                </tr>
              </thead>
              <tbody>
                {rentalEBikes.map((bike) => (
                  <tr key={`${bike.title}-${bike.size}`}>
                    <th scope="row">{bike.title}</th>
                    <td>{bike.size}</td>
                    <td>{bike.specs.find((s) => s.label === "Einsatz")?.value ?? bike.countNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="fleet-table__price">
              {BUSINESS.rental.priceLabel} · {BUSINESS.rental.equivalentLabel}
            </p>
          </div>

          <RentalFleet />
        </div>
      </section>

      <section className="section section--steps" aria-labelledby="ablauf-heading">
        <div className="container">
          <header className="section__head reveal">
            <p className="eyebrow">Ablauf</p>
            <h2 id="ablauf-heading" className="mask-title">
              <span className="mask-title__clip">
                <span className="mask-title__inner">So funktioniert die Anfrage</span>
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
              <span>Formular am Rad, WhatsApp oder Telefon — wir antworten persönlich.</span>
            </li>
            <li>
              <strong>Termin vereinbaren und abholen.</strong>
              <span>Übergabe in Koblenz nach Bestätigung. Keine Online-Zahlung.</span>
            </li>
          </ol>
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
    </>
  );
}
