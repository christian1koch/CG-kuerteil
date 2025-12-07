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
import { TorusGeometry } from "three";

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
            <ScrollControls damping={1} pages={3}>
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
                            <cylinderGeometry args={[1, 1, 1]} />
                            <meshStandardMaterial color="#aeffb4" />
                        </mesh>
                    </group>
                    <group position={[-3.5, -12, 0]}>
                        <mesh>
                            <coneGeometry args={[1, 1]} />
                            <meshStandardMaterial color="#aef1ff" />
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
    const workRef = useRef<HTMLDivElement>(null);
    useFrame(() => {
        const d = scroll.range(0, 1);
        const about = scroll.range(0, 1 / 3);
        const education = scroll.range(0, 1 / 3);
        const work = scroll.range(2 / 3, 1 / 3);
        console.log(work, d);
        aboutMeRef.current!.style.transform = `scale(${1 - about / 2})`;
        educationRef.current!.style.transform = `scale(${education - work / 2})`;
        workRef.current!.style.transform = `scale(${0.5 + work / 2})`;
    });
    return (
        <>
            <div className="flex w-screen justify-center">
                <AboutMeForm ref={aboutMeRef} />
            </div>
            <EducationForm ref={educationRef} />
            <WorkFieldForm ref={workRef} />
        </>
    );
}
