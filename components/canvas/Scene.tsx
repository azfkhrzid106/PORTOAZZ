"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import HeroObject from "./HeroObject";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 3, 4]} intensity={1.4} color="#C08552" />
      <pointLight position={[-4, -2, -2]} intensity={0.6} color="#3E6259" />

      <Suspense fallback={null}>
        <HeroObject />
      </Suspense>
    </Canvas>
  );
}