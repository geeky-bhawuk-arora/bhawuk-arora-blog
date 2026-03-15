'use client';

import { togglePostFeatured } from '@/app/admin/actions';
import { useState } from 'react';
import { Star } from 'lucide-react';

export default function FeaturedButton({ id, featured }: { id: string; featured: boolean }) {
    const [isFeatured, setIsFeatured] = useState(featured);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async () => {
        setIsLoading(true);
        try {
            await togglePostFeatured(id, !isFeatured);
            setIsFeatured(!isFeatured);
        } catch (err) {
            alert('Failed to toggle featured: ' + (err instanceof Error ? err.message : 'Unknown error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            title={isFeatured ? 'Remove from featured' : 'Mark as featured'}
            className={`p-2 rounded-lg transition-all ${
                isFeatured
                    ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20'
                    : 'text-[var(--text-muted)] hover:text-amber-400 hover:bg-[var(--bg-elevated)]'
            } ${isLoading ? 'opacity-50' : ''}`}
        >
            <Star size={16} fill={isFeatured ? 'currentColor' : 'none'} />
        </button>
    );
}
