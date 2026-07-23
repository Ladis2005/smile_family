import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

/** Secção de avaliações — depoimentos demonstrativos até substituição. */
export function Testimonials() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Depoimentos"
          title="O que dizem os nossos pacientes"
          lead="Exemplos demonstrativos — a substituir por depoimentos reais, com consentimento."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Reveal as="li" key={testimonial.id} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-3xl border border-light bg-light/50 p-7 shadow-soft">
                <Quote
                  className="h-8 w-8 text-secondary/40"
                  aria-hidden="true"
                />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-dark/80">
                  “{testimonial.quote}”
                </blockquote>
                <div
                  className="mt-5 flex gap-0.5"
                  aria-label={`${testimonial.rating} de 5 estrelas`}
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${
                        s < testimonial.rating
                          ? 'fill-secondary text-secondary'
                          : 'text-muted/30'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <figcaption className="mt-4 border-t border-muted/10 pt-4">
                  <p className="font-display text-sm font-semibold text-dark">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted">{testimonial.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
