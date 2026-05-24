import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { customerProfileSnapshot } from '../lib/data'

export function CustomerProfilePage() {
  return (
    <AppShell>
      <main className="customer-page-main">
        <section className="customer-page-shell">
          <header className="customer-page-hero">
            <span className="customer-page-badge">Profil zákazníka</span>
            <h1>Jedno místo pro vaše poptávky, termíny i oblíbené malíře.</h1>
            <p>{customerProfileSnapshot.intro}</p>
          </header>

          <section className="customer-page-grid">
            <article className="customer-panel">
              <div className="customer-panel-head">
                <span>Aktuálně</span>
                <h2>Co je právě rozpracované</h2>
              </div>

              <div className="customer-stat-list">
                {customerProfileSnapshot.upcoming.map((item) => (
                  <div key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </article>

            <article className="customer-panel">
              <div className="customer-panel-head">
                <span>Uložené kontakty</span>
                <h2>Oblíbení malíři</h2>
              </div>

              <div className="customer-saved-list">
                {customerProfileSnapshot.savedPainters.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>

              <Link className="customer-panel-link" to="/maliri">
                Otevřít adresář malířů
              </Link>
            </article>
          </section>
        </section>
      </main>
    </AppShell>
  )
}
