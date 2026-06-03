import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { vertexShader, fragmentShader } from './sphereShader'

/**
 * DataSphere — thousands of GPU-driven particles forming a breathing sphere.
 * Capital, liquidity & information flow. Reacts to the pointer.
 */
export default function DataSphere({ count = 18000, scrollRef }) {
  const pointsRef = useRef()
  const matRef = useRef()
  const { viewport } = useThree()

  // Smoothed mouse in world space + assemble progress
  const mouse = useRef(new THREE.Vector3(99, 99, 0))
  const targetMouse = useRef(new THREE.Vector3(99, 99, 0))
  const assemble = useRef(0)

  // Build particle geometry once
  const { positions, targets, chaos, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const targets = new Float32Array(count * 3)
    const chaos = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const radius = 1.9

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere -> perfectly even distribution
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const phi = i * 2.399963229728653 // golden angle
      const x = Math.cos(phi) * r
      const z = Math.sin(phi) * r

      const i3 = i * 3
      targets[i3] = x * radius
      targets[i3 + 1] = y * radius
      targets[i3 + 2] = z * radius

      // Scattered chaotic start (assembly animation)
      const cr = 5 + Math.random() * 7
      const ct = Math.random() * Math.PI * 2
      const cp = Math.acos(2 * Math.random() - 1)
      chaos[i3] = Math.sin(cp) * Math.cos(ct) * cr
      chaos[i3 + 1] = Math.sin(cp) * Math.sin(ct) * cr
      chaos[i3 + 2] = Math.cos(cp) * cr

      positions[i3] = chaos[i3]
      positions[i3 + 1] = chaos[i3 + 1]
      positions[i3 + 2] = chaos[i3 + 2]

      speeds[i] = 0.6 + Math.random() * 0.9
    }
    return { positions, targets, chaos, speeds }
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 2.4 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uMouseStrength: { value: 0 },
      uAssemble: { value: 0 },
      uColorCool: { value: new THREE.Color('#5bc8ff') },
      uColorWarm: { value: new THREE.Color('#c9a86a') },
      uOpacity: { value: 0.9 },
    }),
    []
  )

  useFrame((state, delta) => {
    const mat = matRef.current
    if (!mat) return

    // Assemble on load (ease toward 1)
    assemble.current += (1 - assemble.current) * Math.min(delta * 1.1, 0.1)
    mat.uniforms.uAssemble.value = assemble.current
    mat.uniforms.uTime.value = state.clock.elapsedTime

    // Pointer -> world space on z=0 plane
    const px = (state.pointer.x * viewport.width) / 2
    const py = (state.pointer.y * viewport.height) / 2
    targetMouse.current.set(px, py, 0)
    mouse.current.lerp(targetMouse.current, Math.min(delta * 5, 0.2))
    mat.uniforms.uMouse.value.copy(mouse.current)

    // Mouse strength fades in after assembly
    const strength = assemble.current > 0.6 ? 1 : 0
    mat.uniforms.uMouseStrength.value +=
      (strength - mat.uniforms.uMouseStrength.value) * Math.min(delta * 3, 0.2)

    // Dim the sphere after the hero so content stays readable.
    // Stays bright in the hero, fades to a calm ambient field as you scroll.
    const scroll = scrollRef?.current ?? 0
    const targetOpacity = THREE.MathUtils.lerp(0.9, 0.2, Math.min(scroll * 5, 1)) * assemble.current
    mat.uniforms.uOpacity.value += (targetOpacity - mat.uniforms.uOpacity.value) * Math.min(delta * 3, 0.2)

    // Gentle auto-rotation + pointer parallax
    const g = pointsRef.current
    if (g) {
      g.rotation.y += delta * 0.045
      const targetRotX = state.pointer.y * 0.18
      const targetRotZ = -state.pointer.x * 0.08
      g.rotation.x += (targetRotX - g.rotation.x) * Math.min(delta * 2, 0.1)
      g.rotation.z += (targetRotZ - g.rotation.z) * Math.min(delta * 2, 0.1)

      // Scroll: shift + shrink the sphere as the user reads
      const s = scrollRef?.current ?? 0
      const targetX = THREE.MathUtils.lerp(0, 1.9, Math.min(s * 2.4, 1))
      const targetScale = THREE.MathUtils.lerp(1, 0.58, Math.min(s * 2.4, 1))
      g.position.x += (targetX - g.position.x) * Math.min(delta * 2, 0.08)
      const sc = g.scale.x + (targetScale - g.scale.x) * Math.min(delta * 2, 0.08)
      g.scale.setScalar(sc)
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aTarget" args={[targets, 3]} />
        <bufferAttribute attach="attributes-aChaos" args={[chaos, 3]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
