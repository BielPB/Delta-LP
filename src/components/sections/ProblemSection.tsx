import { motion } from 'framer-motion'
import {
  FileWarning,
  Target,
  Video,
  Users,
  Database,
  MessageSquareWarning,
} from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RotatingLogoImage } from '@/components/ui/RotatingLogoImage'

const painPoints = [
  {
    icon: FileWarning,
    title: 'Conteúdo sem posicionamento',
    description: 'Postagens bonitas que não dizem por que sua marca existe, nem para quem ela fala.',
  },
  {
    icon: Target,
    title: 'Tráfego sem uma oferta clara',
    description: 'Verba investida em anúncios que levam a uma página sem nenhum motivo real para converter.',
  },
  {
    icon: Video,
    title: 'Vídeo bonito sem intenção',
    description: 'Produção de alto nível que não sabe qual problema do público está resolvendo.',
  },
  {
    icon: Users,
    title: 'Leads chegando sem processo comercial',
    description: 'Contatos gerados por um time, recebidos por outro que nunca foi preparado para eles.',
  },
  {
    icon: Database,
    title: 'Dados coletados sem decisão',
    description: 'Relatórios entregues, arquivados e nunca transformados em próximo passo.',
  },
  {
    icon: MessageSquareWarning,
    title: 'Comunicação inconsistente entre canais',
    description: 'Tom, promessa e visual mudando a cada fornecedor responsável pelo canal.',
  },
]

export function ProblemSection() {
  return (
    <section className="relative bg-[var(--color-black-deep)] py-28 lg:py-36" aria-label="O problema que a Delta resolve">
      <div className="container-delta grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div className="flex flex-col gap-10 lg:sticky lg:top-32 lg:h-fit">
          <SectionHeading title="Quando cada fornecedor olha apenas para a própria entrega, ninguém olha para a marca inteira." />
          <Reveal delay={0.15}>
            <DispersedDiagram />
          </Reveal>
        </div>

        <div className="flex flex-col">
          {painPoints.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.04}>
              <div className="flex gap-5 border-b border-white/10 py-7 first:pt-0">
                <point.icon className="mt-1 size-6 shrink-0 text-[var(--color-lime)]" aria-hidden="true" strokeWidth={1.6} />
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-medium text-white">{point.title}</h3>
                  <p className="text-white/55 leading-relaxed">{point.description}</p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3 pt-10">
              <p className="text-sm text-white/40">
                Marketing que resolve não começa na postagem. Começa no diagnóstico.
              </p>
              <p className="text-balance text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium leading-snug text-white">
                A Delta conecta o que normalmente chega separado.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function DispersedDiagram() {
  const dots = [
    [20, 18],
    [82, 12],
    [10, 55],
    [90, 60],
    [30, 88],
    [70, 92],
  ]

  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
        {dots.map(([x, y], i) => (
          <motion.line
            key={`line-${i}`}
            x1={x}
            y1={y}
            x2={50}
            y2={50}
            stroke="#c6ff34"
            strokeWidth="0.4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.45 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        {dots.map(([x, y], i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r="2.2"
            fill="#5a5854"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          />
        ))}
      </svg>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <RotatingLogoImage className="h-[34%] w-[34%]" duration={16} />
      </motion.div>
    </div>
  )
}
