type CoreFallbackProps = {
  className?: string
}

/**
 * Representação estática em CSS/SVG do Delta Core, usada quando WebGL não
 * está disponível, quando o dispositivo é de baixa potência, ou quando
 * prefers-reduced-motion está ativo. Nunca deixa a cena vazia.
 */
export function CoreFallback({ className = '' }: CoreFallbackProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div
        className="absolute h-2/3 w-2/3 rounded-full opacity-30 blur-3xl motion-safe:animate-pulse"
        style={{ background: 'radial-gradient(circle, var(--color-lime) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 400 400"
        className="relative h-full w-full max-w-[420px]"
        role="img"
        aria-label="Símbolo Delta em forma de prisma triangular"
      >
        <defs>
          <linearGradient id="delta-face" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
        </defs>
        <polygon points="200,60 320,320 80,320" fill="url(#delta-face)" stroke="#c6ff34" strokeWidth="2.5" />
        <polygon
          points="200,60 320,320 200,320"
          fill="#c6ff34"
          opacity="0.06"
        />
        <line x1="200" y1="60" x2="200" y2="320" stroke="#c6ff34" strokeWidth="1" opacity="0.5" />
        <polygon
          points="200,150 258,300 142,300"
          fill="none"
          stroke="#c6ff34"
          strokeWidth="1"
          opacity="0.35"
        />
      </svg>
    </div>
  )
}
