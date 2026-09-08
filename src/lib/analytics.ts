import { siteConfig } from '@/config/site'

type AnalyticsEvent =
  | 'whatsapp_click'
  | 'nav_click'
  | 'module_select'
  | 'case_view'
  | 'faq_toggle'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/**
 * Envia um evento para GA4/Meta Pixel quando os IDs estiverem configurados em
 * `siteConfig.analytics`. Sem IDs configurados, o evento é apenas registrado
 * no console em desenvolvimento — nenhum ID falso é usado.
 */
export function trackEvent(event: AnalyticsEvent, params: Record<string, string> = {}) {
  const { ga4Id, metaPixelId } = siteConfig.analytics

  if (ga4Id && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, params)
  }

  if (metaPixelId && typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', event, params)
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, params)
  }
}
