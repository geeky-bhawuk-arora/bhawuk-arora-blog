import type { Metadata } from 'next';
import Link from 'next/link';
import { Github, ExternalLink, ArrowLeft, Terminal, Cpu, Database, Cloud, ArrowRight } from 'lucide-react';
import { projects } from '@/lib/data';
import AnimatedSection from '@/components/AnimatedSection';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'A selection of engineering projects focused on MLOps, DevOps, and Scalable Infrastructure.',
};

export default function ProjectsPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 w-full flex flex-col items-center">
            <div className="w-full max-w-5xl mx-auto px-6 md:px-8">

                {/* Header Section */}
                <AnimatedSection>
                    <div className="mb-20">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold font-mono text-[var(--accent-blue)] hover:text-white transition-all mb-12 group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Return to Terminal
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="p-3 rounded-xl bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 shadow-lg shadow-blue-500/10">
                                <Terminal size={24} />
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] font-['Space_Grotesk'] tracking-tight">
                                Systems & Tools
                            </h1>
                        </div>
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed">
                            A focused look at the infrastructure, pipelines, and engineering solutions I've architected for various production environments.
                        </p>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projects.map((project, i) => (
                        <AnimatedSection key={project.title} delay={i * 100}>
                            <div className="group relative flex flex-col p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent-blue)]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 h-full overflow-hidden">
                                {/* Accent Glow */}
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/5 blur-[100px] group-hover:bg-blue-500/10 transition-all duration-700" />

                                <div className="flex justify-between items-start mb-6 gap-4">
                                    <div className="space-y-3">
                                        {project.featured && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
                                                Featured
                                            </span>
                                        )}
                                        <h2 className="text-2xl font-bold text-[var(--text-primary)] font-['Space_Grotesk'] group-hover:text-[var(--accent-blue)] transition-colors leading-tight">
                                            {project.title}
                                        </h2>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-[var(--text-muted)] transition-all shadow-sm" title="View Source">
                                                <Github size={18} />
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-[var(--text-muted)] transition-all shadow-sm" title="Live Demo">
                                                <ExternalLink size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mb-10 flex-1">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-[var(--border)]">
                                    {project.tech.map(t => (
                                        <span key={t} className="px-3 py-1 rounded-lg text-xs font-mono bg-[var(--bg)] text-[var(--text-muted)] border border-[var(--border)] group-hover:border-[var(--accent-blue)]/20 transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Bottom CTA */}
                <AnimatedSection delay={400}>
                    <div className="mt-28 p-12 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg)] border border-[var(--border)] text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/5 blur-[100px] group-hover:opacity-100 transition-opacity" />

                        <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6 font-['Space_Grotesk'] tracking-tight">Need a custom foundation?</h3>
                        <p className="text-lg text-[var(--text-secondary)] mb-12 max-w-xl mx-auto leading-relaxed">
                            I'm available for consultations on <strong>MLOps architecture</strong>, <strong>cloud migrations</strong>, and <strong>infrastructure automation</strong>.
                        </p>
                        <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-black font-bold hover:scale-[1.03] active:scale-[0.97] transition-all shadow-xl shadow-white/5">
                            Get in Touch <ArrowRight size={20} />
                        </Link>
                    </div>
                </AnimatedSection>

            </div>
        </main>
    );
}
