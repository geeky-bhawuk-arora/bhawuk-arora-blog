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
        <span className="hidden sm:inline-flex group-hover:text-[var(--text-primary)] transition-colors">{post.readingTime}m read</span>
        <span className="hidden sm:inline-flex text-[var(--border)] group-hover:text-[var(--text-muted)] transition-colors">•</span>
        <span className="group-hover:text-[var(--text-primary)] transition-colors">{formatDate(post.publishedAt)}</span>
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
      <div className="w-full max-w-5xl mx-auto px-6 md:px-8">

        {/* HERO SECTION */}
        <section className="mb-24 mt-8">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 text-[var(--accent-blue)]">
              <Terminal size={16} />
            </span>
            <span className="text-sm font-mono text-[var(--text-secondary)] tracking-tight">Status: Architecting production MLOps</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 text-[var(--text-primary)] leading-[1.05] font-['Space_Grotesk']">
            Bhawuk Arora
          </h1>
          <h2 className="text-2xl sm:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-8 font-['Space_Grotesk'] tracking-tight">
            DevOps & MLOps Engineer
          </h2>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-12">
            I build the data foundations and automation pipelines that power intelligent systems. Specialized in <span className="text-[var(--text-primary)] font-semibold">Kubernetes</span>, <span className="text-[var(--text-primary)] font-semibold">Terraform</span>, and <span className="text-[var(--text-primary)] font-semibold">Scalable Infrastructure</span>.
          </p>

          <div className="flex flex-wrap items-center gap-4 font-mono text-sm">
            <Link href="/projects" className="px-6 py-3 rounded-xl text-white bg-[var(--accent-blue)] hover:bg-blue-600 transition-all font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98]">
              View Projects
            </Link>
            <Link href="/blog" className="px-6 py-3 rounded-xl text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[var(--text-muted)] transition-all font-bold hover:scale-[1.02] active:scale-[0.98]">
              Read Blog
            </Link>
          </div>
        </section>

        {/* FEATURED POST */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8 border-b border-[var(--border)] pb-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--accent-blue)]">Featured Engineering Note</h2>
          </div>

          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group block outline-none">
              <article className="p-8 sm:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent-blue)]/50 transition-all duration-300 relative overflow-hidden group-hover:shadow-2xl group-hover:shadow-blue-500/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center gap-3 mb-6 font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                  <span className="text-[var(--accent-blue)] font-bold border border-[var(--accent-blue)]/30 bg-[var(--accent-blue)]/10 px-2.5 py-1 rounded-md">{featured.category}</span>
                  <span>{formatDate(featured.publishedAt)}</span>
                  <span>{featured.readingTime}m read</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors mb-4 font-['Space_Grotesk'] leading-tight tracking-tight">
                  {featured.title}
                </h3>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-3xl text-sm sm:text-base md:text-lg">
                  {featured.description}
                </p>

                <div className="flex items-center gap-2 font-mono text-sm text-[var(--accent-blue)] group-hover:gap-4 transition-all font-bold group-hover:translate-x-1">
                  Dive into System <ArrowRight size={20} />
                </div>
              </article>
            </Link>
          )}
        </section>

        {/* RECENT POSTS */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8 border-b border-[var(--border)] pb-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--accent-blue)]">Latest Thinking</h2>
            <Link href="/blog" className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors group">
              View archives <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {recentPosts.map(post => <MiniPostRow key={post.slug} post={post} />)}
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
                  <h3 className="text-xl font-bold text-[var(--text-primary)] font-['Space_Grotesk'] leading-tight group-hover:text-[var(--accent-blue)] transition-colors">
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

        {/* PROFESSIONAL JOURNEY */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 mb-24">
          <section className="md:col-span-3">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-10 border-b border-[var(--border)] pb-2">
                <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--accent-blue)]">Professional Journey</h2>
              </div>
            </AnimatedSection>

            <div className="space-y-12 relative border-l border-[var(--border)] ml-3">
              {workExperience.map((job, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="relative pl-10">
                    <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-4 border-[var(--bg)] shadow-[0_0_15px_rgba(59,130,246,0.3)]" />

                    <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 rounded-2xl transition-all duration-300 hover:border-[var(--accent-blue)]/30 hover:shadow-xl hover:-translate-y-1 relative group overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="mb-2">
                        <h3 className="text-xl font-bold text-[var(--text-primary)] font-['Space_Grotesk'] leading-tight">{job.title}</h3>
                        <p className="text-[var(--accent-blue)] font-bold text-sm tracking-wide">{job.company}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-5 text-[11px] text-[var(--text-muted)] mb-5 font-mono">
                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[var(--accent-blue)]/50" /> {job.period}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[var(--accent-blue)]/50" /> {job.location}</span>
                      </div>

                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">{job.description}</p>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
                        {job.highlights.map((h, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-muted)] group-hover:border-[var(--accent-blue)]/20 transition-colors">
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
              <div className="flex items-center gap-3 mb-10 border-b border-[var(--border)] pb-2 mt-24">
                <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--accent-purple)]">Education</h2>
              </div>
            </AnimatedSection>

            <div className="space-y-8 relative border-l border-[var(--border)] ml-3">
              {education.map((edu, index) => (
                <AnimatedSection key={index} delay={index * 120}>
                  <div className="relative pl-10">
                    <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 border-4 border-[var(--bg)] shadow-[0_0_15px_rgba(168,85,247,0.3)]" />

                    <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 rounded-2xl transition-all duration-300 hover:border-[var(--accent-purple)]/30 hover:shadow-xl hover:-translate-y-1 group">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/10 group-hover:scale-110 transition-transform duration-300">
                          <GraduationCap size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                            <h4 className="text-xl font-bold text-[var(--text-primary)] font-['Space_Grotesk'] leading-tight">{edu.degree}</h4>
                            <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-bold font-mono text-[10px] tracking-widest uppercase">{edu.grade}</span>
                          </div>
                          <p className="text-sm text-[var(--accent-purple)] font-semibold mb-2">{edu.field}</p>
                          <p className="text-xs text-[var(--text-muted)] font-medium mb-4">{edu.institution} • {edu.location}</p>

                          <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-muted)] px-3 py-1 rounded-lg bg-[var(--bg)] border border-[var(--border)] w-fit mb-4 font-bold">
                            <Calendar size={12} /> {edu.period}
                          </div>

                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed border-l-2 border-purple-500/20 pl-4 py-1 italic">
                            {edu.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>

          {/* ASIDE: TECH STACK & CERTIFICATIONS */}
          <aside className="md:col-span-2 space-y-24">
            {/* TECH STACK */}
            <section>
              <AnimatedSection>
                <div className="flex items-center gap-3 mb-8 border-b border-[var(--border)] pb-2">
                  <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--accent-blue)]">Core Stack</h2>
                </div>
              </AnimatedSection>
              <div className="flex flex-wrap gap-2.5">
                {STACK.map(tech => (
                  <span key={tech} className="px-3.5 py-2 rounded-xl text-xs font-mono bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text-primary)] hover:border-[var(--accent-blue)]/50 transition-all cursor-default translate-y-0 hover:-translate-y-1">
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* CERTIFICATIONS */}
            <section>
              <AnimatedSection delay={300}>
                <div className="flex items-center gap-3 mb-8 border-b border-[var(--border)] pb-2">
                  <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--accent-blue)]">Certifications</h2>
                </div>
              </AnimatedSection>
              <div className="grid gap-4">
                {certifications.map((cert, index) => (
                  <AnimatedSection key={index} delay={index * 120}>
                    <div className="bg-[var(--bg-card)] border border-[var(--border)] p-5 rounded-2xl flex items-center gap-5 transition-all duration-300 hover:border-[var(--accent-blue)]/40 hover:shadow-xl group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform duration-300">
                        <Award size={22} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--text-primary)] leading-tight font-['Space_Grotesk'] group-hover:text-[var(--accent-blue)] transition-colors mb-1">{cert.name}</p>
                        <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.2em] font-bold">{cert.issuer}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </section>

            {/* NOW / FOCUS */}
            <section>
              <AnimatedSection>
                <div className="flex items-center gap-3 mb-8 border-b border-[var(--border)] pb-2">
                  <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--accent-blue)]">Current Status</h2>
                </div>
              </AnimatedSection>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="relative z-10 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed italic border-l-4 border-[var(--accent-blue)] pl-5 py-2">
                  "Architecting scalable data infrastructure and bridging the gap between ML models and production-grade software."
                </p>
              </div>
            </section>
          </aside>
        </div>

      </div>
    </main>
  );
}
