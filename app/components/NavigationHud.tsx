"use client";

import { Button } from "@react-three/uikit-default";
import {
    Text as UiText,
    Container,
    Portal,
    Fullscreen,
} from "@react-three/uikit";
import { Mails } from "@react-three/uikit-lucide";

import { Book } from "../beleg/models/Book";
import { Statue } from "../beleg/models/Statue";
import { Briefcase } from "../beleg/models/Briefcase";

interface NavigationHudProps {
    onAboutMeClick?: () => void;
    onWorkExperienceClick?: () => void;
    onEducationClick?: () => void;
    onContactMeClick?: () => void;
}

export function NavigationHud({
    onAboutMeClick,
    onWorkExperienceClick,
    onEducationClick,
    onContactMeClick,
}: NavigationHudProps) {
    return (
        <Fullscreen
            gap={20}
            flexDirection={"row"}
            justifyContent="center"
            alignItems="flex-start"
            paddingY={20}
        >
            <Button variant="outline" onClick={onAboutMeClick}>
                <Container padding={0.2}>
                    <UiText>About me</UiText>
                    <Portal width={30} aspectRatio={1}>
                        <ambientLight intensity={2} />
                        <Statue scale={0.05} position={[0, -0.2, 0]} />
                    </Portal>
                </Container>
            </Button>
            <Button variant="outline" onClick={onWorkExperienceClick}>
                <Container padding={0.2} gap={5}>
                    <UiText>Work Experience</UiText>{" "}
                    <Portal width={50} aspectRatio={1}>
                        <ambientLight intensity={10} />
                        <Briefcase scale={2} position={[0, -1, 0]} />
                    </Portal>
                </Container>
            </Button>
            <Button variant="outline" onClick={onEducationClick}>
                <Container padding={0.2} gap={5}>
                    <UiText>Education</UiText>{" "}
                    <Portal width={30} aspectRatio={1}>
                        <ambientLight intensity={2} />
                        <Book
                            scale={3}
                            rotation={[Math.PI / 2, 0, 0]}
                            position={[0, -0.2, 0]}
                        />
                    </Portal>
                </Container>
            </Button>
            <Button variant="outline" onClick={onContactMeClick}>
                <Container padding={0.2} gap={5}>
                    <UiText>Contact me</UiText>
                    <Mails />
                </Container>
            </Button>
        </Fullscreen>
    );
}
