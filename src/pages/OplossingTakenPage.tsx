import { Link } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { paths } from '@/lib/paths'
import './OplossingTakenPage.css'

export function OplossingTakenPage() {
  useDocumentTitle('Taken · Maestro')

  return (
    <>
      <main>
        <section className="tkn__sub-hero">
          <div className="wrap">
            <p className="eyebrow">
              <span className="dot" /> oplossing · taken
            </p>
            <h1>
              Geen oneindige <em>to-do-lijst</em> meer die alleen oploopt.
            </h1>
            <p className="lede">
              Een takenlijst die elke ochtend langer is dan gisteren — daar wordt
              niemand efficiënter van. Maestro herkent welke taken al ergens
              anders zijn afgehandeld, hercategoriseert wat blijft, en houdt
              alleen over wat er voor jou nu écht toe doet.
            </p>

            <div className="tkn__compare">
              <div className="tkn__col tkn__col-bad">
                <div className="tkn__col-h">Wat je vandaag normaal opent</div>
                <h3>De lijst die nooit korter wordt.</h3>
                {[
                  'Bram terugbellen over voorstel',
                  'Damsté factuur sturen',
                  'Reactie op Anouk — heidag agenda',
                  'HubSpot-deal Burggraaf bijwerken',
                  'Voorstel B&G afmaken',
                  'Notulen heidag rondsturen',
                  'Reisdeclaratie april indienen',
                  'Joel — call inplannen maandag',
                ].map((label) => (
                  <div className="tkn__todo" key={label}>
                    <span className="tkn__cb" />
                    <span dangerouslySetInnerHTML={{ __html: label }} />
                  </div>
                ))}
                <div className="tkn__col-count">
                  23 open taken · 8 nieuw · 5 ouder dan een week
                </div>
              </div>

              <div className="tkn__col">
                <div className="tkn__col-h">Wat Maestro je laat zien</div>
                <h3>Drie dingen waar jij echt nodig bent.</h3>
                <div className="tkn__todo tkn__todo-strike">
                  <span className="tkn__cb" />
                  <span>
                    Bram terugbellen — al beantwoord per mail (vrijdag 16:42)
                  </span>
                </div>
                <div className="tkn__todo tkn__todo-strike">
                  <span className="tkn__cb" />
                  <span>Damsté factuur — al verstuurd via Exact (Maestro)</span>
                </div>
                <div className="tkn__todo tkn__todo-strike">
                  <span className="tkn__cb" />
                  <span>HubSpot-deal Burggraaf — auto-bijgewerkt na call</span>
                </div>
                <div className="tkn__todo tkn__todo-strike">
                  <span className="tkn__cb" />
                  <span>Reisdeclaratie april — gevonden in mail, ingediend</span>
                </div>
                <div className="tkn__todo tkn__todo-strike">
                  <span className="tkn__cb" />
                  <span>Joel — call inplannen — concept-mail klaar voor jou</span>
                </div>
                <div className="tkn__todo">
                  <span className="tkn__cb" />
                  <span>
                    <strong>Voorstel B&amp;G afmaken</strong> · vandaag, blok 10:30
                    ingepland
                  </span>
                </div>
                <div className="tkn__todo">
                  <span className="tkn__cb" />
                  <span>
                    <strong>Notulen heidag rondsturen</strong> · concept ligt
                    klaar, jij geeft akkoord
                  </span>
                </div>
                <div className="tkn__todo">
                  <span className="tkn__cb" />
                  <span>
                    <strong>Reactie op Anouk</strong> · vraagt jouw inhoudelijke
                    visie — niet auto-beantwoordbaar
                  </span>
                </div>
                <div className="tkn__col-count">
                  <em>3 echte taken</em> · 5 al elders gesloten · rest verschoven
                  of geclusterd
                </div>
              </div>
            </div>

            <div className="tkn__recat">
              <div className="tkn__cat">
                <span className="tkn__cat-lbl">Hercategoriseerd</span>
                <div className="tkn__cat-t">
                  &ldquo;Bram terugbellen&rdquo; → al via mail afgehandeld
                </div>
                <div className="tkn__cat-d">
                  Maestro vindt jouw antwoord in de uitgaande mail van vrijdag en
                  sluit de taak — met link naar de thread, voor het geval jij wil
                  checken.
                </div>
              </div>
              <div className="tkn__cat">
                <span className="tkn__cat-lbl tkn__cat-lbl-blue">Geclusterd</span>
                <div className="tkn__cat-t">
                  3 admin-taken → 1 batch van 10 min
                </div>
                <div className="tkn__cat-d">
                  Drie kleine items (factuur, deal-update, declaratie) staan niet
                  meer los maar als één blok in je agenda — Maestro heeft de
                  stappen al voorbereid.
                </div>
              </div>
              <div className="tkn__cat">
                <span className="tkn__cat-lbl tkn__cat-lbl-gray">Niet voor jou</span>
                <div className="tkn__cat-t">
                  &ldquo;Notulen rondsturen&rdquo; → wacht alleen op akkoord
                </div>
                <div className="tkn__cat-d">
                  Concept staat klaar, ontvangers zijn afgeleid uit de uitnodiging.
                  Jij hoeft alleen &ldquo;verstuur&rdquo; te zeggen — geen
                  schrijfwerk meer.
                </div>
              </div>
            </div>

            <div className="tkn__auto">
              <p className="eyebrow" style={{ color: 'rgba(255,255,255,.55)' }}>
                <span className="dot" /> in de praktijk
              </p>
              <h2>
                Taken die <em>uit zichzelf</em> binnenkomen — en uit zichzelf
                weer weggaan.
              </h2>
              <p>
                Maestro creëert taken niet alleen vanuit jouw mailbox. Hij leest
                mee in calls, agenda&rsquo;s en CRM-events, en sluit ze zodra hij
                ergens anders ziet dat het al gebeurd is.
              </p>
              <div className="tkn__auto-list">
                <div className="tkn__auto-row">
                  <span className="tkn__auto-src">FIREFLIES · call</span>
                  <span className="tkn__auto-t">
                    &ldquo;Stuur me het voorstel voor woensdag&rdquo; → taak op
                    jou, deadline woensdag
                  </span>
                  <span className="tkn__auto-act">+ aangemaakt</span>
                </div>
                <div className="tkn__auto-row">
                  <span className="tkn__auto-src">EXACT · factuur</span>
                  <span className="tkn__auto-t">
                    Damsté-factuur is verzonden vanuit Maestro
                  </span>
                  <span className="tkn__auto-act">✓ gesloten</span>
                </div>
                <div className="tkn__auto-row">
                  <span className="tkn__auto-src">OUTLOOK · mail</span>
                  <span className="tkn__auto-t">
                    Anouk vraagt jouw visie — handmatig nodig
                  </span>
                  <span className="tkn__auto-act">→ blijft staan</span>
                </div>
                <div className="tkn__auto-row">
                  <span className="tkn__auto-src">HUBSPOT · deal</span>
                  <span className="tkn__auto-t">
                    Burggraaf-deal door collega bijgewerkt
                  </span>
                  <span className="tkn__auto-act">✓ gesloten</span>
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
                  Een half uur — wij
                  <br />
                  halen jouw taken op
                  <br />
                  en laten zien wat
                  <br />
                  <em>er overblijft</em>.
                </h2>
                <p className="cta__sub">
                  Geen demo-account. We koppelen jouw mail, agenda en admin en
                  laten Maestro een ronde maken. Jij ziet wat er na vijf minuten
                  nog op je lijst staat.
                </p>
                <div className="cta__buttons">
                  <Link to={paths.prijzen} className="btn btn-orange">
                    Plan een gesprek →
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
