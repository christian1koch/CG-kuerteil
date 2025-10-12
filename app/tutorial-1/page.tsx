"use client";
import { OrbitControls, PerspectiveCamera, Text3D } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

type CubeProps = {
	position?: [number, number, number];
	size?: [number, number, number];
	color?: string;
};

const Cube = ({
	position = [1, 0, 0],
	size = [1, 1, 1],
	color = "pink",
}: CubeProps) => {
	const ref = useRef<Mesh | null>(null);

	useFrame((state, delta) => {
		if (ref.current) {
			ref.current.rotation.x += delta;
			ref.current.position.y = Math.sin(state.clock.elapsedTime);
		}
	});
	return (
		<mesh position={position} ref={ref}>
			<boxGeometry args={size} />
			<meshStandardMaterial color={color} />
		</mesh>
	);
};
export default function App() {
	return (
		<div id="canvas-container" className="w-full h-screen bg-amber-50">
			<Canvas>
				<OrbitControls />
				<directionalLight position={[0, 0, 2]} />
				<Cube />
				{/* </PerspectiveCamera> */}
			</Canvas>
		</div>
	);
}
