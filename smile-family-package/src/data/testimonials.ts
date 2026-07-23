import type { Testimonial } from '@/types';

/**
 * ATENÇÃO: depoimentos DEMONSTRATIVOS.
 * Estes textos são exemplos e NÃO representam avaliações reais de pacientes.
 * Substituir por depoimentos autênticos (com consentimento) antes de publicar.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'demo-1',
    name: 'Paciente (exemplo)',
    role: 'Depoimento demonstrativo',
    quote:
      'Fui muito bem recebido e a equipa explicou cada passo do tratamento com calma. Saí a sorrir.',
    rating: 5,
  },
  {
    id: 'demo-2',
    name: 'Paciente (exemplo)',
    role: 'Depoimento demonstrativo',
    quote:
      'Ambiente limpo e acolhedor. Levo toda a família e sinto confiança em cada visita.',
    rating: 5,
  },
  {
    id: 'demo-3',
    name: 'Paciente (exemplo)',
    role: 'Depoimento demonstrativo',
    quote:
      'Atendimento pontual e profissional. Notei diferença logo após a primeira limpeza.',
    rating: 5,
  },
];
