import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RotatingLogoImage } from '@/components/ui/RotatingLogoImage'
import { manifestoImages } from '@/data/gallery'
import { siteConfig } from '@/config/site'

export function Manifesto() {
  return (
    <section id="quem-somos" className="relative border-t border-white/10 bg-[var(--color-black-deep)] py-28 lg:py-36">
      <div className="container-delta grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Quem somos"
            title="Pensamos como estratégia. Produzimos como estúdio. Acompanhamos como parte do negócio."
          />
          <Reveal delay={0.1}>
            <p className="text-balance text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-white/65">
              A Delta nasceu para acabar com a distância entre uma boa ideia e uma execução à altura.
              Reunimos profissionais de estratégia, roteiro, produção, edição, design, mídia, tecnologia e
              comercial para construir marcas de dentro para fora. Entendemos o cenário, definimos a
              direção, produzimos os ativos e acompanhamos o que acontece depois que o conteúdo entra no
              ar.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="text-white/45">
              Nascida em {siteConfig.contact.city}, {siteConfig.contact.state}, a Delta constrói marcas em
              todo o Brasil.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {manifestoImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {manifestoImages.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt="Bastidores da Delta"
                  loading="lazy"
                  className="aspect-[3/4] w-full rounded-[var(--radius-md)] object-cover"
                />
              ))}
            </div>
          ) : (
            <EditorialMark />
          )}
        </Reveal>
      </div>
    </section>
  )
}

function EditorialMark() {
  return (
    <div className="relative flex aspect-square items-center justify-center rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.02] p-12">
      <div className="grid-lines absolute inset-6 rounded-[var(--radius-md)] opacity-30" aria-hidden="true" />
      <RotatingLogoImage className="relative h-2/3 w-2/3" duration={12} />
      <span className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.2em] text-white/30">
        Campina Grande, PB
      </span>
    </div>
  )
}
