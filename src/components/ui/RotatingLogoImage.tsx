import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type RotatingLogoImageProps = {
  className?: string
  /** Segundos para uma volta completa de 360°. */
  duration?: number
  /** Ativa leve inclinação 3D seguindo o cursor, além do giro contínuo. */
  interactive?: boolean
}

/**
 * Gira o arquivo real da marca (`/brand/delta-mark.png`) em 3D usando apenas
 * transform CSS — nunca recria a forma em SVG/Canvas. Proporção original
 * preservada (`object-contain`, sem `width`/`height` fixos que distorçam),
 * fundo transparente, sem filtro de cor. Respeita prefers-reduced-motion.
 */
export function RotatingLogoImage({ className = '', duration = 10, interactive = false }: RotatingLogoImageProps) {
  const reducedMotion = useReducedMotion()
  const rotateY = useMotionValue(0)
  const tiltX = useSpring(0, { stiffness: 60, damping: 20 })
  const tiltZ = useSpring(0, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (reducedMotion) return
    let raf: number
    let last = performance.now()
    const degreesPerSecond = 360 / duration

    function tick(now: number) {
      const delta = (now - last) / 1000
      last = now
      rotateY.set(rotateY.get() + degreesPerSecond * delta)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [duration, reducedMotion, rotateY])

  useEffect(() => {
    if (!interactive || reducedMotion) return

    function handleMove(event: PointerEvent) {
      const nx = (event.clientX / window.innerWidth) * 2 - 1
      const ny = (event.clientY / window.innerHeight) * 2 - 1
      tiltX.set(ny * 10)
      tiltZ.set(nx * -8)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [interactive, reducedMotion, tiltX, tiltZ])

  if (reducedMotion) {
    return (
      <div className={className}>
        <img src="/brand/delta-mark.png" alt="Delta" className="h-full w-full object-contain" />
      </div>
    )
  }

  return (
    <div className={className} style={{ perspective: 900 }}>
      <motion.img
        src="/brand/delta-mark.png"
        alt="Delta"
        className="h-full w-full object-contain"
        style={{
          rotateY,
          rotateX: interactive ? tiltX : 0,
          rotateZ: interactive ? tiltZ : 0,
          transformStyle: 'preserve-3d',
        }}
      />
    </div>
  )
}
