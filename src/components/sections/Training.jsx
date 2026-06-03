import Reveal from '../Reveal'

const SKILLS = [
  'MQL4 / MQL5 (MetaTrader)',
  'Pine Script (TradingView)',
  'Python para finanzas y datos',
  'Backtesting y optimización',
  'Gestión de riesgo y de capital',
  'Análisis cuantitativo y estadística',
  'Automatización en mercado real',
  'Integración de APIs de brokers',
]

const FORMATS = [
  {
    title: 'Mentoría 1-a-1',
    body: 'Sesiones personalizadas con nuestros expertos y un plan a medida de tu nivel y objetivos.',
  },
  {
    title: 'Cursos online',
    body: 'Programas estructurados con contenido grabado y sesiones en directo, a tu ritmo.',
  },
  {
    title: 'Grupo de inversión',
    body: 'Comunidad de aprendizaje con sesiones grupales, análisis de mercado y networking.',
  },
]

export default function Training() {
  return (
    <section id="formacion">
      <div className="container">
        <Reveal>
          <div className="eyebrow">04 — Formación</div>
          <h2 className="display" style={{ marginTop: 22, maxWidth: '14ch' }}>
            Mentoría y <em>cursos</em>
          </h2>
          <p className="lead" style={{ marginTop: 24 }}>
            Años desarrollando software de trading algorítmico y gestionando
            operativa cuantitativa, ahora compartidos contigo. Programas para
            dar el salto al trading algorítmico, la programación financiera o el
            análisis cuantitativo, sea cual sea tu nivel. No se requiere
            experiencia previa en programación.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="chips" style={{ marginTop: 40 }}>
            {SKILLS.map((s) => (
              <span className="chip" key={s}>{s}</span>
            ))}
          </div>
        </Reveal>

        <div className="process process--3" style={{ marginTop: 48 }}>
          {FORMATS.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="process__step" data-cursor="hover">
                <div className="process__no">{String(i + 1).padStart(2, '0')}</div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
