import { Link } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';

/** Página 404 para rotas inexistentes. */
export function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-soft px-6 text-center">
      <Logo />
      <p className="mt-8 font-display text-6xl font-extrabold text-gradient">
        404
      </p>
      <h1 className="mt-3 font-display text-2xl font-bold text-dark">
        Página não encontrada
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        A página que procura não existe ou foi movida.
      </p>
      <Link to="/" className="btn btn-primary mt-7">
        <HomeIcon className="h-4 w-4" aria-hidden="true" />
        Voltar ao início
      </Link>
    </main>
  );
}
