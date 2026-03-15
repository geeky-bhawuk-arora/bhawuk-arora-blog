'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
    const supabase = await createClient()

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
        return { error: error.message }
    }

    revalidatePath('/blog')
    revalidatePath('/')
    redirect('/admin')
}
