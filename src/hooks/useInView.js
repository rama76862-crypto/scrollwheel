import { useState, useEffect, useRef } from 'react'

/**
 * useInView Hook
 * Uses Intersection Observer to detect when an element is in viewport.
 * Useful for performance optimizations (lazy loading/mounting).
 */
export default function useInView(options = { threshold: 0.1 }) {
    const [isInView, setIsInView] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        if (!ref.current) return

        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting)
        }, options)

        observer.observe(ref.current)

        return () => {
            if (ref.current) observer.unobserve(ref.current)
        }
    }, [options])

    return [ref, isInView]
}
