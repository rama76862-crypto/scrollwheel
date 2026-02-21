import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useStore from '@store/useStore'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

export function getLenis() {
    return lenisInstance
}

export default function useLenis() {
    const setScrollY = useStore((s) => s.setScrollY)
    const setScrollProgress = useStore((s) => s.setScrollProgress)
    const lenisRef = useRef(null)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        lenisInstance = lenis
        lenisRef.current = lenis

        // Sync Lenis with GSAP RAF
        lenis.on('scroll', ({ scroll, progress }) => {
            setScrollY(scroll)
            setScrollProgress(progress)
            ScrollTrigger.update()
        })

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        return () => {
            lenis.destroy()
            lenisInstance = null
            gsap.ticker.remove((time) => lenis.raf(time * 1000))
        }
    }, [setScrollY, setScrollProgress])

    return lenisRef
}
