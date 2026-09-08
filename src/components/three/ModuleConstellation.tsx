import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { CorePrism } from '@/components/three/CorePrism'
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

function ModuleNode({
  position,
  active,
  onSelect,
}: {
  position: THREE.Vector3
  active: boolean
  onSelect: () => void
}) {
  const group = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * (active ? 0.6 : 0.2)
    const targetScale = active ? 0.42 : 0.26
    const current = group.current.scale.x
    const next = THREE.MathUtils.damp(current, targetScale, 6, delta)
    group.current.scale.setScalar(next)
  })

  return (
    <group position={position}>
      <group ref={group}>
        <CorePrism
          scale={1}
          color={active ? '#161616' : '#0d0d0d'}
          edgeColor={active ? '#c6ff34' : '#5c6b2a'}
          opacity={active ? 1 : 0.75}
        />
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
      {active && <pointLight intensity={3} color="#c6ff34" distance={2.5} />}
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
