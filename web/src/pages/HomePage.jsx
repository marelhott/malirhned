import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { decisionPaths } from '../lib/data'

const firstRowFeatures = [
  {
    icon: 'calculator',
    title: 'Cena za pár kroků',
    text: 'Nevíte metry? Stačí dispozice.',
  },
  {
    icon: 'calendar',
    title: 'Nejbližší možnosti',
    text: 'Termín nebo člověk podle potřeby.',
  },
  {
    icon: 'users',
    title: 'Skuteční malíři',
    text: 'Dostupnost a běžná cena.',
  },
]

const lowerCards = [
  {
    key: 'price',
    label: 'Cena',
    title: 'Orientační cena bez zbytečného čekání',
    text: 'Stačí lokalita, dispozice nebo metry a hned vidíte realistický rozsah ceny.',
  },
  {
    key: 'calendar',
    label: 'Termín',
    title: 'Volné termíny dřív než první telefon',
    text: 'Nejdřív se podíváte, kdy to dává smysl. Až potom řešíte domluvu.',
  },
  {
    key: 'painters',
    label: 'Malíři',
    title: 'Skuteční lidé, ne anonymní seznam',
    text: 'Vyberete si podle obličeje, stylu práce, běžné ceny i nejbližší dostupnosti.',
  },
]

function HeroMiniIcon({ type }) {
  if (type === 'calculator') {
    return (
      <div className="landing-mini-icon" aria-hidden="true">
        <div className="landing-mini-calculator" />
      </div>
    )
  }

  if (type === 'calendar') {
    return (
      <div className="landing-mini-icon" aria-hidden="true">
        <div className="landing-mini-calendar" />
      </div>
    )
  }

  return (
    <div className="landing-mini-icon" aria-hidden="true">
      <div className="landing-mini-users" />
    </div>
  )
}

function ChoiceGraphic({ type }) {
  if (type === 'painters') {
    return (
      <div className="landing-choice-graphic landing-choice-graphic--dark" aria-hidden="true">
        <div className="choice-profile-card">
          <div className="choice-avatar-circle" />
          <div className="choice-profile-lines">
            <span />
            <span />
          </div>
          <div className="choice-profile-tags">
            <div className="choice-tag">
              <span className="choice-tag-dot" />
              <span />
            </div>
            <div className="choice-tag">
              <span className="choice-tag-pin" />
              <span />
            </div>
          </div>
          <div className="choice-progress">
            <div className="choice-progress-head">
              <span />
              <span />
            </div>
            <div className="choice-progress-bar">
              <i />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="landing-choice-graphic landing-choice-graphic--light" aria-hidden="true">
      <div className="choice-calendar-card">
        <div className="choice-calendar-top">
          <span />
          <div>
            <i />
            <i />
          </div>
        </div>
        <div className="choice-calendar-week">
          {Array.from({ length: 7 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="choice-calendar-grid">
          {Array.from({ length: 21 }).map((_, index) => (
            <i key={index} className={index === 9 ? 'is-active' : ''} />
          ))}
        </div>
        <div className="choice-calendar-selected">
          <span />
          <div>
            <i />
            <i />
          </div>
        </div>
      </div>
    </div>
  )
}

function LowerCardGraphic({ type }) {
  if (type === 'price') {
    return (
      <div className="landing-lower-graphic landing-lower-graphic--price" aria-hidden="true">
        <div className="lower-float-card lower-float-card--price">
          <span>2+1</span>
          <strong>10 500–14 000 Kč</strong>
        </div>
        <div className="lower-float-card lower-float-card--note">
          <p>Nevíte metry? Stačí dispozice.</p>
        </div>
      </div>
    )
  }

  if (type === 'calendar') {
    return (
      <div className="landing-lower-graphic landing-lower-graphic--calendar" aria-hidden="true">
        <div className="lower-float-card lower-float-card--bars">
          <i />
          <i />
          <i />
        </div>
        <div className="lower-float-card lower-float-card--days">
          <span>Středa</span>
          <span>Pátek</span>
          <span>Pondělí</span>
        </div>
      </div>
    )
  }

  return (
    <div className="landing-lower-graphic landing-lower-graphic--painters" aria-hidden="true">
      <div className="lower-avatar-stack">
        <span>P</span>
        <span>M</span>
      </div>
      <div className="lower-float-card lower-float-card--profile">
        <strong>Petr</strong>
        <span>Po nájemníkovi</span>
      </div>
    </div>
  )
}

export function HomePage() {
  return (
    <AppShell>
      <div className="landing-blur-orb" aria-hidden="true" />

      <div className="landing-main">
        <section className="landing-hero">
          <div className="landing-eyebrow">
            <span className="landing-eyebrow-dot" />
            Praha a Středočeský kraj
          </div>

          <h1 className="landing-title">
            Cena, termín a malíř
            <br />
            <span>bez chaosu.</span>
          </h1>

          <p className="landing-subtitle">
            Bleskově spočítáme orientační cenu a pak si buď najdete nejbližší termín, nebo rovnou
            vyberete konkrétního malíře.
          </p>

          <div className="landing-mini-feature-row">
            {firstRowFeatures.map((item) => (
              <article className="landing-mini-feature" key={item.title}>
                <HeroMiniIcon type={item.icon} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="landing-choice-grid">
            {decisionPaths.map((path) => (
              <Link
                key={path.key}
                className={`landing-choice-card landing-choice-card--${path.key}`}
                to={path.href}
              >
                <ChoiceGraphic type={path.key} />
                <div className="landing-choice-copy">
                  <p>První krok</p>
                  <h2>{path.title}</h2>
                  <span>{path.subtitle}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="landing-clarification">
          <div className="landing-clarification-inner">
            <div className="landing-info-icon" aria-hidden="true">
              i
            </div>
            <h2>
              Nejdřív jasno, potom <span>teprve domluva.</span>
            </h2>
            <p>
              Nejdete do anonymní poptávky. Systém orientační ceny je součástí obou cest.
              Následně řešíte konkrétní termín nebo člověka.
            </p>
            <Link className="landing-inline-link" to="/objednat">
              Vyzkoušet zadání
              <span>→</span>
            </Link>
          </div>
        </section>

        <section className="landing-system">
          <div className="landing-system-head">
            <h2>
              Jeden systém,
              <br />
              dvě vstupní cesty.
            </h2>
            <p>
              Převzali jsme lepší strukturu produktu: samostatný kalendář, samostatný přehled
              malířů a detail profilu až ve chvíli, kdy ho opravdu potřebujete.
            </p>
          </div>

          <div className="landing-lower-grid">
            {lowerCards.map((card) => (
              <article className="landing-lower-card" key={card.key}>
                <div className="landing-lower-visual-shell">
                  <LowerCardGraphic type={card.key} />
                </div>
                <div className="landing-lower-copy">
                  <span>{card.label}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  )
}
