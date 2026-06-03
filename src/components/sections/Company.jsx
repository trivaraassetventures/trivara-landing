import Reveal from '../Reveal'

const ACTIVITIES = [
  {
    idx: 'I',
    title: 'Formación especializada',
    body: 'Enseñamos lenguajes de programación aplicados a los mercados financieros, para que cada persona desarrolle sus propias herramientas cuantitativas y entienda la lógica algorítmica.',
  },
  {
    idx: 'II',
    title: 'Consultoría empresarial europea',
    body: 'Servicios estratégicos a empresas que buscan optimizar su toma de decisiones mediante el análisis de datos y soluciones tecnológicas avanzadas.',
  },
  {
    idx: 'III',
    title: 'Software propietario (IP)',
    body: 'Modelos de trading de alta frecuencia y algoritmos de ejecución, validados en mercado real utilizando exclusivamente capital de la compañía.',
  },
]

export default function Company() {
  return (
    <section id="compania">
      <div className="container">
        <Reveal>
          <div className="eyebrow">01 — Compañía</div>
          <h2 className="display" style={{ marginTop: 22, maxWidth: '16ch' }}>
            Un holding <em>diversificado</em>
          </h2>
        </Reveal>

        <div className="split" style={{ marginTop: 40, alignItems: 'start' }}>
          <Reveal>
            <p className="lead">
              Trivara Asset Ventures Ltd. es un holding con sede en Larnaca
              (Chipre), registrado bajo el número HE 478995. Opera en la
              intersección entre el desarrollo tecnológico, la consultoría
              empresarial y la operativa con capital propio.
            </p>
            <p className="lead" style={{ marginTop: 18 }}>
              Fundada por <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Iván Patuel Pons</strong>,{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Lluís Sendra Peretó</strong> y{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Jorge Monge Pérez</strong>.
            </p>
            <p className="lead" style={{ marginTop: 18 }}>
              A diferencia de una institución financiera tradicional, nuestros
              ingresos no provienen de gestionar carteras ni de asesorar
              inversiones de terceros, sino de tres actividades de alto valor
              añadido.
            </p>
          </Reveal>

          <div className="cards">
            {ACTIVITIES.map((a, i) => (
              <Reveal key={a.idx} delay={i * 0.1}>
                <div className="card" data-cursor="hover">
                  <div className="card__idx">{a.idx}</div>
                  <h3>{a.title}</h3>
                  <p>{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
