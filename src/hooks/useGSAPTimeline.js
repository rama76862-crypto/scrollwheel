import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function useGSAPTimeline(options = {}) {
    const tl = useRef()

    useLayoutEffect(() => {
        tl.current = gsap.timeline(options)
        return () => {
            if (tl.current) tl.current.kill()
        }
    }, [])

    return tl
}
