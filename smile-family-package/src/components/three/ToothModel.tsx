import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Dente 3D procedural — construído com geometrias base do Three.js,
 * sem necessidade de ficheiros de modelo externos. Uma coroa arredondada
 * assente sobre duas raízes cónicas, num material branco leitoso.
 */
export function ToothModel() {
  const group = useRef<Group>(null);
  const reduced = useReducedMotion();

  useFrame((state, delta) => {
    if (!group.current) return;

    // Rotação lenta contínua.
    if (!reduced) {
      group.current.rotation.y += delta * 0.35;
    }

    // Resposta suave ao movimento do rato (inclinação subtil).
    const { x, y } = state.pointer;
    const targetX = reduced ? 0 : y * 0.2;
    const targetZ = reduced ? 0 : -x * 0.2;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
    group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.05;
  });

  return (
    <group ref={group} position={[0, -0.2, 0]} scale={1.1}>
      {/* Coroa do dente */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>

      {/* Corpo de ligação */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <cylinderGeometry args={[0.85, 0.7, 0.8, 48]} />
        <meshStandardMaterial
          color="#f7fbfc"
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>

      {/* Raiz esquerda */}
      <mesh position={[-0.32, -0.95, 0]} rotation={[0, 0, 0.12]} castShadow>
        <coneGeometry args={[0.42, 1.4, 40]} />
        <meshStandardMaterial
          color="#eef7f9"
          roughness={0.4}
          metalness={0.02}
        />
      </mesh>

      {/* Raiz direita */}
      <mesh position={[0.32, -0.95, 0]} rotation={[0, 0, -0.12]} castShadow>
        <coneGeometry args={[0.42, 1.4, 40]} />
        <meshStandardMaterial
          color="#eef7f9"
          roughness={0.4}
          metalness={0.02}
        />
      </mesh>

      {/* Brilho turquesa subtil sobre a coroa */}
      <mesh position={[0.35, 0.9, 0.6]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color="#23b5c8"
          emissive="#23b5c8"
          emissiveIntensity={0.6}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}
