import { useGLTF } from "@react-three/drei";
import { JSX } from "react";
import * as THREE from "three";
export function Notebook(props: JSX.IntrinsicElements["group"]) {
	const { nodes } = useGLTF("/notebook.glb");
	console.log("Notebook nodes:", nodes);
	const mesh = nodes["16734_notebook_v1_NEW"] as THREE.Mesh;

	return (
		<group {...props}>
			<mesh
				castShadow
				receiveShadow
				geometry={mesh.geometry}
				rotation={mesh.rotation}
			>
				<meshToonMaterial color={"#93cf96"} />
			</mesh>
		</group>
	);
}

useGLTF.preload("/notebook.glb");
