import { Ref, useEffect, useRef, useState } from "react";
import { Book } from "./Book";
import { Briefcase } from "./Briefcase";
import { Envelope } from "./Envelope";
import { Statue } from "./Statue";
import * as THREE from "three";
import { DEBUG_MODE, WORK_EXPERIENCE_MOCKS } from "./constants";
import { CameraControls } from "@react-three/drei";
import { WorkExperienceText } from "./Texts";
import { NavigationHud } from "../components/NavigationHud";

const Positions = {
    ROOM: new THREE.Vector3(1.8, 1.3, -0.5),
    OFFICE: new THREE.Vector3(1.62, 1.5, -2.5),
    SCHOOL: new THREE.Vector3(-6.1, 2.2, -3),
    GARDEN: new THREE.Vector3(-6.62, 2.2, 1.5),
};

const Rotation = {
    ROOM: new THREE.Euler(-Math.PI / 6, Math.PI, 0),
    OFFICE: new THREE.Euler(Math.PI / 24, 0, 0),
    SCHOOL: new THREE.Euler(Math.PI / 24, 0, 0),
    GARDEN: new THREE.Euler(Math.PI, 0, 0),
};

/**
 * Contains:
 * The objects that can be clicked ✅
 * The states to change the current room
 * the camera and the targets
 */
export function InteractiveHouse() {
    const [selectedRoom, setSelectedRoom] = useState<Spaces>(Spaces.Bedroom);
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
                fields={WORK_EXPERIENCE_MOCKS}
                onHoverChange={setDisableZoom}
                position={[1.78, 1.7, -2.92]}
                rotation={[Math.PI / 32, -Math.PI, 0]}
                scale={0.055}
            />
            <MeshCameraTargetControl space={selectedRoom} ref={meshRef} />
            <Briefcase onClick={() => setSelectedRoom(Spaces.Office)} />
            <Book onClick={() => setSelectedRoom(Spaces.School)} />
            <Envelope onClick={() => setSelectedRoom(Spaces.Garden)} />
            <Statue onClick={() => setSelectedRoom(Spaces.Bedroom)} />
        </>
    );
}

enum Spaces {
    Bedroom,
    Office,
    School,
    Garden,
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
            rotation={Rotation.OFFICE}
            position={Positions.OFFICE}
            ref={ref}
        />
    );
}

export function BedRoomCameraTarget({ ref }: { ref: Ref<THREE.Mesh> }) {
    return (
        <MeshCameraTarget
            rotation={Rotation.ROOM}
            position={Positions.ROOM}
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
            rotation={Rotation.SCHOOL}
            position={Positions.SCHOOL}
            ref={ref}
        />
    );
}

export function GardenCameraTargets({ ref }: { ref: Ref<THREE.Mesh> }) {
    return (
        <MeshCameraTarget
            rotation={Rotation.GARDEN}
            position={Positions.GARDEN}
            ref={ref}
        />
    );
}
