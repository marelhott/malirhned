import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'

function calculatePrice(form) {
  const area = Number(form.totalArea) || 0
  if (area <= 0) return 0

  const FLOOR_AREA_RATE = 10000 / 55
  const WALL_AREA_RATE = FLOOR_AREA_RATE / 3.5
  const MIN_PRICE = 3000

  const basePrice = Math.max(
    form.selectedWork === 'Půdorys' ? area * FLOOR_AREA_RATE : area * WALL_AREA_RATE,
    MIN_PRICE,
  )

  let total = basePrice

  if (form.selectedWork === 'Půdorys') {
    if (form.ceilingHeightForPrice === '350') total += basePrice * 0.1
    else if (form.ceilingHeightForPrice === '450') total += basePrice * 0.2
  }

  if (form.repairType === 'Malé') total += basePrice * 0.17
  else if (form.repairType === 'Střední') total += basePrice * 0.35
  else if (form.repairType === 'Velké') total += basePrice * 0.6

  if (form.material === 'Ano') total += basePrice * 0.2
  if (form.furnitureMoving === 'Ano') total += basePrice * 0.12
  if (form.covering === 'Ano') total += basePrice * 0.05
  if (form.cleaning === 'Potřebuji') total += basePrice * 0.1

  return Math.round(total)
}

function ToggleCard({ active, title, details, onClick }) {
  return (
    <button className={`calculator-choice-card ${active ? 'is-active' : ''}`} type="button" onClick={onClick}>
      <strong>{title}</strong>
      {details ? <span>{details}</span> : null}
    </button>
  )
}

function BinaryChoice({ active, label, onClick }) {
  return (
    <button className={`calculator-binary ${active ? 'is-active' : ''}`} type="button" onClick={onClick}>
      <i aria-hidden="true" />
      <span>{label}</span>
    </button>
  )
}

