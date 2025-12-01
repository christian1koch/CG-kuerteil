"use client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { CameraControls, Html, useProgress } from "@react-three/drei";
import { Ref, Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { InteractiveHouse } from "./InteractiveHouse";

const DEBUG_MODE = true;

function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
}

export default function Beleg() {
    return (
        <div className="h-screen bg-gradient-to-b from-yellow-300 via-purple-600 to-black">
            <Canvas
                shadows
                camera={{ position: [0, 5, 10] }}
                gl={{ stencil: true }}
            >
                <Suspense fallback={<Loader />}>
                    <SceneContainer />
                </Suspense>
            </Canvas>
        </div>
    );
}
function SceneContainer() {
    return (
        <>
            <InteractiveHouse />
            <Scene castShadow receiveShadow />

            <ambientLight intensity={1} />
            <directionalLight
                ref={(light) => {
                    if (light && DEBUG_MODE) {
                        const helper = new THREE.DirectionalLightHelper(
                            light,
                            2,
                            0xff0000
                        );
                        light.parent?.add(helper);
                    }
                }}
                castShadow
                intensity={0.5}
                shadow-bias={-0.0001}
                position={[5, 20, 7.5]}
                shadow-mapSize-width={2048}
            />
            <pointLight
                ref={(light) => {
                    if (light) {
                        const helper = new THREE.PointLightHelper(light, 1);
                        light.parent?.add(helper);
                    }
                }}
                position={[2, 2, -1]}
                scale={0.5}
                intensity={1}
                castShadow
                shadow-bias={-0.001}
                distance={4}
            />
        </>
    );
}
