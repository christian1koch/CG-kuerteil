import { useRef } from "react";
import * as THREE from "three";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Mask, useMask } from "@react-three/drei";

interface ScrollableStencilViewProps {
    totalHeight: number;
    onHoverChange?: (isHovering: boolean) => void;
    scale?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
    width?: number;
    height?: number;
    visible?: boolean;
    children: (stencil: any) => React.ReactNode;
}

export function ScrollableStencilView({
    totalHeight,
    onHoverChange,
    scale = 1,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    width = 4,
    height = 5,
    visible = true,
    children,
}: ScrollableStencilViewProps) {
    const stencil = useMask(1, false);
    const groupRef = useRef<THREE.Group>(null);
    const scrollY = useRef(0);
    const targetScrollY = useRef(0);

    const handlePointerEnter = () => {
        onHoverChange?.(true);
    };

    const handlePointerLeave = () => {
        onHoverChange?.(false);
    };

    const handleWheel = (e: ThreeEvent<WheelEvent>) => {
        e.stopPropagation();
        const sensitivity = 0.005;
        targetScrollY.current += e.deltaY * sensitivity;

        const maxScroll = Math.max(0, totalHeight - height);
        targetScrollY.current = THREE.MathUtils.clamp(
            targetScrollY.current,
            0,
            maxScroll
        );
    };

    useFrame((state, delta) => {
        if (groupRef.current) {
            scrollY.current = THREE.MathUtils.lerp(
                scrollY.current,
                targetScrollY.current,
                delta * 10
            );
            groupRef.current.position.y = scrollY.current;
        }
    });

    return (
        <group
            position={position}
            rotation={rotation}
            scale={scale}
            visible={visible}
        >
            <Mask id={1} position={[width / 2, -height / 2, 0]}>
                <planeGeometry args={[width + 10, height + 1]} />
            </Mask>
            <mesh
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                position={[width / 2, -height / 2, 0.1]}
                onWheel={handleWheel}
            >
                <planeGeometry args={[width + 2, height]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>
            <group ref={groupRef}>{children(stencil)}</group>
        </group>
    );
}
