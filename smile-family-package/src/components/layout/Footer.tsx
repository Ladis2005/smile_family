import { MapPin, Mail, Phone } from 'lucide-react';
import { navItems, siteConfig } from '@/data/site';
import { schedule } from '@/data/schedule';
import { Logo } from './Logo';
import { scrollToId } from './scrollToId';

interface FooterProps {
  onBook: () => void;
}

/** Rodapé completo em quatro colunas + barra inferior com créditos. */
export function Footer({ onBook }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white/80">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Coluna 1 — marca */}
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            O nosso compromisso é cuidar do seu sorriso com excelência,
            confiança e atendimento humanizado.
          </p>
        </div>

        {/* Coluna 2 — links úteis */}
        <nav aria-label="Links úteis">
          <h3 className="font-display text-base font-semibold text-white">
            Links úteis
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(item.href);
                  }}
                  className="text-white/70 transition-colors hover:text-secondary"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={onBook}
                className="text-white/70 transition-colors hover:text-secondary"
              >
                Marcar consulta
              </button>
            </li>
          </ul>
        </nav>

        {/* Coluna 3 — horário */}
        <div>
          <h3 className="font-display text-base font-semibold text-white">
            Horário de atendimento
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {schedule.map((day) => (
              <li key={day.weekday} className="flex justify-between gap-4">
                <span className="text-white/70">{day.label}</span>
                <span
                  className={
                    day.opensAt === null ? 'text-white/40' : 'text-white/90'
                  }
                >
                  {day.display}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 4 — contactos */}
        <div>
          <h3 className="font-display text-base font-semibold text-white">
            Contactos
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <span className="text-white/70">
                {siteConfig.contact.address.lines.join(', ')}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-white/70 transition-colors hover:text-secondary"
              >
                {siteConfig.contact.email}
              </a>
            </li>
            {siteConfig.contact.phones.map((phone) => (
              <li key={phone.href} className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <a
                  href={phone.href}
                  className="text-white/70 transition-colors hover:text-secondary"
                >
                  {phone.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-white/50 sm:flex-row sm:text-left">
          <p>
            Copyright © {year} {siteConfig.legalName}. Todos os direitos
            reservados.
          </p>
          <p>
            Website desenvolvido por{' '}
            <span className="font-medium text-white/70">
              {siteConfig.credit.author}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
