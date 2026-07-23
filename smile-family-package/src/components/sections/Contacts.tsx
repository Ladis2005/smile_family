import { MapPin, Mail, Phone, Clock, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { schedule } from '@/data/schedule';
import { useOpenStatus } from '@/hooks/useOpenStatus';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

/** Indicador visual "Aberto agora" / "Encerrado" (fuso Africa/Maputo). */
function OpenBadge() {
  const { isOpen } = useOpenStatus();
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        isOpen ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isOpen ? 'bg-emerald-500' : 'bg-rose-400'
        }`}
      />
      {isOpen ? 'Aberto agora' : 'Encerrado'}
    </span>
  );
}

/** Secção de contactos: localização, e-mail, telefones, horário e mapa. */
export function Contacts() {
  return (
    <section id="contacto" className="section bg-gradient-soft">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contacto"
          title="Fale connosco"
          lead="Estamos à sua disposição. Visite-nos ou entre em contacto pelos canais abaixo."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* Localização */}
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-dark">
                Localização
              </h3>
              <address className="mt-2 flex-1 text-sm not-italic leading-relaxed text-muted">
                {siteConfig.contact.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={siteConfig.contact.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-secondary"
              >
                Abrir no Google Maps
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          {/* E-mail + telefones */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-6 rounded-3xl bg-white p-7 shadow-soft">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                  <Mail className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-dark">
                  E-mail
                </h3>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="mt-2 inline-block text-sm text-primary hover:text-secondary"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="border-t border-muted/10 pt-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                  <Phone className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-dark">
                  Telefones
                </h3>
                <ul className="mt-2 space-y-1">
                  {siteConfig.contact.phones.map((phone) => (
                    <li key={phone.href}>
                      <a
                        href={phone.href}
                        className="text-sm text-primary hover:text-secondary"
                      >
                        {phone.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Horário */}
          <Reveal delay={0.2}>
            <div className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                  <Clock className="h-6 w-6" aria-hidden="true" />
                </span>
                <OpenBadge />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-dark">
                Horário
              </h3>
              <ul className="mt-3 flex-1 space-y-1.5 text-sm">
                {schedule.map((day) => (
                  <li
                    key={day.weekday}
                    className="flex justify-between gap-3 text-muted"
                  >
                    <span>{day.label}</span>
                    <span
                      className={
                        day.opensAt === null ? 'text-rose-400' : 'text-dark'
                      }
                    >
                      {day.display}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Mapa incorporado */}
        <Reveal
          delay={0.1}
          className="mt-8 overflow-hidden rounded-3xl shadow-soft"
        >
          <iframe
            title="Localização da Smile Family no mapa"
            src="https://www.openstreetmap.org/export/embed.html?bbox=32.57%2C-25.97%2C32.60%2C-25.95&layer=mapnik&marker=-25.96%2C32.585"
            className="h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}
