'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
    code: string;
    language?: string;
}

export default function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const [highlighted, setHighlighted] = useState<string>('');

    useEffect(() => {
        // Simple client-side syntax highlighting using CSS classes
        setHighlighted(code);
    }, [code]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Simple tokenizer for display
    const tokenize = (src: string) => {
        const lines = src.split('\n');
        return lines.map((line, i) => (
            <div key={i} className="table-row">
                <span
                    className="table-cell pr-4 select-none text-right"
                    style={{ color: 'var(--text-muted)', minWidth: '2.5rem', fontSize: '0.75rem' }}
                >
                    {i + 1}
                </span>
                <span className="table-cell">{colorize(line)}</span>
            </div>
        ));
    };

    const colorize = (line: string) => {
        // Very basic syntax coloring
        const keywords = /\b(const|let|var|function|async|await|return|if|else|for|while|class|interface|type|import|export|from|default|extends|implements|new|this|typeof|instanceof|void|null|undefined|true|false|try|catch|throw|in|of|do|switch|case|break|continue)\b/g;
        const strings = /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g;
        const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
        const numbers = /\b(\d+\.?\d*)\b/g;

        // Return as colored spans
        return <ColorizedLine line={line} />;
    };

    return (
        <motion.div
            className="code-block-wrapper relative rounded-xl overflow-hidden my-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
                background: '#0d0d14',
                border: '1px solid rgba(255,255,255,0.08)',
            }}
        >
            {/* Header bar */}
            <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
            >
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#27c840' }} />
                </div>

                <div className="flex items-center gap-3">
                    {/* Language badge */}
                    <span
                        className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{
                            background: 'rgba(99,102,241,0.2)',
                            color: '#818cf8',
                            border: '1px solid rgba(99,102,241,0.3)',
                        }}
                    >
                        {language}
                    </span>

                    {/* Copy button */}
                    <motion.button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded"
                        style={{
                            background: copied ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.06)',
                            color: copied ? '#10b981' : 'var(--text-muted)',
                            border: copied ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.08)',
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                    >
                        <motion.span
                            key={copied ? 'check' : 'copy'}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.15 }}
                        >
                            {copied ? <Check size={11} /> : <Copy size={11} />}
                        </motion.span>
                        {copied ? 'Copied!' : 'Copy'}
                    </motion.button>
                </div>
            </div>

            {/* Code content */}
            <div className="overflow-x-auto p-4">
                <pre className="text-sm leading-relaxed">
                    <code className="table">{tokenize(code)}</code>
                </pre>
            </div>
        </motion.div>
    );
}

function ColorizedLine({ line }: { line: string }) {
    // Simple regex-based colorizer
    if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
        return <span style={{ color: '#5c6370', fontStyle: 'italic' }}>{line}</span>;
    }

    const parts: React.ReactNode[] = [];
    let remaining = line;
    let key = 0;

    const patterns: Array<{ regex: RegExp; color: string }> = [
        { regex: /^(\s*)(const|let|var|function|async|await|return|if|else|for|while|class|interface|type|import|export|from|default|extends|new|this|typeof|null|undefined|true|false|try|catch|throw)\b/, color: '#c792ea' },
        { regex: /^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/, color: '#c3e88d' },
        { regex: /^(\b\d+\.?\d*\b)/, color: '#f78c6c' },
        { regex: /^([A-Z][a-zA-Z0-9]*)/, color: '#82aaff' },
        { regex: /^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/, color: '#82aaff' },
        { regex: /^([=><!+\-*/%&|^~?:]+)/, color: '#89ddff' },
        { regex: /^([{}[\](),;.])/, color: '#89ddff' },
    ];

    while (remaining.length > 0) {
        let matched = false;
        for (const { regex, color } of patterns) {
            const m = remaining.match(regex);
            if (m) {
                const matchStr = m[0];
                // handle leading whitespace
                const wsMatch = matchStr.match(/^\s+/);
                if (wsMatch && wsMatch[0] !== matchStr) {
                    parts.push(<span key={key++}>{wsMatch[0]}</span>);
                    parts.push(<span key={key++} style={{ color }}>{matchStr.slice(wsMatch[0].length)}</span>);
                } else {
                    parts.push(<span key={key++} style={color ? { color } : {}}>{matchStr}</span>);
                }
                remaining = remaining.slice(matchStr.length);
                matched = true;
                break;
            }
        }
        if (!matched) {
            parts.push(<span key={key++} style={{ color: '#e8e8f0' }}>{remaining[0]}</span>);
            remaining = remaining.slice(1);
        }
    }

    return <>{parts}</>;
}
