import { CalendarCheck } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Reveal } from '@/components/ui/Reveal';

interface CallToActionProps {
  onBook: () => void;
}

/** Chamada para ação forte antes da secção de contactos. */
export function CallToAction({ onBook }: CallToActionProps) {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-gradient-brand px-6 py-16 text-center shadow-glow sm:px-12">
          {/* Formas decorativas */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 -right-8 h-56 w-56 rounded-full bg-dark/20 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Está pronto para cuidar do seu sorriso?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg">
              Marque a sua consulta e dê o primeiro passo para um sorriso mais
              saudável e confiante.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={onBook}
                className="btn w-full bg-white text-primary hover:-translate-y-0.5 hover:bg-light sm:w-auto"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Marcar consulta
              </button>
              <a
                href={siteConfig.whatsapp.appointment}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full border border-white/40 text-white hover:bg-white/10 sm:w-auto"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
