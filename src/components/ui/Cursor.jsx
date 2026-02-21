import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import useStore from '../../store/useStore'
import styles from './Cursor.module.scss'

export default function Cursor() {
    const cursorRef = useRef()
    const ringRef = useRef()
    const type = useStore((s) => s.cursorType)

    useEffect(() => {
        // 1. GSAP Context for proper cleanup
        const ctx = gsap.context(() => {
            // 2. gsap.quickTo() for high-performance per-frame updates
            const xToCursor = gsap.quickTo(cursorRef.current, 'x', { duration: 0, ease: 'none' })
            const yToCursor = gsap.quickTo(cursorRef.current, 'y', { duration: 0, ease: 'none' })

            const xToRing = gsap.quickTo(ringRef.current, 'x', { duration: 0.15, ease: 'power2.out' })
            const yToRing = gsap.quickTo(ringRef.current, 'y', { duration: 0.15, ease: 'power2.out' })

            const handleMove = (e) => {
                xToCursor(e.clientX)
                yToCursor(e.clientY)
                xToRing(e.clientX)
                yToRing(e.clientY)
            }

            window.addEventListener('mousemove', handleMove)

            // 3. MatchMedia for accessibility
            const mm = gsap.matchMedia()
            mm.add("(prefers-reduced-motion: reduce)", () => {
                // Disable or simplify ring lag if motion is reduced
                gsap.set(ringRef.current, { x: 0, y: 0 })
            })

            return () => {
                window.removeEventListener('mousemove', handleMove)
            }
        })

        return () => ctx.revert()
    }, [])

    return (
        <div className={`${styles.cursor} ${styles[type]}`}>
            <div ref={cursorRef} className={styles.dot} />
            <div ref={ringRef} className={styles.ring}>
                {type === 'view' && <span className={styles.label}>VIEW</span>}
            </div>
        </div>
    )
}
