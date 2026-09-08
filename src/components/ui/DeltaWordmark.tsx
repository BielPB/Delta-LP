type DeltaWordmarkProps = {
  className?: string
  /** Controla apenas a altura da imagem — a largura é sempre automática, para nunca distorcer a marca. */
  markHeightClassName?: string
  textClassName?: string
  markOnly?: boolean
}

/**
 * Lockup oficial: arquivo de imagem real da marca (`/public/brand/delta-mark.png`,
 * fundo transparente, sem recorte) + wordmark "delta" em Poppins ExtraBold como
 * texto vivo. Não recriar o ícone em SVG/CSS — usar sempre o arquivo original.
 */
export function DeltaWordmark({
  className = '',
  markHeightClassName = 'h-9',
  textClassName = 'text-2xl',
  markOnly = false,
}: DeltaWordmarkProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src="/brand/delta-mark.png" alt="Delta" className={`${markHeightClassName} w-auto`} />
      {!markOnly && (
        <span className={`font-extrabold leading-none tracking-tight text-[var(--color-lime)] ${textClassName}`}>
          delta
        </span>
      )}
    </span>
  )
}
