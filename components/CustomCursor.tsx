'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);

            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') !== null ||
                target.closest('button') !== null
            );
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        // Hide default cursor
        document.body.style.cursor = 'none';
        const style = document.createElement('style');
        style.innerHTML = `
            a, button, input, [role="button"] { cursor: none !important; }
            * { cursor: none !important; }
        `;
        document.head.appendChild(style);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.style.cursor = 'auto';
            document.head.removeChild(style);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Main Outer ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-blue-500/50 rounded-full flex items-center justify-center mix-blend-difference"
                animate={{
                    x: mousePos.x - 16,
                    y: mousePos.y - 16,
                    scale: isPointer ? 1.5 : 1,
                    backgroundColor: isPointer ? "rgba(59, 130, 246, 0.1)" : "transparent",
                    borderColor: isPointer ? "rgba(59, 130, 246, 0.8)" : "rgba(59, 130, 246, 0.5)",
                }}
                transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.5 }}
            />

            {/* Center dot */}
            <motion.div
                className="fixed top-0 left-0 w-1 h-1 bg-blue-500 rounded-full"
                animate={{
                    x: mousePos.x - 2,
                    y: mousePos.y - 2,
                    scale: isClicked ? 0.5 : 1
                }}
                transition={{ type: "spring", damping: 30, stiffness: 500 }}
            />

            {/* Pointer text identifier (Cheeky engineering touch) */}
            <AnimatePresence>
                {isPointer && (
                    <motion.span
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 25 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 text-[8px] font-mono text-blue-500 font-bold tracking-widest pointer-events-none"
                        style={{ x: mousePos.x, y: mousePos.y - 10 }}
                    >
                        [EXEC]
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
}

import { AnimatePresence } from 'framer-motion';
