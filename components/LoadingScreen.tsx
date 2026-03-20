'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const greetings = [
    { text: "Welcome", lang: "English" },
    { text: "Sat Sri Akal", lang: "Punjabi" },
    { text: "Namaste", lang: "Hindi" },
    { text: "Bhawuk's Blog", lang: "Brand" },
    { text: "Initializing", lang: "System" }
];

export default function LoadingScreen() {
    const [index, setIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (index < greetings.length - 1) {
            // Balanced timing for readability and excitement
            const timer = setTimeout(() => setIndex(prev => prev + 1), 280);
            return () => clearTimeout(timer);
        } else {
            // A bit more time on the final greeting
            const timer = setTimeout(() => setIsVisible(false), 650);
            return () => clearTimeout(timer);
        }
    }, [index]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070707] overflow-hidden"
                >
                    {/* Background Grid - Premium Look */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[size:32px_32px]" />
                    
                    {/* Floating Glows */}
                    <motion.div 
                        animate={{ 
                            opacity: [0.1, 0.2, 0.1],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full"
                    />

                    <div className="relative flex flex-col items-center">
                        <div className="flex flex-col items-center gap-6 relative z-10">
                            {/* Animated Terminal brackets with much faster text cycling */}
                            <div className="flex items-center gap-6">
                                <motion.span
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="text-blue-500 font-mono text-4xl md:text-6xl font-black"
                                >
                                    [
                                </motion.span>

                                <div className="h-20 flex items-center justify-center min-w-[280px] md:min-w-[400px]">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={index}
                                            initial={{ y: 15, opacity: 0, scale: 0.95 }}
                                            animate={{ y: 0, opacity: 1, scale: 1 }}
                                            exit={{ y: -15, opacity: 0, scale: 1.05 }}
                                            transition={{ duration: 0.12, ease: "easeOut" }}
                                            className="text-center"
                                        >
                                            <h2 className="text-3xl md:text-6xl font-black text-white font-['Space_Grotesk'] tracking-widest lowercase">
                                                {greetings[index].text}
                                            </h2>
                                            <div className="flex items-center justify-center gap-2 mt-3">
                                                <div className="h-[1px] w-4 bg-blue-500/30" />
                                                <p className="text-[10px] font-mono text-blue-500/60 uppercase tracking-[0.4em]">
                                                    {greetings[index].lang}_X
                                                </p>
                                                <div className="h-[1px] w-4 bg-blue-500/30" />
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <motion.span
                                    initial={{ x: 10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="text-blue-500 font-mono text-4xl md:text-6xl font-black"
                                >
                                    ]
                                </motion.span>
                            </div>

                            {/* Progress bar - Sleeker & Faster */}
                            <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden mt-10 relative">
                                <motion.div
                                    className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${((index + 1) / greetings.length) * 100}%` }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
