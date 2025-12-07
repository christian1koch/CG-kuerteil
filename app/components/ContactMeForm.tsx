import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cvStorageService } from "../services/cvStorage";
import { Label } from "@/components/ui/label";

export function ContactMeForm(
    props: React.ComponentPropsWithRef<"div">
): React.ReactElement {
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        const saved = cvStorageService.getEmail();
        if (saved) {
            setEmail(saved);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setEmail(newValue);
        cvStorageService.saveEmail(newValue);
    };

    return (
        <div
            className="flex h-screen w-[800px] flex-col items-center justify-center p-20"
            {...props}
        >
            <div className="mb-10">
                <h2 className="text-center text-9xl font-extrabold tracking-tight text-balance">
                    Contact Information
                </h2>
                <p className="text-muted-foreground text-center leading-7">
                    Leave your email so people can send you emails.
                </p>
            </div>
            <div className="w-full max-w-md">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={handleChange}
                    className="mt-2"
                />
            </div>
        </div>
    );
}
