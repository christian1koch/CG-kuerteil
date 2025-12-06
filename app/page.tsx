"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AboutMeForm } from "./components/ProfileForm";
import {
    DragControls,
    Float,
    MeshDistortMaterial,
    MeshTransmissionMaterial,
    MeshWobbleMaterial,
    Scroll,
    ScrollControls,
    Sky,
    Sparkles,
    Stars,
    useScroll,
} from "@react-three/drei";
import WorkFieldForm from "./components/WorkFieldForm";
import EducationForm from "./components/EducationForm";
import { Suspense, useRef } from "react";
import { Statue } from "./beleg/models/Statue";
import { StatueStatic } from "./beleg/models/StatueStatic";

export default function Page() {
    return (
        <div className="h-screen w-full">
            <Canvas>
                <Suspense fallback={null}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <CVForm />
                </Suspense>
            </Canvas>
        </div>
    );
}

function CVForm() {
    const { width, height } = useThree((state) => state.viewport);

    return (
        <>
            <ScrollControls damping={1} pages={2}>
                <Scroll html>
                    <CVElements />
                </Scroll>
                <Scroll>
                    <Stars
                        radius={200}
                        depth={50}
                        count={5000}
                        factor={4}
                        saturation={10}
                        fade
                        speed={1}
                    />
                    <Sparkles
                        count={1000}
                        scale={30}
                        size={2}
                        speed={1}
                    ></Sparkles>
                    <group position={[3.5, 2, 1]}>
                        <mesh>
                            <boxGeometry args={[1, 1, 0.5]} />
                            <meshStandardMaterial color="#cd61ff" />
                        </mesh>
                    </group>

                    <group position={[0, -5, 0]}>
                        <mesh>
                            <boxGeometry args={[1, 1, 1]} />
                            <MeshTransmissionMaterial color="pink" />
                        </mesh>
                    </group>
                </Scroll>
            </ScrollControls>
        </>
    );
}

function CVElements() {
    const scroll = useScroll();
    const educationRef = useRef<HTMLDivElement>(null);
    const aboutMeRef = useRef<HTMLDivElement>(null);
    useFrame(() => {
        const d = scroll.range(0, 1);
        educationRef.current!.style.transform = `scale(${d})`;
        aboutMeRef.current!.style.transform = `scale(${1 - d / 2})`;
    });
    return (
        <>
            <div className="flex w-screen justify-center">
                <AboutMeForm ref={aboutMeRef} />
            </div>
            <EducationForm
                ref={educationRef}
                style={{
                    position: "absolute",
                    top: "100vh",
                    left: "45vw",
                    transform: "scale(1)",
                }}
            />
        </>
    );
}
