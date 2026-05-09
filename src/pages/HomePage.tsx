import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { paths } from '@/lib/paths'
import './HomePage.css'

const REASON_STEPS = [
  'Conflict in agenda detecteren — ontbijt-meeting bij klant Vroon loopt tot 09:30.',
  'Nieuw tijdstip voorstellen — Teams om 10:30, na ingerekende reistijd.',
  '47 vergelijkbare mails gevonden — intern, naar collega’s die ook handsfree vanuit de auto bellen.',
  'Schrijfstijl matchen — zonder aanhef, jij-vorm, korte zinnen.',
] as const

const STEP_LABELS = [
  '',
  'maandag · 07:42',
  'mail · joel van rijn',
  'maestro · denkt mee',
  'agenda · maandag 8 mei',
  'reistijd · utrecht → amsterdam',
  'agenda · concept klaargezet',
  'maestro · denken',
  'concept · in jouw stijl',
  'maestro · klaar',
] as const

const TOTAL = 9

/**
 * Slow the demo by 25% — adds roughly 10 seconds to the ~40s base sequence.
 * Multiplies every setTimeout delay (waits and per-character typewriter speed),
 * so the visual rhythm stays the same but everything breathes longer.
 */
const DEMO_SPEED = 1.25

export function HomePage() {
  useDocumentTitle('Maestro · Eén agent voor je hele werkplek')

  /* --------------------------------------------------------------------- */
  /*  Splash intro                                                         */
  /* --------------------------------------------------------------------- */
  const splashRef = useRef<HTMLDivElement>(null)
  const [splashVisible, setSplashVisible] = useState(false)

  const runSplash = useCallback((_force: boolean) => {
    const el = splashRef.current
    if (!el) return

    /* Replay the splash on every load — no sessionStorage check. */
    setSplashVisible(true)
    document.documentElement.style.overflow = 'hidden'
    el.classList.remove('is-leaving')
    /* Force reflow so the animation re-triggers when forced. */
    void el.offsetWidth
    el.classList.add('is-running')

    const hide = window.setTimeout(() => {
      el.classList.add('is-leaving')
      window.setTimeout(() => {
        setSplashVisible(false)
        el.classList.remove('is-running', 'is-leaving')
        document.documentElement.style.overflow = ''
      }, 600)
    }, 5000)

    return () => window.clearTimeout(hide)
  }, [])

  useEffect(() => {
    runSplash(false)
  }, [runSplash])

  const replayIntro = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.setTimeout(() => runSplash(true), 350)
  }, [runSplash])

  /* --------------------------------------------------------------------- */
  /*  Demo video — auto-playing scene sequence                             */
  /* --------------------------------------------------------------------- */
  const dvRef = useRef<HTMLDivElement>(null)
  const dvUrlRef = useRef<HTMLSpanElement>(null)
  const dvStepRef = useRef<HTMLSpanElement>(null)
  const dvIntro1Ref = useRef<HTMLSpanElement>(null)
  const dvIntro2Ref = useRef<HTMLSpanElement>(null)
  const dvCloseRef = useRef<HTMLSpanElement>(null)
  const dvr2TextRef = useRef<HTMLSpanElement>(null)
  const dvr2CountRef = useRef<HTMLSpanElement>(null)
  const dvdTextRef = useRef<HTMLSpanElement>(null)
  const timersRef = useRef<number[]>([])

  const setStep = useCallback((n: number) => {
    const dv = dvRef.current
    if (!dv) return
    dv.setAttribute('data-step', String(n))
    let bars = ''
    for (let i = 1; i <= TOTAL; i++) {
      bars += (i <= n ? '▮' : '▯') + (i < TOTAL ? ' ' : '')
    }
    if (dvStepRef.current) dvStepRef.current.textContent = bars
    if (dvUrlRef.current) dvUrlRef.current.textContent = STEP_LABELS[n] ?? ''
  }, [])

  const at = useCallback((ms: number, fn: () => void) => {
    const id = window.setTimeout(fn, ms * DEMO_SPEED)
    timersRef.current.push(id)
  }, [])

  const typeText = useCallback(
    (target: HTMLElement | null, str: string, speed: number, done?: () => void) => {
      if (!target) {
        done?.()
        return
      }
      let i = 0
      const tick = () => {
        if (i <= str.length) {
          target.textContent = str.slice(0, i)
          i++
          const id = window.setTimeout(tick, speed * DEMO_SPEED)
          timersRef.current.push(id)
        } else {
          done?.()
        }
      }
      tick()
    },
    [],
  )

  const eraseText = useCallback(
    (target: HTMLElement | null, speed: number, done?: () => void) => {
      if (!target) {
        done?.()
        return
      }
      const tick = () => {
        const current = target.textContent ?? ''
        if (current.length > 0) {
          target.textContent = current.slice(0, -1)
          const id = window.setTimeout(tick, speed * DEMO_SPEED)
          timersRef.current.push(id)
        } else {
          done?.()
        }
      }
      tick()
    },
    [],
  )

  const runReason = useCallback(
    (startIdx: number, done?: () => void) => {
      let idx = startIdx
      const next = () => {
        if (idx >= REASON_STEPS.length) {
          done?.()
          return
        }
        if (dvr2CountRef.current) {
          dvr2CountRef.current.textContent = `${('0' + (idx + 1)).slice(-2)} / 0${REASON_STEPS.length}`
        }
        typeText(dvr2TextRef.current, REASON_STEPS[idx], 20, () => {
          at(1320, () => {
            eraseText(dvr2TextRef.current, 7, () => {
              at(158, () => {
                idx++
                next()
              })
            })
          })
        })
      }
      next()
    },
    [at, eraseText, typeText],
  )

  const runDraft = useCallback(() => {
    setStep(8)
    const plain =
      'Joel — gaat helaas niet om 09:30. Tot dan zit ik nog in de auto na een ontbijt-meeting in Utrecht. Ik bel je om 10:30 vanuit de auto (handsfree, prima voor 15 min). Werkt dat?'
    const marked =
      'Joel — gaat helaas niet om 09:30. Tot dan zit ik nog in de auto na een <span class="hi">ontbijt-meeting in Utrecht</span>. Ik bel je om <span class="hi">10:30</span> vanuit de auto (<span class="hi">handsfree</span>, prima voor 15 min). Werkt dat?'

    at(396, () => {
      typeText(dvdTextRef.current, plain, 23, () => {
        at(396, () => {
          if (dvdTextRef.current) dvdTextRef.current.innerHTML = marked
          dvRef.current?.classList.add('is-sent')
        })
      })
    })

    at(7744, () => {
      setStep(9)
      typeText(
        dvCloseRef.current,
        'Het patroon was er al — Maestro pakt het op, in jouw stijl, in jouw tempo.',
        33,
      )
    })
  }, [at, setStep, typeText])

  const runDemo = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t))
    timersRef.current = []
    dvRef.current?.classList.remove('is-sent')
    if (dvIntro1Ref.current) dvIntro1Ref.current.textContent = ''
    if (dvIntro2Ref.current) dvIntro2Ref.current.textContent = ''
    if (dvCloseRef.current) dvCloseRef.current.textContent = ''
    if (dvr2TextRef.current) dvr2TextRef.current.textContent = ''
    if (dvdTextRef.current) dvdTextRef.current.textContent = ''

    setStep(1)
    typeText(dvIntro1Ref.current, 'Je ontvangt een mail van Joel.', 48)
    at(3168, () => setStep(2))
    at(7040, () => {
      setStep(3)
      typeText(dvIntro2Ref.current, 'Maestro opent je agenda…', 44)
    })
    at(9856, () => setStep(4))
    at(13552, () => setStep(5))
    at(17248, () => setStep(6))
    at(20944, () => {
      setStep(7)
      runReason(0, () => {
        at(106, runDraft)
      })
    })
  }, [at, runDraft, runReason, setStep, typeText])

  useEffect(() => {
    const dv = dvRef.current
    if (!dv) return
    let started = false
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && !started) {
              started = true
              runDemo()
              io.disconnect()
            }
          })
        },
        { threshold: 0.2 },
      )
      io.observe(dv)
      return () => {
        io.disconnect()
        timersRef.current.forEach((t) => window.clearTimeout(t))
        timersRef.current = []
      }
    }
    runDemo()
    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t))
      timersRef.current = []
    }
  }, [runDemo])

  /* --------------------------------------------------------------------- */
  /*  Markup                                                               */
  /* --------------------------------------------------------------------- */
  return (
    <>
      {/* SPLASH */}
      <div
        ref={splashRef}
        className="splash"
        id="splash"
        aria-hidden="true"
        style={{ display: splashVisible ? 'flex' : 'none' }}
      >
        <div className="splash__grid" />
        <div className="splash__glow" />
        <div className="splash__stage">
          <div className="splash__lines">
            <span className="sl sl--1">10.847 mails</span>
            <span className="sl sl--2">312 gesprekken</span>
            <span className="sl sl--3">87 deals</span>
            <span className="sl sl--4">5 jaar context</span>
            <span className="sl sl--5">jouw toon</span>
            <span className="sl sl--6">jouw klanten</span>
            <span className="sl sl--7">jouw routines</span>
            <span className="sl sl--8">jouw beslis&shy;regels</span>
          </div>
          <svg className="splash__brain" viewBox="0 0 200 180" aria-hidden="true">
            <defs>
              <radialGradient id="sgrad" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#ff8a4c" stopOpacity={0.55} />
                <stop offset="60%" stopColor="#dc6f3f" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#dc6f3f" stopOpacity={0} />
              </radialGradient>
            </defs>
            <ellipse cx={100} cy={90} rx={95} ry={75} fill="url(#sgrad)" />
            <path
              d="M70 35c-18 0-30 14-30 30 0 6 2 11 5 15-6 5-9 12-9 19 0 12 9 22 21 24 1 11 11 19 23 19 9 0 17-5 21-12 4 7 12 12 21 12 12 0 22-8 23-19 12-2 21-12 21-24 0-7-3-14-9-19 3-4 5-9 5-15 0-16-12-30-30-30-9 0-17 4-22 10-5-6-13-10-22-10z"
              fill="none"
              stroke="#dc6f3f"
              strokeWidth={1.4}
              opacity={0.75}
            />
            <path
              d="M100 45v90M70 60c10 8 20 8 30 0M70 110c10 8 20 8 30 0M130 60c-10 8-20 8-30 0M130 110c-10 8-20 8-30 0"
              fill="none"
              stroke="#ff8a4c"
              strokeWidth={1}
              opacity={0.55}
              strokeLinecap="round"
            />
            <circle cx={100} cy={90} r={4} fill="#ff8a4c" />
            <circle cx={70} cy={60} r={2} fill="#dc6f3f" />
            <circle cx={130} cy={60} r={2} fill="#dc6f3f" />
            <circle cx={70} cy={110} r={2} fill="#dc6f3f" />
            <circle cx={130} cy={110} r={2} fill="#dc6f3f" />
          </svg>
          <div className="splash__title">
            <span className="st__l1">Jouw brein,</span>
            <span className="st__l2">gedigitaliseerd.</span>
          </div>
          <div className="splash__sub">
            elke mail · elk gesprek · elke beslisregel — op de plank
          </div>
          <div className="splash__bar">
            <span />
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero__bg" />
        <div className="hero__grid" />

        <div className="rail rail--l">
          <span className="rail__chip">
            <strong>134</strong>&nbsp;voorstellen vandaag
          </span>
          <div className="rail__line" />
          <span className="rail__chip">postvak · agenda · admin</span>
          <div className="rail__line" />
          <span className="rail__chip">
            <strong>Wk&nbsp;19</strong>
          </span>
        </div>
        <div className="rail rail--r">
          <span className="rail__chip">NL-hosted</span>
          <div className="rail__line" />
          <span className="rail__chip">
            <strong>v&nbsp;0.4</strong>
          </span>
          <div className="rail__line" />
          <span className="rail__chip">
            early access · plek <strong>38</strong>&nbsp;/ 100
          </span>
        </div>

        <div className="wrap hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">
              <span className="dot" /> één agent voor je hele werkplek
            </p>
            <h1 className="h-display">
              Je werk
              <br />
              geleid
              <br />
              door <em>Maestro</em>.
            </h1>
            <p className="lede">
              Postvak, agenda, administratie, sales-administratie en taken —
              Maestro leert van al je verzonden mail, je agenda-regels en je
              klantgeschiedenis, en handelt vervolgens in{' '}
              <em
                style={{
                  color: 'var(--orange-deep)',
                  fontStyle: 'normal',
                  fontWeight: 600,
                }}
              >
                jouw
              </em>{' '}
              stijl.
            </p>
            <div className="hero__cta">
              <Link to={`${paths.prijzen}#cta`} className="btn btn-orange">
                Vraag early access aan
                <svg className="lc" viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <a className="btn" href="#features">
                Bekijk wat het doet
              </a>
            </div>
            <div className="hero__signals">
              <span>
                <svg className="lc check" viewBox="0 0 24 24" width={14} height={14}>
                  <path d="M5 12l5 5L20 7" />
                </svg>{' '}
                AVG-conform · NL-hosted
              </span>
              <span>
                <svg className="lc check" viewBox="0 0 24 24" width={14} height={14}>
                  <path d="M5 12l5 5L20 7" />
                </svg>{' '}
                Werkt met M365 &amp; Workspace
              </span>
              <span>
                <svg className="lc check" viewBox="0 0 24 24" width={14} height={14}>
                  <path d="M5 12l5 5L20 7" />
                </svg>{' '}
                Vanaf €79 / maand
              </span>
            </div>
          </div>

          <div className="hero__stack" aria-hidden="true">
            <div className="art-card c1">
              <div className="art-card__head">
                <div className="art-card__ic">
                  <svg className="lc" viewBox="0 0 24 24">
                    <rect x={3} y={5} width={18} height={14} rx={2} />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </div>
                <span className="art-card__t">Postvak</span>
                <span className="art-card__time">vandaag · 09:48</span>
              </div>
              <div className="art-card__body">
                <strong>Damsté Advocaten</strong> — concept klaar, in jouw
                schrijfstijl.
                <br />
                Gebaseerd op 47 vergelijkbare mails die je eerder verstuurde.
              </div>
              <div className="art-card__meta">
                <span className="ok">✓ klaar</span>
                <span>·</span>
                <span>jouw toon · 12s</span>
              </div>
            </div>

            <div className="art-card c2">
              <div className="art-card__head">
                <div
                  className="art-card__ic"
                  style={{ background: '#eef0ec', color: '#3a4137' }}
                >
                  <svg className="lc" viewBox="0 0 24 24">
                    <rect x={3} y={4} width={18} height={18} rx={2} />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <span className="art-card__t">Agenda</span>
                <span className="art-card__time">10:00 · vandaag</span>
              </div>
              <div className="art-card__body">
                <strong>Banning Advocaten</strong> — afspraak gereserveerd uit
                mail.
                <br />
                25 min reistijd toegevoegd, voorbereiding bijgesloten.
              </div>
              <div className="art-card__meta">
                <span className="ok">✓ geblokt</span>
                <span>·</span>
                <span>reistijd · briefing</span>
              </div>
            </div>

            <div className="art-card c3">
              <div className="art-card__head">
                <div
                  className="art-card__ic"
                  style={{ background: '#e9eef5', color: '#385a8e' }}
                >
                  <svg className="lc" viewBox="0 0 24 24">
                    <path d="M9 11l3 3 8-8" />
                    <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7" />
                  </svg>
                </div>
                <span className="art-card__t">Taken</span>
                <span className="art-card__time">net</span>
              </div>
              <div className="art-card__body">
                <strong>3 taken afgehandeld</strong> · 1 toegevoegd vanuit
                thread.
                <br />
                Sales-administratie bijgewerkt — €4.200 in pipeline.
              </div>
              <div className="art-card__meta">
                <span className="ok">✓ synced</span>
                <span>·</span>
                <span>HubSpot · Maestro Base</span>
              </div>
            </div>

            <span className="hero__live">
              <span className="dot-live" /> 134 voorstellen vandaag verwerkt
            </span>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <section className="strip">
        <div className="wrap strip__inner">
          <span className="strip__lbl">
            Vertrouwd door teams die hun middagen terug willen
          </span>
          <div className="strip__logos">
            <span className="strip__logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <path d="M3 19V5l9 7 9-7v14" />
              </svg>{' '}
              Legal Mind
            </span>
            <span className="strip__logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <path d="M4 21V7l8-4 8 4v14" />
                <path d="M9 21v-7h6v7" />
                <circle cx={12} cy={3} r={1.4} fill="currentColor" />
              </svg>{' '}
              Burggraaf Group
            </span>
            <span className="strip__logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <path d="M3 20l9-16 9 16H3z" />
                <path d="M9 20v-5h6v5" />
              </svg>{' '}
              Gowers Enterprises
            </span>
            <span className="strip__logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <circle cx={8} cy={12} r={5} />
                <circle cx={16} cy={12} r={5} />
              </svg>{' '}
              B&amp;G Intelligence
            </span>
          </div>
        </div>
      </section>

      {/* BREIN OP DE PLANK */}
      <section className="s s--ink" id="brein">
        <div className="wrap">
          <div className="pers" style={{ gridTemplateColumns: '1.05fr .95fr' }}>
            <div className="pers__copy">
              <p className="eyebrow" style={{ color: 'var(--orange-soft)' }}>
                <span className="dot" /> persoonlijke RAG
              </p>
              <h2 className="h-section" style={{ color: '#fff' }}>
                Jouw brein,
                <br />
                al je gesprekken,
                <br />
                op de <em>plank</em>.
              </h2>
              <p
                className="lede"
                style={{ color: 'rgba(255,255,255,.7)', marginTop: 18 }}
              >
                Je manier van werken, je klantkennis, je ongeschreven regels —
                gedigitaliseerd, zodat je agent precies handelt zoals jij zou
                doen. Je geeft Maestro één keer een richtlijn, en hij houdt zich
                er voor altijd aan.
              </p>
              <div className="pers__list" style={{ marginTop: 26 }}>
                {[
                  {
                    n: '01',
                    t: 'Reistijd-regel',
                    d: '"Boek altijd 1,5× de reistijd in mijn agenda bij een fysieke afspraak."',
                  },
                  {
                    n: '02',
                    t: 'Geen dubbele afspraken',
                    d: 'Geen dubbele concept-afspraken meer — Maestro checkt eerst je agenda en reistijd-regels voordat hij iets klaarzet.',
                  },
                  {
                    n: '03',
                    t: 'Stilzwijgende regels',
                    d: 'Cc Damsté altijd. Bij Anouk in jij-vorm, bij klant X geen calls vóór 11:00 — al die kleine regels die jij in je hoofd hebt, onthoudt Maestro voor je.',
                  },
                ].map((row) => (
                  <div
                    className="pers__row"
                    key={row.n}
                    style={{
                      background: 'rgba(255,255,255,.04)',
                      borderColor: 'rgba(255,255,255,.1)',
                    }}
                  >
                    <span className="num" style={{ color: 'var(--orange-soft)' }}>
                      {row.n}
                    </span>
                    <div>
                      <div className="t" style={{ color: '#fff' }}>
                        {row.t}
                      </div>
                      <div className="desc" style={{ color: 'rgba(255,255,255,.65)' }}>
                        {row.d}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                aspectRatio: '1/1',
                maxWidth: 480,
                margin: '0 auto',
                border: '1px solid rgba(255,255,255,.1)',
                borderRadius: 18,
                background:
                  'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(220,111,63,.16), transparent 70%)',
                padding: 32,
              }}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 200 200"
                fill="none"
                stroke="#dc6f3f"
                strokeWidth={1.1}
                strokeLinecap="round"
                style={{ width: '100%', height: '100%', opacity: 0.8 }}
              >
                <path d="M100 30 C 60 30, 38 56, 38 92 C 38 120, 52 140, 70 152 C 78 168, 92 174, 100 174 C 108 174, 122 168, 130 152 C 148 140, 162 120, 162 92 C 162 56, 140 30, 100 30 Z" />
                <path d="M100 30 V 174" strokeDasharray="2 4" />
                <path d="M62 70 C 76 78, 86 86, 92 100" />
                <path d="M138 70 C 124 78, 114 86, 108 100" />
                <path d="M70 120 C 84 124, 96 130, 100 140" />
                <path d="M130 120 C 116 124, 104 130, 100 140" />
                <circle cx={72} cy={82} r={2} fill="#dc6f3f" />
                <circle cx={128} cy={82} r={2} fill="#dc6f3f" />
                <circle cx={82} cy={110} r={2} fill="#dc6f3f" />
                <circle cx={118} cy={110} r={2} fill="#dc6f3f" />
                <circle cx={100} cy={94} r={2.4} fill="#dc6f3f" />
                <circle cx={96} cy={144} r={2} fill="#dc6f3f" />
                <text
                  x={100}
                  y={24}
                  fontFamily="Instrument Serif"
                  fontSize={10}
                  fontStyle="italic"
                  fill="#e88c63"
                  textAnchor="middle"
                >
                  jij
                </text>
              </svg>
              {[
                { pos: { top: '14%', left: '6%' }, text: 'Kort & direct' },
                { pos: { top: '18%', right: '4%' }, text: 'CC Bram' },
                { pos: { bottom: '18%', left: '6%' }, text: 'Niet bellen vóór 11:00' },
              ].map((chip, i) => (
                <span
                  key={i}
                  style={{
                    position: 'absolute',
                    ...chip.pos,
                    padding: '6px 10px',
                    borderRadius: 9999,
                    background: 'rgba(255,255,255,.06)',
                    border: '1px solid rgba(255,255,255,.12)',
                    font: '500 11px var(--font-sans)',
                    color: '#fff',
                  }}
                >
                  {chip.text}
                </span>
              ))}
              <span
                style={{
                  position: 'absolute',
                  bottom: '14%',
                  right: '4%',
                  padding: '6px 10px',
                  borderRadius: 9999,
                  background: 'rgba(220,111,63,.18)',
                  border: '1px solid rgba(220,111,63,.4)',
                  font: '500 11px var(--font-mono)',
                  color: 'var(--orange-soft)',
                }}
              >
                sales-mail → CRM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="s" id="features">
        <div className="wrap">
          <div className="s__head">
            <p className="eyebrow">
              <span className="dot" /> wat Maestro doet
            </p>
            <h2 className="h-section">
              Het patroon was er al —<br />
              Maestro <em>herhaalt</em> het.
            </h2>
            <p className="lede">
              Geen losse copilots, geen prompt-acrobatiek. Maestro neemt het
              terugkerende werk uit handen — met de context van jouw werk en je
              hele organisatie.
            </p>
          </div>

          <div className="caps">
            <article className="cap2">
              <div className="cap2__copy">
                <span className="label">01 · Postvak</span>
                <h3>
                  Concepten in <em>jouw stijl</em> — getraind op duizenden van
                  jouw eigen mails.
                </h3>
                <p className="lede">
                  Maestro analyseert al je verzonden mail uit Outlook of Gmail
                  en schrijft elk concept zoals jij zou schrijven. Je inbox is
                  netjes opgedeeld — incl. de stapel die je vergeet:{' '}
                  <strong>verstuurd &amp; in afwachting</strong>.
                </p>
                <ul>
                  <li>
                    Triage in{' '}
                    <strong>
                      Voor jou · Pin · Verstuurd &amp; in afwachting · Niet voor
                      jou
                    </strong>
                  </li>
                  <li>Geen sjablonen — concepten op basis van duizenden eigen mails</li>
                  <li>Toon per ontvanger: kort &amp; direct of warm &amp; uitgebreid</li>
                  <li>Taken automatisch uit threads gehaald</li>
                </ul>
              </div>
              <div className="cap2__shot">
                <div className="shot">
                  <div className="shot__bar">
                    <span className="shot__dots">
                      <span />
                      <span />
                      <span />
                    </span>
                    <span className="shot__url">maestro · postvak</span>
                  </div>
                  <div className="shot__skeleton">Postvak · drie concepten klaar</div>
                </div>
              </div>
            </article>

            <article className="cap2 flip">
              <div className="cap2__copy">
                <span className="label">02 · Agenda</span>
                <h3>
                  Afspraken die zichzelf <em>reserveren</em>.
                </h3>
                <p className="lede">
                  Een datum-voorstel in een mail wordt automatisch een
                  agenda-blok — met reistijd, voorbereiding en opvolg-taak.
                  Jouw agenda-regels (no-meeting-mornings, focus-blocks) blijven
                  leidend.
                </p>
                <ul>
                  <li>Mail-herkenning → directe agenda-block</li>
                  <li>Reistijd berekend op je vaste werkadressen</li>
                  <li>Briefing per afspraak met klantcontext</li>
                  <li>Opvolg-taken automatisch op de deal of klant</li>
                </ul>
              </div>
              <div className="cap2__shot">
                <div className="shot flip-rot">
                  <div className="shot__bar">
                    <span className="shot__dots">
                      <span />
                      <span />
                      <span />
                    </span>
                    <span className="shot__url">maestro · agenda</span>
                  </div>
                  <div className="shot__skeleton">Agenda · reistijd + briefing</div>
                </div>
              </div>
            </article>

            <article className="cap2">
              <div className="cap2__copy">
                <span className="label">03 · Administratie &amp; Sales</span>
                <h3>
                  Sales-admin die <em>meeschrijft</em> in elke conversatie.
                </h3>
                <p className="lede">
                  Een nieuwe deal in een mail wordt zonder tikwerk een record in
                  CRM. Urenboeking detecteert vergaderingen en concept-werk.
                  Facturatie gekoppeld aan klant, project en regels — klaar om
                  te verzenden.
                </p>
                <ul>
                  <li>Sales-admin uit threads en calls — automatisch in CRM</li>
                  <li>Urenboeking detecteert vergaderingen &amp; concept-werk</li>
                  <li>Facturatie-prep per klant, project en regel</li>
                  <li>Open invoices &amp; pipeline real-time inzichtelijk</li>
                </ul>
              </div>
              <div className="cap2__shot">
                <div className="scatter">
                  <div
                    style={{
                      font: '500 11px var(--font-mono)',
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      color: 'var(--neutral-500)',
                      marginBottom: 18,
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    Versnipperde bronnen → één administratie
                  </div>
                  <svg
                    className="scatter__lines"
                    viewBox="0 0 400 360"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <radialGradient id="schub" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#dc6f3f" stopOpacity={0.18} />
                        <stop offset="100%" stopColor="#dc6f3f" stopOpacity={0} />
                      </radialGradient>
                    </defs>
                    <circle cx={200} cy={180} r={120} fill="url(#schub)" />
                    <path
                      d="M58 70 Q150 130 200 180"
                      stroke="#dc6f3f"
                      strokeWidth={1.2}
                      fill="none"
                      strokeDasharray="3 4"
                      opacity={0.55}
                    />
                    <path
                      d="M340 56 Q260 130 200 180"
                      stroke="#dc6f3f"
                      strokeWidth={1.2}
                      fill="none"
                      strokeDasharray="3 4"
                      opacity={0.55}
                    />
                    <path
                      d="M48 280 Q130 230 200 180"
                      stroke="#dc6f3f"
                      strokeWidth={1.2}
                      fill="none"
                      strokeDasharray="3 4"
                      opacity={0.55}
                    />
                    <path
                      d="M352 296 Q280 240 200 180"
                      stroke="#dc6f3f"
                      strokeWidth={1.2}
                      fill="none"
                      strokeDasharray="3 4"
                      opacity={0.55}
                    />
                  </svg>
                  <div className="scatter__field">
                    {[
                      { name: 'HubSpot', cat: 'CRM · deals', bg: '#fff7e6' },
                      { name: 'Fireflies', cat: 'call-transcripts', bg: '#fff0f4' },
                      { name: 'Telefoon', cat: 'gespreks-notes', bg: '#e7f4ec' },
                      { name: 'Mailbox', cat: 'M365 · Gmail', bg: '#eaf1fb' },
                    ].map((src) => (
                      <div key={src.name}>
                        <span style={{ background: src.bg }} />
                        <div>
                          <div>{src.name}</div>
                          <div>{src.cat}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="scatter__hub">
                    <span className="scatter__hpulse" />
                    <span className="scatter__hlbl">
                      Maestro
                      <br />
                      <em>schrijft mee</em>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* DEMO VIDEO */}
      <section className="s s--alt s--demo-tight" id="demo">
        <div className="wrap">
          <div
            className="s__head"
            style={{
              textAlign: 'center',
              maxWidth: 820,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <p className="eyebrow" style={{ justifyContent: 'center' }}>
              <span className="dot" /> kijk mee terwijl Maestro doordenkt
            </p>
            <h2 className="h-section">
              Eén mail · één planning · één concept —<br />
              in <em>realtime</em>.
            </h2>
            <p className="lede" style={{ margin: '14px auto 0' }}>
              Joel wil de afspraak verzetten. Volg hoe Maestro de mail leest, de
              agenda opent, de reistijd berekent, hardop redeneert en een
              concept neerzet — alsof je &lsquo;m zelf dicteerde.
            </p>
          </div>

          <div className="dv" id="demoVid" data-step={0} ref={dvRef}>
            <div className="dv__chrome">
              <span className="dv__dots">
                <span />
                <span />
                <span />
              </span>
              <span className="dv__url" id="dvUrl" ref={dvUrlRef}>
                maestro
              </span>
              <span className="dv__step" id="dvStep" ref={dvStepRef}>
                ▯ ▯ ▯ ▯ ▯ ▯ ▯ ▯ ▯
              </span>
            </div>

            <div className="dv__stage">
              {/* Scene 1 */}
              <div className="dvs dvs--intro" data-scene="intro1">
                <div className="dvn">
                  <span className="dvn__eyebrow">Maandag · 07:42</span>
                  <div className="dvn__line">
                    <span ref={dvIntro1Ref} />
                    <span className="dvn__caret">▍</span>
                  </div>
                </div>
              </div>

              {/* Scene 2 */}
              <div className="dvs dvs--mail" data-scene="mail">
                <div className="dvm__head">
                  <div>
                    <div className="dvm__from">Joel van Rijn</div>
                    <div className="dvm__sub">Verzetten naar maandag 9:30?</div>
                  </div>
                  <span className="dvm__time">07:42</span>
                </div>
                <div className="dvm__body">
                  <p>
                    Hé — kunnen we maandag iets vroeger bellen, om{' '}
                    <span className="hi">09:30</span>? Wil even bijpraten over
                    Vroon voordat we de offerte dichttimmeren.
                  </p>
                  <p>Op kantoor, of Teams als je vanuit huis zit.</p>
                  <p style={{ marginTop: 18, opacity: 0.75 }}>— Joel</p>
                  <span className="dvm__zoom">tijdsindicatie gevonden</span>
                </div>
              </div>

              {/* Scene 3 */}
              <div className="dvs dvs--intro" data-scene="intro2">
                <div className="dvn">
                  <span className="dvn__eyebrow">Maestro · denkt mee</span>
                  <div className="dvn__line">
                    <span ref={dvIntro2Ref} />
                    <span className="dvn__caret">▍</span>
                  </div>
                </div>
              </div>

              {/* Scene 4 */}
              <div className="dvs dvs--cal" data-scene="cal">
                <div className="dvc__head">
                  Maandag 8 mei <span className="dvc__lbl">Agenda · jouw dag</span>
                </div>
                <div className="dvc__day">
                  {['08:00', '09:00', '10:00', '11:00'].map((h) => (
                    <div className="dvc__hour" key={h}>
                      <span>{h}</span>
                      <i />
                    </div>
                  ))}
                  <div className="dvc__block dvc__block--ex" style={{ top: '4%', height: '36%' }}>
                    <div className="dvc__t">Ontbijt-meeting · klant Vroon</div>
                    <div className="dvc__sub">08:00 → 09:30 · op locatie Utrecht</div>
                  </div>
                  <div className="dvc__block dvc__block--req" style={{ top: '42%', height: '14%' }}>
                    <div className="dvc__t">Joel wil bellen — 09:30</div>
                    <div className="dvc__sub">⚠ valt direct na ontbijt-meeting</div>
                  </div>
                </div>
              </div>

              {/* Scene 5 */}
              <div className="dvs dvs--travel" data-scene="travel">
                <div className="dvtv">
                  <div className="dvtv__head">
                    <span className="dvtv__lbl">Reistijd berekenen</span>
                    <span className="dvtv__sub">
                      Utrecht → Amsterdam · met filefactor
                    </span>
                  </div>
                  <div className="dvtv__map">
                    <svg
                      className="dvtv__svg"
                      viewBox="0 0 600 120"
                      preserveAspectRatio="none"
                    >
                      <path
                        className="dvtv__path"
                        d="M60 60 C 200 30, 400 90, 540 60"
                        fill="none"
                      />
                      <circle
                        className="dvtv__node dvtv__node--from"
                        cx={60}
                        cy={60}
                        r={9}
                      />
                      <circle
                        className="dvtv__node dvtv__node--to"
                        cx={540}
                        cy={60}
                        r={9}
                      />
                    </svg>
                    <span className="dvtv__city dvtv__city--from">Utrecht</span>
                    <span className="dvtv__city dvtv__city--to">Amsterdam</span>
                    <span className="dvtv__km">52 km</span>
                  </div>
                  <div className="dvtv__eq">
                    <span className="dvtv__op dvtv__op--a">
                      38<small>min</small>
                    </span>
                    <span className="dvtv__op dvtv__op--m">× 1.5</span>
                    <span className="dvtv__op dvtv__op--e">=</span>
                    <span className="dvtv__op dvtv__op--r">
                      57<small>min</small>
                    </span>
                  </div>
                  <div className="dvtv__cap">
                    file-factor verwerkt · reistijd gereserveerd in agenda
                  </div>
                </div>
              </div>

              {/* Scene 6 */}
              <div className="dvs dvs--cal" data-scene="cal2">
                <div className="dvc__head">
                  Maandag 8 mei{' '}
                  <span className="dvc__lbl dvc__lbl--ok">
                    Concept-afspraak klaargezet
                  </span>
                </div>
                <div className="dvc__day">
                  {['08:00', '09:00', '10:00', '11:00'].map((h) => (
                    <div className="dvc__hour" key={h}>
                      <span>{h}</span>
                      <i />
                    </div>
                  ))}
                  <div className="dvc__block dvc__block--ex" style={{ top: '4%', height: '36%' }}>
                    <div className="dvc__t">Ontbijt-meeting · klant Vroon</div>
                    <div className="dvc__sub">08:00 → 09:30 · op locatie Utrecht</div>
                  </div>
                  <div className="dvc__block dvc__block--add2" style={{ top: '42%', height: '23%' }}>
                    <div className="dvc__t">+57 min reistijd</div>
                    <div className="dvc__sub">Utrecht → Amsterdam · file-factor ×1.5</div>
                  </div>
                  <div
                    className="dvc__block dvc__block--concept"
                    style={{ top: '67%', height: '14%' }}
                  >
                    <div className="dvc__t">Concept · bellen met Joel</div>
                    <div className="dvc__sub">
                      10:30 — 10:45 · Teams · klaargezet door Maestro
                    </div>
                  </div>
                </div>
              </div>

              {/* Scene 7 — reasoning */}
              <div className="dvs dvs--reason" data-scene="reason">
                <div className="dvr2">
                  <div className="dvr2__head">
                    <span className="dvr2__lbl">Maestro denkt na</span>
                    <span className="dvr__pulse" />
                    <span className="dvr2__count" ref={dvr2CountRef}>
                      01 / 04
                    </span>
                  </div>
                  <div className="dvr2__body">
                    <div className="dvr2__line">
                      <span ref={dvr2TextRef} />
                      <span className="dvr2__caret">▍</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scene 8 — drafter */}
              <div className="dvs dvs--draft" data-scene="draft">
                <div className="dvd__bar">
                  <span>Concept · in jouw stijl</span>
                  <span className="dvd__pill">geen aanhef · informeel</span>
                </div>
                <div className="dvd__to">
                  <span className="lbl">Aan</span> Joel van Rijn{' '}
                  <span className="lbl" style={{ marginLeft: 14 }}>
                    Onderwerp
                  </span>{' '}
                  RE: Verzetten naar maandag 9:30?
                </div>
                <div className="dvd__body">
                  <span ref={dvdTextRef} />
                  <span className="dvd__caret">▍</span>
                </div>
                <div className="dvd__send">
                  <button type="button" className="dvd__btn">
                    Verstuur{' '}
                    <svg className="lc" viewBox="0 0 24 24" width={14} height={14}>
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                  <span className="dvd__ok">✓ Verzonden · 0 bewerkingen</span>
                </div>
              </div>

              {/* Scene 9 — closing */}
              <div className="dvs dvs--intro dvs--closing" data-scene="closing">
                <div className="dvn">
                  <span className="dvn__eyebrow dvn__eyebrow--ok">
                    ✓ Verzonden · 0 bewerkingen
                  </span>
                  <div className="dvn__line">
                    <span ref={dvCloseRef} />
                    <span className="dvn__caret">▍</span>
                  </div>
                  <button
                    type="button"
                    className="dvn__replay"
                    onClick={runDemo}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width={14}
                      height={14}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                    Bekijk opnieuw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WAT MAAKT MAESTRO ZO GOED */}
      <section className="s" id="watmaakt">
        <div className="wrap">
          <div className="s__head">
            <p className="eyebrow">
              <span className="dot" /> dit is wat het anders maakt
            </p>
            <h2 className="h-section">
              Niet één model voor iedereen —<br />
              één die alleen <em>jou</em> kent.
            </h2>
            <p className="lede">
              Eerder schreef je al duizenden mails, voerde je honderden
              gesprekken, zette je tientallen deals door. Maestro leest die
              historie — mail, admin, WhatsApp, telefoon&shy;gesprekken — en
              herkent de patronen die je zelf niet meer ziet. Een nieuwe mail is
              dan geen blanco vel: het is de samenvatting van 10.000 keer dat je
              dit eerder deed.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.05fr .95fr',
              gap: 48,
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                {
                  t: 'Patroon­herkenning over al je bronnen',
                  d: 'Mail, admin, WhatsApp, telefoon­gesprekken — één agent die alles ziet en de samenhang vindt.',
                  svg: (
                    <svg className="lc" viewBox="0 0 24 24" width={18} height={18}>
                      <path d="M3 12h18M3 6h18M3 18h18" />
                    </svg>
                  ),
                },
                {
                  t: 'Onderscheid tussen intern, extern, rang',
                  d: 'Maestro maakt zelf categorieën op basis van jouw historie: collega vs. klant, manager vs. junior, prospect vs. vaste relatie. De toon klopt automatisch.',
                  svg: (
                    <svg className="lc" viewBox="0 0 24 24" width={18} height={18}>
                      <rect x={3} y={5} width={18} height={14} rx={2} />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  ),
                },
                {
                  t: '10.000 mails als startpunt, niet één prompt',
                  d: 'Geen sjablonen, geen "schrijf in stijl van…". Maestro héeft jouw stijl al geleerd — inleiding, nuance, slot — voordat jij begint.',
                  svg: (
                    <svg className="lc" viewBox="0 0 24 24" width={18} height={18}>
                      <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
                      <circle cx={12} cy={12} r={3} />
                    </svg>
                  ),
                },
              ].map((row) => (
                <div
                  key={row.t}
                  style={{
                    display: 'flex',
                    gap: 14,
                    padding: '20px 22px',
                    background: '#fff',
                    border: '1px solid var(--border)',
                    borderRadius: 13,
                  }}
                >
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 9,
                      background: 'var(--orange-subtle)',
                      color: 'var(--orange-deep)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {row.svg}
                  </span>
                  <div>
                    <div style={{ font: '600 15px var(--font-sans)', marginBottom: 4 }}>
                      {row.t}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: 'var(--neutral-600)',
                        lineHeight: 1.55,
                      }}
                    >
                      {row.d}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                position: 'relative',
                background: 'linear-gradient(180deg, #fff 0%, #fffaf6 100%)',
                border: '1px solid var(--orange)',
                borderRadius: 18,
                padding: '36px 32px',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: -13,
                  left: 24,
                  background: 'var(--orange)',
                  color: '#fff',
                  font: '500 11px var(--font-mono)',
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  padding: '5px 11px',
                  borderRadius: 9999,
                }}
              >
                eerste reactie
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="var(--orange)"
                width={36}
                height={36}
                style={{ opacity: 0.4, marginBottom: 18 }}
              >
                <path d="M9 7H5a2 2 0 0 0-2 2v8h6V9zM21 7h-4a2 2 0 0 0-2 2v8h6V9z" />
              </svg>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 24,
                  lineHeight: 1.4,
                  letterSpacing: '-.01em',
                  color: 'var(--ink)',
                  margin: '0 0 24px',
                }}
              >
                Wat me het meeste verbaasde is dat de{' '}
                <em
                  style={{
                    color: 'var(--orange)',
                    fontStyle: 'italic',
                  }}
                >
                  inhoud klopt
                </em>{' '}
                — niet de stijl, de inhoud. Het kent het dossier, het kent de
                klant, het weet welke deal vorige week aan tafel lag. Een mail
                uit Maestro leest alsof ík hem dicteerde nadat ik er een halve
                dag over had nagedacht — en dat terwijl het ding er dertig
                seconden over deed.
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  paddingTop: 20,
                  borderTop: '1px solid var(--border-soft)',
                }}
              >
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9999,
                    background: 'var(--orange)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    font: '600 13px var(--font-accent)',
                  }}
                >
                  BG
                </span>
                <div>
                  <div style={{ font: '600 14px var(--font-sans)' }}>
                    Eigenaar · B&amp;G Intelligence
                  </div>
                  <div style={{ font: '500 12px var(--font-mono)', color: 'var(--neutral-500)' }}>
                    early-access · week 6
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="s s--ink" id="story">
        <div className="wrap">
          <div className="story">
            <div>
              <p className="eyebrow">
                <span className="dot" /> waarom Maestro is gebouwd
              </p>
              <h2 className="story__title" style={{ color: '#fff' }}>
                Een startup
                <br />
                op zoek naar
                <br />
                <em>schaalbaar&shy;heid</em>.
              </h2>
              <div
                className="story__sign"
                style={{ marginTop: 18, color: 'rgba(255,255,255,.55)' }}
              >
                <span className="av">JB</span>
                Founder, Maestro
              </div>
              <div className="story__stats">
                {[
                  { n: '4 u', l: 'Tijdwinst per dag · gem.' },
                  { n: '0', l: 'Tools die we vervingen — alles erbij' },
                  { n: '1', l: 'Werkplek, alle agents' },
                ].map((stat) => (
                  <div
                    className="story__stat"
                    key={stat.l}
                    style={{
                      background: 'rgba(255,255,255,.04)',
                      borderColor: 'rgba(255,255,255,.1)',
                      color: '#fff',
                    }}
                  >
                    <div className="num">
                      <em>{stat.n}</em>
                    </div>
                    <div className="lbl" style={{ color: 'rgba(255,255,255,.55)' }}>
                      {stat.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="story__body">
              <p className="story__p" style={{ color: 'rgba(255,255,255,.78)' }}>
                Maestro begon als{' '}
                <strong style={{ color: '#fff' }}>intern werktuig</strong> bij
                een startup die snel wilde groeien — zonder bij elke nieuwe
                klant ook een nieuwe rol te moeten aannemen. We wilden dat{' '}
                <strong style={{ color: '#fff' }}>
                  elk vak — sales, administratie, customer success, planning —
                  meegroeit
                </strong>{' '}
                met de organisatie, in plaats van dat het werk meegroeit met het
                aantal handen.
              </p>
              <p className="story__p" style={{ color: 'rgba(255,255,255,.78)' }}>
                Niet vier copilots in vier tabbladen. Eén werkplek, met agents
                die dezelfde feiten zien, dezelfde stijl spreken, en geleerd
                hebben hoe jij werkt. Wat eruit kwam noemden we{' '}
                <strong style={{ color: '#fff' }}>Maestro</strong>: de dirigent
                die de hele werkplek in tempo houdt.
              </p>
              <div
                className="story__pull"
                style={{ borderColor: 'var(--orange-soft)', color: '#fff' }}
              >
                &ldquo;Schaal&shy;baarheid en proces&shy;matig&shy;heid — dat
                is wat je krijgt door dit dagelijks te gebruiken. Niet sneller
                typen. Sneller besluiten.&rdquo;
              </div>
              <p className="story__p" style={{ color: 'rgba(255,255,255,.78)' }}>
                We delen Maestro nu met andere teams die hetzelfde probleem
                hebben. Voorlopig in{' '}
                <strong style={{ color: '#fff' }}>early access</strong> — omdat
                documentverwerking en training op jouw historie token-zwaar is,
                en we elke nieuwe gebruiker zorgvuldig willen onboarden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="s" id="cta">
        <div className="wrap">
          <div className="cta">
            <div className="cta__bg" />
            <div className="cta__inner">
              <p className="eyebrow" style={{ color: 'var(--orange-soft)' }}>
                <span className="dot" /> early access
              </p>
              <h2 className="cta__title">
                Misschien kan <em>jij</em> er<br />
                ook bij horen.
              </h2>
              <p className="cta__sub">
                Geen wachtrij, geen sales-funnel — gewoon een gesprek van een
                half uur waarin we kijken hoe we elkaar kunnen versterken. Past
                het, dan zetten we Maestro samen aan.
              </p>
              <div className="cta__buttons">
                <Link to={paths.prijzen} className="btn btn-orange">
                  Vraag early access aan
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
                  Bekijk prijzen
                </Link>
              </div>
            </div>

            <div className="cta__seats">
              <div className="lbl">Het gesprek</div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  fontSize: 14,
                  color: 'rgba(255,255,255,.78)',
                  lineHeight: 1.5,
                }}
              >
                <li>30 min &nbsp;·&nbsp; geen pitch, geen demo-script</li>
                <li>Wij vertellen waar we sterk in zijn, jij waar je tijd verliest</li>
                <li>Past het van twee kanten? Dan beginnen we samen</li>
              </ul>
              <div className="small" style={{ marginTop: 14 }}>
                NL-team · we komen ook bij je langs
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onReplayIntro={replayIntro} />
    </>
  )
}
