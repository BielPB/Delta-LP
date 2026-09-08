import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { openWhatsApp } from '@/lib/whatsapp'

const steps = [
  {
    title: 'Você conta o cenário',
    description: 'Momento, objetivo e principais dificuldades da marca.',
  },
  {
    title: 'A Delta diagnostica',
    description: 'Identificamos gargalos, prioridades e caminhos possíveis.',
  },
  {
    title: 'Construímos a direção',
    description: 'Definimos a solução e o próximo ciclo de execução.',
  },
]

export function Process() {
  return (
    <section className="relative border-t border-white/10 bg-[var(--color-carbon)] py-28 lg:py-36">
      <div className="container-delta flex flex-col gap-14">
        <SectionHeading
          eyebrow="Processo comercial"
          title="Da ideia à tela. Da tela à conversa. Da conversa à oportunidade."
          description="Sua marca é percebida antes mesmo de alguém falar com você. É por isso que tudo começa aqui."
          align="center"
        />

        <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="flex flex-col items-center gap-4 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-lime)]/40 text-xl font-semibold text-[var(--color-lime)]">
                  {i + 1}
                </span>
                <h3 className="text-lg font-medium text-white">{step.title}</h3>
                <p className="text-white/55 leading-relaxed">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="flex justify-center">
          <MagneticButton>
            <Button variant="primary" onClick={() => openWhatsApp('process_section')}>
              Quero conversar sobre minha marca
            </Button>
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
