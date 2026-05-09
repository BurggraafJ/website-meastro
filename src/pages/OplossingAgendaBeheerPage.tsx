import { Link } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { paths } from '@/lib/paths'
import './OplossingAgendaBeheerPage.css'

const rules = [
  {
    n: '01',
    t: 'Reistijd na fysieke meeting',
    d: '30 min op auto-locaties, 60 min voor Amsterdam-binnenring. Maestro telt op zonder dat jij erom hoeft te vragen.',
  },
  {
    n: '02',
    t: 'Voorbereiding voor nieuwe klanten',
    d: '15 min blok ervoor — met dossier, laatste mailwisseling en LinkedIn-snippet erin.',
  },
  {
    n: '03',
    t: 'Geen calls vóór 11:00',
    d: 'Tenzij intern. Maestro stelt automatisch een ander moment voor en legt het uit in de mail.',
  },
  {
    n: '04',
    t: 'Gaten van < 25 min worden focus-tijd',
    d: 'Niet inplanbaar voor anderen. Wel voor jouw eigen werk — Maestro suggereert wat je hier kunt afmaken.',
  },
]

export function OplossingAgendaBeheerPage() {
  useDocumentTitle('Agenda-beheer · Maestro')

  return (
    <>
      <main>
        <section className="agb__sub-hero">
          <div className="wrap">
            <p className="eyebrow">
              <span className="dot" /> oplossing · agenda-beheer
            </p>
            <h1>
              Plant zoals <em>jij</em> plant — niet één blok meer dan nodig.
            </h1>
            <p className="lede">
              Maestro kent jouw vaste regels: reistijd na fysieke meetings,
              voorbereidings&shy;tijd voor klanten die je nog niet zo goed kent,
              geen telefoongesprekken vóór 11:00. Hij plant niet alleen
              voorstellen, hij weegt ze tegen je dag — en stelt voor wat past.
            </p>

            <div className="agb__rules">
              {rules.map((r) => (
                <div className="agb__rule" key={r.n}>
                  <div className="agb__rule-k">Vaste regel · {r.n}</div>
                  <div className="agb__rule-t">{r.t}</div>
                  <div className="agb__rule-d">{r.d}</div>
                </div>
              ))}
            </div>

            <div className="agb__calview">
              <div>
                <span className="eyebrow">
                  <span className="dot" /> hoe het er in je dag uitziet
                </span>
                <h2>
                  Eén dag, vier soorten <em>blokken</em>.
                </h2>
                <p>
                  Maandag 8 mei. Een ontbijt&shy;meeting in Utrecht, een prospect
                  die om 10:00 wil bellen, een aftrap die je nog moet voorbereiden,
                  en een lege middag waarvan Maestro al weet dat er nog twee mails
                  op antwoord wachten.
                </p>
                <p style={{ marginTop: 14 }}>
                  Hij vult niet in. Hij stelt voor — met de redenering ernaast.
                  Jij accepteert met één tik, of past aan.
                </p>
              </div>
              <div className="agb__dayview">
                <div className="agb__dayview-h">
                  Maandag 8 mei{' '}
                  <span className="agb__dayview-lbl">Maestro stelt voor</span>
                </div>
                <div className="agb__day">
                  {['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'].map(
                    (h) => (
                      <div className="agb__day-h" key={h}>
                        <span>{h}</span>
                      </div>
                    ),
                  )}
                  <div className="agb__blk agb__blk--ext" style={{ top: 0, height: '18.5%' }}>
                    <div className="agb__blk-t">Ontbijt · Vroon</div>
                    <div className="agb__blk-d">07:00–08:30 · Utrecht</div>
                  </div>
                  <div className="agb__blk agb__blk--travel" style={{ top: '18.5%', height: '6%' }}>
                    <div className="agb__blk-t">+30 min reistijd</div>
                    <div className="agb__blk-d">vaste regel · auto</div>
                  </div>
                  <div className="agb__blk agb__blk--prep" style={{ top: '27%', height: '6%' }}>
                    <div className="agb__blk-t">+15 min voorbereiding</div>
                    <div className="agb__blk-d">nieuwe klant · dossier klaar</div>
                  </div>
                  <div className="agb__blk agb__blk--ext" style={{ top: '33%', height: '12%' }}>
                    <div className="agb__blk-t">Call Burggraaf — prospect</div>
                    <div className="agb__blk-d">09:15–10:15 · Teams</div>
                  </div>
                  <div className="agb__blk agb__blk--int" style={{ top: '50%', height: '14%' }}>
                    <div className="agb__blk-t">Focus · voorstel B&amp;G afmaken</div>
                    <div className="agb__blk-d">10:30–11:45 · door Maestro voorgesteld</div>
                  </div>
                  <div className="agb__blk agb__blk--ext" style={{ top: '67%', height: '14%' }}>
                    <div className="agb__blk-t">Aftrap Damsté</div>
                    <div className="agb__blk-d">12:00–13:00 · Teams</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="agb__brief">
              <span className="eyebrow">
                <span className="dot" /> en bij elke afspraak
              </span>
              <h2>
                Een briefing die <em>al klaar&shy;ligt</em> als je gaat zitten.
              </h2>
              <div className="agb__brief-card">
                <div className="agb__brief-row">
                  <div className="agb__brief-k">Klant</div>
                  <div className="agb__brief-v">
                    Burggraaf Group · prospect sinds 6 weken · 2 calls eerder met
                    Anouk
                  </div>
                </div>
                <div className="agb__brief-row">
                  <div className="agb__brief-k">Laatste contact</div>
                  <div className="agb__brief-v">
                    Mail 4 dagen terug — vraag over lead-tijden, jij beantwoord.
                    Geen open vragen meer.
                  </div>
                </div>
                <div className="agb__brief-row">
                  <div className="agb__brief-k">Doel call</div>
                  <div className="agb__brief-v">
                    Pricing valideren bij commerciële context — niet alle features.
                    Concept-voorstel ligt klaar.
                  </div>
                </div>
                <div className="agb__brief-row">
                  <div className="agb__brief-k">Aandacht&shy;punt</div>
                  <div className="agb__brief-v">
                    Jouw notitie van vorige call:{' '}
                    <em>
                      &ldquo;besluit&shy;vormer is COO, niet CEO — hou daar
                      rekening mee in framing.&rdquo;
                    </em>
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
                  Een half uur — wij kijken
                  <br />
                  mee, jij ziet hoe
                  <br />
                  <em>jouw week eruit kan zien</em>.
                </h2>
                <p className="cta__sub">
                  Geen demo-account, geen voorgekookt voorbeeld. We koppelen jouw
                  agenda en je bestaande regels en laten zien wat Maestro
                  voorstelt.
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
