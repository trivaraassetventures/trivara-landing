import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Smooth scroll (Lenis) + a normalized scroll-progress ref (0..1)
 * shared with the 3D scene so the sphere reacts to reading.
 */
export default function useSmoothScroll() {
  const progress = useRef(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ({ scroll, limit }) => {
      progress.current = limit > 0 ? scroll / limit : 0
    })

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return progress
}
