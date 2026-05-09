import { useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { paths } from '@/lib/paths'
import './KoppelingenPage.css'

type Connector = {
  name: string
  cat: string
  desc: string
  status: 'live' | 'soon' | 'req'
  badge: string
  meta: string
  logoBg: string
  logoSvg: ReactNode
}

const live: Connector[] = [
  {
    name: 'Microsoft 365',
    cat: 'e-mail · agenda · OneDrive · Teams',
    desc: 'Outlook-postvak, Exchange-agenda, OneDrive-bestanden en Teams-chats — als bron voor postvak, agenda en kennis.',
    status: 'live',
    badge: 'Live',
    meta: 'OAuth · scopes per gebruiker',
    logoBg: '#eaf1fb',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="#0078d4">
        <path d="M3 6l9-2 9 2v12l-9 2-9-2V6z" />
        <path d="M12 4v16" stroke="#fff" strokeWidth={1.2} />
      </svg>
    ),
  },
  {
    name: 'Google Workspace',
    cat: 'Gmail · Calendar · Drive · Docs',
    desc: 'Gmail-threads, Calendar-events en Drive-bestanden — incl. Google Docs als bron voor de organisatie- en persoonlijke kennis.',
    status: 'live',
    badge: 'Live',
    meta: 'OAuth · admin-policies',
    logoBg: '#eef7ee',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#34a853" strokeWidth={1.6}>
        <circle cx={12} cy={12} r={9} />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    name: 'IMAP / SMTP',
    cat: 'e-mail · generiek',
    desc: 'Voor wie geen Microsoft of Google gebruikt — open IMAP/SMTP-koppeling voor je postvak, met dezelfde drafts en triage.',
    status: 'live',
    badge: 'Live',
    meta: 'App-password',
    logoBg: '#fff3eb',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#dc6f3f" strokeWidth={1.6}>
        <rect x={3} y={5} width={18} height={14} rx={2} />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    name: 'HubSpot',
    cat: 'CRM · sales-administratie',
    desc: 'Deals, contacten en pipeline — sales-admin uit conversaties wordt automatisch aan het juiste record gekoppeld.',
    status: 'live',
    badge: 'Live',
    meta: 'two-way sync',
    logoBg: '#fff7e6',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={1.6}>
        <path d="M3 11l9-7 9 7" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
  },
  {
    name: 'Pipedrive',
    cat: 'CRM · sales-administratie',
    desc: 'Activities, deals en personen worden geüpdatet vanuit het postvak en gespreksnotities — zonder tikwerk.',
    status: 'live',
    badge: 'Live',
    meta: 'two-way sync',
    logoBg: '#e9f5ee',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={1.6}>
        <circle cx={12} cy={12} r={9} />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    name: 'Notion',
    cat: 'documenten · organisatiekennis',
    desc: "Notion-pagina's en databases worden bron voor de organisatie­kennis — met audit-log per opgevraagd antwoord.",
    status: 'live',
    badge: 'Live',
    meta: 'workspace-token',
    logoBg: '#f4eefb',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth={1.6}>
        <rect x={3} y={4} width={18} height={18} rx={2} />
        <path d="M3 9h18M9 4v18" />
      </svg>
    ),
  },
  {
    name: 'Exact Online',
    cat: 'administratie · facturatie',
    desc: 'Klanten, facturen en grootboek — facturatie-prep en open-invoice-bewaking direct vanuit Maestro.',
    status: 'live',
    badge: 'Live',
    meta: 'NL · OAuth',
    logoBg: '#fef0f0',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.6}>
        <path d="M5 5h14v14H5z" />
        <path d="M5 9h14M9 5v14" />
      </svg>
    ),
  },
  {
    name: 'Microsoft Teams',
    cat: 'chats · vergader­transcripts',
    desc: 'Belangrijke chats & vergader­transcripts worden context voor je antwoorden — privé per gebruiker.',
    status: 'live',
    badge: 'Live',
    meta: 'graph-API',
    logoBg: '#eaf1fb',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0078d4" strokeWidth={1.6}>
        <path d="M3 4h7v7H3zM14 4h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
      </svg>
    ),
  },
]

