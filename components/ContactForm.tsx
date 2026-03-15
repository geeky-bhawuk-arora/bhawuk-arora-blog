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
                <div className="flex flex-col mb-12 max-w-xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-4">
                        Connect / <span className="text-[var(--accent-blue)]">Collaborate.</span>
                    </h1>
                    <p className="text-[var(--text-secondary)] text-base leading-relaxed border-l-2 border-[var(--border)] pl-4">
                        Focusing on MLOps and cloud architecture. If you have a project that requires scalable infrastructure or automation, let's talk.
                    </p>
                </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Info Sidebar */}
                <div className="lg:col-span-5 space-y-8">
                    <AnimatedSection delay={200}>
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-[0.3em] mb-6 border-b border-[var(--border)] pb-2 flex items-center justify-between">
                                    Engineering Req <span>01</span>
                                </h3>
                                <div className="space-y-6">
                                    <ContactLink
                                        icon={<Mail size={18} />}
                                        label="Primary Channel"
                                        value="bhawuk.arora"
                                        href="mailto:bhawuk.arora008@gmail.com"
                                    />
                                    <ContactLink
                                        icon={<Github size={18} />}
                                        label="Source Code"
                                        value="github/geeky-bhawuk"
                                        href="https://github.com/geeky-bhawuk-arora"
                                    />
                                    <ContactLink
                                        icon={<Linkedin size={18} />}
                                        label="Human Network"
                                        value="linkedin/in/bhawuk"
                                        href="https://linkedin.com/in/bhawuk-arora"
                                    />
                                </div>
                            </div>

                            <div className="pt-8 border-t border-[var(--border)]">
                                <h3 className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-[0.3em] mb-4">Availability</h3>
                                <div className="flex items-center gap-3 text-xs font-mono text-green-400 bg-green-500/5 border border-green-500/10 px-4 py-2 rounded-lg w-fit">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Available for Projects
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>

                {/* Form Area */}
                <div className="lg:col-span-7">
                    <AnimatedSection delay={300}>
                        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 shadow-sm">
                            <div className="mb-8 flex items-center justify-between border-b border-[var(--border)] pb-3">
                                <h3 className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">Communication Protocol</h3>
                                <span className="text-[8px] font-mono text-[var(--text-muted)] uppercase opacity-50">Secure Handshake</span>
                            </div>

                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.form
                                        key="contact-form"
                                        ref={formRef}
                                        onSubmit={handleSubmit}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <InputGroup
                                                icon={<User size={18} />}
                                                label="Identity"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Name"
                                            />
                                            <InputGroup
                                                icon={<AtSign size={18} />}
                                                label="Endpoint"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Email"
                                            />
                                        </div>

                                        <InputGroup
                                            icon={<MessageSquare size={18} />}
                                            label="Subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            placeholder="Subject"
                                        />

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1">
                                                Payload
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                rows={5}
                                                required
                                                placeholder="Message content..."
                                                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]/50 focus:ring-4 focus:ring-[var(--accent-blue)]/5 transition-all resize-none leading-relaxed"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="group w-full relative h-14 rounded-xl bg-[var(--accent-blue)] hover:bg-blue-600 text-white font-bold transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Dispatching...
                                                </>
                                            ) : (
                                                <>
                                                    Execute Send
                                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success-message"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="py-12 flex flex-col items-center text-center"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-6">
                                            <CheckCircle size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Success</h3>
                                        <p className="text-[var(--text-secondary)] text-sm max-w-xs mb-8">
                                            Message successfully pushed to the inbox. I'll get back to you shortly.
                                        </p>
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            className="text-[var(--accent-blue)] font-bold text-sm hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
};

const InputGroup = ({ icon, label, ...props }: any) => (
    <div className="space-y-3">
        <label className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1">
            {label}
        </label>
        <div className="relative group/input">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within/input:text-[var(--accent-blue)] transition-colors">
                {icon}
            </div>
            <input
                required
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl pl-12 pr-6 py-4 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]/50 focus:ring-4 focus:ring-[var(--accent-blue)]/5 transition-all"
                {...props}
            />
        </div>
    </div>
);

const ContactLink = ({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href: string }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group/link">
        <div className="w-12 h-12 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] group-hover/link:text-[var(--accent-blue)] group-hover/link:border-[var(--accent-blue)]/50 transition-all duration-300 shrink-0">
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest mb-1">{label}</p>
            <p className="text-base text-[var(--text-primary)] font-bold group-hover/link:text-[var(--accent-blue)] transition-colors truncate">{value}</p>
        </div>
    </a>
);

export default ContactForm;
