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
import { PencilText3D } from "../components/PencilText3D";

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
  const listTitleRef = useRef<THREE.Mesh>(null!);
  const itemTextRef = useRef<THREE.Mesh>(null!);
  const [maxWidth, setMaxWidth] = useState(10);
  const [text, setText] = useState("Buy new groceries");

  const textControls = useControls({
    text: text,
  });

  useEffect(() => {
    if (!itemTextRef.current) return;
    itemTextRef.current.geometry.computeBoundingSphere();
    const boundingSphere = itemTextRef.current.geometry.boundingSphere;
    const newWidth = boundingSphere ? boundingSphere.radius * 2 : 10;
    setMaxWidth(newWidth);
  }, [textControls.text]);

  useFrame(({ camera }) => {
    ref.current.quaternion.copy(camera.quaternion);
  });

  return (
    <>
      <ambientLight intensity={1} />
      {/* <OrthographicCamera
        makeDefault
        position={[5, 5, 5]}
        zoom={50}
        near={0.1}
        far={1000}
      /> */}
      <OrbitControls />

      <mesh ref={ref} position={[0, 0, 0]}>
        <mesh position={[maxWidth / 2, 0, -1]} scale={[maxWidth, 2, 1]}>
          <boxGeometry />
          <meshBasicMaterial color={"black"} />
        </mesh>

        <Text3D ref={listTitleRef} font="/geist-mono-regular-font.json">
          List Title
        </Text3D>
        <PencilText3D
          ref={itemTextRef}
          meshProps={{}}
          pencilProps={{ position: [-1.5, -1.5, 0] }}
          text3dProps={{
            font: "/geist-mono-regular-font.json",
            position: [0, -2, 0],
          }}
        >
          {textControls.text}
        </PencilText3D>
      </mesh>
    </>
  );
}
