import { useEffect, useRef } from 'react'

/**
 * Mantém a posição normalizada do ponteiro (-1..1) em um ref, sem causar
 * re-render a cada movimento — para consumo em loops de animação (useFrame).
 */
export function usePointerParallax() {
  const pointer = useRef({ x: 0, y: 0 })
  const tilt = useRef({ x: 0, y: 0 })

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }

    function handleOrientation(event: DeviceOrientationEvent) {
      if (event.beta === null || event.gamma === null) return
      tilt.current.x = Math.max(-1, Math.min(1, event.gamma / 30))
      tilt.current.y = Math.max(-1, Math.min(1, (event.beta - 45) / 30))
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('deviceorientation', handleOrientation, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [])

  return { pointer, tilt }
}
