'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function createPost(formData: FormData) {
    const supabase = await createClient()
    const headerList = await headers()

    const ip = headerList.get('x-forwarded-for') || 'unknown'
    const ua = headerList.get('user-agent') || 'unknown'

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const rawTags = formData.get('tags') as string
    const tags = rawTags.split(',').map(t => t.trim()).filter(Boolean)

    const post = {
        slug: formData.get('slug') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        content: formData.get('content') as string,
        category: formData.get('category') as string,
        emoji: formData.get('emoji') as string || '📝',
        reading_time: parseInt((formData.get('readingTime') as string) || '5', 10),
        tags,
    }

    const { error } = await supabase.from('posts').insert(post)

    if (error) {
        console.error(error)
        redirect(`/admin/new?error=${encodeURIComponent(error.message)}`)
    }

    // Log the successful post creation
    await supabase.from('audit_logs').insert({
        user_id: user.id,
        event_type: 'create_post',
        ip_address: ip,
        user_agent: ua,
        metadata: { slug: post.slug, title: post.title }
    })

    revalidatePath('/blog')
    revalidatePath('/')
    redirect('/admin')
}
