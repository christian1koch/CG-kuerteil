"use client";

import { Canvas } from "@react-three/fiber";
import { AboutMeForm } from "./components/ProfileForm";
import {
    Cloud,
    Clouds,
    DragControls,
    Float,
    MeshReflectorMaterial,
    MeshRefractionMaterial,
    MeshTransmissionMaterial,
    OrbitControls,
    Sky,
    Stars,
} from "@react-three/drei";
import { Fullscreen } from "@react-three/uikit";
import WorkFieldForm from "./components/WorkFieldForm";
import EducationForm from "./components/EducationForm";
import { Mesh, TorusKnotGeometry } from "three";
import { MeshMatcapMaterial, MeshStandardNodeMaterial } from "three/webgpu";
import * as THREE from "three";

export default function Page() {
    return (
        <div className="h-screen w-full bg-gray-900">
            <Canvas camera={{ position: [0, 0, 10] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <OrbitControls makeDefault />
                <DragControls>
                    <AboutMeForm />
                </DragControls>
                <Sky
                    distance={450000}
                    sunPosition={[10, -100, 100]}
                    inclination={2}
                    azimuth={0.5}
                />

                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />
                <EducationForm />
                <DragControls>
                    <Float
                        speed={2} // Animation speed, defaults to 1
                        rotationIntensity={1} // XYZ rotation intensity, defaults to 1
                        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
                        floatingRange={[1, 2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
                    >
                        <mesh />

                        <group>
                            <mesh position={[5, 5, 0]} castShadow>
                                <octahedronGeometry />
                                <MeshTransmissionMaterial color={"red"} />
                            </mesh>
                            <WorkFieldForm />
                        </group>
                    </Float>
                </DragControls>
            </Canvas>
        </div>
    );
}
