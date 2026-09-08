import { useEffect, useRef } from 'react'

/**
 * Progresso de rolagem global (0..1) em um ref, sem re-render — para uso em
 * loops de animação (useFrame, requestAnimationFrame).
 */
export function useScrollProgress() {
  const progress = useRef(0)

  useEffect(() => {
    function handleScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.current = max > 0 ? window.scrollY / max : 0
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
