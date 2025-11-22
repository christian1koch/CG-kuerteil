import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function CartoonModel() {
	const { nodes, materials } = useGLTF("/dani.glb");
	const modelRef = useRef<THREE.SkinnedMesh>(null);
	const originalMesh = nodes["Vert"] as THREE.SkinnedMesh;
	const headBone = nodes["DEF-spine003"];

	useFrame((state) => {
		if (headBone) {
			// Calculate rotation based on pointer position
			const rotationY = state.pointer.y; // Vertical head movement
			const rotationX = state.pointer.x; // Horizontal head movement
			// Apply rotation to head bone with smooth interpolation
			headBone.rotation.x = THREE.MathUtils.lerp(
				headBone.rotation.x,
				-rotationY + 0.05,
				0.05
			);
			headBone.rotation.y = THREE.MathUtils.lerp(
				headBone.rotation.y,
				rotationX,
				0.2
			);
		}
	});
	return (
		<group scale={[1, 1, 1]} position={[0, 0, 0]}>
			<primitive object={nodes["rig"]} />
			<skinnedMesh
				ref={modelRef}
				geometry={originalMesh.geometry}
				skeleton={originalMesh.skeleton}
				material={materials["Material"]}
			/>
		</group>
	);
}
