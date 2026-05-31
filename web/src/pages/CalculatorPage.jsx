import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { WorkflowProgress } from '../components/WorkflowProgress'
import {
  bookingOptions,
  calculatePriceRange,
  createSearchFromBooking,
  formatPriceRange,
  parseBookingSearch,
} from '../lib/booking'

function ToggleButton({ active, label, onClick }) {
  return (
    <button className={`booking-toggle ${active ? 'is-active' : ''}`} type="button" onClick={onClick}>
      {label}
    </button>
  )
}

export function CalculatorPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState(() => parseBookingSearch(searchParams))
  const priceRange = useMemo(() => calculatePriceRange(formData), [formData])

  function setField(key, value) {
    setFormData((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    navigate(`/kalendar?${createSearchFromBooking(formData)}`)
  }

  return (
    <AppShell>
      <main className="booking-page">
        <section className="booking-shell">
          <WorkflowProgress currentStep={1} />

          <header className="booking-page-head">
            <span>Krok 1</span>
            <h1>Rychlá kalkulačka ceny</h1>
            <p>Zadání držíme co nejkratší. Cena je orientační a hned naváže na dostupné termíny.</p>
          </header>

          <section className="booking-layout">
            <form className="booking-surface" onSubmit={handleSubmit}>
              <div className="booking-section">
                <div className="booking-card-head">
                  <span>Zadání zakázky</span>
                  <h2>Co se bude malovat</h2>
                </div>

                <div className="booking-field-grid">
                  <label>
                    <span>Lokalita</span>
                    <input
                      name="location"
                      value={formData.location}
                      onChange={(event) => setField('location', event.target.value)}
                    />
                  </label>

                  <label>
                    <span>Typ prostoru</span>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={(event) => setField('propertyType', event.target.value)}
                    >
                      {bookingOptions.propertyTypes.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Velikost / dispozice</span>
                    <select name="size" value={formData.size} onChange={(event) => setField('size', event.target.value)}>
                      {bookingOptions.sizes.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>

                  {formData.size === 'Vlastní metry' ? (
                    <label>
                      <span>Vlastní metry</span>
                      <input
                        type="number"
                        min="0"
                        value={formData.customArea}
                        onChange={(event) => setField('customArea', event.target.value)}
                        placeholder="Např. 78"
                      />
                    </label>
                  ) : null}

                  <label>
                    <span>Typ práce</span>
                    <select
                      name="workType"
                      value={formData.workType}
                      onChange={(event) => setField('workType', event.target.value)}
                    >
                      {bookingOptions.workTypes.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div className="booking-section">
                <div className="booking-card-head">
                  <span>Upřesnění</span>
                  <h2>Co má být v ceně</h2>
                </div>

                <div className="booking-toggle-grid">
                  <div>
                    <strong>Expresní termín</strong>
                    <div>
                      {bookingOptions.yesNo.map((option) => (
                        <ToggleButton
                          key={option}
                          active={formData.express === option}
                          label={option}
                          onClick={() => setField('express', option)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <strong>Stropy</strong>
                    <div>
                      {bookingOptions.yesNo.map((option) => (
                        <ToggleButton
                          key={option}
                          active={formData.ceiling === option}
                          label={option}
                          onClick={() => setField('ceiling', option)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <strong>Zakrytí</strong>
                    <div>
                      {bookingOptions.yesNo.map((option) => (
                        <ToggleButton
                          key={option}
                          active={formData.covering === option}
                          label={option}
                          onClick={() => setField('covering', option)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <strong>Opravy stěn</strong>
                    <div>
                      {bookingOptions.repairLevels.map((option) => (
                        <ToggleButton
                          key={option}
                          active={formData.repairs === option}
                          label={option}
                          onClick={() => setField('repairs', option)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <strong>Barvy</strong>
                    <div>
                      {bookingOptions.colorModes.map((option) => (
                        <ToggleButton
                          key={option}
                          active={formData.colors === option}
                          label={option}
                          onClick={() => setField('colors', option)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <strong>Stav stěn</strong>
                    <div>
                      {bookingOptions.wallStates.map((option) => (
                        <ToggleButton
                          key={option}
                          active={formData.wallState === option}
                          label={option}
                          onClick={() => setField('wallState', option)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <footer className="booking-form-footer">
                <button className="primary-button" type="submit">
                  Zobrazit nejbližší termíny
                </button>
              </footer>
            </form>

            <aside className="booking-summary">
              <div className="booking-summary-card booking-summary-card--accent">
                <span>Orientační cena</span>
                <strong>{formatPriceRange(priceRange)}</strong>
                <p>Finální cena se může změnit podle stavu stěn, rozsahu oprav a fotek z místa.</p>
              </div>

              <div className="booking-summary-card">
                <span>V ceně počítáme</span>
                <ul className="booking-summary-list">
                  <li>základní rozsah malby podle dispozice nebo metrů</li>
                  <li>zapracované zvolené příplatky a stav stěn</li>
                  <li>návaznost na nejbližší vhodné termíny</li>
                </ul>
              </div>

              <div className="booking-summary-card">
                <span>Další krok</span>
                <p>Po výpočtu rovnou uvidíte kalendář dostupnosti a vyberete si nejbližší vhodný den.</p>
              </div>
            </aside>
          </section>
        </section>
      </main>
    </AppShell>
  )
}
