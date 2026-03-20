'use client';

import { useEffect, useRef, useState } from 'react'
import { logout } from '@/app/login/actions'
import { Clock } from 'lucide-react'

const TEN_MINUTES = 10 * 60 * 1000

export default function IdleTimer() {
    const [timeLeft, setTimeLeft] = useState(TEN_MINUTES)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const lastActivityRef = useRef<number>(Date.now())

    const resetTimer = () => {
        lastActivityRef.current = Date.now()
        setTimeLeft(TEN_MINUTES)
        
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            logout('timeout')
        }, TEN_MINUTES)
    }

    useEffect(() => {
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
        const handleActivity = () => resetTimer()

        resetTimer()

        events.forEach(event => {
            document.addEventListener(event, handleActivity)
        })

        // Use a separate interval to update the display every 30 seconds
        const displayInterval = setInterval(() => {
            const now = Date.now()
            const elapsed = now - lastActivityRef.current
            const remaining = Math.max(0, TEN_MINUTES - elapsed)
            setTimeLeft(remaining)
        }, 30000) // Update every 30 seconds for accuracy

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
            clearInterval(displayInterval)
            events.forEach(event => {
                document.removeEventListener(event, handleActivity)
            })
        }
    }, [])

    const minutesLeft = Math.ceil(timeLeft / 60000)

    if (minutesLeft <= 0) return null

    return (
        <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full blur-md opacity-20 ${minutesLeft <= 2 ? 'bg-red-500' : 'bg-[var(--accent-blue)]'}`} />
                <Clock size={16} className={minutesLeft <= 2 ? 'text-red-400' : 'text-[var(--accent-blue)]'} />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] leading-none mb-1">
                    Session
                </span>
                <span className={`text-sm font-mono font-bold leading-none ${minutesLeft <= 2 ? 'text-red-400' : 'text-[var(--text-primary)]'}`}>
                    {minutesLeft} {minutesLeft === 1 ? 'min' : 'mins'}
                </span>
            </div>
        </div>
    )
}
