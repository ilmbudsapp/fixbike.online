import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import { BUSINESS } from "./siteData";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "";

type Bike = { title: string; size: string };
type Status = "idle" | "loading" | "success" | "error";

type BookingContextValue = {
  openBookingModal: (bike: Bike) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [bookingStatus, setBookingStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!pickupDate) {
      setReturnDate("");
      return;
    }
    const start = new Date(`${pickupDate}T12:00:00`);
    start.setDate(start.getDate() + BUSINESS.rental.packageDays);
    const yyyy = start.getFullYear();
    const mm = String(start.getMonth() + 1).padStart(2, "0");
    const dd = String(start.getDate()).padStart(2, "0");
    setReturnDate(`${yyyy}-${mm}-${dd}`);
  }, [pickupDate]);

  const closeBookingModal = () => {
    setSelectedBike(null);
    setBookingStatus("idle");
  };

  useEffect(() => {
    if (!selectedBike) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeBookingModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selectedBike]);

  const openBookingModal = (bike: Bike) => {
    setSelectedBike(bike);
    setBookingStatus("idle");
    setBookingName("");
    setBookingEmail("");
    setBookingPhone("");
    setPickupDate("");
    setReturnDate("");
  };

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedBike || bookingStatus === "loading") return;
    setBookingStatus("loading");
    try {
      if (!WEB3FORMS_ACCESS_KEY) {
        throw new Error("Missing Web3Forms configuration");
      }
      const messageBody = [
        `Fahrrad: ${selectedBike.title}`,
        `Größe: ${selectedBike.size}`,
        "",
        `Name: ${bookingName}`,
        `E-Mail: ${bookingEmail}`,
        `Telefon/WhatsApp: ${bookingPhone}`,
        `Abholung: ${pickupDate}`,
        `Rückgabe (+${BUSINESS.rental.packageDays} Tage): ${returnDate}`,
        "",
        `Preis: Vermietung für eine Woche zum Preis von ${BUSINESS.rental.packagePrice},00 € (${BUSINESS.rental.equivalentPerDay},00 € pro Tag).`,
      ].join("\n");
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Mietanfrage: ${selectedBike.title} (${selectedBike.size})`,
          name: bookingName,
          email: bookingEmail,
          message: messageBody,
        }),
      });
      const data = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || data.success !== true) {
        throw new Error(data.message ?? "Request failed");
      }
      setBookingStatus("success");
      setBookingName("");
      setBookingEmail("");
      setBookingPhone("");
      setPickupDate("");
      setReturnDate("");
    } catch {
      setBookingStatus("error");
    }
  };

  const value = useMemo(() => ({ openBookingModal }), []);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {selectedBike ? (
        <div
          className="booking-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <div className="booking-modal__backdrop" onClick={closeBookingModal} />
          <div className="booking-modal__panel">
            <button
              type="button"
              className="booking-modal__close"
              onClick={closeBookingModal}
              aria-label="Modal schließen"
            >
              ×
            </button>
            <h3 id="booking-modal-title">Mietanfrage — {selectedBike.title}</h3>
            <p className="booking-modal__meta">{selectedBike.size}</p>
            {bookingStatus === "success" ? (
              <p className="booking-modal__success">
                Danke. Wir melden uns per E-Mail oder Telefon.
              </p>
            ) : null}
            {bookingStatus === "error" ? (
              <p className="booking-modal__error">
                Senden fehlgeschlagen. Bitte erneut versuchen.
              </p>
            ) : null}
            <form className="booking-form" onSubmit={handleBookingSubmit}>
              <label>
                Name
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                />
              </label>
              <label>
                E-Mail
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={bookingEmail}
                  onChange={(e) => setBookingEmail(e.target.value)}
                />
              </label>
              <label>
                Telefon / WhatsApp
                <input
                  type="tel"
                  required
                  autoComplete="tel"
                  value={bookingPhone}
                  onChange={(e) => setBookingPhone(e.target.value)}
                />
              </label>
              <label>
                Abholdatum
                <input
                  type="date"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </label>
              <label>
                Rückgabedatum ({BUSINESS.rental.packageDays} Tage)
                <input type="date" value={returnDate} readOnly />
              </label>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={bookingStatus === "loading"}
              >
                {bookingStatus === "loading" ? "Wird gesendet..." : "Anfrage senden"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </BookingContext.Provider>
  );
}
