import { useEffect, useRef } from 'react'

/** Extensão não padronizada do iOS 13+: exige permissão pedida a partir de um gesto do usuário. */
type DeviceOrientationEventIOS = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

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

    const DeviceOrientationEventCtor = window.DeviceOrientationEvent as
      | DeviceOrientationEventIOS
      | undefined

    if (typeof DeviceOrientationEventCtor?.requestPermission === 'function') {
      // iOS 13+ só libera o evento após permissão pedida dentro de um gesto
      // do usuário — aguarda o primeiro toque/clique para pedir.
      function requestPermission() {
        DeviceOrientationEventCtor
          ?.requestPermission?.()
          .then((state) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation, { passive: true })
            }
          })
          .catch(() => {})
      }

      window.addEventListener('click', requestPermission, { once: true, passive: true })

      return () => {
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('click', requestPermission)
        window.removeEventListener('deviceorientation', handleOrientation)
      }
    }

    // Android e desktop: evento disponível sem permissão explícita.
    window.addEventListener('deviceorientation', handleOrientation, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [])

  return { pointer, tilt }
}
