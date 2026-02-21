import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Process.module.scss'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
    {
        num: '01',
        title: 'Discovery',
        desc: 'Deep dive into goals, audience, and competitive landscape. Creating a creative brief that defines the experience.',
    },
    {
        num: '02',
        title: 'Concept',
        desc: 'Motion prototypes, moodboards, and design language. Defining visual identity before touching production code.',
    },
    {
        num: '03',
        title: 'Build',
        desc: 'Production-grade implementation — WebGL, GSAP, component architecture, and performance optimization.',
    },
    {
        num: '04',
        title: 'Refine',
        desc: 'Micro-detail polish pass. Timing curves, easing, spacing, and accessibility — the 20% that makes 80% of the impact.',
    },
]

export default function Process() {
    const sectionRef = useRef()
    const stepsRef = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            stepsRef.current.forEach((step, i) => {
                if (!step) return
                const title = step.querySelector('[data-title]')
                const desc = step.querySelector('[data-desc]')
                const num = step.querySelector('[data-num]')

                gsap.fromTo([num, title, desc],
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1, x: 0,
                        duration: 0.8, ease: 'expo.out',
                        stagger: 0.08,
                        scrollTrigger: { trigger: step, start: 'top 80%' },
                    }
                )

                // Accent line grows in
                const line = step.querySelector('[data-line]')
                if (line) {
                    gsap.fromTo(line,
                        { scaleX: 0 },
                        {
                            scaleX: 1, duration: 1.2, ease: 'expo.inOut',
                            transformOrigin: 'left center',
                            scrollTrigger: { trigger: step, start: 'top 80%' },
                        }
                    )
                }
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="process" ref={sectionRef} className={styles.process}>
            <div className={styles.inner}>
                <div className={styles.labelRow}>
                    <span className="t-label">Process</span>
                    <div className="rule" style={{ flex: 1 }} />
                </div>

                <div className={styles.header}>
                    <h2 className="t-display">How I work</h2>
                </div>

                <div className={styles.steps}>
                    {STEPS.map((step, i) => (
                        <div
                            key={step.num}
                            ref={(el) => (stepsRef.current[i] = el)}
                            className={styles.step}
                        >
                            <div className={styles.stepLeft}>
                                <span data-num className={styles.stepNum}>{step.num}</span>
                                <span data-line className={styles.stepLine} />
                            </div>
                            <div className={styles.stepContent}>
                                <h3 data-title className={styles.stepTitle}>{step.title}</h3>
                                <p data-desc className={styles.stepDesc}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
