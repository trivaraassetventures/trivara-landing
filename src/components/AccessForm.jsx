import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 1) Crea un formulario en https://formspree.io (gratis) y pega tu endpoint aquí.
//    O define VITE_FORM_ENDPOINT en un archivo .env.
const ENDPOINT =
  import.meta.env.VITE_FORM_ENDPOINT || 'https://formspree.io/f/your-form-id'

const PROFILES = [
  'Formación',
  'Consultoría empresarial',
  'Licencia de software (ARINX)',
  'Comunicación institucional',
  'Otro',
]

export default function AccessForm() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)

    // Honeypot: si el campo oculto viene relleno, es un bot.
    if (data.get('_company')) {
      setStatus('success')
      return
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="form-wrap">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="ok"
            className="form-success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="form-success__mark">✓</div>
            <h3>Solicitud recibida</h3>
            <p>
              Gracias por tu interés en Trivara. Nuestro equipo revisará tu
              consulta y te responderá en menos de 48 horas.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="form__row">
              <label className="field">
                <span>Nombre</span>
                <input name="nombre" type="text" required autoComplete="name" placeholder="Tu nombre" />
              </label>
              <label className="field">
                <span>Email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="tu@email.com" />
              </label>
            </div>

            <label className="field">
              <span>Motivo de la consulta</span>
              <select name="interes" required defaultValue="">
                <option value="" disabled>Selecciona un motivo</option>
                {PROFILES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Mensaje <em>(opcional)</em></span>
              <textarea name="mensaje" rows={3} placeholder="Cuéntanos brevemente tu interés" />
            </label>

            {/* Honeypot anti-spam (oculto a humanos) */}
            <input
              type="text"
              name="_company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
            />

            <button
              className="btn btn--primary"
              type="submit"
              data-cursor="hover"
              disabled={status === 'sending'}
              style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}
            >
              {status === 'sending' ? 'Enviando…' : 'Solicitar información →'}
            </button>

            {status === 'error' && (
              <p className="form__error">
                No se pudo enviar. Escríbenos a{' '}
                <a href="mailto:acceso@trivaraassetventures.com">acceso@trivaraassetventures.com</a>.
              </p>
            )}

            <p className="access__note" style={{ marginTop: 4 }}>
              Respuesta en menos de 48 horas · info@trivaraassetventures.com
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
