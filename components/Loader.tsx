'use client';

import { motion } from 'framer-motion';

export default function Loader({ size = 'md', color = 'blue' }: { size?: 'sm' | 'md' | 'lg', color?: string }) {
    const isSmall = size === 'sm';
    const accentColor = color === 'white' ? 'white' : '#3b82f6';

    const variants = {
        sm: { width: 32, height: 32, borderSize: 2 },
        md: { width: 64, height: 64, borderSize: 3 },
        lg: { width: 128, height: 128, borderSize: 4 }
    };

    const current = variants[size];

    return (
        <div className="relative flex items-center justify-center pointer-events-none" style={{ width: current.width, height: current.height }}>
            {/* The Morphing Geometry */}
            <motion.div
                animate={{ 
                    rotate: [0, 90, 180, 270, 360],
                    borderRadius: ["20%", "50%", "20%", "50%", "20%"],
                    scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                }}
                className="absolute border"
                style={{ 
                    width: '60%', 
                    height: '60%', 
                    borderColor: accentColor,
                    borderWidth: current.borderSize,
                    boxShadow: `0 0 15px ${accentColor}44`
                }}
            />

            {/* The Scanning Ray */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute"
                style={{ width: '100%', height: '100%' }}
            >
                <div 
                    className="absolute top-0 left-1/2 -ms-[1px] w-[2px] h-[20%] rounded-full opacity-60"
                    style={{ backgroundColor: accentColor }}
                />
            </motion.div>

            {/* Central Dot */}
            <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute w-[10%] h-[10%] rounded-full"
                style={{ backgroundColor: accentColor }}
            />
        </div>
    );
}

export function LoadingSection({ message }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-12 py-32 relative">
            <Loader size="lg" />
            
            <div className="flex flex-col items-center gap-3 relative z-10">
                <p className="text-[11px] font-black text-[var(--accent-blue)] uppercase tracking-[0.5em] text-center">
                    {message || "Processing Data..."}
                </p>
                <div className="w-32 h-[1px] bg-[var(--border)] relative overflow-hidden">
                    <motion.div
                        animate={{ x: [-128, 128] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-[var(--accent-blue)] to-transparent"
                    />
                </div>
            </div>
        </div>
    );
}
