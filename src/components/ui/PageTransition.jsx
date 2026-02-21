import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useStore from '@store/useStore'
import styles from './PageTransition.module.scss'

export default function PageTransition() {
    const panel1 = useRef() // Background color
    const panel2 = useRef() // Accent color
    const isTransitioning = useStore((s) => s.isTransitioning)
    const setTransitioning = useStore((s) => s.setTransitioning)

    useEffect(() => {
        const tl = gsap.timeline()

        if (isTransitioning) {
            // ENTER TRANSITION (Leaving page)
            tl.set([panel1.current, panel2.current], { scaleY: 0, transformOrigin: 'bottom center' })

            tl.to(panel2.current, {
                scaleY: 1,
                duration: 0.5,
                ease: 'power4.inOut'
            })
                .to(panel1.current, {
                    scaleY: 1,
                    duration: 0.5,
                    ease: 'power4.inOut'
                }, 0.25)
        } else {
            // EXIT TRANSITION (Entering page)
            tl.set([panel1.current, panel2.current], { transformOrigin: 'top center' })

            tl.to(panel1.current, {
                scaleY: 0,
                duration: 0.5,
                ease: 'power4.inOut'
            })
                .to(panel2.current, {
                    scaleY: 0,
                    duration: 0.5,
                    ease: 'power4.inOut'
                }, 0.15)
                .set([panel1.current, panel2.current], { pointerEvents: 'none' })

            // Restart scroll
            if (window.lenis) window.lenis.start()
        }

        return () => tl.kill()
    }, [isTransitioning])

    return (
        <div className={styles.transition}>
            <div ref={panel2} className={styles.accentPanel} />
            <div ref={panel1} className={styles.bgPanel} />
        </div>
    )
}
