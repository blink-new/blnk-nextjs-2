import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Planet } from './Planet';
import { useState } from 'react';

// Planet data with brighter colors
const planets = [
  { name: 'Sun', size: 2.5, color: '#FFDD00', position: [0, 0, 0], rotationSpeed: 0.004, emissive: '#FFDD00', emissiveIntensity: 0.6 },
  { name: 'Mercury', size: 0.4, color: '#E0E0E0', position: [4, 0, 0], rotationSpeed: 0.01, orbitSpeed: 0.8, orbitRadius: 4 },
  { name: 'Venus', size: 0.6, color: '#FFD085', position: [6, 0, 0], rotationSpeed: 0.008, orbitSpeed: 0.6, orbitRadius: 6 },
  { name: 'Earth', size: 0.6, color: '#4EABFF', position: [8, 0, 0], rotationSpeed: 0.01, orbitSpeed: 0.4, orbitRadius: 8 },
  { name: 'Mars', size: 0.5, color: '#FF6D3A', position: [10, 0, 0], rotationSpeed: 0.012, orbitSpeed: 0.3, orbitRadius: 10 },
  { name: 'Jupiter', size: 1.2, color: '#FFCB8B', position: [13, 0, 0], rotationSpeed: 0.02, orbitSpeed: 0.2, orbitRadius: 13 },
  { name: 'Saturn', size: 1.0, color: '#FFEDBF', position: [16, 0, 0], rotationSpeed: 0.018, orbitSpeed: 0.18, orbitRadius: 16 },
  { name: 'Uranus', size: 0.8, color: '#A6FFF8', position: [19, 0, 0], rotationSpeed: 0.015, orbitSpeed: 0.14, orbitRadius: 19 },
  { name: 'Neptune', size: 0.8, color: '#5B8CFF', position: [22, 0, 0], rotationSpeed: 0.014, orbitSpeed: 0.1, orbitRadius: 22 },
];

export interface SolarSystemProps {
  className?: string;
}

export const SolarSystem = ({ className }: SolarSystemProps) => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  
  const handlePlanetClick = (name: string) => {
    setSelectedPlanet(name === selectedPlanet ? null : name);
  };
  
  const selectedPlanetData = planets.find(p => p.name === selectedPlanet);

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 15, 30], fov: 60 }}>
        {/* Increased ambient light for better visibility */}
        <ambientLight intensity={0.4} />
        
        {/* Brighter sun light */}
        <pointLight position={[0, 0, 0]} intensity={3} color="#FFDD00" />
        
        {/* More stars for immersion */}
        <Stars radius={100} depth={50} count={7000} factor={4} saturation={0.5} fade speed={1} />
        
        {planets.map((planet) => (
          <Planet key={planet.name} {...planet} />
        ))}
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
          autoRotate={false}
          autoRotateSpeed={0.1}
        />
      </Canvas>
      
      {selectedPlanet && (
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white p-4 rounded-lg max-w-xs border border-white/10">
          <h3 className="text-xl font-bold mb-2">{selectedPlanetData?.name}</h3>
          <p>Size: {selectedPlanetData?.size} units</p>
          <p>Rotation Speed: {selectedPlanetData?.rotationSpeed}</p>
          {selectedPlanetData?.orbitRadius && (
            <p>Distance from Sun: {selectedPlanetData.orbitRadius} units</p>
          )}
        </div>
      )}
    </div>
  );
};