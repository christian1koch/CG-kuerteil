import React from "react";
import { Text3D, useGLTF } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { Select } from "@react-three/postprocessing";
import { animated } from "@react-spring/three";
import { useHoverAnimation } from "./useHoverAnimation";
import * as THREE from "three";

export function Envelope(props: ThreeElements["group"]) {
  const { nodes } = useGLTF("/Scene1.glb") as any;

  const { position, hovered, handlePointerOver, handlePointerOut } =
    useHoverAnimation(
      [2.32, 0.771, -0.616], // Original position
      0.05 // Hover offset (move up by 0.15 units on Y axis)
    );

  //   useFrame(({ camera }) => {
  //     ref.current.quaternion.copy(camera.quaternion);
  //   });

  const Material = new THREE.MeshStandardMaterial();
  Material.side = THREE.FrontSide;

  return (
    <animated.group position={position as any}>
      {hovered && (
        <Text3D
          scale={0.05}
          position={[-0.2, 0.2, 0]}
          font="/geist-mono-regular-font.json"
        >
          Contact me
        </Text3D>
      )}
      <Select enabled={hovered}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Envelope.geometry}
          scale={[0.213, 0.15, 0.113]}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          {...props}
        >
          <meshToonMaterial side={2} />
        </mesh>
      </Select>
    </animated.group>
  );
}

useGLTF.preload("/Scene1.glb");
