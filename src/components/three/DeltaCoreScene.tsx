import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { CoreRig } from '@/components/three/CoreRig'
import { Particles } from '@/components/three/Particles'
import { CoreFallback } from '@/components/three/CoreFallback'
import { useWebGLSupport } from '@/hooks/useWebGLSupport'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useMediaQuery'

type DeltaCoreSceneProps = {
  className?: string
  interactive?: boolean
  particles?: boolean
}

/**
 * Canvas 3D reutilizável do Delta Core. Detecta WebGL, respeita
 * prefers-reduced-motion, pausa a renderização quando fora da viewport ou
 * com a aba em segundo plano, e reduz DPR/partículas em mobile.
 */
export function DeltaCoreScene({
  className = '',
  interactive = true,
  particles = true,
}: DeltaCoreSceneProps) {
  const webglSupported = useWebGLSupport()
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    function handleVisibility() {
      setTabVisible(document.visibilityState === 'visible')
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  if (webglSupported === false || reducedMotion) {
    return <CoreFallback className={className} />
  }

  return (
    <div ref={containerRef} className={className}>
      {webglSupported === null ? (
        <CoreFallback className="h-full w-full" />
      ) : (
        <Canvas
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 6], fov: 40 }}
          frameloop={inView && tabVisible ? 'always' : 'never'}
        >
          <ambientLight intensity={0.35} />
          <Suspense fallback={null}>
            <CoreRig interactive={interactive && !isMobile} reduceIntensity={isMobile} />
            {particles && <Particles count={isMobile ? 90 : 220} />}
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}

export default DeltaCoreScene
