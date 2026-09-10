import { lazy, Suspense, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { services } from '@/data/services'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { CoreFallback } from '@/components/three/CoreFallback'
import { RotatingLogoImage } from '@/components/ui/RotatingLogoImage'
import { Button } from '@/components/ui/Button'
import { useWebGLSupport } from '@/hooks/useWebGLSupport'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { openWhatsApp } from '@/lib/whatsapp'
import { trackEvent } from '@/lib/analytics'

const ModuleConstellation = lazy(() => import('@/components/three/ModuleConstellation'))

export function SystemSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const webglSupported = useWebGLSupport()
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const active = services[activeIndex]

  function selectModule(index: number) {
    setActiveIndex(index)
    trackEvent('module_select', { module: services[index].id })
  }

  return (
    <section id="sistema" className="relative border-t border-white/10 bg-[var(--color-black-deep)] py-28 lg:py-36">
      <div className="container-delta flex flex-col gap-14">
        <SectionHeading
          eyebrow="O sistema Delta"
          title="Não juntamos serviços. Conectamos decisões."
          description="Estratégia sem execução vira apresentação. Execução sem estratégia vira ruído. A Delta faz as duas coisas acontecerem dentro do mesmo diagnóstico, da mesma direção de marca e do mesmo painel de decisão."
        />

        {isMobile ? (
          <MobileModuleCarousel activeIndex={activeIndex} onSelect={selectModule} />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="relative flex h-[420px] items-center justify-center lg:h-[520px]">
              {webglSupported && !reducedMotion ? (
                <Suspense fallback={<CoreFallback className="h-full w-full" />}>
                  <ModuleConstellation modules={services} activeIndex={activeIndex} onSelect={selectModule} />
                </Suspense>
              ) : (
                <CoreFallback className="h-full w-full" />
              )}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <RotatingLogoImage className="h-[19%] w-[19%]" duration={11} />
              </div>
            </div>

            <div className="flex flex-col gap-2" role="tablist" aria-label="Módulos do sistema Delta">
              {services.map((service, i) => {
                const isActive = i === activeIndex
                return (
                  <div key={service.id} className="border-b border-white/10">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`module-panel-${service.id}`}
                      id={`module-tab-${service.id}`}
                      onClick={() => selectModule(i)}
                      className={`flex w-full items-center gap-4 py-5 text-left min-h-[44px] transition-colors ${
                        isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                      }`}
                    >
                      <span
                        className={`font-mono text-sm ${isActive ? 'text-[var(--color-lime)]' : 'text-white/30'}`}
                      >
                        {service.index}
                      </span>
                      <span className="text-[clamp(1.05rem,1.6vw,1.4rem)] font-medium">{service.title}</span>
                    </button>
                    {isActive && (
                      <div
                        id={`module-panel-${service.id}`}
                        role="tabpanel"
                        aria-labelledby={`module-tab-${service.id}`}
                        className="flex flex-col gap-4 pb-6 pl-9"
                      >
                        <p className="max-w-lg text-white/60 leading-relaxed">{service.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {service.keywords.map((keyword) => (
                            <span
                              key={keyword}
                              className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/55"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <Reveal>
          <div className="flex flex-col items-start gap-5 rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.03] p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-balance text-lg font-medium text-white">
              O diferencial não está em oferecer sete frentes. Está em fazê-las trabalhar juntas, agora
              focado em <span className="text-[var(--color-lime)]">{active.title.toLowerCase()}</span>.
            </p>
            <Button variant="primary" onClick={() => openWhatsApp('sistema_section')}>
              Falar com a Delta
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function MobileModuleCarousel({
  activeIndex,
  onSelect,
}: {
  activeIndex: number
  onSelect: (i: number) => void
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function selectAndScroll(index: number) {
    onSelect(index)
    const el = scrollerRef.current
    const card = el?.children[index] as HTMLElement | undefined
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <div>
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 -mx-5 px-5"
        style={{ scrollbarWidth: 'none' }}
        onScroll={(e) => {
          const el = e.currentTarget
          const first = el.children[0] as HTMLElement | undefined
          const second = el.children[1] as HTMLElement | undefined
          const step = second && first ? second.offsetLeft - first.offsetLeft : (first?.clientWidth ?? 1)
          const index = Math.round(el.scrollLeft / step)
          if (index !== activeIndex && index >= 0 && index < services.length) onSelect(index)
        }}
      >
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            className="min-w-[85%] shrink-0 snap-center rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.03] p-6"
            animate={{ opacity: i === activeIndex ? 1 : 0.5 }}
          >
            <span className="font-mono text-sm text-[var(--color-lime)]">{service.index}</span>
            <h3 className="mt-2 text-xl font-medium text-white">{service.title}</h3>
            <p className="mt-3 text-white/60 leading-relaxed">{service.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.keywords.map((keyword) => (
                <span key={keyword} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/55">
                  {keyword}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <div
        className="flex justify-center gap-1 overflow-x-auto"
        role="tablist"
        aria-label="Selecionar módulo"
      >
        {services.map((service, i) => (
          <button
            key={service.id}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={service.title}
            onClick={() => selectAndScroll(i)}
            className="flex h-11 w-11 shrink-0 items-center justify-center"
          >
            <span
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === activeIndex ? 'bg-[var(--color-lime)]' : 'bg-white/20'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
