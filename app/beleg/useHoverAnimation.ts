import { useState, useMemo, useCallback } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";

// Custom hook for hover animations with configurable offset
export function useHoverAnimation(
  originalPosition: [number, number, number],
  hoverOffset: number
) {
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    if (typeof document !== "undefined") document.body.style.cursor = "pointer";
  }, []);

  const handlePointerOut = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    if (typeof document !== "undefined") document.body.style.cursor = "";
  }, []);

  const hoveredPosition: [number, number, number] = useMemo(
    () => [
      originalPosition[0],
      originalPosition[1] + hoverOffset,
      originalPosition[2],
    ],
    [originalPosition, hoverOffset]
  );

  const springConfig = useMemo(
    () => ({
      mass: 1,
      tension: 280,
      friction: 60,
    }),
    []
  );

  const { position } = useSpring({
    position: hovered ? hoveredPosition : originalPosition,
    config: springConfig,
  });

  return useMemo(
    () => ({
      position,
      hovered,
      handlePointerOver,
      handlePointerOut,
    }),
    [position, hovered, handlePointerOver, handlePointerOut]
  );
}
