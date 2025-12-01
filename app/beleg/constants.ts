import { WorkExperienceField, EducationField } from "./Text";

export const DEBUG_MODE = true;

export const EDUCATION_MOCKS: EducationField[] = [
    {
        degree: "Master of Science in Computer Science",
        institution: "Tech University",
        duration: "2019 - 2021",
        details: [
            "Specialized in Artificial Intelligence and Machine Learning.",
            "Thesis: 'Optimizing Neural Networks for Edge Devices'.",
            "Graduated with Honors.",
        ],
    },
    {
        degree: "Bachelor of Science in Software Engineering",
        institution: "State College",
        duration: "2015 - 2019",
        details: [
            "Focus on Web Development and Database Systems.",
            "Capstone Project: Real-time Collaboration Tool.",
            "Dean's List for 6 consecutive semesters.",
        ],
    },
];

export const WORK_EXPERIENCE_MOCKS: WorkExperienceField[] = [
    {
        position: "Senior Frontend Developer",
        company: "Tech Corp",
        duration: "2021 - Present",
        details: [
            "Led the migration of the main application to Next.js.",
            "Improved site performance and SEO scores significantly.",
            "Mentored junior developers and conducted code reviews.",
        ],
    },
    {
        position: "Full Stack Developer",
        company: "Startup Inc",
        duration: "2019 - 2021",
        details: [
            "Developed and maintained RESTful APIs using Node.js.",
            "Implemented responsive UI designs with React and Tailwind CSS.",
            "Managed database schemas and migrations in PostgreSQL.",
        ],
    },
    {
        position: "Junior Web Developer",
        company: "Web Agency",
        duration: "2018 - 2019",
        details: [
            "Built landing pages and small e-commerce sites for clients.",
            "Collaborated with designers to implement pixel-perfect layouts.",
            "Assisted in debugging and fixing cross-browser compatibility issues.",
        ],
    },
];
