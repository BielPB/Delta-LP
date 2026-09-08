# Delta — Landing Page

Landing page institucional e comercial da **Delta** (Campina Grande, PB), construída do zero em React + TypeScript + Three.js, com a experiência 3D autoral **Delta Core**.

## Stack

- **React 19 + TypeScript + Vite 8**
- **Tailwind CSS v4** (tokens de design em `src/index.css`, via `@theme`)
- **Three.js + React Three Fiber + Drei** — cena 3D do Delta Core e do ecossistema de módulos
- **Framer Motion** — microinterações, reveals, accordion, menu mobile
- **GSAP** instalado e disponível para animações adicionais ligadas à rolagem (a maior parte do movimento atual usa Framer Motion `whileInView`, que já cobre as necessidades da página sem duplicar responsabilidade)
- **lucide-react** — ícones

## Rodando o projeto

```bash
npm install
npm run dev      # ambiente de desenvolvimento em http://localhost:5173
npm run build    # build de produção (tsc + vite build) em /dist
npm run preview  # servir o build de produção localmente
npm run lint      # oxlint
```

## Estrutura de arquivos

```
src/
  components/
    layout/     Header, Footer, ScrollProgress, FloatingWhatsApp, SkipLink
    three/      Cena 3D ambiente (partículas, anel, fragmentos abstratos e a
                constelação de módulos): CorePrism (geometria procedural),
                DeltaCoreScene, ModuleConstellation, Particles, CoreFallback
                (fallback sem WebGL). A marca em si NÃO é recriada em 3D —
                veja RotatingLogoImage em ui/.
    sections/   Uma seção por arquivo (Hero, ProblemSection, SystemSection,
                Manifesto, Method, Cases, ClientsMarquee, Team, Differentials,
                Process, FAQ, FinalCTA)
    ui/         Componentes reutilizáveis (Button, MagneticButton, Reveal,
                RevealText, SectionHeading, Accordion, DeltaWordmark,
                RotatingLogoImage, InstagramIcon)
  data/         Conteúdo editável: services.ts, cases.ts, team.ts, clients.ts,
                faq.ts, gallery.ts
  config/       site.ts — WhatsApp, contatos, SEO, analytics (fonte única)
  hooks/        useReducedMotion, useMediaQuery, useWebGLSupport,
                useActiveSection, usePointerParallax, useScrollProgress
  lib/          whatsapp.ts (abre conversa + analytics), analytics.ts
```

## Como editar o conteúdo

### WhatsApp

Edite `src/config/site.ts`:

```ts
export const WHATSAPP_NUMBER = '55DDDNUMERO' // apenas dígitos, com DDI + DDD
export const WHATSAPP_MESSAGE = 'Mensagem padrão pré-preenchida'
```

Todos os botões e links de WhatsApp do site usam essa constante — não há número hardcoded em nenhum componente.

### Contatos, SEO e redes sociais

Também em `src/config/site.ts`, dentro de `siteConfig`: e-mail, Instagram, cidade, título/descrição de SEO, imagem de Open Graph e IDs de analytics (GA4 / Meta Pixel).

### Serviços (Sistema Delta)

`src/data/services.ts` — os 7 módulos exibidos na seção "O sistema Delta". Cada item tem `title`, `short`, `description` e `keywords`.

### Cases

`src/data/cases.ts` — um objeto por cliente. **Campos vazios (`""` ou `[]`) são ocultados automaticamente** pelo componente `Cases`. Preencha apenas com dados reais e autorizados:

```ts
{
  id: 'imperio-clinic',
  client: 'Império Clinic',
  segment: 'Saúde e estética',
  context: '...',
  diagnosis: '...',
  strategy: '...',
  deliverables: ['...'],
  qualitativeResult: '...',
  metrics: [{ label: 'Aumento de agendamentos', value: '+38%' }],
  media: '/cases/imperio-clinic.jpg',
  testimonial: '...',
  testimonialAuthor: 'Nome, cargo',
}
```

### Equipe

`src/data/team.ts` — nome, cargo, bio e foto de cada pessoa. Sem foto, o card exibe as iniciais do nome.

### Clientes (faixa de logos)

`src/data/clients.ts` — sem logo definido, o nome da marca aparece em texto.

### FAQ

`src/data/faq.ts` — lista de pergunta/resposta usada no accordion.

### Fotos de bastidores (seção Quem somos)

`src/data/gallery.ts` — array `manifestoImages`. Vazio por padrão: a seção exibe uma composição gráfica alternativa em vez de caixas de imagem vazias.

### Logo

Os arquivos oficiais da marca ficam em `public/brand/`:

- `delta-mark.png` — símbolo isolado (versão flat), fundo transparente.
- `delta-lockup.png` — símbolo + wordmark já combinados em uma única imagem (disponível para usos futuros, ex.: imagem de Open Graph).
- `delta-logo-lateral-3d.png` / `.webp` — render 3D oficial da marca. O arquivo original recebido tinha fundo de estúdio sólido (sem canal alpha); o fundo foi removido via matte de luminância (pixels do símbolo e do brilho preservados sem alteração) para ficar transparente, e a imagem foi redimensionada/comprimida para web (WebP com fallback PNG).

Nenhum dos dois é recriado em SVG/Canvas — sempre usados como `<img>` real:

