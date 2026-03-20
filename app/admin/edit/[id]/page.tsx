import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import PostForm from '@/components/admin/PostForm';
import { updatePost } from './actions';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !post) {
        notFound();
    }

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

            <h1 className="text-3xl font-bold font-['Space_Grotesk'] text-[var(--text-primary)] mb-8">Edit Post</h1>

            <PostForm
                initialData={post}
                action={updatePost}
                submitLabel="Save Changes"
                existingCategories={existingCategories}
            />
        </div>
    );
}
