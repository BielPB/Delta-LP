import { forwardRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  variant?: ButtonVariant
  children?: ReactNode
}

const base =
  'group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-colors duration-300 ease-[var(--ease-delta)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-lime)] disabled:pointer-events-none disabled:opacity-50 min-h-[44px]'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-lime)] text-black hover:shadow-[0_0_45px_-5px_rgba(198,255,52,0.65)]',
  secondary:
    'border border-white/25 text-white hover:border-[var(--color-lime)] hover:text-[var(--color-lime)]',
  ghost: 'text-white/80 hover:text-[var(--color-lime)]',
}

type Ripple = { id: number; x: number; y: number; size: number }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', children, onClick, ...props }, ref) => {
    const [ripples, setRipples] = useState<Ripple[]>([])

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
      const rect = event.currentTarget.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 1.6
      const id = Date.now()
      setRipples((prev) => [
        ...prev,
        { id, x: event.clientX - rect.left, y: event.clientY - rect.top, size },
      ])
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 700)
      onClick?.(event)
    }

    return (
      <motion.button
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        onClick={handleClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        {...props}
      >
        {variant === 'primary' && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        <AnimatePresence>
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              className="pointer-events-none absolute rounded-full bg-white/30"
              style={{ left: r.x, top: r.y, width: r.size, height: r.size, marginLeft: -r.size / 2, marginTop: -r.size / 2 }}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>
      </motion.button>
    )
  },
)

Button.displayName = 'Button'
