import { Eye, Clapperboard, Compass, Repeat2 } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { TiltCard } from '@/components/ui/TiltCard'

const pillars = [
  {
    title: 'Visão completa',
    description: 'Enxergamos marca, conteúdo, mídia, tecnologia e atendimento como partes do mesmo caminho.',
    icon: Eye,
  },
  {
    title: 'Produção com intenção',
    description: 'Cada roteiro, cena, design e anúncio nasce com uma função definida.',
    icon: Clapperboard,
  },
  {
    title: 'Proximidade estratégica',
    description: 'Acompanhamos decisões, aprendizados e próximos movimentos.',
    icon: Compass,
  },
  {
    title: 'Execução consistente',
    description: 'Transformamos o planejamento em uma cadência real de entregas.',
    icon: Repeat2,
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
                <pillar.icon className="h-8 w-8 text-[var(--color-lime)]" strokeWidth={1.75} aria-hidden="true" />
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
