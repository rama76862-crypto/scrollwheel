import React, { useLayoutEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { View } from '@react-three/drei'
import ProjectMesh from '../webgl/ProjectMesh'
import useStore from '../../store/useStore'
import SplitText from '../shared/SplitText'
import TransitionLink from '../shared/TransitionLink'
import { PROJECTS } from '../../data/projects'
import styles from './Work.module.scss'

/**
 * Work Section
 * Memoized and optimized with useCallback.
 */
const Work = React.memo(() => {
    const sectionRef = useRef()
    const listRef = useRef()
    const [hoveredId, setHoveredId] = useState(null)
    const [activeScrollId, setActiveScrollId] = useState(null)

    const setCursorType = useStore((s) => s.setCursorType)
    const setActiveProject = useStore((s) => s.setActiveProject)
    const isTransitioning = useStore((s) => s.isTransitioning)
    const isMobile = useStore((s) => s.isMobile)

    const handleMouseEnter = useCallback((id) => {
        if (!isMobile) {
            setHoveredId(id)
            setActiveProject(id)
            setCursorType('view')
        }
    }, [isMobile, setActiveProject, setCursorType])

    const handleMouseLeave = useCallback(() => {
        if (!isMobile) {
            setHoveredId(null)
            setCursorType('default')
        }
    }, [isMobile, setCursorType])

    useLayoutEffect(() => {
        if (isTransitioning) return

        const ctx = gsap.context(() => {
            if (!isMobile && gsap.ScrollTrigger) {
                gsap.ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=200%',
                    pin: true,
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const index = Math.min(
                            PROJECTS.length - 1,
                            Math.floor(progress * PROJECTS.length)
                        );
                        setActiveScrollId(PROJECTS[index].id);
                    }
                });
            }

            gsap.from('.work-heading .char', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: '100%',
                opacity: 0,
                duration: 1,
                stagger: 0.02,
                ease: 'lusion'
            })

            gsap.from(listRef.current.children, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power3.out'
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [isTransitioning, isMobile])

    return (
        <section id="work" ref={sectionRef} className={styles.work}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={`${styles.heading} work-heading`}>
                        <SplitText className="t-label">SELECTED WORK</SplitText>
                    </div>

                    <div ref={listRef} className={styles.list}>
                        {PROJECTS.map((project) => (
                            <TransitionLink
                                key={project.id}
                                to={`/project/${project.id}`}
                                className={`${styles.row} ${(hoveredId === project.id || activeScrollId === project.id) ? styles.isHovered : ''}`}
                                onMouseEnter={() => handleMouseEnter(project.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className={styles.rowInner}>
                                    {isMobile && (
                                        <div className={styles.cardImage}>
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                loading="lazy"
                                                className={styles.img}
                                            />
                                        </div>
                                    )}

                                    <div className={styles.content}>
                                        <div className={styles.meta}>
                                            <span className={styles.index}>
                                                {(hoveredId === project.id || activeScrollId === project.id) ? '→' : String(project.id).padStart(2, '0')}
                                            </span>
                                            <h3 className={`${styles.title} t-display`}>{project.title}</h3>
                                        </div>
                                        <div className={styles.details}>
                                            <span className="t-label">{project.category}</span>
                                            <span className="t-label">{project.year}</span>
                                        </div>
                                    </div>
                                </div>
                            </TransitionLink>
                        ))}
                    </div>
                </div>

                {!isMobile && (
                    <div className={styles.right}>
                        <div className={styles.preview}>
                            <View className={styles.view}>
                                <ProjectMesh activeProjectId={hoveredId || activeScrollId} projects={PROJECTS} />
                            </View>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
})

export default Work
