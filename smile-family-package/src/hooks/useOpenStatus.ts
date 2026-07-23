import { useEffect, useState } from 'react';
import { schedule } from '@/data/schedule';
import { siteConfig } from '@/data/site';

interface OpenStatus {
  isOpen: boolean;
  /** Rótulo do dia atual (ex.: "Segunda-feira"). */
  todayLabel: string;
}

/**
 * Calcula se a clínica está aberta agora, no fuso horário Africa/Maputo,
 * independentemente do fuso do dispositivo do visitante.
 */
function computeStatus(): OpenStatus {
  const now = new Date();

  // Obter dia da semana e hora no fuso da clínica via Intl.
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: siteConfig.contact.timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const weekdayStr = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon';
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0');
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');
  const weekday = weekdayMap[weekdayStr] ?? 1;
  const minutesNow = hour * 60 + minute;

  const day = schedule.find((d) => d.weekday === weekday);
  const isOpen =
    !!day &&
    day.opensAt !== null &&
    day.closesAt !== null &&
    minutesNow >= day.opensAt &&
    minutesNow < day.closesAt;

  return { isOpen, todayLabel: day?.label ?? '' };
}

export function useOpenStatus(): OpenStatus {
  const [status, setStatus] = useState<OpenStatus>(computeStatus);

  useEffect(() => {
    // Reavaliar a cada minuto para atualizar o indicador.
    const id = window.setInterval(() => setStatus(computeStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return status;
}
