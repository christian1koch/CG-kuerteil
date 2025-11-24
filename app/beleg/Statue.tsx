import React from "react";
import { Outlines, Text3D, useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { animated } from "@react-spring/three";
import { useHoverAnimation } from "./useHoverAnimation";

export function Statue(props: ThreeElements["group"]) {
  const { nodes, materials } = useGLTF("/Scene1.glb") as any;

  const originalPosition: [number, number, number] = [1.249, 1.224, -1.134];
  const initialScale = 0.006;

  const { hovered, position, handlePointerOver, handlePointerOut } =
    useHoverAnimation(
      originalPosition, // Original position
      0.05 // Hover offset (move up by 0.05 units on Y axis)
    );

  return (
    <animated.group position={position as any}>
      {hovered && (
        <Text3D
          scale={0.05}
          position={[-0.15, 0.2, 0]}
          font="/geist-mono-regular-font.json"
        >
          About Me
        </Text3D>
      )}

      <mesh
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={initialScale}
        {...props}
        onPointerEnter={handlePointerOver}
        onPointerLeave={handlePointerOut}
        castShadow
        receiveShadow
        geometry={nodes.statue.geometry}
        material={materials["normal "]}
      >
        {hovered && <Outlines thickness={2} color="pink" screenspace />}
      </mesh>
    </animated.group>
  );
}

useGLTF.preload("/Scene1.glb");
