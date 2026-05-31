import { CONTACT } from "../fixbikeConstants";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

const OPERATOR = "FixBike Online — Adem Osmani";
const ADDRESS = `${CONTACT.street}, ${CONTACT.zipCity}, Deutschland`;

export const privacyPolicy = {
  title: "Datenschutzerklärung",
  subtitle: "Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO und BDSG",
  lastUpdated: "Mai 2026",
  sections: [
    {
      id: "controller",
      title: "1. Verantwortlicher",
      paragraphs: [
        `${OPERATOR}\n${ADDRESS}\nE-Mail: ${CONTACT.email}\nTelefon: ${CONTACT.phoneDisplay}`,
        "Verantwortlich für die Datenverarbeitung auf fixbike.online im Sinne der DSGVO.",
      ],
    },
    {
      id: "overview",
      title: "2. Allgemeine Hinweise",
      paragraphs: [
        "Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung dieser Website, zur Bearbeitung von Miet- und Kontaktanfragen oder zur Erfüllung gesetzlicher Pflichten erforderlich ist.",
        "Diese Erklärung beschreibt den Stand der auf fixbike.online eingesetzten Technologien (Stand Mai 2026).",
      ],
    },
    {
      id: "hosting",
      title: "3. Hosting",
      paragraphs: [
        "Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf werden technisch erforderliche Verbindungsdaten verarbeitet.",
        "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherer Bereitstellung). Übermittlungen in Drittländer können auf Standardvertragsklauseln des Anbieters gestützt sein.",
      ],
    },
    {
      id: "logs",
      title: "4. Server-Logfiles",
      paragraphs: [
        "Der Hosting-Anbieter kann automatisch Daten erfassen (IP-Adresse, Zeitpunkt, aufgerufene URL, Browser-Typ, Referrer). Diese dienen Stabilität, Sicherheit und Fehleranalyse.",
        "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Eine Zusammenführung mit anderen Daten erfolgt nicht, sofern nicht gesetzlich erforderlich.",
      ],
    },
    {
      id: "contact",
      title: "5. Kontaktformular, Mietanfrage & E-Mail",
      paragraphs: [
        "Wenn Sie uns per E-Mail, WhatsApp-Link oder über das Miet-/Kontaktformular erreichen, verarbeiten wir Ihre Angaben (z. B. Name, E-Mail, Telefon, Nachricht, gewähltes E-Bike) zur Bearbeitung Ihrer Anfrage.",
        "Das Formular nutzt Web3Forms (api.web3forms.com). Ihre Eingaben werden an Web3Forms übermittelt, um die Nachricht an uns weiterzuleiten. Anbieter: Web3Forms. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Kommunikation) bzw. lit. f DSGVO.",
      ],
    },
    {
      id: "storage-local",
      title: "6. Lokale Speicherung (localStorage)",
      paragraphs: [
        "Wir speichern lokal in Ihrem Browser Ihre Cookie-/Einwilligungsentscheidung (fixbike-cookie-consent), damit der Banner nicht bei jedem Besuch erneut erscheint.",
        "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (technisch notwendige Präferenz) bzw. lit. a DSGVO (Einwilligung für externe Medien).",
      ],
    },
    {
      id: "cookies",
      title: "7. Cookies",
      paragraphs: [
        "Wir setzen keine Marketing- oder Analyse-Cookies ein. Google Analytics, Google Tag Manager und Meta Pixel werden auf dieser Website nicht verwendet.",
        "Externe Inhalte (Google Maps-Karte, YouTube-Video) werden erst geladen, wenn Sie im Cookie-Banner „Alle akzeptieren“ wählen. Bis dahin sehen Sie eine Platzhalter-Ansicht mit Link zur externen Seite.",
      ],
    },
    {
      id: "analytics",
      title: "8. Webanalyse / Tracking",
      paragraphs: [
        "Auf fixbike.online ist derzeit kein Google Analytics oder vergleichbares Tracking implementiert. Sollte dies künftig ergänzt werden, erfolgt dies nur nach ausdrücklicher Einwilligung und mit Aktualisierung dieser Erklärung.",
      ],
    },
    {
      id: "fonts",
      title: "9. Schriftarten (lokal gehostet)",
      paragraphs: [
        "Schriftarten (DM Sans, Outfit) werden aus dem eigenen Website-Bundle geladen (.woff2). Es erfolgt keine Verbindung zu fonts.googleapis.com oder fonts.gstatic.com beim Seitenaufruf.",
        "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.",
      ],
    },
    {
      id: "external",
      title: "10. Externe Inhalte & Links",
      paragraphs: [
        "Die Website enthält Links zu WhatsApp (wa.me), Google Maps (Suche/Navigation), agrmultimedia.eu (Webdesign-Credit) und Pexels (Lizenz-Hinweis). Beim Anklicken gelten die Datenschutzhinweise des jeweiligen Anbieters.",
        "Eingebettete Google-Maps-Karten und YouTube-Videos (youtube-nocookie.com) laden nur nach Ihrer Einwilligung über den Cookie-Banner.",
      ],
    },
    {
      id: "ssl",
      title: "11. SSL-/TLS-Verschlüsselung",
      paragraphs: [
        "Diese Website nutzt SSL-/TLS-Verschlüsselung (https://). Eine verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile.",
      ],
    },
    {
      id: "retention",
      title: "12. Speicherdauer",
      paragraphs: [
        "Anfragedaten aus Formularen und E-Mails speichern wir nur so lange, wie für die Bearbeitung, gesetzliche Aufbewahrung oder Rechtsverteidigung erforderlich.",
        "Server-Logdaten werden nach den Richtlinien des Hosting-Anbieters rotiert gelöscht.",
      ],
    },
    {
      id: "rights",
      title: "13. Rechte der betroffenen Personen",
      paragraphs: [
        "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO). Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen.",
        "Beschwerden können Sie bei einer Aufsichtsbehörde einreichen, z. B. beim Landesbeauftragten für den Datenschutz Rheinland-Pfalz.",
      ],
    },
    {
      id: "objection",
      title: "14. Widerspruchsrecht",
      paragraphs: [
        "Verarbeiten wir Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO, können Sie aus Gründen Ihrer besonderen Situation Widerspruch einlegen: " + CONTACT.email,
      ],
    },
    {
      id: "updates",
      title: "15. Aktualität",
      paragraphs: [
        "Wir passen diese Datenschutzerklärung an, wenn sich Rechtslage oder eingesetzte Dienste ändern.",
      ],
    },
  ] satisfies LegalSection[],
};

