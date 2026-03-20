'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const thinkingThoughts = [
    "Gathering cosmic wisdom...",
    "Simulating intelligence...",
    "Optimizing neural pathways...",
    "Consulting the digital oracle...",
    "Decrypting the matrix...",
    "Synthesizing perspective...",
    "Scanning the multiverse...",
    "Harnessing digital energy..."
];

export default function Loader({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const isSmall = size === 'sm';

    return (
        <div className={`relative ${isSmall ? 'w-8 h-8' : 'w-24 h-24'} flex items-center justify-center`}>
            {/* The "Neural" Core */}
            <motion.div
                animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 60% 40% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
                }}
                transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className={`absolute inset-0 bg-gradient-to-tr from-blue-600/40 via-indigo-500/40 to-cyan-400/40 blur-xl opacity-80`}
            />

            {/* Pulsing Center Node */}
            <motion.div
                animate={{ 
                    scale: [1, 1.5, 1],
                    boxShadow: [
                        "0 0 10px rgba(59, 130, 246, 0.5)",
                        "0 0 30px rgba(59, 130, 246, 0.8)",
                        "0 0 10px rgba(59, 130, 246, 0.5)"
                    ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`${isSmall ? 'w-2 h-2' : 'w-4 h-4'} rounded-full bg-blue-500 z-10`}
            />

            {/* Orbiting particles (only for large) */}
            {!isSmall && [0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{ 
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0"
                >
                    <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                        className={`absolute -top-1 left-1/2 -ms-1 w-2 h-2 rounded-full bg-white/40 blur-[1px]`}
                        style={{ opacity: 0.3 + (i * 0.2) }}
                    />
                </motion.div>
            ))}

            {/* Neural Connections (SVG lines) */}
            {!isSmall && (
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                    <motion.circle
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke="url(#grad)"
                        strokeWidth="0.5"
                        strokeDasharray="10 150"
                        animate={{ 
                            strokeDashoffset: [0, -160],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                    </defs>
                </svg>
            )}
        </div>
    );
}

export function LoadingSection({ message }: { message?: string }) {
    const [thoughtIndex, setThoughtIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setThoughtIndex((prev) => (prev + 1) % thinkingThoughts.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-12 py-32 relative overflow-hidden">
            <Loader size="lg" />
            
            <div className="flex flex-col items-center gap-3">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={thoughtIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.4em] text-center max-w-xs h-4"
                    >
                        {message || thinkingThoughts[thoughtIndex]}
                    </motion.p>
                </AnimatePresence>
                
                {/* Subtle progress line */}
                <div className="w-32 h-[1px] bg-[var(--border)] relative overflow-hidden">
                    <motion.div
                        animate={{ x: [-128, 128] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                    />
                </div>
            </div>
        </div>
    );
}
