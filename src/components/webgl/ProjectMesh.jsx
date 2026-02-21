import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import projectVert from '../../shaders/project.vert.glsl'
import projectFrag from '../../shaders/project.frag.glsl'

export default function ProjectMesh({ activeProjectId, projects }) {
    const meshRef = useRef()
    const { viewport } = useThree()

    // Track current and next textures
    const prevId = useRef(activeProjectId)
    const textures = useTexture(projects.map(p => p.image))

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uTexture1: { value: textures[0] || new THREE.Texture() },
        uTexture2: { value: textures[0] || new THREE.Texture() },
    }), [])

    useEffect(() => {
        if (!activeProjectId) return

        const nextIdx = projects.findIndex(p => p.id === activeProjectId)
        const nextTexture = textures[nextIdx]

        if (activeProjectId !== prevId.current) {
            // Setup transition
            uniforms.uTexture2.value = nextTexture

            gsap.to(uniforms.uProgress, {
                value: 1,
                duration: 0.7,
                ease: 'power3.inOut',
                onComplete: () => {
                    uniforms.uTexture1.value = nextTexture
                    uniforms.uProgress.value = 0
                }
            })

            prevId.current = activeProjectId
        }
    }, [activeProjectId, projects, textures, uniforms])

    useFrame((state, delta) => {
        uniforms.uTime.value += delta
    })

    return (
        <mesh ref={meshRef} scale={[viewport.width * 0.5, viewport.height * 0.6, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                vertexShader={projectVert}
                fragmentShader={projectFrag}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    )
}
