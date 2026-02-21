import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

/**
 * HorizontalScroll Wrapper
 * Pins the section and translates the content horizontally based on scroll progress.
 */
export default function HorizontalScroll({ children, className }) {
    const sectionRef = useRef()
    const containerRef = useRef()

    useEffect(() => {
        const section = sectionRef.current
        const container = containerRef.current

        // Calculate the amount to scroll (total width of container minus viewport width)
        const scrollWidth = container.scrollWidth - window.innerWidth

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: () => `+=${container.scrollWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        })

        tl.to(container, {
            x: -scrollWidth,
            ease: 'none'
        })

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill()
            tl.kill()
        }
    }, [])

    return (
        <section ref={sectionRef} className={className} style={{ overflow: 'hidden' }}>
            <div ref={containerRef} style={{ display: 'flex', width: 'max-content', height: '100%' }}>
                {children}
            </div>
        </section>
    )
}
