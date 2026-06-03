import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <header className="hero" id="top">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
      >
        <motion.div variants={fade} className="eyebrow" style={{ justifyContent: 'center', marginBottom: 28 }}>
          Holding tecnológico · Larnaca, Chipre · HE 478995
        </motion.div>

        <motion.h1 variants={fade}>
          Tecnología propietaria para los <em>mercados financieros</em>
        </motion.h1>

        <motion.p variants={fade} className="hero__sub">
          Trivara Asset Ventures desarrolla software de trading algorítmico,
          forma a programadores financieros y asesora a empresas europeas.
          Operamos con capital propio; no gestionamos fondos de terceros.
        </motion.p>

        <motion.div variants={fade} className="hero__actions">
          <a className="btn btn--primary" href="#contacto" data-cursor="hover">
            Solicitar información →
          </a>
          <a className="btn btn--ghost" href="#compania" data-cursor="hover">
            Conoce la compañía
          </a>
        </motion.div>
      </motion.div>

      <div className="scroll-hint">
        <span />
        Scroll
      </div>
    </header>
  )
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}
