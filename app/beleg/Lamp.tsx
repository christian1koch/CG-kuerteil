import React from "react";
import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

export function Lamp(props: ThreeElements["group"]) {
  const { nodes, materials } = useGLTF("/Lamp.glb") as any;
  return (
    <group {...props} dispose={null}>
      <group
        position={[1.96, 2.64, -0.974]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder015.geometry}
          material={materials.Palette}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder015_1.geometry}
          material={materials.Light}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Lamp.glb");
