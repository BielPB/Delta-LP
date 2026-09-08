/**
 * Dados dos cases da Delta.
 *
 * IMPORTANTE: nenhum campo aqui deve ser preenchido com números, resultados ou
 * depoimentos inventados. Campos vazios ("") são ocultados automaticamente pelo
 * componente Cases — nunca exiba placeholders como "[INSERIR MÉTRICA VALIDADA]"
 * na interface pública. Preencha apenas quando o dado for real e autorizado.
 */

export type CaseStudy = {
  id: string
  client: string
  segment: string
  /** Breve descrição do trabalho, uma ou duas frases. */
  description: string
  /** Caminho de imagem ou vídeo de capa do case. */
  media: string
}

export const cases: CaseStudy[] = [
  {
    id: 'imperio-clinic',
    client: 'Império Clinic',
    segment: 'Saúde e estética',
    // TODO: preencher com descrição real validada pelo cliente.
    description: '',
    media: '', // TODO: adicionar imagem ou vídeo do case.
  },
  {
    id: 'velame-hair',
    client: 'Velame Hair',
    segment: 'Saúde capilar',
    description: '',
    media: '',
  },
  {
    id: 'sbrcc',
    client: 'SBRCC (Sociedade Brasileira de Restauração Capilar e Cirurgia)',
    segment: 'Sociedade médica',
    description: '',
    media: '',
  },
  {
    id: 'dr-carlos-filho',
    client: 'Dr. Carlos Filho',
    segment: 'Medicina',
    description: '',
    media: '',
  },
  {
    id: 'dr-paulo-breno',
    client: 'Dr. Paulo Breno',
    segment: 'Medicina',
    description: '',
    media: '',
  },
  {
    id: 'dr-elvio-lievert',
    client: 'Dr. Elvio Lievert',
    segment: 'Medicina',
    description: '',
    media: '',
  },
  {
    id: 'dr-darlan-nobrega',
    client: 'Dr. Darlan Nóbrega',
    segment: 'Medicina',
    description: '',
    media: '',
  },
  {
    id: 'dra-luana-barbosa',
    client: 'Dra. Luana Barbosa',
    segment: 'Medicina',
    description: '',
    media: '',
  },
  {
    id: 'raylly-chagas',
    client: 'Raylly Chagas',
    segment: 'Especialista',
    description: '',
    media: '',
  },
  {
    id: 'ipueira',
    client: 'Ipueira',
    segment: 'Marca',
    description: '',
    media: '',
  },
  {
    id: 'power-club',
    client: 'Power Club',
    segment: 'Entretenimento',
    description: '',
    media: '',
  },
]
