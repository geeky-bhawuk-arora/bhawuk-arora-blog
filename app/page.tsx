import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, ExternalLink, Terminal, Calendar, MapPin, GraduationCap, Award, Heart } from "lucide-react";
import { Post, projects } from "@/lib/data";
import { workExperience, education, certifications } from "@/lib/experience";
import { formatDate } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import AnimatedSection from "@/components/AnimatedSection";
import HeroHandshake from "@/components/HeroHandshake";

export const metadata: Metadata = {
  title: "Bhawuk Arora — MLOps Engineer",
  description: "I build scalable ML infrastructure, cloud systems, and automation pipelines.",
};

const STACK = ["Docker", "Kubernetes", "Terraform", "Python", "MLflow", "Databricks", "Git", "Linux", "AWS", "Bash", "CI/CD"];


export default async function HomePage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("published_at", { ascending: false });

  const mapPost = (p: any): Post => ({
    ...p,
    readingTime: p.reading_time || 5,
    publishedAt: p.published_at,
    patternType: p.pattern_type || 'dots',
    accentColor: p.accent_color || '#6366f1',
    authorBio: p.author_bio || ''
  });

  const typedPosts = (posts || []).map(mapPost);
  const featured = typedPosts.find(p => p.featured) || typedPosts[0];
  const recentPosts = typedPosts.filter(p => p.slug !== featured?.slug).slice(0, 4);

  return (
    <main className="min-h-screen pt-32 pb-24 w-full flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-8">

        <section className="mb-32 mt-12">

          <div className="max-w-4xl">
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-6 text-[var(--text-primary)] leading-[0.85]">
              Bhawuk <span className="text-[var(--accent-blue)]">Arora.</span>
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 text-[var(--text-secondary)]">
              Thinking in systems. <br className="hidden md:block" /> Building for scale.
            </h2>

            <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl mb-12 font-medium">
              I bridge the gap between experimental machine learning and enterprise-grade production. Specializing in <span className="text-[var(--text-primary)]">MLOps</span>, <span className="text-[var(--text-primary)]">Cloud Architecture</span>, and <span className="text-[var(--text-primary)]">Reliability Engineering</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 mb-24">
            <Link href="/projects" className="px-8 py-4 rounded-xl text-white bg-[var(--accent-blue)] hover:bg-blue-700 transition-all font-bold shadow-xl shadow-blue-500/10 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
              View Systems <ArrowRight size={18} />
            </Link>
            <a
              href="https://res.cloudinary.com/bhawuk-prod/image/upload/v1759812546/bhawuk-portfolio-react/bhawuk_resume.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl text-[var(--accent-blue)] bg-[var(--accent-blue)]/5 border border-[var(--accent-blue)]/20 hover:border-[var(--accent-blue)] transition-all font-bold hover:scale-[1.02] active:scale-[0.98]"
            >
              View Resume
            </a>
            <Link href="/blog" className="px-8 py-4 rounded-xl text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[var(--text-muted)] transition-all font-bold hover:scale-[1.02] active:scale-[0.98]">
              Read Engineering Notes
            </Link>
          </div>


          <AnimatedSection>
            <HeroHandshake />
          </AnimatedSection>
        </section>

        {/* FEATURED POST */}
        {/* LATEST ARTICLES */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8 border-b border-[var(--border)] pb-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--accent-blue)]">Latest Engineering Thinking</h2>
            <Link href="/blog" className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors group">
              View archives <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {typedPosts.slice(0, 4).map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 100}>
                <Link href={`/blog/${post.slug}`} className="group block h-full outline-none">
                  <article className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent-blue)]/50 transition-all duration-300 relative overflow-hidden h-full flex flex-col hover:shadow-2xl hover:shadow-blue-500/5">
                    {/* Technical Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center gap-3 mb-6 font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                      <span className="text-[var(--accent-blue)] font-bold border border-[var(--accent-blue)]/30 bg-[var(--accent-blue)]/10 px-2.5 py-1 rounded-md">{post.category}</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors mb-4 tracking-tight leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8 line-clamp-3">
                      {post.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-blue)] font-bold">
                        Read System Note <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-tighter">{post.readingTime}m session</span>
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </section>


        {/* PROJECTS SECTION */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8 border-b border-[var(--border)] pb-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--accent-blue)]">Engineering Work</h2>
            <Link href="/projects" className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors group">
              Full portfolio <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(0, 4).map(proj => (
              <div key={proj.title} className="flex flex-col p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent-blue)]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent-blue)] transition-colors">
                    {proj.title}
                  </h3>
                  <div className="flex gap-3 text-[var(--text-muted)] shrink-0">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)]"><Github size={18} /></a>
                    )}
                    {proj.demo && (
                      <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)]"><ExternalLink size={18} /></a>
                    )}
                  </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] mb-10 flex-1 leading-relaxed">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.tech.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-[var(--bg)] text-[var(--text-muted)] border border-[var(--border)] group-hover:border-[var(--accent-blue)]/20 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROFESSIONAL JOURNEY & EDUCATION GRID */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Experience Column */}
            <div className="space-y-12">
              <AnimatedSection>
                <div className="flex items-center gap-3 mb-8 border-b border-[var(--border)] pb-2">
                  <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--accent-blue)]">Professional Journey</h2>
                </div>
              </AnimatedSection>

              <div className="space-y-6">
                {workExperience.map((job, index) => (
                  <AnimatedSection key={index} delay={index * 100}>
                    <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 rounded-2xl transition-all duration-300 hover:border-[var(--accent-blue)]/30 hover:shadow-lg relative group overflow-hidden">
                      <div className="mb-4">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="text-xl font-bold text-[var(--text-primary)] leading-tight">{job.title}</h3>
                          {job.period.toLowerCase().includes('present') && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold font-mono text-[9px] tracking-widest uppercase shrink-0">Current</span>
                          )}
                        </div>
                        <p className="text-[var(--accent-blue)] font-bold text-sm tracking-wide">{job.company}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-[10px] text-[var(--text-muted)] mb-4 font-mono uppercase tracking-wider">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {job.period}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={12} /> {job.location}</span>
                      </div>

                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">{job.description}</p>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
                        {job.highlights.map((h, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-muted)]">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Education & Certs Column */}
            <div className="space-y-16">
              {/* Education Section */}
              <div className="space-y-12">
                <AnimatedSection>
                  <div className="flex items-center gap-3 mb-8 border-b border-[var(--border)] pb-2">
                    <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--accent-purple)]">Academic Foundation</h2>
                  </div>
                </AnimatedSection>

                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <AnimatedSection key={index} delay={index * 120}>
                      <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 rounded-2xl transition-all duration-300 hover:border-[var(--accent-purple)]/30 hover:shadow-lg group">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                          <div className="w-12 h-12 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center shrink-0 group-hover:border-[var(--accent-purple)] transition-colors duration-300">
                            <GraduationCap size={24} className="text-[var(--accent-purple)]" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                              <h4 className="text-xl font-bold text-[var(--text-primary)] leading-tight">{edu.degree}</h4>
                              <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-bold font-mono text-[10px] tracking-widest uppercase">{edu.grade}</span>
                            </div>
                            <p className="text-sm text-[var(--accent-purple)] font-semibold mb-2">{edu.field}</p>
                            <p className="text-xs text-[var(--text-muted)] mb-4">{edu.institution} • {edu.location}</p>

                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed border-l-2 border-purple-500/20 pl-4 py-1 italic">
                              {edu.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>

              {/* Certifications Section */}
              <div className="space-y-12">
                <AnimatedSection>
                  <div className="flex items-center gap-3 mb-8 border-b border-[var(--border)] pb-2">
                    <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--accent-blue)]">Certifications</h2>
                  </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {certifications.map((cert, index) => (
                    <AnimatedSection key={index} delay={index * 120}>
                      <div className="bg-[var(--bg-card)] border border-[var(--border)] p-5 rounded-2xl flex items-center gap-5 transition-all duration-300 hover:border-[var(--accent-blue)]/40 hover:shadow-xl group relative overflow-hidden">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform duration-300">
                          <Award size={22} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent-blue)] transition-colors mb-1">{cert.name}</p>
                          <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.2em] font-bold">{cert.issuer}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </div >
    </main >
  );
}
