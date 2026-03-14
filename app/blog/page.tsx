import { Metadata } from "next";
import BlogClient from "@/components/BlogClient";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Thoughts on code, AI, design, career, and the craft of building software.",
};

export default function BlogPage() {
    return <BlogClient />;
}
