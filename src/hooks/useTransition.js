import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useStore from '@store/useStore'

/**
 * useTransition Hook
 * Orchestrates the dual-panel GSAP page transition.
 */
export default function useTransition() {
    const navigate = useNavigate()
    const setTransitioning = useStore((s) => s.setTransitioning)

    const transitionTo = (to) => {
        if (window.location.pathname === to) return

        setTransitioning(true)

        // Lenis instances are managed globally, we can stop scroll by emitting event or directly if available
        if (window.lenis) window.lenis.stop()

        const tl = gsap.timeline({
            onComplete: () => {
                // Kill all ScrollTriggers before navigation to prevent ghost markers/logic
                ScrollTrigger.getAll().forEach(st => st.kill())
                navigate(to)
            }
        })

        // Panels are controlled via PageTransition.jsx watching the isTransitioning state
        // But we need a specific delay for the navigate call
        tl.to({}, { duration: 0.6 })
    }

    return { transitionTo }
}
