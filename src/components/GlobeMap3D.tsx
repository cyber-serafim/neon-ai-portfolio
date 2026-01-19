import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Float, Line, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';

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
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  // Earth texture URL (using a simple procedural approach instead)
  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0012;
    }
  });

  // Create Earth material with continental outlines
  const earthMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Ocean base
    ctx.fillStyle = '#0a1628';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Simplified continental shapes with neon glow effect
    ctx.fillStyle = '#00f0ff';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 10;
    
    // North America
    ctx.beginPath();
    ctx.moveTo(120, 100);
    ctx.lineTo(180, 80);
    ctx.lineTo(250, 100);
    ctx.lineTo(280, 150);
    ctx.lineTo(260, 200);
    ctx.lineTo(200, 230);
    ctx.lineTo(150, 220);
    ctx.lineTo(100, 180);
    ctx.lineTo(90, 140);
    ctx.closePath();
    ctx.fill();
    
    // South America
    ctx.beginPath();
    ctx.moveTo(220, 260);
    ctx.lineTo(260, 280);
    ctx.lineTo(280, 350);
    ctx.lineTo(260, 420);
    ctx.lineTo(230, 460);
    ctx.lineTo(200, 400);
    ctx.lineTo(190, 320);
    ctx.closePath();
    ctx.fill();
    
    // Europe
    ctx.beginPath();
    ctx.moveTo(480, 100);
    ctx.lineTo(540, 90);
    ctx.lineTo(580, 110);
    ctx.lineTo(560, 150);
    ctx.lineTo(520, 170);
    ctx.lineTo(500, 190);
    ctx.lineTo(470, 160);
    ctx.lineTo(460, 130);
    ctx.closePath();
    ctx.fill();
    
    // Africa
    ctx.beginPath();
    ctx.moveTo(480, 200);
    ctx.lineTo(540, 190);
    ctx.lineTo(580, 230);
    ctx.lineTo(600, 300);
    ctx.lineTo(580, 380);
    ctx.lineTo(530, 400);
    ctx.lineTo(480, 380);
    ctx.lineTo(460, 310);
    ctx.lineTo(470, 250);
    ctx.closePath();
    ctx.fill();
    
    // Asia
    ctx.beginPath();
    ctx.moveTo(600, 80);
    ctx.lineTo(750, 70);
    ctx.lineTo(850, 100);
    ctx.lineTo(900, 150);
    ctx.lineTo(880, 200);
    ctx.lineTo(800, 230);
    ctx.lineTo(700, 220);
    ctx.lineTo(650, 200);
    ctx.lineTo(620, 160);
    ctx.lineTo(590, 130);
    ctx.closePath();
    ctx.fill();
    
    // Australia
    ctx.beginPath();
    ctx.moveTo(800, 320);
    ctx.lineTo(870, 310);
    ctx.lineTo(910, 350);
    ctx.lineTo(900, 400);
    ctx.lineTo(850, 420);
    ctx.lineTo(800, 400);
    ctx.lineTo(780, 360);
    ctx.closePath();
    ctx.fill();
    
    // Add grid lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.shadowBlur = 0;
    
    // Latitude lines
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * 64);
      ctx.lineTo(1024, i * 64);
      ctx.stroke();
    }
    
    // Longitude lines
    for (let i = 0; i < 16; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 64, 0);
      ctx.lineTo(i * 64, 512);
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    
    return new THREE.MeshPhongMaterial({
      map: texture,
      transparent: true,
      opacity: 0.95,
      emissive: new THREE.Color('#001a2e'),
      emissiveIntensity: 0.3,
    });
  }, []);

  return (
    <group>
      {/* Main Earth */}
      <Sphere ref={earthRef} args={[2, 64, 64]} material={earthMaterial} />
      
      {/* Atmosphere glow */}
      <Sphere args={[2.08, 32, 32]}>
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Outer atmosphere */}
      <Sphere args={[2.2, 32, 32]}>
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

function KyivMarker() {
  const markerGroupRef = useRef<THREE.Group>(null);
  const basePosition = useMemo(() => latLngToVector3(KYIV_LAT, KYIV_LNG, 2.05), []);
  
  useFrame((state) => {
    if (markerGroupRef.current) {
      // Sync rotation with Earth
      const rotationY = state.clock.getElapsedTime() * 0.001;
      
      // Calculate new position based on Earth rotation
      const newPos = basePosition.clone();
      newPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationY);
      markerGroupRef.current.position.copy(newPos);
      
      // Make marker always face outward
      markerGroupRef.current.lookAt(0, 0, 0);
      markerGroupRef.current.rotateX(Math.PI);
    }
  });

  return (
    <group ref={markerGroupRef} position={basePosition}>
      {/* Marker pin */}
      <Float speed={3} rotationIntensity={0} floatIntensity={0.2}>
        <mesh position={[0, 0.1, 0]}>
          <coneGeometry args={[0.06, 0.15, 8]} />
          <meshStandardMaterial 
            color="#ff00ff" 
            emissive="#ff00ff"
            emissiveIntensity={0.8}
          />
        </mesh>
        
        {/* Glowing sphere at top */}
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={1}
          />
        </mesh>
        
        {/* Pulse ring */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.08, 0.15, 32]} />
          <meshBasicMaterial
            color="#ff00ff"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* 3D Label */}
        <Html
          position={[0, 0.5, 0]}
          center
          distanceFactor={5}
          style={{
            pointerEvents: 'none',
          }}
        >
          <div className="whitespace-nowrap font-display text-sm md:text-base font-bold text-neon-magenta animate-pulse-neon px-3 py-1 bg-background/80 backdrop-blur-sm rounded border border-neon-magenta/50 shadow-[0_0_15px_rgba(255,0,255,0.5)]">
            Kyiv, Ukraine
          </div>
        </Html>
      </Float>
    </group>
  );
}

function Particles() {
  const count = 150;
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
      particlesRef.current.rotation.y += 0.0003;
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
        size={0.025}
        transparent
        opacity={0.5}
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
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#ff00ff" />
        <directionalLight position={[5, 3, 5]} intensity={0.5} color="#ffffff" />
        
        <Earth />
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
