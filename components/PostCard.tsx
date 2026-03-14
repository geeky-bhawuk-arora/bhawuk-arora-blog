'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Post, CATEGORY_COLORS, CATEGORY_BG } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import { Clock, Calendar } from 'lucide-react';

interface PostCardProps {
    post: Post;
    index?: number;
    large?: boolean;
}

const patternClasses: Record<string, string> = {
    dots: 'pattern-dots',
    grid: 'pattern-grid',
    circuit: 'pattern-circuit',
    wave: 'pattern-wave',
    hex: 'pattern-hex',
};

export default function PostCard({ post, index = 0, large = false }: PostCardProps) {
    const categoryColor = CATEGORY_COLORS[post.category];
    const categoryBg = CATEGORY_BG[post.category];
    const patternClass = patternClasses[post.patternType];

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{
                y: -6,
                transition: { type: 'spring', stiffness: 400, damping: 25 },
            }}
            className={`group relative rounded-2xl overflow-hidden flex flex-col cursor-pointer ${large ? 'h-full min-h-[480px]' : ''
                }`}
            style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
            }}
        >
            {/* Hover glow border */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                    boxShadow: `0 0 0 1px ${categoryColor}55, 0 0 30px ${categoryColor}20`,
                }}
            />

            {/* Image area */}
            <div
                className={`relative ${large ? 'h-64' : 'h-44'} flex items-center justify-center overflow-hidden`}
                style={{ background: categoryBg }}
            >
                <div className={`absolute inset-0 ${patternClass} opacity-60`} />
                <motion.div
                    className="relative z-10 text-5xl"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.08 + 0.2 }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                >
                    {post.emoji}
                </motion.div>
                {/* Category badge */}
                <div
                    className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-mono font-semibold z-20"
                    style={{
                        background: `${categoryColor}22`,
                        color: categoryColor,
                        border: `1px solid ${categoryColor}44`,
                    }}
                >
                    {post.category}
                </div>
            </div>

            {/* Content */}
            <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1 p-5 gap-3 no-underline">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                        <motion.span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-xs font-mono"
                            style={{
                                background: 'var(--bg-elevated)',
                                color: 'var(--text-muted)',
                                border: '1px solid var(--border)',
                            }}
                            whileHover={{
                                color: categoryColor,
                                borderColor: `${categoryColor}44`,
                                scale: 1.05,
                            }}
                            transition={{ duration: 0.15 }}
                        >
                            #{tag}
                        </motion.span>
                    ))}
                </div>

                {/* Title */}
                <h3
                    className={`font-bold leading-tight line-clamp-2 group-hover:text-white transition-colors duration-200 ${large ? 'text-xl' : 'text-base'
                        }`}
                    style={{
                        fontFamily: 'Syne, sans-serif',
                        color: 'var(--text-primary)',
                    }}
                >
                    {post.title}
                </h3>

                {/* Description */}
                <p
                    className="text-sm leading-relaxed line-clamp-3 flex-1"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    {post.description}
                </p>

                {/* Meta */}
                <div
                    className="flex items-center justify-between text-xs font-mono pt-2"
                    style={{
                        color: 'var(--text-muted)',
                        borderTop: '1px solid var(--border)',
                    }}
                >
                    <div className="flex items-center gap-1">
                        <Clock size={11} />
                        <span>{post.readingTime} min read</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={11} />
                        <span>{formatDate(post.publishedAt)}</span>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
