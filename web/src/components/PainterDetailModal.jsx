import { getPainterHighlights } from '../lib/booking'

export function PainterDetailModal({
  isOpen,
  painter,
  priceLabel,
  selectedDate,
  selectedTime,
  onClose,
  onConfirm,
}) {
  if (!isOpen || !painter) return null

  const highlights = getPainterHighlights(painter)

  return (
    <div className="painter-modal-overlay" role="presentation" onClick={onClose}>
      <section
        className="painter-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="painter-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="painter-modal-head">
          <div>
            <span>Detail dostupného malíře</span>
            <h2 id="painter-modal-title">{painter.name}</h2>
            <p>{painter.role}</p>
          </div>

          <button aria-label="Zavřít detail malíře" type="button" onClick={onClose}>
            ×
          </button>
        </header>

        <div className="painter-modal-body">
          <div className="painter-modal-main">
            <div className="painter-modal-hero">
              <div className="painter-modal-image-wrap">
                <img src={painter.image} alt={painter.name} />
              </div>

              <div className="painter-modal-copy">
                <h3>{painter.summary}</h3>
                <p>{painter.about}</p>
              </div>
            </div>

            <div className="painter-modal-highlights">
              {highlights.map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>

            <div className="painter-modal-columns">
              <section className="painter-modal-card">
                <h4>Dovednosti</h4>
                <div className="tag-row">
                  {painter.specialties.map((specialty) => (
                    <span key={specialty} className="detail-tag">
                      {specialty}
                    </span>
                  ))}
                </div>
              </section>

              <section className="painter-modal-card">
                <h4>Jak komunikuje</h4>
                <p>{painter.communication}</p>
              </section>

              <section className="painter-modal-card">
                <h4>Typické zakázky</h4>
                <p>{painter.fit}</p>
              </section>
            </div>

            <section className="painter-modal-card painter-modal-card--photos">
              <h4>Ukázky realizací</h4>
              <div className="photo-strip">
                {painter.portfolio.map((photo, index) => (
                  <div className="detail-photo" key={photo}>
                    <img className="detail-photo-image" src={photo} alt={`${painter.name} realizace ${index + 1}`} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="painter-modal-aside">
            <div className="painter-modal-summary">
              <span>Vybraný termín</span>
              <strong>{selectedDate}</strong>
              <p>{selectedTime}</p>
            </div>

            <div className="painter-modal-summary">
              <span>Orientační cena</span>
              <strong>{priceLabel}</strong>
              <p>Finální potvrzení se může upravit podle fotek a detailu stěn.</p>
            </div>

            <button className="primary-button painter-modal-cta" type="button" onClick={onConfirm}>
              Potvrdit tohoto malíře a termín
            </button>

            <button className="ghost-button painter-modal-back" type="button" onClick={onClose}>
              Zpět na sloty
            </button>
          </aside>
        </div>
      </section>
    </div>
  )
}
