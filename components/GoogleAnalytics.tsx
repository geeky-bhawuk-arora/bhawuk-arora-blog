'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ReactGA from 'react-ga4';

export default function GoogleAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Initialize GA4 only once
    useEffect(() => {
        ReactGA.initialize('G-37E5GS4YBR');
    }, []);

    // Track page views on route changes
    useEffect(() => {
        if (pathname) {
            const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

            ReactGA.send({
                hitType: 'pageview',
                page: url,
                title: document.title,
            });

            console.log(`[GA4] Pageview sent: ${url}`);
        }
    }, [pathname, searchParams]);

    return null;
}
