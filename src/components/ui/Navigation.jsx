import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import useStore from '../../store/useStore'
import styles from './Navigation.module.scss'

const NAV_LINKS = [
    { label: 'Work', href: '#work', num: '01' },
    { label: 'About', href: '#about', num: '02' },
    { label: 'Process', href: '#process', num: '03' },
    { label: 'Contact', href: '#contact', num: '04' },
]

export default function Navigation() {
    const menuOpen = useStore((s) => s.menuOpen)
    const setMenuOpen = useStore((s) => s.setMenuOpen)
    const overlayRef = useRef()
    const linksRef = useRef([])
    const [animating, setAnimating] = useState(false)

    const openMenu = () => {
        if (animating) return
        setAnimating(true)
        setMenuOpen(true)
        const tl = gsap.timeline({ onComplete: () => setAnimating(false) })
        tl.set(overlayRef.current, { display: 'flex' })
        tl.fromTo(overlayRef.current,
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', duration: 0.75, ease: 'power4.inOut' }
        )
        tl.fromTo(linksRef.current,
            { yPercent: 115, opacity: 0 },
            { yPercent: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'expo.out' },
            '-=0.3'
        )
    }

    const closeMenu = () => {
        if (animating) return
        setAnimating(true)
        const tl = gsap.timeline({
            onComplete: () => {
                setMenuOpen(false)
                setAnimating(false)
                gsap.set(overlayRef.current, { display: 'none' })
            },
        })
        tl.to(linksRef.current, { yPercent: -80, opacity: 0, stagger: 0.04, duration: 0.4, ease: 'power2.in' })
        tl.to(overlayRef.current,
            { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'power4.inOut' },
            '-=0.15'
        )
    }

    const toggleMenu = () => menuOpen ? closeMenu() : openMenu()

    return (
        <>
            <nav className={styles.nav}>
                <a href="#hero" className={styles.logo}>
                    <span className={styles.logoMark}>R</span>
                    <span className={styles.logoText}>AMA</span>
                </a>

                <div className={styles.right}>
                    <span className={styles.availability}>Available for work</span>
                    <button
                        className={styles.menuToggle}
                        onClick={toggleMenu}
                        data-magnetic
                        aria-label="Toggle menu"
                    >
                        <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
                        <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
                    </button>
                </div>
            </nav>

            {/* Full-screen overlay */}
            <div ref={overlayRef} className={styles.overlay} style={{ display: 'none' }}>
                <button className={styles.closeBtn} onClick={closeMenu} aria-label="Close menu">
                    <span className={styles.closeLine} />
                    <span className={styles.closeLine} />
                </button>

                <ul className={styles.linkList}>
                    {NAV_LINKS.map((link, i) => (
                        <li key={link.href} className={styles.linkItem}>
                            <a
                                href={link.href}
                                ref={(el) => (linksRef.current[i] = el)}
                                className={styles.link}
                                onClick={closeMenu}
                            >
                                <span className={styles.linkNum}>{link.num}</span>
                                <span className={styles.linkLabel}>{link.label}</span>
                                <span className={styles.linkArrow}>↗</span>
                            </a>
                        </li>
                    ))}
                </ul>

                <div className={styles.overlayFooter}>
                    <span>hello@rama.dev</span>
                    <div className={styles.socials}>
                        {['Twitter', 'Github', 'LinkedIn'].map((s) => (
                            <a key={s} href="#" data-magnetic>{s}</a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
