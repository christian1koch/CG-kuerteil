import React, { useRef, useState, useEffect } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Mesh, DoubleSide } from "three";

type OptionSquareProps = {
	size?: number; // world units (plane width/height)
	color?: string; // material color
	hoverScale?: number; // target scale when hovered
	position?: [number, number, number];
	rotation?: [number, number, number];
	onClick?: () => void;
};

export default function OptionSquare({
	size = 1,
	color = "#3fb",
	hoverScale = 1.25,
	position = [0, 0, 0],
	rotation = [0, 0, 0],
	onClick,
}: OptionSquareProps) {
	const ref = useRef<Mesh | null>(null);
	const [hovered, setHovered] = useState(false);

	// smooth scale interpolation each frame
	useFrame((_, delta) => {
		if (!ref.current) return;
		const cur = ref.current.scale.x;
		const target = hovered ? hoverScale : 1;
		// lerp faster for snappy feel
		const lerped = cur + (target - cur) * Math.min(12 * delta, 1);
		ref.current.scale.set(lerped, lerped, lerped);
	});

	useEffect(() => {
		// cleanup cursor on unmount
		return () => {
			if (typeof document !== "undefined")
				document.body.style.cursor = "";
		};
	}, []);

	const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		setHovered(true);
		if (onClick && typeof document !== "undefined")
			document.body.style.cursor = "pointer";
	};

	const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		setHovered(false);
		if (typeof document !== "undefined") document.body.style.cursor = "";
	};

	const handleClick = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		onClick?.();
	};

	return (
		<mesh
			ref={ref}
			position={position}
			rotation={rotation}
			onPointerOver={handlePointerOver}
			onPointerOut={handlePointerOut}
			onClick={handleClick}
			castShadow
			receiveShadow
		>
			<boxGeometry args={[size, size, size]} />
			<meshStandardMaterial color={color} side={DoubleSide} />
		</mesh>
	);
}
