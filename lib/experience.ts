export interface Job {
    title: string;
    company: string;
    duration: string;
    period: string;
    location: string;
    description: string;
    highlights: string[];
}

export interface Education {
    degree: string;
    field: string;
    institution: string;
    period: string;
    grade: string;
}

export interface Certification {
    name: string;
    issuer: string;
}

export const workExperience: Job[] = [
    {
        title: "DevOps \u0026 App Modernization Intern",
        company: "Celebal Technologies",
        duration: "3 mos",
        period: "Jan 2024 \u2014 Present",
        location: "Jaipur, India",
        description: "Focusing on containerizing legacy monolithic applications and building robust CI/CD pipelines to automate cloud deployments.",
        highlights: ["Kubernetes", "Docker", "Azure DevOps", "CI/CD Pipelines", "App Modernization"]
    },
    {
        title: "Building ML Infrastructure",
        company: "Personal Research",
        duration: "6 mos",
        period: "June 2023 \u2014 Dec 2023",
        location: "Remote",
        description: "Engineered scalable data foundations and experimentation platforms using MLflow, Databricks, and AWS.",
        highlights: ["MLOps", "MLflow", "Databricks", "AWS", "Terraform"]
    }
];

export const education: Education[] = [
    {
        degree: "Bachelor of Technology",
        field: "Computer Science \u0026 Engineering (AI \u0026 DS)",
        institution: "Amity University",
        period: "2021 \u2014 2025",
        grade: "9.2 CGPA"
    }
];

export const certifications: Certification[] = [
    {
        name: "HashiCorp Certified: Terraform Associate",
        issuer: "HashiCorp"
    },
    {
        name: "AWS Certified Solutions Architect \u2014 Associate",
        issuer: "Amazon Web Services"
    },
    {
        name: "Microsoft Certified: Azure Fundamentals",
        issuer: "Microsoft"
    },
    {
        name: "CKA: Certified Kubernetes Administrator",
        issuer: "Cloud Native Computing Foundation"
    }
];
