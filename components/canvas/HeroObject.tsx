"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

export default function HeroObject() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.08;
    meshRef.current.rotation.y += delta * 0.12;
  });

  return (
    <mesh ref={meshRef} scale={1.6}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#C08552"
        wireframe
        emissive="#3E6259"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}