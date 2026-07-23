import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Anima uma contagem de 0 até `target` quando `active` fica verdadeiro.
 * Respeita `prefers-reduced-motion` (mostra logo o valor final).
 */
export function useCountUp(target: number, active: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();
  const frame = useRef<number>(0);

  useEffect(() => {
    if (!active) return;

    if (reduced) {
      // Sem animação: mostra logo o valor final.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(target);
      return;
    }

    let start: number | null = null;
    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease-out cúbico para desaceleração suave.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [target, active, duration, reduced]);

  return value;
}
