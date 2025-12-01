import { Ref, useEffect, useRef, useState } from "react";
import { Book } from "./Book";
import { Briefcase } from "./Briefcase";
import { Envelope } from "./Envelope";
import { Statue } from "./Statue";
import * as THREE from "three";
import {
    ABOUT_ME_MOCK,
    DEBUG_MODE,
    EDUCATION_MOCKS,
    WORK_EXPERIENCE_MOCKS,
} from "./constants";
import { CameraControls, useFont } from "@react-three/drei";
import { AboutMeText, EducationText, WorkExperienceText } from "./Text";
import { NavigationHud } from "../components/NavigationHud";
import { Frame } from "./Frame";
import { PosterPlane } from "./PosterPlane";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

enum Spaces {
    Initial,
    Bedroom,
    Office,
    School,
    Garden,
}

const Positions: Record<Spaces, THREE.Vector3> = {
    [Spaces.Initial]: new THREE.Vector3(1.8, 1.3, -0.5),
    [Spaces.Bedroom]: new THREE.Vector3(-0.4, 2.8, -1.2),
    [Spaces.Office]: new THREE.Vector3(1.62, 1.5, -2.6),
    [Spaces.School]: new THREE.Vector3(-6.1, 2.2, -3),
    [Spaces.Garden]: new THREE.Vector3(-6.62, 2.2, 1.5),
};

const Rotation: Record<Spaces, THREE.Euler> = {
    [Spaces.Initial]: new THREE.Euler(-Math.PI / 6, Math.PI, 0),
    [Spaces.Bedroom]: new THREE.Euler(0, Math.PI, 0),
    [Spaces.Office]: new THREE.Euler(Math.PI / 24, 0, 0),
    [Spaces.School]: new THREE.Euler(Math.PI / 24, 0, 0),
    [Spaces.Garden]: new THREE.Euler(Math.PI, 0, 0),
};

/**
 * Contains:
 * The objects that can be clicked ✅
 * The states to change the current room
 * the camera and the targets
 */
export function InteractiveHouse() {
    const [selectedRoom, setSelectedRoom] = useState<Spaces>(Spaces.Initial);
    const [disableZoom, setDisableZoom] = useState(false);

    const controlsRef = useRef<CameraControls>(null!);
    const meshRef = useRef<THREE.Mesh>(null!);

    const handleFocusOnObject = async () => {
        if (!controlsRef.current) return;
        if (!meshRef.current) return;
        const { x, y, z } = meshRef.current.position;
        if (!meshRef.current.geometry.boundingBox) {
            meshRef.current.geometry.computeBoundingBox();
        }
        const bb = meshRef.current.geometry.boundingBox;
        const rectWidth = bb!.max.x - bb!.min.x;
        const rectHeight = bb!.max.y - bb!.min.y;
        const rectNormal = new THREE.Vector3()
            .set(0, 0, 1)
            .applyQuaternion(meshRef.current.quaternion);
        const rectCenterPosition = new THREE.Vector3().copy(
            meshRef.current.position
        );
        // controlsRef.current.setLookAt(x, y, z, x, y, z);
        const distance = controlsRef.current.getDistanceToFitBox(
            rectWidth,
            rectHeight,
            0
        );
        const cameraPosition = new THREE.Vector3(x, y, z)
            .copy(rectNormal)
            .multiplyScalar(-distance)
            .add(rectCenterPosition);

        // Calculate a position further away for the "zoomed out" state
        const farCameraPosition = new THREE.Vector3(x, y, z)
            .copy(rectNormal)
            .multiplyScalar(-(distance + 5))
            .add(rectCenterPosition);

        // 1. Zoom out from current position
        await controlsRef.current.dolly(-5, true);

        // 2. Rotate/Move to the new angle while staying far away
        await controlsRef.current
            .normalizeRotations()
            .setLookAt(
                farCameraPosition.x,
                farCameraPosition.y,
                farCameraPosition.z,
                rectCenterPosition.x,
                rectCenterPosition.y,
                rectCenterPosition.z,
                true
            );

        // 3. Zoom in to the final position
        await controlsRef.current.setLookAt(
            cameraPosition.x,
            cameraPosition.y,
            cameraPosition.z,
            rectCenterPosition.x,
            rectCenterPosition.y,
            rectCenterPosition.z,
            true
        );
    };

    useEffect(() => {
        handleFocusOnObject();
    }, [selectedRoom]);

    return (
        <>
            <CameraControls
                ref={controlsRef}
                makeDefault
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2}
                dollySpeed={disableZoom ? 0 : 1}
                truckSpeed={disableZoom ? 0 : 2}
            />
            <NavigationHud
                onAboutMeClick={() => {
                    console.log("About me clocked");
                }}
            />
            <WorkExperienceText
                visible={selectedRoom === Spaces.Office}
                fields={WORK_EXPERIENCE_MOCKS}
                onHoverChange={setDisableZoom}
                position={[1.78, 1.7, -2.92]}
                rotation={[Math.PI / 32, -Math.PI, 0]}
                scale={0.055}
            />
            <EducationText
                visible={selectedRoom === Spaces.School}
                fields={EDUCATION_MOCKS}
                onHoverChange={setDisableZoom}
                position={[-5.5, 2.7, -2.4]}
                rotation={[0, -Math.PI, 0]}
                scale={0.2}
            />
            <AboutMeText
                field={ABOUT_ME_MOCK}
                scale={0.3}
                position={[-0.8, 3.2, -1.55]}
                visible={selectedRoom === Spaces.Bedroom}
            />
            {selectedRoom === Spaces.Bedroom && (
                <EffectComposer enableNormalPass={false} multisampling={0}>
                    <Bloom
                        luminanceThreshold={1}
                        mipmapBlur
                        intensity={1.5}
                        radius={0.6}
                    />
                </EffectComposer>
            )}
            <Frame />
            <PosterPlane position={[-0.2, 2.8, -1.55]} scale={0.4} />
            <MeshCameraTargetControl space={selectedRoom} ref={meshRef} />
            <Briefcase onClick={() => setSelectedRoom(Spaces.Office)} />
            <Book onClick={() => setSelectedRoom(Spaces.School)} />
            <Envelope onClick={() => setSelectedRoom(Spaces.Garden)} />
            <Statue onClick={() => setSelectedRoom(Spaces.Bedroom)} />
        </>
    );
}

