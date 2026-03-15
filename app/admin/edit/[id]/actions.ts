'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function updatePost(formData: FormData) {
    const supabase = await createClient()
    const headerList = await headers()

    const ip = headerList.get('x-forwarded-for') || 'unknown'
    const ua = headerList.get('user-agent') || 'unknown'

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const id = formData.get('id') as string
    const rawTags = formData.get('tags') as string
    const tags = rawTags.split(',').map(t => t.trim()).filter(Boolean)

    const post = {
        slug: formData.get('slug') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        content: formData.get('content') as string,
        category: formData.get('category') as string,
        emoji: formData.get('emoji') as string || '📝',
        tags,
    }

    const { error } = await supabase
        .from('posts')
        .update(post)
        .eq('id', id)

    if (error) {
        console.error(error)
        redirect(`/admin/edit/${id}?error=${encodeURIComponent(error.message)}`)
    }

    // Log the successful post update
    await supabase.from('audit_logs').insert({
        user_id: user.id,
        event_type: 'update_post',
        ip_address: ip,
        user_agent: ua,
        metadata: { id, slug: post.slug, title: post.title }
    })

    revalidatePath('/blog')
    revalidatePath(`/blog/${post.slug}`)
    revalidatePath('/')
    redirect('/admin')
}
