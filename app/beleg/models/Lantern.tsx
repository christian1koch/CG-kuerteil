import React from "react";
import { useGLTF, MeshWobbleMaterial } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

export function Lantern({
    specialEffect,
    ...props
}: { specialEffect?: boolean } & ThreeElements["mesh"]) {
    const { nodes, materials } = useGLTF("/Scene1.glb") as any;
    return (
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.street_lantern.geometry}
            material={
                !specialEffect ? materials["tiny_treats_1.162"] : undefined
            }
            position={[-8.623, 0, 0]}
            {...props}
        >
            {specialEffect && (
                <MeshWobbleMaterial
                    map={materials["tiny_treats_1.162"].map}
                    factor={3}
                    speed={1}
                />
            )}
        </mesh>
    );
}
