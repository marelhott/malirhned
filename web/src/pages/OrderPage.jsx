import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { getPainterById, initialForm } from '../lib/data'

function getEntryLabel(selectedPainter, selectedDate) {
  if (selectedPainter) return 'Profil malíře'
  if (selectedDate) return 'Kalendář'
  return 'Přímé zadání'
}

export function OrderPage() {
  const [searchParams] = useSearchParams()
  const painterId = searchParams.get('painter')
  const selectedDate = searchParams.get('date')
  const selectedPainter = useMemo(() => (painterId ? getPainterById(painterId) : null), [painterId])

  const [formData, setFormData] = useState({
    ...initialForm,
    date: selectedDate || initialForm.date,
    details: selectedPainter ? `Chci kontaktovat malíře ${selectedPainter.name}.` : initialForm.details,
  })

  function handleFieldChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  return (
    <AppShell>
      <main className="order-page-main">
        <section className="order-page-shell">
          <header className="order-page-header">
            <Link
              className="order-page-back"
              to={selectedPainter ? `/malir/${selectedPainter.id}` : selectedDate ? '/kalendar' : '/'}
            >
              Zpět
            </Link>

            <div className="order-page-badge-wrap">
              <span className="order-page-badge">Zadání zakázky</span>
            </div>

            <h1>Poslední krok před spojením</h1>
            <p>
              Teď už jen krátké zadání. Tohle je samostatná obrazovka, která navazuje buď na
              kalendář, nebo na konkrétní profil malíře.
            </p>
          </header>

          <div className="order-page-layout">
            <aside className="order-page-sidebar">
              <div className="order-context-top">
                <span>Aktuální kontext</span>
                <b>
                  Připraveno k
                  <br />
                  odeslání
                </b>
              </div>

              <div className="order-context-intro">
                <h2>Nová poptávka</h2>
                <p>
                  {selectedPainter
                    ? `Navazujete na profil ${selectedPainter.name}.`
                    : selectedDate
                      ? 'Navazujete na kalendář a vybraný den.'
                      : 'Můžete začít i bez předchozího výběru a systém to dopočítá z formuláře.'}
                </p>
              </div>

              <div className="order-price-card">
                <span>Orientační cena</span>
                <strong>10 500–14 000 Kč</strong>
                <p>Finální cena se může upřesnit po fotkách nebo hovoru.</p>
              </div>

              <div className="order-context-list">
                <div>
                  <span>Lokalita</span>
                  <strong>{formData.location}</strong>
                </div>
                <div>
                  <span>Typ práce</span>
                  <strong>{formData.workType}</strong>
                </div>
                <div>
                  <span>Dispozice</span>
                  <strong>{formData.size}</strong>
                </div>
                <div>
                  <span>Vybraný vstup</span>
                  <strong>{getEntryLabel(selectedPainter, selectedDate)}</strong>
                </div>
              </div>
            </aside>

            <section className="order-form-shell">
              <div className="order-form-top">
                <div>
                  <span>Krátké zadání</span>
                  <h2>Stačí pár údajů a malíř se ozve napřímo</h2>
                </div>

                <div className="order-steps">
                  <span className="is-active">Zakázka</span>
                  <span>Termín</span>
                  <span>Kontakt</span>
                </div>
              </div>

              <div className="order-form-body">
                <div className="order-form-grid">
                  <section className="order-box">
                    <h3>O zakázce</h3>
                    <p>Základní rámec pro první výpočet a přiřazení.</p>

                    <div className="order-fields order-fields--double">
                      <label>
                        <span>Typ prostoru</span>
                        <select name="propertyType" value={formData.propertyType} onChange={handleFieldChange}>
                          <option>Byt</option>
                          <option>Dům</option>
                          <option>Kancelář</option>
                        </select>
                      </label>

                      <label>
                        <span>Dispozice</span>
                        <select name="size" value={formData.size} onChange={handleFieldChange}>
                          <option>1+kk</option>
                          <option>2+kk</option>
                          <option>2+1</option>
                          <option>3+kk</option>
                          <option>3+1</option>
                          <option>4+kk a více</option>
                        </select>
                      </label>

                      <label>
                        <span>Typ práce</span>
                        <select name="workType" value={formData.workType} onChange={handleFieldChange}>
                          <option>Běžná přemalba</option>
                          <option>Po nájemníkovi</option>
                          <option>Novostavba</option>
                          <option>Opravy + malba</option>
                        </select>
                      </label>

                      <label>
                        <span>Lokalita</span>
                        <input name="location" value={formData.location} onChange={handleFieldChange} />
                      </label>
                    </div>
                  </section>

                  <section className="order-box">
                    <h3>Kde a kdy</h3>
                    <p>Tohle pomůže vybrat správný termín nebo člověka.</p>

                    <div className="order-fields order-fields--double">
                      <label>
                        <span>Termín</span>
                        <select name="whenType" value={formData.whenType} onChange={handleFieldChange}>
                          <option>Co nejdřív</option>
                          <option>Mám konkrétní datum</option>
                          <option>Jsem flexibilní</option>
                        </select>
                      </label>

                      <label>
                        <span>Preferovaný den</span>
                        <input name="date" value={formData.date} onChange={handleFieldChange} />
                      </label>

                      <label>
                        <span>Máte fotky?</span>
                        <select name="photos" value={formData.photos} onChange={handleFieldChange}>
                          <option>Ne</option>
                          <option>Ano, pošlu je</option>
                        </select>
                      </label>
                    </div>
                  </section>
                </div>

                <section className="order-box">
                  <h3>Detaily, které pomůžou</h3>
                  <p>Stačí stručně. Cokoliv důležitého pro první domluvu.</p>

                  <div className="order-fields">
                    <label>
                      <span>Co je dobré vědět předem</span>
                      <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleFieldChange}
                        placeholder="Např. byt po nájemníkovi, je potřeba zakrýt kuchyň, preferuji dopoledne..."
                      />
                    </label>
                  </div>
                </section>

                <section className="order-box">
                  <h3>Kontakt</h3>
                  <p>Bez něj to malíř nevezme dál do telefonu.</p>

                  <div className="order-fields order-fields--double">
                    <label>
                      <span>Jméno</span>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleFieldChange}
                        placeholder="Vaše jméno"
                      />
                    </label>

                    <label>
                      <span>Telefon</span>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleFieldChange}
                        placeholder="+420..."
                      />
                    </label>
                  </div>
                </section>
              </div>

              <footer className="order-form-footer">
                <p>
                  Po odeslání dostane malíř vaše zadání a ozve se přímo. Platforma už dál
                  nevstupuje do samotné domluvy.
                </p>

                <button type="button">Odeslat zadání</button>
              </footer>
            </section>
          </div>
        </section>
      </main>
    </AppShell>
  )
}
