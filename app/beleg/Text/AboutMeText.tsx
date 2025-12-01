import { Text3D } from "@react-three/drei";
import { AboutMeField } from "./types";
import { wrapText } from "./utils";
import { useMemo } from "react";

export function AboutMeText({
    field,
    scale = 1,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    visible = true,
}: {
    field: AboutMeField;
    scale?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
    visible?: boolean;
}) {
    const FONT_SIZE = 0.14;
    const CHARS_PER_LINE = 45;

    const wrappedText = useMemo(() => {
        return wrapText(field.text, CHARS_PER_LINE);
    }, [field.text]);

    return (
        <group
            position={position}
            rotation={rotation}
            scale={scale}
            visible={visible}
        >
            <Text3D
                font="/futuristic.json"
                size={FONT_SIZE}
                height={0.02}
                lineHeight={1.5}
            >
                {wrappedText}
                <meshStandardMaterial
                    color="#a600ff"
                    emissive="#a600ff"
                    emissiveIntensity={10} // Increase this value for stronger glow
                    toneMapped={false} // Important: allows colors to exceed 0-1 range for bloom
                />
            </Text3D>
        </group>
    );
}
