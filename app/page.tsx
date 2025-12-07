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
import { ContactMeForm } from "./components/ContactMeForm";
import { Suspense, useRef } from "react";
import EducationForm from "./components/EducationForm";
import WorkFieldForm from "./components/WorkFieldForm";

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
    useThree((state) => state.viewport);

    return (
        <>
            <ScrollControls damping={1} pages={4}>
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
                    <group position={[3.5, -21, 0]}>
                        <mesh>
                            <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />
                            <meshStandardMaterial color="#ffab61" />
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
    const contactRef = useRef<HTMLDivElement>(null);

    useFrame(() => {
        const d = scroll.range(0, 1);
        const about = scroll.range(0, 1 / 4);
        const education =
            scroll.range(0, 1 / 4) - scroll.range(2 / 4, 1 / 4) / 2;
        const work =
            scroll.range(1 / 3, 1 / 4) - scroll.range(3 / 4, 1 / 4) / 2;
        const contact = scroll.range(3 / 4, 1 / 4);
        console.log(work, d);
        aboutMeRef.current!.style.transform = `scale(${1 - about / 2})`;
        educationRef.current!.style.transform = `scale(${education})`;
        workRef.current!.style.transform = `scale(${work})`;
        contactRef.current!.style.transform = `scale(${0.5 + contact / 2})`;
    });
    return (
        <>
            <div className="flex w-screen justify-center">
                <AboutMeForm ref={aboutMeRef} />
            </div>
            <EducationForm ref={educationRef} />
            <WorkFieldForm ref={workRef} />
            <div className="flex w-screen justify-center">
                <ContactMeForm ref={contactRef} />
            </div>
        </>
    );
}
