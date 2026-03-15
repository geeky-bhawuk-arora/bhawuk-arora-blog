'use client';

import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Github, Linkedin, Mail, MessageSquare, User, AtSign, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const ContactForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => setIsSubmitted(false), 8000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitted]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!formRef.current) return;

        emailjs
            .sendForm(
                "service_r3d3clv",
                "template_61u37om",
                formRef.current,
                "kCjs4Oa7WYESJHpxp"
            )
            .then(
                () => {
                    setIsSubmitting(false);
                    setIsSubmitted(true);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                },
                (error) => {
                    console.error("❌ Error:", error);
                    setIsSubmitting(false);
                    alert("Failed to send message. Please try again later.");
                }
            );
    };

    return (
        <div className="w-full">
            <AnimatedSection delay={100}>
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        OPEN FOR COLLABORATION
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] font-['Space_Grotesk'] tracking-tight mb-6">
                        Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">extraordinary.</span>
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg max-w-2xl leading-relaxed">
                        Have a question, a project idea, or just want to say hi? My inbox is always open.
                    </p>
                </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Info Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <AnimatedSection delay={200}>
                        <div className="p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] relative overflow-hidden group h-full">
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-8 font-['Space_Grotesk'] flex items-center gap-2">
                                <span className="w-8 h-1 bg-[var(--accent-blue)] rounded-full" />
                                Contact Info
                            </h3>

                            <div className="space-y-8 relative z-10">
                                <ContactLink
                                    icon={<Mail size={20} />}
                                    label="Email me at"
                                    value="hello@bhawuk.dev"
                                    href="mailto:hello@bhawuk.dev"
                                />
                                <ContactLink
                                    icon={<Github size={20} />}
                                    label="Follow on GitHub"
                                    value="github.com/bhawuk"
                                    href="https://github.com/bhawuk"
                                />
                                <ContactLink
                                    icon={<Linkedin size={20} />}
                                    label="Connect on LinkedIn"
                                    value="linkedin.com/in/bhawuk"
                                    href="https://linkedin.com/in/bhawuk"
                                />
                            </div>

                            <div className="mt-12 p-6 rounded-2xl bg-[var(--bg)] border border-[var(--border)] relative">
                                <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed">
                                    "I typically respond within 24 hours. Looking forward to hearing from you!"
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>

                {/* Form Area */}
                <div className="lg:col-span-8">
                    <AnimatedSection delay={300}>
                        <div className="p-1 md:p-1.5 rounded-[2rem] bg-gradient-to-br from-[var(--border)] via-[var(--border)] to-blue-500/20 shadow-2xl transition-all duration-500 hover:shadow-blue-500/10 hover:to-blue-500/30">
                            <div className="bg-[var(--bg-card)] rounded-[1.8rem] p-8 md:p-12 relative overflow-hidden">

                                <AnimatePresence mode="wait">
                                    {!isSubmitted ? (
                                        <motion.form
                                            key="contact-form"
                                            ref={formRef}
                                            onSubmit={handleSubmit}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="space-y-8"
                                        >
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <InputGroup
                                                    icon={<User size={18} />}
                                                    label="Name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="John Doe"
                                                />
                                                <InputGroup
                                                    icon={<AtSign size={18} />}
                                                    label="Email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="john@example.com"
                                                />
                                            </div>

                                            <InputGroup
                                                icon={<MessageSquare size={18} />}
                                                label="Subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                placeholder="Project discussion..."
                                            />

                                            <div className="space-y-3">
                                                <label className="flex items-center gap-2 text-sm font-bold text-[var(--text-secondary)] font-mono uppercase tracking-wider ml-1">
                                                    Message
                                                </label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    rows={6}
                                                    required
                                                    placeholder="Tell me about your vision..."
                                                    className="w-full bg-[var(--bg)] border-2 border-[var(--border)] rounded-2xl px-6 py-4 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] focus:ring-4 focus:ring-[var(--accent-blue)]/10 transition-all resize-none leading-relaxed"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="group w-full relative overflow-hidden h-16 rounded-2xl bg-white text-black font-bold text-lg transition-transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                                            >
                                                <span className="relative z-10 flex items-center gap-3">
                                                    {isSubmitting ? (
                                                        <>
                                                            <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Send Message
                                                            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                        </>
                                                    )}
                                                </span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <div className="absolute inset-0 bg-white opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                            </button>
                                        </motion.form>
                                    ) : (
                                        <motion.div
                                            key="success-message"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="py-20 flex flex-col items-center text-center"
                                        >
                                            <div className="w-24 h-24 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-8 relative">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 2 }}
                                                    className="absolute inset-0 rounded-full border border-green-500/30"
                                                />
                                                <CheckCircle size={48} />
                                            </div>
                                            <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4 font-['Space_Grotesk']">Message Received!</h3>
                                            <p className="text-[var(--text-secondary)] text-lg max-w-sm mb-10 leading-relaxed">
                                                Thanks for reaching out, Bhawuk. Your message is in my inbox. I'll get back to you soon!
                                            </p>
                                            <button
                                                onClick={() => setIsSubmitted(false)}
                                                className="flex items-center gap-2 text-[var(--accent-blue)] font-bold hover:gap-3 transition-all"
                                            >
                                                Send another message <ArrowRight size={18} />
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
};

const InputGroup = ({ icon, label, ...props }: any) => (
    <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-bold text-[var(--text-secondary)] font-mono uppercase tracking-wider ml-1">
            <span className="text-[var(--accent-blue)]">{icon}</span>
            {label}
        </label>
        <input
            required
            className="w-full bg-[var(--bg)] border-2 border-[var(--border)] rounded-2xl px-6 py-4 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] focus:ring-4 focus:ring-[var(--accent-blue)]/10 transition-all font-medium"
            {...props}
        />
    </div>
);

const ContactLink = ({ icon, label, value, href }: { icon: any, label: string, value: string, href: string }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group/link">
        <div className="w-12 h-12 rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] group-hover/link:text-[var(--accent-blue)] group-hover/link:border-[var(--accent-blue)]/50 transition-all duration-300">
            {icon}
        </div>
        <div>
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">{label}</p>
            <p className="text-[var(--text-primary)] font-bold group-hover/link:text-[var(--accent-blue)] transition-colors">{value}</p>
        </div>
    </a>
);

export default ContactForm;
