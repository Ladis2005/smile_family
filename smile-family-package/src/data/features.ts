import { HeartHandshake, GraduationCap, Sparkles, Users } from 'lucide-react';
import type { Feature } from '@/types';

/** Diferenciais da clínica ("Porquê a Smile Family?"). */
export const features: Feature[] = [
  {
    icon: HeartHandshake,
    title: 'Atendimento humanizado',
    description:
      'Escutamos cada paciente e cuidamos com empatia, respeito e atenção ao conforto.',
  },
  {
    icon: GraduationCap,
    title: 'Profissionais qualificados',
    description:
      'Uma equipa dedicada e experiente, comprometida com a sua saúde oral.',
  },
  {
    icon: Sparkles,
    title: 'Tecnologia moderna',
    description:
      'Equipamentos atuais que tornam os tratamentos mais precisos e confortáveis.',
  },
  {
    icon: Users,
    title: 'Cuidado para toda a família',
    description:
      'Acompanhamos crianças, adultos e idosos em todas as fases da vida.',
  },
];
