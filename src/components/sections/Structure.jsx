import Reveal from '../Reveal'

export default function Structure() {
  return (
    <section id="estructura">
      <div className="container">
        <Reveal>
          <div className="eyebrow">03 — Estructura</div>
          <h2 className="display" style={{ marginTop: 22, maxWidth: '16ch' }}>
            ARINX y <em>Vantage</em>
          </h2>
        </Reveal>

        <div className="split" style={{ marginTop: 48, alignItems: 'start' }}>
          <Reveal>
            <div className="card" style={{ height: '100%' }}>
              <div className="card__idx" style={{ fontFamily: 'inherit', fontStyle: 'normal', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                Filial · Licenciante
              </div>
              <h3 style={{ marginTop: 14 }}>ARINX Arcum Intelligence X LTD</h3>
              <p>
                ARINX licencia los robots bajo un modelo de software (SaaS).
                Quien licencia el software lo instala en su propia cuenta
                (MT4/MT5) y mantiene el control total y exclusivo de su capital:
                ARINX no accede a los fondos del cliente ni reparte beneficios.
                Trivara financia el desarrollo, los algoritmos y los modelos
                matemáticos, validados antes de su lanzamiento comercial.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="card" style={{ height: '100%' }}>
              <div className="card__idx" style={{ fontFamily: 'inherit', fontStyle: 'normal', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                Socio estratégico
              </div>
              <h3 style={{ marginTop: 14 }}>The Vantage Group</h3>
              <p>
                Colaboramos con el ecosistema Vantage, bróker global multi-activo
                regulado (ASIC, FCA, FSCA, VFSC), mediante un acuerdo de
                afiliación. Trivara actúa como conector y educador; no presta
                servicios financieros bajo licencias de Vantage ni gestiona
                fondos de clientes referidos.
              </p>
              <div className="reglist" style={{ marginTop: 18 }}>
                <span>ASIC — AFSL 428901</span>
                <span>FCA — OC376560</span>
                <span>FSCA — 51268</span>
                <span>VFSC — 700271</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
