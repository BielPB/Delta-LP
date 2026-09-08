import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

const phases = [
  {
    range: 'Dias 1–10',
    title: 'Imersão e estratégia',
    description: 'Pesquisa, diagnóstico, posicionamento, pautas e roteiros.',
  },
  {
    range: 'Dias 10–15',
    title: 'Aprovação',
    description: 'Alinhamento, refinamento e validação das ideias.',
  },
  {
    range: 'Dias 15–20',
    title: 'Produção',
    description: 'Planejamento e realização das gravações e captações.',
  },
  {
    range: 'Dias 20–30',
    title: 'Pós-produção e entrega',
    description: 'Edição, design, organização e preparação do próximo ciclo.',
  },
]

export function Method() {
  return (
    <section id="metodo" className="relative border-t border-white/10 bg-[var(--color-carbon)] py-28 lg:py-36">
      <div className="container-delta flex flex-col gap-16">
        <SectionHeading
          eyebrow="Método de trabalho"
          title={
            <>
              2 meses em 1: <span className="text-white/50">enquanto um mês acontece, o próximo já está
              sendo construído.</span>
            </>
          }
          description="O método antecipa o planejamento, reduz improvisos e cria continuidade. Este é o fluxo-base da Delta — adaptável ao escopo de cada projeto."
        />

        <div className="relative">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-white/10 lg:block" aria-hidden="true">
            <motion.div
              className="h-full origin-left bg-[var(--color-lime)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {phases.map((phase, i) => (
              <Reveal key={phase.title} delay={i * 0.1}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                    <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-lime)] bg-[var(--color-carbon)] text-sm font-semibold text-[var(--color-lime)]">
                      {i + 1}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-white/40">
                      {phase.range}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-white">{phase.title}</h3>
                  <p className="text-white/55 leading-relaxed">{phase.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="max-w-2xl text-white/50 leading-relaxed">
            Nem todo contrato segue exatamente o mesmo escopo — cada ciclo é ajustado ao momento e ao
            objetivo da marca. O que não muda é a lógica: planejar um passo à frente da entrega.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
