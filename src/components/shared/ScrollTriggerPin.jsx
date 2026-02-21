import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function ScrollTriggerPin({ children, trigger, start = 'top top', end = 'bottom top', pin = true }) {
    const el = useRef()

    useEffect(() => {
        const pinTrigger = gsap.to(el.current, {
            scrollTrigger: {
                trigger: trigger?.current || el.current,
                start,
                end,
                pin,
                scrub: true,
            }
        })
        return () => pinTrigger.scrollTrigger.kill()
    }, [trigger, start, end, pin])

    return (
        <div ref={el} className="u-pin">
            {children}
        </div>
    )
}
