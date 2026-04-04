import { useMemo, useRef, useState } from 'react'
import './App.css'

const featureCards = [
  {
    badge: 'Cena',
    title: 'Orientační cena bez zbytečného čekání',
    text: 'Stačí lokalita, dispozice nebo metry a hned vidíte realistický rozsah ceny.',
    variant: 'price',
  },
  {
    badge: 'Termín',
    title: 'Volné termíny dřív než první telefon',
    text: 'Nejdřív se podíváte, kdy to dává smysl. Až potom řešíte domluvu.',
    variant: 'calendar',
  },
  {
    badge: 'Malíři',
    title: 'Skuteční lidé, ne anonymní seznam',
    text: 'Vyberete si podle obličeje, stylu práce, běžné ceny i nejbližší dostupnosti.',
    variant: 'painters',
  },
]

const decisionPaths = [
  {
    key: 'painters',
    title: 'Chci si vybrat malíře',
    subtitle: 'Nejdřív správný člověk',
    icon: 'person',
    steps: [
      'Projdu si skutečné profily malířů.',
      'Zadáním bytu a lokality se hned spočítá cena.',
      'Pak řeším termín a detaily zakázky s vybraným člověkem.',
    ],
  },
  {
    key: 'calendar',
    title: 'Chci hlavně termín',
    subtitle: 'Nejdřív zjistím, kdy se může malovat',
    icon: 'calendar',
    steps: [
      'Zadáte kdy chcete malovat a kde.',
      'Systém hned spočítá orientační cenu.',
      'Pak uvidíte nejbližší reálné možnosti a vhodné malíře.',
    ],
  },
]

