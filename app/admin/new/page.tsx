import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createPost } from './actions';
import PostForm from '@/components/admin/PostForm';
import { createClient } from '@/utils/supabase/server';

export default async function NewPostPage() {
    const supabase = await createClient();
    const { data: posts } = await supabase
        .from('posts')
        .select('category');
    
    const existingCategories = Array.from(new Set(posts?.map(p => p.category).filter(Boolean))).sort() as string[];

    return (
        <div>
            <div className="mb-8">
                <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>
            </div>

            <h1 className="text-3xl font-bold font-['Space_Grotesk'] text-[var(--text-primary)] mb-8">Create New Post</h1>

            <PostForm 
                action={createPost} 
                submitLabel="Publish Post" 
                existingCategories={existingCategories}
            />
        </div>
    );
}
