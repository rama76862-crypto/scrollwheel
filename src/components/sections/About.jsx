import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useStore from '../../store/useStore'
import SplitText from '../shared/SplitText'
import styles from './About.module.scss'
import aboutImg from '../../assets/images/about.png'

/**
 * About Section
 * Refactored for mobile with responsive marquee and stacked layouts.
 */
const About = React.memo(() => {
    const section = useRef()
    const marqueeWrap = useRef()
    const marqueeInner = useRef()
    const statsRef = useRef()
    const bioRef = useRef()
    const imageRef = useRef()

    const isTransitioning = useStore((s) => s.isTransitioning)
    const isMobile = useStore((s) => s.isMobile)

    useLayoutEffect(() => {
        if (isTransitioning) return

        const ctx = gsap.context(() => {
            // --- 1. MARQUEE INFINITE LOOP ---
            const marqueeText = marqueeInner.current
            const marqueeWidth = marqueeText.offsetWidth

            const clone = marqueeText.cloneNode(true)
            marqueeText.parentElement.appendChild(clone)

            let xPos = 0
            let direction = 1
            let speed = isMobile ? 40 : 60

            const marqueeTween = gsap.to({}, {
                duration: 1,
                repeat: -1,
                onUpdate: () => {
                    const delta = gsap.ticker.deltaRatio()
                    xPos -= (speed / 60) * delta * direction

                    if (xPos <= -marqueeWidth) xPos += marqueeWidth
                    if (xPos > 0) xPos -= marqueeWidth

                    gsap.set([marqueeText, clone], { x: xPos })
                }
            })

            gsap.from(marqueeWrap.current, {
                scaleY: 0,
                transformOrigin: 'bottom',
                scrollTrigger: {
                    trigger: marqueeWrap.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    toggleActions: 'play reverse play reverse'
                }
            })

            if (gsap.ScrollTrigger) {
                gsap.ScrollTrigger.create({
                    trigger: section.current,
                    onUpdate: (self) => {
                        const scrollVelocity = Math.abs(self.getVelocity())
                        direction = self.direction === 1 ? 1 : -1
                        const normalizedVelocity = Math.min(scrollVelocity / 500, 1)
                        const baseSpeed = isMobile ? 40 : 60
                        speed = baseSpeed + (normalizedVelocity * baseSpeed)
                    }
                })
            }

            // --- 2. STATS ---
            const stats = [
                { id: 'exp', value: 8 },
                { id: 'projects', value: 120 },
                { id: 'awards', value: 40 }
            ]

            stats.forEach(stat => {
                const el = statsRef.current.querySelector(`[data-stat="${stat.id}"] .num`)
                gsap.fromTo(el,
                    { innerText: 0 },
                    {
                        innerText: stat.value,
                        duration: 1.5,
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 90%'
                        }
                    }
                )
            })

            // --- 3. BIO ---
            const paragraphs = bioRef.current.querySelectorAll('p')
            paragraphs.forEach(p => {
                const split = SplitText.helper(p, { type: 'lines' })
                gsap.from(split.lines, {
                    clipPath: 'inset(0 0 100% 0)',
                    y: 20,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: p,
                        start: 'top 85%'
                    }
                })
            })

            // --- 4. IMAGE PARALLAX (Desktop Only) ---
            if (!isMobile) {
                gsap.to(imageRef.current, {
                    y: 150,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                })
            }

        }, section)

        return () => ctx.revert()
    }, [isTransitioning, isMobile])

    return (
        <section id="about" ref={section} className={styles.about}>
            <div ref={marqueeWrap} className={styles.marqueeWrap}>
                <div className={styles.marqueeStrip}>
                    <div ref={marqueeInner} className={styles.marqueeText}>
                        CREATIVE DEVELOPMENT · WEBGL EXPERIENCES · INTERACTIVE DESIGN ·&nbsp;
                        CREATIVE DEVELOPMENT · WEBGL EXPERIENCES · INTERACTIVE DESIGN ·&nbsp;
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.bioGrid}>
                    <div ref={statsRef} className={styles.stats}>
                        <div className={styles.statItem} data-stat="exp">
                            <span className={`${styles.num} t-display`}>0</span>
                            <span className={styles.label}>Years Experience</span>
                        </div>
                        <div className={styles.statItem} data-stat="projects">
                            <span className={`${styles.num} t-display`}>0</span>
                            <span className={styles.label}>Projects Delivered</span>
                        </div>
                        <div className={styles.statItem} data-stat="awards">
                            <span className={`${styles.num} t-display`}>0</span>
                            <span className={styles.label}>Awards Won</span>
                        </div>
                    </div>

                    <div ref={bioRef} className={styles.bioText}>
                        <p className="t-body">
                            Our studio operates at the bleeding edge of web technology,
                            where code meets cinematic storytelling. We don't just build websites;
                            we build immersive digital journeys.
                        </p>
                        <p className="t-body">
                            Every pixel is considered, and every interaction is an opportunity
                            to evoke emotion. We leverage high-performance WebGL and kinetic
                            motion systems to create products that feel alive.
                        </p>
                        <p className="t-body">
                            Based in the digital ether, collaborating with forward-thinking
                            brands globally. We transform complex ideas into intuitive,
                            visually stunning realities.
                        </p>
                    </div>

                    {!isMobile && (
                        <div ref={imageRef} className={styles.abstractImage}>
                            <img src={aboutImg} alt="Abstract 3D Sculpture" className={styles.img} />
                        </div>
                    )}
                </div>

                <div className={styles.skillsStrip}>
                    {['Three.js', 'GLSL', 'React', 'GSAP', 'Blender', 'TouchDesigner', 'WebXR'].map((skill, i) => (
                        <React.Fragment key={skill}>
                            <span className={styles.skillItem}>{skill}</span>
                            {i !== 6 && <span className={styles.asterisk}>✳</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    )
})

export default About
