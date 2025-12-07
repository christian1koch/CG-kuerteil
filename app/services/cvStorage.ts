import { EducationField, WorkExperienceField } from "../beleg/Text/types";

const STORAGE_KEYS = {
    ABOUT_ME: "cv_about_me",
    EDUCATION: "cv_education",
    WORK_EXPERIENCE: "cv_work_experience",
    EMAIL: "cv_email",
};

export const cvStorageService = {
    saveEmail: (email: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEYS.EMAIL, email);
        }
    },

    getEmail: (): string => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(STORAGE_KEYS.EMAIL) || "";
        }
        return "";
    },

    saveAboutMe: (text: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEYS.ABOUT_ME, text);
        }
    },

    getAboutMe: (): string => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(STORAGE_KEYS.ABOUT_ME) || "";
        }
        return "";
    },

    saveEducations: (educations: EducationField[]) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(
                STORAGE_KEYS.EDUCATION,
                JSON.stringify(educations)
            );
        }
    },

    getEducations: (): EducationField[] => {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem(STORAGE_KEYS.EDUCATION);
            if (data) {
                try {
                    return JSON.parse(data);
                } catch (e) {
                    console.error("Failed to parse education data", e);
                }
            }
        }
        return [];
    },

    saveWorkExperiences: (works: WorkExperienceField[]) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(
                STORAGE_KEYS.WORK_EXPERIENCE,
                JSON.stringify(works)
            );
        }
    },

    getWorkExperiences: (): WorkExperienceField[] => {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem(STORAGE_KEYS.WORK_EXPERIENCE);
            if (data) {
                try {
                    return JSON.parse(data);
                } catch (e) {
                    console.error("Failed to parse work experience data", e);
                }
            }
        }
        return [];
    },
};
