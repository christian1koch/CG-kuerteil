"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Orbit } from "next/font/google";
import {
  BakeShadows,
  CameraControls,
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
  Shadow,
  SoftShadows,
  Stage,
  Stars,
  useProgress,
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
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

const DEBUG_MODE = false;

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default function Beleg() {
  return (
    <div className="h-screen bg-blue-300">
      <Canvas shadows="soft" camera={{ position: [0, 5, 10] }}>
        <Suspense fallback={<Loader />}>
          <SceneContainer />
        </Suspense>
      </Canvas>
    </div>
  );
}
const initialPosition: [number, number, number] = [0, 5, 10];
function SceneContainer() {
  const controlsRef = useRef<CameraControls>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);

  const handleFocusOnObject = () => {
    if (!controlsRef.current) return;
    if (!meshRef.current) return;
    const { x, y, z } = meshRef.current.position;
    if (!meshRef.current.geometry.boundingBox) {
      meshRef.current.geometry.computeBoundingBox();
    }
    const bb = meshRef.current.geometry.boundingBox;
    const rectWidth = bb!.max.x - bb!.min.x;
    const rectHeight = bb!.max.y - bb!.min.y;
    const rectNormal = new THREE.Vector3()
      .set(0, 0, 1)
      .applyQuaternion(meshRef.current.quaternion);
    const rectCenterPosition = new THREE.Vector3().copy(
      meshRef.current.position
    );
    // controlsRef.current.setLookAt(x, y, z, x, y, z);
    const distance = controlsRef.current.getDistanceToFitBox(
      rectWidth,
      rectHeight,
      0
    );
    const cameraPosition = new THREE.Vector3(x, y, z)
      .copy(rectNormal)
      .multiplyScalar(-distance)
      .add(rectCenterPosition);

    controlsRef.current
      .normalizeRotations()
      .setLookAt(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z,
        rectCenterPosition.x,
        rectCenterPosition.y,
        rectCenterPosition.z,
        true
      );
  };

  useEffect(() => {
    handleFocusOnObject();
  }, []);

  return (
    <>
      <CameraControls
        ref={controlsRef}
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />

      {/* <OrbitControls /> */}
      <Scene castShadow receiveShadow />
      <mesh
        ref={meshRef}
        position={[1.8, 1.3, -0.5]}
        rotation={[-Math.PI / 6, Math.PI, 0]}
        visible={DEBUG_MODE}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial wireframe visible={DEBUG_MODE} />
      </mesh>

      {/* <PerspectiveCamera makeDefault position={[0, 5, 10]} /> */}
      <ambientLight intensity={1} />
      <directionalLight
        ref={(light) => {
          if (light && DEBUG_MODE) {
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
