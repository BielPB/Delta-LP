import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useWebGLSupport } from '@/hooks/useWebGLSupport'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const HeroOrbitRing = lazy(() => import('@/components/three/HeroOrbitRing'))

function StaticArc({ className = '' }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <ellipse
          cx="50"
          cy="50"
          rx="46"
          ry="17"
          fill="none"
          stroke="#c6ff34"
          strokeWidth="0.6"
          opacity="0.4"
          transform="rotate(-12 50 50)"
        />
      </svg>
    </div>
  )
}

type HeroBackgroundProps = {
  className?: string
}

/**
 * Wrapper do arco de fundo do Hero: carrega o Canvas 3D de forma
 * assíncrona, pausa a renderização fora da viewport ou com a aba oculta, e
 * cai para um arco estático em SVG sem WebGL ou com prefers-reduced-motion.
 */
export function HeroBackground({ className = '' }: HeroBackgroundProps) {
  const webglSupported = useWebGLSupport()
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (webglSupported === false || reducedMotion) {
    return <StaticArc className={className} />
  }

  return (
    <div ref={containerRef} className={className}>
      {webglSupported && inView && (
        <Suspense fallback={null}>
          <HeroOrbitRing className="h-full w-full" />
        </Suspense>
      )}
    </div>
  )
}

export default HeroBackground
