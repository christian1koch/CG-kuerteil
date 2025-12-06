import React, { useState } from "react";
import { Html } from "@react-three/drei";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../../components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function AboutMeForm(
    props: React.ComponentPropsWithRef<"div">
): React.ReactElement {
    const [aboutMe, setAboutMe] = useState<string>("");

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
                    onChange={(e) => setAboutMe(e.target.value)}
                    className="h-52 w-10/12 resize-none rounded border p-2"
                />
            </div>
        </div>
    );
}
