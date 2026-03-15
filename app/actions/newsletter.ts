'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function subscribeToNewsletter(formData: FormData) {
    const email = formData.get('email') as string;

    if (!email || !email.includes('@')) {
        return { error: 'Invalid email address' };
    }

    try {
        const supabase = await createClient();

        const { error } = await supabase
            .from('subscribers')
            .insert([{ email }]);

        if (error) {
            if (error.code === '23505') { // Unique violation
                return { error: 'You are already subscribed!' };
            }
            throw error;
        }

        revalidatePath('/');
        return { success: true };
    } catch (e) {
        console.error('Newsletter Error:', e);
        return { error: 'Failed to subscribe. Please try again.' };
    }
}
