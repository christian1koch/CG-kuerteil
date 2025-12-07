import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../../components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cvStorageService } from "../services/cvStorage";

export function AboutMeForm(
    props: React.ComponentPropsWithRef<"div">
): React.ReactElement {
    const [aboutMe, setAboutMe] = useState<string>("");

    useEffect(() => {
        const saved = cvStorageService.getAboutMe();
        if (saved) {
            setAboutMe(saved);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setAboutMe(newValue);
        cvStorageService.saveAboutMe(newValue);
    };

    return (
        <div
            className="jus flex h-screen w-[800px] flex-col items-center justify-between p-20"
            {...props}
        >
            <div>
                <h2 className="text-center text-9xl font-extrabold tracking-tight text-balance">
                    About Me
                </h2>
                <p className="text-muted-foreground text-center leading-7">
                    Let us know about yourself.
                </p>
            </div>
            <div className="mt-4 flex w-full justify-center">
                <Textarea
                    value={aboutMe}
                    onChange={handleChange}
                    className="h-52 w-10/12 resize-none rounded border p-2"
                />
            </div>
        </div>
    );
}
