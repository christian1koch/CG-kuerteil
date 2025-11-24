"use client";
import React from "react";
import { Outlines, Text3D } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { animated } from "@react-spring/three";
import { useHoverAnimation } from "./useHoverAnimation";

// Accept nodes and materials as props instead of loading them again
interface BriefcaseProps {
  nodes: any;
  materials: any;
}

export function Briefcase({
  nodes,
  materials,
  ...props
}: BriefcaseProps & ThreeElements["group"]) {
  const originalPosition: [number, number, number] = [2.328, 0.813, -1.303];
  const initialScale = 0.293;

  const { hovered, position, handlePointerOver, handlePointerOut } =
    useHoverAnimation(
      originalPosition, // Original position
      0.05 // Hover offset (move up by 0.05 units on Y axis)
    );

  return (
    <animated.group
      dispose={null}
      position={position as any}
      rotation={[-0.705, 0, 0]}
      scale={initialScale}
      {...props}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <Text3D
        visible={hovered}
        scale={0.05 / initialScale}
        rotation={[0.705, 0, 0]}
        position={[-1, 1.1, 1.1]}
        font="/geist-mono-regular-font.json"
      >
        Job Experience
      </Text3D>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.model.geometry}
        material={materials.model}
      >
        {hovered && <Outlines thickness={0.05} color="pink" screenspace />}
      </mesh>
    </animated.group>
  );
}
