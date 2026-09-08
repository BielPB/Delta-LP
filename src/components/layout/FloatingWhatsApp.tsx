import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { openWhatsApp } from '@/lib/whatsapp'

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: '-10% 0px 0px 0px',
    })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => openWhatsApp('floating_button')}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-lime)] text-black shadow-[0_10px_30px_-8px_rgba(198,255,52,0.6)] transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
          aria-label="Falar com a Delta no WhatsApp"
        >
          <MessageCircle className="size-6" strokeWidth={2.2} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
