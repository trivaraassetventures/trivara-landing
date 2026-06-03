import { useEffect, useRef } from 'react'

/**
 * Premium magnetic cursor — a soft ring that follows the pointer with damping
 * and grows over interactive elements ([data-cursor="hover"]).
 */
export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = ref.current
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const target = { ...pos }
    let raf

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      const hover = e.target.closest('a, button, [data-cursor="hover"]')
      el.classList.toggle('cursor--hover', !!hover)
    }

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18
      pos.y += (target.y - pos.y) * 0.18
      el.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div className="cursor" ref={ref} aria-hidden="true" />
}
