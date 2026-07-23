import type { ScheduleDay } from '@/types';

const H = (h: number, m = 0) => h * 60 + m;

/**
 * Horário de funcionamento. `weekday` segue Date.getDay()
 * (0 = Domingo ... 6 = Sábado). Horas em minutos desde a meia-noite.
 */
export const schedule: ScheduleDay[] = [
  {
    weekday: 1,
    label: 'Segunda-feira',
    opensAt: H(8),
    closesAt: H(17),
    display: '08h00 às 17h00',
  },
  {
    weekday: 2,
    label: 'Terça-feira',
    opensAt: H(8),
    closesAt: H(17),
    display: '08h00 às 17h00',
  },
  {
    weekday: 3,
    label: 'Quarta-feira',
    opensAt: H(8),
    closesAt: H(17),
    display: '08h00 às 17h00',
  },
  {
    weekday: 4,
    label: 'Quinta-feira',
    opensAt: H(8),
    closesAt: H(17),
    display: '08h00 às 17h00',
  },
  {
    weekday: 5,
    label: 'Sexta-feira',
    opensAt: H(8),
    closesAt: H(17),
    display: '08h00 às 17h00',
  },
  {
    weekday: 6,
    label: 'Sábado',
    opensAt: H(8),
    closesAt: H(13),
    display: '08h00 às 13h00',
  },
  {
    weekday: 0,
    label: 'Domingo',
    opensAt: null,
    closesAt: null,
    display: 'Encerrado',
  },
];
