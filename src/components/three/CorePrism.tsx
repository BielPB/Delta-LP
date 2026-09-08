import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type CorePrismProps = {
  scale?: number
  color?: string
  edgeColor?: string
  spin?: number
  opacity?: number
  glow?: boolean
}

/**
 * Geometria procedural do "Delta Core": um bipiramide triangular (dois cones
 * de 3 lados unidos pela base) — a forma remete diretamente à letra grega
 * Delta (Δ) em cada face, ecoando o corte assimétrico da marca. Sem
 * dependência de arquivos 3D externos.
 */
export function CorePrism({
  scale = 1,
  color = '#111111',
  edgeColor = '#c6ff34',
  spin = 1,
  opacity = 1,
  glow = true,
}: CorePrismProps) {
  const group = useRef<THREE.Group>(null)
  const edgeMaterial = useRef<THREE.LineBasicMaterial>(null)
  const rimMaterial = useRef<THREE.MeshBasicMaterial>(null)

  const { solidGeometry, edgesGeometry, innerGeometry, rimGeometry } = useMemo(() => {
    const top = new THREE.ConeGeometry(1, 1.5, 3, 1, false)
    top.translate(0, 0.75, 0)
    const bottom = new THREE.ConeGeometry(1, 0.9, 3, 1, false)
    bottom.rotateX(Math.PI)
    bottom.translate(0, -0.45, 0)

    const merged = mergeGeometries([top, bottom])
    const edges = new THREE.EdgesGeometry(merged, 1)
    const inner = merged.clone()
    inner.scale(0.62, 0.62, 0.62)
    const rim = merged.clone()
    rim.scale(1.06, 1.06, 1.06)

    return { solidGeometry: merged, edgesGeometry: edges, innerGeometry: inner, rimGeometry: rim }
  }, [])

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12 * spin
    }
    const pulse = 0.65 + Math.sin(state.clock.elapsedTime * 1.4) * 0.25
    if (edgeMaterial.current) {
      edgeMaterial.current.opacity = pulse * opacity
    }
    if (rimMaterial.current) {
      rimMaterial.current.opacity = 0.12 * pulse * opacity
    }
  })

  return (
    <group ref={group} scale={scale}>
      <mesh geometry={solidGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={color}
          metalness={0.78}
          roughness={0.26}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
          iridescence={0.15}
          iridescenceIOR={1.3}
          transparent={opacity < 1}
          opacity={opacity}
        />
      </mesh>

      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial ref={edgeMaterial} color={edgeColor} transparent opacity={0.9 * opacity} />
      </lineSegments>

      <mesh geometry={innerGeometry}>
        <meshBasicMaterial color={edgeColor} wireframe transparent opacity={0.18 * opacity} />
      </mesh>

      {glow && (
        <mesh geometry={rimGeometry}>
          <meshBasicMaterial
            ref={rimMaterial}
            color={edgeColor}
            side={THREE.BackSide}
            transparent
            opacity={0.12 * opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  )
}

function mergeGeometries(geometries: THREE.BufferGeometry[]) {
  const positions: number[] = []
  const normals: number[] = []

  for (const geo of geometries) {
    const posAttr = geo.getAttribute('position')
    const normAttr = geo.getAttribute('normal')
    for (let i = 0; i < posAttr.count; i++) {
      positions.push(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i))
      normals.push(normAttr.getX(i), normAttr.getY(i), normAttr.getZ(i))
    }
  }

  const merged = new THREE.BufferGeometry()
  merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  merged.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  return merged
}
