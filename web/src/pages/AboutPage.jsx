import { AppShell } from '../components/AppShell'
import { aboutMilestones, aboutPeople, companyProfile } from '../lib/data'

export function AboutPage() {
  return (
    <AppShell>
      <main className="about-page-main">
        <section className="about-page-shell">
          <header className="about-page-hero">
            <span className="about-page-badge">O nás</span>
            <h1>Platformu staví lidé, kteří mají malování opravdu odžité.</h1>
            <p>
              Malíř Hned nevznikl v marketingové zasedačce. Vznikl z praxe lidí, kteří dlouhé roky
              řeší reálné zakázky v bytech, kancelářích a menších domech po Praze a okolí.
            </p>
          </header>

          <section className="about-story-grid">
            <article className="about-story-card about-story-card--intro">
              <h2>Proč jsme to postavili</h2>
              {companyProfile.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>

            <aside className="about-contact-card">
              <span>Kontakt</span>
              <h2>{companyProfile.name}</h2>
              <dl>
                <div>
                  <dt>Jednatel</dt>
                  <dd>{companyProfile.founder}</dd>
                </div>
                <div>
                  <dt>Telefon</dt>
                  <dd>{companyProfile.phone}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{companyProfile.email}</dd>
                </div>
                <div>
                  <dt>Adresa</dt>
                  <dd>{companyProfile.address}</dd>
                </div>
                <div>
                  <dt>IČO</dt>
                  <dd>{companyProfile.ico}</dd>
                </div>
              </dl>
            </aside>
          </section>

          <section className="about-principles">
            <div className="about-section-head">
              <span>Jak přemýšlíme</span>
              <h2>Technologie má řemeslo zpřehlednit, ne schovat.</h2>
            </div>

            <div className="about-principles-grid">
              {companyProfile.principles.map((item) => (
                <article className="about-principle-card" key={item}>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="about-team">
            <div className="about-section-head">
              <span>Tým</span>
              <h2>Malý tým, který rozumí jak řemeslu, tak domluvě se zákazníkem.</h2>
            </div>

            <div className="about-team-grid">
              {aboutPeople.map((person) => (
                <article className="about-team-card" key={person.name}>
                  <strong>{person.name}</strong>
                  <span>{person.role}</span>
                  <p>{person.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="about-timeline">
            <div className="about-section-head">
              <span>Příběh</span>
              <h2>Od terénu k platformě, která zkracuje cestu k dobrému malíři.</h2>
            </div>

            <div className="about-timeline-list">
              {aboutMilestones.map((item) => (
                <article className="about-timeline-item" key={item.year}>
                  <strong>{item.year}</strong>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
    </AppShell>
  )
}
