"use client";

import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Environment,
    ContactShadows,
    Text,
} from "@react-three/drei";
import { Suspense, useState } from "react";
import { WorkExperienceText } from "../beleg/Text";
import { WORK_EXPERIENCE_MOCKS } from "../beleg/constants";
import { NavigationHud } from "../components/NavigationHud";
import { PosterPlane } from "../beleg/PosterPlane";

export default function Playground() {
    const [disableZoom, setDisableZoom] = useState(false);

    const handleAboutMeClick = () => {
        console.log("About me clicked");
    };

    const handleWorkExperienceClick = () => {
        console.log("Work Experience clicked");
    };

    const handleEducationClick = () => {
        console.log("Education clicked");
    };

    const handleContactMeClick = () => {
        console.log("Contact me clicked");
    };

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
                <NavigationHud
                    onAboutMeClick={handleAboutMeClick}
                    onWorkExperienceClick={handleWorkExperienceClick}
                    onEducationClick={handleEducationClick}
                    onContactMeClick={handleContactMeClick}
                />
            </Canvas>
        </div>
    );
}
