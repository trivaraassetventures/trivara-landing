import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Brand preloader. Holds the curtain while fonts + the first frame settle,
 * then lifts to reveal the assembling sphere. Fades on window load (capped).
 */
export default function Preloader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    let timer
    const finish = () => {
      timer = setTimeout(() => setDone(true), 600)
    }
    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    // Hard cap so we never trap the user behind the curtain
    const cap = setTimeout(() => setDone(true), 2600)
    return () => {
      window.removeEventListener('load', finish)
      clearTimeout(timer)
      clearTimeout(cap)
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        >
          <motion.div
            className="preloader__brand"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.32em' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            TRIVARA
          </motion.div>
          <div className="preloader__bar">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
