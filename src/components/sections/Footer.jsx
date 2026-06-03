export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div style={{ maxWidth: '52ch' }}>
            <div className="footer__brand">TRIVARA <span style={{ opacity: 0.55, fontSize: 11 }}>ASSET VENTURES</span></div>
            <p className="footer__legal" style={{ marginTop: 16 }}>
              Este sitio tiene carácter exclusivamente informativo. Trivara Asset
              Ventures Ltd. (HE 478995) es un holding registrado en Chipre
              dedicado a la formación especializada, la consultoría empresarial
              europea y el desarrollo de software propietario de trading
              algorítmico. La compañía no presta asesoramiento financiero
              personalizado, servicios de gestión discrecional ni intermediación
              financiera. Toda la actividad de brokerage la realizan terceros
              regulados. Los clientes son los únicos responsables de sus
              decisiones de inversión. Ni Trivara ni su filial ARINX gestionan
              carteras ni reciben dinero de los beneficios generados por los
              usuarios del software. Operar en los mercados financieros conlleva
              riesgo. Rentabilidades pasadas no garantizan resultados futuros.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 50, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: 12, color: 'var(--text-subtle)', letterSpacing: '0.04em', marginBottom: 12 }}>
                Compañía
              </p>
              <a href="#compania" data-cursor="hover" style={{ display: 'block', fontSize: 14, marginBottom: 8 }}>Quiénes somos</a>
              <a href="#tecnologia" data-cursor="hover" style={{ display: 'block', fontSize: 14, marginBottom: 8 }}>Tecnología</a>
              <a href="#estructura" data-cursor="hover" style={{ display: 'block', fontSize: 14, marginBottom: 8 }}>ARINX & Vantage</a>
              <a href="#compliance" data-cursor="hover" style={{ display: 'block', fontSize: 14 }}>Compliance</a>
            </div>
            <div>
              <p style={{ fontSize: 12, color: 'var(--text-subtle)', letterSpacing: '0.04em', marginBottom: 12 }}>
                Contacto
              </p>
              <a href="mailto:info@trivaraassetventures.com" data-cursor="hover" style={{ display: 'block', fontSize: 14, marginBottom: 8 }}>info@trivaraassetventures.com</a>
              <a href="#formacion" data-cursor="hover" style={{ display: 'block', fontSize: 14, marginBottom: 8 }}>Formación</a>
              <a href="#contacto" data-cursor="hover" style={{ display: 'block', fontSize: 14, marginBottom: 8 }}>Solicitar información</a>
              <a href="https://trivaraassetventures.com/clients" target="_blank" rel="noopener noreferrer" data-cursor="hover" style={{ display: 'block', fontSize: 14, color: 'var(--accent-warm)' }}>Portal de cliente →</a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Trivara Asset Ventures Ltd. Larnaca, Chipre · HE 478995.</span>
          <span>Aviso legal · Privacidad · Cookies</span>
        </div>
      </div>
    </footer>
  )
}
