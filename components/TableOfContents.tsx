'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            const headings = items
                .map((item) => document.getElementById(item.id))
                .filter(Boolean) as HTMLElement[];

            const scrollPos = window.scrollY + 120;

            for (let i = headings.length - 1; i >= 0; i--) {
                if (headings[i].offsetTop <= scrollPos) {
                    setActiveId(items[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [items]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

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
                On this page
            </h4>
            <nav className="flex flex-col gap-1">
                {items.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className="relative text-left text-sm py-1.5 px-3 rounded-lg transition-all duration-200 hover:bg-white/5"
                            style={{
                                paddingLeft: item.level === 3 ? '1.5rem' : '0.75rem',
                                color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                                fontWeight: isActive ? 600 : 400,
                            }}
                        >
                            {/* Active indicator with layoutId */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        layoutId="toc-active"
                                        className="absolute inset-0 rounded-lg"
                                        style={{
                                            background: 'rgba(0,212,255,0.08)',
                                            border: '1px solid rgba(0,212,255,0.2)',
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </AnimatePresence>
                            <span className="relative z-10">{item.text}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
