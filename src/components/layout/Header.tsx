import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems } from '@/config/site'
import { DeltaWordmark } from '@/components/ui/DeltaWordmark'
import { Button } from '@/components/ui/Button'
import { openWhatsApp } from '@/lib/whatsapp'
import { useActiveSection } from '@/hooks/useActiveSection'
import { trackEvent } from '@/lib/analytics'

const sectionIds = navItems.map((item) => item.href.replace('#', ''))

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function handleNavClick(href: string) {
    setMenuOpen(false)
    trackEvent('nav_click', { target: href })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-delta)] ${
        scrolled ? 'bg-[var(--color-black-deep)]/85 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="container-delta flex h-[72px] items-center justify-between">
        <a
          href="#hero"
          className="flex min-h-[44px] items-center"
          onClick={() => handleNavClick('#hero')}
          aria-label="Página inicial da Delta"
        >
          <DeltaWordmark markHeightClassName="h-9" textClassName="text-xl" />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const isActive = activeId === item.href.replace('#', '')
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-[var(--color-lime)]"
                  />
                )}
              </a>
            )
          })}
        </nav>

        <div className="hidden lg:block">
          <Button variant="primary" onClick={() => openWhatsApp('header')}>
            Falar com a Delta
          </Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-white lg:hidden"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[var(--color-black-deep)] lg:hidden"
          >
            <nav aria-label="Navegação mobile" className="container-delta flex flex-col gap-1 py-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="min-h-[44px] py-3 text-lg font-medium text-white/85 hover:text-[var(--color-lime)]"
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="mt-4">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    setMenuOpen(false)
                    openWhatsApp('header_mobile')
                  }}
                >
                  Falar com a Delta
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