const painters = [
  {
    id: 'petr-havel',
    name: 'Petr Havel',
    role: 'Po nájemníkovi a menší byty',
    summary:
      'Nejčastěji maluju byty před nastěhováním a rychlé přemalby, kde je důležitá jasná domluva a čistá práce bez zbytečných okolků.',
    price: '9 000–16 000 Kč',
    availability: 'Pátek 10. 4.',
    avatar: 'P',
    response: 'Volá do 18 min',
    jobs: '286 zakázek',
    areas: ['Praha 5', 'Praha 6', 'Praha-západ'],
    specialties: ['Po nájemníkovi', '1+kk až 3+1', 'Rychlé termíny'],
    photos: ['Obývák po malbě', 'Ložnice po nájemníkovi', 'Chodba a dveře'],
    about:
      'Jsem typ malíře pro klienty, kteří chtějí rychle vyřešit byt po nájemníkovi nebo běžnou přemalbu před nastěhováním. Držím termíny a rovnou říkám, co může ovlivnit cenu.',
    fit: 'Ideální pro menší byty a rychlé přemalby mezi nájemníky.',
    communication: 'Věcný, rychlý, bez zbytečných okolků.',
  },
  {
    id: 'martin-ruzicka',
    name: 'Martin Růžička',
    role: 'Novostavby a větší byty',
    summary:
      'Sedí mi čisté zakázky, které se dají dobře naplánovat dopředu. Mám rád přesný rozsah práce a klidnou organizaci.',
    price: '14 000–25 000 Kč',
    availability: 'Úterý 14. 4.',
    avatar: 'M',
    response: 'Volá do 25 min',
    jobs: '198 zakázek',
    areas: ['Praha 4', 'Praha 10', 'Říčany'],
    specialties: ['Novostavby', '3+kk a větší', 'Stropy'],
    photos: ['Nový byt 3+kk', 'Malba stropů', 'Kuchyňský kout'],
    about:
      'Dělám hlavně novostavby a větší byty, kde je potřeba klidný průběh, přesný rozsah a žádné improvizace na poslední chvíli.',
    fit: 'Silný na větší zakázky, kde se plánuje dopředu.',
    communication: 'Klidný, systematický, plánovací typ.',
  },
  {
    id: 'roman-vesely',
    name: 'Roman Veselý',
    role: 'Přemalby a opravy',
    summary:
      'Dělám běžné přemalby i stěny, které potřebují před malbou srovnat a připravit. Hodí se tam, kde je potřeba opravit drobnosti.',
    price: '8 000–18 000 Kč',
    availability: 'Čtvrtek 9. 4.',
    avatar: 'R',
    response: 'Volá do 22 min',
    jobs: '244 zakázek',
    areas: ['Praha 2', 'Praha 3', 'Praha 8'],
    specialties: ['Opravy stěn', 'Přemalby', 'Starší byty'],
    photos: ['Opravené rohy stěn', 'Přemalovaný pokoj', 'Stěna po tmelení'],
    about:
      'Když je potřeba opravit stěny před malbou, rovnou řeknu, co bude mít vliv na cenu a jestli má smysl řešit to v jednom kroku.',
    fit: 'Výborný tam, kde nejsou stěny úplně v top stavu.',
    communication: 'Praktický, upřímný, vysvětlí co a proč.',
  },
  {
    id: 'david-svoboda',
    name: 'David Svoboda',
    role: 'Rychlé termíny',
    summary:
      'Když je potřeba rychle malovat menší byt nebo kancelář, umím se přizpůsobit tempu a fungovat i v kratším okně.',
    price: '7 500–15 000 Kč',
    availability: 'Středa 8. 4.',
    avatar: 'D',
    response: 'Volá do 12 min',
    jobs: '173 zakázek',
    areas: ['Praha 1', 'Praha 7', 'Praha 9'],
    specialties: ['Menší byty', 'Kanceláře', 'Do 48 hodin'],
    photos: ['Rychlá kancelářská malba', '1+kk po malbě', 'Bílá výmalba'],
    about:
      'Jsem dobrá volba tam, kde je důležitý rychlý termín a menší rozsah práce. Typicky 1+kk, kancelář nebo byt mezi nájmy.',
    fit: 'Nejlepší volba pro urgentní menší zakázky.',
    communication: 'Rychlý, operativní, dostupný po telefonu.',
  },
  {
    id: 'jakub-cerny',
    name: 'Jakub Černý',
    role: 'Přesné zakrytí a detail',
    summary:
      'Víc než rychlost řeším pečlivost. Hodím se tam, kde je důležité šetrné zakrytí a čistý detail kolem nábytku nebo kuchyně.',
    price: '12 000–20 000 Kč',
    availability: 'Pondělí 13. 4.',
    avatar: 'J',
    response: 'Volá do 31 min',
    jobs: '127 zakázek',
    areas: ['Praha 2', 'Praha 4', 'Praha 11'],
    specialties: ['Detailní práce', 'Zakrytí nábytku', 'Barevné malby'],
    photos: ['Barevná stěna', 'Zakrytá kuchyň', 'Ložnice detail'],
    about:
      'Vyhovují mi klienti, kteří chtějí spíš klidnou a pečlivou realizaci než úplně nejrychlejší výjezd.',
    fit: 'Dobrý tam, kde hraje roli detail a pečlivost.',
    communication: 'Klidný, pečlivý, vysvětluje postup.',
  },
  {
    id: 'tomas-pospisil',
    name: 'Tomáš Pospíšil',
    role: 'Rodinné byty',
    summary:
      'Nejčastěji dělám běžné rodinné byty, kde je potřeba zvládnout víc pokojů najednou a jasně držet harmonogram.',
    price: '13 000–22 000 Kč',
    availability: 'Úterý 14. 4.',
    avatar: 'T',
    response: 'Volá do 27 min',
    jobs: '211 zakázek',
    areas: ['Praha 9', 'Praha 14', 'Brandýs'],
    specialties: ['3+1 a větší', 'Rodinné byty', 'Více pokojů'],
    photos: ['Dětský pokoj', 'Obývací pokoj', 'Vstupní chodba'],
    about:
      'Jsem silný hlavně v bytech, kde je potřeba udělat víc místností v jednom rytmu a bez zmatku kolem termínů.',
    fit: 'Hodí se na větší byty a víc místností najednou.',
    communication: 'Klidný, organizačně silný, drží plán.',
  },
  {
    id: 'ondrej-kral',
    name: 'Ondřej Král',
    role: 'Bílá výmalba bez komplikací',
    summary:
      'Hodím se na čisté bílé malby a standardní přemalby, kde klient nechce nic komplikovat a potřebuje rychle hotovo.',
    price: '8 500–14 000 Kč',
    availability: 'Čtvrtek 16. 4.',
    avatar: 'O',
    response: 'Volá do 15 min',
    jobs: '164 zakázek',
    areas: ['Praha 3', 'Praha 10', 'Praha-východ'],
    specialties: ['Bílá malba', 'Standardní přemalby', 'Rychlý průběh'],
    photos: ['Bílý pokoj', 'Strop a stěny', 'Hotová ložnice'],
    about:
      'Když klient chce klasickou bílou výmalbu bez složitostí, umím to mít rychle spočítané i rychle hotové.',
    fit: 'Silný na jednoduché standardní zakázky.',
    communication: 'Přímý, jednoduchý, rychlé potvrzení.',
  },
  {
    id: 'marek-novotny',
    name: 'Marek Novotný',
    role: 'Byty před prodejem',
    summary:
      'Maluju byty před prodejem nebo před focením. Hlídám čistý výsledek a neutrální tón, který dobře funguje na prohlídkách.',
    price: '11 000–19 000 Kč',
    availability: 'Pátek 17. 4.',
    avatar: 'N',
    response: 'Volá do 29 min',
    jobs: '139 zakázek',
    areas: ['Praha 1', 'Praha 2', 'Praha 5'],
    specialties: ['Před prodejem', 'Čisté bílé tóny', 'Reality'],
    photos: ['Byt před focením', 'Světlý obývák', 'Vymalovaná kuchyň'],
    about:
      'Často dělám zakázky pro pronajímatele a realitní makléře, kde je důležité, aby byt působil co nejčistěji a nejklidněji.',
    fit: 'Dobré pro pronajímatele a byty před focením.',
    communication: 'Profesionální, vhodný pro reality a správce.',
  },
  {
    id: 'filip-horak',
    name: 'Filip Horák',
    role: 'Kanceláře a menší provozy',
    summary:
      'Kanceláře a menší provozy zvládám rychle, aby byl co nejmenší zásah do běžného provozu a fungování týmu.',
    price: '10 000–18 000 Kč',
    availability: 'Středa 15. 4.',
    avatar: 'F',
    response: 'Volá do 19 min',
    jobs: '121 zakázek',
    areas: ['Praha 4', 'Praha 5', 'Praha 13'],
    specialties: ['Kanceláře', 'Mimo špičku', 'Menší provozy'],
    photos: ['Kancelářský open space', 'Zasedačka', 'Recepce po malbě'],
    about:
      'Když je potřeba vymalovat kancelář bez velkého chaosu a s jasným časovým oknem, tohle je přesně typ práce, který dělám rád.',
    fit: 'Nejlepší pro kanceláře a menší provozy.',
    communication: 'Jasný, organizační, zvyklý na firemní klienty.',
  },
  {
    id: 'adam-benes',
    name: 'Adam Beneš',
    role: 'Barevné stěny a akcenty',
    summary:
      'Kromě klasické bílé dělám rád i barevné akcenty, dětské pokoje nebo výraznější stěny v obýváku.',
    price: '11 500–20 500 Kč',
    availability: 'Pondělí 20. 4.',
    avatar: 'A',
    response: 'Volá do 24 min',
    jobs: '118 zakázek',
    areas: ['Praha 6', 'Praha 7', 'Kladno'],
    specialties: ['Barevné stěny', 'Dětské pokoje', 'Akcentní malby'],
    photos: ['Modrá stěna', 'Dětský pokoj', 'Akcent v obýváku'],
    about:
      'Pokud klient nechce jen klasickou bílou, ale i citlivě zvolenou barevnou plochu, umím pomoct i s tím, co bude v prostoru fungovat.',
    fit: 'Dobrá volba pro klienty, kteří chtějí i barvu a ne jen bílou.',
    communication: 'Kreativnější, poradí i s tónem a kombinací.',
  },
]

