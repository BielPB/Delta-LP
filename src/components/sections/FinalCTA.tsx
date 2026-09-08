import { lazy, Suspense } from 'react'
import { CoreFallback } from '@/components/three/CoreFallback'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { RotatingLogoImage } from '@/components/ui/RotatingLogoImage'
import { openWhatsApp } from '@/lib/whatsapp'

const DeltaCoreScene = lazy(() => import('@/components/three/DeltaCoreScene'))

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[var(--color-black-deep)] py-32 lg:py-44">
      <Suspense fallback={<CoreFallback className="absolute inset-0 h-full w-full opacity-25" />}>
        <DeltaCoreScene className="absolute inset-0 h-full w-full opacity-25" particles={false} />
      </Suspense>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25">
        <RotatingLogoImage className="h-[55%] w-[55%] max-h-[420px] max-w-[420px]" duration={18} />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_20%,var(--color-black-deep)_75%)]"
        aria-hidden="true"
      />

      <div className="container-delta relative z-10 flex flex-col items-center gap-8 text-center">
        <Reveal>
          <h2 className="text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.08] max-w-3xl">
            Se a sua marca está pronta para crescer, a comunicação precisa estar à altura.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-xl text-balance text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-white/60">
            Conte para a Delta o que você quer construir. Nós começamos pelo diagnóstico e conectamos a
            estratégia à execução.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="flex flex-col items-center gap-3">
          <MagneticButton>
            <Button variant="primary" onClick={() => openWhatsApp('final_cta')}>
              Falar com a Delta no WhatsApp
            </Button>
          </MagneticButton>
          <p className="text-sm text-white/40">Clique para iniciar uma conversa com nossa equipe.</p>
        </Reveal>
      </div>
    </section>
  )
}
