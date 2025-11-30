"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Text,
  useFont,
} from "@react-three/drei";
import { Suspense } from "react";
import { WorkExperienceText } from "../beleg/Texts";
import { WORK_EXPERIENCE_MOCKS } from "../beleg/constants";

export default function Playground() {
  const font = useFont("/geist-mono-regular-font.json");
  return (
    <div className="h-screen w-full bg-black">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

          <mesh position={[0, 0.5, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>

          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#444" />
          </mesh>
          <WorkExperienceText fields={WORK_EXPERIENCE_MOCKS} />
          <ContactShadows
            resolution={512}
            scale={10}
            blur={1}
            opacity={0.5}
            far={10}
            color="#000000"
          />
          <OrbitControls />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
