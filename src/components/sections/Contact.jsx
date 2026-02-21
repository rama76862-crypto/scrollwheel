import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useStore from '../../store/useStore'
import SplitText from '../shared/SplitText'
import MagneticButton from '../shared/MagneticButton'
import styles from './Contact.module.scss'

const SOCIAL_LINKS = [
    { label: 'TWITTER / X', href: 'https://twitter.com' },
    { label: 'INSTAGRAM', href: 'https://instagram.com' },
    { label: 'LINKEDIN', href: 'https://linkedin.com' },
    { label: 'DRIBBBLE', href: 'https://dribbble.com' }
]

const Contact = React.memo(() => {
    const el = useRef()
    const footer = useRef()
    const isTransitioning = useStore((s) => s.isTransitioning)
    const setCursorType = useStore((s) => s.setCursorType)

    useLayoutEffect(() => {
        if (isTransitioning) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el.current,
                    start: 'top 80%',
                }
            })

            tl.from('.reveal-title .char', {
                y: '100%',
                opacity: 0,
                duration: 1.2,
                stagger: 0.02,
                ease: 'lusion'
            })

            tl.from(footer.current.querySelectorAll('.reveal-footer'), {
                y: 20,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'expo.out'
            }, '-=0.6')
        }, el)
        return () => ctx.revert()
    }, [isTransitioning])

    return (
        <section ref={el} className={styles.contact}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className="t-label reveal-footer">GET IN TOUCH</span>
                    <SplitText className={`${styles.title} t-display reveal-title`}>
                        LET'S CREATE<br />THE FUTURE.
                    </SplitText>
                </div>

                <div ref={footer} className={styles.footer}>
                    <div className={`${styles.left} reveal-footer`}>
                        <MagneticButton
                            className={styles.emailBtn}
                            onMouseEnter={() => setCursorType('view')}
                            onMouseLeave={() => setCursorType('default')}
                        >
                            HELLO@RAMA.DEV
                        </MagneticButton>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.socialGrid}>
                            {SOCIAL_LINKS.map((link, i) => (
                                <div key={i} className={`${styles.socialItem} reveal-footer`}>
                                    <MagneticButton className={styles.socialLink}>
                                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                                            {link.label}
                                        </a>
                                    </MagneticButton>
                                </div>
                            ))}
                        </div>

                        <div className={`${styles.bottomMeta} reveal-footer`}>
                            <p className="t-label">© {new Date().getFullYear()} RAMA STUDIO</p>
                            <p className="t-label">EST. 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.socialWave}>
                <div className={styles.waveText}>CONNECT • CONNECT • CONNECT • CONNECT • CONNECT •&nbsp;</div>
                <div className={styles.waveText}>CONNECT • CONNECT • CONNECT • CONNECT • CONNECT •&nbsp;</div>
            </div>
        </section>
    )
})

export default Contact
