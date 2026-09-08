import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/data/faq'
import { trackEvent } from '@/lib/analytics'

type AccordionProps = {
  items: FaqItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()

  return (
    <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const buttonId = `${baseId}-button-${index}`
        const panelId = `${baseId}-panel-${index}`

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  setOpenIndex(isOpen ? null : index)
                  trackEvent('faq_toggle', { question: item.question })
                }}
                className="flex w-full items-center justify-between gap-6 py-6 text-left min-h-[44px]"
              >
                <span className="text-[clamp(1rem,1.6vw,1.2rem)] font-medium text-white">
                  {item.question}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`size-5 shrink-0 text-[var(--color-lime)] transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 max-w-2xl text-white/65 leading-relaxed">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
