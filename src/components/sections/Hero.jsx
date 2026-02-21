import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useStore from '../../store/useStore'
import SplitText from '../shared/SplitText'
import MagneticButton from '../shared/MagneticButton'
import styles from './Hero.module.scss'

/**
 * Hero Section
 * Optimized for mobile with WebGL fallback and responsive layout.
 */
const Hero = React.memo(() => {
    const el = useRef()
    const headline = useRef()
    const subline = useRef()
    const cta = useRef()
    const scroll = useRef()

    const loaded = useStore((s) => s.loaded)
    const isTransitioning = useStore((s) => s.isTransitioning)
    const isMobile = useStore((s) => s.isMobile)

    useLayoutEffect(() => {
        if (!loaded || isTransitioning) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                delay: 0.2,
            })

            gsap.set([subline.current, cta.current, scroll.current], { opacity: 0, y: 30 })

            tl.from(headline.current.querySelectorAll('.char'), {
                y: 120,
                opacity: 0,
                duration: 1.2,
                stagger: 0.04,
                ease: 'lusion'
            }, 0)

            tl.to(subline.current, {
                opacity: 0.5,
                y: 0,
                duration: 1.2,
                ease: 'expo.out'
            }, 0.4)

            tl.to([cta.current, scroll.current], {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'expo.out'
            }, 0.6)

        }, el)
        return () => ctx.revert()
    }, [loaded, isTransitioning])

    return (
        <section id="hero" ref={el} className={styles.hero}>
            {/* Mobile Fallback Background */}
            {isMobile && (
                <div className={styles.mobileFallback}>
                    <div className={styles.grainOverlay} />
                    <div className={styles.fallbackImage} />
                </div>
            )}

            <div className={styles.inner}>
                <div ref={headline} className={styles.headline}>
                    <SplitText className={`${styles.title} t-display`}>
                        WE CRAFT<br />DIGITAL WORLDS
                    </SplitText>
                </div>

                <div ref={subline} className={`${styles.subline} t-label`}>
                    Creative Development Studio — Est. 2026
                </div>

                <div className={styles.bottom}>
                    <div ref={cta} className={styles.cta}>
                        <MagneticButton>Selected Work ↓</MagneticButton>
                    </div>

                    {!isMobile && (
                        <div ref={scroll} className={styles.scroll}>
                            <div className={styles.scrollInner}>
                                <span className="t-label">SCROLL</span>
                                <div className={styles.line} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
})

export default Hero
