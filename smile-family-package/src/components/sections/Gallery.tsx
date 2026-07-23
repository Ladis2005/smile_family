import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { gallery } from '@/data/gallery';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

/** Conteúdo visual de um item: imagem real ou placeholder por gradiente. */
function GalleryVisual({
  src,
  alt,
  caption,
}: {
  src?: string;
  alt: string;
  caption: string;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/80 to-secondary/80 text-white/90">
      <ImageIcon className="h-8 w-8" aria-hidden="true" />
      <span className="text-sm font-medium">{caption}</span>
    </div>
  );
}

/** Galeria da clínica com lightbox acessível e carregamento preguiçoso. */
export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + gallery.length) % gallery.length
      ),
    []
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % gallery.length)),
    []
  );

  // Navegação por teclado no lightbox.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, close, prev, next]);

  const current = openIndex !== null ? gallery[openIndex] : null;

  return (
    <section className="section bg-gradient-soft">
      <div className="container-x">
        <SectionHeading
          eyebrow="Galeria"
          title="Um espaço pensado para si"
          lead="Conheça o ambiente da nossa clínica: acolhedor, limpo e preparado para o seu conforto."
        />

        <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((item, i) => (
            <Reveal as="li" key={item.id} delay={(i % 3) * 0.06}>
              <button
                onClick={() => setOpenIndex(i)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-soft"
                aria-label={`Ampliar: ${item.caption}`}
              >
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                  <GalleryVisual
                    src={item.src}
                    alt={item.alt}
                    caption={item.caption}
                  />
                </div>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/70 to-transparent p-3 text-left text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {item.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-dark/90 p-4 backdrop-blur"
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <motion.div
              key={current.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-h-[80vh] w-full max-w-3xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[4/3] w-full">
                <GalleryVisual
                  src={current.src}
                  alt={current.alt}
                  caption={current.caption}
                />
              </div>
              <p className="bg-white px-4 py-3 text-center text-sm font-medium text-dark">
                {current.caption}
              </p>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
