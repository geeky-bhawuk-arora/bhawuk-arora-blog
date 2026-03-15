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
                <div className="flex flex-col mb-16 max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-bold text-[var(--text-primary)] font-['Space_Grotesk'] tracking-tight mb-8 leading-[0.9]">
                        Connect / <br />
                        <span className="text-[var(--accent-blue)]">Collaborate.</span>
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg leading-relaxed border-l-2 border-[var(--border)] pl-6">
                        I'm currently focused on MLOps and cloud architecture. If you have a project that requires scalable infrastructure or automation pipelines, let's talk.
                    </p>
                </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Info Sidebar */}
                <div className="lg:col-span-4 space-y-10">
                    <AnimatedSection delay={200}>
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase tracking-[0.3em] mb-8 border-b border-[var(--border)] pb-2 flex items-center justify-between">
                                    Engineering Req <span>01</span>
                                </h3>
                                <div className="space-y-8">
                                    <ContactLink
                                        icon={<Mail size={18} />}
                                        label="Primary Channel"
                                        value="bhawuk.arora008@gmail.com"
                                        href="mailto:bhawuk.arora008@gmail.com"
                                    />
                                    <ContactLink
                                        icon={<Github size={18} />}
                                        label="Source Code"
                                        value="github/geeky-bhawuk-arora"
                                        href="https://github.com/geeky-bhawuk-arora"
                                    />
                                    <ContactLink
                                        icon={<Linkedin size={18} />}
                                        label="Professional Network"
                                        value="linkedin/in/bhawuk-arora"
                                        href="https://linkedin.com/in/bhawuk-arora"
                                    />
                                </div>
                            </div>

                            <div className="pt-8 border-t border-[var(--border)]">
                                <h3 className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase tracking-[0.3em] mb-6">Operational Status</h3>
                                <div className="flex items-center gap-3 text-xs font-mono text-green-400 bg-green-400/5 border border-green-400/10 px-4 py-2 rounded-lg w-fit">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Available for New Projects
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>

                {/* Form Area */}
                <div className="lg:col-span-8">
                    <AnimatedSection delay={300}>
                        <div className="relative group">
                            {/* Technical Grid Background Effect */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] bg-[size:32px_32px] opacity-20" />

                            <div className="relative bg-[var(--bg-card)]/50 border border-[var(--border)] rounded-2xl p-8 md:p-10 backdrop-blur-sm">
                                <div className="mb-10 flex items-center justify-between border-b border-[var(--border)] pb-4">
                                    <h3 className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase tracking-[0.3em]">Communication Protocol</h3>
                                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase opacity-50">Secure Handshake / TLS 1.3</span>
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
                                                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-2xl px-6 py-4 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]/50 focus:ring-4 focus:ring-[var(--accent-blue)]/5 transition-all resize-none leading-relaxed"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="group w-full relative h-14 rounded-xl bg-[var(--accent-blue)] hover:bg-blue-600 text-white font-bold text-base transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message
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
            className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-2xl px-6 py-4 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]/50 focus:ring-4 focus:ring-[var(--accent-blue)]/5 transition-all font-medium"
            {...props}
        />
    </div>
);

const ContactLink = ({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href: string }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group/link py-1">
        <div className="w-10 h-10 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] group-hover/link:text-[var(--accent-blue)] group-hover/link:border-[var(--accent-blue)]/50 transition-all duration-300 shrink-0">
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest mb-1">{label}</p>
            <p className="text-sm text-[var(--text-primary)] font-bold group-hover/link:text-[var(--accent-blue)] transition-colors truncate">{value}</p>
        </div>
    </a>
);

export default ContactForm;
