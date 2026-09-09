import { useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type CylinderProps = {
  width: string
  height: string
  left: string
  z: number
}

function Cylinder({ width, height, left, z }: CylinderProps) {
  return (
    <div className="absolute bottom-0" style={{ width, height, left, zIndex: z }}>
      <div
        className="absolute inset-x-0 top-0 rounded-[999px]"
        style={{
          height: '34%',
          background: 'linear-gradient(150deg, #ffffff 0%, #e6e6e6 55%, #c7c7c7 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          top: '17%',
          borderBottomLeftRadius: '50% 14px',
          borderBottomRightRadius: '50% 14px',
          background: 'linear-gradient(to right, #adadad 0%, #f8f8f8 42%, #ececec 68%, #a3a3a3 100%)',
        }}
      />
    </div>
  )
}

type LogoPedestalProps = {
  className?: string
}

/**
 * Pedestal 3D (cilindros em CSS, sem imagem/fundo) para a logo do Hero:
 * cria a sensação de que a marca está apoiada sobre uma plataforma premium.
 * Acabamento branco/acinzentado; sombra e glow ambiente herdam o verde-lima
 * da iluminação já usada no Hero.
 */
export function LogoPedestal({ className = '' }: LogoPedestalProps) {
  const reducedMotion = useReducedMotion()
  const tiltX = useSpring(0, { stiffness: 50, damping: 20 })
  const tiltY = useSpring(0, { stiffness: 50, damping: 20 })

  useEffect(() => {
    if (reducedMotion) return

    function handleMove(event: PointerEvent) {
      const nx = (event.clientX / window.innerWidth) * 2 - 1
      const ny = (event.clientY / window.innerHeight) * 2 - 1
      tiltX.set(ny * -4)
      tiltY.set(nx * 4)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [reducedMotion, tiltX, tiltY])

  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      style={{
        perspective: 700,
        rotateX: reducedMotion ? 0 : tiltX,
        rotateY: reducedMotion ? 0 : tiltY,
        transformStyle: 'preserve-3d',
      }}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      {/* glow ambiente lime, herdado da iluminação do Hero */}
      <div className="absolute inset-x-[-10%] bottom-[4%] h-[55%] rounded-[999px] bg-[var(--color-lime)] opacity-[0.14] blur-2xl" />
      {/* sombra de contato, ancora o conjunto ao chão */}
      <div className="absolute inset-x-[8%] bottom-0 h-[14%] rounded-[999px] bg-black/55 blur-md" />

      <Cylinder width="46%" height="82%" left="27%" z={1} />
      <Cylinder width="34%" height="52%" left="1%" z={2} />
      <Cylinder width="30%" height="34%" left="69%" z={2} />
    </motion.div>
  )
}
