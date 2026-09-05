"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Particles from "./Particles";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <Suspense fallback={null}>
        <Particles color="#C08552" count={450} radius={4.5} size={0.03} speed={0.02} />
        <Particles color="#3E6259" count={300} radius={6} size={0.02} speed={-0.012} />
        <Particles color="#EDE6D8" count={150} radius={3} size={0.015} speed={0.035} />
      </Suspense>
    </Canvas>
  );
}