- **Estático**: [DeltaWordmark.tsx](src/components/ui/DeltaWordmark.tsx) — `delta-mark.png` no header e footer, altura fixa + `width: auto` (sem distorção), e como favicon.
- **Girando em 3D, com espessura real**: [RotatingLogoImage.tsx](src/components/ui/RotatingLogoImage.tsx) — gira `delta-logo-lateral-3d.png/.webp` com `transform: rotateY()` via CSS (sem Canvas/WebGL). Para não virar uma "foto de papel" que some de perfil, a mesma imagem é empilhada em 18 camadas finas com profundidade (`translateZ`) crescente — de frente elas coincidem perfeitamente (visual idêntico ao arquivo original); de perfil, a pilha revela um volume sólido, e um desfoque leve e crescente nas camadas de trás funde tudo num bloco único, sem listras visíveis. As 17 camadas internas usam `delta-logo-lateral-3d-core.webp` (mesmo processo de remoção de fundo, porém com corte de transparência mais rígido) para evitar que a borda suave da camada da frente se acumule visualmente ao empilhar. Um brilho lime (`drop-shadow`) é aplicado por fora da rotação 3D, envolvendo o objeto em qualquer ângulo — inclusive de perfil e "de costas" — em vez de existir só de frente. Usado no Hero, na seção do problema, no hub da constelação de módulos, no card do manifesto e no background da seção final. Respeita `prefers-reduced-motion` (mostra a imagem estática, sem empilhamento) e nunca corta ou distorce o arquivo (`object-contain`).

Para trocar o logo, substitua os arquivos em `public/brand/` mantendo os mesmos nomes — nenhum componente precisa ser alterado. Se o novo arquivo já vier com fundo transparente, o passo de remoção de fundo não é necessário.

## Inserindo mídia

1. Coloque arquivos otimizados (WebP/AVIF quando possível) em `public/` ou `src/assets/`.
2. Referencie o caminho no arquivo de dados correspondente (`media`, `photo`, `logo`, `manifestoImages`).
3. Imagens usam `loading="lazy"` por padrão.

## Publicando

`npm run build` gera a pasta `dist/`, pronta para qualquer hospedagem estática (Vercel, Netlify, Cloudflare Pages etc.). Configure o host para servir `index.html` como fallback de SPA se for criar rotas adicionais no futuro.

Antes de publicar em produção:

1. Atualize `WHATSAPP_NUMBER` em `src/config/site.ts`.
2. Atualize `siteConfig.url` e o `<link rel="canonical">` / meta OG em `index.html` com o domínio real.
3. Adicione `public/og-image.jpg` (1200×630) e confirme o caminho em `siteConfig.seo.ogImage`.
4. Preencha os dados reais em `src/data/*` (cases, equipe, clientes, galeria).
5. Publique páginas reais de Política de Privacidade e Termos de Uso e atualize `siteConfig.legal`.
6. Configure GA4/Meta Pixel em `siteConfig.analytics` (opcional — os eventos já estão instrumentados em `src/lib/analytics.ts` e disparam automaticamente quando os IDs forem preenchidos).

## Checklist de conteúdo pendente

Nada abaixo foi inventado — são lacunas reais aguardando material da Delta:

- [ ] Número de WhatsApp oficial (`src/config/site.ts`)
- [ ] Domínio oficial de publicação e imagem de Open Graph
- [ ] E-mail comercial e @ do Instagram confirmados
- [ ] Textos de contexto, diagnóstico, estratégia, entregas, resultado, métricas e depoimento de cada case (`src/data/cases.ts`)
- [ ] Imagens/vídeos de capa dos cases
- [ ] Logos reais dos clientes (`src/data/clients.ts`)
- [ ] Fotos e bios curtas da equipe, com validação de nomes e cargos (`src/data/team.ts`)
- [ ] Fotos reais de bastidores/escritório (`src/data/gallery.ts`)
- [ ] Páginas de Política de Privacidade e Termos de Uso
- [ ] IDs de GA4 / Meta Pixel, se forem usados

## Decisões técnicas relevantes

- **Logo sempre como imagem real**: os arquivos da marca nunca são recriados em SVG/Canvas. Onde precisa girar em 3D (Hero, seção do problema, hub da constelação, card do manifesto, background da seção final), o giro é feito com `transform: rotateY()` em CSS sobre o render 3D oficial (`delta-logo-lateral-3d.png/.webp`, [RotatingLogoImage.tsx](src/components/ui/RotatingLogoImage.tsx)).
- **Delta Core em Three.js**: geometria procedural (bipirâmide triangular — dois cones de 3 lados unidos pela base) usada apenas para a cena ambiente (partículas, anel de energia, fragmentos orbitando e os nós da constelação de módulos) — nunca para representar a marca. Sem nenhum arquivo `.glb`/`.gltf` externo. Reage ao ponteiro, à inclinação do dispositivo (quando disponível) e à rolagem.
- **Carregamento assíncrono do 3D**: `DeltaCoreScene` e `ModuleConstellation` são carregados via `React.lazy` — o bundle do Three.js (maior parte do peso da aplicação) só é baixado quando a seção correspondente é renderizada, e nunca bloqueia o primeiro paint.
- **Fallback sem WebGL**: `CoreFallback` (SVG/CSS estático) é exibido quando o navegador não suporta WebGL, quando `prefers-reduced-motion` está ativo, ou enquanto o suporte ainda está sendo verificado.
- **Performance em mobile**: DPR, contagem de partículas e intensidade de luz são reduzidos automaticamente em telas pequenas; o loop de renderização do Canvas pausa (`frameloop="never"`) quando a cena sai da viewport ou a aba perde foco.
- **Acessibilidade**: skip link, foco visível, `aria-*` em menu, accordion e seleção de módulos, alvos de toque ≥44px, navegação por teclado, hierarquia de headings única (`h1` → `h2` → `h3`), suporte total a `prefers-reduced-motion`.
- **Sem inveção de dados**: nenhuma métrica, depoimento, prêmio ou logo é fabricado. Todo dado ausente é tratado como campo vazio e ocultado na interface até ser fornecido.
