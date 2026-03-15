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
        .select('*')
        .order('published_at', { ascending: false });

    const posts = (data || []).map((p: any) => ({
        ...p,
        readingTime: p.reading_time || 5,
        publishedAt: p.published_at,
        patternType: p.pattern_type || 'dots',
        accentColor: p.accent_color || '#6366f1',
        authorBio: p.author_bio || ''
    })) as Post[];

    return <BlogClient initialPosts={posts} />;
}
