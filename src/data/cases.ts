/**
 * Dados dos cases da Delta.
 *
 * IMPORTANTE: nenhum campo aqui deve ser preenchido com números, resultados ou
 * depoimentos inventados. Campos vazios ("") são ocultados automaticamente pelo
 * componente Cases — nunca exiba placeholders como "[INSERIR MÉTRICA VALIDADA]"
 * na interface pública. Preencha apenas quando o dado for real e autorizado.
 */

export type CaseMetric = {
  label: string
  value: string
}

export type CaseStudy = {
  id: string
  client: string
  segment: string
  /** Contexto ou desafio enfrentado pelo cliente antes da Delta. */
  context: string
  /** Diagnóstico feito pela Delta. */
  diagnosis: string
  /** Estratégia aplicada. */
  strategy: string
  /** Lista de entregas realizadas. */
  deliverables: string[]
  /** Resultado qualitativo, descritivo — sem números. */
  qualitativeResult: string
  /** Métricas comprovadas e autorizadas para divulgação. */
  metrics: CaseMetric[]
  /** Caminho de imagem ou vídeo de capa do case. */
  media: string
  /** Depoimento autorizado pelo cliente. */
  testimonial: string
  testimonialAuthor: string
}

export const cases: CaseStudy[] = [
  {
    id: 'imperio-clinic',
    client: 'Império Clinic',
    segment: 'Saúde e estética',
    // TODO: preencher com contexto real validado pelo cliente.
    context: '',
    diagnosis: '',
    strategy: '',
    deliverables: [],
    qualitativeResult: '',
    metrics: [],
    media: '', // TODO: adicionar imagem ou vídeo do case.
    testimonial: '',
    testimonialAuthor: '',
  },
  {
    id: 'velame-hair',
    client: 'Velame Hair',
    segment: 'Saúde capilar',
    context: '',
    diagnosis: '',
    strategy: '',
    deliverables: [],
    qualitativeResult: '',
    metrics: [],
    media: '',
    testimonial: '',
    testimonialAuthor: '',
  },
  {
    id: 'sbrcc',
    client: 'SBRCC — Sociedade Brasileira de Restauração Capilar e Cirurgia',
    segment: 'Sociedade médica',
    context: '',
    diagnosis: '',
    strategy: '',
    deliverables: [],
    qualitativeResult: '',
    metrics: [],
    media: '',
    testimonial: '',
    testimonialAuthor: '',
  },
  {
    id: 'dr-carlos-filho',
    client: 'Dr. Carlos Filho',
    segment: 'Medicina',
    context: '',
    diagnosis: '',
    strategy: '',
    deliverables: [],
    qualitativeResult: '',
    metrics: [],
    media: '',
    testimonial: '',
    testimonialAuthor: '',
  },
  {
    id: 'dr-paulo-breno',
    client: 'Dr. Paulo Breno',
    segment: 'Medicina',
    context: '',
    diagnosis: '',
    strategy: '',
    deliverables: [],
    qualitativeResult: '',
    metrics: [],
    media: '',
    testimonial: '',
    testimonialAuthor: '',
  },
  {
    id: 'dr-elvio-lievert',
    client: 'Dr. Elvio Lievert',
    segment: 'Medicina',
    context: '',
    diagnosis: '',
    strategy: '',
    deliverables: [],
    qualitativeResult: '',
    metrics: [],
    media: '',
    testimonial: '',
    testimonialAuthor: '',
  },
  {
    id: 'dr-darlan-nobrega',
    client: 'Dr. Darlan Nóbrega',
    segment: 'Medicina',
    context: '',
    diagnosis: '',
    strategy: '',
    deliverables: [],
    qualitativeResult: '',
    metrics: [],
    media: '',
    testimonial: '',
    testimonialAuthor: '',
  },
  {
    id: 'dra-luana-barbosa',
    client: 'Dra. Luana Barbosa',
    segment: 'Medicina',
    context: '',
    diagnosis: '',
    strategy: '',
    deliverables: [],
    qualitativeResult: '',
    metrics: [],
    media: '',
    testimonial: '',
    testimonialAuthor: '',
  },
  {
    id: 'raylly-chagas',
    client: 'Raylly Chagas',
    segment: 'Especialista',
    context: '',
    diagnosis: '',
    strategy: '',
    deliverables: [],
    qualitativeResult: '',
    metrics: [],
    media: '',
    testimonial: '',
    testimonialAuthor: '',
  },
  {
    id: 'ipueira',
    client: 'Ipueira',
    segment: 'Marca',
    context: '',
    diagnosis: '',
    strategy: '',
    deliverables: [],
    qualitativeResult: '',
    metrics: [],
    media: '',
    testimonial: '',
    testimonialAuthor: '',
  },
  {
    id: 'power-club',
    client: 'Power Club',
    segment: 'Entretenimento',
    context: '',
    diagnosis: '',
    strategy: '',
    deliverables: [],
    qualitativeResult: '',
    metrics: [],
    media: '',
    testimonial: '',
    testimonialAuthor: '',
  },
]