const soon: Connector[] = [
  {
    name: 'Salesforce',
    cat: 'CRM · enterprise',
    desc: 'Volledige two-way sync op leads, opportunities en activities — incl. custom-objects via metadata-mapping.',
    status: 'soon',
    badge: "Q3 '26",
    meta: 'early access op aanvraag',
    logoBg: '#e9f6ff',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0070ba" strokeWidth={1.6}>
        <circle cx={12} cy={12} r={9} />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    name: 'Slack',
    cat: 'team-communicatie',
    desc: "DM's en kanalen als context. Maestro markeert wat opvolging vraagt en stelt antwoorden voor in jouw stijl.",
    status: 'soon',
    badge: "Q3 '26",
    meta: '',
    logoBg: '#f1f0fb',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#5e5fcc" strokeWidth={1.6}>
        <circle cx={12} cy={12} r={9} />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    name: 'Asana',
    cat: 'taken · projecten',
    desc: 'Taken uit threads worden direct in jouw Asana-projecten geplaatst — incl. juiste assignee en deadline.',
    status: 'soon',
    badge: "Q3 '26",
    meta: '',
    logoBg: '#fdf3eb',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={1.6}>
        <rect x={3} y={4} width={18} height={18} rx={2} />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    name: 'Twinfield',
    cat: 'administratie · NL',
    desc: 'Tweede grote NL-administratie connector na Exact — voor accountants & mkb met meerdere klanten in één omgeving.',
    status: 'soon',
    badge: "Q4 '26",
    meta: 'beta-aanvraag open',
    logoBg: '#fef0f0',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.6}>
        <path d="M3 5h18v14H3z" />
        <path d="M3 9h18" />
      </svg>
    ),
  },
  {
    name: 'Moneybird',
    cat: 'administratie · zzp / mkb',
    desc: 'Voor ZZP & klein-mkb. Facturen prepareren, betalingen herkennen, urenboeking automatisch aan klant koppelen.',
    status: 'soon',
    badge: "Q4 '26",
    meta: 'in design',
    logoBg: '#f5fdf6',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={1.6}>
        <circle cx={12} cy={12} r={9} />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    cat: 'contacten · sales',
    desc: 'Verrijking van contacten met LinkedIn-context — wie ze zijn, recente posts, gemeenschappelijke connecties.',
    status: 'soon',
    badge: "Q4 '26",
    meta: 'in design',
    logoBg: '#eaf1fb',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0a66c2" strokeWidth={1.6}>
        <rect x={3} y={3} width={18} height={18} rx={3} />
        <path d="M8 10v8M8 7h0M12 18v-5a2 2 0 1 1 4 0v5" />
      </svg>
    ),
  },
  {
    name: 'Linear',
    cat: 'product · engineering',
    desc: 'Issues vanuit klantmail of intern overleg — Maestro maakt het ticket aan met bijgevoegd citaat en projectlabel.',
    status: 'soon',
    badge: "Q1 '27",
    meta: 'in design',
    logoBg: '#f9f0fb',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth={1.6}>
        <path d="M4 6h16M4 12h16M4 18h10" />
      </svg>
    ),
  },
  {
    name: 'Zoom',
    cat: 'vergaderingen · transcripts',
    desc: 'Transcripts & opnames worden bronmateriaal voor sales-admin, taken en kennis — privé per gebruiker.',
    status: 'soon',
    badge: "Q1 '27",
    meta: 'in design',
    logoBg: '#e9f6ff',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0070ba" strokeWidth={1.6}>
        <circle cx={9} cy={12} r={6} />
        <circle cx={15} cy={12} r={6} />
      </svg>
    ),
  },
  {
    name: 'Stem mee',
    cat: 'eigen voorstel',
    desc: 'Mis je een tool? Early-access klanten kunnen een MCP-connector aanvragen — we publiceren elk kwartaal de top-3 stemmen.',
    status: 'req',
    badge: 'Stem',
    meta: '',
    logoBg: '#f5f4f0',
    logoSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth={1.6}>
        <circle cx={12} cy={12} r={9} />
        <path d="M12 6v12M6 12h12" />
      </svg>
    ),
  },
]

type TabKey = 'live' | 'soon' | 'req'

