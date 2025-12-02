import React from "react";
import { useGLTF, MeshDistortMaterial } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

export function Tree({
    specialEffect,
    ...props
}: { specialEffect?: boolean } & ThreeElements["mesh"]) {
    const { nodes, materials } = useGLTF("/Scene1.glb") as any;
    return (
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.tree_large.geometry}
            material={
                !specialEffect ? materials["tiny_treats_1.165"] : undefined
            }
            position={[-5.332, 0, 0]}
            {...props}
        >
            {specialEffect && (
                <MeshDistortMaterial
                    map={materials["tiny_treats_1.165"].map}
                    distort={0.3}
                    speed={2}
                />
            )}
        </mesh>
    );
}
