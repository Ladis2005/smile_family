/**
 * Fallback estático do hero (sem WebGL/3D). Ilustração SVG de um dente
 * com brilho, para dispositivos fracos ou com movimento reduzido.
 */
export function ToothFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 240 260"
        className="h-64 w-64 drop-shadow-[0_20px_40px_rgba(8,54,74,0.25)] sm:h-80 sm:w-80"
        role="img"
        aria-label="Ilustração de um dente saudável"
      >
        <defs>
          <linearGradient id="toothGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#e5f4f8" />
          </linearGradient>
          <radialGradient id="halo" cx="50%" cy="40%" r="60%">
            <stop offset="0" stopColor="#23b5c8" stopOpacity="0.35" />
            <stop offset="1" stopColor="#23b5c8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="120" cy="110" r="110" fill="url(#halo)" />
        <path
          fill="url(#toothGrad)"
          stroke="#087ea4"
          strokeWidth="3"
          d="M120 40c-24 0-36 12-52 12-16 0-24-8-24 12 0 32 12 56 24 80 8 16 16 20 24 20s12-16 20-32c4-8 12-8 16 0 8 16 12 32 20 32s16-4 24-20c12-24 24-48 24-80 0-20-8-12-24-12-16 0-28-12-52-12z"
        />
        <path
          fill="#23b5c8"
          d="M150 66c6 4 8 12 6 20-1 5-8 4-8-1 1-8-2-13-6-16-4-3-1-6 8-3z"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
