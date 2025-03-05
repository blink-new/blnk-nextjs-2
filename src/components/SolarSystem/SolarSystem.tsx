import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Planet } from './Planet';
import { useState } from 'react';

// Planet data - simplified for our visualization
const planets = [
  { name: 'Sun', size: 2.5, color: '#FDB813', position: [0, 0, 0], rotationSpeed: 0.004 },
  { name: 'Mercury', size: 0.4, color: '#B7B8B9', position: [4, 0, 0], rotationSpeed: 0.01, orbitSpeed: 0.8, orbitRadius: 4 },
  { name: 'Venus', size: 0.6, color: '#E6C229', position: [6, 0, 0], rotationSpeed: 0.008, orbitSpeed: 0.6, orbitRadius: 6 },
  { name: 'Earth', size: 0.6, color: '#6B93D6', position: [8, 0, 0], rotationSpeed: 0.01, orbitSpeed: 0.4, orbitRadius: 8 },
  { name: 'Mars', size: 0.5, color: '#C1440E', position: [10, 0, 0], rotationSpeed: 0.012, orbitSpeed: 0.3, orbitRadius: 10 },
  { name: 'Jupiter', size: 1.2, color: '#D8CA9D', position: [13, 0, 0], rotationSpeed: 0.02, orbitSpeed: 0.2, orbitRadius: 13 },
  { name: 'Saturn', size: 1.0, color: '#E4D191', position: [16, 0, 0], rotationSpeed: 0.018, orbitSpeed: 0.18, orbitRadius: 16 },
  { name: 'Uranus', size: 0.8, color: '#D1E7E7', position: [19, 0, 0], rotationSpeed: 0.015, orbitSpeed: 0.14, orbitRadius: 19 },
  { name: 'Neptune', size: 0.8, color: '#5B5DDF', position: [22, 0, 0], rotationSpeed: 0.014, orbitSpeed: 0.1, orbitRadius: 22 },
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
    <div className={`relative w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 15, 30], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {planets.map((planet) => (
          <Planet key={planet.name} {...planet} />
        ))}
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
        />
      </Canvas>
      
      {selectedPlanet && (
        <div className="absolute bottom-4 left-4 bg-black/70 text-white p-4 rounded-lg max-w-xs">
          <h3 className="text-xl font-bold mb-2">{selectedPlanetData?.name}</h3>
          <p>Size: {selectedPlanetData?.size} units</p>
          <p>Rotation Speed: {selectedPlanetData?.rotationSpeed}</p>
          {selectedPlanetData?.orbitRadius && (
            <p>Distance from Sun: {selectedPlanetData.orbitRadius} units</p>
          )}
        </div>
      )}
      
      <div className="absolute top-4 left-4 bg-black/70 text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Solar System</h2>
        <p className="text-sm">Use mouse to rotate, zoom and pan</p>
      </div>
    </div>
  );
};