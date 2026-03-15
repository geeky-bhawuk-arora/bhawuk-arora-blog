'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

export async function deletePost(id: string) {
    const supabase = await createClient()
    const headerList = await headers()

    const ip = headerList.get('x-forwarded-for') || 'unknown'
    const ua = headerList.get('user-agent') || 'unknown'

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Not authenticated')
    }

    // Get slug for audit log before deletion
    const { data: post } = await supabase.from('posts').select('slug, title').eq('id', id).single()

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error)
        throw new Error(error.message)
    }

    // Log the successful post deletion
    await supabase.from('audit_logs').insert({
        user_id: user.id,
        event_type: 'delete_post',
        ip_address: ip,
        user_agent: ua,
        metadata: { id, slug: post?.slug, title: post?.title }
    })

    revalidatePath('/blog')
    revalidatePath('/')
    return { success: true }
}
