import { Canvas } from "@react-three/fiber";

export default function Home() {
    return (
        <div className="h-screen">
            <Canvas className="bg-cyan-200 h-full w-full">
                <Scene />
            </Canvas>
        </div>
    );
}

function Scene() {
    return (
        <Text color="black" anchorX="center" anchorY="middle">
  hello world!
</Text> 
    )
}