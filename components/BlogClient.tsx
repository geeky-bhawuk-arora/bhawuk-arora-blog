'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, Clock, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Post, Category } from '@/lib/data';
import { formatDate } from '@/lib/utils';

const CATEGORIES: Array<'All' | Category> = ['All', 'Kubernetes', 'Terraform', 'MLOps pipelines', 'System design', 'Databricks', 'Docker', 'MLflow'];
const POSTS_PER_PAGE = 8;

function CleanCard({ post }: { post: Post }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group relative flex flex-col p-5 sm:p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-blue-500/50 transition-colors h-full"
        >
            <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl" />

            <div className="flex items-center gap-3 mb-4 font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                <span className="flex items-center justify-center w-6 h-6 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-base">
                    {post.emoji}
                </span>
                <span className="text-blue-400 font-semibold">{post.category}</span>
                <span>•</span>
                <span>{formatDate(post.publishedAt)}</span>
            </div>

            <h3 className="font-bold text-xl leading-snug line-clamp-2 text-[var(--text-primary)] group-hover:text-blue-400 transition-colors mb-2 font-['Space_Grotesk']">
                {post.title}
            </h3>

            <p className="text-sm leading-relaxed line-clamp-2 mt-2 mb-6 flex-1 text-[var(--text-secondary)]">
                {post.description}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]">
                <div className="flex gap-2">
                    {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border)]">
                            #{tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--text-muted)] shrink-0">
                    <Clock size={12} />
                    {post.readingTime}m
                </div>
            </div>
        </motion.article>
    );
}

export default function BlogClient({ initialPosts }: { initialPosts: Post[] }) {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState<'All' | Category>('All');
    const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return initialPosts.filter(p => {
            const matchesCat = activeCategory === 'All' || p.category === activeCategory;
            const matchesSearch = !q ||
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q)) ||
                p.category.toLowerCase().includes(q);
            return matchesCat && matchesSearch;
        });
    }, [search, activeCategory]);

    const gridPosts = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    return (
        <main className="min-h-screen pt-32 pb-24 w-full flex flex-col items-center">

            {/* Header */}
            <div className="w-full max-w-5xl mx-auto px-6 md:px-8 mb-16">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-[var(--text-primary)] font-['Space_Grotesk'] leading-[0.9]">
                    Engineering / <br />
                    <span className="text-[var(--accent-blue)]">Intelligence.</span>
                </h1>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-12 border-l-2 border-[var(--border)] pl-6 py-1">
                    Essays on building scalable ML infrastructure, cloud architecture, and the craft of engineering.
                </p>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="relative w-full md:w-96 group">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-11 pr-10 py-3 rounded-lg text-sm bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white transition-colors outline-none">
                                <X size={15} />
                            </button>
                        )}
                    </div>

                    <div className="flex overflow-x-auto pb-2 -mx-2 px-2 md:pb-0 md:mx-0 md:px-0 md:flex-wrap gap-2 scrollbar-hide">
                        {CATEGORIES.map(cat => {
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-200 outline-none border uppercase tracking-widest ${isActive
                                        ? 'bg-[var(--accent-blue)] text-white border-[var(--accent-blue)] shadow-lg shadow-blue-500/20'
                                        : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="w-full max-w-5xl mx-auto px-6 md:px-8">
                <AnimatePresence mode="popLayout">
                    {gridPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {gridPosts.map(post => (
                                <CleanCard key={post.slug} post={post} />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20 rounded-xl bg-[var(--bg-card)] border border-dashed border-[var(--border)]"
                        >
                            <p className="text-[var(--text-muted)] text-sm mb-4 font-mono uppercase tracking-wider">No results found</p>
                            <button
                                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                                className="px-5 py-2 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--text-muted)] text-sm transition-colors font-medium"
                            >
                                Clear filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Load More */}
                {hasMore && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => setVisibleCount(c => c + POSTS_PER_PAGE)}
                            className="px-6 py-2.5 rounded text-sm font-medium bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
