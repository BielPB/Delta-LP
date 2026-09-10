import { MotionConfig } from 'framer-motion'
import { SkipLink } from '@/components/layout/SkipLink'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp'
import { Hero } from '@/components/sections/Hero'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { SystemSection } from '@/components/sections/SystemSection'
import { Manifesto } from '@/components/sections/Manifesto'
import { Method } from '@/components/sections/Method'
import { Cases } from '@/components/sections/Cases'
import { ClientsMarquee } from '@/components/sections/ClientsMarquee'
import { Team } from '@/components/sections/Team'
import { Differentials } from '@/components/sections/Differentials'
import { Process } from '@/components/sections/Process'
import { FAQ } from '@/components/sections/FAQ'
import { FinalCTA } from '@/components/sections/FinalCTA'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SkipLink />
      <ScrollProgress />
      <Header />
      <main id="conteudo-principal">
        <Hero />
        <ProblemSection />
        <SystemSection />
        <Manifesto />
        <Method />
        <Cases />
        <ClientsMarquee />
        <Team />
        <Differentials />
        <Process />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </MotionConfig>
  )
}

export default App
