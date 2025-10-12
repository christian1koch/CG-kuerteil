"use client";
import { OrbitControls, Text3D, useGLTF, useHelper } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { CartoonModel } from "./components/CartoonMonk";
import OptionSquare from "./components/OptionSquare";

export default function Home() {
	return (
		<div className="h-screen">
			<Canvas
				className="bg-white h-full w-full"
				camera={{ position: [0, 0, 5] }}
			>
				<Scene />
			</Canvas>
		</div>
	);
}

function Scene() {
	const dirLight = useRef<THREE.DirectionalLight>(null!);

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

	useHelper(dirLight, THREE.DirectionalLightHelper, 1, "red");

	return (
		<>
			<ambientLight intensity={1} />
			<directionalLight
				ref={dirLight}
				position={lightPosition}
				intensity={lightIntensity}
				color={lightColor}
			/>
			<OrbitControls />
			<CartoonModel />
			<OptionSquare
				size={squareSize}
				color={squareColor}
				hoverScale={squareHoverScale}
				position={squarePosition as [number, number, number]}
				rotation={squareRotation as [number, number, number]}
				onClick={() => console.log("clicked")}
			/>
			<mesh position={[0, -2, 0]}>
				<Text3D font="/geist-mono-regular-font.json">React</Text3D>
				<meshStandardMaterial color="blue" />
			</mesh>
		</>
	);
}

useGLTF.preload("/monk.glb");
