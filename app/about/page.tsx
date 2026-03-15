import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About — Bhawuk Arora",
    description: "Bhawuk Arora is an AI & Data Science student exploring the intersection of DevOps, MLOps, and distributed systems.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 w-full flex flex-col items-center">
            <div className="w-full max-w-3xl mx-auto px-6 md:px-8">

                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 text-[var(--text-primary)] font-['Space_Grotesk'] leading-[0.9]">
                    The / <br />
                    <span className="text-[var(--accent-blue)]">Architect.</span>
                </h1>

                <div className="article-body">
                    <p className="text-xl text-[var(--text-primary)] font-medium leading-relaxed mb-8 border-l-2 border-[var(--border)] pl-6">
                        Bhawuk Arora is an engineering specialist focused on the intersection of DevOps, MLOps, and distributed systems.
                    </p>

                    <p>
                        Currently specializing in infrastructure and application modernization, I focus on breaking down complex systems to understand their core mechanics. My goal is to orchestrate scalable, resilient pipelines that eliminate friction between development cycles and production operations.
                    </p>

                    <p>
                        My technical interests include cloud-native infrastructure, machine learning lifecycle automation (MLOps), and the philosophy of building reliable systems. I believe that engineering isn't just about code that "works"—it's about architecting systems that are maintainable, observable, and built to scale effortlessly.
                    </p>

                    <p>
                        When I'm not debugging Kubernetes clusters or refining automated experiments with MLflow and Databricks, I'm usually exploring new paradigms in distributed architecture or contributing to the technical community.
                    </p>

                    <h2 className="mt-16 mb-8 text-2xl font-bold font-['Space_Grotesk'] text-[var(--text-primary)]">Operational Channels</h2>

                    <div className="space-y-4 font-mono text-sm">
                        <div className="flex items-center gap-4 group/item">
                            <span className="text-[var(--text-muted)] w-24 uppercase font-bold tracking-widest text-[10px]">Email</span>
                            <a href="mailto:bhawuk.arora008@gmail.com" className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors">bhawuk.arora008@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-4 group/item">
                            <span className="text-[var(--text-muted)] w-24 uppercase font-bold tracking-widest text-[10px]">GitHub</span>
                            <a href="https://github.com/geeky-bhawuk-arora" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors">github.com/geeky-bhawuk-arora</a>
                        </div>
                        <div className="flex items-center gap-4 group/item">
                            <span className="text-[var(--text-muted)] w-24 uppercase font-bold tracking-widest text-[10px]">LinkedIn</span>
                            <a href="https://linkedin.com/in/bhawuk-arora" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors">linkedin.com/in/bhawuk-arora</a>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
