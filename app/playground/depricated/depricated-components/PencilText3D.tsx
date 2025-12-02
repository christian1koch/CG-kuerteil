"use client";
import React from "react";
import { Text3D } from "@react-three/drei";
import * as THREE from "three";
import { Pencil } from "./Pencil";

type MeshProps = React.ComponentProps<"mesh">;

interface PencilText3DProps {
  meshProps?: MeshProps; // Props passed to wrapping mesh
  text3dProps?: Omit<React.ComponentProps<typeof Text3D>, "children">; // Props passed to Text3D excluding children
  pencilProps?: React.ComponentProps<typeof Pencil>; // Props passed to Pencil
  children?: React.ReactNode; // Text content
  fallbackFont?: string; // Optional fallback font if none provided
}

// Exposes the Text3D mesh via forwarded ref so parent can access geometry, etc.
export const PencilText3D = React.forwardRef<THREE.Mesh, PencilText3DProps>(
  (
    {
      meshProps,
      text3dProps,
      pencilProps,
      children,
      fallbackFont = "/geist-mono-regular-font.json",
    },
    ref
  ) => {
    const { font = fallbackFont, ...restTextProps } = text3dProps || {};
    return (
      <mesh {...meshProps}>
        <Pencil {...pencilProps} />
        <Text3D ref={ref} font={font} {...restTextProps}>
          {children ?? ""}
        </Text3D>
      </mesh>
    );
  }
);

PencilText3D.displayName = "PencilText3D";
