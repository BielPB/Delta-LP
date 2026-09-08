/**
 * Marcas que confiam na Delta.
 * Use apenas arquivos de logo reais e autorizados em `logo`. Sem logo, o
 * componente exibe o nome tipográfico — nunca recrie ou aproxime uma marca visualmente.
 */

export type Client = {
  id: string
  name: string
  logo: string
}

export const clients: Client[] = [
  { id: 'imperio-clinic', name: 'Império Clinic', logo: '' },
  { id: 'velame-hair', name: 'Velame Hair', logo: '' },
  { id: 'sbrcc', name: 'SBRCC', logo: '' },
  { id: 'dr-carlos-filho', name: 'Dr. Carlos Filho', logo: '' },
  { id: 'dr-paulo-breno', name: 'Dr. Paulo Breno', logo: '' },
  { id: 'dr-elvio-lievert', name: 'Dr. Elvio Lievert', logo: '' },
  { id: 'dr-darlan-nobrega', name: 'Dr. Darlan Nóbrega', logo: '' },
  { id: 'dra-luana-barbosa', name: 'Dra. Luana Barbosa', logo: '' },
  { id: 'raylly-chagas', name: 'Raylly Chagas', logo: '' },
  { id: 'ipueira', name: 'Ipueira', logo: '' },
  { id: 'power-club', name: 'Power Club', logo: '' },
]
