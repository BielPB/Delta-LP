/**
 * Equipe da Delta.
 * ATENÇÃO: nomes, cargos e fotos abaixo precisam de validação final antes da
 * publicação. Nenhuma biografia individual foi inventada — o campo `bio` fica
 * vazio até que a Delta forneça o texto real de cada pessoa.
 */

export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  photo: string
  linkedin?: string
  instagram?: string
}

export const team: TeamMember[] = [
  {
    id: 'joao-gabriel',
    name: 'João Gabriel',
    role: 'Estratégia, posicionamento e roteiros',
    bio: '', // TODO: inserir bio curta validada.
    photo: '', // TODO: adicionar foto real.
  },
  {
    id: 'victoria',
    name: 'Victoria',
    role: 'Direção criativa, audiovisual e comercial',
    bio: '',
    photo: '',
  },
  {
    id: 'carlos-filho',
    name: 'Dr. Carlos Filho',
    role: 'Gestão estratégica e financeira',
    bio: '',
    photo: '',
  },
  {
    id: 'gabriel-barbosa',
    name: 'Gabriel Barbosa',
    role: 'Tráfego pago e performance',
    bio: '',
    photo: '',
  },
  {
    id: 'gabriel-xavier',
    name: 'Gabriel Xavier',
    role: 'Edição audiovisual',
    bio: '',
    photo: '',
  },
  {
    id: 'victor',
    name: 'Victor',
    role: 'Edição audiovisual',
    bio: '',
    photo: '',
  },
  {
    id: 'sarah',
    name: 'Sarah',
    role: 'Roteiros, conteúdo e postagens',
    bio: '',
    photo: '',
  },
  {
    id: 'pedro',
    name: 'Pedro',
    role: 'Desenvolvimento e design',
    bio: '',
    photo: '',
  },
]
