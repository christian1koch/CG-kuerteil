import React, { useState } from "react";
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
    const emptyEducation: EducationField = {
        degree: "",
        institution: "",
        duration: "",
        details: [""],
    };

    const [educations, setEducations] = useState<EducationField[]>([
        emptyEducation,
    ]);

    function addEducation() {
        setEducations((s) => [...s, { ...emptyEducation }]);
    }

    function updateEducation(index: number, updated: EducationField) {
        setEducations((s) => s.map((e, i) => (i === index ? updated : e)));
    }

    function removeEducation(index: number) {
        setEducations((s) => s.filter((_, i) => i !== index));
    }

    return (
        <div className="w-screen p-10" {...props}>
            <div className="mb-10 flex items-center justify-between">
                <h2 className="text-7xl font-extrabold tracking-tight text-balance">
                    Education
                </h2>
                <Button variant={"outline"} onClick={addEducation}>
                    Add Education
                </Button>
            </div>

            <div className="flex space-x-6">
                {educations.map((education, idx) => (
                    <EducationCard
                        key={idx}
                        index={idx}
                        education={education}
                        updateEducation={(u) => updateEducation(idx, u)}
                        removeEducation={() => removeEducation(idx)}
                        canRemove={educations.length > 1}
                    />
                ))}
            </div>
        </div>
    );
}

function EducationCard({
    index,
    education,
    updateEducation,
    removeEducation,
    canRemove,
}: {
    index: number;
    education: EducationField;
    updateEducation: (updated: EducationField) => void;
    removeEducation: () => void;
    canRemove: boolean;
}) {
    return (
        <Card className="w-3xl max-w-sm bg-transparent">
            <CardHeader>
                <CardTitle>Education {index + 1}</CardTitle>
                <CardDescription>Share your education details.</CardDescription>
                <CardAction>
                    <Button
                        variant={"destructive"}
                        onClick={() => canRemove && removeEducation()}
                        disabled={!canRemove}
                    >
                        Remove
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="mb-2">
                    <Label htmlFor={`degree-${index}`}>Degree</Label>
                    <Input
                        id={`degree-${index}`}
                        value={education.degree}
                        onChange={(e) =>
                            updateEducation({
                                ...education,
                                degree: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="mb-2">
                    <Label htmlFor={`institution-${index}`}>Institution</Label>
                    <Input
                        id={`institution-${index}`}
                        value={education.institution}
                        onChange={(e) =>
                            updateEducation({
                                ...education,
                                institution: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="mb-2">
                    <Label htmlFor={`duration-${index}`}>Duration</Label>
                    <Input
                        id={`duration-${index}`}
                        value={education.duration}
                        onChange={(e) =>
                            updateEducation({
                                ...education,
                                duration: e.target.value,
                            })
                        }
                    />
                </div>

                <div>
                    <Label htmlFor={`education-details-${index}`}>
                        Details (one per line)
                    </Label>
                    <Textarea
                        id={`education-details-${index}`}
                        value={education.details.join("\n")}
                        onChange={(e) =>
                            updateEducation({
                                ...education,
                                details: e.target.value
                                    .split("\n")
                                    .map((l) => l.trim()),
                            })
                        }
                        className="h-24 w-full resize-none rounded border p-2"
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export default EducationForm;
