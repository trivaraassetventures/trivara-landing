import Reveal from '../Reveal'

const CAPABILITIES = [
  'Modelos HFT y algoritmos de ejecución',
  'Backtesting y entornos de simulación exhaustivos',
  '«Kill switch»: cancelación inmediata de órdenes',
  'Límites de posición y de frecuencia pre-trade',
  'Pipelines de datos de baja latencia (fibra óptica)',
  'Ejecución STP/ECN con agregación de liquidez',
  'Hosting VPS 24/5 para operativa ininterrumpida',
  'Compatible con MetaTrader 4, MetaTrader 5 y TradingView',
]

export default function Technology() {
  return (
    <section id="tecnologia">
      <div className="container">
        <Reveal>
          <div className="eyebrow">02 — Tecnología</div>
          <h2 className="display" style={{ marginTop: 22, maxWidth: '15ch' }}>
            Trading algorítmico <em>propietario</em>
          </h2>
        </Reveal>

        <div className="split" style={{ marginTop: 40, alignItems: 'start' }}>
          <Reveal>
            <p className="lead">
              Probamos nuestros robots y algoritmos de alta frecuencia en
              condiciones reales de mercado, usando exclusivamente capital
              corporativo. Este enfoque <em style={{ fontStyle: 'normal', color: 'var(--accent-cool)' }}>«prop-tech»</em> genera
              un track record operativo verificable que valida técnicamente el
              software.
            </p>
            <p className="lead" style={{ marginTop: 18 }}>
              Trivara y su filial ARINX implementan controles de gobernanza
              algorítmica alineados con las expectativas de los reguladores
              modernos, garantizando una tecnología robusta y segura para el
              usuario final.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="speclist">
              {CAPABILITIES.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