export const impressum = {
  title: "Impressum",
  subtitle: "Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz) und § 18 Abs. 2 MStV",
  sections: [
    {
      id: "operator",
      title: "Diensteanbieter",
      paragraphs: [
        "FixBike Online",
        "Adem Osmani — Certified E-Bike Specialist",
        CONTACT.street,
        CONTACT.zipCity,
        "Deutschland",
      ],
    },
    {
      id: "contact",
      title: "Kontakt",
      paragraphs: [
        `E-Mail: ${CONTACT.email}`,
        `Telefon: ${CONTACT.phoneDisplay}`,
        `WhatsApp: ${CONTACT.phoneDisplay}`,
      ],
    },
    {
      id: "tax",
      title: "Steuerliche Angaben",
      paragraphs: [
        `Steuernummer: ${CONTACT.steuernummer}`,
        "Kleinunternehmer gemäß § 19 UStG — es wird keine Umsatzsteuer ausgewiesen.",
        "USt-IdNr.: [falls vorhanden, bitte ergänzen]",
      ],
    },
    {
      id: "profession",
      title: "Berufsbezeichnung",
      paragraphs: [
        "Fahrrad- und E-Bike-Service, Verleih und Werkstatt",
        "Verliehen in: Bundesrepublik Deutschland",
      ],
    },
    {
      id: "content",
      title: "Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)",
      paragraphs: ["Adem Osmani, Anschrift wie oben"],
    },
    {
      id: "dispute",
      title: "EU-Streitschlichtung",
      paragraphs: [
        "Plattform der EU-Kommission zur Online-Streitbeilegung: https://ec.europa.eu/consumers/odr/",
        "Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen, sofern nicht gesetzlich zwingend.",
      ],
    },
    {
      id: "liability-content",
      title: "Haftung für Inhalte",
      paragraphs: [
        "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte verantwortlich. Nach §§ 8 bis 10 DDG sind wir nicht verpflichtet, übermittelte fremde Informationen zu überwachen.",
      ],
    },
    {
      id: "liability-links",
      title: "Haftung für Links",
      paragraphs: [
        "Unser Angebot enthält Links zu externen Websites Dritter. Für deren Inhalte ist stets der jeweilige Anbieter verantwortlich.",
      ],
    },
    {
      id: "copyright",
      title: "Urheberrecht",
      paragraphs: [
        "Die durch den Seitenbetreiber erstellten Inhalte unterliegen dem deutschen Urheberrecht. Vervielfältigung bedarf der schriftlichen Zustimmung.",
        "Webdesign: AGR Multimedia (agrmultimedia.eu).",
      ],
    },
  ] satisfies LegalSection[],
};
