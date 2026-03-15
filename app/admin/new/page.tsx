import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createPost } from './actions';

export default function NewPostPage() {
    return (
        <div>
            <div className="mb-8">
                <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>
            </div>

            <h1 className="text-3xl font-bold font-['Space_Grotesk'] text-[var(--text-primary)] mb-8">Create New Post</h1>

            <form action={createPost} className="flex flex-col gap-6 bg-[var(--bg-card)] border border-[var(--border)] p-6 md:p-8 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm font-medium text-[var(--text-secondary)]">Post Title</label>
                        <input
                            required
                            type="text"
                            name="title"
                            id="title"
                            placeholder="e.g. Understanding Kubernetes Services"
                            className="px-4 py-2.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="slug" className="text-sm font-medium text-[var(--text-secondary)]">URL Slug</label>
                        <input
                            required
                            type="text"
                            name="slug"
                            id="slug"
                            placeholder="e.g. understanding-kubernetes-services"
                            className="px-4 py-2.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)]"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="text-sm font-medium text-[var(--text-secondary)]">Short Description</label>
                    <textarea
                        required
                        name="description"
                        id="description"
                        rows={2}
                        placeholder="A brief summary of the post..."
                        className="px-4 py-2.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] resize-none"
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category" className="text-sm font-medium text-[var(--text-secondary)]">Category</label>
                        <select
                            name="category"
                            id="category"
                            className="px-4 py-2.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] appearance-none"
                        >
                            <option value="Kubernetes">Kubernetes</option>
                            <option value="Terraform">Terraform</option>
                            <option value="CI/CD">CI/CD</option>
                            <option value="MLOps pipelines">MLOps pipelines</option>
                            <option value="Databricks">Databricks</option>
                            <option value="System design">System design</option>
                            <option value="Docker">Docker</option>
                            <option value="MLflow">MLflow</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="tags" className="text-sm font-medium text-[var(--text-secondary)]">Tags (comma separated)</label>
                        <input
                            type="text"
                            name="tags"
                            id="tags"
                            placeholder="e.g. AWS, Infrastructure, Guide"
                            className="px-4 py-2.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="emoji" className="text-sm font-medium text-[var(--text-secondary)]">Emoji</label>
                        <input
                            type="text"
                            name="emoji"
                            id="emoji"
                            defaultValue="📝"
                            className="px-4 py-2.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)]"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="content" className="text-sm font-medium text-[var(--text-secondary)]">Content (Markdown)</label>
                    <textarea
                        required
                        name="content"
                        id="content"
                        rows={15}
                        className="px-4 py-3 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] font-mono text-sm leading-relaxed"
                        placeholder="## Your Markdown Here..."
                    ></textarea>
                </div>

                <div className="pt-4 border-t border-[var(--border)] flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-[var(--accent-blue)] hover:bg-blue-600 transition-colors rounded text-white font-bold"
                    >
                        Publish Post
                    </button>
                </div>
            </form>

        </div>
    );
}
