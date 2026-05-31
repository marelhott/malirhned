import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { createSearchFromBooking, bookingDefaults, bookingOptions, getAvailablePaintersPreview } from '../lib/booking'

const valuePoints = [
  {
    title: 'Spočítaná cena hned',
    text: 'Bez čekání na první telefon nebo obecný formulář.',
  },
  {
    title: 'Nejbližší reálné termíny',
    text: 'Uvidíte, kdy se dá opravdu začít a jaká je kapacita.',
  },
  {
    title: 'Ověřený malíř napřímo',
    text: 'Termín drží konkrétní člověk, který se vám ozve přímo.',
  },
]

const workflowSteps = [
  {
    step: '1',
    title: 'Spočítat cenu',
    text: 'Základní zadání stačí k orientačnímu rozsahu.',
  },
  {
    step: '2',
    title: 'Najít termín',
    text: 'Kalendář ukáže nejbližší volné možnosti a vytíženost dní.',
  },
  {
    step: '3',
    title: 'Dokončit objednávku',
    text: 'Potvrdíte malíře, termín a odešlete hotové zadání.',
  },
]

export function HomePage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    location: bookingDefaults.location,
    propertyType: bookingDefaults.propertyType,
    size: bookingDefaults.size,
    workType: bookingDefaults.workType,
  })

  const paintersPreview = getAvailablePaintersPreview()

  function handleFieldChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    navigate(`/kalkulacka?${createSearchFromBooking(formData)}`)
  }

  return (
    <AppShell>
      <main className="booking-home">
        <section className="booking-home-hero">
          <div className="booking-home-copy">
            <div className="landing-eyebrow booking-home-eyebrow">
              <span className="landing-eyebrow-dot" />
              Praha a Středočeský kraj
            </div>

            <h1>Malíř, když ho potřebujete hned.</h1>
            <p>
              Spočítejte orientační cenu, vyberte nejbližší termín a dostupný malíř se vám ozve
              napřímo.
            </p>

            <div className="booking-home-points">
              {valuePoints.map((point) => (
                <article key={point.title}>
                  <strong>{point.title}</strong>
                  <span>{point.text}</span>
                </article>
              ))}
            </div>
          </div>

          <form className="booking-home-form" onSubmit={handleSubmit}>
            <div className="booking-card-head">
              <span>Start objednávky</span>
              <h2>Spočítejte cenu a přejděte rovnou na termíny</h2>
            </div>

            <div className="booking-home-grid">
              <label>
                <span>Lokalita</span>
                <input name="location" value={formData.location} onChange={handleFieldChange} />
              </label>

              <label>
                <span>Typ prostoru</span>
                <select name="propertyType" value={formData.propertyType} onChange={handleFieldChange}>
                  {bookingOptions.propertyTypes.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label>
                <span>Velikost / dispozice</span>
                <select name="size" value={formData.size} onChange={handleFieldChange}>
                  {bookingOptions.sizes.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label>
                <span>Typ práce</span>
                <select name="workType" value={formData.workType} onChange={handleFieldChange}>
                  {bookingOptions.workTypes.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <button className="primary-button booking-submit" type="submit">
              Spočítat cenu a zobrazit termíny
            </button>

            <a className="ghost-button booking-secondary-link" href="#jak-to-funguje">
              Jak to funguje
            </a>
          </form>
        </section>

        <section className="booking-home-band" id="jak-to-funguje">
          <div className="booking-band-head">
            <span>Jak to funguje</span>
            <h2>Jednoduchý tok bez obvolávání a bez slepých mezikroků.</h2>
          </div>

          <div className="booking-step-grid">
            {workflowSteps.map((item) => (
              <article className="booking-step-card" key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="booking-home-band booking-home-band--trust">
          <div className="booking-band-head">
            <span>Dostupní ověření malíři</span>
            <h2>Za termínem stojí konkrétní člověk, ne anonymní formulář.</h2>
          </div>

          <div className="booking-trust-grid">
            {paintersPreview.map((painter) => (
              <article className="booking-trust-card" key={painter.id}>
                <img src={painter.image} alt={painter.name} />
                <div>
                  <strong>{painter.name}</strong>
                  <span>{painter.role}</span>
                  <p>{painter.shortDescription}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  )
}
