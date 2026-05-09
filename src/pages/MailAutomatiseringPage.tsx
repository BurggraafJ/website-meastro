import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { paths } from '@/lib/paths'
import './MailAutomatiseringPage.css'

const NL_FORMATTER = new Intl.NumberFormat('nl-NL')

export function MailAutomatiseringPage() {
  useDocumentTitle('Maestro · Mail-automatisering')

  const mailsRef = useRef<HTMLSpanElement>(null)
  const draftsRef = useRef<HTMLSpanElement>(null)
  const hoursRef = useRef<HTMLSpanElement>(null)

  /* Live counter wiggle — small increments to feel alive. */
  useEffect(() => {
    let mv = 2847
    let dv = 312
    let hv = 68
    const id = window.setInterval(() => {
      if (Math.random() < 0.7) {
        mv += Math.floor(Math.random() * 4) + 1
        if (mailsRef.current) mailsRef.current.textContent = NL_FORMATTER.format(mv)
      }
      if (Math.random() < 0.25) {
        dv += 1
        if (draftsRef.current) draftsRef.current.textContent = NL_FORMATTER.format(dv)
      }
      if (Math.random() < 0.15) {
        hv += 1
        if (hoursRef.current) hoursRef.current.textContent = `${hv}u`
      }
    }, 2400)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="ma-page">
      <section className="ma-hero">
        <div className="ma-hero__grid" />
        <div className="wrap">
          <div className="ma-hero__inner">
            <p className="ma-hero__crumb">
              <Link to={paths.home}>Maestro</Link> · oplossingen ·{' '}
              <span style={{ color: 'var(--orange-deep)' }}>mail-automatisering</span>
            </p>
            <p className="eyebrow">
              <span className="dot" /> oplossing 01 · postvak
            </p>
            <h1 className="h-display h-display-mail">
              Drie concepten in je inbox —<br />
              geschreven zoals <em>jij</em> schrijft.
            </h1>
            <p className="ma-hero__sub">
              Geen sjablonen, geen &ldquo;schrijf in stijl van&hellip;&rdquo;.
              Maestro analyseert al je verzonden e-mail uit Outlook of Gmail,
              leert jouw toon per ontvanger, en zet &lsquo;s ochtends drie
              concepten klaar — direct te versturen.
            </p>
            <div className="ma-hero__cta">
              <Link to={`${paths.prijzen}#cta`} className="btn btn-orange">
                Plan een gesprek
                <svg className="lc" viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link to={`${paths.home}#features`} className="btn">
                Bekijk alle oplossingen
              </Link>
            </div>
            <div className="ma-hero__metrics">
              <div className="m">
                <span className="num">Outlook</span>
                <span className="lbl">en Gmail · jouw bestaande postvak</span>
              </div>
              <div className="m">
                <span className="num">3</span>
                <span className="lbl">concepten per ochtend, in jouw stijl</span>
              </div>
              <div className="m">
                <span className="num">~50s</span>
                <span className="lbl">gemiddeld per concept</span>
              </div>
              <div className="m">
                <span className="num">EU</span>
                <span className="lbl">data-hosting · jouw tenant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUTLOOK MOCK */}
      <section className="s s--alt s--alt-mail">
        <div className="wrap">
          <div className="pers">
            <div>
              <p className="eyebrow">
                <span className="dot" /> &lsquo;s ochtends om 08:30
              </p>
              <h2 className="h-section h-section-mail">
                Je opent Outlook —<br />
                en het is al <em>gedaan</em>.
              </h2>
              <p className="lede" style={{ marginTop: 18 }}>
                Maestro draait &lsquo;s nachts mee, leest binnenkomende mail,
                scheidt ruis van actie en schrijft drie concepten klaar — voor
                de drie afzenders waar jij vandaag echt iets mee moet.
              </p>
              <div className="pers__list">
                <div className="pers__row">
                  <span className="num">01</span>
                  <div>
                    <div className="t">Toon &amp; nuance per ontvanger</div>
                    <div className="desc">
                      Bram krijgt direct &amp; kort. Anouk krijgt warm &amp;
                      uitgebreid. De agent leest jouw geschiedenis met die
                      persoon.
                    </div>
                  </div>
                </div>
                <div className="pers__row">
                  <span className="num">02</span>
                  <div>
                    <div className="t">Agenda-blokken uit mail-herkenning</div>
                    <div className="desc">
                      Een afspraakvoorstel wordt automatisch geblokt — inclusief
                      reistijd op basis van je adres en je agenda-regels.
                    </div>
                  </div>
                </div>
                <div className="pers__row">
                  <span className="num">03</span>
                  <div>
                    <div className="t">Beschikbaarheid &amp; reistijd</div>
                    <div className="desc">
                      Stelt zelf tijden voor die kloppen met je werkweek-patroon,
                      no-meeting-blocks en de reistijd tussen afspraken.
                    </div>
                  </div>
                </div>
                <div className="pers__row">
                  <span className="num">04</span>
                  <div>
                    <div className="t">Sales-admin uit conversatie</div>
                    <div className="desc">
                      &ldquo;Ja, we gaan ervoor&rdquo; wordt herkend als
                      deal-update. CRM bijgewerkt, opvolg-task aangemaakt — jij
                      hoeft niets te tikken.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="outlook" aria-hidden="true">
              <div className="outlook__bar">
                <span className="outlook__dots">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="outlook__url">outlook · postvak in</span>
                <span className="outlook__icons">
                  <svg className="lc" viewBox="0 0 24 24" width={14} height={14}>
                    <circle cx={11} cy={11} r={7} />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                  <svg className="lc" viewBox="0 0 24 24" width={14} height={14}>
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  </svg>
                </span>
              </div>
              <div className="outlook__head">
                <span className="outlook__lbl">Vandaag</span>
                <span
                  style={{
                    color: 'var(--neutral-500)',
                    font: '500 11px var(--font-mono)',
                    letterSpacing: '.04em',
                  }}
                >
                  3 concepten klaargezet door Maestro
                </span>
                <span className="outlook__pill" style={{ marginLeft: 'auto' }}>
                  in jouw stijl
                </span>
              </div>
              <div className="outlook__list">
                {[
                  {
                    av: 'BV',
                    who: 'Bram Visser',
                    sub: 'RE: Voorstel Damsté',
                    body: 'Helder, bedankt. We gaan ervoor maandag —',
                    time: '09:48',
                    draft: true,
                  },
                  {
                    av: 'AE',
                    who: 'Anouk Engels',
                    sub: 'RE: Heidag — opvolging',
                    body: 'Dank voor het uitgebreide overzicht. Mooi om —',
                    time: '09:46',
                    draft: true,
                  },
                  {
                    av: 'JR',
                    who: 'Jeroen Rijkers',
                    sub: 'RE: Q2-rapportage',
                    body: 'Cijfers kloppen. Twee opmerkingen bij p.4: —',
                    time: '09:42',
                    draft: true,
                  },
                ].map((row) => (
                  <div className="outlook__row draft" key={row.av}>
                    <span className="outlook__av av-orange">{row.av}</span>
                    <div>
                      <div className="outlook__who">
                        {row.who}{' '}
                        <span className="outlook__draft">concept</span>
                      </div>
                    </div>
                    <span className="outlook__sub">
                      <span className="strong">{row.sub}</span> — {row.body}
                    </span>
                    <span className="outlook__time">{row.time}</span>
                  </div>
                ))}
                <div className="outlook__row" style={{ opacity: 0.65 }}>
                  <span className="outlook__av">TH</span>
                  <div>
                    <div className="outlook__who">Tarik El Hamdaoui</div>
                  </div>
                  <span className="outlook__sub">
                    Re: Follow-up heidag — thema&rsquo;s en actiepunten
                  </span>
                  <span className="outlook__time">07:12</span>
                </div>
                <div className="outlook__row" style={{ opacity: 0.55 }}>
                  <span className="outlook__av">KJ</span>
                  <div>
                    <div className="outlook__who">Koen de Jonge</div>
                  </div>
                  <span className="outlook__sub">
                    Sales dashboard — vragen over conversie
                  </span>
                  <span className="outlook__time">06:58</span>
                </div>
              </div>
              <div className="outlook__foot">
                <span>
                  <span className="ok">●</span> voorbeeld · zo zou een ochtend
                  eruit kunnen zien
                </span>
                <span>jouw toon · 0 bewerkingen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TONE COMPARE */}
      <section className="s">
        <div className="wrap">
          <div className="s__head">
            <p className="eyebrow">
              <span className="dot" /> dezelfde dag · twee afzenders · twee tonen
            </p>
            <h2 className="h-section h-section-mail">
              Niet één toon —<br />
              maar dezelfde toon die <em>jij</em> bij elke persoon kiest.
            </h2>
            <p className="lede" style={{ marginTop: 14 }}>
              Bram krijgt al vijf jaar bullets en korte zinnen van je. Anouk
              krijgt warme alinea&rsquo;s en een persoonlijke afsluiting.
              Maestro ziet dat verschil in je geschiedenis — en houdt het vast.
            </p>
          </div>

          <div className="tones">
            <article className="tone">
              <div className="tone__head">
                <div className="tone__who">
                  <span className="av">BV</span>
                  <div>
                    <div className="nm">Bram Visser</div>
                    <div className="ctx">
                      vaste klant · 5 jaar · 312 mails
                    </div>
                  </div>
                </div>
                <span className="tone__tag t-short">kort &amp; direct</span>
              </div>
              <div className="tone__body">
                Bram,
                <br />
                <br />
                Helder, bedankt. We gaan ervoor maandag.
                <br />
                – stuur ik vrijdag de stukken
                <br />
                – jullie tekenen vóór 12:00
                <br />
                – maandag 10:00 Damsté, ik ben er
                <br />
                <br />
                Tot dan.
              </div>
              <div className="tone__sig">— J.</div>
              <div className="tone__pat">
                <span>geen aanhef &ldquo;beste&rdquo;</span>
                <span>bullets</span>
                <span>signoff: &ldquo;—&rdquo; + initiaal</span>
                <span>geen vraag terug</span>
              </div>
            </article>

            <article className="tone">
              <div className="tone__head">
                <div className="tone__who">
                  <span className="av">AE</span>
                  <div>
                    <div className="nm">Anouk Engels</div>
                    <div className="ctx">
                      programma&shy;manager · 18 mnd · 89 mails
                    </div>
                  </div>
                </div>
                <span className="tone__tag t-warm">warm &amp; uitgebreid</span>
              </div>
              <div className="tone__body">
                Hoi Anouk,
                <br />
                <br />
                Dank voor het uitgebreide overzicht — mooi om te zien hoeveel
                er uit de heidag is opgehaald. Ik herken vooral het stuk over
                de terugkoppeling naar de teams; daar zat bij ons ook de rek.
                <br />
                <br />
                Eén vraag: zou je het traject met Marlous willen toelichten?
                Dan plan ik er bewust een halfuur voor in volgende week.
                <br />
                <br />
                Hartelijke groet,
                <br />
                Jelle
              </div>
              <div className="tone__sig">— Jelle</div>
              <div className="tone__pat">
                <span>&ldquo;Hoi&rdquo; niet &ldquo;Beste&rdquo;</span>
                <span>alinea&rsquo;s</span>
                <span>één doordachte vraag</span>
                <span>volledige naam onder</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* TRIAGE BUCKETS */}
      <section className="s s--alt s--alt-mail">
        <div className="wrap">
          <div className="s__head">
            <p className="eyebrow">
              <span className="dot" /> wat triagen écht betekent
            </p>
            <h2 className="h-section h-section-mail">
              Vier bakjes —<br />
              en jij ziet alleen <em>bakje 1</em>.
            </h2>
            <p className="lede" style={{ marginTop: 14 }}>
              Een vol postvak is meestal niet een werkprobleem maar een
              sorteer&shy;probleem. Maestro deelt elke binnenkomende mail in
              vier bakjes en presenteert er één: dat ene bakje waar jij vandaag
              écht iets mee moet.
            </p>
          </div>

          <div className="buckets">
            <article className="bucket b-act">
              <span className="bucket__num">01</span>
              <span className="bucket__icon">
                <svg className="lc" viewBox="0 0 24 24">
                  <circle cx={12} cy={12} r={9} />
                  <path d="M12 8v4l3 2" />
                </svg>
              </span>
              <div className="bucket__t">Actie nodig — vandaag</div>
              <div className="bucket__d">
                Iemand wacht op een beslissing, akkoord of antwoord van jou.
                Concept staat klaar, jij hoeft alleen te lezen &amp; verzenden.
              </div>
              <div className="bucket__cnt">
                <span className="n">3</span>
                <span className="lbl">concepten klaar</span>
              </div>
            </article>
            <article className="bucket b-foll">
              <span className="bucket__num">02</span>
              <span className="bucket__icon">
                <svg className="lc" viewBox="0 0 24 24">
                  <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </span>
              <div className="bucket__t">Opvolgen — niet vandaag</div>
              <div className="bucket__d">
                Threads waar jij eerder geantwoord hebt en nu wacht op de ander.
                Maestro houdt de tijd bij en port jou zelf als het te lang duurt.
              </div>
              <div className="bucket__cnt">
                <span className="n">11</span>
                <span className="lbl">in afwachting</span>
              </div>
            </article>
            <article className="bucket b-info">
              <span className="bucket__num">03</span>
              <span className="bucket__icon">
                <svg className="lc" viewBox="0 0 24 24">
                  <path d="M12 16v-4M12 8h0" />
                  <circle cx={12} cy={12} r={9} />
                </svg>
              </span>
              <div className="bucket__t">Goed om te weten</div>
              <div className="bucket__d">
                CC&rsquo;s, nieuwsbrieven, &ldquo;ter info&rdquo; — geen actie
                nodig, maar wel onderdeel van het verhaal. Vat zichzelf samen in
                jouw weekoverzicht.
              </div>
              <div className="bucket__cnt">
                <span className="n">28</span>
                <span className="lbl">samengevat</span>
              </div>
            </article>
            <article className="bucket b-arc">
              <span className="bucket__num">04</span>
              <span className="bucket__icon">
                <svg className="lc" viewBox="0 0 24 24">
                  <rect x={3} y={4} width={18} height={4} rx={1} />
                  <path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" />
                  <path d="M10 12h4" />
                </svg>
              </span>
              <div className="bucket__t">Niets mee — archief</div>
              <div className="bucket__d">
                Auto-replies, ontvangst&shy;bevestigingen, bounces. Direct in
                archief, doorzoekbaar als je het nodig hebt — maar nooit in
                beeld.
              </div>
              <div className="bucket__cnt">
                <span className="n">63</span>
                <span className="lbl">opgeruimd</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SOURCES → DRAFT */}
      <section className="s">
        <div className="wrap">
          <div className="s__head">
            <p className="eyebrow">
              <span className="dot" /> waar het concept op leunt
            </p>
            <h2 className="h-section h-section-mail">
              Een mail uit Maestro is —<br />
              nooit zomaar — uit het <em>niets</em>.
            </h2>
            <p className="lede" style={{ marginTop: 14 }}>
              Achter elk concept zit een keten van bronnen die de agent
              geraadpleegd heeft. Klikbaar, controleerbaar, terug te lezen. Geen
              black box.
            </p>
          </div>

          <div className="flow">
            <div className="flow__col">
              <span className="flow__lbl">Bronnen geraadpleegd</span>
              <div className="flow__src">
                <span className="ico">
                  <svg className="lc" viewBox="0 0 24 24">
                    <rect x={3} y={5} width={18} height={14} rx={2} />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <span className="nm">Vorige thread</span>
                <span className="det">14 mails · sinds 2021</span>
              </div>
              <div className="flow__src">
                <span className="ico">
                  <svg className="lc" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                  </svg>
                </span>
                <span className="nm">Voorstel-document</span>
                <span className="det">Damsté v3 · p.7</span>
              </div>
              <div className="flow__src">
                <span className="ico">
                  <svg className="lc" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="nm">Telefoongesprek</span>
                <span className="det">di 14:08 · 12 min</span>
              </div>
              <div className="flow__src">
                <span className="ico">
                  <svg className="lc" viewBox="0 0 24 24">
                    <rect x={3} y={4} width={18} height={18} rx={2} />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </span>
                <span className="nm">Agenda-context</span>
                <span className="det">maandag 10:00 al gepland</span>
              </div>
              <div className="flow__src">
                <span className="ico">
                  <svg className="lc" viewBox="0 0 24 24">
                    <circle cx={12} cy={7} r={4} />
                    <path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
                  </svg>
                </span>
                <span className="nm">CRM-record · Bram</span>
                <span className="det">Damsté · €48k · in close</span>
              </div>
            </div>
            <div className="flow__arrow">
              <span className="lbl">Maestro stelt op</span>
              <svg
                viewBox="0 0 48 32"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
              >
                <path d="M2 16h40M30 6l12 10-12 10" />
              </svg>
              <span
                style={{
                  font: '500 11px var(--font-mono)',
                  color: 'var(--neutral-500)',
                  letterSpacing: '.06em',
                }}
              >
                in 47 sec.
              </span>
            </div>
            <div className="flow__col">
              <span className="flow__lbl">Concept op de plank</span>
              <div
                style={{
                  background: '#fff',
                  border: '1px solid var(--orange)',
                  borderRadius: 12,
                  padding: 20,
                  boxShadow: 'var(--shadow-md)',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: -10,
                    left: 18,
                    background: 'var(--orange)',
                    color: '#fff',
                    font: '500 10px var(--font-mono)',
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    padding: '4px 9px',
                    borderRadius: 9999,
                  }}
                >
                  concept · in jouw stijl
                </span>
                <div
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center',
                    paddingBottom: 12,
                    borderBottom: '1px solid var(--border-soft)',
                    marginBottom: 14,
                  }}
                >
                  <span
                    className="outlook__av av-orange"
                    style={{ width: 30, height: 30, fontSize: 11 }}
                  >
                    BV
                  </span>
                  <div>
                    <div style={{ font: '600 13.5px var(--font-sans)' }}>
                      Aan: Bram Visser
                    </div>
                    <div
                      style={{
                        font: '500 11.5px var(--font-mono)',
                        color: 'var(--neutral-500)',
                      }}
                    >
                      RE: Voorstel Damsté
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: 'var(--ink-3)',
                  }}
                >
                  Bram,
                  <br />
                  <br />
                  Helder, bedankt. We gaan ervoor maandag.
                  <br />
                  – stuur ik vrijdag de stukken
                  <br />
                  – jullie tekenen vóór 12:00
                  <br />
                  – maandag 10:00 Damsté, ik ben er
                  <br />
                  <br />
                  Tot dan.
                  <br />
                  <br />
                  <span
                    style={{
                      font: '500 11px var(--font-mono)',
                      color: 'var(--neutral-500)',
                      letterSpacing: '.06em',
                    }}
                  >
                    — J.
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    marginTop: 18,
                    paddingTop: 14,
                    borderTop: '1px dashed var(--border)',
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-orange"
                    style={{ height: 36, fontSize: 13 }}
                  >
                    Verstuur
                  </button>
                  <button
                    type="button"
                    className="btn"
                    style={{ height: 36, fontSize: 13 }}
                  >
                    Aanpassen
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    style={{
                      height: 36,
                      fontSize: 13,
                      marginLeft: 'auto',
                      color: 'var(--neutral-500)',
                    }}
                  >
                    Bronnen ▾
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTER STRIP */}
      <section className="counter">
        <div className="wrap counter__inner">
          <div className="counter__l">
            <span className="counter__pulse" />
            <div>
              <div className="counter__lbl">live · early-access teams · vandaag</div>
              <div
                style={{
                  font: '400 22px var(--font-serif)',
                  fontStyle: 'italic',
                  color: '#fff',
                  marginTop: 4,
                }}
              >
                Maestro draait mee bij 14 teams in Nederland.
              </div>
            </div>
          </div>
          <div className="counter__nums">
            <div>
              <span className="n" ref={mailsRef}>
                2.847
              </span>
              <span className="l">mails getrieerd</span>
            </div>
            <div>
              <span className="n" ref={draftsRef}>
                312
              </span>
              <span className="l">concepten klaargezet</span>
            </div>
            <div>
              <span className="n" ref={hoursRef}>
                68u
              </span>
              <span className="l">teruggegeven</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA (light orange) */}
      <section className="s">
        <div className="wrap">
          <div className="ma-cta">
            <p className="eyebrow">
              <span className="dot" /> klaar om te zien hoe jouw stijl eruit
              ziet?
            </p>
            <h2 className="h-section h-section-mail">
              Maestro koppelt aan <em>jouw postvak</em> —<br />
              jij ziet binnen een dag wat hij eruit haalt.
            </h2>
            <p
              className="lede"
              style={{ margin: '18px auto 28px', maxWidth: '60ch' }}
            >
              Eén gesprek van een half uur. Maestro draait in jouw eigen
              Microsoft- of Google-omgeving — wij sturen niets door, wij krijgen
              geen kopie. Je houdt de controle, jij ziet wat hij voorstelt.
            </p>
            <Link
              to={`${paths.prijzen}#cta`}
              className="btn btn-orange"
              style={{ height: 50, padding: '0 24px', fontSize: 15 }}
            >
              Plan een gesprek
              <svg className="lc" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  )
}
