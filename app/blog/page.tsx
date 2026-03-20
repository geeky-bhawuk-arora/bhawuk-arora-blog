import { Metadata } from "next";
import BlogClient from "@/components/BlogClient";
import { createClient } from "@/utils/supabase/server";
import { Post } from "@/lib/data";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Thoughts on code, AI, design, career, and the craft of building software.",
};

export default async function BlogPage() {
    const supabase = await createClient();
    const { data } = await supabase
        .from('posts')
        .select(`
            slug, title, description, category, tags, reading_time, published_at, 
            featured, emoji, pattern_type, accent_color, author, author_bio,
            ratings(rating)
        `)
        .eq('enabled', true)
        .order('published_at', { ascending: false })
        .limit(50);

    const posts = (data || []).map((p: any) => {
        const ratings = p.ratings || [];
        const total = ratings.length;
        const score = ratings.reduce((acc: number, r: any) => acc + r.rating, 0);

        return {
            ...p,
            readingTime: p.reading_time || 5,
            publishedAt: p.published_at,
            patternType: p.pattern_type || 'dots',
            accentColor: p.accent_color || '#6366f1',
            authorBio: p.author_bio || '',
            score,
            totalVotes: total
        };
    }) as Post[];

    return <BlogClient initialPosts={posts} />;
}
