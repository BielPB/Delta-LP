import { buildWhatsAppUrl } from '@/config/site'
import { trackEvent } from '@/lib/analytics'

/**
 * Abre uma conversa no WhatsApp em nova aba, com mensagem pré-preenchida, e
 * registra o clique para analytics. Use esta função em todo CTA de WhatsApp
 * para manter o comportamento e o rastreamento consistentes.
 */
export function openWhatsApp(source: string, customMessage?: string) {
  trackEvent('whatsapp_click', { source })
  const url = buildWhatsAppUrl(customMessage)
  window.open(url, '_blank', 'noopener,noreferrer')
}
