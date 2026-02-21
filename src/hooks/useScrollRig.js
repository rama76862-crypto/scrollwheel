import { useState, useEffect } from 'react'
import { gsap } from 'gsap'

export default function useScrollRig() {
    const [scroll, setScroll] = useState({
        y: 0,
        progress: 0,
        velocity: 0,
        direction: 0,
    })

    useEffect(() => {
        const handleScroll = () => {
            // Since we use Lenis + GSAP ticker, we can also query the engine directly
            // but for general use, we'll track the window or lenis instance if shared.
            // For this scaffold, we'll assume a simplified hook that can be expanded.
        }
        // window.addEventListener('scroll', handleScroll)
        // return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return scroll
}
