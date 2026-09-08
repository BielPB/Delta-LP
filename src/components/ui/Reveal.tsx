import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'span'
  variant?: 'fade' | 'flip'
}

/**
 * Revela o conteúdo ao entrar na viewport. `variant="flip"` adiciona uma
 * leve rotação 3D em perspectiva (usado em cards). Vira um simples fade
 * estático quando prefers-reduced-motion.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  as = 'div',
  variant = 'fade',
}: RevealProps) {
  const reducedMotion = useReducedMotion()
  const Component = motion[as]

  const initial =
    variant === 'flip' && !reducedMotion
      ? { opacity: 0, y, rotateX: 12 }
      : { opacity: 0, y: reducedMotion ? 0 : y }

  return (
    <Component
      className={className}
      style={variant === 'flip' ? { transformPerspective: 1000 } : undefined}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: reducedMotion ? 0.2 : 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  )
}
