"use client";
import {
	OrbitControls,
	PerspectiveCamera,
	Text3D,
	useGLTF,
	useHelper,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { CartoonModel } from "./components/CartoonMonk";
import OptionSquare from "./components/OptionSquare";
import { Briefcase } from "./components/Briefcase";
import { Notebook } from "./components/Notebook";

export default function Home() {
	return (
		<div className="h-screen">
			<Canvas className="bg-cyan-200 h-full w-full">
				<Scene />
			</Canvas>
		</div>
	);
}

function Scene() {
	const dirLight = useRef<THREE.DirectionalLight>(null!);
	useHelper(dirLight, THREE.DirectionalLightHelper, 1, "red");

	const perspectiveCamera = useRef<THREE.PerspectiveCamera>(null!);
	useHelper(perspectiveCamera, THREE.CameraHelper);

	// GUI controls for directional light
	const { lightPosition, lightIntensity, lightColor } = useControls(
		"Directional Light",
		{
			lightPosition: { value: [10, 10, 5], step: 0.1 },
			lightIntensity: { value: 2, min: 0, max: 5, step: 0.1 },
			lightColor: "#ffffff",
		}
	);

	// GUI controls for OptionSquare
	const {
		squareSize,
		squareColor,
		squareHoverScale,
		squarePosition,
		squareRotation,
	} = useControls("Option Square", {
		squareSize: { value: 1, min: 0.1, max: 3, step: 0.1 },
		squareColor: "#3fb",
		squareHoverScale: { value: 1.4, min: 1, max: 2, step: 0.05 },
		squarePosition: { value: [0, 0, 0], step: 0.1 },
		squareRotation: { value: [0, 0, 0], step: 0.1 },
	});

	// GUI for the perspective camera
	const { cameraPosition, cameraFov, cameraNear, cameraFar } = useControls(
		"Perspective Camera",
		{
			cameraPosition: { value: [0, 1, 8], step: 0.1 },
			cameraFov: { value: 20, min: 10, max: 120, step: 1 },
			cameraNear: { value: 1, min: 0.1, max: 10, step: 0.1 },
			cameraFar: { value: 30, min: 1, max: 100, step: 1 },
		}
	);

	return (
		<>
			<ambientLight intensity={1} />
			<directionalLight
				ref={dirLight}
				position={lightPosition}
				intensity={lightIntensity}
				color={lightColor}
			/>
			<PerspectiveCamera
				makeDefault
				ref={perspectiveCamera}
				fov={cameraFov}
				near={cameraNear}
				far={cameraFar}
				position={cameraPosition as [number, number, number]}
			></PerspectiveCamera>
			s
			<CartoonModel />
			<mesh position={[0, -2, 0]}>
				<Text3D font="/geist-mono-regular-font.json">React</Text3D>
				<meshStandardMaterial color="blue" />
			</mesh>
			<Briefcase
				position={[-2, 1.5, 0]}
				rotation={[0, -Math.PI / 2, 0]}
				scale={0.2}
			/>
			<Notebook
				position={[2, 1.7, 0]}
				rotation={[0, 0, 0]}
				scale={0.015}
			/>
		</>
	);
}

// useGLTF.preload("/dani.glb");
