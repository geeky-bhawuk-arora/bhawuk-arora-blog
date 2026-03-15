import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default async function AdminDashboard() {
    const supabase = await createClient();
    const { data: posts, error } = await supabase
        .from('posts')
        .select('id, title, published_at, category')
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
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-blue)] text-white rounded font-medium hover:bg-blue-600 transition-colors"
                >
                    <Plus size={16} /> New Post
                </Link>
            </div>

            <div className="flex flex-col gap-4">
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="flex items-center justify-between p-4 rounded bg-[var(--bg-card)] border border-[var(--border)] transition-colors hover:border-[var(--text-muted)]">
                            <div>
                                <h2 className="text-lg font-bold font-['Space_Grotesk'] text-[var(--text-primary)] leading-tight">{post.title}</h2>
                                <div className="flex gap-4 text-xs font-mono text-[var(--text-muted)] mt-1">
                                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                                    <span>•</span>
                                    <span>{post.category}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link href={`/admin/edit/${post.id}`} className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors">
                                    <Edit2 size={16} />
                                </Link>
                                <button className="p-2 text-[var(--text-secondary)] hover:text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-[var(--text-secondary)]">No posts found. Create your first post.</p>
                )}
            </div>
        </div>
    );
}
