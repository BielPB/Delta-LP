export type ServiceModule = {
  id: string
  index: string
  title: string
  short: string
  description: string
  keywords: string[]
}

export const services: ServiceModule[] = [
  {
    id: 'estrategia',
    index: '01',
    title: 'Estratégia e posicionamento',
    short: 'A direção antes da execução.',
    description:
      'Diagnóstico, diferenciação, proposta de valor, linha editorial, campanhas e direção de marca.',
    keywords: ['Diagnóstico', 'Posicionamento', 'Linha editorial', 'Direção de marca'],
  },
  {
    id: 'conteudo',
    index: '02',
    title: 'Conteúdo e copy',
    short: 'Palavras com função.',
    description:
      'Planejamento, conceitos criativos, roteiros, narrativas, legendas e conteúdos pensados para autoridade e conversão.',
    keywords: ['Roteiro', 'Narrativa', 'Copy', 'Autoridade'],
  },
  {
    id: 'audiovisual',
    index: '03',
    title: 'Produção audiovisual',
    short: 'Imagem com intenção, não só estética.',
    description:
      'Direção, captação, fotografia, vídeo, drone, edição e construção visual com padrão profissional.',
    keywords: ['Direção', 'Captação', 'Fotografia', 'Edição'],
  },
  {
    id: 'design',
    index: '04',
    title: 'Design e branding',
    short: 'Consistência em cada ponto de contato.',
    description:
      'Identidade, sistemas visuais, peças digitais, apresentações e consistência em todos os pontos de contato.',
    keywords: ['Identidade', 'Sistema visual', 'Peças digitais'],
  },
  {
    id: 'trafego',
    index: '05',
    title: 'Tráfego pago e campanhas',
    short: 'Verba com direção, não com achismo.',
    description:
      'Planejamento de mídia, criativos, segmentação, otimização, testes e leitura de desempenho.',
    keywords: ['Mídia', 'Segmentação', 'Otimização', 'Testes'],
  },
  {
    id: 'tecnologia',
    index: '06',
    title: 'Sites, landing pages e tecnologia',
    short: 'Estrutura digital que converte.',
    description:
      'Páginas responsivas, experiências digitais, integrações, portais e estruturas focadas em clareza e ação.',
    keywords: ['Landing pages', 'Integrações', 'Experiências digitais'],
  },
  {
    id: 'comercial',
    index: '07',
    title: 'Comercial e conversão',
    short: 'Do lead à oportunidade real.',
    description:
      'Organização de atendimento, análise do caminho do lead, scripts, follow-up, treinamento e melhoria da conversão.',
    keywords: ['Atendimento', 'Scripts', 'Follow-up', 'Conversão'],
  },
]
