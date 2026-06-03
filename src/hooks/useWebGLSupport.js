import { useEffect, useState } from 'react'

/**
 * Detects WebGL availability so we can fall back to a static hero
 * on unsupported / blocked devices instead of rendering a dead canvas.
 * Returns: null (checking) | true | false
 */
export default function useWebGLSupport() {
  const [supported, setSupported] = useState(null)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      setSupported(!!gl)
    } catch {
      setSupported(false)
    }
  }, [])

  return supported
}
