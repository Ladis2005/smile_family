import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { features } from '@/data/features';
import { Reveal } from '@/components/ui/Reveal';
import { scrollToId } from '@/components/layout/scrollToId';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** Secção "Porquê a Smile Family?" com diferenciais e composição visual. */
export function WhySmileFamily() {
  const reduced = useReducedMotion();

  return (
    <section id="sobre" className="section bg-white">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Texto + diferenciais */}
        <div>
          <Reveal>
            <span className="eyebrow">Sobre a clínica</span>
            <h2 className="section-title text-balance">
              Porquê escolher a Smile Family?
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
              <p>
                Na Smile Family, o nosso compromisso vai além de tratar dentes.
                Oferecemos atendimento odontológico humanizado e de alta
                qualidade, ajudando famílias a manterem sorrisos saudáveis,
                confiantes e felizes.
              </p>
              <p>
                Com uma equipa dedicada, instalações confortáveis e tecnologia
                moderna, estamos preparados para cuidar das suas necessidades
                odontológicas em todas as fases da vida.
              </p>
            </div>
            <button
              onClick={() => scrollToId('#tratamentos')}
              className="btn btn-primary mt-7"
            >
              Conhecer a clínica
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} delay={i * 0.08}>
                  <div className="group h-full rounded-2xl border border-light bg-light/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 hover:shadow-card">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white transition-transform group-hover:scale-110">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-dark">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {feature.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Composição visual (foto + elemento 3D discreto) */}
        <Reveal delay={0.1} className="relative">
          <div className="relative mx-auto max-w-md">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft">
              <img
                src="/images/clinica-recepcao.jpg"
                alt="Receção da clínica Smile Family"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Cartão flutuante discreto */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -left-4 rounded-2xl bg-white p-4 shadow-card sm:-left-8"
            >
              <p className="font-display text-2xl font-bold text-gradient">
                100%
              </p>
              <p className="text-xs font-medium text-muted">
                Foco no seu conforto
              </p>
            </motion.div>

            {/* Forma decorativa turquesa */}
            <div
              aria-hidden="true"
              className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-secondary/20 blur-2xl"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
