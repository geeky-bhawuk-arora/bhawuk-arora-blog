'use client';

import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';

interface ShareButtonsProps {
    url: string;
    title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;

    return (
        <div
            className="rounded-xl p-5"
            style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
            }}
        >
            <h4
                className="text-xs font-mono uppercase tracking-widest mb-4"
                style={{ color: 'var(--text-muted)' }}
            >
                Share this
            </h4>
            <div className="flex flex-col gap-2">
                <motion.a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
                    style={{
                        background: 'rgba(10,102,194,0.12)',
                        color: '#0A66C2',
                        border: '1px solid rgba(10,102,194,0.25)',
                    }}
                    whileHover={{
                        scale: 1.02,
                        background: 'rgba(10,102,194,0.2)',
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                >
                    <Linkedin size={15} fill="currentColor" />
                    Share on LinkedIn
                </motion.a>
                <motion.a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
                    style={{
                        background: 'rgba(29,161,242,0.1)',
                        color: '#1DA1F2',
                        border: '1px solid rgba(29,161,242,0.25)',
                    }}
                    whileHover={{
                        scale: 1.02,
                        background: 'rgba(29,161,242,0.2)',
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                >
                    <Twitter size={15} fill="currentColor" />
                    Share on X / Twitter
                </motion.a>
            </div>
        </div>
    );
}
