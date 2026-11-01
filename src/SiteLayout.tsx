import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";

import CookieConsent from "./CookieConsent";
import PageMeta from "./PageMeta";
import SiteFooter from "./SiteFooter";
import { CONTACT, nav } from "./fixbikeConstants";

export default function SiteLayout() {
  const menuId = useId();
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.add("page-loaded");
  }, []);

  useEffect(() => {
    const onScroll = () => {
      document.documentElement.classList.toggle("scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const t = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView();
      }, 50);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealAllIn = (root: ParentNode) => {
      root.querySelectorAll(".reveal, .stagger, .media-reveal, .mask-title").forEach((el) => {
        el.classList.add("is-revealed");
      });
    };

    if (reduced) {
      revealAllIn(document);
      return;
    }

    document.documentElement.classList.add("motion-on");
    const nodes = document.querySelectorAll(".reveal, .stagger, .media-reveal, .mask-title");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    nodes.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        el.classList.add("is-revealed");
      } else {
        obs.observe(el);
      }
    });
    return () => obs.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
      menuToggleRef.current?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <PageMeta />
      <a className="skip-link" href="#main">
        Zum Inhalt springen
      </a>

      <div className="topbar">
        <div className="announce" role="note">
          In Koblenz · Wallersheimer Weg 16
        </div>

        <header className="site-header">
          <div className="container header__inner">
            <Link
              className="brand"
              to="/"
              aria-label="FixBike — E-Bike Verleih und Fahrradverkauf Koblenz. Zur Startseite."
            >
              <img
                className="brand__logo"
                src="/images/fixbike-logo.png"
                alt="FixBike Logo"
                width={160}
                height={85}
                decoding="async"
              />
              <span className="brand__lockup">
                <span className="brand__seo-line">
                  E-Bike &amp; Fahrradverleih Koblenz · Verkauf
                </span>
              </span>
            </Link>

            <nav className="nav nav--header" aria-label="Hauptnavigation">
              <ul className="nav__list">
                {nav.map((item) => (
                  <li key={item.href}>
                    {item.href.startsWith("/#") ? (
                      <a href={item.href}>{item.label}</a>
                    ) : (
                      <NavLink to={item.href}>{item.label}</NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <Link className="btn btn--primary header__cta" to="/verleih">
              E-Bike mieten
            </Link>

            <button
              ref={menuToggleRef}
              type="button"
              className="nav-toggle"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="visually-hidden">{menuOpen ? "Menü schließen" : "Menü öffnen"}</span>
              <span className="nav-toggle__bars" aria-hidden="true" />
            </button>
          </div>

          <div
            id={menuId}
            className={`nav-drawer ${menuOpen ? "is-open" : ""}`}
            aria-hidden={!menuOpen}
          >
            <nav aria-label="Mobilnavigation">
              <ul className="nav-drawer__list">
                {nav.map((item) => (
                  <li key={item.href}>
                    {item.href.startsWith("/#") ? (
                      <a href={item.href} onClick={closeMenu}>
                        {item.label}
                      </a>
                    ) : (
                      <Link to={item.href} onClick={closeMenu}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <Link className="btn btn--primary" to="/verleih" onClick={closeMenu}>
                E-Bike mieten
              </Link>
            </nav>
          </div>
        </header>
      </div>

      <main id="main">
        <Outlet />
        <SiteFooter />
      </main>

      <div className="mobile-dock" aria-label="Schnellkontakt">
        <a href={`tel:${CONTACT.phoneTel}`}>Anrufen</a>
        <Link to="/verleih">E-Bike mieten</Link>
      </div>
      <CookieConsent />
    </>
  );
}
