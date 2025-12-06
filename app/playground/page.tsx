/* eslint-disable jsx-a11y/alt-text */
"use client";
import * as THREE from "three";
import { Suspense, useRef, useState, type ComponentProps } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    Preload,
    ScrollControls,
    Scroll,
    useScroll,
    Image as ImageImpl,
} from "@react-three/drei";

function Image({
    c = new THREE.Color(),
    ...props
}: { c?: THREE.Color } & ComponentProps<typeof ImageImpl>) {
    const ref = useRef<any>(null!);
    const [hovered, hover] = useState(false);
    useFrame(() => {
        ref.current.material.color.lerp(
            c.set(hovered ? "white" : "#ccc"),
            hovered ? 0.4 : 0.05
        );
    });
    return (
        <ImageImpl
            ref={ref}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            {...(props as any)}
        />
    );
}

function Images() {
    const { width, height } = useThree((state) => state.viewport);
    const data = useScroll();
    const group = useRef<THREE.Group>(null!);

    // Define a small interface for the child objects we expect: they are
    // three.js objects with a material that exposes zoom and grayscale.
    type ZoomableChild = THREE.Object3D & {
        material?: {
            zoom?: number;
            grayscale?: number;
            color?: { lerp: (c: THREE.Color, n: number) => void };
        };
    };

    useFrame(() => {
        const children = group.current.children as ZoomableChild[];
        if (!children || children.length < 7) return;

        children[0].material!.zoom = 1 + data.range(0, 1 / 3) / 3;
        children[1].material!.zoom = 1 + data.range(0, 1 / 3) / 3;
        children[2].material!.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 3;
        children[3].material!.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
        children[4].material!.zoom = 1 + data.range(1.25 / 3, 1 / 3) / 1;
        children[5].material!.zoom = 1 + data.range(1.8 / 3, 1 / 3) / 3;
        children[5].material!.grayscale = 1 - data.range(1.6 / 3, 1 / 3);
        children[6].material!.zoom = 1 + (1 - data.range(2 / 3, 1 / 3)) / 3;
    });
    return (
        <group ref={group}>
            <Image
                position={[-2, 0, 0]}
                scale={[4, height, 1] as any}
                url="/img1.jpg"
            />
            <Image position={[2, 0, 1]} scale={3} url="/img6.jpg" />
            <Image
                position={[-2.3, -height, 2]}
                scale={[1, 3, 1] as any}
                url="/trip2.jpg"
            />
            <Image
                position={[-0.6, -height, 3]}
                scale={[1, 2, 1] as any}
                url="/img8.jpg"
            />
            <Image
                position={[0.75, -height, 3.5]}
                scale={1.5}
                url="/trip4.jpg"
            />
            <Image
                position={[0, -height * 1.5, 2.5]}
                scale={[1.5, 3, 1] as any}
                url="/img3.jpg"
            />
            <Image
                position={[0, -height * 2 - height / 4, 0]}
                scale={[width, height / 2, 1] as any}
                url="/img7.jpg"
            />
        </group>
    );
}

export default function App() {
    return (
        <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
            <Suspense fallback={null}>
                <ScrollControls damping={4} pages={3}>
                    <Scroll>
                        <Images />
                    </Scroll>
                    <Scroll html>
                        <h1
                            style={{
                                position: "absolute",
                                top: "60vh",
                                left: "0.5em",
                            }}
                        >
                            to
                        </h1>
                        <h1
                            style={{
                                position: "absolute",
                                top: "120vh",
                                left: "60vw",
                            }}
                        >
                            be
                        </h1>
                        <h1
                            style={{
                                position: "absolute",
                                top: "198.5vh",
                                left: "0.5vw",
                                fontSize: "40vw",
                            }}
                        >
                            home
                        </h1>
                    </Scroll>
                </ScrollControls>
                <Preload />
            </Suspense>
        </Canvas>
    );
}
