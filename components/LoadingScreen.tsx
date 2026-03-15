'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const greetings = [
    { text: "Welcome", lang: "English" },
    { text: "Khamma Ghani", lang: "Rajasthani" },
    { text: "Sat Sri Akal", lang: "Punjabi" },
    { text: "Namaste", lang: "Hindi" },
    { text: "Initializing", lang: "System" }
];

export default function LoadingScreen() {
    const [index, setIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (index < greetings.length - 1) {
            const timer = setTimeout(() => setIndex(prev => prev + 1), 350);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 800);
            return () => clearTimeout(timer);
        }
    }, [index]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070707] overflow-hidden"
                >
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:40px_40px]" />

                    <div className="relative flex flex-col items-center">
                        {/* Central Glow */}
                        <div className="absolute inset-0 w-64 h-64 bg-blue-500/10 blur-[100px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />

                        <div className="flex flex-col items-center gap-4 relative z-10">
                            {/* Animated Terminal Brackets */}
                            <div className="flex items-center gap-4">
                                <motion.span
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="text-blue-500 font-mono text-4xl md:text-6xl font-black"
                                >
                                    [
                                </motion.span>

                                <div className="h-16 flex items-center justify-center min-w-[300px]">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={index}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-center"
                                        >
                                            <h2 className="text-3xl md:text-5xl font-black text-white font-['Space_Grotesk'] tracking-tighter">
                                                {greetings[index].text}
                                            </h2>
                                            <p className="text-[10px] font-mono text-blue-500/50 uppercase tracking-[0.3em] mt-2">
                                                {greetings[index].lang}_CORE
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <motion.span
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="text-blue-500 font-mono text-4xl md:text-6xl font-black"
                                >
                                    ]
                                </motion.span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mt-8 border border-white/5">
                                <motion.div
                                    className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${((index + 1) / greetings.length) * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
