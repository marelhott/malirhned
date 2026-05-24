import { Link, useParams } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { getPainterById } from '../lib/data'

export function PainterDetailPage() {
  const { painterId } = useParams()
  const painter = getPainterById(painterId)

  return (
    <AppShell>
      <section className="page-section painter-profile-page">
        <Link className="back-link" to="/maliri">
          Zpět na přehled malířů
        </Link>

        <article className="painter-detail-card painter-detail-card--page">
          <div className="painter-detail-cover" />
          <div className="painter-detail-header">
            <div className="painter-detail-avatar-wrap">
              <img className="painter-detail-avatar-image" src={painter.image} alt={painter.name} />
            </div>

            <div className="painter-detail-title">
              <div>
                <h3>{painter.name}</h3>
              </div>
              <p>{painter.role}</p>
            </div>

            <Link className="ghost-button" to={`/objednat?painter=${painter.id}`}>
              Zadat poptávku
            </Link>
          </div>

          <div className="painter-profile-summary">
            <p>{painter.about}</p>
          </div>

          <div className="painter-detail-grid">
            <div className="detail-stat">
              <span>Nejbližší dostupnost</span>
              <strong>{painter.availabilityLabel}</strong>
            </div>
            <div className="detail-stat">
              <span>Běžný rozsah ceny</span>
              <strong>{painter.priceRangeCompact}</strong>
            </div>
            <div className="detail-stat">
              <span>Reakce</span>
              <strong>{painter.response}</strong>
            </div>
            <div className="detail-stat">
              <span>Hotových zakázek</span>
              <strong>{painter.jobs}</strong>
            </div>
          </div>

          <div className="painter-detail-columns">
            <section className="detail-card">
              <h4>Jaké zakázky bere rád</h4>
              <p>{painter.fit}</p>
            </section>

            <section className="detail-card">
              <h4>Styl komunikace</h4>
              <p>{painter.communication}</p>
            </section>

            <section className="detail-card">
              <h4>Kde působí</h4>
              <div className="tag-row">
                {painter.areas.map((area) => (
                  <span key={area} className="detail-tag">
                    {area}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <section className="detail-card detail-card--photos">
            <h4>Ukázky realizací</h4>
            <div className="photo-strip">
              {painter.portfolio.map((photo, index) => (
                <div className="detail-photo" key={photo}>
                  <img className="detail-photo-image" src={photo} alt={`${painter.name} realizace ${index + 1}`} />
                </div>
              ))}
            </div>
          </section>

          <section className="detail-card detail-card--summary">
            <h4>Specializace</h4>
            <div className="tag-row">
              {painter.specialties.map((specialty) => (
                <span key={specialty} className="detail-tag">
                  {specialty}
                </span>
              ))}
            </div>
          </section>

          <section className="painter-profile-cta">
            <h2>Chcete s {painter.name.split(' ')[0]}em pracovat?</h2>
            <p>
              Zadejte stručnou poptávku a {painter.name.split(' ')[0]} se vám ozve přímo.
            </p>
            <Link className="primary-button" to={`/objednat?painter=${painter.id}`}>
              Zadat poptávku
            </Link>
          </section>
        </article>
      </section>
    </AppShell>
  )
}
