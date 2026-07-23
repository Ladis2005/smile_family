import { useState } from 'react';
import { siteConfig } from '@/data/site';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

/**
 * Botão flutuante do WhatsApp, fixo no canto inferior direito.
 * Acessível por teclado, com tooltip e animação suave. Abre em nova aba.
 */
export function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-6 sm:right-6">
      <span
        role="tooltip"
        className={`pointer-events-none hidden rounded-full bg-dark px-3 py-1.5 text-sm font-medium text-white shadow-soft transition-all sm:block ${
          hovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
        }`}
      >
        Fale connosco
      </span>
      <a
        href={siteConfig.whatsapp.general}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale connosco no WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition-transform duration-200 hover:scale-110 focus-visible:scale-110"
      >
        <WhatsAppIcon className="h-7 w-7 transition-transform group-hover:rotate-6" />
        {/* Pulso suave */}
        <span className="absolute inline-flex h-14 w-14 animate-ping rounded-full bg-[#25D366] opacity-20" />
      </a>
    </div>
  );
}
