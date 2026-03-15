'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
    const supabase = await createClient()
    const headerList = await headers()

    const ip = headerList.get('x-forwarded-for') || 'unknown'
    const ua = headerList.get('user-agent') || 'unknown'

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data: authData, error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/login?error=Could not authenticate user')
    }

    // Log the successful login
    await supabase.from('audit_logs').insert({
        user_id: authData.user?.id,
        event_type: 'login',
        ip_address: ip,
        user_agent: ua,
        metadata: { method: 'password' }
    })

    revalidatePath('/', 'layout')
    redirect('/admin')
}

export async function logout(arg?: string | FormData) {
    const supabase = await createClient()
    const headerList = await headers()

    const ip = headerList.get('x-forwarded-for') || 'unknown'
    const ua = headerList.get('user-agent') || 'unknown'

    const eventType = typeof arg === 'string' ? arg : 'logout'

    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        await supabase.from('audit_logs').insert({
            user_id: user.id,
            event_type: eventType,
            ip_address: ip,
            user_agent: ua,
            metadata: { reason: eventType === 'timeout' ? 'inactivity' : 'user_action' }
        })
    }

    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
}
