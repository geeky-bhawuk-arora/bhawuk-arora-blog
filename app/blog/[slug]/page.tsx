import { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/lib/data";
import ArticleClient from "@/components/ArticleClient";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
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
    const post = getPostBySlug(slug);
    if (!post) notFound();
    return <ArticleClient post={post} />;
}
