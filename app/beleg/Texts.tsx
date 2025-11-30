import { Text } from "@react-three/drei";

export interface WorkExperienceField {
    position: string;
    company: string;
    duration: string;
    details: string[];
}

export function WorkExperienceText({
    fields,
}: {
    fields: WorkExperienceField[];
}) {
    return (
        <group>
            {fields.map((field, index) => (
                <group key={index} position={[0, -index * 2.5, 0]}>
                    <Text
                        font="courier-prime.ttf"
                        fontSize={0.25}
                        color="#039600"
                        anchorX="left"
                        anchorY="top"
                        position={[0, 0, 0]}
                    >
                        {field.position}
                    </Text>
                    <Text
                        font="courier-prime.ttf"
                        fontSize={0.18}
                        color="#039600"
                        anchorX="left"
                        anchorY="top"
                        position={[0, -0.3, 0]}
                    >
                        {field.company} | {field.duration}
                    </Text>
                    {field.details.map((detail, detailIndex) => (
                        <Text
                            key={detailIndex}
                            font="courier-prime.ttf"
                            fontSize={0.14}
                            color="#039600"
                            anchorX="left"
                            anchorY="top"
                            maxWidth={4}
                            lineHeight={1.4}
                            position={[0.2, -0.6 - detailIndex * 0.25, 0]}
                        >
                            • {detail}
                        </Text>
                    ))}
                </group>
            ))}
        </group>
    );
}
