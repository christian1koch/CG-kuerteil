"use client";

import { Canvas } from "@react-three/fiber";
import { AboutMeForm } from "./components/ProfileForm";
import { OrbitControls } from "@react-three/drei";
import { Fullscreen } from "@react-three/uikit";
import WorkFieldForm from "./components/WorkFieldForm";
import EducationForm from "./components/EducationForm";

export default function Page() {
    return (
        <div className="h-screen w-full bg-gray-900">
            <Canvas camera={{ position: [0, 0, 10] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <OrbitControls makeDefault />
                <AboutMeForm />
                <WorkFieldForm />
                <EducationForm />
                <mesh position={[0, 0, 0]} rotation={[0.4, 0.2, 0]} castShadow>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial
                        color="orange"
                        metalness={0.3}
                        roughness={0.6}
                    />
                </mesh>
            </Canvas>
        </div>
    );
}
