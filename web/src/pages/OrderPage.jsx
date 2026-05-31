import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { WorkflowProgress } from '../components/WorkflowProgress'
import { createSearchFromBooking, getBookingSummary, parseBookingSearch } from '../lib/booking'

export function OrderPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState(() => parseBookingSearch(searchParams))
  const summary = getBookingSummary(formData)

  function setField(key, value) {
    setFormData((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    navigate(`/potvrzeni?${createSearchFromBooking(formData)}`)
  }

  return (
    <AppShell>
      <main className="booking-page">
        <section className="booking-shell">
          <WorkflowProgress currentStep={4} />

          <header className="booking-page-head">
            <span>Krok 4</span>
            <h1>Dokončení objednávky</h1>
            <p>Termín, cena i dostupný malíř už jsou připravené. Teď doplníte poslední údaje.</p>
          </header>

          <div className="booking-summary-strip">
            <article>
              <span>Termín</span>
              <strong>{summary.dateLabel}</strong>
            </article>
            <article>
              <span>Slot</span>
              <strong>{summary.slotLabel}</strong>
            </article>
            <article>
              <span>Malíř</span>
              <strong>{summary.painter?.name ?? 'Dostupný malíř'}</strong>
            </article>
            <article>
              <span>Orientační cena</span>
              <strong>{summary.priceLabel}</strong>
            </article>
          </div>

          <section className="booking-layout">
            <form className="booking-surface" onSubmit={handleSubmit}>
              <div className="booking-section">
                <div className="booking-card-head">
                  <span>Kontaktní údaje</span>
                  <h2>Kdo objednávku dokončuje</h2>
                </div>

                <div className="booking-field-grid">
                  <label>
                    <span>Jméno</span>
                    <input value={formData.name} onChange={(event) => setField('name', event.target.value)} placeholder="Vaše jméno" />
                  </label>

                  <label>
                    <span>Telefon</span>
                    <input value={formData.phone} onChange={(event) => setField('phone', event.target.value)} placeholder="+420..." />
                  </label>

                  <label>
                    <span>E-mail</span>
                    <input value={formData.email} onChange={(event) => setField('email', event.target.value)} placeholder="vas@email.cz" />
                  </label>

                  <label>
                    <span>Přesná adresa</span>
                    <input value={formData.address} onChange={(event) => setField('address', event.target.value)} placeholder="Ulice, číslo, město" />
                  </label>
                </div>
              </div>

              <div className="booking-section">
                <div className="booking-card-head">
                  <span>Poznámka pro malíře</span>
                  <h2>Co je dobré vědět před příjezdem</h2>
                </div>

                <label className="booking-field-full">
                  <span>Poznámka</span>
                  <textarea
                    value={formData.notes}
                    onChange={(event) => setField('notes', event.target.value)}
                    placeholder="Např. byt je po nájemníkovi, klíče vyzvednete u správce, preferuji dopoledne..."
                  />
                </label>
              </div>

              <footer className="booking-form-footer">
                <button className="primary-button" type="submit">
                  Potvrdit termín a odeslat zadání
                </button>
              </footer>
            </form>

            <aside className="booking-summary">
              <div className="booking-summary-card booking-summary-card--accent">
                <span>Hotová objednávka</span>
                <strong>{summary.dateLabel}</strong>
                <p>
                  {summary.painter?.name ?? 'Dostupný malíř'} se po odeslání ozve napřímo na váš
                  telefon.
                </p>
              </div>

              <div className="booking-summary-card">
                <span>Souhrn zakázky</span>
                <ul className="booking-summary-list">
                  <li>{formData.location}</li>
                  <li>{formData.propertyType}</li>
                  <li>{summary.areaLabel}</li>
                  <li>{formData.workType}</li>
                </ul>
              </div>

              <div className="booking-summary-card">
                <span>Orientační cena</span>
                <strong>{summary.priceLabel}</strong>
                <p>Finální potvrzení se může upravit podle fotek, rozsahu oprav a přístupu do bytu.</p>
              </div>
            </aside>
          </section>
        </section>
      </main>
    </AppShell>
  )
}
