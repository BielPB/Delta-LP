import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'

type RevealTextProps = {
  children: string
  className?: string
  as?: Tag
  splitBy?: 'word' | 'char'
  stagger?: number
  delay?: number
  start?: string
}

/**
 * Divide o texto em palavras (ou caracteres) e revela cada parte com stagger
 * ao entrar na viewport, usando GSAP + ScrollTrigger. Não bloqueia a
 * rolagem — a animação apenas acompanha o scroll natural da página.
 * Com prefers-reduced-motion, renderiza o texto estático.
 */
export function RevealText({
  children,
  className = '',
  as: TagName = 'span',
  splitBy = 'word',
  stagger = 0.035,
  delay = 0,
  start = 'top 88%',
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion || !ref.current) return
    const el = ref.current

    const units = splitBy === 'char' ? children.split('') : children.split(' ')
    el.innerHTML = units
      .map((unit) => {
        const content = unit === ' ' ? '&nbsp;' : unit
        const trailingSpace = splitBy === 'word' ? '&nbsp;' : ''
        return `<span class="reveal-text-mask" style="display:inline-block;overflow:hidden;vertical-align:top"><span class="reveal-text-unit" style="display:inline-block;will-change:transform,opacity">${content}${trailingSpace}</span></span>`
      })
      .join('')

    const targets = el.querySelectorAll<HTMLElement>('.reveal-text-unit')
    gsap.set(targets, { yPercent: 115, opacity: 0 })

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [children, reducedMotion, splitBy, stagger, delay, start])

  if (reducedMotion) {
    return <TagName className={className}>{children}</TagName>
  }

  return <TagName ref={ref as never} className={className} />
}
