import { Link, NavLink } from 'react-router-dom'
import { companyProfile } from '../lib/data'

export function MarkIcon() {
  return (
    <div className="mark-icon" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}

export function DecisionIcon({ type }) {
  if (type === 'person') {
    return (
      <div className="decision-icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="17" r="7" />
          <path d="M11 37c2.8-6 8-9 13-9s10.2 3 13 9" />
        </svg>
      </div>
    )
  }

  return (
    <div className="decision-icon" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="9" y="11" width="30" height="26" rx="7" />
        <path d="M16 9v8" />
        <path d="M32 9v8" />
        <path d="M9 19h30" />
        <path d="M17 25h6" />
        <path d="M27 25h4" />
      </svg>
    </div>
  )
}

export function WorkspaceIcon({ type }) {
  const icons = {
    calendar: (
      <>
        <rect x="8" y="10" width="32" height="28" rx="8" />
        <path d="M15 8v8" />
        <path d="M33 8v8" />
        <path d="M8 19h32" />
      </>
    ),
    painters: (
      <>
        <circle cx="24" cy="16" r="6" />
        <path d="M11 36c2.5-6.2 7.8-9 13-9 5.2 0 10.5 2.8 13 9" />
      </>
    ),
    search: (
      <>
        <circle cx="21" cy="21" r="8" />
        <path d="M27 27l8 8" />
      </>
    ),
  }

  return (
    <svg className="workspace-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {icons[type]}
    </svg>
  )
}

export function AppShell({ children }) {
  return (
    <div className="page-shell">
      <div className="site-frame">
        <header className="topbar">
          <Link className="brand" to="/" aria-label="Malíř Hned">
            <MarkIcon />
            <span>Malíř Hned</span>
          </Link>

          <nav className="nav-links" aria-label="Hlavní navigace">
            <NavLink to="/">Úvod</NavLink>
            <NavLink to="/kalkulacka">Cena</NavLink>
            <NavLink to="/kalendar">Kalendář</NavLink>
            <NavLink to="/objednat">Objednávka</NavLink>
            <NavLink to="/o-nas">O nás</NavLink>
          </nav>

          <div className="topbar-actions">
            <NavLink className="ghost-button" to="/kalendar">
              Nejbližší termíny
            </NavLink>
          </div>
        </header>

        <main className="app-main">{children}</main>

        <footer className="site-footer">
          <div className="site-footer-inner">
            <div className="site-footer-main">
              <div className="site-footer-brand">
                <Link className="brand brand--footer" to="/" aria-label="Malíř Hned">
                  <MarkIcon />
                  <span>Malíř Hned</span>
                </Link>
                <p>
                  Platforma vznikla z reálné malířské praxe. Staví ji lidé, kteří mají za sebou
                  více než deset let zakázek v bytech, kancelářích a menších domech po Praze a okolí.
                </p>
              </div>

              <div className="site-footer-column">
                <h4 className="site-footer-label">Služby</h4>
                <nav aria-label="Footer navigace">
                  <NavLink to="/kalkulacka">Spočítat cenu</NavLink>
                  <NavLink to="/kalendar">Volné termíny</NavLink>
                  <NavLink to="/objednat">Dokončit objednávku</NavLink>
                </nav>
              </div>

              <div className="site-footer-column">
                <h4 className="site-footer-label">Společnost</h4>
                <nav aria-label="Footer společnost">
                  <NavLink to="/">Jak to funguje</NavLink>
                  <NavLink to="/o-nas">O nás</NavLink>
                  <a href={`tel:${companyProfile.phone.replace(/\s+/g, '')}`}>{companyProfile.phone}</a>
                  <a href={`mailto:${companyProfile.email}`}>{companyProfile.email}</a>
                </nav>
              </div>

              <div className="site-footer-column">
                <h4 className="site-footer-label">Kontakt</h4>
                <nav aria-label="Footer kontakt">
                  <span className="footer-text-row">{companyProfile.address}</span>
                  <span className="footer-text-row">IČO: {companyProfile.ico}</span>
                  <NavLink to="/kalkulacka">Rychlá kalkulačka</NavLink>
                  <NavLink to="/kalendar">Dostupné termíny</NavLink>
                </nav>
              </div>
            </div>

            <div className="site-footer-bottom">
              <span className="site-footer-copy">© 2026 Malíř Hned s.r.o.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export function PageIntro({ backHref, backLabel, eyebrow, title, text, actions }) {
  return (
    <section className="page-section page-intro">
      {backHref && (
        <Link className="back-link" to={backHref}>
          {backLabel}
        </Link>
      )}

      <div className="page-intro-row">
        <div className="page-intro-copy">
          {eyebrow && <span className="eyebrow eyebrow--page">{eyebrow}</span>}
          <h1 className="page-title">{title}</h1>
          {text && <p className="page-copy">{text}</p>}
        </div>

        {actions ? <div className="page-intro-actions">{actions}</div> : null}
      </div>
    </section>
  )
}
