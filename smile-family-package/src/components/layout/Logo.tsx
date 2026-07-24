interface LogoProps {
  className?: string;
  /** Em fundos escuros usar "light" para dar contraste ao logótipo. */
  variant?: 'default' | 'light';
}

/** Logótipo Smile Family. */
export function Logo({ className = '', variant = 'default' }: LogoProps) {
  const img = (
    <img src="/logo.png" alt="Smile Family — Consultório Dentário" className="h-14 w-auto" />
  );

  return (
    <span className={`inline-flex items-center ${className}`}>
      {variant === 'light' ? (
        <span className="rounded-lg bg-white px-3 py-2">{img}</span>
      ) : (
        img
      )}
    </span>
  );
}
