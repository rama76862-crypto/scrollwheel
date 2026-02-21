import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import useStore from '../../store/useStore'
import styles from './MagneticButton.module.scss'

/**
 * Magnetic Button
 * Disables magnetic translation on touch devices to prevent interaction jank.
 */
export default function MagneticButton({ children, className }) {
    const el = useRef()
    const inner = useRef()
    const setCursorType = useStore((s) => s.setCursorType)
    const isTouch = useStore((s) => s.isTouch)

    useEffect(() => {
        if (isTouch) return

        const handleMove = (e) => {
            const { clientX, clientY } = e
            const { left, top, width, height } = el.current.getBoundingClientRect()
            const x = clientX - (left + width / 2)
            const y = clientY - (top + height / 2)

            gsap.to(el.current, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: 'power2.out',
            })
            gsap.to(inner.current, {
                x: x * 0.1,
                y: y * 0.1,
                duration: 0.4,
                ease: 'power2.out',
            })
        }

        const handleLeave = () => {
            gsap.to([el.current, inner.current], {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.3)',
            })
        }

        const currentEl = el.current
        currentEl.addEventListener('mousemove', handleMove)
        currentEl.addEventListener('mouseleave', handleLeave)

        return () => {
            if (currentEl) {
                currentEl.removeEventListener('mousemove', handleMove)
                currentEl.removeEventListener('mouseleave', handleLeave)
            }
        }
    }, [isTouch])

    return (
        <button
            ref={el}
            className={`${styles.button} ${className}`}
            onMouseEnter={() => !isTouch && setCursorType('view')}
            onMouseLeave={() => !isTouch && setCursorType('default')}
        >
            <span ref={inner} className={styles.inner}>{children}</span>
        </button>
    )
}
