import { useEffect, useState } from 'react';

/**
 * Devolve `true` assim que a página passa `threshold` píxeis de scroll.
 * Usado para dar fundo/sombra ao cabeçalho fixo.
 */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
