import React from "react";
import { useGLTF, MeshDistortMaterial } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

export function Chalkboard({
    specialEffect,
    ...props
}: { specialEffect?: boolean } & ThreeElements["mesh"]) {
    const { nodes, materials } = useGLTF("/Scene1.glb") as any;
    return (
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.demoscene001.geometry}
            material={!specialEffect ? materials["normal .036"] : undefined}
            position={[-6.216, 2.196, -2.483]}
            scale={[0.556, 1, 1]}
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
