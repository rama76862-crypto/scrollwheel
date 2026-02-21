import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useStore from '@store/useStore'
import styles from './Preloader.module.scss'

export default function Preloader() {
    const containerRef = useRef()
    const counterRef = useRef()
    const barRef = useRef()
    const isLoading = useStore((s) => s.isLoading)
    const setIsLoading = useStore((s) => s.setIsLoading)

    useEffect(() => {
        const tl = gsap.timeline()
        let count = { val: 0 }

        // Animate counter 0 → 100
        tl.to(count, {
            val: 100,
            duration: 2.2,
            ease: 'power2.inOut',
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.textContent = String(Math.round(count.val)).padStart(3, '0')
                }
                if (barRef.current) {
                    barRef.current.style.scaleX = count.val / 100
                }
            },
        })

        // Hold briefly at 100
        tl.to({}, { duration: 0.4 })

        // Wipe preloader up
        tl.to(containerRef.current, {
            yPercent: -105,
            duration: 1.1,
            ease: 'power4.inOut',
            onComplete: () => setIsLoading(false),
        })

        // Stagger the two halves
        tl.to('.preloader-top', {
            yPercent: -110,
            duration: 1,
            ease: 'power4.inOut',
        }, '<0.1')

        return () => tl.kill()
    }, [setIsLoading])

    if (!isLoading) return null

    return (
        <div ref={containerRef} className={styles.preloader}>
            <div className={`${styles.top} preloader-top`} />
            <div className={styles.content}>
                <span ref={counterRef} className={styles.counter}>000</span>
                <div className={styles.barTrack}>
                    <div ref={barRef} className={styles.bar} />
                </div>
                <span className={styles.label}>Loading Experience</span>
            </div>
        </div>
    )
}
