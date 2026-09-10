import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { HeroBackground } from '@/components/three/HeroBackground'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { RotatingLogoImage } from '@/components/ui/RotatingLogoImage'
import { openWhatsApp } from '@/lib/whatsapp'
import { trackEvent } from '@/lib/analytics'

const eyebrowWords = ['ESTRATÉGIA', 'CRIAÇÃO', 'EXECUÇÃO', 'CRESCIMENTO']

function scrollToSystem() {
  document.getElementById('sistema')?.scrollIntoView({ behavior: 'smooth' })
  trackEvent('nav_click', { target: '#sistema-hero-cta' })
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-[72px]"
      aria-label="Abertura"
    >
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(198,255,52,0.08),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0 z-[1] flex items-end justify-center pb-16 opacity-20 lg:items-center lg:justify-end lg:pb-0 lg:opacity-100">
        <div className="relative flex h-[140px] w-[140px] items-center justify-center sm:h-[180px] sm:w-[180px] lg:mr-[10%] lg:h-[340px] lg:w-[340px]">
          <HeroBackground className="absolute inset-[-45%]" />
          <RotatingLogoImage className="relative h-full w-full" duration={14} interactive />
        </div>
      </div>

      <div className="container-delta relative z-10 grid gap-10 py-24 lg:min-h-[70vh] lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-[0.25em] text-[var(--color-lime)]"
          >
            {eyebrowWords.map((word, i) => (
              <span key={word} className="flex items-center gap-2">
                {word}
                {i < eyebrowWords.length - 1 && <span className="text-white/25">•</span>}
              </span>
            ))}
          </motion.div>

          <h1 className="text-balance text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-tight">
            {['Sua marca não precisa de mais conteúdo.', 'Precisa de direção, presença e conversão.'].map(
              (line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block overflow-hidden"
                >
                  {line}
                </motion.span>
              ),
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-balance text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed text-white/65"
          >
            A Delta une estratégia, posicionamento, audiovisual, design, tráfego e tecnologia num único
            sistema, para transformar marcas em referências e atenção em oportunidade real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton>
                <Button variant="primary" onClick={() => openWhatsApp('hero_primary')}>
                  Quero construir minha marca com a Delta
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button variant="secondary" onClick={scrollToSystem}>
                  Conhecer o sistema Delta
                </Button>
              </MagneticButton>
            </div>
            <p className="text-sm text-white/50">
              Conte o momento da sua marca. A conversa começa agora, pelo WhatsApp, sem formulário e sem
              espera.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="max-w-md border-l-2 border-[var(--color-lime)]/40 pl-4 text-sm text-white/50"
          >
            Tudo o que sua marca precisa para crescer, sob uma única direção.
          </motion.p>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={scrollToSystem}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-4 left-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-x-1/2 flex-col items-center justify-center gap-2 text-white/50 hover:text-[var(--color-lime)] transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Role</span>
        <ChevronDown className="size-5 motion-safe:animate-bounce" aria-hidden="true" />
      </motion.button>
    </section>
  )
}
