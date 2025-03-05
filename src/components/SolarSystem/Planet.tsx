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
}

export const Planet = ({
  position,
  size,
  color,
  rotationSpeed = 0.01,
  orbitSpeed = 0,
  orbitRadius = 0,
  name,
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

  return (
    <mesh ref={meshRef} position={position} name={name}>
      <Sphere args={[size, 32, 32]}>
        <meshStandardMaterial color={color} />
      </Sphere>
    </mesh>
  );
};