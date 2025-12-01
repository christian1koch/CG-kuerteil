import { useMemo } from "react";
import { Text3D } from "@react-three/drei";
import { WorkExperienceField } from "./types";
import { wrapText } from "./utils";
import { ScrollableStencilView } from "./ScrollableStencilView";

export function WorkExperienceText({
    fields,
    onHoverChange,
    scale = 1,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
}: {
    fields: WorkExperienceField[];
    onHoverChange?: (isHovering: boolean) => void;
    scale?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
}) {
    const FONT_SIZE = 0.14;
    const LINE_HEIGHT = 1.4;
    const CHARS_PER_LINE = 45;

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
                localCursor -= height + 0.3;
                return { detail: wrappedDetail, y };
            });

            const fieldHeight = -localCursor;
            const groupY = currentY;
            currentY -= fieldHeight;

            return { field, groupY, details };
        });
        return { layoutItems: items, totalHeight: -currentY };
    }, [fields, FONT_SIZE]);

    return (
        <ScrollableStencilView
            totalHeight={totalHeight}
            onHoverChange={onHoverChange}
            scale={scale}
            position={position}
            rotation={rotation}
        >
            {(stencil) => (
                <>
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
                                    lineHeight={1}
                                    position={[
                                        0.2,
                                        detailItem.y - FONT_SIZE,
                                        0,
                                    ]}
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
                </>
            )}
        </ScrollableStencilView>
    );
}
