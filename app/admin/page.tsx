import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { Plus, Edit2 } from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';
import ToggleButton from '@/components/admin/ToggleButton';
import FeaturedButton from '@/components/admin/FeaturedButton';

export default async function AdminDashboard() {
    const supabase = await createClient();
    const { data: posts, error } = await supabase
        .from('posts')
        .select('id, title, published_at, category, slug, enabled, featured')
        .order('published_at', { ascending: false });

    if (error) {
        console.error(error);
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--border)]">
                <h1 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-[var(--text-primary)]">Admin Dashboard</h1>
                <Link
                    href="/admin/new"
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[var(--accent-blue)] text-white rounded-lg font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95 shrink-0"
                >
                    <Plus size={18} /> New Post
                </Link>
            </div>

            <div className="grid gap-4 w-full overflow-hidden">
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] transition-all hover:border-[var(--accent-blue)]/50 hover:shadow-xl hover:shadow-blue-500/5 overflow-hidden ${post.enabled === false ? 'opacity-50' : ''}`}>
                            <div className="flex-1 min-w-0 mb-4 sm:mb-0 sm:mr-4">
                                <div className="flex items-center gap-3 mb-1 min-w-0">
                                    <h2 className="text-lg md:text-xl font-bold font-['Space_Grotesk'] text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent-blue)] transition-colors truncate min-w-0 flex-1">
                                        {post.title}
                                    </h2>
                                    <div className="flex gap-2 shrink-0">
                                        {post.enabled === false ? (
                                            <span className="px-2 py-0.5 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-400 font-bold text-[10px]">Draft</span>
                                        ) : (
                                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[10px]">Live</span>
                                        )}
                                        {post.featured && (
                                            <span className="px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold text-[10px]">★ Featured</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-[10px] md:text-xs font-mono text-[var(--text-muted)] mt-2">
                                    <span className="px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border)] shrink-0">{post.category}</span>
                                    <span className="shrink-0">{new Date(post.published_at).toLocaleDateString()}</span>
                                    <span className="hidden sm:inline opacity-30 shrink-0">|</span>
                                    <span className="truncate max-w-[150px] md:max-w-[300px]">/{post.slug}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-[var(--border)]/30 justify-end">
                                <FeaturedButton id={post.id} featured={post.featured === true} />
                                <ToggleButton id={post.id} enabled={post.enabled !== false} />
                                <Link
                                    href={`/admin/edit/${post.id}`}
                                    className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:bg-[var(--bg-elevated)] rounded-lg transition-all"
                                    title="Edit Post"
                                >
                                    <Edit2 size={18} />
                                </Link>
                                <DeleteButton id={post.id} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center rounded-2xl border-2 border-dashed border-[var(--border)]">
                        <p className="text-[var(--text-secondary)] mb-4">No posts found. Start sharing your thoughts.</p>
                        <Link href="/admin/new" className="text-[var(--accent-blue)] font-bold hover:underline">Create your first post</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
