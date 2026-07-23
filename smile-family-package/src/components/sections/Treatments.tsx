import { ArrowRight } from 'lucide-react';
import { treatments } from '@/data/treatments';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

interface TreatmentsProps {
  onBook: () => void;
}

/** Grelha moderna com os tratamentos oferecidos. */
export function Treatments({ onBook }: TreatmentsProps) {
  return (
    <section id="tratamentos" className="section bg-gradient-soft">
      <div className="container-x">
        <SectionHeading
          eyebrow="Serviços"
          title="Os nossos tratamentos"
          lead="Cuidados completos de saúde oral, com segurança e conforto em cada etapa."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment, i) => {
            const Icon = treatment.icon;
            return (
              <Reveal as="li" key={treatment.id} delay={(i % 3) * 0.08}>
                <article className="group flex h-full flex-col rounded-3xl border border-white bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-light text-primary transition-all duration-300 group-hover:bg-gradient-brand group-hover:text-white">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-dark">
                    {treatment.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {treatment.description}
                  </p>
                  <button
                    onClick={onBook}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-secondary"
                    aria-label={`Saber mais sobre ${treatment.name}`}
                  >
                    Saber mais
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
