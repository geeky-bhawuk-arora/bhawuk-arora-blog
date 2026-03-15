import type { Metadata } from 'next';
import Link from 'next/link';
import { Github, ExternalLink, ArrowLeft, Terminal, Cpu, Database, Cloud } from 'lucide-react';
import { projects } from '@/lib/data';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'A selection of engineering projects focused on MLOps, DevOps, and Scalable Infrastructure.',
};

export default function ProjectsPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 w-full flex flex-col items-center">
            <div className="w-full max-w-5xl mx-auto px-6 md:px-8">

                {/* Header Section */}
                <div className="mb-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors mb-8">
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-400/20">
                            <Terminal size={20} />
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] font-['Space_Grotesk'] tracking-tight">
                            Engineering Work
                        </h1>
                    </div>
                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                        A collection of systems I've architected — from production-grade Kubernetes clusters to automated evaluation pipelines for LLMs.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project, i) => (
                        <div key={project.title} className="group relative flex flex-col p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-blue-500/30 transition-all duration-500 shadow-xl overflow-hidden">
                            {/* Accent Glow */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-colors" />

                            <div className="flex justify-between items-start mb-6">
                                <div className="space-y-4">
                                    {project.featured && (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold tracking-widest uppercase">
                                            Featured Project
                                        </span>
                                    )}
                                    <h2 className="text-2xl font-bold text-[var(--text-primary)] font-['Space_Grotesk'] group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h2>
                                </div>
                                <div className="flex gap-3">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-[var(--text-muted)] transition-all" title="View Source">
                                            <Github size={20} />
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-[var(--text-muted)] transition-all" title="Live Demo">
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <p className="text-[var(--text-secondary)] leading-relaxed mb-8 flex-1">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-[var(--border)]">
                                {project.tech.map(t => (
                                    <span key={t} className="px-3 py-1 rounded-lg text-xs font-mono bg-[var(--bg)] text-[var(--text-muted)] border border-[var(--border)] group-hover:border-[var(--text-muted)]/50 transition-colors">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-24 p-12 rounded-[2.5rem] bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg)] border border-[var(--border)] text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-blue-500/50 to-transparent" />
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 font-['Space_Grotesk']">Interested in collaborating?</h3>
                    <p className="text-[var(--text-secondary)] mb-10 max-w-lg mx-auto leading-relaxed">
                        I'm currently looking for new opportunities to build and scale data infrastructure. Let's talk about <strong>distributed systems</strong> or <strong>MLOps</strong>.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-all">
                        Get in Touch
                    </Link>
                </div>

            </div>
        </main>
    );
}
