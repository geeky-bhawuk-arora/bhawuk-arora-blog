import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,var(--border)_1px,transparent_0)] bg-[size:40px_40px] opacity-15 pointer-events-none" />
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/8 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/8 blur-[120px] rounded-full pointer-events-none" />

            {/* Floating stars animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                        style={{
                            top: `${15 + i * 15}%`,
                            left: `${10 + i * 16}%`,
                            animationDelay: `${i * 0.4}s`,
                            animationDuration: `${2 + i * 0.5}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
                {/* Cartoon illustration */}
                <div className="relative mb-8 group">
                    <div className="absolute -inset-4 bg-blue-500/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <Image
                        src="/lost-astronaut.png"
                        alt="Lost astronaut floating in space"
                        width={280}
                        height={280}
                        className="relative z-10 drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]"
                        priority
                    />
                </div>

                {/* 404 glitch text */}
                <div className="relative mb-4">
                    <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-[var(--text-primary)] leading-none">
                        4
                        <span className="text-[var(--accent-blue)] inline-block animate-[spin_8s_linear_infinite]">
                            0
                        </span>
                        4
                    </h1>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
                    Houston, we have a problem.
                </h2>

                <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed mb-10 font-medium max-w-sm">
                    Looks like this page drifted into the void. 
                    The route you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link
                        href="/"
                        className="px-8 py-3.5 rounded-xl text-white bg-[var(--accent-blue)] hover:bg-blue-600 transition-all font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 group"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <Link
                        href="/blog"
                        className="px-8 py-3.5 rounded-xl text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[var(--text-muted)] hover:bg-[var(--bg-card)] transition-all font-bold flex items-center gap-2 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Read the Blog
                    </Link>
                </div>

                {/* Fun terminal-style message */}
                <div className="mt-12 px-6 py-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] font-mono text-xs text-[var(--text-muted)] max-w-sm w-full text-left">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[var(--border)]">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                        <span className="ml-2 text-[10px] opacity-50">terminal</span>
                    </div>
                    <p><span className="text-emerald-400">$</span> curl -s this-page</p>
                    <p className="text-red-400 mt-1">Error 404: Page not found</p>
                    <p className="text-yellow-400/60 mt-1"># Perhaps try navigating home?</p>
                </div>
            </div>

            {/* CSS for float animation */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-12px) rotate(1deg); }
                    50% { transform: translateY(-6px) rotate(-1deg); }
                    75% { transform: translateY(-15px) rotate(0.5deg); }
                }
            `}</style>
        </main>
    );
}
