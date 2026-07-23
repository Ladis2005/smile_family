import { useEffect, useRef, useState } from 'react';
import { statistics } from '@/data/statistics';
import { useCountUp } from '@/hooks/useCountUp';

/** Um número animado individual. */
function StatItem({
  value,
  suffix,
  label,
  active,
}: {
  value: number;
  suffix?: string;
  label: string;
  active: boolean;
}) {
  const count = useCountUp(value, active);
  return (
    <div className="text-center">
      <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">
        {count.toLocaleString('pt-PT')}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-white/70">{label}</p>
    </div>
  );
}

/** Secção de confiança com números animados (valores temporários). */
export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-dark py-16" ref={ref}>
      <div className="container-x">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {statistics.map((stat) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              active={active}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
