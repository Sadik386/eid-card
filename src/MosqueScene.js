import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

// ── Stars particle system ────────────────────────────────────────────────────
function StarField({ count = 320, color }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 80;
      arr[i * 3 + 1] = Math.random() * 30 + 5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.008;
    }
  });

  const threeColor = useMemo(() => new THREE.Color(color || '#f5d76e'), [color]);

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={threeColor}
        size={0.12}
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}

// ── Crescent Moon ────────────────────────────────────────────────────────────
function CrescentMoon({ color, position = [4, 7, -10] }) {
  const group = useRef();
  const threeColor = useMemo(() => new THREE.Color(color || '#f5d76e'), [color]);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.4) * 0.3;
      group.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.25) * 0.05;
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Full circle */}
      <mesh>
        <circleGeometry args={[1.2, 64]} />
        <meshStandardMaterial color={threeColor} emissive={threeColor} emissiveIntensity={0.6} />
      </mesh>
      {/* Cutout circle to form crescent */}
      <mesh position={[0.55, 0.15, 0.01]}>
        <circleGeometry args={[0.95, 64]} />
        <meshStandardMaterial color={new THREE.Color(color === '#a8f0c6' ? '#071a10' : color === '#d7bde2' ? '#0d0720' : '#0b0b2a')} />
      </mesh>
      {/* Glow halo */}
      <pointLight color={threeColor} intensity={1.2} distance={8} decay={2} />
    </group>
  );
}

// ── Ground plane ─────────────────────────────────────────────────────────────
function Ground({ color }) {
  const threeColor = useMemo(() => new THREE.Color(color || '#080820'), [color]);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial color={threeColor} roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

// ── Minaret ──────────────────────────────────────────────────────────────────
function Minaret({ position, theme }) {
  const mColor = useMemo(() => new THREE.Color(theme.minaretColor || '#141440'), [theme]);
  const dColor = useMemo(() => new THREE.Color(theme.domeColor || '#1a1a4a'), [theme]);
  const aColor = useMemo(() => new THREE.Color(theme.primary || '#d4af37'), [theme]);

  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.5, 0.8, 0.5]} />
        <meshStandardMaterial color={mColor} roughness={0.6} />
      </mesh>
      {/* Shaft */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 2, 8]} />
        <meshStandardMaterial color={mColor} roughness={0.55} />
      </mesh>
      {/* Balcony ring */}
      <mesh position={[0, 2.85, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.12, 8]} />
        <meshStandardMaterial color={aColor} metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Upper shaft */}
      <mesh position={[0, 3.6, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.17, 1.5, 8]} />
        <meshStandardMaterial color={mColor} roughness={0.55} />
      </mesh>
      {/* Mini dome */}
      <mesh position={[0, 4.55, 0]}>
        <sphereGeometry args={[0.18, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color={dColor} roughness={0.4} />
      </mesh>
      {/* Finial */}
      <mesh position={[0, 4.8, 0]}>
        <coneGeometry args={[0.04, 0.35, 8]} />
        <meshStandardMaterial color={aColor} metalness={0.7} roughness={0.2} emissive={aColor} emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

// ── Mosque main body ─────────────────────────────────────────────────────────
function MosqueBody({ theme }) {
  const bodyRef = useRef();
  const mColor = useMemo(() => new THREE.Color(theme.minaretColor || '#141440'), [theme]);
  const dColor = useMemo(() => new THREE.Color(theme.domeColor || '#1a1a4a'), [theme]);
  const aColor = useMemo(() => new THREE.Color(theme.primary || '#d4af37'), [theme]);

  // Gentle ambient float
  useFrame(({ clock }) => {
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.04;
    }
  });

  return (
    <group ref={bodyRef}>
      {/* Main building */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.4, 2.4]} />
        <meshStandardMaterial color={mColor} roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Front arcade arches (decorative boxes) */}
      {[-0.9, 0, 0.9].map((x, i) => (
        <group key={i} position={[x, 0.65, 1.21]}>
          <mesh>
            <boxGeometry args={[0.6, 1.0, 0.05]} />
            <meshStandardMaterial color={dColor} roughness={0.5} />
          </mesh>
          {/* Arch top */}
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.05, 16, 1, false, 0, Math.PI]} />
            <meshStandardMaterial color={aColor} metalness={0.4} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Side decorative strips */}
      <mesh position={[0, 1.42, 0]}>
        <boxGeometry args={[3.22, 0.1, 2.42]} />
        <meshStandardMaterial color={aColor} metalness={0.5} roughness={0.3} emissive={aColor} emissiveIntensity={0.1} />
      </mesh>

      {/* Main dome */}
      <mesh position={[0, 2.4, 0]} castShadow>
        <sphereGeometry args={[1.05, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color={dColor} roughness={0.4} metalness={0.15} />
      </mesh>
      {/* Dome base ring */}
      <mesh position={[0, 1.52, 0]}>
        <cylinderGeometry args={[1.08, 1.1, 0.18, 32]} />
        <meshStandardMaterial color={aColor} metalness={0.6} roughness={0.25} emissive={aColor} emissiveIntensity={0.15} />
      </mesh>

      {/* Dome finial */}
      <mesh position={[0, 3.3, 0]}>
        <coneGeometry args={[0.06, 0.5, 8]} />
        <meshStandardMaterial color={aColor} metalness={0.8} roughness={0.2} emissive={aColor} emissiveIntensity={0.3} />
      </mesh>
      {/* Crescent on finial */}
      <mesh position={[0, 3.68, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.1, 0.025, 8, 16, Math.PI * 1.5]} />
        <meshStandardMaterial color={aColor} emissive={aColor} emissiveIntensity={0.5} metalness={0.8} />
      </mesh>

      {/* Side small domes */}
      {[-1.2, 1.2].map((x, i) => (
        <group key={i} position={[x, 1.62, 0]}>
          <mesh>
            <sphereGeometry args={[0.35, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshStandardMaterial color={dColor} roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.04, 0]}>
            <cylinderGeometry args={[0.36, 0.37, 0.1, 16]} />
            <meshStandardMaterial color={aColor} metalness={0.5} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Door */}
      <mesh position={[0, 0.45, 1.21]}>
        <boxGeometry args={[0.55, 0.9, 0.05]} />
        <meshStandardMaterial color={aColor} metalness={0.4} roughness={0.4} emissive={aColor} emissiveIntensity={0.08} />
      </mesh>

      {/* Emissive glow at base */}
      <pointLight position={[0, 0.5, 1.5]} color={theme.lightColor} intensity={1.2} distance={7} decay={2} />
      <pointLight position={[0, 2.4, 0]} color={theme.lightColor} intensity={0.9} distance={8} decay={2} />
    </group>
  );
}

// ── Camera controller with GSAP ──────────────────────────────────────────────
function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 3, 12);
    camera.lookAt(0, 1.5, 0);

    gsap.fromTo(
      camera.position,
      { x: -8, y: 6, z: 16 },
      {
        x: 0,
        y: 3,
        z: 9.5,
        duration: 4,
        ease: 'power2.inOut',
        onUpdate: () => camera.lookAt(0, 1.5, 0),
      }
    );
  }, [camera]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.12) * 0.8;
    camera.position.y = 3 + Math.sin(t * 0.18) * 0.25;
    camera.lookAt(0, 1.5, 0);
  });

  return null;
}

