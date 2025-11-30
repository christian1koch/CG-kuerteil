import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Mask, Text3D, useMask } from "@react-three/drei";

const wrapText = (text: string, maxChars: number) => {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        if (currentLine.length + 1 + words[i].length <= maxChars) {
            currentLine += " " + words[i];
        } else {
            lines.push(currentLine);
            currentLine = words[i];
        }
    }
    lines.push(currentLine);
    return lines.join("\n");
};

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
    const stencil = useMask(1, false);
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
                const wrappedDetail = wrapText(detail, CHARS_PER_LINE);
                const lines = wrappedDetail.split("\n").length;
                const height = lines * FONT_SIZE * LINE_HEIGHT;
                const y = localCursor;
                localCursor -= height + 0.1;
                return { detail: wrappedDetail, y };
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
            <Mask id={1} position={[MAX_WIDTH / 2, -2.5, 0]}>
                <planeGeometry args={[MAX_WIDTH + 10, 5]} />
            </Mask>
            <mesh
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                position={[MAX_WIDTH / 2, -2.5, 0.1]}
                onWheel={handleWheel}
            >
                <planeGeometry args={[MAX_WIDTH + 2, 5]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>
            <group ref={groupRef}>
                {layoutItems.map((item, index) => (
                    <group key={index} position={[0, item.groupY, 0]}>
                        <Text3D
                            font="/courier-prime.json"
                            size={0.25}
                            height={0.02}
                            position={[0, -0.25, 0]}
                        >
                            {item.field.position}
                            <meshStandardMaterial
                                color="#039600"
                                {...stencil}
                            />
                        </Text3D>
                        <Text3D
                            font="/courier-prime.json"
                            size={0.18}
                            height={0.02}
                            position={[0, -0.3 - 0.18, 0]}
                        >
                            {item.field.company} | {item.field.duration}
                            <meshStandardMaterial
                                color="#039600"
                                {...stencil}
                            />
                        </Text3D>
                        {item.details.map((detailItem, i) => (
                            <Text3D
                                key={i}
                                font="/courier-prime.json"
                                size={FONT_SIZE}
                                height={0.02}
                                lineHeight={0.6}
                                position={[0.2, detailItem.y - FONT_SIZE, 0]}
                            >
                                • {detailItem.detail}
                                <meshStandardMaterial
                                    color="#039600"
                                    {...stencil}
                                />
                            </Text3D>
                        ))}
                    </group>
                ))}
            </group>
        </group>
    );
}
