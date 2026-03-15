'use client'

import { useEffect, useRef } from 'react'
import { logout } from '@/app/login/actions'

const THIRTY_MINUTES = 30 * 60 * 1000

export default function IdleTimer() {
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const resetTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            // Call the logout action with 'timeout' as the reason
            logout('timeout')
        }, THIRTY_MINUTES)
    }

    useEffect(() => {
        // Events that indicate user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']

        const handleActivity = () => resetTimer()

        // Initialize timer
        resetTimer()

        // Set up event listeners
        events.forEach(event => {
            document.addEventListener(event, handleActivity)
        })

        return () => {
            // Clean up
            if (timerRef.current) clearTimeout(timerRef.current)
            events.forEach(event => {
                document.removeEventListener(event, handleActivity)
            })
        }
    }, [])

    return null // This component doesn't render anything
}
