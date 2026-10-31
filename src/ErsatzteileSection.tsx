import PartsPhoto from "./PartsPhoto";
import {
  EBKE_INQUIRY_CATEGORIES,
  HOME_PARTS_CATEGORIES,
  PARTS_CATEGORIES,
  PARTS_INTRO,
  type PartsCategory,
} from "./partsCatalog";

type Variant = "home" | "page";

function CategoryCard({ item }: { item: PartsCategory }) {
  return (
    <article className="parts-card">
      <div className="parts-card__media">
        <PartsPhoto
          srcBase={item.imageBase}
          alt={item.alt}
          objectPosition={item.objectPosition}
          loading="lazy"
          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 540px"
        />
      </div>
      <div className="parts-card__copy">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <a
          className="btn btn--primary parts-card__cta"
          href={item.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.ctaLabel}{" "}
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </article>
  );
}

function PartsHelp() {
  return (
    <aside className="parts-help reveal" aria-labelledby="parts-help-heading">
      <h2 id="parts-help-heading">So finden wir das passende Teil:</h2>
      <ol>
        <li>Fahrradmarke und Modell nennen.</li>
        <li>Benötigtes Teil beschreiben.</li>
        <li>Foto und vorhandene Typen- oder Größenangaben senden.</li>
      </ol>
      <p className="parts-help__note">
        Wir klären Ausführung und Verfügbarkeit persönlich. Eine sofortige
        Bestellung oder Reservierung ist online nicht möglich.
      </p>
    </aside>
  );
}

export default function ErsatzteileSection({ variant }: { variant: Variant }) {
  const isPage = variant === "page";
  const categories = isPage ? PARTS_CATEGORIES : HOME_PARTS_CATEGORIES;
  const HeadingTag = isPage ? "h1" : "h2";

  return (
    <section
      id="ersatzteile"
      className={`section section--parts ${isPage ? "section--parts-page" : ""}`}
      aria-labelledby="ersatzteile-heading"
    >
      <div className="container">
        <header className="section__head parts-head reveal">
          <p className="eyebrow">Ersatzteile</p>
          <HeadingTag id="ersatzteile-heading" className="mask-title">
            <span className="mask-title__clip">
              <span className="mask-title__inner">Das passende Teil.</span>
            </span>
            <span className="mask-title__clip">
              <span className="mask-title__inner">Für dein Fahrrad.</span>
            </span>
          </HeadingTag>
          <p>
            Für klassische Fahrräder und E-Bikes: Frag dein benötigtes Teil bei
            uns an. Wir klären Ausführung, Kompatibilität und Verfügbarkeit
            persönlich.
          </p>
        </header>
      </div>

      <div className="parts-stage media-reveal">
        <PartsPhoto
          srcBase={PARTS_INTRO.imageBase}
          alt={PARTS_INTRO.alt}
          objectPosition={PARTS_INTRO.objectPosition}
          loading={isPage ? "eager" : "lazy"}
          fetchPriority={isPage ? "high" : "auto"}
          sizes="100vw"
          className="parts-stage__img"
        />
        <div className="parts-stage__copy">
          <h2 className="mask-title">
            <span className="mask-title__clip">
              <span className="mask-title__inner">{PARTS_INTRO.titleLines[0]}</span>
            </span>
            <span className="mask-title__clip">
              <span className="mask-title__inner">{PARTS_INTRO.titleLines[1]}</span>
            </span>
          </h2>
          <p>{PARTS_INTRO.description}</p>
          <a
            className="btn btn--primary"
            href={PARTS_INTRO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            {PARTS_INTRO.ctaLabel}{" "}
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>

      <div className="container">
        <p className="parts-disclaimer">
          Illustrative Darstellungen. Ausführung und Verfügbarkeit auf Anfrage.
        </p>

        <div className="parts-grid stagger">
          {categories.map((item) => (
            <CategoryCard key={item.id} item={item} />
          ))}
        </div>

        {isPage ? null : (
          <p className="parts-more reveal">
            <a href="/ersatzteile">
              Weitere Kategorien und Fragen zu E-Bike-Komponenten
              <span className="btn__arrow" aria-hidden="true">
                {" "}
                →
              </span>
            </a>
            <span className="parts-more__sub">
              <a href="/ersatzteile">Alle Teilekategorien ansehen</a>
            </span>
          </p>
        )}

        <PartsHelp />

        {isPage ? (
          <div className="parts-ebike">
            <header className="section__head reveal">
              <p className="eyebrow">E-Bike</p>
              <h2 id="ebike-system-heading" className="mask-title">
                <span className="mask-title__clip">
                  <span className="mask-title__inner">Fragen zu deinem E-Bike-System?</span>
                </span>
              </h2>
              <p>
                Akkus, Ladegeräte, Motoren und Displays sind bei uns noch kein
                bestätigtes Verkaufs- oder Reparaturangebot. Beschreib dein
                System — wir prüfen, ob wir weiterhelfen können.
              </p>
            </header>
            <div className="parts-grid stagger">
              {EBKE_INQUIRY_CATEGORIES.map((item) => (
                <CategoryCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
