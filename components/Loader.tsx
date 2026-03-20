'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const thinkingThoughts = [
    "Sequencing neural data...",
    "Synthesizing consciousness...",
    "Optimizing recursive logic...",
    "Consulting the source code...",
    "Decrypting reality...",
    "Harnessing quantum fluctuations...",
    "Bridging digital dimensions...",
    "Assembling the matrix..."
];

export default function Loader({ size = 'md', color = 'blue' }: { size?: 'sm' | 'md' | 'lg', color?: string }) {
    const isSmall = size === 'sm';

    return (
        <div className={`relative ${isSmall ? 'w-10 h-10' : 'w-32 h-32'} flex items-center justify-center pointer-events-none`}>
            {/* The "DNA Helix" Strands */}
            {[...Array(isSmall ? 8 : 12)].map((_, i) => (
                <div key={i} className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{ 
                            rotateY: 360,
                            translateY: isSmall ? [-10, 10] : [-30, 30],
                            opacity: [0.2, 1, 0.2],
                            scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: i * 0.2
                        }}
                        className="flex flex-col gap-2"
                        style={{ transform: `rotate(${i * (360 / (isSmall ? 8 : 12))}deg)` }}
                    >
                        <div 
                            className={`w-1.5 h-1.5 rounded-full ${color === 'white' ? 'bg-white shadow-[0_0_8px_white]' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]'}`} 
                        />
                        <div 
                            className={`w-0.5 ${isSmall ? 'h-4' : 'h-8'} mx-auto ${color === 'white' ? 'bg-white/20' : 'bg-blue-500/20'}`} 
                        />
                        <div 
                            className={`w-1.5 h-1.5 rounded-full ${color === 'white' ? 'bg-white shadow-[0_0_8px_white]' : 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'}`} 
                        />
                    </motion.div>
                </div>
            ))}

            {/* Central "Core" Pulse */}
            <motion.div
                animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute ${isSmall ? 'w-4 h-4' : 'w-12 h-12'} rounded-full blur-xl ${color === 'white' ? 'bg-white' : 'bg-blue-600'}`}
            />
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
        <div className="flex flex-col items-center justify-center gap-16 py-32 relative overflow-hidden">
            {/* HUD Elements */}
            {!message && (
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-[500px] h-[500px] border border-blue-500 rounded-full border-dashed" 
                    />
                    <motion.div 
                        animate={{ rotate: -360 }} 
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[400px] h-[400px] border border-cyan-400 rounded-full border-dotted" 
                    />
                </div>
            )}

            <div className="relative">
                <Loader size="lg" />
            </div>
            
            <div className="flex flex-col items-center gap-6 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={thoughtIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <p className="text-[12px] font-black text-[var(--text-primary)] uppercase tracking-[0.6em] text-center max-w-xs drop-shadow-sm">
                            {message || thinkingThoughts[thoughtIndex]}
                        </p>
                        <div className="flex gap-1">
                           {[...Array(5)].map((_, i) => (
                               <motion.div
                                   key={i}
                                   animate={{ scaleY: [1, 2, 1], opacity: [0.3, 1, 0.3] }}
                                   transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                                   className="w-1 h-3 bg-blue-500 rounded-full"
                               />
                           ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
                
                {/* Micro-HUD readouts */}
                <div className="flex gap-8 font-mono text-[8px] text-[var(--text-muted)] opacity-50 uppercase tracking-widest">
                    <div className="flex flex-col items-center">
                        <span>Latency</span>
                        <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.5, repeat: Infinity }}>
                            ~2ms
                        </motion.span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span>Entropy</span>
                        <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity }}>
                            99.9%
                        </motion.span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span>Neural_Load</span>
                        <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity }}>
                            Optimized
                        </motion.span>
                    </div>
                </div>
            </div>
        </div>
    );
}
