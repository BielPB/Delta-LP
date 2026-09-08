import { useEffect, useMemo } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type RotatingLogoImageProps = {
  className?: string
  /** Segundos para uma volta completa de 360°. */
  duration?: number
  /** Ativa leve inclinação 3D seguindo o cursor, além do giro contínuo. */
  interactive?: boolean
  /** Espessura aparente (px) simulada ao girar. */
  thickness?: number
}

const SLICE_COUNT = 18

/**
 * Gira o render 3D real da marca (`/brand/delta-logo-lateral-3d.png`) usando
 * apenas transform CSS — nunca recria a forma em SVG/Canvas. Fundo original
 * do render (estúdio escuro) removido via matte de luminância para ficar
 * transparente (o arquivo fornecido não tinha alpha); pixels do símbolo e
 * do brilho não são alterados.
 *
 * Para simular espessura real ao girar (em vez de uma foto plana que
 * desaparece de perfil), a mesma imagem é empilhada em 18 camadas finas com
 * profundidade (`translateZ`) crescente — todas a MESMA imagem, sem
 * geometria inventada. De frente, as camadas se sobrepõem perfeitamente
 * (fica idêntico à imagem original); de perfil, a pilha revela um volume
 * sólido em vez de uma linha fina. Um leve desfoque crescente nas camadas
 * de trás funde as fatias num bloco único, sem listras visíveis, e o
 * brilho lime (`drop-shadow`) é aplicado por fora da rotação 3D — por isso
 * envolve o objeto em qualquer ângulo, inclusive de perfil e "de costas",
 * em vez de existir só quando a frente está virada para a câmera.
 *
 * Proporção preservada (`object-contain`, sem `width`/`height` fixos que
 * distorçam), sem filtro de cor no plano frontal. Respeita
 * prefers-reduced-motion.
 */
export function RotatingLogoImage({
  className = '',
  duration = 10,
  interactive = false,
  thickness = 18,
}: RotatingLogoImageProps) {
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

  const slices = useMemo(
    () =>
      Array.from({ length: SLICE_COUNT }, (_, i) => {
        const t = i / (SLICE_COUNT - 1) // 0 = camada de trás, 1 = camada da frente
        return {
          z: -thickness / 2 + t * thickness,
          // Curva suave (não linear): mantém brilho alto mesmo nas camadas de
          // trás, para o volume parecer "aceso" de qualquer ângulo, com um
          // leve desfoque crescente para as camadas se fundirem num só bloco
          // em vez de listras visíveis.
          brightness: 0.72 + Math.sqrt(t) * 0.28,
          blur: (1 - t) * 0.5,
          isFront: i === SLICE_COUNT - 1,
        }
      }),
    [thickness],
  )

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

  // Brilho lime persistente ao redor da silhueta, aplicado FORA do grupo com
  // preserve-3d (drop-shadow força achatamento de contexto 3D se aplicado ao
  // próprio grupo) — assim o brilho acompanha o objeto em qualquer ângulo,
  // inclusive de perfil ou de "costas", em vez de existir só de frente.
  const glowStyle = {
    perspective: 900,
    filter:
      'drop-shadow(0 0 10px rgba(198,255,52,0.5)) drop-shadow(0 0 26px rgba(198,255,52,0.28))',
  }

  return (
    <div className={className} style={fadeStyle}>
      <div className="h-full w-full" style={glowStyle}>
        <motion.div
          className="relative h-full w-full"
          style={{
            transformStyle: 'preserve-3d',
            rotateY,
            rotateX: interactive ? tiltX : 0,
            rotateZ: interactive ? tiltZ : 0,
          }}
        >
          {slices.map((slice, i) =>
            slice.isFront ? (
              <picture key={i} className="absolute inset-0 block" style={{ transform: `translateZ(${slice.z}px)` }}>
                <source srcSet="/brand/delta-logo-lateral-3d.webp" type="image/webp" />
                <img src="/brand/delta-logo-lateral-3d.png" alt="Delta" className="h-full w-full object-contain" />
              </picture>
            ) : (
              <img
                key={i}
                src="/brand/delta-logo-lateral-3d-core.webp"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-contain"
                style={{
                  transform: `translateZ(${slice.z}px)`,
                  filter: `brightness(${slice.brightness}) blur(${slice.blur}px)`,
                }}
              />
            ),
          )}
        </motion.div>
      </div>
    </div>
  )
}
