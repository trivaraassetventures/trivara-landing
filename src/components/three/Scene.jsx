import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { AdaptiveDpr, Preload } from '@react-three/drei'
import DataSphere from './DataSphere'

// Fewer particles on mobile / low-power devices
const isMobile =
  typeof navigator !== 'undefined' &&
  /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
const PARTICLES = isMobile ? 7000 : 18000

export default function Scene({ scrollRef }) {
  return (
    <div className="scene-canvas">
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7], fov: 42 }}
      // Canvas is pointer-events:none (behind content), so source pointer
      // events from the whole document and read them as client coords.
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
    >
      <color attach="background" args={['#05060a']} />
      <fog attach="fog" args={['#05060a', 8, 16]} />

      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <DataSphere count={PARTICLES} scrollRef={scrollRef} />
        <Preload all />
      </Suspense>

      <EffectComposer disableNormalPass>
        <Bloom
          intensity={0.55}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.5}
          mipmapBlur
          radius={0.55}
        />
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
      </EffectComposer>

      <AdaptiveDpr pixelated />
    </Canvas>
    </div>
  )
}
