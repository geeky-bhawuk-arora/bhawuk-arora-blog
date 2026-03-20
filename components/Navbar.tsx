'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Work' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5 border-transparent'}`}
            >
                <div className="max-w-5xl md:max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group shrink-0 outline-none">
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[var(--border)] group-hover:border-[var(--accent-blue)] transition-all">
                            <img src="/logo.svg" alt="Bhawuk Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors">
                            Bhawuk.                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm tracking-wide font-medium transition-colors duration-200 outline-none hover:text-[var(--text-primary)] ${isActive(link.href)
                                    ? 'text-[var(--text-primary)]'
                                    : 'text-[var(--text-secondary)]'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Socials & Menu */}
                    <div className="flex items-center gap-4 shrink-0">
                        <div className="hidden md:flex items-center gap-3">
                            <a href="mailto:bhawuk.arora008@gmail.com" className="text-[var(--text-secondary)] hover:text-white transition-colors p-1" title="Email">
                                <Mail size={18} />
                            </a>
                            <a href="https://github.com/geeky-bhawuk-arora" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-white transition-colors p-1" title="GitHub">
                                <Github size={18} />
                            </a>
                            <a href="https://linkedin.com/in/bhawuk-arora" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-white transition-colors p-1" title="LinkedIn">
                                <Linkedin size={18} />
                            </a>
                        </div>

                        {/* Hamburger */}
                        <button
                            className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 transition-colors"
                            onClick={() => setMenuOpen(v => !v)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden bg-[var(--bg)]/95 backdrop-blur-md flex flex-col pt-24 pb-8 px-6 border-b border-[var(--border)]"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ type: 'tween', duration: 0.2 }}
                    >
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${isActive(link.href)
                                        ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)]'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
                                        }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center justify-center gap-6">
                            <a href="mailto:bhawuk.arora008@gmail.com" className="text-[var(--text-secondary)] hover:text-white p-2">
                                <Mail size={24} />
                            </a>
                            <a href="https://github.com/geeky-bhawuk-arora" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-white p-2">
                                <Github size={24} />
                            </a>
                            <a href="https://linkedin.com/in/bhawuk-arora" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-white p-2">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
