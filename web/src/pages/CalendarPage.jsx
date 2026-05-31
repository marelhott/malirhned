import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { PainterDetailModal } from '../components/PainterDetailModal'
import { WorkflowProgress } from '../components/WorkflowProgress'
import {
  calendarDays,
  createOrderPayload,
  createSearchFromBooking,
  formatPriceRange,
  getBookingSummary,
  getCalendarState,
  getDayByNumber,
  getDayLabel,
  getDayPriceRange,
  getRecommendedTerms,
  getSlotsForDay,
  parseBookingSearch,
} from '../lib/booking'

const availabilityLegend = [
  { label: 'Volno', tone: 'free' },
  { label: 'Omezená kapacita', tone: 'limited' },
  { label: 'Poslední místo', tone: 'last' },
  { label: 'Plno', tone: 'full' },
  { label: 'Nedostupné', tone: 'off' },
]

export function CalendarPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const bookingState = parseBookingSearch(searchParams)
  const initialDay = Number(searchParams.get('day')) || 10
  const [selectedDay, setSelectedDay] = useState(initialDay)
  const [selectedSlotId, setSelectedSlotId] = useState('')
  const [isPainterModalOpen, setIsPainterModalOpen] = useState(false)

  const summary = getBookingSummary(bookingState)
  const selectedDayData = getDayByNumber(selectedDay) ?? getDayByNumber(10)
  const selectedDayRange = getDayPriceRange(selectedDayData, bookingState)
  const recommendedTerms = getRecommendedTerms(bookingState)
  const slots = getSlotsForDay(selectedDay, bookingState)
  const selectedSlot = slots.find((slot) => slot.id === selectedSlotId) ?? slots[0] ?? null

  function chooseDay(dayNumber) {
    setSelectedDay(dayNumber)
    setSelectedSlotId('')
  }

  function confirmSelectedSlot() {
    if (!selectedSlot) return

    const orderPayload = createOrderPayload(bookingState, selectedSlot, selectedSlot.painter?.id)
    navigate(`/objednat?${createSearchFromBooking(orderPayload)}`)
  }

  return (
    <AppShell>
      <main className="booking-page">
        <section className="booking-shell">
          <WorkflowProgress currentStep={2} />

          <header className="booking-page-head">
            <span>Krok 2</span>
            <h1>Nejbližší dostupné termíny</h1>
            <p>Podle vašeho zadání teď vybíráte den, kdy se dá začít a jaká je kapacita.</p>
          </header>

          <div className="booking-summary-strip">
            <article>
              <span>Cena</span>
              <strong>{summary.priceLabel}</strong>
            </article>
            <article>
              <span>Lokalita</span>
              <strong>{bookingState.location}</strong>
            </article>
            <article>
              <span>Prostor</span>
              <strong>{bookingState.propertyType}</strong>
            </article>
            <article>
              <span>Rozsah</span>
              <strong>{summary.areaLabel}</strong>
            </article>
          </div>

          <section className="booking-section booking-section--stacked">
            <div className="booking-card-head">
              <span>Doporučené termíny</span>
              <h2>Kdy nejdřív a za kolik?</h2>
            </div>

            <div className="booking-recommend-grid">
              {recommendedTerms.map((term) => (
                <button
                  key={term.key}
                  className={`booking-recommend-card ${selectedDay === term.day ? 'is-active' : ''}`}
                  type="button"
                  onClick={() => chooseDay(term.day)}
                >
                  <span>{term.badge}</span>
                  <strong>{getDayLabel(term.day)}</strong>
                  <p>{term.time}</p>
                  <small>{term.caption}</small>
                  <em>{formatPriceRange(term.range)}</em>
                </button>
              ))}
            </div>
          </section>

          <section className="booking-calendar-layout">
            <section className="booking-calendar-panel">
              <div className="booking-card-head">
                <span>Kalendář dostupnosti</span>
                <h2>Vyberte den podle kapacity</h2>
              </div>

              <div className="booking-legend">
                {availabilityLegend.map((item) => (
                  <div key={item.label}>
                    <i className={`is-${item.tone}`} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="booking-calendar-grid">
                {calendarDays.map((day, index) => {
                  const state = getCalendarState(day)
                  const isInteractive = !day.muted

                  return (
                    <button
                      key={`${day.day}-${index}`}
                      className={`booking-day-card is-${state.tone} ${selectedDay === day.day && isInteractive ? 'is-selected' : ''}`}
                      type="button"
                      disabled={!isInteractive}
                      onClick={() => isInteractive && chooseDay(day.day)}
                    >
                      <div>
                        <strong>{day.day}</strong>
                        <span>{state.label}</span>
                      </div>
                      <small>{state.description}</small>
                      <em>{day.jobs.length ? `${day.jobs.length} možnosti` : 'Bez slotu'}</em>
                    </button>
                  )
                })}
              </div>
            </section>

            <aside className="booking-day-detail">
              <div className="booking-day-summary">
                <span>Vybraný den</span>
                <h2>{getDayLabel(selectedDayData.day)}</h2>
                <p>{formatPriceRange(selectedDayRange)}</p>
                <small>
                  {slots.length
                    ? `${slots.length} dostupné sloty pro vaše zadání`
                    : 'Tento den teď nemá vhodný volný slot.'}
                </small>
              </div>

              <div className="booking-slot-list">
                {slots.map((slot) => (
                  <article
                    key={slot.id}
                    className={`booking-slot-card ${selectedSlot?.id === slot.id ? 'is-selected' : ''}`}
                  >
                    <div className="booking-slot-top">
                      <div>
                        <strong>{slot.time}</strong>
                        <span>{slot.state.label}</span>
                      </div>
                      <em>{formatPriceRange(slot.priceRange)}</em>
                    </div>

                    <div className="booking-slot-painter">
                      <img src={slot.painter.image} alt={slot.painter.name} />
                      <div>
                        <h3>{slot.painter.name}</h3>
                        <p>{slot.painter.role}</p>
                      </div>
                    </div>

                    <p>{slot.compactFit}</p>

                    <div className="booking-slot-actions">
                      <button
                        className="ghost-button"
                        type="button"
                        onClick={() => {
                          setSelectedSlotId(slot.id)
                          setIsPainterModalOpen(true)
                        }}
                      >
                        Detail malíře
                      </button>
                      <button
                        className="primary-button"
                        type="button"
                        onClick={() => {
                          setSelectedSlotId(slot.id)
                          setIsPainterModalOpen(false)
                        }}
                      >
                        Pokračovat s tímto termínem
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {selectedSlot ? (
                <section className="booking-painter-preview">
                  <div className="booking-card-head">
                    <span>Dostupný ověřený malíř</span>
                    <h2>{selectedSlot.painter.name}</h2>
                  </div>

                  <div className="booking-painter-preview-head">
                    <img src={selectedSlot.painter.image} alt={selectedSlot.painter.name} />
                    <div>
                      <strong>{selectedSlot.painter.role}</strong>
                      <p>{selectedSlot.painter.response}</p>
                    </div>
                  </div>

                  <div className="booking-painter-tags">
                    {selectedSlot.painter.specialties.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="booking-painter-preview-meta">
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

                  <div className="booking-slot-actions">
                    <button className="ghost-button" type="button" onClick={() => setIsPainterModalOpen(true)}>
                      Detail malíře
                    </button>
                    <button className="primary-button" type="button" onClick={confirmSelectedSlot}>
                      Potvrdit malíře a termín
                    </button>
                  </div>
                </section>
              ) : null}
            </aside>
          </section>
        </section>

        <PainterDetailModal
          isOpen={isPainterModalOpen}
          painter={selectedSlot?.painter ?? null}
          priceLabel={selectedSlot ? formatPriceRange(selectedSlot.priceRange) : summary.priceLabel}
          selectedDate={selectedSlot ? getDayLabel(selectedSlot.day) : summary.dateLabel}
          selectedTime={selectedSlot?.time ?? summary.slotLabel}
          onClose={() => setIsPainterModalOpen(false)}
          onConfirm={confirmSelectedSlot}
        />
      </main>
    </AppShell>
  )
}
