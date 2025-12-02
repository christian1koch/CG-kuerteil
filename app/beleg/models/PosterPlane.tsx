import { useTexture } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

export function PosterPlane(props: ThreeElements["mesh"]) {
    const texture = useTexture("/textures/poster.jpg");

    return (
        <mesh {...props}>
            <planeGeometry args={[6, 3.5]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
}
