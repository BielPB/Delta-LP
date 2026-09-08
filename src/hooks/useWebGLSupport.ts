import { useEffect, useState } from 'react'

function detectWebGL(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    return Boolean(gl)
  } catch {
    return false
  }
}

/**
 * Detecta suporte real a WebGL no dispositivo. Retorna `null` enquanto a
 * verificação está em andamento (evita flash de fallback em navegadores capazes).
 */
export function useWebGLSupport() {
  const [supported, setSupported] = useState<boolean | null>(null)

  useEffect(() => {
    setSupported(detectWebGL())
  }, [])

  return supported
}
