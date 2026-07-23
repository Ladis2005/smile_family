import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { ToothModel } from './ToothModel';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Cena 3D do hero: iluminação elegante, sombra de contacto suave e
 * flutuação leve. Carregada de forma preguiçosa/condicional pelo hero.
 */
export function ToothScene() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.5, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-4, 2, -3]}
        intensity={0.5}
        color="#23b5c8"
      />

      <Suspense fallback={null}>
        <Float
          speed={reduced ? 0 : 1.4}
          rotationIntensity={reduced ? 0 : 0.3}
          floatIntensity={reduced ? 0 : 0.6}
        >
          <ToothModel />
        </Float>

        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.35}
          scale={9}
          blur={2.6}
          far={4}
          color="#07364a"
        />

        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
