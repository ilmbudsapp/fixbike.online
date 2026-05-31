import { useEffect, useState, type ReactNode } from "react";
import { consentNeedsPrompt, hasExternalMediaConsent, setConsent, type ConsentChoice } from "./lib/consent";

export function ConsentGate({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) {
  const [allowed, setAllowed] = useState(hasExternalMediaConsent);

  useEffect(() => {
    const sync = () => setAllowed(hasExternalMediaConsent());
    window.addEventListener("fixbike-consent-change", sync);
    return () => window.removeEventListener("fixbike-consent-change", sync);
  }, []);

  return allowed ? children : fallback;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(consentNeedsPrompt());
  }, []);

  function choose(choice: ConsentChoice) {
    setConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="cookie-consent__panel">
        <h2 id="cookie-consent-title" className="cookie-consent__title">
          Cookies &amp; Datenschutz
        </h2>
        <p id="cookie-consent-desc" className="cookie-consent__body">
          Wir verwenden technisch notwendige Speicherung (Cookie-Einstellung). Google Maps und
          YouTube laden wir nur nach Ihrer Einwilligung. Es gibt kein Google Analytics auf dieser
          Website. Details in der{" "}
          <a href="#datenschutz">Datenschutzerklärung</a>.
        </p>
        <div className="cookie-consent__actions">
          <button type="button" className="btn btn--secondary" onClick={() => choose("essential")}>
            Nur notwendige
          </button>
          <button type="button" className="btn btn--primary" onClick={() => choose("all")}>
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