const painterMap = Object.fromEntries(painters.map((painter) => [painter.name, painter]))

const calendarDays = [
  { day: 30, muted: true, jobs: [] },
  { day: 31, muted: true, jobs: [] },
  {
    day: 1,
    jobs: [
      { painter: 'Petr Havel', time: '9:00', type: 'medium' },
      { painter: 'Roman Veselý', time: '13:30', type: 'soft' },
    ],
  },
  {
    day: 2,
    jobs: [
      { painter: 'David Svoboda', time: '8:00', type: 'high' },
      { painter: 'Ondřej Král', time: '14:00', type: 'medium' },
      { painter: 'Marek Novotný', time: '16:00', type: 'soft' },
    ],
  },
  {
    day: 3,
    jobs: [{ painter: 'Tomáš Pospíšil', time: '11:00', type: 'medium' }],
  },
  {
    day: 4,
    jobs: [
      { painter: 'Martin Růžička', time: '10:00', type: 'soft' },
      { painter: 'Jakub Černý', time: '15:00', type: 'medium' },
    ],
  },
  {
    day: 5,
    jobs: [{ painter: 'Filip Horák', time: '9:30', type: 'high' }],
  },
  { day: 6, jobs: [] },
  {
    day: 7,
    jobs: [
      { painter: 'Adam Beneš', time: '8:30', type: 'soft' },
      { painter: 'Petr Havel', time: '12:30', type: 'medium' },
    ],
  },
  {
    day: 8,
    jobs: [
      { painter: 'David Svoboda', time: '9:00', type: 'available' },
      { painter: 'Roman Veselý', time: '13:00', type: 'medium' },
    ],
  },
  {
    day: 9,
    jobs: [
      { painter: 'Roman Veselý', time: '10:00', type: 'available' },
      { painter: 'Jakub Černý', time: '15:00', type: 'soft' },
      { painter: 'Adam Beneš', time: '17:00', type: 'soft' },
    ],
  },
  {
    day: 10,
    selected: true,
    jobs: [
      { painter: 'Petr Havel', time: '8:30', type: 'available' },
      { painter: 'Marek Novotný', time: '12:00', type: 'soft' },
      { painter: 'Filip Horák', time: '15:30', type: 'medium' },
    ],
  },
  {
    day: 11,
    jobs: [
      { painter: 'Ondřej Král', time: '9:00', type: 'high' },
      { painter: 'Tomáš Pospíšil', time: '11:00', type: 'high' },
      { painter: 'Martin Růžička', time: '14:30', type: 'medium' },
    ],
  },
  { day: 12, jobs: [] },
  {
    day: 13,
    jobs: [
      { painter: 'Tomáš Pospíšil', time: '8:00', type: 'soft' },
      { painter: 'David Svoboda', time: '13:30', type: 'available' },
    ],
  },
  { day: 14, jobs: [] },
  {
    day: 15,
    jobs: [
      { painter: 'Filip Horák', time: '9:30', type: 'medium' },
      { painter: 'Martin Růžička', time: '12:00', type: 'available' },
    ],
  },
  {
    day: 16,
    jobs: [
      { painter: 'Ondřej Král', time: '10:00', type: 'available' },
      { painter: 'Adam Beneš', time: '16:30', type: 'soft' },
    ],
  },
  {
    day: 17,
    jobs: [
      { painter: 'Marek Novotný', time: '11:00', type: 'available' },
      { painter: 'Jakub Černý', time: '14:30', type: 'medium' },
      { painter: 'Roman Veselý', time: '17:00', type: 'high' },
    ],
  },
  {
    day: 18,
    jobs: [{ painter: 'Petr Havel', time: '7:00', type: 'soft' }],
  },
  { day: 19, jobs: [] },
  {
    day: 20,
    jobs: [
      { painter: 'Adam Beneš', time: '9:00', type: 'available' },
      { painter: 'Filip Horák', time: '13:00', type: 'soft' },
    ],
  },
  {
    day: 21,
    jobs: [
      { painter: 'Marek Novotný', time: '11:30', type: 'medium' },
      { painter: 'Jakub Černý', time: '15:00', type: 'soft' },
    ],
  },
  {
    day: 22,
    jobs: [
      { painter: 'David Svoboda', time: '9:00', type: 'available' },
      { painter: 'Roman Veselý', time: '13:30', type: 'medium' },
    ],
  },
  {
    day: 23,
    jobs: [{ painter: 'Martin Růžička', time: '10:00', type: 'soft' }],
  },
  {
    day: 24,
    jobs: [
      { painter: 'Ondřej Král', time: '8:30', type: 'available' },
      { painter: 'Tomáš Pospíšil', time: '12:30', type: 'high' },
      { painter: 'Petr Havel', time: '15:30', type: 'medium' },
    ],
  },
  { day: 25, jobs: [] },
  { day: 26, jobs: [] },
  {
    day: 27,
    jobs: [{ painter: 'Filip Horák', time: '9:00', type: 'soft' }],
  },
  {
    day: 28,
    jobs: [
      { painter: 'Marek Novotný', time: '11:00', type: 'medium' },
      { painter: 'Adam Beneš', time: '14:45', type: 'soft' },
    ],
  },
  {
    day: 29,
    jobs: [{ painter: 'Roman Veselý', time: '9:30', type: 'available' }],
  },
  {
    day: 30,
    jobs: [
      { painter: 'Tomáš Pospíšil', time: '10:30', type: 'high' },
      { painter: 'Jakub Černý', time: '17:00', type: 'soft' },
    ],
  },
  { day: 1, muted: true, jobs: [] },
  { day: 2, muted: true, jobs: [] },
  { day: 3, muted: true, jobs: [] },
]

