'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addComment(postId: string, slug: string, userName: string, content: string, parentId?: string) {
    const supabase = await createClient();
    try {
        const { error } = await supabase
            .from('comments')
            .insert({ 
                post_id: postId, 
                user_name: userName, 
                content: content,
                parent_id: parentId || null 
            });

        if (error) {
            console.error("Supabase error inserting comment:", error);
            throw error;
        }
    } catch (e: any) {
        console.error("Server Action error in addComment:", e.message || e);
        throw new Error(e.message || "Failed to post comment");
    }
    revalidatePath(`/blog/${slug}`);
}

export async function addRating(postId: string, slug: string, rating: number, email: string) {
    const supabase = await createClient();
    try {
        const { error } = await supabase
            .from('ratings')
            .insert({ 
                post_id: postId, 
                rating: rating,
                user_email: email 
            });

        if (error) {
            if (error.code === '23505') {
                throw new Error("You have already voted on this article.");
            }
            throw error;
        }
    } catch (e: any) {
        console.error("Server Action error in addRating:", e.message || e);
        throw e;
    }
    revalidatePath(`/blog/${slug}`);
}
