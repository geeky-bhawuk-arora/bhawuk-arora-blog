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

export default function Loader({ size = 'md', color = 'blue' }: { size?: 'sm' | 'md' | 'lg', color?: string }) {
    const isSmall = size === 'sm';

    return (
        <div className={`relative ${isSmall ? 'w-8 h-8' : 'w-24 h-24'} flex items-center justify-center`}>
            {/* The "Prismatic" Backdrop */}
            <motion.div
                animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    borderRadius: ["30%", "50%", "30%"]
                }}
                transition={{ 
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className={`absolute inset-0 bg-gradient-to-tr ${color === 'white' ? 'from-white/10 via-gray-400/10 to-white/10' : 'from-blue-600/20 via-indigo-500/20 to-cyan-400/20'} blur-xl`}
            />

            {/* Floating Concentric Rings */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    animate={{ 
                        rotate: i % 2 === 0 ? 360 : -360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                        rotate: { duration: 3 + i, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
                    }}
                    className="absolute border border-dashed border-opacity-30 rounded-full"
                    style={{
                        width: isSmall ? `${100 - i * 30}%` : `${100 - i * 20}%`,
                        height: isSmall ? `${100 - i * 30}%` : `${100 - i * 20}%`,
                        borderColor: color === 'white' ? 'white' : '#3b82f6',
                        opacity: 0.2 + (i * 0.2)
                    }}
                />
            ))}

            {/* The "Center Pulse" Diamond */}
            <motion.div
                animate={{ 
                    rotate: 45,
                    scale: [1, 1.5, 1],
                    boxShadow: [
                        color === 'white' ? "0 0 10px rgba(255, 255, 255, 0.3)" : "0 0 10px rgba(59, 130, 246, 0.5)",
                        color === 'white' ? "0 0 20px rgba(255, 255, 255, 0.6)" : "0 0 30px rgba(59, 130, 246, 0.8)",
                        color === 'white' ? "0 0 10px rgba(255, 255, 255, 0.3)" : "0 0 10px rgba(59, 130, 246, 0.5)"
                    ]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className={`${isSmall ? 'w-2 h-2' : 'w-5 h-5'} bg-gradient-to-br ${color === 'white' ? 'from-white to-gray-300' : 'from-blue-500 to-indigo-600'} z-10 rotate-45`}
            />

            {/* Orbital Dots */}
            {!isSmall && [0, 1, 2, 3].map((i) => (
                <motion.div
                    key={`dot-${i}`}
                    animate={{ rotate: 360 }}
                    transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 1
                    }}
                    className="absolute inset-0"
                >
                    <div 
                        className={`absolute -top-1 left-1/2 -ms-1 w-2 h-2 rounded-full blur-[0.5px]`}
                        style={{ 
                            backgroundColor: color === 'white' ? 'white' : '#60a5fa',
                            opacity: 0.6
                        }}
                    />
                </motion.div>
            ))}
        </div>
    );
}

export function LoadingSection({ message }: { message?: string }) {
    const [thoughtIndex, setThoughtIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setThoughtIndex((prev) => (prev + 1) % thinkingThoughts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-16 py-32 relative overflow-hidden bg-gradient-to-b from-transparent via-[var(--bg-elevated)]/5 to-transparent">
            {/* Background floating particles */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ 
                            y: [-20, 20],
                            x: [-10, 10],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{ 
                            duration: 5 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5
                        }}
                        className="absolute w-1 h-1 bg-blue-500 rounded-full"
                        style={{ 
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`
                        }}
                    />
                ))}
            </div>

            <Loader size="lg" />
            
            <div className="flex flex-col items-center gap-4 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={thoughtIndex}
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
                        transition={{ duration: 0.8 }}
                        className="text-[11px] font-black text-[var(--accent-blue)] uppercase tracking-[0.5em] text-center max-w-xs"
                    >
                        {message || thinkingThoughts[thoughtIndex]}
                    </motion.div>
                </AnimatePresence>
                
                {/* Minimalist segmented progress bar */}
                <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ 
                                opacity: [0.2, 1, 0.2],
                            }}
                            transition={{ 
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                            className="w-4 h-[2px] bg-blue-500 rounded-full"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
