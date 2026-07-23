import type { NavItem } from '@/types';

/**
 * Configuração central do site. Valores sensíveis à publicação
 * (URLs, número de WhatsApp) vêm de variáveis de ambiente `VITE_*`.
 */

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? '258858609313';

const GOOGLE_MAPS_URL =
  import.meta.env.VITE_GOOGLE_MAPS_URL ??
  'https://maps.app.goo.gl/Ju1gjx25TAfTeQvG8';

const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://smilefamily.co.mz';

/** Constrói um link wa.me com mensagem pré-preenchida. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const siteConfig = {
  name: 'Smile Family',
  legalName: 'Smile Family, LDA',
  tagline: 'A clínica dentária perfeita para cuidar do seu sorriso',
  siteUrl: SITE_URL,

  contact: {
    email: 'info@smilefamily.co.mz',
    phones: [
      { label: '+258 87 700 1300', href: 'tel:+258877001300' },
      { label: '+258 85 860 9313', href: 'tel:+258858609313' },
    ],
    address: {
      lines: [
        'Av. Marien Ngouabi, n.º 330, rés-do-chão',
        'Bairro da Malhangalene',
        'Maputo, Moçambique',
      ],
      mapsUrl: GOOGLE_MAPS_URL,
    },
    timezone: 'Africa/Maputo',
  },

  whatsapp: {
    number: WHATSAPP_NUMBER,
    // Mensagens específicas por contexto
    general: whatsappLink(
      'Olá, Smile Family. Gostaria de obter informações sobre os vossos serviços.'
    ),
    appointment: whatsappLink(
      'Olá, Smile Family. Gostaria de obter informações e marcar uma consulta.'
    ),
  },

  // Portais do sistema de gestão (não destacar a administração no menu público).
  portals: {
    patient: import.meta.env.VITE_PATIENT_PORTAL_URL ?? '',
    dentist: import.meta.env.VITE_DENTIST_PORTAL_URL ?? '',
    admin: import.meta.env.VITE_ADMIN_PORTAL_URL ?? '',
  },

  credit: {
    author: 'Déleo Cambula',
  },
} as const;

/** Itens do menu de navegação principal. */
export const navItems: NavItem[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Tratamentos', href: '#tratamentos' },
  { label: 'Parceiros', href: '#parceiros' },
  { label: 'Contacto', href: '#contacto' },
];
