import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import useStore from '../../store/useStore'
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
        { label: 'WORK', hash: '#work' },
        { label: 'ABOUT', hash: '#about' },
        { label: 'CONTACT', hash: '#contact' }
    ]

    const scrollToHash = (hash) => (e) => {
        e.preventDefault()
        const el = document.querySelector(hash)
        if (!el) return
        if (window.lenis && typeof window.lenis.scrollTo === 'function') {
            window.lenis.scrollTo(el, { offset: -80 })
        } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <nav ref={navRef} className={styles.nav}>
            <a href="#hero" className={styles.logo} onClick={scrollToHash('#hero')}>
                <div
                    onMouseEnter={() => setCursorType('view')}
                    onMouseLeave={() => setCursorType('default')}
                >
                    LUSION
                </div>
            </a>

            <div className={styles.links}>
                {links.map((link) => (
                    <a
                        key={link.hash}
                        href={link.hash}
                        className={styles.link}
                        onClick={scrollToHash(link.hash)}
                    >
                        <div
                            onMouseEnter={() => setCursorType('view')}
                            onMouseLeave={() => setCursorType('default')}
                        >
                            {link.label}
                        </div>
                    </a>
                ))}
            </div>
        </nav>
    )
}
