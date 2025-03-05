import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  rotationSpeed?: number;
  orbitSpeed?: number;
  orbitRadius?: number;
  texture?: string;
  name: string;
  emissive?: string;
  emissiveIntensity?: number;
}

export const Planet = ({
  position,
  size,
  color,
  rotationSpeed = 0.01,
  orbitSpeed = 0,
  orbitRadius = 0,
  name,
  emissive,
  emissiveIntensity = 0,
}: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useRef<[number, number, number]>(position);
  
  useFrame((_state, delta) => {
    if (meshRef.current) {
      // Self rotation
      meshRef.current.rotation.y += rotationSpeed * delta;
      
      // Orbital movement
      if (orbitSpeed && orbitRadius) {
        const time = Date.now() * 0.001 * orbitSpeed;
        meshRef.current.position.x = Math.sin(time) * orbitRadius;
        meshRef.current.position.z = Math.cos(time) * orbitRadius;
      }
    }
  });

  // Add orbit path visualization for planets
  const showOrbitPath = orbitRadius > 0;

  return (
    <>
      {/* Orbit path */}
      {showOrbitPath && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[orbitRadius - 0.02, orbitRadius + 0.02, 64]} />
          <meshBasicMaterial color="#ffffff" opacity={0.1} transparent={true} side={THREE.DoubleSide} />
        </mesh>
      )}
      
      {/* Planet */}
      <mesh ref={meshRef} position={position} name={name}>
        <Sphere args={[size, 32, 32]}>
          <meshStandardMaterial 
            color={color} 
            emissive={emissive || '#000000'} 
            emissiveIntensity={emissiveIntensity}
            metalness={0.2}
            roughness={0.7}
          />
        </Sphere>
      </mesh>
    </>
  );
};