import React, { useLayoutEffect, useRef, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import useStore from '@store/useStore'
import SplitText from '@shared/SplitText'
import MagneticButton from '@shared/MagneticButton'
import { PROJECTS as PROJECT_LIST } from '@data/projects'
import styles from './ProjectDetail.module.scss'

export default function ProjectDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const project = useMemo(() => {
        const numericId = Number(id)
        return PROJECT_LIST.find(p => p.id === numericId) || PROJECT_LIST[0]
    }, [id])
    const el = useRef()
    const setTransitioning = useStore((s) => s.setTransitioning)

    const handleBack = () => {
        setTransitioning(true)
        setTimeout(() => {
            navigate('/')
            setTransitioning(false)
        }, 800)
    }

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(el.current.querySelectorAll('.reveal'), {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'lusion',
                delay: 0.4
            })
        }, el)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={el} className={styles.projectDetail} style={{ background: project.color + '11' }}>
            <div className={styles.container}>
                <button className={`${styles.back} reveal`} onClick={handleBack}>
                    ← BACK TO WORK
                </button>

                <div className={styles.header}>
                    <span className="t-label reveal">{String(project.id).padStart(2, '0')} / {project.category.toUpperCase()}</span>
                    <SplitText className={`${styles.title} t-display h1`}>
                        {project.title}
                    </SplitText>
                </div>

                <div className={`${styles.content} reveal`}>
                    <div className={styles.visualPlaceholder} style={{ borderColor: project.color }}>
                        {/* Detailed WebGL content would go here */}
                    </div>
                    <div className={styles.text}>
                        <p className="t-body">
                            Experimental case study exploring the intersection of {project.category.toLowerCase()} and high-performance immersive tech.
                        </p>
                        <MagneticButton className={styles.launch}>LAUNCH PROJECT</MagneticButton>
                    </div>
                </div>
            </div>
        </section>
    )
}
