// Production portal lives in the Tornado app under /clients.
// Change this if the portal moves to a subdomain (e.g. portal.trivaraassetventures.com).
const PORTAL_URL = 'https://trivaraassetventures.com/clients'

export default function Nav() {
  return (
    <nav className="nav">
      <a className="nav__brand" href="#top">
        TRIVARA <span style={{ opacity: 0.55, fontSize: 9, letterSpacing: '0.25em' }}>ASSET VENTURES</span>
      </a>
      <div className="nav__links">
        <a href="#compania">Compañía</a>
        <a href="#tecnologia">Tecnología</a>
        <a href="#estructura">ARINX</a>
        <a href="#formacion">Formación</a>
        <a href="#contacto">Contacto</a>
        <a
          className="nav__cta"
          href={PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
        >
          Portal de cliente →
        </a>
      </div>
    </nav>
  )
}
