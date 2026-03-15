import { login } from './actions'

export default function LoginPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 w-full flex flex-col items-center">
            <div className="w-full max-w-md mx-auto px-6 md:px-8">
                <h1 className="text-3xl font-bold tracking-tight mb-8 text-[var(--text-primary)] font-['Space_Grotesk'] text-center">
                    Admin Login
                </h1>

                <form className="flex flex-col gap-4 p-8 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm font-medium text-[var(--text-secondary)]">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-3 py-2.5 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] outline-none transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 mb-4">
                        <label htmlFor="password" className="text-sm font-medium text-[var(--text-secondary)]">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-3 py-2.5 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] outline-none transition-colors"
                        />
                    </div>

                    <button
                        formAction={login}
                        className="w-full py-2.5 rounded font-bold text-[var(--bg)] bg-[var(--text-primary)] hover:bg-[var(--text-secondary)] transition-colors"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </main>
    )
}
