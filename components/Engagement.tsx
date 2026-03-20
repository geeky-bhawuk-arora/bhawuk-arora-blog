'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, MessageSquare, Send, User, ThumbsUp, RefreshCcw } from 'lucide-react';
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
    const [voteEmail, setVoteEmail] = useState('');
    const [showVoteEmail, setShowVoteEmail] = useState(false);
    const [pendingVote, setPendingVote] = useState<number | null>(null);
    const [voteError, setVoteError] = useState<string | null>(null);

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const generateRandomName = () => {
        const adjectives = ['Quantum', 'Digital', 'Silent', 'Azure', 'Neon', 'Cosmic', 'Solar', 'Lunar', 'Prismatic', 'Phantom', 'Stellar', 'Wandering'];
        const animals = ['Raven', 'Wolf', 'Fox', 'Phoenix', 'Panda', 'Eagle', 'Owl', 'Lynx', 'Falcon', 'Panther', 'Cyborg', 'Voyager'];
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const ani = animals[Math.floor(Math.random() * animals.length)];
        const num = Math.floor(Math.random() * 999);
        setName(`${adj} ${ani} ${num}`);
    };

    // Initialize with a random name
    useState(() => {
        generateRandomName();
    });

    const initiateVote = (val: number) => {
        if (userVote !== 0 || isVoting) return;
        setPendingVote(val);
        setShowVoteEmail(true);
        setVoteError(null);
    };

    const handleVote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!voteEmail || pendingVote === null || isVoting) return;
        
        setIsVoting(true);
        setVoteError(null);
        try {
            await addRating(postId, slug, pendingVote, voteEmail);
            setUserVote(pendingVote);
            setShowVoteEmail(false);
        } catch (e: any) {
            setVoteError(e.message || "Something went wrong while voting");
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
            <div className="flex flex-col gap-12 sm:gap-20">
                
                {/* Minimal Voting Section */}
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-6 p-2 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] shadow-sm mb-6">
                        <button
                            type="button"
                            disabled={userVote !== 0 || isVoting}
                            onClick={() => initiateVote(1)}
                            className={`p-3 rounded-xl transition-all ${userVote === 1 ? 'bg-green-500/10 text-green-500' : 'hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-green-500'}`}
                        >
                            <ArrowUp size={22} className={userVote === 1 ? 'fill-green-500' : ''} />
                        </button>
                        
                        <div className="flex flex-col">
                            <span className={`text-2xl font-black tabular-nums transition-colors ${score > 0 ? 'text-green-500' : score < 0 ? 'text-red-500' : 'text-[var(--text-primary)]'}`}>
                                {score > 0 ? `+${score}` : score}
                            </span>
                        </div>

                        <button
                            type="button"
                            disabled={userVote !== 0 || isVoting}
                            onClick={() => initiateVote(-1)}
                            className={`p-3 rounded-xl transition-all ${userVote === -1 ? 'bg-red-500/10 text-red-500' : 'hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-red-500'}`}
                        >
                            <ArrowDown size={22} className={userVote === -1 ? 'fill-red-500' : ''} />
                        </button>
                    </div>

                    <AnimatePresence>
                        {showVoteEmail && !userVote && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="max-w-xs w-full bg-[var(--bg-card)] border border-blue-500/30 p-6 rounded-2xl shadow-2xl relative"
                            >
                                <button onClick={() => setShowVoteEmail(false)} className="absolute top-3 right-3 text-[var(--text-muted)] hover:text-white">✕</button>
                                <p className="text-xs font-bold text-[var(--text-primary)] mb-3 uppercase tracking-widest">Verify Email to Vote</p>
                                <form onSubmit={handleVote} className="flex flex-col gap-3">
                                    <input 
                                        required
                                        type="email"
                                        placeholder="your@email.com"
                                        value={voteEmail}
                                        onChange={(e) => setVoteEmail(e.target.value)}
                                        className="w-full px-4 py-2 text-sm rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] outline-none focus:border-blue-500 transition-colors"
                                    />
                                    {voteError && <p className="text-[10px] text-red-500 font-medium">{voteError}</p>}
                                    <button 
                                        type="submit"
                                        disabled={isVoting}
                                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs transition-colors shadow-lg shadow-blue-500/20"
                                    >
                                        {isVoting ? 'Verifying...' : 'Submit Vote'}
                                    </button>
                                </form>
                            </motion.div>
                        )}
                        {userVote !== 0 && (
                            <motion.p 
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs font-bold text-[var(--accent-blue)]"
                            >
                                Thanks for your feedback!
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <div className="mt-4 text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-widest">
                        {totalVotes} community votes cast
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
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
                                        readOnly
                                        required
                                        type="text"
                                        placeholder="Generating name..."
                                        value={name}
                                        className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--accent-blue)] font-bold outline-none cursor-default text-sm shadow-inner pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={generateRandomName}
                                        title="Regenerate Anonymous Name"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-blue-500 transition-all border border-transparent hover:border-[var(--border)]"
                                    >
                                        <RefreshCcw size={16} className={isSubmitting ? 'animate-spin' : ''} />
                                    </button>
                                    <span className="absolute -top-5 left-1 text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Random Anonymous Username</span>
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

                    <div className="hidden lg:flex items-center justify-center p-8 rounded-3xl bg-[var(--bg-elevated)]/30 border border-dashed border-[var(--border)]">
                        <div className="text-center space-y-4 max-w-xs">
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mx-auto">
                                <ThumbsUp size={32} />
                            </div>
                            <h4 className="font-bold text-[var(--text-primary)]">Community Guidelines</h4>
                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                Share your thoughts with the community. Be respectful, supportive, and curious.
                            </p>
                        </div>
                    </div>
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
