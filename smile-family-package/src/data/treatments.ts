import {
  Stethoscope,
  Sparkles,
  Scissors,
  Wrench,
  Sun,
  Anchor,
  AlignHorizontalDistributeCenter,
  Smile,
  Activity,
} from 'lucide-react';
import type { Treatment } from '@/types';

/** Lista de tratamentos apresentados na grelha de serviços. */
export const treatments: Treatment[] = [
  {
    id: 'odontologia-geral',
    icon: Stethoscope,
    name: 'Odontologia geral',
    description:
      'Avaliação, prevenção e acompanhamento completo da sua saúde oral.',
  },
  {
    id: 'limpeza-dentaria',
    icon: Sparkles,
    name: 'Limpeza dentária',
    description:
      'Remoção de placa bacteriana e tártaro para manter dentes e gengivas saudáveis.',
  },
  {
    id: 'extracao-dentaria',
    icon: Scissors,
    name: 'Extração dentária',
    description:
      'Procedimentos realizados com segurança, cuidado e controlo da dor.',
  },
  {
    id: 'restauracao-dentaria',
    icon: Wrench,
    name: 'Restauração dentária',
    description:
      'Recuperação da forma, função e estética de dentes danificados.',
  },
  {
    id: 'branqueamento-dentario',
    icon: Sun,
    name: 'Branqueamento dentário',
    description:
      'Tratamento para tornar o sorriso mais claro, luminoso e confiante.',
  },
  {
    id: 'implantes-dentarios',
    icon: Anchor,
    name: 'Implantes dentários',
    description:
      'Soluções modernas para substituir dentes perdidos com segurança e estabilidade.',
  },
  {
    id: 'tratamento-ortodontico',
    icon: AlignHorizontalDistributeCenter,
    name: 'Tratamento ortodôntico',
    description:
      'Correção do alinhamento dentário e da mordida para melhorar função e estética.',
  },
  {
    id: 'protese-dentaria',
    icon: Smile,
    name: 'Prótese dentária',
    description:
      'Recuperação do sorriso e da mastigação através de próteses personalizadas.',
  },
  {
    id: 'tratamento-de-canal',
    icon: Activity,
    name: 'Tratamento de canal',
    description:
      'Tratamento do interior do dente para eliminar infeções e preservar a estrutura dentária.',
  },
];
