import { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend, Object3DNode } from '@react-three/fiber';
import { Sphere, OrbitControls, Float, Line } from '@react-three/drei';
import * as THREE from 'three';

// Kyiv coordinates (approximate)
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

function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y += 0.002;
    }
  });

  const gridLines = useMemo(() => {
    const lines: JSX.Element[] = [];
    
    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      const points: [number, number, number][] = [];
      for (let lng = 0; lng <= 360; lng += 5) {
        const vec = latLngToVector3(lat, lng, 2.02);
        points.push([vec.x, vec.y, vec.z]);
      }
      lines.push(
        <Line key={`lat-${lat}`} points={points} color="#00f0ff" opacity={0.3} transparent lineWidth={1} />
      );
    }
    
    // Longitude lines
    for (let lng = 0; lng < 360; lng += 30) {
      const points: [number, number, number][] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        const vec = latLngToVector3(lat, lng, 2.02);
        points.push([vec.x, vec.y, vec.z]);
      }
      lines.push(
        <Line key={`lng-${lng}`} points={points} color="#00f0ff" opacity={0.3} transparent lineWidth={1} />
      );
    }
    
    return lines;
  }, []);

  return (
    <group>
      {/* Main globe */}
      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <meshPhongMaterial
          color="#0a0a1a"
          emissive="#001122"
          transparent
          opacity={0.9}
          wireframe={false}
        />
      </Sphere>
      
      {/* Wireframe overlay */}
      <Sphere args={[2.01, 32, 32]}>
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>
      
      {/* Grid lines */}
      <group>
        {gridLines}
      </group>
      
      {/* Glow effect */}
      <Sphere args={[2.15, 32, 32]}>
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

function LocationMarker() {
  const markerRef = useRef<THREE.Group>(null);
  const position = latLngToVector3(KYIV_LAT, KYIV_LNG, 2.05);
  
  useFrame((state) => {
    if (markerRef.current) {
      // Rotate with globe
      const time = state.clock.getElapsedTime();
      const rotationY = time * 0.002;
      
      // Calculate new position based on globe rotation
      const newPos = position.clone();
      newPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationY);
      markerRef.current.position.copy(newPos);
      
      // Point marker outward from center
      markerRef.current.lookAt(0, 0, 0);
      markerRef.current.rotateX(Math.PI);
    }
  });

  return (
    <group ref={markerRef} position={position}>
      <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
        {/* Marker pin */}
        <mesh>
          <coneGeometry args={[0.08, 0.2, 8]} />
          <meshStandardMaterial 
            color="#ff00ff" 
            emissive="#ff00ff"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Glowing ring */}
        <mesh position={[0, 0.15, 0]}>
          <torusGeometry args={[0.12, 0.02, 8, 32]} />
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={1}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Pulse effect */}
        <mesh position={[0, 0.15, 0]}>
          <ringGeometry args={[0.15, 0.25, 32]} />
          <meshBasicMaterial
            color="#ff00ff"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Particles() {
  const count = 200;
  const particlesRef = useRef<THREE.Points>(null);
  
  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      sizes[i] = Math.random() * 0.05 + 0.02;
    }
    
    return [positions, sizes];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
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
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00f0ff"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export const GlobeMap3D = () => {
  return (
    <div className="w-full h-[300px] md:h-[350px] relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        
        <Globe />
        <LocationMarker />
        <Particles />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      
      {/* Label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <div className="font-display text-sm text-neon-cyan animate-pulse-neon">
          Kyiv, Ukraine
        </div>
      </div>
    </div>
  );
};
