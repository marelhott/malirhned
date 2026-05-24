import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { painters } from '../lib/data'

export function PaintersPage() {
  return (
    <AppShell>
      <main className="painters-page-main">
        <section className="painters-page-shell">
          <header className="painters-page-header">
            <Link className="painters-page-back" to="/">
              <span aria-hidden="true">←</span>
              Zpět na úvod
            </Link>

            <div className="painters-page-badge-wrap">
              <span className="painters-page-badge">Adresář malířů</span>
            </div>

            <h1>Vyberte si člověka, který vám dává smysl</h1>
            <p>
              Profily jsou oddělené od kalendáře, aby se dalo rozhodovat lidsky: podle obličeje,
              typu zakázek, ceny a prvního reálného volna.
            </p>
          </header>

          <section className="painters-page-toolbar">
            <div className="painters-page-filters">
              <button className="is-active" type="button">
                Všechny speciality
              </button>
              <button type="button">Podle ceny</button>
              <button type="button">Nejdřív volní</button>
            </div>

            <Link className="painters-page-calendar-link" to="/kalendar">
              Raději podle termínu
              <span aria-hidden="true">⌁</span>
            </Link>
          </section>

          <section className="painters-page-grid">
            {painters.map((painter) => (
              <Link key={painter.id} className="painters-page-card" to={`/malir/${painter.id}`}>
                <div className="painters-page-card-media">
                  <img src={painter.image} alt={painter.name} />
                  <div className="painters-page-card-overlay" />
                </div>

                <div className="painters-page-card-body">
                  <h2>{painter.name}</h2>
                  <span>{painter.role}</span>
                  <p>{painter.summary}</p>
                </div>

                <div className="painters-page-card-meta">
                  <div>
                    <span>Cena:</span>
                    <strong>Stejná nabídka pro všechny</strong>
                  </div>
                  <div>
                    <span>První volno:</span>
                    <strong>{painter.availabilityLabel}</strong>
                  </div>
                </div>
              </Link>
            ))}
          </section>

          <section className="painters-page-cta">
            <h2>Nevíte si rady s výběrem?</h2>
            <p>Vyberte raději termín a my vám doporučíme nejvhodnějšího malíře.</p>
            <Link to="/kalendar">Vybrat podle termínu</Link>
          </section>
        </section>
      </main>
    </AppShell>
  )
}
