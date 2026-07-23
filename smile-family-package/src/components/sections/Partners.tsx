import { partners } from '@/data/partners';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** Um item do carrossel: logótipo real ou espaço reservado. */
function PartnerItem({ name, logo }: { name: string; logo?: string }) {
  return (
    <li className="flex h-20 w-40 shrink-0 items-center justify-center px-6">
      {logo ? (
        <img
          src={logo}
          alt={name}
          loading="lazy"
          className="max-h-12 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
        />
      ) : (
        <span
          className="flex h-12 w-full items-center justify-center rounded-lg border border-dashed border-muted/30 text-xs font-medium text-muted/60"
          aria-label={`${name} (logótipo a adicionar)`}
        >
          {name}
        </span>
      )}
    </li>
  );
}

/** Secção de parceiros com carrossel infinito suave (pausa no hover). */
export function Partners() {
  // Duplicar a lista para o loop contínuo.
  const loop = [...partners, ...partners];

  return (
    <section id="parceiros" className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Confiança"
          title="Os nossos parceiros"
          lead="Trabalhamos com marcas e instituições que partilham o nosso compromisso com a qualidade."
        />
      </div>

      <div className="group mt-12 overflow-hidden fade-edges">
        <ul
          className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:justify-center motion-reduce:flex-wrap"
          aria-label="Logótipos de parceiros"
        >
          {loop.map((partner, i) => (
            <PartnerItem
              key={`${partner.id}-${i}`}
              name={partner.name}
              logo={partner.logo}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
