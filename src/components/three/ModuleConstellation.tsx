import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import type { ServiceModule } from '@/data/services'

type ModuleConstellationProps = {
  modules: ServiceModule[]
  activeIndex: number
  onSelect: (index: number) => void
}

const RADIUS = 2.7

function useNodePositions(count: number) {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2
      return new THREE.Vector3(Math.cos(angle) * RADIUS, Math.sin(angle) * RADIUS * 0.62, 0)
    })
  }, [count])
}

function Hub() {
  const group = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.15
  })
  return (
    <group ref={group}>
      <pointLight intensity={6} color="#c6ff34" distance={5} />
      <pointLight intensity={2} color="#ffffff" distance={4} position={[1, 1, 1]} />
    </group>
  )
}

/**
 * Nó de módulo: um pequeno poliedro sólido (sem wireframe) com brilho
 * proporcional ao estado ativo, envolto por um halo aditivo lime — lê como
 * um ponto de luz na "constelação", coerente com o brilho do núcleo
 * central, em vez de uma pirâmide em arame que se perde em telas pequenas.
 */
function ModuleNode({
  position,
  active,
  onSelect,
}: {
  position: THREE.Vector3
  active: boolean
  onSelect: () => void
}) {
  const spin = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const halo = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (spin.current) {
      spin.current.rotation.y += delta * (active ? 0.5 : 0.18)
      spin.current.rotation.x += delta * (active ? 0.22 : 0.08)
    }
    const targetScale = active ? 0.24 : 0.13
    if (core.current) {
      core.current.scale.setScalar(THREE.MathUtils.damp(core.current.scale.x, targetScale, 6, delta))
    }
    if (halo.current) {
      const targetHalo = targetScale * (active ? 1.35 : 1.15)
      halo.current.scale.setScalar(THREE.MathUtils.damp(halo.current.scale.x, targetHalo, 6, delta))
    }
  })

  const glowColor = active ? '#c6ff34' : '#7a8a3f'

  return (
    <group position={position}>
      <group ref={spin}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={active ? '#1c1c1a' : '#111110'}
            emissive={glowColor}
            emissiveIntensity={active ? 0.8 : 0.22}
            roughness={0.35}
            metalness={0.5}
          />
        </mesh>
        <mesh ref={halo}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color="#c6ff34"
            transparent
            opacity={active ? 0.12 : 0.04}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
      <mesh
        onClick={onSelect}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <sphereGeometry args={[0.55, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {active && <pointLight intensity={1.6} color="#c6ff34" distance={2} />}
    </group>
  )
}

export function ModuleConstellation({ modules, activeIndex, onSelect }: ModuleConstellationProps) {
  const positions = useNodePositions(modules.length)

  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.75]}
    >
      <ambientLight intensity={0.3} />
      <Hub />
      {positions.map((pos, i) => (
        <group key={modules[i].id}>
          <Line
            points={[[0, 0, 0], [pos.x, pos.y, pos.z]]}
            color={i === activeIndex ? '#c6ff34' : '#3a3a3a'}
            transparent
            opacity={i === activeIndex ? 0.8 : 0.35}
            lineWidth={1}
          />
          <ModuleNode position={pos} active={i === activeIndex} onSelect={() => onSelect(i)} />
        </group>
      ))}
    </Canvas>
  )
}

export default ModuleConstellation
