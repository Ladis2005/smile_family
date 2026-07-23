import type { Partner } from '@/types';

/**
 * Parceiros da clínica.
 *
 * Enquanto não existirem logotipos reais, mantêm-se entradas com `logo`
 * indefinido — a secção mostra espaços reservados uniformes. Para adicionar
 * um parceiro real, coloque o ficheiro em /public/partners e defina `logo`,
 * por exemplo: { id: 'acme', name: 'ACME', logo: '/partners/acme.svg' }.
 */
export const partners: Partner[] = [
  { id: 'parceiro-1', name: 'Parceiro 1' },
  { id: 'parceiro-2', name: 'Parceiro 2' },
  { id: 'parceiro-3', name: 'Parceiro 3' },
  { id: 'parceiro-4', name: 'Parceiro 4' },
  { id: 'parceiro-5', name: 'Parceiro 5' },
  { id: 'parceiro-6', name: 'Parceiro 6' },
];
