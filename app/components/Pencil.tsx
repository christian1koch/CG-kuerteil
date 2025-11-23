import { useGLTF } from "@react-three/drei";
import { JSX, useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { PI } from "three/tsl";

type GLTFResult = GLTF & {
  nodes: {
    Sphere002: THREE.Mesh;
    Sphere002_1: THREE.Mesh;
    Sphere002_2: THREE.Mesh;
    Sphere002_3: THREE.Mesh;
    Sphere002_4: THREE.Mesh;
  };
  materials: {
    "Color - Yellow": THREE.MeshStandardMaterial;
    "Color - Rubber": THREE.MeshStandardMaterial;
    "Silver Metal": THREE.MeshStandardMaterial;
    "Color - Wood": THREE.MeshStandardMaterial;
    "Color - Black Nib": THREE.MeshStandardMaterial;
  };
};

export function Pencil(props: JSX.IntrinsicElements["group"]): JSX.Element {
  const group = useRef<THREE.Group>(null!);
  const { nodes, materials } = useGLTF("/pencil.glb") as unknown as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Pencil" rotation={[0, 0, Math.PI / 4]}>
          <mesh
            name="Sphere002"
            castShadow
            receiveShadow
            geometry={nodes.Sphere002.geometry}
            material={new THREE.MeshBasicMaterial({ color: "#b8860b" })}
          />

          <mesh
            name="Sphere002_1"
            castShadow
            receiveShadow
            geometry={nodes.Sphere002_1.geometry}
            material={materials["Color - Rubber"]}
          />
          <mesh
            name="Sphere002_2"
            castShadow
            receiveShadow
            geometry={nodes.Sphere002_2.geometry}
            material={materials["Silver Metal"]}
          />
          <mesh
            name="Sphere002_3"
            castShadow
            receiveShadow
            geometry={nodes.Sphere002_3.geometry}
            material={materials["Color - Wood"]}
          />
          <mesh
            name="Sphere002_4"
            castShadow
            receiveShadow
            geometry={nodes.Sphere002_4.geometry}
            material={materials["Color - Black Nib"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/pencil.glb");
