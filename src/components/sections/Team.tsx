import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { team } from '@/data/team'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function Team() {
  return (
    <section id="equipe" className="relative border-t border-white/10 bg-[var(--color-carbon)] py-28 lg:py-36">
      <div className="container-delta flex flex-col gap-14">
        <SectionHeading
          eyebrow="Equipe"
          title="Especialistas diferentes. Uma direção compartilhada."
          description="Uma equipe. Um sistema. Uma direção — por trás de cada estratégia que a Delta assina."
        />

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal key={member.id} delay={Math.min(i * 0.04, 0.24)}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamCard({ member }: { member: (typeof team)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!canHover || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -8, y: px * 10 })
  }

  const initials = member.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      style={{ transformPerspective: 800 }}
      className="flex flex-col gap-4"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] border border-white/10 bg-white/[0.03]">
        {member.photo ? (
          <img src={member.photo} alt={member.name} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.06] to-transparent">
            <span className="text-3xl font-semibold text-white/20">{initials}</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div>
        <h3 className="font-medium text-white">{member.name}</h3>
        <p className="text-sm text-white/50">{member.role}</p>
      </div>
    </motion.div>
  )
}
