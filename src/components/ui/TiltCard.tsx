import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type TiltCardProps = {
  children: ReactNode
  className?: string
  intensity?: number
}

/** Cartão com leve inclinação 3D que segue o cursor (somente desktop com hover real). */
export function TiltCard({ children, className = '', intensity = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!canHover || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -intensity, y: px * intensity })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: tilt.x || tilt.y ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      style={{ transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
