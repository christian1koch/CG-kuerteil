"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, OrbitControls, Text3D, Text } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrthographicCamera } from "@react-three/drei";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TodoProvider, useTodoContext } from "./TodoContext";
import { useControls } from "leva";
import { Pencil } from "../components/Pencil";

export default function Home() {
  return (
    <div className="h-screen">
      <TodoProvider>
        <Canvas className="h-full w-full bg-indigo-950">
          <Scene />
        </Canvas>
      </TodoProvider>
    </div>
  );
}

function Scene() {
  const ref = useRef<THREE.Mesh>(null!);
  const textRef = useRef<THREE.Mesh>(null!);
  const [maxWidth, setMaxWidth] = useState(10);
  const [text, setText] = useState("Buy new groceries");

  const textControls = useControls({
    text: text,
  });

  useEffect(() => {
    if (!textRef.current) return;
    textRef.current.geometry.computeBoundingSphere();
    console.log(JSON.stringify(textRef.current.geometry));
    const boundigSphere = textRef.current.geometry.boundingSphere;
    console.log(boundigSphere);
    const newWidth = boundigSphere ? boundigSphere.radius * 2 : 10;
    setMaxWidth(newWidth);
  }, [textRef]);

  useFrame(({ camera }) => {
    ref.current.quaternion.copy(camera.quaternion);
  });

  return (
    <>
      <ambientLight intensity={1} />
      <OrthographicCamera
        makeDefault
        position={[5, 5, 5]}
        zoom={50}
        near={0.1}
        far={1000}
      />
      <Text position={[-4, 3, 0]}>⛔</Text>
      <OrbitControls />

      <mesh ref={ref} position={[0, 0, 0]}>
        <mesh position={[maxWidth / 2, 0, -1]} scale={[maxWidth, 2, 1]}>
          <boxGeometry />
          <meshBasicMaterial color={"black"} />
        </mesh>

        <Text3D ref={textRef} font="/geist-mono-regular-font.json">
          List Title
        </Text3D>
        <mesh>
          <Pencil position={[-1.5, -1.5, 0]} />
          <Text3D
            ref={textRef}
            font="/geist-mono-regular-font.json"
            position={[0, -2, 0]}
          >
            {textControls.text}
          </Text3D>
        </mesh>
      </mesh>
    </>
  );
}
