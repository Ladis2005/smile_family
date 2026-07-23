interface LogoProps {
  className?: string;
  /** Cor do texto. Em fundos escuros usar "light". */
  variant?: 'default' | 'light';
}

/** Logótipo Smile Family: marca (dente) + wordmark. */
export function Logo({ className = '', variant = 'default' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-dark';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className="h-9 w-9 shrink-0"
        role="img"
        aria-label="Smile Family"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#087ea4" />
            <stop offset="1" stopColor="#23b5c8" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#logoGrad)" />
        <path
          fill="#fff"
          d="M32 16c-6 0-9 3-13 3-4 0-6-2-6 3 0 8 3 14 6 20 2 4 4 5 6 5s3-4 5-8c1-2 2-2 3 0 2 4 3 8 5 8s4-1 6-5c3-6 6-12 6-20 0-5-2-3-6-3-4 0-7-3-12-3z"
        />
      </svg>
      <span className={`flex flex-col leading-none ${textColor}`}>
        <span className="font-display text-lg font-bold tracking-tight">
          Smile Family
        </span>
        <span
          className={`text-[0.62rem] font-medium uppercase tracking-[0.2em] ${
            variant === 'light' ? 'text-white/70' : 'text-muted'
          }`}
        >
          Clínica Dentária
        </span>
      </span>
    </span>
  );
}
