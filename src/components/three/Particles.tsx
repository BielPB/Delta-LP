import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type ParticlesProps = {
  count?: number
  radius?: number
  color?: string
}

export function Particles({ count = 220, radius = 4.5, color = '#c6ff34' }: ParticlesProps) {
  const points = useRef<THREE.Points>(null)
  const material = useRef<THREE.PointsMaterial>(null)

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = radius * (0.4 + Math.random() * 0.6)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      array[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      array[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      array[i * 3 + 2] = r * Math.cos(phi)
    }
    return array
  }, [count, radius])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
    if (material.current) {
      material.current.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 0.8) * 0.15
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        color={color}
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  )
}
