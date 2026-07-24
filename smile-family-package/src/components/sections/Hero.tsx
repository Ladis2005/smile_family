import { motion } from 'framer-motion';
import {
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Award,
} from 'lucide-react';
import { scrollToId } from '@/components/layout/scrollToId';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface HeroProps {
  onBook: () => void;
}

const floatingLabels = [
  { icon: ShieldCheck, text: 'Atendimento familiar', pos: 'left-0 top-10' },
  {
    icon: Cpu,
    text: 'Tecnologia moderna',
    pos: 'right-0 top-1/3',
  },
  {
    icon: Award,
    text: 'Profissionais qualificados',
    pos: 'left-6 bottom-10',
  },
];

/** Secção principal em tela cheia com elemento 3D e etiquetas flutuantes. */
export function Hero({ onBook }: HeroProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-soft pt-20"
    >
      {/* Formas abstratas de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container-x relative grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-6">
        {/* Texto */}
        <div className="text-center lg:text-left">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur"
          >
            Seja bem-vindo à Smile Family
          </motion.span>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-5 font-display text-4xl font-extrabold leading-[1.1] text-dark sm:text-5xl lg:text-[3.4rem]"
          >
            A clínica dentária perfeita para{' '}
            <span className="text-gradient">cuidar do seu sorriso</span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0"
          >
            Cuide do seu sorriso e da sua família com atendimento humanizado,
            profissionais qualificados e tecnologia moderna.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <button
              onClick={onBook}
              className="btn btn-primary w-full sm:w-auto"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Marcar consulta
            </button>
            <button
              onClick={() => scrollToId('#sobre')}
              className="btn btn-outline w-full sm:w-auto"
            >
              Saber mais
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.div>
        </div>

        {/* Ilustração + etiquetas */}
        <div className="relative mx-auto h-[340px] w-full max-w-lg sm:h-[440px] lg:h-[520px]">
          <div className="flex h-full w-full items-center justify-center">
            <img
              src="/images/hero-icon.png"
              alt="Ilustração da Smile Family"
              className={`h-64 w-64 drop-shadow-[0_20px_40px_rgba(8,54,74,0.25)] sm:h-80 sm:w-80 ${
                reduced ? '' : 'animate-float'
              }`}
            />
          </div>

          {floatingLabels.map((label, i) => {
            const Icon = label.icon;
            return (
              <motion.div
                key={label.text}
                initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                className={`absolute ${label.pos} hidden items-center gap-2 rounded-2xl bg-white/90 px-3.5 py-2.5 shadow-card backdrop-blur sm:flex ${
                  reduced ? '' : 'animate-float'
                }`}
                style={{ animationDelay: `${i * 0.8}s` }}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand text-white">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-dark">
                  {label.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
