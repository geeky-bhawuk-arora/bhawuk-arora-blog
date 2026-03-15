'use client';

import { togglePostEnabled } from '@/app/admin/actions';
import { useState } from 'react';

export default function ToggleButton({ id, enabled }: { id: string; enabled: boolean }) {
    const [isEnabled, setIsEnabled] = useState(enabled);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async () => {
        setIsLoading(true);
        try {
            await togglePostEnabled(id, !isEnabled);
            setIsEnabled(!isEnabled);
        } catch (err) {
            alert('Failed to toggle post: ' + (err instanceof Error ? err.message : 'Unknown error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            title={isEnabled ? 'Click to disable post' : 'Click to enable post'}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 ${
                isEnabled
                    ? 'bg-emerald-500'
                    : 'bg-[var(--bg-elevated)] border-[var(--border)]'
            }`}
        >
            <span className="sr-only">{isEnabled ? 'Disable' : 'Enable'} post</span>
            <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    isEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
        </button>
    );
}
