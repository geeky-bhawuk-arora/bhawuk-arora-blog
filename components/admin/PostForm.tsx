'use client';

import { useState, useEffect } from 'react';
import { generateSlug } from '@/lib/utils';
import { Post } from '@/lib/data';

interface PostFormProps {
    initialData?: Partial<Post> & { id?: string };
    action: (formData: FormData) => Promise<void>;
    submitLabel: string;
}

export default function PostForm({ initialData, action, submitLabel }: PostFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [isAutoSlug, setIsAutoSlug] = useState(!initialData?.slug);

    useEffect(() => {
        if (isAutoSlug && title) {
            // We don't want to generate a NEW random hash on every keystroke
            // if we are editing. But for a NEW post, maybe we do until they stop typing?
            // Actually, better to just generate once when they blur or provide a button.
        }
    }, [title, isAutoSlug]);

    const handleGenerateSlug = () => {
        setSlug(generateSlug(title));
        setIsAutoSlug(false);
    };

    return (
        <form action={action} className="flex flex-col gap-6 bg-[var(--bg-card)] border border-[var(--border)] p-6 md:p-8 rounded-xl">
            {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm font-medium text-[var(--text-secondary)]">Post Title</label>
                    <input
                        required
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Understanding Kubernetes Services"
                        className="px-4 py-2.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="slug" className="text-sm font-medium text-[var(--text-secondary)]">URL Slug</label>
                    <div className="flex gap-2">
                        <input
                            required
                            type="text"
                            name="slug"
                            id="slug"
                            value={slug}
                            onChange={(e) => {
                                setSlug(e.target.value);
                                setIsAutoSlug(false);
                            }}
                            placeholder="e.g. understanding-kubernetes-services"
                            className="flex-1 px-4 py-2.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)]"
                        />
                        <button
                            type="button"
                            onClick={handleGenerateSlug}
                            className="px-3 py-2 bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white rounded text-xs transition-colors"
                        >
                            Generate
                        </button>
                    </div>
                    <p className="text-[10px] text-[var(--text-muted)] italic">A unique identifier for the URL. Use 'Generate' for a secure, random-hashed slug.</p>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-medium text-[var(--text-secondary)]">Short Description</label>
                <textarea
                    required
                    name="description"
                    id="description"
                    rows={2}
                    defaultValue={initialData?.description}
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
                        defaultValue={initialData?.category || "Kubernetes"}
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
                        defaultValue={initialData?.tags?.join(', ')}
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
                        defaultValue={initialData?.emoji || "📝"}
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
                    defaultValue={initialData?.content}
                    className="px-4 py-3 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] font-mono text-sm leading-relaxed"
                    placeholder="## Your Markdown Here..."
                ></textarea>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex justify-end">
                <button
                    type="submit"
                    className="px-8 py-3 bg-[var(--accent-blue)] hover:bg-blue-600 transition-all rounded-lg text-white font-bold shadow-lg shadow-blue-500/20 active:scale-95"
                >
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}
