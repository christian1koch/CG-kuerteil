"use client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Orbit } from "next/font/google";
import {
  BakeShadows,
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
  Shadow,
  SoftShadows,
  Stage,
  Stars,
} from "@react-three/drei";

export default function Beleg() {
  return (
    <div className="h-screen bg-blue-300">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 5, 10], fov: 50 }}>
        <SceneContainer />
      </Canvas>
    </div>
  );
}

function SceneContainer() {
  return (
    <>
      <OrbitControls />
      <Scene castShadow receiveShadow />
      <PerspectiveCamera makeDefault position={[0, 5, 10]} />
      <ambientLight intensity={0.5} color={"yellow"} />
      <pointLight
        shadow-bias={-0.00001}
        castShadow
        intensity={10}
        position={[1, 2, 0]}
      />
    </>
  );
}
