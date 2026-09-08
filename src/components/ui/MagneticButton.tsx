import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
}

/**
 * Envolve qualquer botão com um leve efeito magnético ao aproximar o cursor.
 * Ativo apenas em telas com hover real (desktop) e desativado com
 * prefers-reduced-motion.
 */
export function MagneticButton({ children, className = '' }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reducedMotion = useReducedMotion()
  const active = canHover && !reducedMotion

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!active || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    setPos({ x: x * 0.35, y: y * 0.35 })
  }

  function handleLeave() {
    setPos({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.4 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
