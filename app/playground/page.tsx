"use client";

import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Environment,
    ContactShadows,
    Text,
    PerspectiveCamera,
    Hud,
} from "@react-three/drei";
import { Suspense, useState } from "react";
import { WorkExperienceText } from "../beleg/Texts";
import { WORK_EXPERIENCE_MOCKS } from "../beleg/constants";
import { Button } from "@react-three/uikit-default";
import { Text as UiText, Container, Portal } from "@react-three/uikit";
import { Mails, Smile } from "@react-three/uikit-lucide";
import { Briefcase } from "../beleg/Briefcase";
import { Statue } from "../beleg/Statue";
import { Book } from "../beleg/Book";
import { Envelope } from "../beleg/Envelope";
import { MeshBasicMaterial } from "three";

export default function Playground() {
    const [disableZoom, setDisableZoom] = useState(false);
    return (
        <div className="h-screen w-full">
            <Canvas
                gl={{
                    stencil: true,
                }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight
                        position={[10, 10, 5]}
                        intensity={1}
                        castShadow
                    />

                    <WorkExperienceText
                        onHoverChange={setDisableZoom}
                        fields={WORK_EXPERIENCE_MOCKS}
                    />
                    <ContactShadows
                        resolution={512}
                        scale={10}
                        blur={1}
                        opacity={0.5}
                        far={10}
                        color="#000000"
                    />
                    <OrbitControls enableZoom={!disableZoom} />
                    <Environment preset="city" />
                </Suspense>
                <Hud>
                    <ambientLight intensity={10} />
                    <PerspectiveCamera makeDefault position={[2.5, -2.5, 6]} />
                    <Container gap={20} flexDirection={"row"}>
                        <Button variant="outline">
                            <Container padding={0.2}>
                                <UiText>About me</UiText>
                                <Portal width={30} aspectRatio={1}>
                                    <ambientLight intensity={2} />
                                    <Statue
                                        scale={0.05}
                                        position={[0, -0.2, 0]}
                                    />
                                </Portal>
                            </Container>
                        </Button>
                        <Button variant="outline">
                            <Container padding={0.2} gap={5}>
                                <UiText>Work Experience</UiText>{" "}
                                <Portal width={50} aspectRatio={1}>
                                    <ambientLight intensity={10} />
                                    <Briefcase
                                        scale={2}
                                        position={[0, -1, 0]}
                                    />
                                </Portal>
                            </Container>
                        </Button>
                        <Button variant="outline">
                            <Container padding={0.2} gap={5}>
                                <UiText>Education</UiText>{" "}
                                <Portal width={30} aspectRatio={1}>
                                    <ambientLight intensity={2} />
                                    <Book
                                        scale={3}
                                        rotation={[Math.PI / 2, 0, 0]}
                                        position={[0, -0.2, 0]}
                                    />
                                </Portal>
                            </Container>
                        </Button>
                        <Button variant="outline">
                            <Container padding={0.2} gap={5}>
                                <UiText>Contact me</UiText>
                                <Mails />
                            </Container>
                        </Button>
                    </Container>
                </Hud>
            </Canvas>
        </div>
    );
}
