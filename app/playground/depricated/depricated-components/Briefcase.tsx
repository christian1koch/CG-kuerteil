import { useGLTF } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { JSX, useRef, useState } from "react";
import * as THREE from "three";
import { Mesh } from "three";
export function Briefcase(props: JSX.IntrinsicElements["mesh"]) {
	const { nodes, materials } = useGLTF("/briefcase.glb");

	const ref = useRef<Mesh | null>(null);
	const [hovered, setHovered] = useState(false);

	const elapsedRef = useRef(0);
	const xAxis = new THREE.Vector3(1, 0, 0);
	const xRot = -Math.PI;
	const xQuaternion = new THREE.Quaternion();

	useFrame((_, delta) => {
		elapsedRef.current += delta;
		if (!hovered) {
			return;
		}
		if (!ref.current) {
			return;
		}
		const cycle = elapsedRef.current % 1; // total 0.6s elapsed time

		// Z-axis rotation that flips instantly (global Z)
		const zQuat = new THREE.Quaternion().setFromEuler(
			new THREE.Euler(cycle < 0.5 ? Math.PI / 8 : -Math.PI / 8, 0, 0)
		);

		// Base rotation around Y axis
		const baseQuat = new THREE.Quaternion().setFromEuler(
			new THREE.Euler(0, -Math.PI / 2, 0)
		);

		// Multiply quaternions: first apply Z rotation (global), then Y rotation
		ref.current.quaternion.multiplyQuaternions(baseQuat, zQuat);
	});

	// smooth scale interpolation each frame
	useFrame((_, delta) => {
		if (!ref.current) return;
		const cur = ref.current.scale.x;
		const baseScale = typeof props.scale === "number" ? props.scale : 1;
		const target = hovered ? baseScale * 1.2 : baseScale;
		// lerp faster for snappy feel
		const lerped = cur + (target - cur) * Math.min(12 * delta, 1);
		ref.current.scale.set(lerped, lerped, lerped);
	});

	useFrame((_, delta) => {
		const rotZ = ref.current?.rotation.z;
	});

	const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		setHovered(true);
		if (typeof document !== "undefined")
			document.body.style.cursor = "pointer";
	};

	const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		setHovered(false);
		if (typeof document !== "undefined") document.body.style.cursor = "";
	};

	const handleClick = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		// onClick?.();
	};
	const mesh = nodes["model"] as THREE.Mesh;
	return (
		<mesh
			{...props}
			ref={ref}
			onPointerOver={handlePointerOver}
			onPointerOut={handlePointerOut}
			onClick={handleClick}
		>
			<primitive object={mesh} />
		</mesh>
	);
}

useGLTF.preload("/briefcase.glb");
