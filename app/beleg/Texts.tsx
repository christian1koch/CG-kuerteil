import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";

export interface WorkExperienceField {
    position: string;
    company: string;
    duration: string;
    details: string[];
}

export function WorkExperienceText({
    fields,
    onHoverChange,
}: {
    fields: WorkExperienceField[];
    onHoverChange?: (isHovering: boolean) => void;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const scrollY = useRef(0);
    const targetScrollY = useRef(0);

    const FONT_SIZE = 0.14;
    const LINE_HEIGHT = 1.4;
    const MAX_WIDTH = 4;
    const CHARS_PER_LINE = 45;

    const handlePointerEnter = () => {
        onHoverChange?.(true);
    };

    const handlePointerLeave = () => {
        onHoverChange?.(false);
    };

    const { layoutItems, totalHeight } = useMemo(() => {
        let currentY = 0;
        const items = fields.map((field) => {
            const titleHeight = 0.3;
            const companyHeight = 0.3;
            const startOfDetails = -titleHeight - companyHeight;

            let localCursor = startOfDetails;

            const details = field.details.map((detail) => {
                const lines = Math.ceil(detail.length / CHARS_PER_LINE) || 1;
                const height = lines * FONT_SIZE * LINE_HEIGHT;
                const y = localCursor;
                localCursor -= height + 0.1;
                return { detail, y };
            });

            const fieldHeight = -localCursor;
            const groupY = currentY;
            currentY -= fieldHeight + 0.5;

            return { field, groupY, details };
        });
        return { layoutItems: items, totalHeight: -currentY };
    }, [fields]);

    const handleWheel = (e: ThreeEvent<WheelEvent>) => {
        e.stopPropagation();
        const sensitivity = 0.005;
        targetScrollY.current += e.deltaY * sensitivity;

        const maxScroll = Math.max(0, totalHeight - 3);
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
        <group>
            <mesh
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                position={[MAX_WIDTH / 2, -2.5, -0.1]}
                onWheel={handleWheel}
            >
                <planeGeometry args={[MAX_WIDTH + 2, 8]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>
            <group ref={groupRef}>
                {layoutItems.map((item, index) => (
                    <group key={index} position={[0, item.groupY, 0]}>
                        <Text
                            font="courier-prime.ttf"
                            fontSize={0.25}
                            color="#039600"
                            anchorX="left"
                            anchorY="top"
                            position={[0, 0, 0]}
                        >
                            {item.field.position}
                        </Text>
                        <Text
                            font="courier-prime.ttf"
                            fontSize={0.18}
                            color="#039600"
                            anchorX="left"
                            anchorY="top"
                            position={[0, -0.3, 0]}
                        >
                            {item.field.company} | {item.field.duration}
                        </Text>
                        {item.details.map((detailItem, i) => (
                            <Text
                                key={i}
                                font="courier-prime.ttf"
                                fontSize={FONT_SIZE}
                                color="#039600"
                                anchorX="left"
                                anchorY="top"
                                maxWidth={MAX_WIDTH}
                                lineHeight={LINE_HEIGHT}
                                position={[0.2, detailItem.y, 0]}
                            >
                                • {detailItem.detail}
                            </Text>
                        ))}
                    </group>
                ))}
            </group>
        </group>
    );
}
