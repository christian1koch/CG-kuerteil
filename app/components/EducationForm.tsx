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
import { EducationField } from "../beleg/Text/types";

type EducationFormProps = React.ComponentPropsWithRef<"div">;

export function EducationForm(props: EducationFormProps) {
    const [education, setEducation] = useState<EducationField>({
        degree: "",
        institution: "",
        duration: "",
        details: [""],
    });

    return (
        <div {...props}>
            <Card className="w-3xl max-w-sm">
                <CardHeader>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>
                        Share your education details.
                    </CardDescription>
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
        </div>
    );
}

export default EducationForm;
