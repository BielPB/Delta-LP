import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type RotatingLogoImageProps = {
  className?: string
  /** Segundos para uma volta completa de 360°. */
  duration?: number
  /** Ativa leve inclinação 3D seguindo o cursor, além do giro contínuo. */
  interactive?: boolean
  /** Quando false, exibe a logo parada (sem giro contínuo). */
  spin?: boolean
}

/**
 * Gira o render 3D real da marca (`/brand/delta-logo-lateral-3d.png`) usando
 * apenas transform CSS — nunca recria a forma em SVG/Canvas. Fundo original
 * do render (estúdio escuro) removido via matte de luminância para ficar
 * transparente (o arquivo fornecido não tinha alpha); pixels do símbolo e
 * do brilho não são alterados. Proporção preservada (`object-contain`, sem
 * `width`/`height` fixos que distorçam), sem filtro de cor. Respeita
 * prefers-reduced-motion.
 */
export function RotatingLogoImage({ className = '', duration = 10, interactive = false, spin = true }: RotatingLogoImageProps) {
  const reducedMotion = useReducedMotion()
  const rotateY = useMotionValue(0)
  const tiltX = useSpring(0, { stiffness: 60, damping: 20 })
  const tiltZ = useSpring(0, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (reducedMotion || !spin) return
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
  }, [duration, reducedMotion, spin, rotateY])

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

  // Dissolve gradualmente a sombra/reflexo do render (parte inferior da
  // imagem) até a transparência total, em vez de recortar com uma borda
  // reta — assim a base da imagem sempre se funde com o fundo da seção,
  // qualquer que ele seja, sem deixar uma mancha ou "caixa" visível.
  const fadeMask = 'linear-gradient(to bottom, black 0%, black 62%, transparent 88%)'
  const fadeStyle = { maskImage: fadeMask, WebkitMaskImage: fadeMask } as const

  if (reducedMotion) {
    return (
      <div className={className} style={fadeStyle}>
        <picture>
          <source srcSet="/brand/delta-logo-lateral-3d.webp" type="image/webp" />
          <img src="/brand/delta-logo-lateral-3d.png" alt="Delta" className="h-full w-full object-contain" />
        </picture>
      </div>
    )
  }

  return (
    <div className={className} style={{ perspective: 900, ...fadeStyle }}>
      <picture>
        <source srcSet="/brand/delta-logo-lateral-3d.webp" type="image/webp" />
        <motion.img
          src="/brand/delta-logo-lateral-3d.png"
          alt="Delta"
          className="h-full w-full object-contain"
          style={{
            rotateY,
            rotateX: interactive ? tiltX : 0,
            rotateZ: interactive ? tiltZ : 0,
            transformStyle: 'preserve-3d',
          }}
        />
      </picture>
    </div>
  )
}
