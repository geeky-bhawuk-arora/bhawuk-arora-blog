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
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
                <h1 className="text-3xl font-bold font-['Space_Grotesk'] text-[var(--text-primary)]">Admin Dashboard</h1>
                <Link
                    href="/admin/new"
                    className="flex items-center gap-2 px-6 py-2.5 bg-[var(--accent-blue)] text-white rounded-lg font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                >
                    <Plus size={18} /> New Post
                </Link>
            </div>

            <div className="grid gap-4">
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className={`group flex items-center justify-between p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] transition-all hover:border-[var(--accent-blue)]/50 hover:shadow-xl hover:shadow-blue-500/5 ${post.enabled === false ? 'opacity-50' : ''}`}>
                            <div className="flex-1 min-w-0 mr-4">
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className="text-xl font-bold font-['Space_Grotesk'] text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent-blue)] transition-colors truncate">
                                        {post.title}
                                    </h2>
                                    {post.enabled === false ? (
                                        <span className="px-2 py-0.5 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-400 font-bold text-[10px] shrink-0">Draft</span>
                                    ) : (
                                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[10px] shrink-0">Live</span>
                                    )}
                                    {post.featured && (
                                        <span className="px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold text-[10px] shrink-0">★ Featured</span>
                                    )}
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)] mt-2">
                                    <span className="px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border)]">{post.category}</span>
                                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                                    <span className="hidden sm:inline opacity-30">|</span>
                                    <span className="truncate max-w-[200px]">/{post.slug}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <FeaturedButton id={post.id} featured={post.featured === true} />
                                <ToggleButton id={post.id} enabled={post.enabled !== false} />
                                <Link
                                    href={`/admin/edit/${post.id}`}
                                    className="p-3 text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:bg-[var(--bg-elevated)] rounded-lg transition-all"
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
