import { clients } from '@/data/clients'
import { Reveal } from '@/components/ui/Reveal'

export function ClientsMarquee() {
  const track = [...clients, ...clients]

  return (
    <section className="relative border-t border-white/10 bg-[var(--color-black-deep)] py-20" aria-label="Marcas que confiam na Delta">
      <div className="container-delta mb-10">
        <Reveal>
          <p className="text-balance text-center text-lg text-white/50 sm:text-xl">
            Estratégias diferentes. O mesmo compromisso com a entrega.
          </p>
        </Reveal>
      </div>

      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-[marquee_38s_linear_infinite] gap-16 group-hover:[animation-play-state:paused] motion-reduce:animate-none touch-pan-x">
          {track.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              tabIndex={0}
              className="group/logo flex h-16 shrink-0 items-center justify-center px-4 text-xl font-medium text-white/35 transition-colors duration-300 hover:text-[var(--color-lime)] focus-visible:text-[var(--color-lime)] active:text-[var(--color-lime)]"
            >
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  loading="lazy"
                  className="h-8 w-auto object-contain grayscale transition-[filter] duration-300 group-hover/logo:grayscale-0 group-focus-visible/logo:grayscale-0 group-active/logo:grayscale-0"
                />
              ) : (
                <span>{client.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
