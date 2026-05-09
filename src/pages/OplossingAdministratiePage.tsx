import { Link } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { paths } from '@/lib/paths'
import './OplossingAdministratiePage.css'

export function OplossingAdministratiePage() {
  useDocumentTitle('Administratie · Maestro')

  return (
    <>
      <main>
        <section className="adm__sub-hero">
          <div className="wrap">
            <p className="eyebrow">
              <span className="dot" /> oplossing · administratie
            </p>
            <h1>
              Administratie die <em>meeschrijft</em>.
            </h1>
            <p className="lede">
              Een nieuwe deal in een mail. Een uur dat je vergat te boeken. Een
              factuur die nog moest. Maestro herkent ze allemaal in de stroom van
              je werk en zet ze op de juiste plek — zonder dat je ervoor hoeft te
              stoppen.
            </p>

            <div className="adm__steps">
              <div className="adm__step">
                <span className="adm__step-n">01 · CRM</span>
                <h3>Deals uit conversatie</h3>
                <p>
                  &ldquo;Ja, we gaan ervoor&rdquo; wordt herkend als deal-update.
                  Bedrag, fase en next step landen in HubSpot of jouw CRM. Geen
                  handmatige notities.
                </p>
              </div>
              <div className="adm__step">
                <span className="adm__step-n">02 · Uren</span>
                <h3>Urenboeking zonder tikwerk</h3>
                <p>
                  Maestro detecteert vergaderingen uit je agenda en concept-werk
                  uit drafts. Boekt op project, klant en regel — wachtend op jouw
                  akkoord.
                </p>
              </div>
              <div className="adm__step">
                <span className="adm__step-n">03 · Facturen</span>
                <h3>Facturatie-prep per klant</h3>
                <p>
                  Aan het eind van de week ligt er een conceptfactuur per project.
                  Compleet met regels, bedragen en BTW — verzendklaar als jij het
                  zegt.
                </p>
              </div>
            </div>

            <div className="adm__thread">
              <div className="adm__thread-copy">
                <span className="eyebrow">
                  <span className="dot" /> één thread, drie acties
                </span>
                <h2>
                  Eén mail van een klant — <em>drie</em> dingen die jij anders
                  zelf had moeten doen.
                </h2>
                <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.55 }}>
                  Bram van Damsté mailt om te bevestigen dat ze ervoor gaan, vraagt
                  of je donderdag een uur kunt blokkeren voor de aftrap, en wil
                  weten of de factuur voor het vooronderzoek al verstuurd is.
                  Maestro leest, herkent en handelt — niets daarvan komt op jouw
                  bord als losse taak.
                </p>
                <ul>
                  <li>
                    HubSpot-record bijgewerkt: fase <strong>Closed-won</strong>,
                    bedrag €4.200, owner Jelle.
                  </li>
                  <li>
                    Donderdag 13:00–14:00 in agenda — locatie en briefing erbij.
                  </li>
                  <li>Conceptfactuur naar Exact, klaar om vrijdag te verzenden.</li>
                </ul>
              </div>
              <div className="adm__thread-demo">
                <div className="adm__tdmail">
                  <div className="adm__tdmail-head">inbox · 2 min geleden</div>
                  <div className="adm__tdmail-from">Bram Visser · Damsté</div>
                  <div className="adm__tdmail-sub">
                    Re: Voorstel pricing — tekenen
                  </div>
                  <div className="adm__tdmail-body">
                    Hé Jelle, kort: <em>we gaan ervoor</em>. Plan je donderdag een
                    uurtje voor de aftrap? En{' '}
                    <em>de factuur voor het vooronderzoek</em> kun je al sturen —
                    graag.
                  </div>
                </div>
                <div className="adm__tdactions">
                  <div className="adm__tda">
                    <span className="adm__tda-ico">CRM</span>
                    <div>
                      <div className="adm__tda-t">
                        Damsté → Closed-won · €4.200
                      </div>
                      <div className="adm__tda-d">
                        HubSpot · fase + bedrag bijgewerkt
                      </div>
                    </div>
                    <span className="adm__tda-ok">✓</span>
                  </div>
                  <div className="adm__tda">
                    <span className="adm__tda-ico">CAL</span>
                    <div>
                      <div className="adm__tda-t">Aftrap Damsté · do 13:00</div>
                      <div className="adm__tda-d">
                        Outlook · 60 min · briefing toegevoegd
                      </div>
                    </div>
                    <span className="adm__tda-ok">✓</span>
                  </div>
                  <div className="adm__tda">
                    <span className="adm__tda-ico">FCT</span>
                    <div>
                      <div className="adm__tda-t">
                        Conceptfactuur · vooronderzoek
                      </div>
                      <div className="adm__tda-d">
                        Exact · €1.250 · klaar voor vrijdag
                      </div>
                    </div>
                    <span className="adm__tda-ok">✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="s">
          <div className="wrap">
            <div className="cta">
              <div className="cta__bg" />
              <div className="cta__inner">
                <p className="eyebrow" style={{ color: 'var(--orange-soft)' }}>
                  <span className="dot" /> CTA
                </p>
                <h2 className="cta__title">
                  Geen wachtrij, geen
                  <br />
                  sales-funnel. <em>Een gesprek</em>.
                </h2>
                <p className="cta__sub">
                  Half uur. Wij kijken mee in jouw stroom van mail en admin, jij
                  ziet wat Maestro eruit haalt zonder dat je iets hoeft te doen.
                </p>
                <div className="cta__buttons">
                  <Link to={paths.prijzen} className="btn btn-orange">
                    Vraag een gesprek aan →
                  </Link>
                  <Link
                    to={paths.home}
                    className="btn"
                    style={{
                      background: 'rgba(255,255,255,.06)',
                      color: '#fff',
                      borderColor: 'rgba(255,255,255,.18)',
                    }}
                  >
                    Terug naar overzicht
                  </Link>
                </div>
              </div>
              <div className="cta__seats">
                <div className="lbl">Early access</div>
                <div className="num">
                  <em>12</em>/30
                </div>
                <div className="progress" />
                <div className="small">plekken in de eerste cohort</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer variant="dark" />
    </>
  )
}
