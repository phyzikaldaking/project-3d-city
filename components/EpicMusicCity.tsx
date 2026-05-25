'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Text, Stars } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

const districts = [
  {
    name: 'EDM Zone',
    position: [-16, 0, -8],
    color: '#ff4dff',
  },
  {
    name: 'Hip-Hop District',
    position: [-8, 0, 12],
    color: '#9f7aea',
  },
  {
    name: 'Classical Spires',
    position: [14, 0, 10],
    color: '#ffe29a',
  },
  {
    name: 'Rock Arena',
    position: [18, 0, -9],
    color: '#60d6ff',
  },
];

function Building({ position, height, color }: any) {
  return (
    <mesh position={[position[0], height / 2, position[2]]}>
      <boxGeometry args={[1.8, height, 1.8]} />
      <meshStandardMaterial
        color="#08111f"
        emissive={color}
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

function District({ district }: any) {
  return (
    <group position={district.position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[7, 64]} />
        <meshStandardMaterial
          color="#050814"
          emissive={district.color}
          emissiveIntensity={0.25}
        />
      </mesh>

      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 2 + (i % 4) * 1.4;

        return (
          <Building
            key={i}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius,
            ]}
            height={2 + (i % 6)}
            color={district.color}
          />
        );
      })}

      <Float>
        <Text
          position={[0, 9, 0]}
          fontSize={1}
          anchorX="center"
          anchorY="middle"
        >
          {district.name}
          <meshStandardMaterial
            color="#ffffff"
            emissive={district.color}
            emissiveIntensity={2}
          />
        </Text>
      </Float>
    </group>
  );
}

function CentralStage() {
  return (
    <group>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[6, 7, 0.8, 8]} />
        <meshStandardMaterial
          color="#0b1020"
          emissive="#00d5ff"
          emissiveIntensity={0.5}
        />
      </mesh>

      <Float>
        <Text position={[0, 8, 0]} fontSize={1.1}>
          EPICMUSICSPACE.COM
          <meshStandardMaterial
            color="#c8f7ff"
            emissive="#00d5ff"
            emissiveIntensity={2}
          />
        </Text>
      </Float>
    </group>
  );
}

export function EpicMusicCity() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 18, 32]} />

      <color attach="background" args={['#02030a']} />

      <ambientLight intensity={0.25} />
      <directionalLight position={[10, 20, 10]} intensity={1.4} />

      <Stars radius={80} depth={40} count={2000} factor={4} />

      <CentralStage />

      {districts.map((district) => (
        <District key={district.name} district={district} />
      ))}

      <EffectComposer>
        <Bloom intensity={1.2} />
      </EffectComposer>

      <OrbitControls />
    </Canvas>
  );
}
