import { faq } from '@/data/faq'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Accordion } from '@/components/ui/Accordion'

export function FAQ() {
  return (
    <section className="relative border-t border-white/10 bg-[var(--color-black-deep)] py-28 lg:py-36">
      <div className="container-delta grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading eyebrow="Perguntas frequentes" title="Antes de começar a conversa." />
        <Reveal delay={0.1}>
          <Accordion items={faq} />
        </Reveal>
      </div>
    </section>
  )
}
