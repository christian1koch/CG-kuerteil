import React from "react";
import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { Select } from "@react-three/postprocessing";
import { animated } from "@react-spring/three";
import { useHoverAnimation } from "./useHoverAnimation";

export function Envelope(props: ThreeElements["group"]) {
  const { nodes } = useGLTF("/Scene1.glb") as any;

  const { position, hovered, handlePointerOver, handlePointerOut } =
    useHoverAnimation(
      [2.32, 0.771, -0.616], // Original position
      0.15 // Hover offset (move up by 0.15 units on Y axis)
    );

  return (
    <Select enabled={hovered}>
      <animated.mesh
        castShadow
        receiveShadow
        geometry={nodes.Envelope.geometry}
        position={position as any}
        scale={[0.213, 0.15, 0.113]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        {...props}
      >
        <meshStandardMaterial />
      </animated.mesh>
    </Select>
  );
}

useGLTF.preload("/Scene1.glb");
