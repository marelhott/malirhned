import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { AppShell } from '../components/AppShell'
import { calendarDays, dayNames, getRecommendedPaintersForDay, painterMap } from '../lib/data'

function getDayLabel(day) {
  return `${day}. dubna`
}

function getDayStateLabel(day) {
  if (!day.jobs.length) return 'volno'
  return `${day.jobs.length}x`
}

function getJobClass(type) {
  switch (type) {
    case 'available':
      return 'is-available'
    case 'high':
      return 'is-high'
    default:
      return 'is-soft'
  }
}

function getTimelineLabel(type) {
  switch (type) {
    case 'available':
      return 'Volnější start'
    case 'high':
      return 'Silnější vytížení'
    default:
      return 'Odpolední blok'
  }
}

export function CalendarPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [selectedDay, setSelectedDay] = useState(Number(searchParams.get('day')) || 10)
  const [isDayModalOpen, setIsDayModalOpen] = useState(false)

  const selectedCalendarDay = useMemo(
    () => calendarDays.find((day) => day.day === selectedDay && !day.muted) ?? calendarDays[9],
    [selectedDay],
  )

  const recommendedPaintersForDay = useMemo(
    () => getRecommendedPaintersForDay(selectedCalendarDay.day),
    [selectedCalendarDay.day],
  )

  function openDayDetail(dayNumber) {
    setSelectedDay(dayNumber)
    setIsDayModalOpen(true)
  }

  function closeDayDetail() {
    setIsDayModalOpen(false)
  }

  return (
    <AppShell>
      <main className="calendar-page-main">
        <section className="calendar-page-shell">
          <header className="calendar-page-header">
            <Link className="calendar-page-back" to="/">
              <span aria-hidden="true">←</span>
              Zpět na úvod
            </Link>

            <div className="calendar-page-badge-wrap">
              <span className="calendar-page-badge">Kalendář dostupnosti</span>
            </div>

            <h1>Vyberte termín podle skutečné kapacity</h1>
            <p>
              Samostatný kalendář dává nejrychlejší odpověď na otázku, kdy se může malovat
              a kdo v tom dni ještě stíhá vzít zakázku.
            </p>
          </header>

          <div className="calendar-page-layout">
            <aside className="calendar-page-sidebar">
              <label className="calendar-search">
                <span aria-hidden="true">⌕</span>
                <input type="text" placeholder="Hledat lokalitu nebo malíře" />
              </label>

              <section className="calendar-sidebar-group">
                <span className="calendar-sidebar-kicker">Přehled</span>
                <div className="calendar-sidebar-links">
                  <button className="is-active" type="button">
                    Duben 2026
                  </button>
                  <button type="button">Do 48 hodin</button>
                  <button type="button">Po nájemníkovi</button>
                </div>
              </section>

              <section className="calendar-sidebar-card">
                <span>Vybraný den</span>
                <h2>{getDayLabel(selectedCalendarDay.day)}</h2>
                <p>
                  {selectedCalendarDay.jobs.length
                    ? `${selectedCalendarDay.jobs.length} malíři mají v tomto dni nějakou kapacitu.`
                    : 'Tento den je zatím bez potvrzené kapacity.'}
                </p>

                <div className="calendar-sidebar-slots">
                  {selectedCalendarDay.jobs.map((job) => (
                    <div key={`${job.painter}-${job.time}`}>
                      <span>{job.painter}</span>
                      <strong>{job.time}</strong>
                    </div>
                  ))}
                </div>

                <Link className="calendar-sidebar-cta" to={`/objednat?date=${selectedCalendarDay.day}.%20dubna`}>
                  Pokračovat s tímto dnem
                </Link>
              </section>
            </aside>

            <section className="calendar-page-content">
              <div className="calendar-board-toolbar">
                <div>
                  <span>Duben 2026</span>
                  <h2>Kalendář dostupnosti malířů</h2>
                </div>

                <div className="calendar-board-actions">
                  <button type="button">Dnes</button>
                  <button className="is-active" type="button">
                    Měsíční pohled
                  </button>
                </div>
              </div>

              <div className="calendar-weekdays">
                {dayNames.map((dayName) => (
                  <span key={dayName}>{dayName}</span>
                ))}
              </div>

              <div className="calendar-board-grid">
                {calendarDays.map((day, index) => (
                  <button
                    key={`${day.day}-${index}`}
                    className={`calendar-day-card ${day.muted ? 'is-muted' : ''} ${
                      selectedDay === day.day && !day.muted ? 'is-selected' : ''
                    }`}
                    type="button"
                    onClick={() => !day.muted && openDayDetail(day.day)}
                    disabled={day.muted}
                  >
                    <div className="calendar-day-card-top">
                      <strong>{day.day}</strong>
                      {!day.muted && <span>{getDayStateLabel(day)}</span>}
                    </div>

                    <div className="calendar-day-card-slots">
                      {day.jobs.slice(0, 3).map((job) => (
                        <div
                          key={`${job.painter}-${job.time}`}
                          className={`calendar-day-chip ${getJobClass(job.type)}`}
                        >
                          <span>{job.painter}</span>
                          <small>{job.time}</small>
                        </div>
                      ))}
                    </div>

                    {!day.muted && <em>Rozkliknout den</em>}
                  </button>
                ))}
              </div>

              <div className="calendar-recommendations">
                <div className="calendar-recommendations-top">
                  <div>
                    <span>Pro vybraný den</span>
                    <h3>Doporučení malíři</h3>
                  </div>
                  <Link to="/maliri">Otevřít celý adresář</Link>
                </div>

                <div className="calendar-recommendations-grid">
                  {recommendedPaintersForDay.map((painter) => (
                    <button
                      key={painter.id}
                      className="calendar-recommendation-card"
                      type="button"
                      onClick={() => navigate(`/malir/${painter.id}`)}
                    >
                      <div className="calendar-recommendation-head">
                        <div>{painter.avatar}</div>
                        <section>
                          <strong>{painter.name}</strong>
                          <span>{painter.role}</span>
                        </section>
                      </div>

                      <div className="calendar-recommendation-meta">
                        <strong>{painter.price}</strong>
                        <span>{painter.response}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>

      {isDayModalOpen && (
        <div className="calendar-modal-overlay" role="presentation" onClick={closeDayDetail}>
          <section
            className="calendar-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendar-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="calendar-modal-head">
              <div>
                <span>Detail dne</span>
                <h2 id="calendar-modal-title">{getDayLabel(selectedCalendarDay.day)}</h2>
              </div>

              <button aria-label="Zavřít detail dne" type="button" onClick={closeDayDetail}>
                ×
              </button>
            </header>

            <div className="calendar-modal-body">
              <p>
                Níže vidíte podrobný rozpis kapacity vybraného dne. Vyberte si čas a malíře,
                který vám vyhovuje.
              </p>

              <div className="calendar-modal-timeline">
                {selectedCalendarDay.jobs.map((job) => {
                  const painter = painterMap[job.painter]

                  return (
                    <article key={`${job.painter}-${job.time}`} className="calendar-modal-event">
                      <i className={`calendar-modal-dot ${getJobClass(job.type)}`} />

                      <div className="calendar-modal-event-top">
                        <strong>{job.time}</strong>
                        <span className={getJobClass(job.type)}>{getTimelineLabel(job.type)}</span>
                      </div>

                      <button
                        className="calendar-modal-event-card"
                        type="button"
                        onClick={() => navigate(`/malir/${painter?.id ?? ''}`)}
                      >
                        <div>
                          <h3>{job.painter}</h3>
                          <span>{painter?.priceRangeCompact ?? painter?.price ?? 'Cena po zadání'}</span>
                        </div>
                        <p>{painter?.role ?? 'Malíř pokojů'}</p>
                      </button>
                    </article>
                  )
                })}
              </div>
            </div>

            <footer className="calendar-modal-footer">
              <Link className="calendar-modal-cta" to={`/objednat?date=${selectedCalendarDay.day}.%20dubna`}>
                Vybrat tento den
              </Link>
            </footer>
          </section>
        </div>
      )}
    </AppShell>
  )
}
