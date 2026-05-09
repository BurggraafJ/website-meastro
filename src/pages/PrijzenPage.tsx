import { useState, type FormEvent } from 'react'
import { Footer } from '@/components/layout/Footer'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import './PrijzenPage.css'

const FOCUS_OPTIONS = [
  { value: 'mail', label: 'Postvak & mail' },
  { value: 'agenda', label: 'Agenda-beheer' },
  { value: 'admin', label: 'Administratie & sales' },
  { value: 'taken', label: 'Taken & opvolging' },
  { value: 'kennis', label: 'Organisatie­kennis' },
] as const

const SIZE_OPTIONS = ['1-5', '6-15', '16-50', '51-150', '150+'] as const

const FAQ = [
  {
    q: 'Waarom geen prijs op deze pagina?',
    a: 'Omdat de prijs per situatie weinig zegt. Eén gesprek is genoeg om te kijken of het past — en dan delen we de early-adopter voorwaarden direct, zonder ruis.',
  },
  {
    q: 'Verplicht ik me ergens toe?',
    a: 'Nee. Je meldt je aan voor een gesprek — niets meer. Pas als we samen besluiten dat het klopt, gaan we praten over een traject.',
  },
  {
    q: 'Wat gebeurt er met mijn data?',
    a: 'Maestro draait in jouw eigen Microsoft- of Google-tenant. Wij krijgen geen kopie. Persoonlijke kennis blijft van jou — altijd.',
  },
  {
    q: 'Wordt mijn data gebruikt om modellen te trainen?',
    a: 'Nee. Jouw mail, agenda en documenten worden niet gebruikt voor training van algemene modellen. Alleen jouw eigen agent leert van jouw historie.',
  },
  {
    q: 'Hoe lang duurt het voor we kunnen starten?',
    a: 'Na het kennismakings­gesprek zetten we Maestro typisch binnen één à twee weken klaar in jullie omgeving. De agenten leren mee terwijl jij werkt.',
  },
  {
    q: 'Werkt het naast onze bestaande tools?',
    a: 'Maestro vervangt geen tools — het zit ernaast. M365, Workspace, HubSpot, Pipedrive en meer worden via connectors aangesloten.',
  },
]

