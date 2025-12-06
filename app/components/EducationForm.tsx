import React, { useState } from "react";
import { Html } from "@react-three/drei";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction,
} from "../../components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { EducationField } from "../beleg/Text/types";
import { Button } from "@/components/ui/button";

type EducationFormProps = React.ComponentPropsWithRef<"div">;

export function EducationForm(props: EducationFormProps) {
    const [education, setEducation] = useState<EducationField>({
        degree: "",
        institution: "",
        duration: "",
        details: [""],
    });

    return (
        <div className="w-screen p-10" {...props}>
            <div className="mb-10 flex items-center justify-between">
                <h2 className="text-7xl font-extrabold tracking-tight text-balance">
                    Education
                </h2>
                <Button variant={"outline"}>Add Education</Button>
            </div>
            <EducationCard education={education} setEducation={setEducation} />
        </div>
    );
}

function EducationCard({
    education,
    setEducation,
}: {
    education: EducationField;
    setEducation: React.Dispatch<React.SetStateAction<EducationField>>;
}) {
    return (
        <Card className="w-3xl max-w-sm bg-transparent">
            <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>Share your education details.</CardDescription>
                <CardAction>
                    <Button variant={"destructive"}>Remove</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="mb-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                        id="degree"
                        value={education.degree}
                        onChange={(e) =>
                            setEducation((s) => ({
                                ...s,
                                degree: e.target.value,
                            }))
                        }
                    />
                </div>

                <div className="mb-2">
                    <Label htmlFor="institution">Institution</Label>
                    <Input
                        id="institution"
                        value={education.institution}
                        onChange={(e) =>
                            setEducation((s) => ({
                                ...s,
                                institution: e.target.value,
                            }))
                        }
                    />
                </div>

                <div className="mb-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                        id="duration"
                        value={education.duration}
                        onChange={(e) =>
                            setEducation((s) => ({
                                ...s,
                                duration: e.target.value,
                            }))
                        }
                    />
                </div>

                <div>
                    <Label htmlFor="education-details">
                        Details (one per line)
                    </Label>
                    <Textarea
                        id="education-details"
                        value={education.details.join("\n")}
                        onChange={(e) =>
                            setEducation((s) => ({
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
    );
}

export default EducationForm;
