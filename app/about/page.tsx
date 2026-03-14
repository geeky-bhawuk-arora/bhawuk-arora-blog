import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About — Bhawuk Arora",
    description: "Bhawuk Arora is an AI & Data Science student exploring the intersection of DevOps, MLOps, and distributed systems.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 w-full flex flex-col items-center">
            <div className="w-full max-w-3xl mx-auto px-6 md:px-8">

                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8 text-[var(--text-primary)] font-['Space_Grotesk'] leading-[1.1]">
                    About
                </h1>

                <div className="article-body">
                    <p className="text-xl text-[var(--text-primary)] font-medium leading-relaxed mb-8">
                        Bhawuk Arora is an AI & Data Science student exploring the intersection of DevOps, MLOps, and distributed systems.
                    </p>

                    <p>
                        Currently working on infrastructure and application modernization, Bhawuk enjoys breaking down complex systems to understand how they really work. He focuses on creating scalable, resilient pipelines that reduce friction between development and operations.
                    </p>

                    <p>
                        His interests include cloud infrastructure, machine learning systems, automation, and the philosophy of building reliable systems. The goal isn't just to write code that works, but to architect systems that are maintainable, observable, and built to scale effortlessly under pressure.
                    </p>

                    <p>
                        When not diving into documentation or debugging a Kubernetes cluster, he is exploring new paradigms in distributed architecture or refining automated experiment tracking with MLflow and Databricks.
                    </p>

                    <h2 className="mt-12 mb-6">Contact</h2>

                    <p>
                        Want to chat about MLOps, system design, or cloud infrastructure? Feel free to reach out.
                    </p>

                    <ul className="list-none pl-0 space-y-2 mt-4 text-sm font-mono">
                        <li className="flex items-center gap-2">
                            <span className="text-[var(--text-muted)] w-20">Email:</span>
                            <a href="mailto:hello@example.com" className="text-[var(--accent-blue)] hover:text-white transition-colors">hello@bhawuk.dev</a>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-[var(--text-muted)] w-20">GitHub:</span>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-blue)] hover:text-white transition-colors">github.com/bhawuk</a>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-[var(--text-muted)] w-20">LinkedIn:</span>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-blue)] hover:text-white transition-colors">linkedin.com/in/bhawukarora</a>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-[var(--text-muted)] w-20">Twitter:</span>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-blue)] hover:text-white transition-colors">@bhawukarora</a>
                        </li>
                    </ul>
                </div>

            </div>
        </main>
    );
}
