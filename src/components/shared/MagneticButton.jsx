import React, { useRef, useEffect } from 'react'
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
    href,
    onClick,
    target,
    rel,
    ariaLabel,
}) {
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
