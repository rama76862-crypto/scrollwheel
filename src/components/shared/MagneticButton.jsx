import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import useStore from '../../store/useStore'
import styles from './MagneticButton.module.scss'

/**
 * Magnetic Button
 * Disables magnetic translation on touch devices to prevent interaction jank.
 */
export default function MagneticButton({
    children,
    className = '',
    variant = 'outline',
    href,
    onClick,
    target,
    rel,
    ariaLabel,
}) {
    const el = useRef()
    const inner = useRef()
    const glitchRef = useRef()
    const setCursorType = useStore((s) => s.setCursorType)
    const [isTouch, setIsTouch] = useState(false)

    useEffect(() => {
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }, [])

    useEffect(() => {
        if (isTouch || !el.current) return

        const xTo = gsap.quickTo(el.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" })
        const yTo = gsap.quickTo(el.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" })
        const xToInner = gsap.quickTo(inner.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" })
        const yToInner = gsap.quickTo(inner.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" })

        const handleMove = (e) => {
            const { clientX, clientY } = e
            const { left, top, width, height } = el.current.getBoundingClientRect()
            const x = clientX - (left + width / 2)
            const y = clientY - (top + height / 2)

            xTo(x * 0.35)
            yTo(y * 0.35)
            xToInner(x * 0.15)
            yToInner(y * 0.15)
        }

        const handleLeave = () => {
            xTo(0)
            yTo(0)
            xToInner(0)
            yToInner(0)
            setCursorType('default')
            gsap.to(glitchRef.current, { skewX: 0, skewY: 0, duration: 0.3 })
        }

        const handleEnter = () => {
            setCursorType('view')
            gsap.to(glitchRef.current, {
                skewX: () => (Math.random() - 0.5) * 15,
                skewY: () => (Math.random() - 0.5) * 5,
                duration: 0.08,
                repeat: 3,
                yoyo: true,
                ease: 'power3.inOut'
            })
        }

        const element = el.current
        element.addEventListener("mousemove", handleMove)
        element.addEventListener("mouseleave", handleLeave)
        element.addEventListener("mouseenter", handleEnter)

        return () => {
            element.removeEventListener("mousemove", handleMove)
            element.removeEventListener("mouseleave", handleLeave)
            element.removeEventListener("mouseenter", handleEnter)
        }
    }, [isTouch, setCursorType])

    const Tag = href ? 'a' : 'button'

    return (
        <Tag
            ref={el}
            href={href}
            onClick={onClick}
            target={href ? target : undefined}
            rel={href ? rel : undefined}
            aria-label={ariaLabel}
            className={`${styles.btn} ${styles[variant]} ${className}`}
        >
            <div ref={inner} className={styles.inner}>
                <div ref={glitchRef} className={styles.glitchWrapper}>
                    <div className={styles.text}>{children}</div>
                </div>
                <div className={styles.fill} />
            </div>
        </Tag>
    )
}
