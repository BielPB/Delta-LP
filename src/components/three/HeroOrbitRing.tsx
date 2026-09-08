import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePointerParallax } from '@/hooks/usePointerParallax'

function buildStarGeometry(outerRadius: number, innerRadius: number, points: number, tubeRadius: number) {
  const vertices: THREE.Vector3[] = []
  const step = Math.PI / points

  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius
    const angle = i * step - Math.PI / 2
    vertices.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0))
  }

  const curve = new THREE.CurvePath<THREE.Vector3>()
  for (let i = 0; i < vertices.length; i++) {
    curve.add(new THREE.LineCurve3(vertices[i], vertices[(i + 1) % vertices.length]))
  }

  return new THREE.TubeGeometry(curve, points * 16, tubeRadius, 6, true)
}

function Star() {
  const tilt = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)
  const { pointer, tilt: deviceTilt } = usePointerParallax()

  const geometry = useMemo(() => buildStarGeometry(1.65, 1.05, 5, 0.011), [])

  useFrame((_, delta) => {
    if (spin.current) {
      spin.current.rotation.z += delta * 0.18
    }
    if (tilt.current) {
      const targetX = pointer.current.y * 0.4 + deviceTilt.current.y * 0.35
      const targetY = pointer.current.x * 0.4 + deviceTilt.current.x * 0.35
      tilt.current.rotation.x = THREE.MathUtils.damp(tilt.current.rotation.x, targetX, 4, delta)
      tilt.current.rotation.y = THREE.MathUtils.damp(tilt.current.rotation.y, targetY, 4, delta)
    }
  })

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <mesh geometry={geometry}>
          <meshBasicMaterial
            color="#c6ff34"
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  )
}

/**
 * Fundo minimalista do Hero: um contorno fino em forma de estrela girando
 * em torno da logo, com leve inclinação 3D que segue o cursor (desktop) ou
 * a inclinação do aparelho (mobile, quando disponível). Substitui
 * partículas e fragmentos orbitando — só o essencial, sem competir com a
 * logo ou o texto.
 */
export function HeroOrbitRing({ className = '' }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Star />
      </Canvas>
    </div>
  )
}

export default HeroOrbitRing
