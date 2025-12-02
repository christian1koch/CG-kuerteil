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

export function AboutMeForm() {
    const [aboutMe, setAboutMe] = useState("");

    return (
        <Html transform position={[5, 0, 0]}>
            <Card className="w-3xl max-w-sm">
                <CardHeader>
                    <CardTitle>About Me</CardTitle>
                    <CardDescription>
                        Share some information about yourself.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={aboutMe}
                        onChange={(e) => setAboutMe(e.target.value)}
                        className="h-32 w-full resize-none rounded border p-2"
                    />
                </CardContent>
            </Card>
        </Html>
    );
}
