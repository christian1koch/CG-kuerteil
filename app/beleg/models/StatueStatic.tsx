"use client";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

export function StatueStatic(props: ThreeElements["group"]) {
    const { nodes, materials } = useGLTF("/Scene1.glb") as any;

    const initialScale = 0.006;
    const position: [number, number, number] = [1.249, 1.224, -1.134];

    return (
        <group {...props}>
            <mesh
                rotation={[Math.PI / 2, 0, Math.PI]}
                scale={initialScale}
                geometry={nodes.statue.geometry}
                material={materials["normal "]}
                castShadow
                receiveShadow
            />
        </group>
    );
}
