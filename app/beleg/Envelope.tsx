"use client";
import React from "react";
import { Outlines, Text3D, useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
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
      <Text3D
        visible={hovered}
        scale={0.05}
        position={[-0.2, 0.2, 0]}
        font="/geist-mono-regular-font.json"
      >
        Contact me
      </Text3D>
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
        {hovered && <Outlines thickness={0.1} color="pink" screenspace />}
      </mesh>
    </animated.group>
  );
}
