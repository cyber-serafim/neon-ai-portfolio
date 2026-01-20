import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// Country data with coordinates for labels
const COUNTRIES = [
  { name: 'Ukraine', lat: 49.0, lng: 32.0, highlight: true },
  { name: 'USA', lat: 39.0, lng: -98.0 },
  { name: 'Canada', lat: 56.0, lng: -106.0 },
  { name: 'Brazil', lat: -14.0, lng: -51.0 },
  { name: 'Russia', lat: 61.0, lng: 105.0 },
  { name: 'China', lat: 35.0, lng: 105.0 },
  { name: 'India', lat: 21.0, lng: 78.0 },
  { name: 'Australia', lat: -25.0, lng: 133.0 },
  { name: 'Germany', lat: 51.0, lng: 10.0 },
  { name: 'France', lat: 46.0, lng: 2.0 },
  { name: 'UK', lat: 54.0, lng: -2.0 },
  { name: 'Japan', lat: 36.0, lng: 138.0 },
  { name: 'Argentina', lat: -38.0, lng: -63.0 },
  { name: 'South Africa', lat: -30.0, lng: 25.0 },
  { name: 'Egypt', lat: 26.0, lng: 30.0 },
  { name: 'Mexico', lat: 23.0, lng: -102.0 },
  { name: 'Poland', lat: 52.0, lng: 20.0 },
  { name: 'Spain', lat: 40.0, lng: -4.0 },
  { name: 'Italy', lat: 42.0, lng: 12.0 },
  { name: 'Turkey', lat: 39.0, lng: 35.0 },
  { name: 'Indonesia', lat: -5.0, lng: 120.0 },
  { name: 'Saudi Arabia', lat: 24.0, lng: 45.0 },
  { name: 'Kazakhstan', lat: 48.0, lng: 67.0 },
  { name: 'Nigeria', lat: 10.0, lng: 8.0 },
  { name: 'Kenya', lat: -1.0, lng: 38.0 },
];

// Kyiv coordinates
const KYIV_LAT = 50.4501;
const KYIV_LNG = 30.5234;

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return new THREE.Vector3(x, y, z);
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const [texturesLoaded, setTexturesLoaded] = useState(false);
  
  // NASA Earth textures - Blue Marble
  const earthTexture = useLoader(
    THREE.TextureLoader,
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg'
  );
  
  const bumpTexture = useLoader(
    THREE.TextureLoader,
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png'
  );

  useEffect(() => {
    if (earthTexture && bumpTexture) {
      setTexturesLoaded(true);
    }
  }, [earthTexture, bumpTexture]);
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <group>
      {/* Main Earth with real textures */}
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={0.05}
          metalness={0.1}
          roughness={0.8}
        />
      </Sphere>
      
      {/* Atmosphere glow - cyan */}
      <Sphere args={[2.06, 32, 32]}>
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Outer atmosphere glow */}
      <Sphere args={[2.15, 32, 32]}>
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

function CountryLabels() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <group ref={groupRef}>
      {COUNTRIES.map((country) => {
        const position = latLngToVector3(country.lat, country.lng, 2.15);
        const isHighlight = country.highlight;
        
        return (
          <Html
            key={country.name}
            position={[position.x, position.y, position.z]}
            center
            distanceFactor={6}
            occlude={false}
            style={{
              pointerEvents: 'none',
              opacity: 0.9,
            }}
          >
            <div 
              className={`whitespace-nowrap font-display text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm transition-all ${
                isHighlight 
                  ? 'text-neon-magenta font-bold text-xs border border-neon-magenta/50 bg-background/70 shadow-[0_0_10px_rgba(255,0,255,0.4)]' 
                  : 'text-neon-cyan/80 bg-background/50 border border-neon-cyan/20'
              }`}
            >
              {country.name}
            </div>
          </Html>
        );
      })}
    </group>
  );
}

function KyivMarker() {
  const markerGroupRef = useRef<THREE.Group>(null);
  const basePosition = useMemo(() => latLngToVector3(KYIV_LAT, KYIV_LNG, 2.08), []);
  
  useFrame((state) => {
    if (markerGroupRef.current) {
      const rotationY = state.clock.getElapsedTime() * 0.0008;
      const newPos = basePosition.clone();
      newPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationY);
      markerGroupRef.current.position.copy(newPos);
      markerGroupRef.current.lookAt(0, 0, 0);
      markerGroupRef.current.rotateX(Math.PI);
    }
  });

  return (
    <group ref={markerGroupRef} position={basePosition}>
      <Float speed={3} rotationIntensity={0} floatIntensity={0.15}>
        {/* Marker pin */}
        <mesh position={[0, 0.08, 0]}>
          <coneGeometry args={[0.05, 0.12, 8]} />
          <meshStandardMaterial 
            color="#ff00ff" 
            emissive="#ff00ff"
            emissiveIntensity={0.9}
          />
        </mesh>
        
        {/* Glowing sphere */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={1.2}
          />
        </mesh>
        
        {/* Pulse ring */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.06, 0.12, 32]} />
          <meshBasicMaterial
            color="#ff00ff"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Kyiv label */}
        <Html
          position={[0, 0.4, 0]}
          center
          distanceFactor={5}
          style={{ pointerEvents: 'none' }}
        >
          <div className="whitespace-nowrap font-display text-sm font-bold text-neon-magenta animate-pulse-neon px-3 py-1 bg-background/80 backdrop-blur-sm rounded border border-neon-magenta/50 shadow-[0_0_15px_rgba(255,0,255,0.6)]">
            📍 Kyiv, Ukraine
          </div>
        </Html>
      </Float>
    </group>
  );
}

function Particles() {
  const count = 120;
  const particlesRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00f0ff"
        size={0.02}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export const GlobeMap3D = () => {
  return (
    <div className="w-full h-[300px] md:h-[350px] relative">
      <Canvas
        camera={{ position: [0, 0.5, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#00f0ff" />
        <directionalLight position={[5, 3, 5]} intensity={0.6} color="#ffffff" />
        
        <Earth />
        <CountryLabels />
        <KyivMarker />
        <Particles />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};
