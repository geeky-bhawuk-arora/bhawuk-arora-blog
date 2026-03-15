import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Post } from "@/lib/data";
import ArticleClient from "@/components/ArticleClient";
import { createClient } from "@/utils/supabase/server";

interface Props {
    params: Promise<{ slug: string }>;
}

// Ensure the page is dynamic so it fetches the latest data from Supabase
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { slug } = await params;
        const supabase = await createClient();
        const { data: post, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .eq('enabled', true)
            .maybeSingle();

        if (error || !post) return { title: "Post Not Found" };

        return {
            title: post.title,
            description: post.description,
            keywords: post.tags,
            openGraph: {
                title: post.title,
                description: post.description,
                type: "article",
                publishedTime: post.published_at,
                authors: [post.author],
            },
        };
    } catch (err) {
        return { title: "Blog" };
    }
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('enabled', true)
        .maybeSingle();

    if (error || !data) {
        console.error("Post not found for slug:", slug, error);
        notFound();
    }

    // Mapping helper to bridge Supabase underscored names to camelCase interface
    const mapPost = (p: any): Post => ({
        ...p,
        readingTime: p.reading_time || 5,
        publishedAt: p.published_at,
        patternType: p.pattern_type || 'dots',
        accentColor: p.accent_color || '#6366f1',
        authorBio: p.author_bio || ''
    });

    const post = mapPost(data);

    // Fetch related posts in the same category
    const { data: relatedData } = await supabase
        .from('posts')
        .select('*')
        .eq('category', data.category)
        .eq('enabled', true)
        .neq('slug', slug)
        .limit(2);

    const relatedPosts = (relatedData || []).map(mapPost);

    return <ArticleClient post={post} relatedPosts={relatedPosts} />;
}
