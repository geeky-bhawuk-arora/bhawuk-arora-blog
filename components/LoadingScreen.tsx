'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Fluid 1.5s total duration for a smooth experience
        const timer = setTimeout(() => setIsVisible(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070707] overflow-hidden"
                >
                    {/* Background Noise/Texture */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                    {/* Fluid Liquid Shapes */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div 
                            animate={{ 
                                scale: [1, 1.2, 0.9, 1.1, 1],
                                rotate: [0, 90, 180, 270, 360],
                                borderRadius: ["20% 80% 30% 70% / 30% 30% 70% 70%", "80% 20% 70% 30% / 70% 70% 30% 30%", "20% 80% 30% 70% / 30% 30% 70% 70%"],
                            }}
                            transition={{ 
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute w-[300px] h-[300px] bg-blue-500/10 blur-[80px]"
                        />
                        <motion.div 
                            animate={{ 
                                scale: [1.2, 0.9, 1.1, 1, 1.2],
                                rotate: [360, 270, 180, 90, 0],
                                borderRadius: ["70% 30% 70% 30% / 30% 70% 30% 70%", "30% 70% 30% 70% / 70% 30% 70% 30%", "70% 30% 70% 30% / 30% 70% 30% 70%"],
                            }}
                            transition={{ 
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute w-[250px] h-[250px] bg-indigo-500/10 blur-[100px]"
                        />

                        {/* Central Minimal Info */}
                        <div className="relative z-10 flex flex-col items-center gap-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center"
                            >
                                <span className="text-2xl md:text-3xl font-black font-['Space_Grotesk'] text-white tracking-[0.3em] uppercase">
                                    Bhawuk
                                </span>
                                <div className="flex items-center gap-1.5 mt-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                    <span className="text-[9px] font-mono text-blue-500/50 uppercase tracking-[0.5em]">Establishing Sync</span>
                                </div>
                            </motion.div>

                            {/* Fluid Progress Bar */}
                            <div className="w-40 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                                    animate={{ 
                                        x: [-200, 200]
                                    }}
                                    transition={{ 
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Corner Tech Accents */}
                    <div className="absolute top-10 left-10 flex flex-col gap-1 opacity-20">
                        <div className="w-8 h-[1px] bg-white" />
                        <div className="w-4 h-[1px] bg-white" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
