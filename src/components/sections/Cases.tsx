import { useRef } from 'react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { cases } from '@/data/cases'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { openWhatsApp } from '@/lib/whatsapp'
import { trackEvent } from '@/lib/analytics'
import type { CaseStudy } from '@/data/cases'

export function Cases() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const distance = (card?.clientWidth ?? 380) + 24
    el.scrollBy({ left: distance * direction, behavior: 'smooth' })
  }

  return (
    <section id="cases" className="relative border-t border-white/10 bg-[var(--color-black-deep)] py-28 lg:py-36">
      <div className="container-delta flex flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Cases"
            title="Não é portfólio. É diagnóstico em prática."
            description="Contexto, decisão e execução — o raciocínio por trás de cada entrega, marca por marca."
          />
          <div className="hidden gap-3 sm:flex">
            <button
              type="button"
              aria-label="Case anterior"
              onClick={() => scrollByCard(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white hover:border-[var(--color-lime)] hover:text-[var(--color-lime)] transition-colors"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Próximo case"
              onClick={() => scrollByCard(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white hover:border-[var(--color-lime)] hover:text-[var(--color-lime)] transition-colors"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden pb-4 -mx-5 px-5 sm:mx-0 sm:px-0"
        >
          {cases.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i * 0.03, 0.2)} className="snap-start" variant="flip">
              <CaseCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseCard({ item }: { item: CaseStudy }) {
  const hasNarrative = item.context || item.diagnosis || item.strategy
  const hasDeliverables = item.deliverables.length > 0
  const hasMetrics = item.metrics.length > 0
  const hasTestimonial = item.testimonial

  return (
    <article className="flex h-[600px] w-[min(85vw,400px)] shrink-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.03] shadow-[var(--shadow-card)]">
      <div className="relative flex aspect-[4/3] shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--color-carbon)] to-black">
        {item.media ? (
          <img src={item.media} alt={item.client} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <span className="text-5xl font-semibold text-white/10">{item.client.charAt(0)}</span>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-lime)] backdrop-blur">
          {item.segment}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
        <h3 className="text-xl font-medium text-white">{item.client}</h3>

        {hasNarrative && (
          <div className="flex flex-col gap-2 text-sm text-white/60 leading-relaxed">
            {item.context && <p><strong className="text-white/80">Contexto:</strong> {item.context}</p>}
            {item.diagnosis && <p><strong className="text-white/80">Diagnóstico:</strong> {item.diagnosis}</p>}
            {item.strategy && <p><strong className="text-white/80">Estratégia:</strong> {item.strategy}</p>}
          </div>
        )}

        {hasDeliverables && (
          <div className="flex flex-wrap gap-2">
            {item.deliverables.map((d) => (
              <span key={d} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/55">
                {d}
              </span>
            ))}
          </div>
        )}

        {item.qualitativeResult && (
          <p className="text-sm text-white/70 leading-relaxed">{item.qualitativeResult}</p>
        )}

        {hasMetrics && (
          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
            {item.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-2xl font-semibold text-[var(--color-lime)]">{metric.value}</p>
                <p className="text-xs text-white/50">{metric.label}</p>
              </div>
            ))}
          </div>
        )}

        {hasTestimonial && (
          <blockquote className="flex flex-col gap-2 border-t border-white/10 pt-4 text-sm text-white/60">
            <Quote className="size-4 text-[var(--color-lime)]" aria-hidden="true" />
            <p className="italic leading-relaxed">&ldquo;{item.testimonial}&rdquo;</p>
            {item.testimonialAuthor && (
              <cite className="not-italic text-white/40">— {item.testimonialAuthor}</cite>
            )}
          </blockquote>
        )}

        <div className="mt-auto pt-2">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              trackEvent('case_view', { client: item.client })
              openWhatsApp(
                'case_card',
                `Olá! Vi o case da ${item.client} no site da Delta e quero uma estratégia para minha marca.`,
              )
            }}
          >
            Quero uma estratégia para minha marca
          </Button>
        </div>
      </div>
    </article>
  )
}
