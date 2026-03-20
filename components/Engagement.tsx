'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, MessageSquare, Send, User, ThumbsUp } from 'lucide-react';
import { addComment, addRating } from '@/app/blog/[slug]/engagement-actions';

interface Comment {
    id: string;
    parent_id?: string | null;
    user_name: string;
    content: string;
    created_at: string;
}

interface EngagementProps {
    postId: string;
    slug: string;
    comments: Comment[];
    score: number;
    totalVotes: number;
}

function CommentItem({ 
    comment, 
    onReply, 
    replies = [] 
}: { 
    comment: Comment; 
    onReply: (parentId: string, name: string) => void;
    replies?: Comment[];
}) {
    return (
        <div className="flex flex-col gap-4">
            <motion.div
                initial={{ opacity: 0, y: 10, backgroundColor: 'rgba(0,0,0,0)' }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                className="p-5 rounded-2xl bg-[var(--bg-card)]/50 border border-[var(--border)] group transition-colors duration-300"
            >
                <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col">
                        <span className="font-bold text-[var(--text-primary)]">{comment.user_name}</span>
                        <span className="text-[10px] text-[var(--text-muted)] font-mono uppercase">
                            {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {comment.content}
                </p>
                <button 
                    onClick={() => onReply(comment.id, comment.user_name)}
                    className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-blue)] hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    Reply
                </button>
            </motion.div>

            {replies.length > 0 && (
                <div className="ml-8 pl-8 border-l border-[var(--border)] flex flex-col gap-4">
                    {replies.map(reply => (
                        <CommentItem key={reply.id} comment={reply} onReply={onReply} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Engagement({ postId, slug, comments, score, totalVotes }: EngagementProps) {
    const [userVote, setUserVote] = useState<number>(0);
    const [isVoting, setIsVoting] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleVote = async (val: number) => {
        if (userVote !== 0 || isVoting) return;
        setUserVote(val);
        setIsVoting(true);
        try {
            await addRating(postId, slug, val);
        } catch (e) {
            console.error(e);
            setUserVote(0);
        } finally {
            setIsVoting(false);
        }
    };

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !message || isSubmitting) return;
        setIsSubmitting(true);
        try {
            await addComment(postId, slug, name, message, replyTo?.id);
            setName('');
            setMessage('');
            setReplyTo(null);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    const topLevelComments = comments.filter(c => !c.parent_id);
    const getReplies = (parentId: string) => comments.filter(c => c.parent_id === parentId);

    return (
        <section className="mt-20 pt-20 border-t border-[var(--border)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
                
                {/* Voting Section */}
                <div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-3">
                        <ThumbsUp className="text-[var(--accent-blue)]" size={24} />
                        Community Score
                    </h3>
                    <div className="bg-[var(--bg-card)] border border-[var(--border)] p-8 rounded-3xl shadow-xl shadow-black/20">
                        <div className="flex items-center gap-6 mb-8">
                            <div className={`text-6xl font-black ${score > 0 ? 'text-green-500' : score < 0 ? 'text-red-500' : 'text-[var(--text-muted)]'}`}>
                                {score > 0 ? `+${score}` : score}
                            </div>
                            <div className="text-sm text-[var(--text-secondary)] leading-tight">
                                Overall Score<br />
                                <span className="text-[var(--text-muted)] font-mono text-[11px] tracking-tighter">{totalVotes} community votes</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="text-xs font-bold text-[var(--accent-blue)] uppercase tracking-[0.2em]">Was this worth reading?</p>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    disabled={userVote !== 0 || isVoting}
                                    onClick={() => handleVote(1)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 transition-all ${userVote === 1 ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-[var(--bg-elevated)] border-[var(--border)] hover:border-green-500/50 hover:text-green-500 text-[var(--text-secondary)]'}`}
                                >
                                    <ArrowUp size={24} className={userVote === 1 ? 'animate-bounce' : ''} />
                                    <span className="font-bold">Useful</span>
                                </button>
                                <button
                                    type="button"
                                    disabled={userVote !== 0 || isVoting}
                                    onClick={() => handleVote(-1)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 transition-all ${userVote === -1 ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-[var(--bg-elevated)] border-[var(--border)] hover:border-red-500/50 hover:text-red-500 text-[var(--text-secondary)]'}`}
                                >
                                    <ArrowDown size={24} className={userVote === -1 ? 'animate-bounce' : ''} />
                                    <span className="font-bold text-sm">Not for me</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comment Form Section */}
                <div id="comment-form">
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-3">
                        <MessageSquare className="text-blue-500" size={24} />
                        {replyTo ? `Replying to @${replyTo.name}` : 'Join the Discussion'}
                    </h3>
                    <form onSubmit={handleComment} className="flex flex-col gap-4">
                        {replyTo && (
                            <div className="flex items-center justify-between px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs text-blue-400">
                                <span>Replying to {replyTo.name}</span>
                                <button onClick={() => setReplyTo(null)} className="hover:text-white underline">Cancel</button>
                            </div>
                        )}
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0">
                                {name ? name.charAt(0).toUpperCase() : '?'}
                            </div>
                            <div className="flex-1 relative group">
                                <input
                                    required
                                    type="text"
                                    minLength={2}
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-blue-500 transition-all text-sm shadow-inner"
                                />
                                {name && name.length < 2 && (
                                    <span className="absolute -bottom-5 left-1 text-[10px] text-red-500 font-medium">Please enter a valid name</span>
                                )}
                            </div>
                        </div>
                        <textarea
                            required
                            rows={4}
                            placeholder="Share your perspective..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-5 py-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-blue-500 transition-all text-sm resize-none shadow-inner mt-2"
                        ></textarea>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-sm transition-all shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            {isSubmitting ? 'Sending...' : replyTo ? 'Post Reply' : 'Post Comment'}
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Comments List */}
            <div className="mt-24 max-w-4xl">
                <div className="flex items-center justify-between mb-12">
                    <h4 className="text-xs font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">
                        Responses ({comments.length})
                    </h4>
                </div>
                
                <div className="flex flex-col gap-8">
                    {topLevelComments.length > 0 ? (
                        topLevelComments.map((comment) => (
                            <CommentItem 
                                key={comment.id} 
                                comment={comment} 
                                onReply={(id, name) => {
                                    setReplyTo({ id, name });
                                    document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                replies={getReplies(comment.id)}
                            />
                        ))
                    ) : (
                        <div className="py-12 px-6 rounded-3xl border border-dashed border-[var(--border)] text-center">
                            <p className="text-sm text-[var(--text-muted)] italic">No responses yet. Be the first to start the conversation!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