interface MeshCameraTargetControl {
    ref: Ref<THREE.Mesh>;
    space: Spaces;
}

export function MeshCameraTargetControl({
    ref,
    space,
}: MeshCameraTargetControl) {
    switch (space) {
        case Spaces.Initial:
            return <InitialCameraTarget ref={ref} />;
        case Spaces.Bedroom:
            return <BedRoomCameraTarget ref={ref} />;
        case Spaces.Office:
            return <OfficeCameraTargets ref={ref} />;
        case Spaces.School:
            return <SchoolCameraTargets ref={ref} />;
        case Spaces.Garden:
            return <GardenCameraTargets ref={ref} />;
        default:
            return null;
    }
}

export function OfficeCameraTargets({ ref }: { ref: Ref<THREE.Mesh> }) {
    return (
        <MeshCameraTarget
            rotation={Rotation[Spaces.Office]}
            position={Positions[Spaces.Office]}
            ref={ref}
        />
    );
}

export function InitialCameraTarget({ ref }: { ref: Ref<THREE.Mesh> }) {
    return (
        <MeshCameraTarget
            rotation={Rotation[Spaces.Initial]}
            position={Positions[Spaces.Initial]}
            ref={ref}
        />
    );
}

export function BedRoomCameraTarget({ ref }: { ref: Ref<THREE.Mesh> }) {
    return (
        <MeshCameraTarget
            rotation={Rotation[Spaces.Bedroom]}
            position={Positions[Spaces.Bedroom]}
            ref={ref}
        />
    );
}

interface MeshCameraTarget {
    ref: Ref<THREE.Mesh>;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    color?: THREE.Color;
}

export function MeshCameraTarget({
    ref,
    position,
    rotation,
    color = new THREE.Color(0xff0000),
}: MeshCameraTarget) {
    return (
        <mesh
            ref={ref}
            position={position}
            rotation={rotation}
            visible={DEBUG_MODE}
        >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial wireframe visible={DEBUG_MODE} color={color} />
        </mesh>
    );
}

export function SchoolCameraTargets({ ref }: { ref: Ref<THREE.Mesh> }) {
    return (
        <MeshCameraTarget
            rotation={Rotation[Spaces.School]}
            position={Positions[Spaces.School]}
            ref={ref}
        />
    );
}

export function GardenCameraTargets({ ref }: { ref: Ref<THREE.Mesh> }) {
    return (
        <MeshCameraTarget
            rotation={Rotation[Spaces.Garden]}
            position={Positions[Spaces.Garden]}
            ref={ref}
        />
    );
}
