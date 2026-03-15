export interface Job {
    title: string;
    company: string;
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
    location: string;
    grade: string;
    description: string;
    icon: string;
}

export interface Certification {
    name: string;
    issuer: string;
    icon: string;
    color: string;
    link: string;
}

export const workExperience: Job[] = [
    {
        title: "Junior Associate - DevOps and App Modernisation",
        company: "Celebal Technologies",
        period: "Nov 2025 - Present",
        location: "Jaipur, Rajasthan, India",
        description: "Working on DevOps practices and application modernization projects, implementing cloud infrastructure and CI/CD pipelines.",
        highlights: ["DevOps Implementation", "App Modernisation", "Cloud Infrastructure", "CI/CD Pipelines"]
    },
    {
        title: "Cloud Infra and Security Intern",
        company: "Celebal Technologies",
        period: "Jun 2025 - Aug 2025",
        location: "Jaipur, Rajasthan, India",
        description: "Focused on cloud infrastructure setup and security implementations, working with modern cloud platforms and security best practices.",
        highlights: ["Cloud Security", "Infrastructure Design", "Security Best Practices"]
    },
    {
        title: "Salesforce Developer Intern",
        company: "TechMatrix Consulting",
        period: "Apr 2025 - Jul 2025",
        location: "Jaipur, Rajasthan, India",
        description: "Developed custom Salesforce solutions, worked on CRM implementations, and created automation workflows.",
        highlights: ["Salesforce Development", "CRM Solutions", "Workflow Automation"]
    }
];

export const education: Education[] = [
    {
        degree: "Bachelor of Technology - BTech",
        field: "Artificial Intelligence and Data Science",
        institution: "Poornima College of Engineering",
        period: "November 2022 - May 2026 (Expected)",
        location: "Jaipur, Rajasthan, India",
        grade: "CGPA: 9.08",
        description: "Comprehensive education in AI, machine learning, data science, deep learning, and software development.",
        icon: "college"
    },
    {
        degree: "Higher Secondary Certificate",
        field: "Physics, Chemistry, Mathematics (PCM)",
        institution: "Lord Buddha Public School Kota",
        period: "April 2020 - April 2022",
        location: "Kota, Rajasthan, India",
        grade: "92.22%",
        description: "CBSE Board - Science stream with focus on PCM.",
        icon: "school"
    },
    {
        degree: "Secondary School Certificate",
        field: "CBSE",
        institution: "St Paul's Sr. Sec. School",
        period: "April 2009 - March 2020",
        location: "Vallabh Nagar, Kota, Rajasthan, India",
        grade: "92.6%",
        description: "CBSE Board - Completed secondary education with distinction.",
        icon: "school"
    }
];

export const certifications: Certification[] = [
    {
        name: "Microsoft Certified: Azure Developer Associate",
        issuer: "Microsoft",
        icon: "azure",
        color: "blue",
        link: ""
    },
    {
        name: "Microsoft Certified: Azure AI Engineer Associate",
        issuer: "Microsoft",
        icon: "azure",
        color: "blue",
        link: ""
    },
    {
        name: "Oracle Cloud Infrastructure Certified DevOps Professional",
        issuer: "Oracle",
        icon: "oracle",
        color: "red",
        link: ""
    },
    {
        name: "Oracle Cloud Infrastructure Certified Architect Associate",
        issuer: "Oracle",
        icon: "oracle",
        color: "red",
        link: ""
    }
];
