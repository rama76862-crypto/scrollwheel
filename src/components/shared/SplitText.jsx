import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * A basic SplitText utility for the Lusion scaffold.
 * Supports character and line splitting for cinematic reveals.
 */
export default function SplitText({ children, className, type = 'chars' }) {
    const el = useRef()

    useEffect(() => {
        if (!el.current) return

        const text = el.current.innerText

        if (type === 'chars') {
            el.current.innerHTML = text.split('').map(char =>
                `<span class="char" style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('')

            gsap.from(el.current.querySelectorAll('.char'), {
                yPercent: 100,
                autoAlpha: 0,
                duration: 1,
                stagger: 0.02,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: el.current,
                    start: 'top 90%',
                }
            })
        }
    }, [type])

    return (
        <div ref={el} className={className} style={{ overflow: 'hidden' }}>
            {children}
        </div>
    )
}

SplitText.helper = (element, options = { type: 'lines' }) => {
    if (!element) return { lines: [], chars: [] }

    const text = element.innerText

    if (options.type === 'lines') {
        // Simple line wrapper for transition-aware reveals
        element.innerHTML = `<div class="line" style="display:block; overflow:hidden">${text}</div>`
        return { lines: element.querySelectorAll('.line') }
    }

    return { lines: [], chars: [] }
}
