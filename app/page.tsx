import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, ExternalLink, Calendar, Clock, Terminal } from "lucide-react";
import { posts, Post } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bhawuk Arora — DevOps & MLOps Engineer",
  description: "I build scalable ML infrastructure, cloud systems, and automation pipelines.",
};

const PROJECTS = [
  {
    title: "Kubernetes Cluster Autoscaler",
    description: "Built a highly available ML inferencing cluster that dynamically scales GPU nodes based on real-time traffic queues, reducing cloud costs by 45%.",
    tech: ["Kubernetes", "Terraform", "AWS EKS", "Go"],
    github: "https://github.com/bhawuk/k8s-autoscaler",
    demo: null,
  },
  {
    title: "RAG Evaluation Pipeline",
    description: "Automated MLOps pipeline for continuously testing and validating RAG application accuracy against golden datasets using MLflow and LangChain.",
    tech: ["Python", "MLflow", "LangChain", "Docker"],
    github: "https://github.com/bhawuk/rag-eval",
    demo: "https://demo.example.com",
  },
  {
    title: "Terraform Module Registry",
    description: "Internal self-service platform for developers to provision standardized, pre-approved AWS resources through an internal API.",
    tech: ["Terraform", "FastAPI", "AWS", "GitHub Actions"],
    github: "https://github.com/bhawuk/tf-registry",
    demo: null,
  }
];

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

export default function HomePage() {
  const featured = posts.find(p => p.featured) || posts[0];
  const recentPosts = posts.filter(p => !p.featured).slice(0, 4);

  return (
    <main className="min-h-screen pt-32 pb-24 w-full flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto px-6 md:px-8">

        {/* HERO SECTION */}
        <section className="mb-24 mt-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)]">
              <Terminal size={16} />
            </span>
            <span className="text-sm font-mono text-[var(--text-secondary)]">Status: Online</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5 text-[var(--text-primary)] leading-[1.1]">
            Bhawuk Arora
          </h1>
          <h2 className="text-xl sm:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6 font-['Space_Grotesk'] tracking-tight">
            DevOps & MLOps Engineer
          </h2>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-10">
            I build scalable ML infrastructure, cloud systems, and automation pipelines. Passionate about distributed systems and developer experience.
          </p>

          <div className="flex flex-wrap items-center gap-4 font-mono text-sm">
            <Link href="/projects" className="px-5 py-2.5 rounded text-white bg-blue-600 hover:bg-blue-700 transition-colors font-semibold">
              View Projects
            </Link>
            <Link href="/blog" className="px-5 py-2.5 rounded text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border)] hover:bg-[var(--border)] transition-colors">
              Read Blog
            </Link>
            <Link href="/contact" className="px-5 py-2.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-4 decoration-[var(--border)] hover:decoration-white">
              Contact
            </Link>
          </div>
        </section>

        {/* FEATURED POST */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-6 border-b border-[var(--border)] pb-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--text-primary)]">Featured Writing</h2>
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
                  Read Article <ArrowRight size={16} />
                </div>
              </article>
            </Link>
          )}
        </section>

        {/* PROJECTS SECTION */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-6 border-b border-[var(--border)] pb-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--text-primary)]">Selected Work</h2>
            <Link href="/projects" className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors">
              All projects <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map(proj => (
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

        {/* RECENT POSTS */}
        <section>
          <div className="flex items-center justify-between mb-4 border-b border-[var(--border)] pb-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--text-primary)]">Recent Posts</h2>
            <Link href="/blog" className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors">
              View all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="flex flex-col">
            {recentPosts.map(post => <MiniPostRow key={post.slug} post={post} />)}
          </div>
        </section>

      </div>
    </main>
  );
}
