import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

/** Cabeçalho reutilizável de secção (eyebrow + título + texto de apoio). */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <Reveal className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title text-balance">{title}</h2>
      {lead && (
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          {lead}
        </p>
      )}
    </Reveal>
  );
}
