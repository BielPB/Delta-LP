import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePointerParallax } from '@/hooks/usePointerParallax'

function Ring() {
  const tilt = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Mesh>(null)
  const { pointer, tilt: deviceTilt } = usePointerParallax()

  useFrame((_, delta) => {
    if (spin.current) {
      spin.current.rotation.z += delta * 0.22
    }
    if (tilt.current) {
      const targetX = Math.PI / 2.3 + pointer.current.y * 0.32 + deviceTilt.current.y * 0.28
      const targetY = pointer.current.x * 0.32 + deviceTilt.current.x * 0.28
      tilt.current.rotation.x = THREE.MathUtils.damp(tilt.current.rotation.x, targetX, 4, delta)
      tilt.current.rotation.y = THREE.MathUtils.damp(tilt.current.rotation.y, targetY, 4, delta)
    }
  })

  return (
    <group ref={tilt} rotation={[Math.PI / 2.3, 0, 0]}>
      <mesh ref={spin}>
        <torusGeometry args={[1.65, 0.008, 8, 96]} />
        <meshBasicMaterial
          color="#c6ff34"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

/**
 * Fundo minimalista do Hero: um único arco fino girando em torno da logo,
 * com leve inclinação 3D que segue o cursor (desktop) ou a inclinação do
 * aparelho (mobile, quando disponível). Substitui partículas e fragmentos
 * orbitando — só o essencial, sem competir com a logo ou o texto.
 */
export function HeroOrbitRing({ className = '' }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Ring />
      </Canvas>
    </div>
  )
}

export default HeroOrbitRing
