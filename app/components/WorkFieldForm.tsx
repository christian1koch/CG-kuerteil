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
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { WorkExperienceField } from "../beleg/Text/types";

export function WorkFieldForm() {
    const [work, setWork] = useState<WorkExperienceField>({
        position: "",
        company: "",
        duration: "",
        details: [""],
    });

    return (
        <Html transform position={[-10, 0, 0]}>
            <Card className="w-3xl max-w-sm">
                <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                    <CardDescription>Share a work entry.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-2">
                        <Label htmlFor="position">Position</Label>
                        <Input
                            id="position"
                            value={work.position}
                            onChange={(e) =>
                                setWork((s) => ({
                                    ...s,
                                    position: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className="mb-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                            id="company"
                            value={work.company}
                            onChange={(e) =>
                                setWork((s) => ({
                                    ...s,
                                    company: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className="mb-2">
                        <Label htmlFor="work-duration">Duration</Label>
                        <Input
                            id="work-duration"
                            value={work.duration}
                            onChange={(e) =>
                                setWork((s) => ({
                                    ...s,
                                    duration: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Label htmlFor="work-details">
                            Details (one per line)
                        </Label>
                        <Textarea
                            id="work-details"
                            value={work.details.join("\n")}
                            onChange={(e) =>
                                setWork((s) => ({
                                    ...s,
                                    details: e.target.value
                                        .split("\n")
                                        .map((l) => l.trim()),
                                }))
                            }
                            className="h-24 w-full resize-none rounded border p-2"
                        />
                    </div>
                </CardContent>
            </Card>
        </Html>
    );
}

export default WorkFieldForm;
