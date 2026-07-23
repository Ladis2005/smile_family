# Smile Family — Website Institucional

Website institucional moderno, responsivo e com elementos 3D para a clínica
dentária **Smile Family, LDA**, em Maputo, Moçambique. Transmite confiança,
higiene, profissionalismo, conforto, modernidade e atendimento familiar.

## Descrição

Single-page application em React que apresenta a clínica, os seus tratamentos,
parceiros, galeria e contactos, com um hero 3D interativo e um formulário de
marcação de consulta preparado para integrar com o backend PHP existente.

## Capturas de ecrã

> Substituir pelas imagens reais após publicação:
>
> - `public/images/og-image.jpg` (partilha social)
> - Fotografias da clínica em `public/images/gallery/` (ver
>   `public/images/README.md`)

## Tecnologias

- **React 19** + **TypeScript**
- **Vite** (build e dev server)
- **Tailwind CSS**
- **Three.js** + **React Three Fiber** + **drei** (cena 3D do hero)
- **Framer Motion** (animações)
- **Lucide React** (ícones)
- **React Router** (rotas / SPA)
- **ESLint** + **Prettier** (qualidade de código)

## Funcionalidades

- Hero com dente 3D procedural (rotação lenta, resposta ao rato, iluminação e
  sombra), com **fallback estático** para dispositivos fracos e respeito por
  `prefers-reduced-motion`.
- Cabeçalho fixo com destaque da secção ativa, menu mobile animado e scroll
  suave.
- Secções: Sobre, Tratamentos, Estatísticas, Parceiros (carrossel infinito),
  Galeria (com lightbox), Avaliações, Chamada para ação e Contactos.
- Indicador **Aberto agora / Encerrado** calculado no fuso `Africa/Maputo`.
- Formulário de marcação com validação, estados de carregamento, confirmação,
  consentimento e proteção contra submissões repetidas (modo demonstrativo
  quando a API não está ligada).
- Botão flutuante do WhatsApp e integração de links `wa.me`.
- SEO (meta, Open Graph, Twitter, canonical, `robots.txt`, `sitemap.xml`,
  favicon, dados estruturados `Dentist`).
- Acessibilidade: HTML semântico, foco visível, navegação por teclado,
  `aria-label`, textos alternativos e mensagens de erro associadas.

## Estrutura de pastas

```
smile-family-website/
├── public/            # estáticos (images, icons, partners, models, robots, sitemap)
├── src/
│   ├── components/
│   │   ├── layout/    # Header, Footer, Logo, WhatsAppFloat
│   │   ├── sections/  # Hero, Treatments, Gallery, Contacts, AppointmentModal…
│   │   ├── ui/        # Reveal, SectionHeading, ícones
│   │   └── three/     # Hero3D, ToothScene, ToothModel, fallback
│   ├── pages/         # Home, NotFound
│   ├── hooks/         # reduced-motion, scroll, active section, 3D, count-up, horário
│   ├── services/      # api.ts (comunicação centralizada com o backend)
│   ├── data/          # site, treatments, partners, gallery, testimonials, schedule…
│   ├── types/         # tipos partilhados
│   ├── styles/        # index.css (tokens + Tailwind)
│   ├── App.tsx
│   └── main.tsx
├── .github/workflows/ # ci.yml
├── .env.example
├── vercel.json
└── vite.config.ts
```

## Requisitos

- **Node.js 20+** e **npm 10+**

## Instalação

```bash
git clone URL_DO_REPOSITORIO
cd smile-family-website
npm install
cp .env.example .env
npm run dev
```

## Variáveis de ambiente

Definidas em `.env` (ver `.env.example`). Nunca enviar o `.env` para o GitHub.

| Variável                  | Descrição                                        |
| ------------------------- | ------------------------------------------------ |
| `VITE_API_BASE_URL`       | URL base da API PHP de marcações                 |
| `VITE_SITE_URL`           | URL pública do site (canonical/SEO)              |
| `VITE_GOOGLE_MAPS_URL`    | Link do Google Maps da clínica                   |
| `VITE_WHATSAPP_NUMBER`    | Número de WhatsApp (só dígitos, ex.: `258…`)     |
| `VITE_PATIENT_PORTAL_URL` | Portal do paciente (sistema de gestão, opcional) |
| `VITE_DENTIST_PORTAL_URL` | Portal do dentista (opcional)                    |
| `VITE_ADMIN_PORTAL_URL`   | Portal de administração (não destacado no menu)  |

Sem `VITE_API_BASE_URL`, o formulário corre em **modo demonstrativo**.

## Execução local

```bash
npm run dev       # servidor de desenvolvimento
npm run lint      # análise estática
npm run format    # formatação com Prettier
```

## Build

```bash
npm run build     # gera dist/
npm run preview   # pré-visualiza a build
```

## Integração com a API PHP

Toda a comunicação passa por `src/services/api.ts` (os componentes nunca
contêm o endereço da API). O formulário envia um `POST` para
`${VITE_API_BASE_URL}/appointments` com os campos sanitizados. O ponto de
integração está assinalado no ficheiro. Fluxo:

```
Website institucional → Formulário "Marcar consulta"
        → POST src/services/api.ts → Backend PHP → Sistema administrativo
```

## Deploy

**Frontend (Vercel):** importar o repositório, definir as variáveis `VITE_*`
no painel e publicar. O `vercel.json` já configura as reescritas para SPA
(React Router) e cabeçalhos de segurança.

**Alternativa (cPanel):** executar `npm run build` e enviar o conteúdo de
`dist/` para a pasta pública (ex.: `public_html`). Adicionar um `.htaccess`
com reescrita para `index.html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Arquitetura de publicação:

```
Frontend React → Vercel
Backend PHP   → Hospedagem PHP/cPanel
Base de dados → MySQL/MariaDB
```

## GitHub

CI em `.github/workflows/ci.yml` corre `npm ci`, `npm run lint` e `npm run build`
em cada `push` e `pull_request` (branches `main` e `develop`), impedindo que
código com erro de build entre na branch principal.

Branches sugeridas: `main`, `develop`, `feature/*`.

## Manutenção

Substituir antes de publicar:

- Estatísticas em `src/data/statistics.ts` (valores **temporários**).
- Depoimentos em `src/data/testimonials.ts` (**demonstrativos**).
- Logótipos em `public/partners/` + registo em `src/data/partners.ts`.
- Imagens da galeria em `public/images/gallery/` + `src/data/gallery.ts`.
- `public/images/og-image.jpg` para partilha social.

## Segurança

Nenhuma credencial, chave ou configuração sensível no frontend. Os dados do
formulário são validados e sanitizados antes do envio. A validação do lado do
servidor deve ser garantida no backend PHP.

## Licença

Uso exclusivo da Smile Family, LDA.

## Créditos

Website desenvolvido por **Déleo Cambula**.
