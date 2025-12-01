import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    transpilePackages: [
        "three",
        "@react-three/uikit",
        "@react-three/uikit-default",
        "@react-three/uikit-lucide",
        "@pmndrs/uikit",
    ],
};

export default nextConfig;
