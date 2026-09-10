import { Mail, MapPin } from 'lucide-react'
import { navItems, siteConfig, buildWhatsAppUrl } from '@/config/site'
import { DeltaWordmark } from '@/components/ui/DeltaWordmark'
import { InstagramIcon } from '@/components/ui/InstagramIcon'
import { trackEvent } from '@/lib/analytics'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-[var(--color-black-deep)] pt-16 pb-8">
      <div className="container-delta grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <a href="#hero" className="flex min-h-[44px] items-center" aria-label="Página inicial da Delta">
            <DeltaWordmark markHeightClassName="h-10" textClassName="text-2xl" />
          </a>
          <p className="max-w-xs text-white/60">{siteConfig.tagline}</p>
          <p className="flex items-center gap-2 text-sm text-white/50">
            <MapPin className="size-4" aria-hidden="true" />
            {siteConfig.contact.city}, {siteConfig.contact.state}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">Navegação</h3>
          <nav className="flex flex-col gap-2" aria-label="Navegação do rodapé">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-white/70 hover:text-[var(--color-lime)] transition-colors w-fit">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">Contato</h3>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'footer' })}
            className="flex items-center gap-2 text-white/70 hover:text-[var(--color-lime)] transition-colors w-fit"
          >
            WhatsApp
          </a>
          <a
            href={siteConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/70 hover:text-[var(--color-lime)] transition-colors w-fit"
          >
            <InstagramIcon className="size-4" />
            {siteConfig.contact.instagram}
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-2 text-white/70 hover:text-[var(--color-lime)] transition-colors w-fit"
          >
            <Mail className="size-4" aria-hidden="true" />
            {siteConfig.contact.email}
          </a>
        </div>
      </div>

      <div className="container-delta mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Delta. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <a href={siteConfig.legal.privacyUrl} className="hover:text-white/70 transition-colors">
            Política de privacidade
          </a>
          <a href={siteConfig.legal.termsUrl} className="hover:text-white/70 transition-colors">
            Termos de uso
          </a>
        </div>
      </div>
    </footer>
  )
}
