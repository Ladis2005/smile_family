import type { Partner } from '@/types';

/**
 * Parceiros da clínica.
 *
 * Para adicionar um parceiro real, coloque o ficheiro em /public/partners
 * e defina `logo`, por exemplo: { id: 'acme', name: 'ACME', logo: '/partners/acme.svg' }.
 */
export const partners: Partner[] = [
  { id: 'mso', name: 'MSO', logo: '/partners/seguradora-1.png' },
  { id: 'vitality-health', name: 'Vitality Health International', logo: '/partners/seguradora-2.jpg' },
  { id: 'dp-world', name: 'DP World', logo: '/partners/seguradora-3.png' },
  { id: 'bettercare', name: 'Bettercare', logo: '/partners/seguradora-4.jpg' },
  { id: 'banco-mocambique', name: 'Banco de Moçambique', logo: '/partners/seguradora-5.png' },
  { id: 'arko-seguros', name: 'ARKO Seguros', logo: '/partners/seguradora-6.png' },
  { id: 'prime-health-care', name: 'Prime Health Care', logo: '/partners/seguradora-7.jpg' },
  { id: 'emose', name: 'Emose', logo: '/partners/seguradora-8.jpg' },
  { id: 'mocambique-seguros', name: 'Moçambique Companhia de Seguros', logo: '/partners/seguradora-9.png' },
  { id: 'palma-seguros', name: 'Palma Companhia de Seguros', logo: '/partners/seguradora-10.png' },
  { id: 'momentum-mocambique', name: 'Momentum Moçambique', logo: '/partners/seguradora-11.jpg' },
];
