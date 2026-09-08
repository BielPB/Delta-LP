import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cases } from '@/data/cases'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import type { CaseStudy } from '@/data/cases'

export function Cases() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const distance = (card?.clientWidth ?? 340) + 24
    el.scrollBy({ left: distance * direction, behavior: 'smooth' })
  }

  return (
    <section id="cases" className="relative border-t border-white/10 bg-[var(--color-black-deep)] py-28 lg:py-36">
      <div className="container-delta flex flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Cases"
            title="Não é portfólio. É diagnóstico em prática."
            description="Contexto, decisão e execução: o raciocínio por trás de cada entrega, marca por marca."
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
  return (
    <article className="flex h-[380px] w-[min(85vw,340px)] shrink-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.03] shadow-[var(--shadow-card)]">
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

      <div className="flex flex-1 flex-col gap-2 overflow-hidden p-6">
        <h3 className="text-xl font-medium text-white">{item.client}</h3>
        {item.description && (
          <p className="line-clamp-3 text-sm text-white/60 leading-relaxed">{item.description}</p>
        )}
      </div>
    </article>
  )
}