export function KoppelingenPage() {
  useDocumentTitle('Koppelingen — Maestro')
  const [active, setActive] = useState<TabKey>('live')

  const counts = useMemo(
    () => ({ live: live.length, soon: soon.length, req: '∞' as const }),
    [],
  )

  return (
    <>
      <section className="kp-head">
        <div className="kp-head__bg" />
        <div className={`wrap kp-head__inner`}>
          <p className="eyebrow">
            <span className="dot" /> koppelingen · MCP
          </p>
          <h1 className="h-display" style={{ fontSize: 'clamp(40px, 5.6vw, 64px)' }}>
            Maestro praat
            <br />
            met de tools die <em>jij</em> al gebruikt.
          </h1>
          <p className="lede" style={{ marginTop: 18 }}>
            Via het{' '}
            <strong style={{ color: 'var(--ink)' }}>Model Context Protocol</strong>{' '}
            sluit Maestro veilig aan op je werkplek. We starten met de systemen
            waar het meeste werk ligt — postvak, agenda, documenten, CRM en taken
            — en breiden maandelijks uit. Voor Enterprise bouwen we connectors op
            maat voor je eigen systemen.
          </p>
        </div>
      </section>

      <section className="kp-section">
        <div className="wrap">
          <div className="kp-tabs" role="tablist">
            <button
              type="button"
              className={`kp-tab ${active === 'live' ? 'is-active' : ''}`}
              onClick={() => setActive('live')}
            >
              Beschikbaar nu <span className="count">{counts.live}</span>
            </button>
            <button
              type="button"
              className={`kp-tab ${active === 'soon' ? 'is-active' : ''}`}
              onClick={() => setActive('soon')}
            >
              Binnenkort <span className="count">{counts.soon}</span>
            </button>
            <button
              type="button"
              className={`kp-tab ${active === 'req' ? 'is-active' : ''}`}
              onClick={() => setActive('req')}
            >
              Op aanvraag <span className="count">{counts.req}</span>
            </button>
          </div>

          {active === 'live' && (
            <>
              <div className="kp-section__head">
                <h2 className="h-section">
                  Beschikbaar <em>vandaag</em>
                </h2>
                <p className="lede">
                  Geverifieerde, AVG-conforme connectors die we zelf bouwen en
                  onderhouden. Klikbare OAuth-flow — geen IT-ticket nodig.
                </p>
              </div>
              <div className="kp-grid">
                {live.map((c) => (
                  <ConnectorCard key={c.name} c={c} />
                ))}
              </div>
            </>
          )}

          {active === 'soon' && (
            <>
              <div className="kp-section__head">
                <h2 className="h-section">
                  <em>Binnenkort</em> beschikbaar
                </h2>
                <p className="lede">
                  Connectors die we de komende maanden uitrollen. Stem mee welke
                  voor jou prioriteit krijgt — early-access klanten beslissen
                  volgorde.
                </p>
              </div>
              <div className="kp-grid">
                {soon.map((c) => (
                  <ConnectorCard key={c.name} c={c} />
                ))}
              </div>
            </>
          )}

          {active === 'req' && (
            <>
              <div className="kp-section__head">
                <h2 className="h-section">
                  Op <em>aanvraag</em>
                </h2>
                <p className="lede">
                  Eigen systeem? Voor Enterprise-klanten bouwen we MCP-connectors
                  op maat — van legacy-ERP tot interne API. Eén intake-gesprek,
                  one-pager met scope, dan aan de slag.
                </p>
              </div>
              <div className="kp-grid">
                <ConnectorCard c={soon[soon.length - 1]} />
              </div>
            </>
          )}

          <div className="kp-cta-strip" id="cta-strip">
            <div>
              <h3>
                Eigen systeem? <em>We bouwen mee.</em>
              </h3>
              <p>
                Voor Enterprise-klanten bouwen we MCP-connectors op maat — van
                legacy-ERP tot interne API. Eén intake-gesprek, one-pager met
                scope, dan aan de slag.
              </p>
            </div>
            <div className="actions">
              <Link to={paths.prijzen} className="btn btn-orange">
                Plan een gesprek
                <svg className="lc" viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link
                to={paths.prijzen}
                className="btn"
                style={{
                  background: 'transparent',
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,.2)',
                }}
              >
                Bekijk Enterprise
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="compact" />
    </>
  )
}

function ConnectorCard({ c }: { c: Connector }) {
  return (
    <article className={`cn ${c.status !== 'live' ? 'cn--soon' : ''}`}>
      <div className="cn__head">
        <div className="cn__logo" style={{ background: c.logoBg }}>
          {c.logoSvg}
        </div>
        <div>
          <div className="cn__name">{c.name}</div>
          <div className="cn__cat">{c.cat}</div>
        </div>
        <span className={`cn__status ${c.status}`}>{c.badge}</span>
      </div>
      <p className="cn__desc">{c.desc}</p>
      <div className="cn__foot">
        {c.status === 'live' && (
          <>
            <span className="pulse">
              <span className="dot-live" /> Verified
            </span>{' '}
            · {c.meta}
          </>
        )}
        {c.status === 'soon' && (
          <>
            <span className="pulse">
              <span className="dot-soon" />{' '}
              {c.meta.includes('beta') ? 'beta-aanvraag open' : c.meta || 'in build'}
            </span>
            {c.meta && c.meta !== 'in build' && !c.meta.includes('beta')
              ? ` · ${c.meta}`
              : ''}
          </>
        )}
        {c.status === 'req' && (
          <>
            →{' '}
            <a href="#cta-strip" style={{ color: 'var(--orange-deep)', fontWeight: 600 }}>
              Stuur je voorstel in
            </a>
          </>
        )}
      </div>
    </article>
  )
}
