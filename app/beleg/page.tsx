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
import { DirectionalLightHelper } from "three";
import { useThree } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Outline,
  Selection,
  Vignette,
} from "@react-three/postprocessing";

export default function Beleg() {
  return (
    <div className="h-screen bg-blue-300">
      <Canvas shadows="soft" camera={{ position: [0, 5, 10] }}>
        <SceneContainer />
      </Canvas>
    </div>
  );
}

function SceneContainer() {
  return (
    <>
      <Selection>
        <EffectComposer autoClear={false}>
          <Outline blur edgeStrength={100} />
        </EffectComposer>
        <OrbitControls />
        <Scene castShadow receiveShadow />
      </Selection>
      <PerspectiveCamera makeDefault position={[0, 5, 10]} />
      <ambientLight intensity={1} />
      <directionalLight
        ref={(light) => {
          if (light) {
            const helper = new DirectionalLightHelper(light, 2, 0xff0000);
            light.parent?.add(helper);
          }
        }}
        castShadow
        intensity={1}
        shadow-bias={-0.0001}
        position={[5, 20, 7.5]}
      />
    </>
  );
}

function useGetCameraPosAndRot() {
  const { camera } = useThree();

  const handleOrbitChange = () => {
    console.log("Camera Position:", {
      x: camera.position.x.toFixed(3),
      y: camera.position.y.toFixed(3),
      z: camera.position.z.toFixed(3),
    });
    console.log("Camera Rotation:", {
      x: camera.rotation.x.toFixed(3),
      y: camera.rotation.y.toFixed(3),
      z: camera.rotation.z.toFixed(3),
    });
    return handleOrbitChange;
  };
}
