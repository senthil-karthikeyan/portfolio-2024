"use client";
import { Canvas } from "@react-three/fiber";
import Model from "@/components/model/Hero";
import { Environment, OrbitControls } from "@react-three/drei";

export default function CanvaScene() {
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <Model />
      <directionalLight intensity={2} position={[0, 2, 3]} />
      <Environment preset="city" />
    </Canvas>
  );
}
