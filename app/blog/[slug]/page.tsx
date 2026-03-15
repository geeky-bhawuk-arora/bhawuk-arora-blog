import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Post } from "@/lib/data";
import ArticleClient from "@/components/ArticleClient";
import { createClient } from "@/utils/supabase/server";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    // Optionally fetch all slugs or let dynamic routing handle it
    return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();
    const { data: post } = await supabase.from('posts').select('*').eq('slug', slug).single();

    if (!post) return { title: "Not Found" };

    return {
        title: post.title,
        description: post.description,
        keywords: post.tags,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.publishedAt,
            authors: [post.author],
        },
    };
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const supabase = await createClient();
    const { data } = await supabase.from('posts').select('*').eq('slug', slug).single();

    if (!data) notFound();

    // Also fetch related posts
    const { data: relatedData } = await supabase
        .from('posts')
        .select('*')
        .eq('category', data.category)
        .neq('slug', slug)
        .limit(2);

    const post = data as Post;
    const relatedPosts = (relatedData || []) as Post[];

    return <ArticleClient post={post} relatedPosts={relatedPosts} />;
}
