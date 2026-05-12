'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Heart, Bot, Terminal, Sparkles, Cpu } from 'lucide-react';

const messages = [
    "Calibrating kindness algorithms...",
    "Syncing heart-driven systems...",
    "Optimizing for love & logic...",
    "Downloading midnight thoughts...",
    "Booting human-centric MLOps...",
    "Almost ready for you! 🤖💖"
];

const icons = [Heart, Bot, Terminal, Sparkles, Cpu];

export default function LoadingScreen() {
    const [isVisible, setIsVisible] = useState(true);
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 3000);
        
        const messageTimer = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % messages.length);
        }, 500);

        return () => {
            clearTimeout(timer);
            clearInterval(messageTimer);
        };
    }, []);

    const CurrentIcon = icons[messageIndex % icons.length];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070912] overflow-hidden font-mono"
                >
                    {/* Binary Sparkles */}
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ 
                                y: [100, -200, -500],
                                opacity: [0, 0.4, 0],
                                scale: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                                duration: 3 + Math.random() * 3, 
                                repeat: Infinity, 
                                delay: Math.random() * 2 
                            }}
                            className="absolute bottom-0 text-blue-400/20 text-[10px] pointer-events-none select-none"
                            style={{ left: `${Math.random() * 100}%` }}
                        >
                            {Math.random() > 0.5 ? '1' : '0'}
                        </motion.div>
                    ))}

                    {/* Glowing Tech Gradient Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),rgba(236,72,153,0.05),transparent_70%)]" />
                    
                    <div className="relative z-10 flex flex-col items-center gap-12">
                        {/* The Technical-Cute Core */}
                        <div className="relative">
                            <motion.div 
                                animate={{ 
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 2, -2, 0]
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 flex items-center justify-center border border-white/5 backdrop-blur-md shadow-[0_0_50px_rgba(59,130,246,0.15)] relative overflow-hidden"
                            >
                                {/* Internal Scanning Line */}
                                <motion.div 
                                    animate={{ y: [-64, 64] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent z-0"
                                />

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={messageIndex}
                                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative z-10 text-blue-400 flex items-center justify-center"
                                    >
                                        <CurrentIcon size={56} className={messageIndex === 0 ? "text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]" : "text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"} />
                                        
                                        {/* Little cheek blushes for the bot/terminal */}
                                        { (messageIndex === 1 || messageIndex === 2) && (
                                            <>
                                                <div className="absolute -bottom-1 -left-2 w-2 h-1 bg-pink-500/30 rounded-full blur-[2px]" />
                                                <div className="absolute -bottom-1 -right-2 w-2 h-1 bg-pink-500/30 rounded-full blur-[2px]" />
                                            </>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>

                            {/* Corner Tech Accents with Cute Glow */}
                            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-blue-500/20 rounded-tl-2xl" />
                            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-pink-500/20 rounded-br-2xl" />
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <div className="flex flex-col items-center">
                                <motion.span 
                                    key={messageIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-[11px] font-bold text-blue-400 uppercase tracking-[0.4em] mb-2"
                                >
                                    System Status
                                </motion.span>
                                <motion.span 
                                    key={messageIndex + "_msg"}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-xl font-['Caveat'] text-pink-200 tracking-wide"
                                >
                                    {messages[messageIndex]}
                                </motion.span>
                            </div>
                            
                            {/* Technical Progress Dots */}
                            <div className="flex gap-3">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ 
                                            opacity: [0.2, 1, 0.2],
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{ 
                                            duration: 1, 
                                            repeat: Infinity, 
                                            delay: i * 0.15 
                                        }}
                                        className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-blue-500' : 'bg-pink-500'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Background Code Decorations */}
                    <div className="absolute top-10 right-10 opacity-5 text-[8px] flex flex-col gap-1 leading-none">
                        <span>class Personality { '{' }</span>
                        <span className="pl-2">kindness: number = 100;</span>
                        <span className="pl-2">logic: number = 100;</span>
                        <span>{'}'}</span>
                    </div>
                    <div className="absolute bottom-10 left-10 opacity-5 text-[8px] flex flex-col gap-1 leading-none">
                        <span>while(curious) { '{' }</span>
                        <span className="pl-2">bhawuk.learn();</span>
                        <span className="pl-2">bhawuk.smile();</span>
                        <span>{'}'}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
