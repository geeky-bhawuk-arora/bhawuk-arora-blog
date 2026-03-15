import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, ExternalLink, Terminal, Calendar, MapPin, GraduationCap, Award, Heart } from "lucide-react";
import { Post, projects } from "@/lib/data";
import { workExperience, education, certifications } from "@/lib/experience";
import { formatDate } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Bhawuk Arora — MLOps Engineer",
  description: "I build scalable ML infrastructure, cloud systems, and automation pipelines.",
};



const STACK = ["Docker", "Kubernetes", "Terraform", "Python", "MLflow", "Databricks", "Git", "Linux", "AWS", "Bash", "CI/CD"];

function MiniPostRow({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-4 border-b border-[var(--border)] hover:border-[var(--text-muted)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg -mx-4 px-4"
    >
      <div className="flex-1">
        <h3 className="text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors font-['Space_Grotesk'] leading-tight mb-1">
          {post.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-1 mb-2 sm:mb-0 max-w-2xl">
          {post.description}
        </p>
      </div>
      <div className="flex items-center gap-3 sm:ml-6 shrink-0 font-mono text-xs text-[var(--text-muted)]">
        <span className="hidden sm:inline-flex">{post.readingTime}m read</span>
        <span className="hidden sm:inline-flex text-[var(--border)]">•</span>
        <span>{formatDate(post.publishedAt)}</span>
      </div>
    </Link>
  );
}

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
      <div className="w-full max-w-4xl mx-auto px-6 md:px-8">

        {/* HERO SECTION */}
        <section className="mb-24 mt-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)]">
              <Terminal size={16} />
            </span>
            <span className="text-sm font-mono text-[var(--text-secondary)]">Status: Exploring distributed systems.</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5 text-[var(--text-primary)] leading-[1.1]">
            Bhawuk Arora
          </h1>
          <h2 className="text-xl sm:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6 font-['Space_Grotesk'] tracking-tight">
            DevOps & MLOps Engineer
          </h2>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-10">
            I enjoy understanding how complex systems work — from cloud infrastructure to machine learning pipelines. This space is where I document what I build, what I learn, and the systems thinking behind it.
          </p>

          <div className="flex flex-wrap items-center gap-4 font-mono text-sm">
            <Link href="/projects" className="px-5 py-2.5 rounded text-[var(--bg)] bg-[var(--text-primary)] hover:bg-[var(--text-secondary)] transition-colors font-semibold">
              View Projects
            </Link>
            <Link href="/blog" className="px-5 py-2.5 rounded text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border)] hover:bg-[var(--border)] transition-colors">
              Read Blog
            </Link>
            <a href="https://github.com/geeky-bhawuk-arora" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-4 decoration-[var(--border)] hover:decoration-white">
              GitHub
            </a>
            <a href="https://linkedin.com/in/bhawuk-arora" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-4 decoration-[var(--border)] hover:decoration-white">
              LinkedIn
            </a>
          </div>
        </section>

        {/* FEATURED POST */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-6 border-b border-[var(--border)] pb-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--text-primary)]">Engineering Notes</h2>
          </div>

          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group block outline-none">
              <article className="p-6 sm:p-8 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-blue-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4 font-mono text-xs text-[var(--text-muted)] uppercase">
                  <span className="text-blue-400 font-semibold border border-blue-400/30 bg-blue-400/10 px-2 py-0.5 rounded">{featured.category}</span>
                  <span>{formatDate(featured.publishedAt)}</span>
                  <span>{featured.readingTime}m read</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] group-hover:text-blue-400 transition-colors mb-3 font-['Space_Grotesk'] leading-tight">
                  {featured.title}
                </h3>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6 max-w-3xl text-sm sm:text-base">
                  {featured.description}
                </p>

                <div className="flex items-center gap-2 font-mono text-sm text-blue-400 group-hover:gap-3 transition-all font-semibold">
                  Read Note <ArrowRight size={16} />
                </div>
              </article>
            </Link>
          )}
        </section>

        {/* RECENT POSTS */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-4 border-b border-[var(--border)] pb-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--text-primary)]">Recent Notes</h2>
            <Link href="/blog" className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors">
              View all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="flex flex-col">
            {recentPosts.map(post => <MiniPostRow key={post.slug} post={post} />)}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-6 border-b border-[var(--border)] pb-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--text-primary)]">Engineering Work</h2>
            <Link href="/projects" className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors">
              All projects <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(proj => (
              <div key={proj.title} className="flex flex-col p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-muted)] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] font-['Space_Grotesk'] leading-tight">
                    {proj.title}
                  </h3>
                  <div className="flex gap-2 text-[var(--text-muted)]">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github size={18} /></a>
                    )}
                    {proj.demo && (
                      <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><ExternalLink size={18} /></a>
                    )}
                  </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] mb-6 flex-1 leading-relaxed">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.tech.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROFESSIONAL JOURNEY */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-24">
          <section className="md:col-span-3">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-8 border-b border-[var(--border)] pb-2">
                <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--text-primary)]">Professional Journey</h2>
              </div>
            </AnimatedSection>

            <div className="space-y-12 relative border-l border-[var(--border)] ml-3">
              {workExperience.map((job, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="relative pl-10">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-4 border-[var(--bg)] shadow-[0_0_15px_rgba(59,130,246,0.5)]" />

                    <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 rounded-2xl transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:-translate-y-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xl font-bold text-[var(--text-primary)] font-['Space_Grotesk']">{job.title}</h3>
                        <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-400/20">{job.duration}</span>
                      </div>
                      <p className="text-blue-400 font-semibold text-sm mb-3">{job.company}</p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)] mb-4">
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {job.period}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                      </div>

                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{job.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {job.highlights.map((h, i) => (
                          <span key={i} className="px-2 py-1 rounded-lg text-[10px] font-mono bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* EDUCATION */}
            <AnimatedSection delay={200}>
              <div className="flex items-center gap-3 mb-8 border-b border-[var(--border)] pb-2 mt-20">
                <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--text-primary)]">Education</h2>
              </div>
            </AnimatedSection>

            <div className="space-y-8 relative border-l border-[var(--border)] ml-3">
              {education.map((edu, index) => (
                <AnimatedSection key={index} delay={index * 120}>
                  <div className="relative pl-10">
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 border-4 border-[var(--bg)] shadow-[0_0_15px_rgba(168,85,247,0.5)]" />

                    <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 rounded-2xl transition-all duration-300 hover:border-purple-500/30 hover:shadow-xl hover:-translate-y-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shrink-0">
                          <GraduationCap size={22} className="text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-[var(--text-primary)] font-['Space_Grotesk']">{edu.degree}</h4>
                          <p className="text-sm text-purple-400">{edu.field}</p>
                          <p className="text-xs text-[var(--text-muted)] mt-1">{edu.institution}</p>
                          <div className="text-[10px] font-mono text-[var(--text-muted)] mt-3">
                            {edu.period} • <span className="text-green-400">{edu.grade}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>

          {/* ASIDE: TECH STACK & CERTIFICATIONS */}
          <aside className="md:col-span-2 space-y-20">
            {/* TECH STACK */}
            <section>
              <AnimatedSection>
                <div className="flex items-center gap-3 mb-8 border-b border-[var(--border)] pb-2">
                  <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--text-primary)]">Tech Stack</h2>
                </div>
              </AnimatedSection>
              <div className="flex flex-wrap gap-2">
                {STACK.map(tech => (
                  <span key={tech} className="px-3 py-1.5 rounded-md text-xs font-mono bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border)]">
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* CERTIFICATIONS */}
            <section>
              <AnimatedSection delay={300}>
                <div className="flex items-center gap-3 mb-8 border-b border-[var(--border)] pb-2">
                  <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--text-primary)]">Certifications</h2>
                </div>
              </AnimatedSection>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <AnimatedSection key={index} delay={index * 120}>
                    <div className="bg-[var(--bg-card)] border border-[var(--border)] p-4 rounded-xl flex items-center gap-4 transition-all duration-300 hover:border-blue-400/40 hover:shadow-lg hover:-translate-x-1">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                        <Award size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--text-primary)] leading-tight font-['Space_Grotesk']">{cert.name}</p>
                        <p className="text-[10px] font-mono text-[var(--text-muted)] mt-1 uppercase tracking-tighter">{cert.issuer}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </section>

            {/* CURRENT STATUS */}
            <section>
              <AnimatedSection>
                <div className="flex items-center gap-3 mb-6 border-b border-[var(--border)] pb-2">
                  <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--text-primary)]">Now</h2>
                </div>
              </AnimatedSection>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic border-l-2 border-blue-500 pl-4">
                Currently building LLM eval pipelines with LangChain and optimizing Kubernetes clusters for low-latency ML inferencing.
              </p>
            </section>
          </aside>
        </div>

      </div>
    </main>
  );
}
