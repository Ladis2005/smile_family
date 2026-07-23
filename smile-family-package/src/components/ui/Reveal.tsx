import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RevealProps {
  children: ReactNode;
  /** Atraso em segundos para escalonar entradas. */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'section';
}

/**
 * Entrada suave (fade + subida) quando o elemento aparece no ecrã.
 * Sem movimento quando o utilizador prefere movimento reduzido.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
