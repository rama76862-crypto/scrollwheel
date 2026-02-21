import React, { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import useStore from '../../store/useStore'
import styles from './Loader.module.scss'

export default function Loader() {
    const el = useRef()
    const counter = useRef()
    const bar = useRef()
    const logo = useRef()
    const panelTop = useRef()
    const panelBottom = useRef()

    const progress = useStore((s) => s.progress)
    const loaded = useStore((s) => s.loaded)
    const setLoaded = useStore((s) => s.setLoaded)
    const [isVisible, setIsVisible] = useState(true)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Initial States
            gsap.set([logo.current, counter.current, bar.current], { opacity: 0 })
            gsap.set(bar.current, { scaleX: 0, transformOrigin: 'left' })
            gsap.set([panelTop.current, panelBottom.current], { scaleY: 1, transformOrigin: 'top' })
            gsap.set(panelBottom.current, { transformOrigin: 'bottom' })

            // Entry
            gsap.to(counter.current, { opacity: 1, duration: 0.6, delay: 0.2 })
            gsap.to(bar.current, { opacity: 1, duration: 0.6, delay: 0.2 })
        }, el)
        return () => ctx.revert()
    }, [])

    // Update Counter & Bar
    useLayoutEffect(() => {
        gsap.to(bar.current, { scaleX: progress / 100, duration: 0.4, ease: 'power2.out' })

        if (progress >= 40) {
            gsap.to(logo.current, { opacity: 1, duration: 0.8 })
        }

        if (progress === 100 || loaded) {
            const tl = gsap.timeline({
                delay: 0.2,
            })

            // Sequence
            tl.to(counter.current, { opacity: 0, duration: 0.3 })
            tl.to(logo.current, { opacity: 0, duration: 0.3 }, '<')
            tl.to(bar.current, { opacity: 0, duration: 0.3 }, '<')

            tl.to(panelTop.current, {
                scaleY: 0,
                duration: 1.0,
                ease: 'expo.inOut'
            }, 'wipe')

            tl.to(panelBottom.current, {
                scaleY: 0,
                duration: 1.0,
                ease: 'expo.inOut'
            }, 'wipe')

            // Ensure store state is updated if we hit 100 first
            tl.add(() => {
                setLoaded(true)
            }, 'wipe+=0.8')

            // Unmount from DOM after wipe
            tl.add(() => {
                setIsVisible(false)
            }, 'wipe+=1.0')
        }
    }, [progress, loaded, setLoaded])

    if (!isVisible) return null

    return (
        <div ref={el} className={styles.loader}>
            {/* Split Panels for Wipe */}
            <div ref={panelTop} className={`${styles.panel} ${styles.top}`} />
            <div ref={panelBottom} className={`${styles.panel} ${styles.bottom}`} />

            <div className={styles.content}>
                <div ref={logo} className={styles.logo}>LUSION</div>

                <div ref={counter} className={styles.counter}>
                    {String(Math.round(progress)).padStart(2, '0')}
                </div>

                <div className={styles.barWrap}>
                    <div ref={bar} className={styles.bar} />
                </div>
            </div>
        </div>
    )
}
