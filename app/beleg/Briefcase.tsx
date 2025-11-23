import React from "react";
import { Text3D, useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { animated } from "@react-spring/three";
import { Select } from "@react-three/postprocessing";
import { useHoverAnimation } from "./useHoverAnimation";

export function Briefcase(props: ThreeElements["group"]) {
  const { nodes, materials } = useGLTF("/Scene1.glb") as any;

  const originalPosition: [number, number, number] = [2.328, 0.813, -1.303];
  const initialScale = 0.293;

  const { hovered, position, handlePointerOver, handlePointerOut } =
    useHoverAnimation(
      originalPosition, // Original position
      0.05 // Hover offset (move up by 0.05 units on Y axis)
    );

  return (
    <animated.group
      position={position as any}
      rotation={[-0.705, 0, 0]}
      scale={initialScale}
      {...props}
      onPointerEnter={handlePointerOver}
      onPointerLeave={handlePointerOut}
    >
      {hovered && (
        <Text3D
          scale={0.05 / initialScale}
          rotation={[0.705, 0, 0]}
          position={[-1, 1.1, 1.1]}
          font="/geist-mono-regular-font.json"
        >
          Job Experience
        </Text3D>
      )}
      <Select enabled={hovered}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.model.geometry}
          material={materials.model}
        />
      </Select>
    </animated.group>
  );
}

useGLTF.preload("/Scene1.glb");
