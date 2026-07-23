import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, CalendarCheck } from 'lucide-react';
import { navItems, siteConfig } from '@/data/site';
import { useScrolled } from '@/hooks/useScrolled';
import { useActiveSection } from '@/hooks/useActiveSection';
import { Logo } from './Logo';
import { scrollToId } from './scrollToId';

interface HeaderProps {
  onBook: () => void;
}

const sectionIds = navItems.map((item) => item.href.replace('#', ''));

/** Cabeçalho fixo: transparente no topo, branco com sombra após scroll. */
export function Header({ onBook }: HeaderProps) {
  const scrolled = useScrolled(24);
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    scrollToId(href);
  };

  const onTop = !scrolled && !menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        onTop ? 'bg-transparent' : 'bg-white/95 shadow-soft backdrop-blur-md'
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleNav('#inicio');
          }}
          aria-label="Ir para o início"
        >
          <Logo />
        </a>

        {/* Navegação desktop */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navegação principal"
        >
          {navItems.map((item) => {
            const isActive = active === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.href);
                }}
                aria-current={isActive ? 'true' : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-dark/80 hover:text-primary'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-brand"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onBook}
            className="btn btn-primary hidden sm:inline-flex"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Marcar consulta
          </button>

          {/* Botão do menu mobile */}
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-dark lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-light bg-white lg:hidden"
            aria-label="Navegação principal (mobile)"
          >
            <ul className="container-x flex flex-col py-4">
              {navItems.map((item) => {
                const isActive = active === item.href.replace('#', '');
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNav(item.href);
                      }}
                      className={`block rounded-xl px-4 py-3 text-base font-medium ${
                        isActive
                          ? 'bg-light text-primary'
                          : 'text-dark hover:bg-light'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <li className="mt-2 px-1">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onBook();
                  }}
                  className="btn btn-primary w-full"
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  Marcar consulta
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Ligações discretas aos portais (não destacadas) */}
      <span className="sr-only">Portais: {siteConfig.portals.patient}</span>
    </header>
  );
}
