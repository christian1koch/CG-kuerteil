import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function CartoonModel() {
	const { nodes, materials } = useGLTF("/monk_albedo.glb");
	const modelRef = useRef<THREE.SkinnedMesh>(null);

	const originalMesh = nodes["monk"] as THREE.SkinnedMesh;

	const headBone = originalMesh.skeleton.bones.find((b) => b.name === "Head");

	const monkMaterial = materials["monk_material"] as THREE.MeshBasicMaterial;

	useFrame((state) => {
		if (headBone) {
			// Calculate rotation based on pointer position
			const rotationX = state.pointer.y; // Vertical head movement
			const rotationY = state.pointer.x; // Horizontal head movement

			// Apply rotation to head bone with smooth interpolation
			headBone.rotation.x = THREE.MathUtils.lerp(
				headBone.rotation.x,
				rotationX,
				0.2
			);
			headBone.rotation.y = THREE.MathUtils.lerp(
				headBone.rotation.y,
				rotationY,
				0.2
			);
		}
	});
	return (
		<group scale={[1, 1, 1]} position={[0, 0, 0]}>
			<primitive object={nodes["Hips"]} />
			<skinnedMesh
				ref={modelRef}
				geometry={originalMesh.geometry}
				skeleton={originalMesh.skeleton}
			>
				<meshToonMaterial map={monkMaterial.map} />
			</skinnedMesh>
		</group>
	);
}
