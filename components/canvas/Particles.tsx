"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function randomInSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6; // dipipihkan dikit
    positions[i * 3 + 2] = r * Math.cos(phi) * 0.5;
  }
  return positions;
}

export default function Particles({
  color = "#C08552",
  count = 500,
  radius = 4,
  size = 0.025,
  speed = 0.02,
}: {
  color?: string;
  count?: number;
  radius?: number;
  size?: number;
  speed?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => randomInSphere(count, radius), [count, radius]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * speed;
    pointsRef.current.rotation.x += delta * speed * 0.3;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
  <bufferAttribute
    attach="attributes-position"
    args={[positions, 3]}
  />
</bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}