'use client';

import { Trash2 } from 'lucide-react';
import { deletePost } from '@/app/admin/actions';
import { useState } from 'react';

export default function DeleteButton({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        setIsDeleting(true);
        try {
            await deletePost(id);
        } catch (err) {
            alert('Failed to delete post: ' + (err instanceof Error ? err.message : 'Unknown error'));
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`p-2 transition-colors ${isDeleting ? 'text-gray-500' : 'text-[var(--text-secondary)] hover:text-red-500'}`}
        >
            <Trash2 size={16} />
        </button>
    );
}