const dayNames = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']

const initialForm = {
  location: 'Praha 6',
  propertyType: 'Byt',
  size: '2+1',
  workType: 'Po nájemníkovi',
  whenType: 'Co nejdřív',
  date: '10. dubna',
  details: '',
  photos: 'Ne',
  name: '',
  phone: '',
}

function MarkIcon() {
  return (
    <div className="mark-icon" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}

function DecisionIcon({ type }) {
  if (type === 'person') {
    return (
      <div className="decision-icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="17" r="7" />
          <path d="M11 37c2.8-6 8-9 13-9s10.2 3 13 9" />
        </svg>
      </div>
    )
  }

  return (
    <div className="decision-icon" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="9" y="11" width="30" height="26" rx="7" />
        <path d="M16 9v8" />
        <path d="M32 9v8" />
        <path d="M9 19h30" />
        <path d="M17 25h6" />
        <path d="M27 25h4" />
      </svg>
    </div>
  )
}

function WorkspaceIcon({ type }) {
  const icons = {
    calendar: (
      <>
        <rect x="8" y="10" width="32" height="28" rx="8" />
        <path d="M15 8v8" />
        <path d="M33 8v8" />
        <path d="M8 19h32" />
      </>
    ),
    painters: (
      <>
        <circle cx="24" cy="16" r="6" />
        <path d="M11 36c2.5-6.2 7.8-9 13-9 5.2 0 10.5 2.8 13 9" />
      </>
    ),
    search: (
      <>
        <circle cx="21" cy="21" r="8" />
        <path d="M27 27l8 8" />
      </>
    ),
  }

  return (
    <svg className="workspace-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {icons[type]}
    </svg>
  )
}

function App() {
  const [activeJourney, setActiveJourney] = useState('calendar')
  const [selectedDay, setSelectedDay] = useState(10)
  const [selectedPainterId, setSelectedPainterId] = useState(painters[0].id)
  const [formData, setFormData] = useState(initialForm)
  const workspaceRef = useRef(null)
  const formRef = useRef(null)

  const selectedPainter = useMemo(
    () => painters.find((painter) => painter.id === selectedPainterId) ?? painters[0],
    [selectedPainterId],
  )

  const selectedCalendarDay = useMemo(
    () => calendarDays.find((day) => day.day === selectedDay && !day.muted) ?? calendarDays[9],
    [selectedDay],
  )

  const recommendedPaintersForDay = useMemo(
    () =>
      selectedCalendarDay.jobs
        .map((job) => painterMap[job.painter])
        .filter(Boolean)
        .slice(0, 3),
    [selectedCalendarDay],
  )

  function openJourney(nextJourney) {
    setActiveJourney(nextJourney)
    window.requestAnimationFrame(() => {
      workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function openForm(nextValues = {}) {
    setFormData((current) => ({ ...current, ...nextValues }))
    window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function handleFieldChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  return (
    <div className="page-shell">
      <div className="site-frame">
        <header className="topbar">
          <a className="brand" href="#hero" aria-label="Malíř Hned">
            <MarkIcon />
            <span>Malíř Hned</span>
          </a>

          <nav className="nav-links" aria-label="Hlavní navigace">
            <a href="#how">Jak to funguje</a>
            <a href="#workspace">Kalendář</a>
            <a href="#workspace">Malíři</a>
            <a href="#prices">Ceník</a>
          </nav>

          <div className="topbar-actions">
            <a className="text-link" href="#workspace">
              Prohlédnout službu
            </a>
            <a className="ghost-button" href="#calculator">
              Spočítat cenu
            </a>
          </div>
        </header>

        <main>
          <section className="hero-panel" id="hero">
            <div className="hero-content">
              <span className="eyebrow">Praha a Středočeský kraj</span>
              <h1>
                <span>Cena, termín a malíř</span>
                <span className="muted-line">na jednom místě</span>
              </h1>
              <p className="hero-copy">
                Bleskově spočítáme orientační cenu a pak si buď najdete nejbližší termín,
                nebo rovnou vyberete konkrétního malíře.
              </p>

              <div className="hero-summary" id="prices">
                <div className="summary-pill">
                  <strong>Cena za pár kroků</strong>
                  <span>Nevíte metry? Stačí dispozice.</span>
                </div>
                <div className="summary-pill">
                  <strong>Nejbližší možnosti</strong>
                  <span>Středa, pátek nebo pondělí.</span>
                </div>
                <div className="summary-pill">
                  <strong>Skuteční malíři</strong>
                  <span>Podle stylu práce a dostupnosti.</span>
                </div>
              </div>

              <div className="hero-decision-map" aria-label="Možnosti vstupu do služby">
                <div className="decision-heading">
                  <div className="pill">Co chcete řešit jako první?</div>
                </div>

                <div className="hero-decision-grid">
                  {decisionPaths.map((path) => (
                    <button
                      className="hero-decision-card"
                      key={path.key}
                      type="button"
                      onClick={() => openJourney(path.key)}
                    >
                      <div className="hero-decision-front">
                        <DecisionIcon type={path.icon} />
                        <h3>{path.title}</h3>
                        <p>{path.subtitle}</p>
                      </div>

                      <div className="hero-decision-back">
                        <span className="hover-label">Jak to proběhne</span>
                        <ol>
                          {path.steps.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="calculator-strip" id="calculator">
            <div className="pill">Cena se počítá hned jako součást zadání</div>
            <div className="calculator-card">
              <div className="form-row">
                <label>
                  <span>Kde se bude malovat</span>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleFieldChange}
                  />
                </label>
                <label>
                  <span>Typ prostoru</span>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleFieldChange}
                  >
                    <option>Byt</option>
                    <option>Dům</option>
                    <option>Kancelář</option>
                  </select>
                </label>
              </div>

              <div className="form-row">
                <label>
                  <span>Dispozice nebo m2</span>
                  <div className="segmented-input">
                    <button className="mini-pill is-active" type="button">
                      Dispozice
                    </button>
                    <button className="mini-pill" type="button">
                      m2
                    </button>
                  </div>
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
                  <span>Termín</span>
                  <select name="whenType" value={formData.whenType} onChange={handleFieldChange}>
                    <option>Co nejdřív</option>
                    <option>Mám konkrétní datum</option>
                    <option>Jsem flexibilní</option>
                  </select>
                </label>
              </div>

              <div className="calculator-footer">
                <p>
                  Cena se spočítá hned z vašeho zadání. Fotky můžete přidat až potom, pokud ji
                  chcete zpřesnit.
                </p>
                <button className="primary-button" type="button" onClick={() => openJourney('calendar')}>
                  Pokračovat do přehledu
                </button>
              </div>
            </div>
          </section>

          <section className="section-block" id="how">
            <div className="section-heading">
              <div className="pill">Jak to funguje</div>
              <h2>Všechno důležité hned před sebou</h2>
              <p>
                Cena se spočítá okamžitě a pak už řešíte jen dvě věci: termín nebo konkrétního
                malíře.
              </p>
            </div>

            <div className="feature-grid">
              {featureCards.map((card) => (
                <article className={`feature-card feature-card--${card.variant}`} key={card.title}>
                  <div className="feature-visual">
                    {card.variant === 'price' && (
                      <div className="price-visual">
                        <div className="mini-sheet">
                          <span>2+1</span>
                          <strong>10 500–14 000 Kč</strong>
                        </div>
                        <div className="mini-tile">Nevíte metry? Stačí dispozice.</div>
                      </div>
                    )}

                    {card.variant === 'calendar' && (
                      <div className="calendar-visual">
                        <div className="calendar-bars">
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="meeting-list">
                          <div>Středa</div>
                          <div>Pátek</div>
                          <div>Pondělí</div>
                        </div>
                      </div>
                    )}

                    {card.variant === 'painters' && (
                      <div className="painter-visual">
                        <div className="avatar-chip">P</div>
                        <div className="avatar-chip">M</div>
                        <div className="profile-mini">
                          <strong>Petr</strong>
                          <span>Po nájemníkovi</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="feature-badge">{card.badge}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section-block workspace-section" id="workspace" ref={workspaceRef}>
            <div className="section-heading">
              <div className="pill">Interaktivní přehled</div>
              <h2>
                {activeJourney === 'calendar'
                  ? 'Kalendář volných kapacit'
                  : 'Přehled skutečných malířů'}
              </h2>
              <p>
                {activeJourney === 'calendar'
                  ? 'Každý den ukazuje zaplněnost i konkrétní malíře, kteří v něm mají prostor.'
                  : 'Nejdřív kompaktní karty pro rychlé porovnání. Po rozkliku detail, který dá dost informací pro rozhodnutí.'}
              </p>
            </div>

            <div className="workspace-toggle">
              <button
                type="button"
                className={`workspace-pill ${activeJourney === 'calendar' ? 'is-active' : ''}`}
                onClick={() => setActiveJourney('calendar')}
              >
                <WorkspaceIcon type="calendar" />
                <span>Kalendář</span>
              </button>
              <button
                type="button"
                className={`workspace-pill ${activeJourney === 'painters' ? 'is-active' : ''}`}
                onClick={() => setActiveJourney('painters')}
              >
                <WorkspaceIcon type="painters" />
                <span>Malíři</span>
              </button>
            </div>

            {activeJourney === 'calendar' ? (
              <div className="calendar-workspace">
                <aside className="workspace-sidebar">
                  <a className="brand brand--small" href="#hero">
                    <MarkIcon />
                    <span>Malíř Hned</span>
                  </a>

                  <div className="workspace-search">
                    <WorkspaceIcon type="search" />
                    <span>Hledat lokalitu nebo malíře</span>
                  </div>

                  <div className="workspace-filter-group">
                    <span className="workspace-label">Přehled</span>
                    <button className="workspace-nav is-active" type="button">
                      Duben 2026
                    </button>
                    <button className="workspace-nav" type="button">
                      Do 48 hodin
                    </button>
                    <button className="workspace-nav" type="button">
                      Po nájemníkovi
                    </button>
                  </div>

                  <div className="workspace-filter-group">
                    <span className="workspace-label">Legenda zaplněnosti</span>
                    <div className="occupancy-legend">
                      <div>
                        <span className="dot dot--available" />
                        Volnější den
                      </div>
                      <div>
                        <span className="dot dot--soft" />
                        Středně plno
                      </div>
                      <div>
                        <span className="dot dot--high" />
                        Skoro plno
                      </div>
                    </div>
                  </div>

                  <div className="workspace-side-card">
                    <h3>Vybraný den</h3>
                    <strong>{selectedCalendarDay.day}. dubna</strong>
                    <p>
                      {selectedCalendarDay.jobs.length
                        ? `${selectedCalendarDay.jobs.length} malíři mají v tomto dni nějakou kapacitu.`
                        : 'Zatím bez volných kapacit v hlavní síti.'}
                    </p>
                    <ul className="day-list">
                      {selectedCalendarDay.jobs.map((job) => (
                        <li key={`${job.painter}-${job.time}`}>
                          <span>{job.painter}</span>
                          <strong>{job.time}</strong>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="primary-button"
                      onClick={() =>
                        openForm({
                          date: `${selectedCalendarDay.day}. dubna`,
                          whenType: 'Mám konkrétní datum',
                          details: `Chci řešit termín kolem ${selectedCalendarDay.day}. dubna.`,
                        })
                      }
                    >
                      Pokračovat s tímto dnem
                    </button>
                  </div>
                </aside>

                <div className="calendar-panel">
                  <div className="calendar-toolbar">
                    <div>
                      <span className="workspace-kicker">Duben 2026</span>
                      <h3>Kalendář dostupnosti malířů</h3>
                    </div>
                    <div className="calendar-toolbar-actions">
                      <button type="button" className="toolbar-chip">
                        Dnes
                      </button>
                      <button type="button" className="toolbar-chip">
                        Měsíční pohled
                      </button>
                    </div>
                  </div>

                  <div className="calendar-selected-summary">
                    <div>
                      <span className="workspace-kicker">Vybraný den</span>
                      <strong>{selectedCalendarDay.day}. dubna</strong>
                    </div>
                    <div>
                      <span className="workspace-kicker">Odhad ceny</span>
                      <strong>10 500–14 000 Kč</strong>
                    </div>
                    <div>
                      <span className="workspace-kicker">Doporučení</span>
                      <strong>{recommendedPaintersForDay.length} vhodní malíři</strong>
                    </div>
                  </div>

                  <div className="calendar-head">
                    {dayNames.map((dayName) => (
                      <span key={dayName}>{dayName}</span>
                    ))}
                  </div>

                  <div className="calendar-grid">
                    {calendarDays.map((day, index) => (
                      <button
                        key={`${day.day}-${index}`}
                        type="button"
                        className={`calendar-cell ${day.muted ? 'is-muted' : ''} ${
                          selectedDay === day.day && !day.muted ? 'is-selected' : ''
                        }`}
                        onClick={() => !day.muted && setSelectedDay(day.day)}
                      >
                        <div className="calendar-cell-top">
                          <strong>{day.day}</strong>
                          {!day.muted && <span>{day.jobs.length ? `${day.jobs.length}x` : 'volno'}</span>}
                        </div>

                        <div className="calendar-jobs">
                          {day.jobs.slice(0, 3).map((job) => (
                            <span className={`job-pill job-pill--${job.type}`} key={`${job.painter}-${job.time}`}>
                              <b>{job.painter}</b>
                              <small>{job.time}</small>
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="calendar-day-recommendations">
                    <div className="calendar-day-header">
                      <div>
                        <span className="workspace-kicker">Pro vybraný den</span>
                        <h4>Doporučení malíři</h4>
                      </div>
                      <button
                        type="button"
                        className="toolbar-chip"
                        onClick={() => setActiveJourney('painters')}
                      >
                        Otevřít celý adresář
                      </button>
                    </div>

                    <div className="calendar-day-cards">
                      {recommendedPaintersForDay.map((painter) => (
                        <button
                          type="button"
                          key={painter.id}
                          className="day-painter-card"
                          onClick={() => {
                            setActiveJourney('painters')
                            setSelectedPainterId(painter.id)
                          }}
                        >
                          <div className="painter-mini-head">
                            <div className="avatar avatar--photo">{painter.avatar}</div>
                            <div>
                              <strong>{painter.name}</strong>
                              <span>{painter.role}</span>
                            </div>
                          </div>
                          <div className="painter-mini-meta">
                            <span>{painter.price}</span>
                            <span>{painter.response}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="painters-workspace">
                <aside className="workspace-sidebar">
                  <a className="brand brand--small" href="#hero">
                    <MarkIcon />
                    <span>Malíř Hned</span>
                  </a>

                  <div className="workspace-search">
                    <WorkspaceIcon type="search" />
                    <span>Hledat podle lokality nebo stylu</span>
                  </div>

                  <div className="workspace-filter-group">
                    <span className="workspace-label">Rychlé filtry</span>
                    <button className="workspace-nav is-active" type="button">
                      Všichni malíři
                    </button>
                    <button className="workspace-nav" type="button">
                      Do 48 hodin
                    </button>
                    <button className="workspace-nav" type="button">
                      Po nájemníkovi
                    </button>
                    <button className="workspace-nav" type="button">
                      Novostavby
                    </button>
                  </div>

                  <div className="workspace-side-card">
                    <h3>Jak vybírat</h3>
                    <p>
                      Nejdřív si porovnáte styl práce, reakční čas a běžný rozsah ceny. Detail pak
                      ukáže to, co je pro rozhodnutí opravdu důležité.
                    </p>
                    <button
                      type="button"
                      className="primary-button"
                      onClick={() =>
                        openForm({
                          details: `Chci kontaktovat malíře ${selectedPainter.name}.`,
                        })
                      }
                    >
                      Pokračovat s vybraným malířem
                    </button>
                  </div>
                </aside>

                <div className="painters-panel">
                  <div className="painters-panel-top">
                    <div>
                      <span className="workspace-kicker">Adresář malířů</span>
                      <h3>Vyberte si člověka, který vám dává smysl</h3>
                    </div>
                    <button type="button" className="toolbar-chip">
                      {painters.length} profilů
                    </button>
                  </div>

                  <div className="painter-card-grid">
                    {painters.map((painter) => (
                      <button
                        type="button"
                        key={painter.id}
                        className={`painter-mini-card ${
                          selectedPainterId === painter.id ? 'is-active' : ''
                        }`}
                        onClick={() => setSelectedPainterId(painter.id)}
                      >
                        <div className="painter-mini-head">
                          <div className="avatar avatar--photo">{painter.avatar}</div>
                          <div>
                            <strong>{painter.name}</strong>
                            <span>{painter.role}</span>
                          </div>
                        </div>
                        <div className="painter-mini-meta">
                          <span>{painter.price}</span>
                          <span>{painter.availability}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <article className="painter-detail-card">
                    <div className="painter-detail-cover" />
                    <div className="painter-detail-header">
                      <div className="painter-detail-avatar avatar avatar--photo">
                        {selectedPainter.avatar}
                      </div>

                      <div className="painter-detail-title">
                        <div>
                          <h3>{selectedPainter.name}</h3>
                          <span className="verified-badge">Ověřený profil</span>
                        </div>
                        <p>{selectedPainter.role}</p>
                      </div>

                      <button
                        type="button"
                        className="ghost-button"
                        onClick={() =>
                          openForm({
                            details: `Chci kontaktovat malíře ${selectedPainter.name}.`,
                          })
                        }
                      >
                        Vybrat tohoto malíře
                      </button>
                    </div>

                    <div className="painter-detail-grid">
                      <div className="detail-stat">
                        <span>Nejbližší dostupnost</span>
                        <strong>{selectedPainter.availability}</strong>
                      </div>
                      <div className="detail-stat">
                        <span>Běžný rozsah ceny</span>
                        <strong>{selectedPainter.price}</strong>
                      </div>
                      <div className="detail-stat">
                        <span>Reakce</span>
                        <strong>{selectedPainter.response}</strong>
                      </div>
                      <div className="detail-stat">
                        <span>Hotových zakázek</span>
                        <strong>{selectedPainter.jobs}</strong>
                      </div>
                    </div>

                    <div className="painter-detail-columns">
                      <section className="detail-card">
                        <h4>Pro koho se hodí</h4>
                        <p>{selectedPainter.fit}</p>
                      </section>

                      <section className="detail-card">
                        <h4>Styl komunikace</h4>
                        <p>{selectedPainter.communication}</p>
                      </section>

                      <section className="detail-card">
                        <h4>Kde působí</h4>
                        <div className="tag-row">
                          {selectedPainter.areas.map((area) => (
                            <span key={area} className="detail-tag">
                              {area}
                            </span>
                          ))}
                        </div>
                      </section>
                    </div>

                    <section className="detail-card detail-card--photos">
                      <h4>Ukázky realizací</h4>
                      <div className="photo-strip">
                        {selectedPainter.photos.map((photo, index) => (
                          <div className="detail-photo" key={photo}>
                            <div className={`detail-photo-visual detail-photo-visual--${index + 1}`} />
                            <span>{photo}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="detail-card detail-card--summary">
                      <h4>Jak pracuje</h4>
                      <p>{selectedPainter.about}</p>
                      <div className="tag-row">
                        {selectedPainter.specialties.map((specialty) => (
                          <span key={specialty} className="detail-tag">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </section>
                  </article>
                </div>
              </div>
            )}
          </section>

          <section className="section-block request-section" ref={formRef}>
            <div className="section-heading">
              <div className="pill">Zadání zakázky</div>
              <h2>Poslední krok před spojením</h2>
              <p>
                Tohle je formulář, který navazuje na obě větve. Pokud jdete přes termín, přenese se
                datum. Pokud přes malíře, přenese se vybraný člověk.
              </p>
            </div>

            <div className="request-layout">
              <aside className="request-sidebar">
                <div className="request-summary-card">
                  <div className="request-summary-head">
                    <span className="workspace-kicker">Aktuální kontext</span>
                    <span className="request-summary-badge">Připraveno k odeslání</span>
                  </div>
                  <h3>{activeJourney === 'calendar' ? `Termín ${selectedCalendarDay.day}. dubna` : selectedPainter.name}</h3>
                  <p>
                    {activeJourney === 'calendar'
                      ? 'Navazujete na vybraný den a kalendář kapacit.'
                      : 'Navazujete na konkrétního malíře a jeho profil.'}
                  </p>

                  <div className="request-price-card">
                    <span>Orientační cena</span>
                    <strong>10 500–14 000 Kč</strong>
                    <small>Finální cena se může upřesnit po fotkách nebo hovoru.</small>
                  </div>

                  <ul className="request-summary-list">
                    <li>
                      <span>Lokalita</span>
                      <strong>{formData.location}</strong>
                    </li>
                    <li>
                      <span>Typ práce</span>
                      <strong>{formData.workType}</strong>
                    </li>
                    <li>
                      <span>Dispozice</span>
                      <strong>{formData.size}</strong>
                    </li>
                    <li>
                      <span>Vybraný vstup</span>
                      <strong>{activeJourney === 'calendar' ? 'Kalendář' : 'Malíř'}</strong>
                    </li>
                  </ul>
                </div>
              </aside>

              <div className="request-card">
                <div className="request-card-top">
                  <div>
                    <span className="workspace-kicker">Krátké zadání</span>
                    <h3>Stačí pár údajů a malíř se ozve napřímo</h3>
                  </div>
                  <div className="request-steps">
                    <span className="request-step is-active">Zakázka</span>
                    <span className="request-step is-active">Termín</span>
                    <span className="request-step">Kontakt</span>
                  </div>
                </div>

                <div className="request-bento">
                  <section className="request-panel request-panel--wide">
                    <div className="request-panel-head">
                      <h4>O zakázce</h4>
                      <p>Základní rámec pro první výpočet a přiřazení.</p>
                    </div>
                    <div className="request-grid">
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

                  <section className="request-panel">
                    <div className="request-panel-head">
                      <h4>Kde a kdy</h4>
                      <p>Tohle pomůže vybrat správný termín nebo člověka.</p>
                    </div>
                    <div className="request-grid request-grid--stacked">
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

                  <section className="request-panel request-panel--wide">
                    <div className="request-panel-head">
                      <h4>Detaily, které pomůžou</h4>
                      <p>Stačí stručně. Cokoliv důležitého pro první domluvu.</p>
                    </div>
                    <div className="request-grid">
                      <label className="request-full">
                        <span>Co je dobré vědět předem</span>
                        <textarea
                          name="details"
                          rows="5"
                          value={formData.details}
                          onChange={handleFieldChange}
                          placeholder="Např. byt po nájemníkovi, je potřeba zakrýt kuchyň, preferuji dopoledne…"
                        />
                      </label>
                    </div>
                  </section>

                  <section className="request-panel request-panel--contact">
                    <div className="request-panel-head">
                      <h4>Kontakt</h4>
                      <p>Bez něj to malíř nevezme dál do telefonu.</p>
                    </div>
                    <div className="request-grid request-grid--stacked">
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

                <div className="request-footer">
                  <p>
                    Po odeslání dostane malíř vaše zadání a ozve se přímo. Platforma už dál
                    nevstupuje do samotné domluvy.
                  </p>
                  <button type="button" className="primary-button">
                    Odeslat zadání
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
