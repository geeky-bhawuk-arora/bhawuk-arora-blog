export type Category = "Tech" | "AI" | "Design" | "Life" | "Career";

export interface Post {
    slug: string;
    title: string;
    description: string;
    category: Category;
    tags: string[];
    readingTime: number;
    publishedAt: string;
    featured: boolean;
    emoji: string;
    accentColor: string;
    patternType: "dots" | "grid" | "circuit" | "wave" | "hex";
    author: string;
    authorBio: string;
    content: string;
}

export const CATEGORY_COLORS: Record<Category, string> = {
    Tech: "#6366f1",
    AI: "#a855f7",
    Design: "#f43f5e",
    Life: "#10b981",
    Career: "#f59e0b",
};

export const CATEGORY_BG: Record<Category, string> = {
    Tech: "rgba(99,102,241,0.15)",
    AI: "rgba(168,85,247,0.15)",
    Design: "rgba(244,63,94,0.15)",
    Life: "rgba(16,185,129,0.15)",
    Career: "rgba(245,158,11,0.15)",
};

export const posts: Post[] = [
    {
        slug: "building-ai-agents-that-dont-hallucinate",
        title: "Building AI Agents That Don't Hallucinate",
        description:
            "A deep dive into grounding techniques, RAG architectures, and verification loops that keep LLM-powered agents honest and reliable in production systems.",
        category: "AI",
        tags: ["LLM", "RAG", "Agents", "Reliability"],
        readingTime: 12,
        publishedAt: "2026-03-10",
        featured: true,
        emoji: "🤖",
        accentColor: "#a855f7",
        patternType: "circuit",
        author: "Bhawuk",
        authorBio:
            "Software developer passionate about AI, React, and building things people love. Writing about code, design, and everything in between.",
        content: `
## Introduction

Hallucination is the original sin of modern language models. We've built systems that sound confident while being wrong, and deployed them at scale before understanding the consequences.

But here's the thing: hallucination isn't inevitable. It's an engineering problem, and like all engineering problems, it has solutions.

## Understanding Why Models Hallucinate

Before we fix the problem, we need to understand it. Language models hallucinate because they're trained to produce plausible completions, not necessarily true ones. The training objective optimizes for coherence, not factuality.

\`\`\`python
# The core tension in LLM training
# Loss = -log P(output | input)
# This optimizes for P(plausible output) not P(true output)

def compute_loss(model, input_tokens, target_tokens):
    logits = model(input_tokens)
    # Cross-entropy doesn't know what's "true"
    return cross_entropy(logits, target_tokens)
\`\`\`

There are three main failure modes:

1. **Closed-domain hallucination** — making up facts about things the model knows nothing about
2. **Open-domain hallucination** — confidently stating incorrect information in well-known domains
3. **Reasoning hallucination** — correct premises, incorrect conclusions

## The RAG Solution (And Its Limits)

Retrieval-Augmented Generation (RAG) is the most popular mitigation, and for good reason — it works. The idea is simple: before generating, retrieve relevant context from a trusted source.

\`\`\`typescript
interface RAGPipeline {
  query: string;
  retrievedChunks: DocumentChunk[];
  prompt: string;
  response: string;
}

async function ragQuery(userQuery: string): Promise<RAGPipeline> {
  // Step 1: Embed the query
  const queryEmbedding = await embedText(userQuery);
  
  // Step 2: Retrieve top-k similar chunks
  const chunks = await vectorStore.similaritySearch(queryEmbedding, { k: 5 });
  
  // Step 3: Build grounded prompt
  const context = chunks.map(c => c.content).join("\\n\\n");
  const prompt = \`Answer based ONLY on this context:\\n\\n\${context}\\n\\nQuestion: \${userQuery}\`;
  
  // Step 4: Generate with grounding
  const response = await llm.generate(prompt);
  
  return { query: userQuery, retrievedChunks: chunks, prompt, response };
}
\`\`\`

But RAG has limits. Retrieval quality matters enormously — garbage in, garbage out. And models can still hallucinate *around* the retrieved context.

## Verification Loops

The real unlock is adding verification passes. After generation, run the output through a second model (or the same model with a critic prompt) that checks the claims against the source documents.

\`\`\`python
class VerificationLoop:
    def __init__(self, generator, verifier, max_retries=3):
        self.generator = generator
        self.verifier = verifier
        self.max_retries = max_retries
    
    async def generate_verified(self, query: str, context: list[str]) -> str:
        for attempt in range(self.max_retries):
            response = await self.generator.generate(query, context)
            
            verdict = await self.verifier.check(
                claim=response,
                sources=context,
                prompt="Does this response contain claims not supported by the sources?"
            )
            
            if verdict.is_grounded:
                return response
            
            # Feedback loop: tell generator what was wrong
            query = f"{query}\\n\\nPrevious attempt was rejected: {verdict.reason}. Try again, staying strictly within the provided sources."
        
        return "I cannot confidently answer this question based on available information."
\`\`\`

## Confidence Calibration

Another powerful technique is teaching models to express uncertainty. Instead of forcing a confident answer, prompt for calibrated responses.

The key insight: a model that says "I'm not sure" is more useful than a model that confidently lies.

## Practical Deployment Checklist

Before shipping any LLM-powered feature to production:

- [ ] RAG retrieval quality tested (MRR, NDCG metrics)
- [ ] Verification layer in place for high-stakes outputs  
- [ ] Confidence thresholds configured
- [ ] Human review queue for low-confidence cases
- [ ] Monitoring for hallucination patterns over time
- [ ] Fallback responses defined

## Conclusion

Hallucination will likely never be fully eliminated — these are probabilistic systems. But it can be managed to acceptable levels for most production use cases. The key is treating it as an engineering problem: measure it, build safeguards, and iterate.

The teams shipping reliable AI products aren't using magic — they're applying boring, rigorous engineering practices to a new class of problem.
    `,
    },
    {
        slug: "the-art-of-the-side-project",
        title: "The Art of the Side Project",
        description:
            "Why every developer should have a creative outlet, how to choose the right one, and what I've learned from shipping (and abandoning) a dozen of them over 5 years.",
        category: "Career",
        tags: ["Productivity", "Projects", "Creativity"],
        readingTime: 7,
        publishedAt: "2026-03-05",
        featured: false,
        emoji: "🚀",
        accentColor: "#f59e0b",
        patternType: "dots",
        author: "Bhawuk",
        authorBio:
            "Software developer passionate about AI, React, and building things people love. Writing about code, design, and everything in between.",
        content: `
## The Paradox of the Side Project

Everyone says you should have a side project. Then everyone complains about side project guilt — that nagging feeling that you're not shipping fast enough, or that you abandoned that promising idea from three months ago.

Here's what I've learned after years of starting things: **the goal is not to finish. The goal is to stay curious.**

## What Makes a Good Side Project

The best side projects share three qualities:

1. **Scratches a real itch** — You actually want the thing to exist
2. **Teaches you something** — Every commit adds to your knowledge
3. **Can be abandoned without shame** — Life happens; the project served its purpose

\`\`\`javascript
// The wrong way to start a side project
const sideProject = {
  goal: "make money",
  timeline: "launch in 2 weeks",
  outcome: "abandoned after day 3"
};

// The right way
const sideProject = {
  goal: "learn Rust by building something real",
  timeline: "whenever",
  outcome: "still running 2 years later"
};
\`\`\`

## My Graveyard of Good Ideas

I've killed a lot of projects. Here's a partial list:

- A CLI tool for managing dotfiles (replaced by what already existed)
- A markdown-to-Notion sync tool (Notion changed their API)
- A habit tracker (there are 10,000 of these)
- A local-first notes app (I kept using Bear)

Each one taught me something. None of them were wasted.

## The Shipping Mindset

The developer who ships imperfect things beats the developer with a perfect unfinished project every single time. Shipping is a skill. It requires accepting that v1 will be embarrassing.

Put it out there anyway. The embarrassment fades. The learning doesn't.

## Conclusion

Your side project doesn't need to make money, go viral, or be finished. It just needs to keep you building, learning, and shipping. That's the whole point.
    `,
    },
    {
        slug: "design-systems-for-engineers",
        title: "Design Systems for Engineers Who Hate CSS",
        description:
            "A practical guide to building and maintaining design systems from an engineer's perspective — tokens, component APIs, and the docs that actually get read.",
        category: "Design",
        tags: ["CSS", "Components", "Systems"],
        readingTime: 9,
        publishedAt: "2026-02-28",
        featured: false,
        emoji: "🎨",
        accentColor: "#f43f5e",
        patternType: "grid",
        author: "Bhawuk",
        authorBio:
            "Software developer passionate about AI, React, and building things people love. Writing about code, design, and everything in between.",
        content: `
## The Engineer's Relationship with CSS

Most engineers have a complicated relationship with CSS. We appreciate good design, but writing the CSS to achieve it feels like wrestling with a language that has no type system, no modules, and seemingly arbitrary behavior.

Design systems change this. When you have a good system, CSS becomes a constraint satisfaction problem — which is exactly the kind of problem engineers are good at.

## What Design Tokens Actually Are

Design tokens are the atoms of a design system. They're named values that represent design decisions.

\`\`\`css
/* Without tokens */
.button {
  background: #6366f1;
  color: white;
  border-radius: 8px;
  padding: 10px 20px;
}

/* With tokens */
.button {
  background: var(--color-primary-500);
  color: var(--color-neutral-0);
  border-radius: var(--radius-md);
  padding: var(--space-2-5) var(--space-5);
}
\`\`\`

The second version seems more verbose, but it has a superpower: change the token, and every instance updates. Dark mode becomes a matter of redefining tokens, not hunting through 200 component files.

## Component API Design

A component with a bad API is worse than no component at all. Good APIs have one mental model, handle edge cases gracefully, and make the right thing easy and the wrong thing hard.

\`\`\`typescript
// Bad API: too many booleans
<Button primary large outline disabled loading />

// Good API: variants and sizes
<Button variant="primary" size="lg" isLoading disabled />
\`\`\`

The second version is extensible without API breakage. Adding a "ghost" variant doesn't require a new boolean.

## Conclusion

Design systems are an investment that pays off at scale. Start small, be consistent, and document as you go. Your future self (and your team) will thank you.
    `,
    },
    {
        slug: "typescript-tips-i-wish-i-knew-earlier",
        title: "TypeScript Tips I Wish I Knew Earlier",
        description:
            "From conditional types to template literal types — 10 TypeScript patterns that will make your code safer, more expressive, and genuinely a pleasure to write.",
        category: "Tech",
        tags: ["TypeScript", "JavaScript", "Patterns"],
        readingTime: 11,
        publishedAt: "2026-02-20",
        featured: false,
        emoji: "⚡",
        accentColor: "#6366f1",
        patternType: "wave",
        author: "Bhawuk",
        authorBio:
            "Software developer passionate about AI, React, and building things people love. Writing about code, design, and everything in between.",
        content: `
## Why TypeScript Changed How I Think About Code

I resisted TypeScript for years. The extra verbosity felt like a tax on productivity. Then I inherited a large JavaScript codebase and spent three days debugging a bug that TypeScript would have caught at compile time.

I converted. Here's what I've learned.

## 1. Use \`satisfies\` Instead of \`as\`

\`\`\`typescript
// Dangerous: loses type information
const config = {
  host: "localhost",
  port: 3000,
} as ServerConfig;

// Safe: validates without losing inference
const config = {
  host: "localhost",
  port: 3000,
} satisfies ServerConfig;

// Now TypeScript knows config.port is a number literal 3000, not just number
\`\`\`

## 2. Template Literal Types for String Validation

\`\`\`typescript
type EventName = \`on\${Capitalize<string>}\`;
// Valid: "onClick", "onChange", "onSubmit"
// Invalid: "click", "change", "submit"

type CSSProperty = \`--\${string}\`;
// Valid: "--color-primary", "--spacing-md"
// Invalid: "color", "spacing"
\`\`\`

## 3. Discriminated Unions Beat Optional Fields

\`\`\`typescript
// Bad: optional fields create unclear states
interface ApiResponse {
  data?: User;
  error?: string;
  loading?: boolean;
}

// Good: discriminated union — only valid states possible
type ApiState =
  | { status: "loading" }
  | { status: "success"; data: User }
  | { status: "error"; error: string };
\`\`\`

This pattern eliminates an entire class of bugs where you forget to check if data exists before using it.

## Conclusion

TypeScript rewards the investment. The type system is a tool for encoding knowledge about your domain directly into the code. Use it well, and bugs become impossible by construction.
    `,
    },
    {
        slug: "on-remote-work-and-deep-focus",
        title: "On Remote Work and the Myth of Deep Focus",
        description:
            "Three years into fully remote work, here's what actually makes me productive — and why most advice about deep focus is wrong for the way we actually work.",
        category: "Life",
        tags: ["Remote", "Productivity", "Focus"],
        readingTime: 6,
        publishedAt: "2026-02-15",
        featured: false,
        emoji: "🏡",
        accentColor: "#10b981",
        patternType: "hex",
        author: "Bhawuk",
        authorBio:
            "Software developer passionate about AI, React, and building things people love. Writing about code, design, and everything in between.",
        content: `
## The Deep Focus Fantasy

Cal Newport's "Deep Work" is a great book with a premise that doesn't survive contact with modern engineering jobs. The idea that you can block off 4 uninterrupted hours every day is a fantasy for most developers in most companies.

Async communication, code review, incident response, and the general chaos of shipping software means interruptions are the job, not a distraction from it.

So what actually works?

## The 90-Minute Rule

Instead of trying to carve out half-days of focus, I aim for 90-minute blocks. Long enough to get into a real flow state, short enough to be protected from most meeting schedules.

The key: these blocks are sacred. No Slack, no email, phone on silent. But I only claim one or two per day, not six.

## Environment Design Over Willpower

Willpower is finite. Environment is permanent. Instead of relying on discipline to avoid distractions, I design my environment to make distraction harder.

- All notifications off during focus blocks (automated via calendar)
- Separate browser profile for "work" with no news, social, or distracting bookmarks
- Desk clear, headphones on, music without lyrics
- Clear written task for the block before it starts

## The Commute You Don't Have

Remote workers lose a transition ritual. The commute, for all its awfulness, was a mental buffer between "home mode" and "work mode."

Replace it deliberately. A walk, a coffee ritual, a 10-minute review of your plan for the day. Signal to your brain that context is shifting.

## Conclusion

Remote work doesn't automatically make you productive. But it gives you more control over your environment than you'll ever have in an office. Use that control intentionally.
    `,
    },
    {
        slug: "next-js-app-router-patterns",
        title: "Next.js App Router: Patterns That Actually Work",
        description:
            "After shipping three production apps with the Next.js App Router, here are the patterns that held up under real load — and the ones that seemed clever but fell apart.",
        category: "Tech",
        tags: ["Next.js", "React", "Architecture"],
        readingTime: 14,
        publishedAt: "2026-02-08",
        featured: false,
        emoji: "▲",
        accentColor: "#6366f1",
        patternType: "grid",
        author: "Bhawuk",
        authorBio:
            "Software developer passionate about AI, React, and building things people love. Writing about code, design, and everything in between.",
        content: `
## The App Router After Production Hardening

The Next.js App Router is genuinely impressive. It's also genuinely confusing until you've got the mental model. This post is about what I've learned shipping real apps with it.

## Server vs Client: The Mental Model That Helped

Think of it like this: **server components run once at render time; client components run in the browser forever**.

Server components are great for data fetching, database queries, and anything that doesn't need interactivity. Client components are for everything that needs hooks, event handlers, or browser APIs.

\`\`\`typescript
// Server Component — runs on server, access to db, no bundle size impact
// app/posts/page.tsx
export default async function PostsPage() {
  const posts = await db.posts.findMany({ orderBy: { publishedAt: 'desc' } });
  
  return (
    <div>
      {posts.map(post => (
        // PostCard is a client component for hover animations
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
\`\`\`

## The 'use client' Boundary

One gotcha that bit me early: 'use client' propagates down the component tree. If you mark a layout as client, every child is a client component too.

The solution: push the 'use client' boundary as deep as possible.

\`\`\`typescript
// Bad: entire page is client
'use client';
export default function Page() {
  const [open, setOpen] = useState(false);
  return <Layout><Modal open={open} /></Layout>;
}

// Good: only the interactive piece is client
export default function Page() {
  return <Layout><ClientModal /></Layout>; // ClientModal has 'use client'
}
\`\`\`

## Parallel Routes for Complex Layouts

Parallel routes let you render multiple pages in the same layout simultaneously. I use this for dashboard-style UIs with independently loading panels.

## Conclusion

The App Router rewards understanding over intuition. Invest the time to grok server vs client components, and it becomes a genuinely powerful model for building fast apps.
    `,
    },
    {
        slug: "prompt-engineering-is-not-what-you-think",
        title: "Prompt Engineering Is Not What You Think",
        description:
            "Everyone is talking about prompt engineering, but most of the discourse misses the point. It's not about magic phrases — it's about communication design.",
        category: "AI",
        tags: ["LLM", "Prompting", "AI"],
        readingTime: 8,
        publishedAt: "2026-01-30",
        featured: false,
        emoji: "🧠",
        accentColor: "#a855f7",
        patternType: "circuit",
        author: "Bhawuk",
        authorBio:
            "Software developer passionate about AI, React, and building things people love. Writing about code, design, and everything in between.",
        content: `
## The Hype and the Reality

"Prompt engineering" has become a loaded term. On one end: articles claiming it's a million-dollar skill that will replace software engineering. On the other: dismissals saying it's just typing nice sentences to a chatbot.

Both are wrong. Here's what it actually is.

## It's Communication Design

Prompting is the art of communicating intent to a system that understands language but not context. When a prompt works well, it's because you've given the model everything it needs to succeed. When it fails, something was ambiguous or missing.

\`\`\`
❌ Bad: "Write me a blog post"

✅ Better: "Write a 600-word blog post for a technical audience about X.
  Use short paragraphs, include one concrete code example, and structure it as:
  intro → problem → solution → conclusion.
  Tone: direct and practical, no filler phrases."
\`\`\`

The difference isn't a magic keyword. It's specificity and constraint.

## Chain-of-Thought Is Real

There's solid evidence that asking models to reason step-by-step before answering improves accuracy on complex tasks. This isn't magic — it's giving the model space to work through the problem, just like a person benefits from writing out their reasoning.

\`\`\`python
# Without chain-of-thought
prompt = "What is 23 × 47?"
# Model: "1081" (likely wrong, or lucky)

# With chain-of-thought
prompt = "What is 23 × 47? Think step by step."
# Model: "23 × 40 = 920, 23 × 7 = 161, 920 + 161 = 1081"
# More reliable, and you can verify the reasoning
\`\`\`

## The Practical Skills

Real prompt engineering skills:

1. **Role definition** — tell the model who it is and what expertise it has
2. **Output format specification** — JSON, markdown, plain text, structure
3. **Constraint setting** — what to avoid, what to include, tone and length
4. **Few-shot examples** — showing rather than just telling
5. **Iterative refinement** — treating prompts like code: version, test, improve

## Conclusion

Prompt engineering isn't magic, and it isn't trivial. It's the skill of clear communication, applied to a new kind of system. Developers who are good at specifying requirements are already halfway there.
    `,
    },
    {
        slug: "negotiating-your-tech-salary",
        title: "Negotiating Your Tech Salary: A Developer's Playbook",
        description:
            "The framework I used to increase my compensation by 40% across two job changes — including the exact scripts, research methods, and mental models that work.",
        category: "Career",
        tags: ["Salary", "Negotiation", "Career"],
        readingTime: 10,
        publishedAt: "2026-01-22",
        featured: false,
        emoji: "💼",
        accentColor: "#f59e0b",
        patternType: "dots",
        author: "Bhawuk",
        authorBio:
            "Software developer passionate about AI, React, and building things people love. Writing about code, design, and everything in between.",
        content: `
## The Money Conversation Nobody Teaches You

Engineering bootcamps and CS degrees teach you to code. Nobody teaches you to negotiate. This is a massive oversight, because the salary you negotiate at each job compounds over your entire career.

A $10K raise at 25 isn't $10K. If you stay in tech for 30 years, it's potentially $300K+ in cumulative salary alone — more when you factor in compounding retirement contributions.

Let's fix the gap.

## Research First, Talk Second

Never go into a salary conversation without data. Use:

- **Levels.fyi** for total comp at specific companies and levels
- **Glassdoor** for salary ranges (take with grain of salt, but useful)
- **LinkedIn Easy Apply** — if a job posts a range, it tells you what they actually pay
- **Personal network** — ask peers directly (this is more normal than you think)

Your target should be the 75th percentile for your role, level, and market.

## The Number You Say First

There's debate about who should name a number first. My view: name it first if you've done your research, because anchoring works.

Rules:
- Never give a range (they'll offer the bottom)
- Give a specific number (exact numbers seem more researched)
- Go 15-20% above what you'd actually accept

\`\`\`
❌ "I'm looking for somewhere in the $150-170K range"
✅ "Based on my research and experience, I'm targeting $175,000"
\`\`\`

## The Counter-Offer Script

When you get an offer lower than your target:

> "Thank you — I'm genuinely excited about this role. The offer is a bit below where I was hoping to land based on my research into market rates for this level. Is there flexibility to get to [target number]?"

Then stop talking. Let the silence work.

## Conclusion

Negotiation is a skill, not a personality trait. Prepare, practice, and remember: the company expects you to negotiate. They build room into offers for exactly this reason.
    `,
    },
];

export function getPostBySlug(slug: string): Post | undefined {
    return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category: Category): Post[] {
    return posts
        .filter((p) => p.slug !== currentSlug && p.category === category)
        .slice(0, 3);
}
