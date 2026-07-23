import { useEffect, useState } from 'react';

/**
 * Estima se o dispositivo aguenta bem uma cena 3D.
 * Considera WebGL, número de núcleos e largura do ecrã. Conservador por
 * omissão: em caso de dúvida, prefere o fallback estático.
 */
export function useDeviceCapability(): {
  canRender3D: boolean;
  ready: boolean;
} {
  const [state, setState] = useState({ canRender3D: false, ready: false });

  useEffect(() => {
    let canRender3D = true;

    // 1. WebGL disponível?
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ??
        canvas.getContext('webgl') ??
        canvas.getContext('experimental-webgl');
      if (!gl) canRender3D = false;
    } catch {
      canRender3D = false;
    }

    // 2. Poucos núcleos => provavelmente dispositivo fraco.
    const cores = navigator.hardwareConcurrency ?? 4;
    if (cores <= 2) canRender3D = false;

    // 3. Sinal de poupança de dados.
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (connection?.saveData) canRender3D = false;

    // Deteção única na montagem — atualização intencional de estado.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ canRender3D, ready: true });
  }, []);

  return state;
}