export function CalculatorPage() {
  const [form, setForm] = useState({
    selectedWork: 'Půdorys',
    totalArea: '',
    ceilingHeightForPrice: '250',
    repairType: 'Malé',
    material: 'Ano',
    furnitureMoving: 'Ano',
    covering: 'Ano',
    cleaning: 'Potřebuji',
    emptySpace: 'Ano',
    carpets: 'Ne',
    roomCount: '',
    spaceType: 'Pokoj',
    additionalInfo: '',
  })

  const totalPrice = useMemo(() => calculatePrice(form), [form])

  function setField(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  return (
    <AppShell>
      <main className="calculator-page-main">
        <section className="calculator-page-shell">
          <header className="calculator-page-hero">
            <span className="calculator-page-badge">Kalkulačka</span>
            <h1>Kalkulačka vychází přímo z provozní logiky malířských zakázek.</h1>
            <p>
              Přenesli jsme sem stejnou strukturu výpočtu, jaká se používá v původním nástroji.
              Jen je vizuálně sjednocená s celým webem a bez odesílání poptávky.
            </p>
          </header>

          <section className="calculator-layout">
            <div className="calculator-panel calculator-panel--full">
              <section className="calculator-section">
                <div className="calculator-section-head">
                  <span>Typ plochy</span>
                  <h2>Co chcete počítat</h2>
                </div>

                <div className="calculator-choice-grid calculator-choice-grid--two">
                  <ToggleCard
                    active={form.selectedWork === 'Půdorys'}
                    title="Podlahová plocha"
                    details="rozměr podlahy, např. 5×4 m"
                    onClick={() => setField('selectedWork', 'Půdorys')}
                  />
                  <ToggleCard
                    active={form.selectedWork === 'Stěna'}
                    title="Stěnová plocha"
                    details="součet stěn a stropů"
                    onClick={() => setField('selectedWork', 'Stěna')}
                  />
                </div>

                <label className="calculator-field">
                  <span>Celková plocha v m²</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Např. 55"
                    value={form.totalArea}
                    onChange={(event) => setField('totalArea', event.target.value)}
                  />
                </label>

                {form.selectedWork === 'Půdorys' ? (
                  <div className="calculator-subsection">
                    <span>Výška stropu</span>
                    <div className="calculator-choice-grid calculator-choice-grid--three">
                      <ToggleCard
                        active={form.ceilingHeightForPrice === '250'}
                        title="250 cm"
                        details="standardní výška"
                        onClick={() => setField('ceilingHeightForPrice', '250')}
                      />
                      <ToggleCard
                        active={form.ceilingHeightForPrice === '350'}
                        title="350 cm"
                        details="vyšší prostor"
                        onClick={() => setField('ceilingHeightForPrice', '350')}
                      />
                      <ToggleCard
                        active={form.ceilingHeightForPrice === '450'}
                        title="450 cm"
                        details="velmi vysoký strop"
                        onClick={() => setField('ceilingHeightForPrice', '450')}
                      />
                    </div>
                  </div>
                ) : null}
              </section>

              <section className="calculator-section">
                <div className="calculator-section-head">
                  <span>Typ opravy</span>
                  <h2>Jak moc se budou stěny připravovat</h2>
                </div>

                <div className="calculator-choice-grid calculator-choice-grid--two">
                  <ToggleCard
                    active={form.repairType === 'Malé'}
                    title="Malé opravy"
                    details="dírky a drobné trhliny"
                    onClick={() => setField('repairType', 'Malé')}
                  />
                  <ToggleCard
                    active={form.repairType === 'Střední'}
                    title="Střední opravy"
                    details="větší lokální zásahy"
                    onClick={() => setField('repairType', 'Střední')}
                  />
                  <ToggleCard
                    active={form.repairType === 'Velké'}
                    title="Velké opravy"
                    details="rozsáhlejší příprava"
                    onClick={() => setField('repairType', 'Velké')}
                  />
                  <ToggleCard
                    active={form.repairType === 'Žádné'}
                    title="Bez oprav"
                    details="jen malování"
                    onClick={() => setField('repairType', 'Žádné')}
                  />
                </div>
              </section>

              <section className="calculator-section">
                <div className="calculator-section-head">
                  <span>Služby</span>
                  <h2>Co má být v ceně započítané</h2>
                </div>

                <div className="calculator-binary-grid">
                  <div className="calculator-binary-group">
                    <strong>Barvu zajistí malíř?</strong>
                    <div>
                      <BinaryChoice active={form.material === 'Ano'} label="Ano, zajistí" onClick={() => setField('material', 'Ano')} />
                      <BinaryChoice active={form.material === 'Ne'} label="Ne, vlastní" onClick={() => setField('material', 'Ne')} />
                    </div>
                  </div>

                  <div className="calculator-binary-group">
                    <strong>Posunutí nábytku?</strong>
                    <div>
                      <BinaryChoice active={form.furnitureMoving === 'Ano'} label="Ano" onClick={() => setField('furnitureMoving', 'Ano')} />
                      <BinaryChoice active={form.furnitureMoving === 'Ne'} label="Ne" onClick={() => setField('furnitureMoving', 'Ne')} />
                    </div>
                  </div>

                  <div className="calculator-binary-group">
                    <strong>Zakrývání a oblepování?</strong>
                    <div>
                      <BinaryChoice active={form.covering === 'Ano'} label="Ano" onClick={() => setField('covering', 'Ano')} />
                      <BinaryChoice active={form.covering === 'Ne'} label="Ne" onClick={() => setField('covering', 'Ne')} />
                    </div>
                  </div>

                  <div className="calculator-binary-group">
                    <strong>Úklid po práci?</strong>
                    <div>
                      <BinaryChoice active={form.cleaning === 'Potřebuji'} label="Potřebuji" onClick={() => setField('cleaning', 'Potřebuji')} />
                      <BinaryChoice active={form.cleaning === 'Nepotřebuji'} label="Nepotřebuji" onClick={() => setField('cleaning', 'Nepotřebuji')} />
                    </div>
                  </div>
                </div>
              </section>

              <section className="calculator-section">
                <div className="calculator-section-head">
                  <span>Další údaje</span>
                  <h2>Upřesnění prostoru</h2>
                </div>

                <div className="calculator-binary-grid">
                  <div className="calculator-binary-group">
                    <strong>Prázdný prostor?</strong>
                    <div>
                      <BinaryChoice active={form.emptySpace === 'Ano'} label="Ano" onClick={() => setField('emptySpace', 'Ano')} />
                      <BinaryChoice active={form.emptySpace === 'Ne'} label="Ne" onClick={() => setField('emptySpace', 'Ne')} />
                    </div>
                  </div>

                  <div className="calculator-binary-group">
                    <strong>Koberce na podlaze?</strong>
                    <div>
                      <BinaryChoice active={form.carpets === 'Ano'} label="Ano" onClick={() => setField('carpets', 'Ano')} />
                      <BinaryChoice active={form.carpets === 'Ne'} label="Ne" onClick={() => setField('carpets', 'Ne')} />
                    </div>
                  </div>
                </div>

                <div className="calculator-field-grid">
                  <label className="calculator-field">
                    <span>Počet místností</span>
                    <input
                      type="number"
                      min="1"
                      placeholder="Např. 3"
                      value={form.roomCount}
                      onChange={(event) => setField('roomCount', event.target.value)}
                    />
                  </label>

                  <label className="calculator-field">
                    <span>Typ prostoru</span>
                    <select value={form.spaceType} onChange={(event) => setField('spaceType', event.target.value)}>
                      <option value="Pokoj">Pokoj</option>
                      <option value="Byt">Byt</option>
                      <option value="Dům">Dům</option>
                      <option value="Společné prostory">Společné prostory</option>
                      <option value="Obchod">Obchod</option>
                      <option value="Pension">Pension</option>
                      <option value="Kancelář">Kancelář</option>
                    </select>
                  </label>
                </div>

                <label className="calculator-field">
                  <span>Doplňující informace</span>
                  <textarea
                    rows="5"
                    placeholder="Sem si můžete poznačit vše, co bude mít vliv na rozsah nebo průběh zakázky."
                    value={form.additionalInfo}
                    onChange={(event) => setField('additionalInfo', event.target.value)}
                  />
                </label>
              </section>
            </div>

            <aside className="calculator-summary-card">
              <span>Přibližná cena</span>
              <h2>{totalPrice.toLocaleString('cs-CZ')} Kč</h2>
              <p>
                Tohle je orientační výstup ze stejné logiky jako v původní kalkulačce. Slouží jen
                pro rozhodnutí a porovnání, ne jako finální nabídka.
              </p>

              <div className="calculator-summary-list">
                <div>
                  <span>Typ výpočtu</span>
                  <strong>{form.selectedWork}</strong>
                </div>
                <div>
                  <span>Plocha</span>
                  <strong>{form.totalArea || '0'} m²</strong>
                </div>
                <div>
                  <span>Typ opravy</span>
                  <strong>{form.repairType}</strong>
                </div>
                <div>
                  <span>Prostor</span>
                  <strong>{form.spaceType}</strong>
                </div>
              </div>

              <div className="calculator-note-card">
                <strong>Bez odesílání poptávky</strong>
                <p>
                  Tady řešíme jen výpočet. Samotné zadání zakázky a navazující kontakt proběhne v
                  další části webu.
                </p>
              </div>

              <Link className="calculator-summary-cta" to="/objednat">
                Pokračovat na zadání zakázky
              </Link>
            </aside>
          </section>
        </section>
      </main>
    </AppShell>
  )
}
