import Reveal from '../Reveal'
import AccessForm from '../AccessForm'

export default function Contact() {
  return (
    <section id="contacto" className="access">
      <div className="container">
        <Reveal>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            06 — Contacto
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2>
            Consultas <em>institucionales</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lead" style={{ margin: '26px auto 0', textAlign: 'center' }}>
            Para formación, consultoría, licencias de tecnología o comunicación
            institucional, escríbenos. Te responderemos en menos de 48 horas.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <AccessForm />
        </Reveal>

        <div className="contact-info">
          <Reveal>
            <div className="contact-info__item">
              <span>Email</span>
              <a href="mailto:info@trivaraassetventures.com" data-cursor="hover">
                info@trivaraassetventures.com
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="contact-info__item">
              <span>Oficina registrada</span>
              <p>
                7 Georgiou Sepyri Street, Hector Complex, Office A101
                <br />
                Livadia 7060, Larnaca, Chipre
                <br />
                Registro: HE 478995
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
