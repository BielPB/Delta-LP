import type { ReactNode } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { TiltCard } from '@/components/ui/TiltCard'

const pillars: { title: string; description: string; icon: ReactNode }[] = [
  {
    title: 'Visão completa',
    description: 'Enxergamos marca, conteúdo, mídia, tecnologia e atendimento como partes do mesmo caminho.',
    icon: (
      <>
        <polygon points="20,8 34,30 6,30" fill="none" stroke="currentColor" strokeWidth="2" />
        <polygon points="20,18 27,30 13,30" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      </>
    ),
  },
  {
    title: 'Produção com intenção',
    description: 'Cada roteiro, cena, design e anúncio nasce com uma função definida.',
    icon: (
      <>
        <polygon points="20,8 34,30 6,30" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="24" r="3" fill="currentColor" />
      </>
    ),
  },
  {
    title: 'Proximidade estratégica',
    description: 'Acompanhamos decisões, aprendizados e próximos movimentos.',
    icon: (
      <>
        <polygon points="17,10 27,28 7,28" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="30" cy="14" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="22" y1="15" x2="27" y2="14" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      </>
    ),
  },
  {
    title: 'Execução consistente',
    description: 'Transformamos o planejamento em uma cadência real de entregas.',
    icon: (
      <>
        <polygon points="9,28 14,14 19,28" fill="currentColor" opacity="0.25" />
        <polygon points="16,28 21,10 26,28" fill="none" stroke="currentColor" strokeWidth="2" />
        <polygon points="23,28 28,16 33,28" fill="currentColor" opacity="0.25" />
      </>
    ),
  },
]

export function Differentials() {
  return (
    <section className="relative border-t border-white/10 bg-[var(--color-black-deep)] py-28 lg:py-36">
      <div className="container-delta flex flex-col gap-14">
        <SectionHeading eyebrow="Diferenciais" title="O que muda quando a marca vira sistema." align="left" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.06}>
              <TiltCard className="flex flex-col gap-4 border-t border-white/15 pt-6">
                <svg viewBox="0 0 40 40" className="h-10 w-10 text-[var(--color-lime)]" aria-hidden="true">
                  {pillar.icon}
                </svg>
                <h3 className="text-lg font-medium text-white">{pillar.title}</h3>
                <p className="text-white/55 leading-relaxed">{pillar.description}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
