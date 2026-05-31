import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { PainterDetailModal } from '../components/PainterDetailModal'
import {
  bookingDefaults,
  bookingOptions,
  calculatePriceRange,
  createOrderPayload,
  createSearchFromBooking,
  formatPriceRange,
  getCalendarState,
  getDayByNumber,
  getDayLabel,
  getDayPriceRange,
  getRecommendedTerms,
  getSlotsForDay,
} from '../lib/booking'

const steps = [
  {
    icon: '01',
    title: 'Zadáte pár údajů',
    text: 'Lokalita, prostor a typ práce.',
  },
  {
    icon: '02',
    title: 'Hned vidíte cenu',
    text: 'Orientační rozsah bez čekání.',
  },
  {
    icon: '03',
    title: 'Vyberete termín',
    text: 'Nejbližší volno i vytíženost dní.',
  },
  {
    icon: '04',
    title: 'Potvrdíte objednávku',
    text: 'Malíř se ozve napřímo.',
  },
]

const legend = [
  { label: 'Volno', tone: 'free' },
  { label: 'Omezeno', tone: 'limited' },
  { label: 'Poslední místo', tone: 'last' },
  { label: 'Plno', tone: 'full' },
  { label: 'Nedostupné', tone: 'off' },
]

export function HomePage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    ...bookingDefaults,
    workType: 'Běžná bílá výmalba',
    repairs: 'Lehké',
    wallState: 'Běžný stav',
  })
  const [selectedDay, setSelectedDay] = useState(10)
  const [selectedSlotId, setSelectedSlotId] = useState('')
  const [isPainterModalOpen, setIsPainterModalOpen] = useState(false)

  const priceRange = useMemo(() => calculatePriceRange(formData), [formData])
  const recommendedTerms = getRecommendedTerms(formData)
  const selectedDayData = getDayByNumber(selectedDay) ?? getDayByNumber(10)
  const selectedDayRange = getDayPriceRange(selectedDayData, formData)
  const slots = getSlotsForDay(selectedDay, formData)
  const selectedSlot = slots.find((slot) => slot.id === selectedSlotId) ?? slots[0] ?? null

  function setField(key, value) {
    setFormData((current) => ({ ...current, [key]: value }))
  }

  function handleMiniSubmit(event) {
    event.preventDefault()
    document.getElementById('cena')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function chooseTerm(day, slotId = '') {
    setSelectedDay(day)
    setSelectedSlotId(slotId)
    document.getElementById('terminy')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function openPainterDetail(slot) {
    setSelectedSlotId(slot.id)
    setIsPainterModalOpen(true)
  }

  function continueToOrder() {
    if (!selectedSlot) return

    const orderPayload = createOrderPayload(formData, selectedSlot, selectedSlot.painter?.id)
    navigate(`/objednat?${createSearchFromBooking(orderPayload)}`)
  }

  return (
    <AppShell>
      <main className="onepage-main">
        <section className="onepage-hero">
          <div className="onepage-hero-copy">
            <div className="landing-eyebrow onepage-eyebrow">
              <span className="landing-eyebrow-dot" />
              Praha a Středočeský kraj
            </div>

            <h1>Malíř, když ho potřebujete hned.</h1>
            <p>Spočítejte cenu, vyberte termín a dostupný malíř se vám ozve napřímo.</p>

            <div className="onepage-flow-strip" aria-label="Průběh objednávky">
              <span>Cena</span>
              <i />
              <span>Termín</span>
              <i />
              <span>Malíř</span>
              <i />
              <span>Objednávka</span>
            </div>

            <div className="onepage-hero-actions">
              <a className="primary-button" href="#cena">
                Spočítat cenu
              </a>
              <a className="ghost-button" href="#jak-to-funguje">
                Jak to funguje
              </a>
            </div>
          </div>

          <form className="onepage-mini-card" onSubmit={handleMiniSubmit}>
            <div className="booking-card-head">
              <span>Rychlý start</span>
              <h2>Základní zadání</h2>
            </div>

            <div className="onepage-mini-grid">
              <label>
                <span>Lokalita</span>
                <input value={formData.location} onChange={(event) => setField('location', event.target.value)} />
              </label>

              <label>
                <span>Typ prostoru</span>
                <select value={formData.propertyType} onChange={(event) => setField('propertyType', event.target.value)}>
                  {bookingOptions.propertyTypes.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label>
                <span>Velikost</span>
                <select value={formData.size} onChange={(event) => setField('size', event.target.value)}>
                  {bookingOptions.sizes.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label>
                <span>Typ práce</span>
                <select value={formData.workType} onChange={(event) => setField('workType', event.target.value)}>
                  {bookingOptions.workTypes.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <button className="primary-button onepage-mini-submit" type="submit">
              Spočítat cenu
            </button>
          </form>
        </section>

        <section className="onepage-steps" id="jak-to-funguje">
          {steps.map((item) => (
            <article className="onepage-step-card" key={item.title}>
              <span>{item.icon}</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className="onepage-workspace" id="cena">
          <div className="onepage-section-head">
            <span>Cena</span>
            <h2>Orientační cena bez zbytečných kroků</h2>
          </div>

          <div className="onepage-calc-layout">
            <section className="onepage-calc-card">
              <div className="onepage-calc-grid">
                <label>
                  <span>Lokalita</span>
                  <input value={formData.location} onChange={(event) => setField('location', event.target.value)} />
                </label>

                <label>
                  <span>Typ prostoru</span>
                  <select value={formData.propertyType} onChange={(event) => setField('propertyType', event.target.value)}>
                    {bookingOptions.propertyTypes.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Velikost / dispozice</span>
                  <select value={formData.size} onChange={(event) => setField('size', event.target.value)}>
                    {bookingOptions.sizes.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Typ práce</span>
                  <select value={formData.workType} onChange={(event) => setField('workType', event.target.value)}>
                    {bookingOptions.workTypes.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>

              <details className="onepage-advanced">
                <summary>Upřesnit zadání</summary>
                <div className="onepage-advanced-grid">
                  <label>
                    <span>Expresní termín</span>
                    <select value={formData.express} onChange={(event) => setField('express', event.target.value)}>
                      {bookingOptions.yesNo.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Stropy</span>
                    <select value={formData.ceiling} onChange={(event) => setField('ceiling', event.target.value)}>
                      {bookingOptions.yesNo.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Opravy stěn</span>
                    <select value={formData.repairs} onChange={(event) => setField('repairs', event.target.value)}>
                      {bookingOptions.repairLevels.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Stav stěn</span>
                    <select value={formData.wallState} onChange={(event) => setField('wallState', event.target.value)}>
                      {bookingOptions.wallStates.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </details>
            </section>

            <aside className="onepage-price-card">
              <span>Orientačně</span>
              <strong>{formatPriceRange(priceRange)}</strong>
              <p>Cena se potvrdí podle rozsahu a stavu stěn.</p>
              <button className="primary-button" type="button" onClick={() => chooseTerm(selectedDay)}>
                Vybrat termín
              </button>
            </aside>
          </div>
        </section>

        <section className="onepage-workspace" id="terminy">
          <div className="onepage-section-head">
            <span>Termín</span>
            <h2>Kdy nejdřív můžeme malovat?</h2>
          </div>

          <div className="onepage-recommend-row">
            {recommendedTerms.map((term) => (
              <button
                key={term.key}
                className={`onepage-recommend-card ${selectedDay === term.day ? 'is-active' : ''}`}
                type="button"
                onClick={() => chooseTerm(term.day)}
              >
                <span>{term.badge}</span>
                <strong>{getDayLabel(term.day)}</strong>
                <small>{term.time}</small>
                <em>{formatPriceRange(term.range)}</em>
              </button>
            ))}
          </div>

          <div className="onepage-calendar-shell">
            <section className="onepage-calendar-card">
              <div className="onepage-calendar-head">
                <div className="onepage-calendar-legend">
                  {legend.map((item) => (
                    <div key={item.label}>
                      <i className={`is-${item.tone}`} />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="onepage-calendar-grid">
                {Array.from({ length: 30 }, (_, index) => {
                  const dayNumber = index + 1
                  const day = getDayByNumber(dayNumber) ?? { day: dayNumber, muted: false, jobs: [] }
                  const state = getCalendarState(day)

                  return (
                    <button
                      key={dayNumber}
                      className={`onepage-day-chip is-${state.tone} ${selectedDay === dayNumber ? 'is-selected' : ''}`}
                      type="button"
                      onClick={() => chooseTerm(dayNumber)}
                    >
                      <strong>{dayNumber}</strong>
                      <span>{state.label}</span>
                    </button>
                  )
                })}
              </div>
            </section>

            <aside className="onepage-day-panel">
              <div className="onepage-day-top">
                <span>{getDayLabel(selectedDayData.day)}</span>
                <strong>{slots.length} dostupné možnosti</strong>
                <p>{formatPriceRange(selectedDayRange)}</p>
              </div>

              <div className="onepage-slot-list">
                {slots.map((slot) => (
                  <article
                    key={slot.id}
                    className={`onepage-slot-card ${selectedSlot?.id === slot.id ? 'is-selected' : ''}`}
                  >
                    <div className="onepage-slot-main">
                      <strong>{slot.time}</strong>
                      <span>vhodné pro {formData.propertyType.toLowerCase()} {formData.size}</span>
                    </div>

                    <div className="onepage-slot-side">
                      <div>
                        <b>{slot.painter.name}</b>
                        <small>{formatPriceRange(slot.priceRange)}</small>
                      </div>
                      <button
                        className="primary-button"
                        type="button"
                        onClick={() => {
                          setSelectedSlotId(slot.id)
                          document.getElementById('malir')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                      >
                        Vybrat termín
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {selectedSlot ? (
          <section className="onepage-workspace onepage-workspace--compact" id="malir">
            <div className="onepage-section-head">
              <span>Malíř</span>
              <h2>Dostupný ověřený malíř</h2>
            </div>

            <div className="onepage-painter-card">
              <div className="onepage-painter-main">
                <img src={selectedSlot.painter.image} alt={selectedSlot.painter.name} />
                <div>
                  <strong>{selectedSlot.painter.name}</strong>
                  <p>{selectedSlot.painter.role}</p>
                  <small>
                    {selectedSlot.painter.experience} / {selectedSlot.painter.jobs} / {selectedSlot.painter.response}
                  </small>
                </div>
              </div>

              <div className="onepage-painter-meta">
                <div>
                  <span>Vybraný termín</span>
                  <strong>
                    {getDayLabel(selectedSlot.day)} / {selectedSlot.time}
                  </strong>
                </div>
                <div>
                  <span>Orientační cena</span>
                  <strong>{formatPriceRange(selectedSlot.priceRange)}</strong>
                </div>
              </div>

              <div className="onepage-painter-actions">
                <button className="ghost-button" type="button" onClick={() => openPainterDetail(selectedSlot)}>
                  Detail malíře
                </button>
                <button className="primary-button" type="button" onClick={continueToOrder}>
                  Potvrdit termín
                </button>
              </div>
            </div>
          </section>
        ) : null}

        <PainterDetailModal
          isOpen={isPainterModalOpen}
          painter={selectedSlot?.painter ?? null}
          priceLabel={selectedSlot ? formatPriceRange(selectedSlot.priceRange) : formatPriceRange(priceRange)}
          selectedDate={selectedSlot ? getDayLabel(selectedSlot.day) : getDayLabel(selectedDay)}
          selectedTime={selectedSlot?.time ?? ''}
          onClose={() => setIsPainterModalOpen(false)}
          onConfirm={continueToOrder}
        />
      </main>
    </AppShell>
  )
}
