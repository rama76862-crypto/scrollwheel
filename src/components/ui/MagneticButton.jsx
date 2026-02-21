import { useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import styles from './MagneticButton.module.scss'

export default function MagneticButton({
    children,
    href,
    onClick,
    variant = 'outline', // 'outline' | 'filled'
    className = '',
    label,
}) {
    const btnRef = useRef()
    const textRef = useRef()

    const handleMouseMove = useCallback((e) => {
        const btn = btnRef.current
        if (!btn) return
        const rect = btn.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) * 0.4
        const dy = (e.clientY - cy) * 0.4
        gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' })
        gsap.to(textRef.current, { x: dx * 0.5, y: dy * 0.5, duration: 0.4, ease: 'power2.out' })
    }, [])

    const handleMouseLeave = useCallback(() => {
        gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
        gsap.to(textRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
    }, [])

    const Tag = href ? 'a' : 'button'

    return (
        <Tag
            ref={btnRef}
            href={href}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-magnetic
            className={`${styles.btn} ${styles[variant]} ${className}`}
            aria-label={label}
        >
            <span ref={textRef} className={styles.text}>
                {children}
            </span>
            <span className={styles.fill} />
        </Tag>
    )
}
