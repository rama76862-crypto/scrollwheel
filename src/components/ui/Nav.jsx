import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import useStore from '@store/useStore'
import TransitionLink from '@shared/TransitionLink'
import styles from './Nav.module.scss'

export default function Nav() {
    const navRef = useRef()
    const location = useLocation()
    const setCursorType = useStore((s) => s.setCursorType)
    const loaded = useStore((s) => s.loaded)

    useEffect(() => {
        if (loaded) {
            gsap.fromTo(navRef.current,
                { y: '-100%' },
                { y: '0%', duration: 0.8, delay: 0.8, ease: 'power4.out' }
            )
        }
    }, [loaded])

    const links = [
        { label: 'WORK', path: '/' },
        { label: 'ABOUT', path: '/about' },
        { label: 'CONTACT', path: '/contact' }
    ]

    return (
        <nav ref={navRef} className={styles.nav}>
            <TransitionLink to="/" className={styles.logo}>
                <div
                    onMouseEnter={() => setCursorType('view')}
                    onMouseLeave={() => setCursorType('default')}
                >
                    LUSION
                </div>
            </TransitionLink>

            <div className={styles.links}>
                {links.map((link) => (
                    <TransitionLink
                        key={link.path}
                        to={link.path}
                        className={`${styles.link} ${location.pathname === link.path ? styles.isActive : ''}`}
                    >
                        <div
                            onMouseEnter={() => setCursorType('view')}
                            onMouseLeave={() => setCursorType('default')}
                        >
                            {link.label}
                            {location.pathname === link.path && <span className={styles.dot} />}
                        </div>
                    </TransitionLink>
                ))}
            </div>
        </nav>
    )
}
