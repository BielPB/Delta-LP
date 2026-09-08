import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CorePrism } from '@/components/three/CorePrism'
import { usePointerParallax } from '@/hooks/usePointerParallax'
import { useScrollProgress } from '@/hooks/useScrollProgress'

type CoreRigProps = {
  interactive?: boolean
  reduceIntensity?: boolean
}

function OrbitingShards({ count = 3 }: { count?: number }) {
  const group = useRef<THREE.Group>(null)
  const shards = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        radius: 2.3 + i * 0.35,
        speed: 0.15 + i * 0.06,
        offset: (i / count) * Math.PI * 2,
        tilt: 0.3 + i * 0.25,
        scale: 0.16 - i * 0.02,
      })),
    [count],
  )

  useFrame((state) => {
    if (!group.current) return
    group.current.children.forEach((child, i) => {
      const s = shards[i]
      const t = state.clock.elapsedTime * s.speed + s.offset
      child.position.set(Math.cos(t) * s.radius, Math.sin(t * 0.8) * s.tilt, Math.sin(t) * s.radius)
      child.rotation.y = t * 2
      child.rotation.x = t
    })
  })

  return (
    <group ref={group}>
      {shards.map((s, i) => (
        <CorePrism key={i} scale={s.scale} glow={false} spin={0} opacity={0.85} />
      ))}
    </group>
  )
}

function EnergyRing() {
  const ring = useRef<THREE.Mesh>(null)
  useFrame((state, delta) => {
    if (!ring.current) return
    ring.current.rotation.z += delta * 0.35
    ring.current.rotation.x = Math.PI / 2.4 + Math.sin(state.clock.elapsedTime * 0.3) * 0.08
  })
  return (
    <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
      <torusGeometry args={[1.55, 0.006, 8, 96]} />
      <meshBasicMaterial color="#c6ff34" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  )
}

export function CoreRig({ interactive = true, reduceIntensity = false }: CoreRigProps) {
  const rig = useRef<THREE.Group>(null)
  const { pointer, tilt } = usePointerParallax()
  const scrollProgress = useScrollProgress()

  useFrame((state, delta) => {
    if (!rig.current) return

    const scrollTilt = scrollProgress.current * Math.PI * 0.6
    const targetX = (interactive ? pointer.current.y * 0.3 + tilt.current.y * 0.25 : 0) + scrollTilt * 0.15
    const targetZ = interactive ? pointer.current.x * -0.25 + tilt.current.x * -0.2 : 0

    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, targetX, 4, delta)
    rig.current.rotation.z = THREE.MathUtils.damp(rig.current.rotation.z, targetZ, 4, delta)
    rig.current.rotation.y += delta * (0.05 + scrollProgress.current * 0.08)
    rig.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08
  })

  return (
    <group ref={rig}>
      {!reduceIntensity && <OrbitingShards />}
      {!reduceIntensity && <EnergyRing />}
      <pointLight position={[3, 2, 3]} intensity={reduceIntensity ? 8 : 14} color="#c6ff34" distance={10} />
      <pointLight position={[-3, -1, -2]} intensity={4} color="#ffffff" distance={8} />
    </group>
  )
}
