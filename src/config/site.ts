/**
 * Configuração central da Delta.
 * Edite este arquivo para atualizar contatos, redes, SEO e mensagens padrão
 * sem precisar tocar em nenhum componente.
 */

// TODO: substituir pelo número real da Delta no formato internacional (55 + DDD + número, apenas dígitos).
export const WHATSAPP_NUMBER = '5583900000000'

export const WHATSAPP_MESSAGE =
  'Olá! Conheci a Delta pelo site e quero conversar sobre a minha marca.'

export function buildWhatsAppUrl(customMessage?: string) {
  const message = customMessage ?? WHATSAPP_MESSAGE
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const siteConfig = {
  name: 'Delta',
  tagline: 'Marketing que resolve.',
  url: 'https://www.deltaprodutora.com.br', // TODO: confirmar domínio oficial de publicação.
  locale: 'pt_BR',

  contact: {
    // TODO: confirmar e-mail comercial oficial.
    email: 'contato@deltaprodutora.com.br',
    // TODO: confirmar @ oficial do Instagram.
    instagram: '@delta.produtora',
    instagramUrl: 'https://instagram.com/delta.produtora',
    city: 'Campina Grande',
    state: 'PB',
    country: 'Brasil',
  },

  seo: {
    title: 'Delta — Estratégia, Conteúdo, Audiovisual, Tráfego e Tecnologia',
    description:
      'A Delta conecta estratégia, posicionamento, produção audiovisual, design, tráfego pago e tecnologia para construir marcas fortes e gerar oportunidades.',
    ogImage: '/og-image.jpg', // TODO: adicionar imagem 1200x630 real para compartilhamento social.
  },

  legal: {
    // TODO: publicar páginas reais de política de privacidade e termos de uso.
    privacyUrl: '/politica-de-privacidade',
    termsUrl: '/termos-de-uso',
  },

  // TODO: inserir IDs reais quando os pixels/tags forem configurados. Deixar vazio mantém o rastreamento desativado.
  analytics: {
    ga4Id: '',
    metaPixelId: '',
  },
}

export type NavItem = {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'Quem somos', href: '#quem-somos' },
  { label: 'O que fazemos', href: '#sistema' },
  { label: 'Cases', href: '#cases' },
  { label: 'Método', href: '#metodo' },
  { label: 'Equipe', href: '#equipe' },
]
