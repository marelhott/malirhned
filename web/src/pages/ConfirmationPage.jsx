import { Link, useSearchParams } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { WorkflowProgress } from '../components/WorkflowProgress'
import { getBookingSummary, parseBookingSearch } from '../lib/booking'

export function ConfirmationPage() {
  const [searchParams] = useSearchParams()
  const bookingState = parseBookingSearch(searchParams)
  const summary = getBookingSummary(bookingState)

  return (
    <AppShell>
      <main className="booking-page">
        <section className="booking-shell booking-shell--narrow">
          <WorkflowProgress currentStep={4} />

          <section className="booking-confirmation">
            <span>Hotovo</span>
            <h1>Termín je předaný</h1>
            <p>Malíř dostal vaše zadání a ozve se vám napřímo. Není potřeba nic dál obvolávat.</p>

            <div className="booking-confirmation-grid">
              <article>
                <span>Termín</span>
                <strong>{summary.dateLabel}</strong>
                <small>{summary.slotLabel}</small>
              </article>
              <article>
                <span>Malíř</span>
                <strong>{summary.painter?.name ?? 'Dostupný malíř'}</strong>
                <small>{summary.painter?.response ?? 'Reakce během chvíle'}</small>
              </article>
              <article>
                <span>Orientační cena</span>
                <strong>{summary.priceLabel}</strong>
                <small>Potvrzení podle detailu zakázky</small>
              </article>
            </div>

            <div className="booking-confirmation-actions">
              <Link className="primary-button" to="/kalkulacka">
                Zadat další termín
              </Link>
              <Link className="ghost-button" to="/o-nas">
                Jak služba funguje
              </Link>
            </div>
          </section>
        </section>
      </main>
    </AppShell>
  )
}
