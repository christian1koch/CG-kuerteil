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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WorkExperienceField } from "../beleg/Text/types";
import { Button } from "@/components/ui/button";

export function WorkFieldForm(props: React.ComponentPropsWithRef<"div">) {
    const emptyWork: WorkExperienceField = {
        position: "",
        company: "",
        duration: "",
        details: [""],
    };

    const [works, setWorks] = useState<WorkExperienceField[]>([emptyWork]);

    function addWork() {
        setWorks((s) => [...s, { ...emptyWork }]);
    }

    function updateWork(index: number, updated: WorkExperienceField) {
        setWorks((s) => s.map((w, i) => (i === index ? updated : w)));
    }

    function removeWork(index: number) {
        setWorks((s) => s.filter((_, i) => i !== index));
    }

    return (
        <div className="h-screen w-screen p-10" {...props}>
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Work Experience</h3>
                <Button variant="outline" onClick={addWork}>
                    Add Work
                </Button>
            </div>

            <div className="flex space-x-6">
                {works.map((work, idx) => (
                    <WorkCard
                        key={idx}
                        index={idx}
                        work={work}
                        updateWork={(w) => updateWork(idx, w)}
                        removeWork={() => removeWork(idx)}
                        canRemove={works.length > 1}
                    />
                ))}
            </div>
        </div>
    );
}

function WorkCard({
    index,
    work,
    updateWork,
    removeWork,
    canRemove,
}: {
    index: number;
    work: WorkExperienceField;
    updateWork: (w: WorkExperienceField) => void;
    removeWork: () => void;
    canRemove: boolean;
}) {
    return (
        <Card className="group relative w-3xl max-w-sm">
            <CardHeader>
                <CardTitle>Work {index + 1}</CardTitle>
                <CardDescription>Share a work entry.</CardDescription>
                <CardAction className="opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                        variant={"destructive"}
                        onClick={() => canRemove && removeWork()}
                        disabled={!canRemove}
                        aria-label={`Remove work ${index + 1}`}
                        title="Remove work"
                        className="p-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="mb-2">
                    <Label htmlFor={`position-${index}`}>Position</Label>
                    <Input
                        id={`position-${index}`}
                        value={work.position}
                        onChange={(e) =>
                            updateWork({ ...work, position: e.target.value })
                        }
                    />
                </div>

                <div className="mb-2">
                    <Label htmlFor={`company-${index}`}>Company</Label>
                    <Input
                        id={`company-${index}`}
                        value={work.company}
                        onChange={(e) =>
                            updateWork({ ...work, company: e.target.value })
                        }
                    />
                </div>

                <div className="mb-2">
                    <Label htmlFor={`work-duration-${index}`}>Duration</Label>
                    <Input
                        id={`work-duration-${index}`}
                        value={work.duration}
                        onChange={(e) =>
                            updateWork({ ...work, duration: e.target.value })
                        }
                    />
                </div>

                <div>
                    <Label htmlFor={`work-details-${index}`}>
                        Details (one per line)
                    </Label>
                    <Textarea
                        id={`work-details-${index}`}
                        value={work.details.join("\n")}
                        onChange={(e) =>
                            updateWork({
                                ...work,
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

export default WorkFieldForm;
