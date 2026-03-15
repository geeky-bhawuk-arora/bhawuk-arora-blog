import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

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
            <div className="w-full max-w-4xl mx-auto px-6 md:px-8">
                {children}
            </div>
        </div>
    )
}
