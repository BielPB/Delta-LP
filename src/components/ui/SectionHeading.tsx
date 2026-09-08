import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { RevealText } from '@/components/ui/RevealText'

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  const subColor = light ? 'text-black/60' : 'text-white/60'
  const headingClass = 'text-balance text-[clamp(1.75rem,4.5vw,3.25rem)] font-semibold leading-[1.08]'

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignClass}`}>
      {eyebrow && (
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-lime)]">
            {eyebrow}
          </span>
        </Reveal>
      )}
      {typeof title === 'string' ? (
        <RevealText as="h2" className={headingClass}>
          {title}
        </RevealText>
      ) : (
        <Reveal delay={0.05}>
          <h2 className={headingClass}>{title}</h2>
        </Reveal>
      )}
      {description && (
        <Reveal delay={0.1}>
          <p className={`text-balance text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed ${subColor}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