// ── Decorative ground lights ──────────────────────────────────────────────────
function GroundLights({ theme }) {
  const color = useMemo(() => new THREE.Color(theme.lightColor), [theme]);
  return (
    <>
      {[[-2.5, 0, 0], [2.5, 0, 0], [0, 0, -2.5], [-1.8, 0, 1.8], [1.8, 0, 1.8]].map((pos, i) => (
        <pointLight key={i} position={[pos[0], 0.2, pos[2]]} color={color} intensity={0.8} distance={5} decay={2} />
      ))}
    </>
  );
}

// ── Main exported scene ───────────────────────────────────────────────────────
export default function MosqueScene({ theme }) {
  const skyColor = useMemo(() => new THREE.Color(theme.skyColor || '#0b0b2a'), [theme]);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 3, 12], fov: 55 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: theme.bg }}
      aria-label="3D mosque scene"
    >
      {/* Background color */}
      <color attach="background" args={[skyColor]} />

      {/* Atmospheric fog */}
      <fog attach="fog" args={[skyColor, 30, 80]} />

      {/* Lighting */}
      <ambientLight intensity={0.5} color={theme.lightColor} />
      <directionalLight
        position={[5, 12, 5]}
        intensity={1.2}
        color={theme.primary}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <hemisphereLight
        skyColor={theme.lightColor}
        groundColor={theme.bg}
        intensity={0.6}
      />

      {/* Scene objects */}
      <CameraController />
      <StarField count={350} color={theme.particleColor} />
      <CrescentMoon color={theme.moonColor} position={[5, 7.5, -14]} />
      <Ground color={theme.groundColor} />
      <MosqueBody theme={theme} />
      <Minaret position={[-2.6, 0, 0]} theme={theme} />
      <Minaret position={[2.6, 0, 0]} theme={theme} />
      <GroundLights theme={theme} />
    </Canvas>
  );
}
