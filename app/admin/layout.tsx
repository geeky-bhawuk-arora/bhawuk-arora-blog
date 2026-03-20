import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { logout } from '@/app/login/actions'
import { LogOut, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import IdleTimer from '@/components/IdleTimer'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen pt-32 pb-24 w-full flex flex-col items-center">
            <IdleTimer />
            <div className="w-full max-w-4xl mx-auto px-6 md:px-8">
                <nav className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-12 p-4 gap-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        <Link href="/admin" className="flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--accent-blue)] transition-colors font-bold font-['Space_Grotesk']">
                            <LayoutDashboard size={18} /> Admin Dashboard
                        </Link>
                        <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                            View Website
                        </Link>
                    </div>

                    <form action={logout}>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all font-medium">
                            <LogOut size={16} /> Logout
                        </button>
                    </form>
                </nav>
                {children}
            </div>
        </div>
    )
}
