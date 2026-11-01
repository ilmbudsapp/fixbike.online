import { rentalEBikes } from "../fixbikeConstants";
import { webpToJpg } from "../imagePaths";
import { useBooking } from "../BookingContext";
import WebpPicture from "../WebpPicture";
import { BUSINESS } from "../siteData";

export default function RentalFleet() {
  const { openBookingModal } = useBooking();
  const price = `${BUSINESS.rental.priceLabel} · ${BUSINESS.rental.equivalentLabel}`;

  return (
    <div className="bike-grid stagger">
      {rentalEBikes.map((bike) => (
        <article key={`${bike.title}-${bike.size}`} className="bike-card">
          <div className="bike-card__media">
            <WebpPicture
              webpSrc={bike.image}
              fallbackSrc={webpToJpg(bike.image)}
              alt={bike.imageAlt}
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 799px) 100vw, 360px"
            />
          </div>
          <div className="bike-card__body">
            <h3>{bike.title}</h3>
            <p className="bike-card__size">{bike.size}</p>
            <p>{bike.countNote}</p>
            <dl className="bike-card__specs">
              {bike.specs.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="bike-card__price">{price}</p>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => openBookingModal({ title: bike.title, size: bike.size })}
            >
              Verfügbarkeit anfragen <span className="btn__arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
