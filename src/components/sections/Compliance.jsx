import Reveal from '../Reveal'

const DOES_NOT = [
  'Gestiona fondos externos o capital de clientes',
  'Presta asesoramiento financiero o de inversión personalizado',
  'Actúa como intermediario financiero o bróker',
  'Participa en el reparto de beneficios de cuentas de terceros',
  'Custodia activos de clientes',
  'Realiza operativa discrecional por cuenta de otros',
]

const FRAMEWORK = [
  'Exención de trading por cuenta propia (MiFID II art. 2(1)(d))',
  'Cumplimiento de la ley nacional chipriota (87(I)/2017)',
  'Directrices ESMA para operativa propietaria',
  'Servicios supervisados por CySEC',
  'Brokerage prestado por plataformas reguladas de terceros',
]

export default function Compliance() {
  return (
    <section id="compliance">
      <div className="container">
        <Reveal>
          <div className="eyebrow">05 — Compliance</div>
          <h2 className="display" style={{ marginTop: 22, maxWidth: '16ch' }}>
            Posición regulatoria <em>clara</em>
          </h2>
          <p className="lead" style={{ marginTop: 24, maxWidth: '60ch' }}>
            Operamos en estricto cumplimiento del marco regulatorio europeo. Al
            operar exclusivamente con capital propio y no gestionar fondos
            externos, Trivara se acoge a la exención del art. 2(1)(d) de MiFID II
            y no requiere licencia CIF de CySEC.
          </p>
        </Reveal>

        <div className="split" style={{ marginTop: 48, alignItems: 'start' }}>
          <Reveal>
            <div className="panel panel--gold">
              <h3>La compañía no</h3>
              <ul className="dashlist">
                {DOES_NOT.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="panel">
              <h3>Marco regulatorio</h3>
              <ul className="dashlist">
                {FRAMEWORK.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
