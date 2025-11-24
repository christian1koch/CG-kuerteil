"use client";
import React from "react";
import { Outlines, Text3D, useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { animated } from "@react-spring/three";
import { Select } from "@react-three/postprocessing";
import { useHoverAnimation } from "./useHoverAnimation";

export function Book(props: ThreeElements["group"]) {
  const { nodes, materials } = useGLTF("/Scene1.glb") as any;

  const originalPosition: [number, number, number] = [1.291, 0.801, -0.539];

  const { hovered, position, handlePointerOver, handlePointerOut } =
    useHoverAnimation(
      originalPosition, // Original position
      0.05 // Hover offset (move up by 0.2 units on Y axis)
    );
  const initialScale = 0.458;

  return (
    <animated.group
      position={position as any}
      rotation={[0, 0.167, 0]}
      scale={initialScale}
      {...props}
      onPointerEnter={handlePointerOver}
      onPointerLeave={handlePointerOut}
    >
      {hovered && (
        <Text3D
          scale={0.05 / initialScale}
          position={[-0.4, 0.2, 0]}
          font="/geist-mono-regular-font.json"
        >
          Education
        </Text3D>
      )}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane046.geometry}
        material={materials["Book Cover"]}
      >
        {hovered && <Outlines thickness={0.05} color="pink" screenspace />}
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane046_1.geometry}
        material={materials["Book Page 33"]}
      >
        {hovered && <Outlines thickness={0.05} color="pink" screenspace />}
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane046_2.geometry}
        material={materials.Pencil}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane046_3.geometry}
        material={materials.Eraser}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane046_4.geometry}
        material={materials["Pencil 2"]}
      />
    </animated.group>
  );
}

useGLTF.preload("/Scene1.glb");
