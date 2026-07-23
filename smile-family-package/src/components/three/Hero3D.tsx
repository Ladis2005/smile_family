import { Component, lazy, Suspense } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { ToothFallback } from './ToothFallback';

// Carregamento preguiçoso da cena 3D (só descarrega three/fiber quando usada).
const ToothScene = lazy(() =>
  import('./ToothScene').then((m) => ({ default: m.ToothScene }))
);

/** Se a cena 3D falhar em runtime, mostra o fallback estático. */
class ThreeErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn(
      'Falha ao renderizar a cena 3D, a usar fallback:',
      error,
      info
    );
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/**
 * Decide entre a cena 3D e o fallback estático conforme a capacidade do
 * dispositivo, com boundary de erro e Suspense.
 */
export function Hero3D() {
  const { canRender3D, ready } = useDeviceCapability();

  // Enquanto avalia, ou em dispositivos fracos, mostra o fallback.
  if (!ready || !canRender3D) {
    return <ToothFallback />;
  }

  return (
    <ThreeErrorBoundary fallback={<ToothFallback />}>
      <Suspense fallback={<ToothFallback />}>
        <ToothScene />
      </Suspense>
    </ThreeErrorBoundary>
  );
}