export function PrijzenPage() {
  useDocumentTitle('Early access — Maestro')
  const [done, setDone] = useState(false)
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]>('1-5')
  const [focus, setFocus] = useState<string[]>([])

  function toggleFocus(value: string) {
    setFocus((current) =>
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    )
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!e.currentTarget.reportValidity()) return
    setDone(true)
    requestAnimationFrame(() => {
      document
        .getElementById('eaDone')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }

  return (
    <>
      <section className="pr-head">
        <div className="pr-head__bg" />
        <div className="wrap pr-head__inner">
          <p className="eyebrow">
            <span className="dot" /> early access
          </p>
          <h1 className="h-display" style={{ fontSize: 'clamp(40px, 5.6vw, 64px)' }}>
            Werk mee aan
            <br />
            de <em>eerste versie</em>.
          </h1>
          <p className="lede" style={{ marginTop: 18 }}>
            Maestro is in early access. We werken met een select aantal teams die
            hun werkplek her&shy;uitvinden — samen met ons. Geen prijs op deze
            pagina, geen sales-funnel: meld je aan, dan plannen we een gesprek en
            kijken we of het past.
          </p>
        </div>
      </section>

      <section className="pr-section">
        <div className="wrap">
          <div className="ea" id="cta">
            <aside className="ea__side">
              <h2>
                Wat het <em>betekent</em> om mee te doen.
              </h2>
              <p>
                Een korte lijn met het bouwteam. Je krijgt vroege toegang, ruimte
                om mee te denken, en wij bouwen mee aan de use-cases die voor jou
                écht het verschil maken.
              </p>
              <ul className="ea__list">
                {[
                  'Direct contact met de bouwers — geen account-manager ertussen',
                  'Maestro draait in jouw eigen Microsoft- of Google-omgeving',
                  'Onboarding samen met ons team — geen "self-serve" gedoe',
                  'Voorrang op nieuwe agenten en koppelingen',
                  'Early-adopter tarief — vastgelegd voor jouw team',
                ].map((line) => (
                  <li key={line}>
                    <svg className="lc" viewBox="0 0 24 24">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    {line}
                  </li>
                ))}
              </ul>
              <div className="ea__pills">
                <span>NL-hosted</span>
                <span>AVG-conform</span>
                <span>maandelijks opzegbaar</span>
                <span>geen sales-funnel</span>
              </div>
            </aside>

            <div className="ea__card">
              {!done ? (
                <form className="ea__form" id="eaForm" noValidate onSubmit={onSubmit}>
                  <div className="ea__cardhead">
                    <span className="ea__badge">
                      <span className="dot" /> aanmelden
                    </span>
                  </div>
                  <h2 className="ea__cardtitle">
                    Meld je <em>hier aan</em>.
                  </h2>
                  <p className="ea__cardsub">
                    We nemen binnen één werkdag contact op met een tijdvoorstel
                    — geen geautomatiseerde drip-mail.
                  </p>

                  <div className="fld fld--row">
                    <div className="fld">
                      <label htmlFor="ea-fn">
                        Voornaam <span className="req">*</span>
                      </label>
                      <input
                        id="ea-fn"
                        name="fn"
                        type="text"
                        autoComplete="given-name"
                        required
                      />
                    </div>
                    <div className="fld">
                      <label htmlFor="ea-ln">
                        Achternaam <span className="req">*</span>
                      </label>
                      <input
                        id="ea-ln"
                        name="ln"
                        type="text"
                        autoComplete="family-name"
                        required
                      />
                    </div>
                  </div>

                  <div className="fld">
                    <label htmlFor="ea-email">
                      Werk-e-mail <span className="req">*</span>
                    </label>
                    <input
                      id="ea-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="naam@kantoor.nl"
                      required
                    />
                  </div>

                  <div className="fld fld--row">
                    <div className="fld">
                      <label htmlFor="ea-org">
                        Organisatie <span className="req">*</span>
                      </label>
                      <input
                        id="ea-org"
                        name="org"
                        type="text"
                        autoComplete="organization"
                        required
                      />
                    </div>
                    <div className="fld">
                      <label htmlFor="ea-role">Rol</label>
                      <input
                        id="ea-role"
                        name="role"
                        type="text"
                        autoComplete="organization-title"
                        placeholder="bv. partner, founder, COO"
                      />
                    </div>
                  </div>

                  <div className="fld">
                    <label>Teamgrootte</label>
                    <div className="opts">
                      {SIZE_OPTIONS.map((value) => (
                        <label key={value}>
                          <input
                            type="radio"
                            name="size"
                            value={value}
                            checked={size === value}
                            onChange={() => setSize(value)}
                          />
                          <span>{value}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="fld">
                    <label>Wat wil je vooral aanpakken?</label>
                    <div className="opts">
                      {FOCUS_OPTIONS.map((opt) => (
                        <label key={opt.value}>
                          <input
                            type="checkbox"
                            name="focus"
                            value={opt.value}
                            checked={focus.includes(opt.value)}
                            onChange={() => toggleFocus(opt.value)}
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="fld">
                    <label htmlFor="ea-stack">Welke werkplek gebruiken jullie?</label>
                    <select id="ea-stack" name="stack" defaultValue="m365">
                      <option value="m365">
                        Microsoft 365 (Outlook · Teams)
                      </option>
                      <option value="google">
                        Google Workspace (Gmail · Calendar)
                      </option>
                      <option value="mixed">Mix · beide</option>
                      <option value="other">Anders / weet niet</option>
                    </select>
                  </div>

                  <div className="fld">
                    <label htmlFor="ea-msg">Iets wat we moeten weten?</label>
                    <textarea
                      id="ea-msg"
                      name="msg"
                      placeholder="Korte context, een specifieke use-case, een vraag — wat je kwijt wil."
                    />
                  </div>

                  <label className="consent">
                    <input type="checkbox" id="ea-consent" required />
                    <span>
                      Ik ga akkoord met de{' '}
                      <a href="#">privacy&shy;voorwaarden</a> en begrijp dat
                      Maestro alleen mijn gegevens gebruikt om contact op te
                      nemen over deze aanmelding.
                    </span>
                  </label>

                  <button type="submit" className="btn btn-orange submit">
                    Verstuur aanmelding
                    <svg className="lc" viewBox="0 0 24 24">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                  <p className="foot-note">
                    — meestal reageren we binnen één werkdag —
                  </p>
                </form>
              ) : (
                <div className="ea__done" id="eaDone" aria-live="polite">
                  <span className="ico">
                    <svg className="lc" viewBox="0 0 24 24" width={26} height={26}>
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <h3>
                    Bedankt — we <em>nemen contact op</em>.
                  </h3>
                  <p>
                    Je aanmelding staat bij ons. Verwacht binnen één werkdag een
                    persoonlijk bericht van iemand uit het team.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="faq">
            <h2>
              Vaak <em>gevraagd</em>
            </h2>
            <div className="faq__grid">
              {FAQ.map((item) => (
                <div className="faq__item" key={item.q}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer variant="compact" />
    </>
  )
}
