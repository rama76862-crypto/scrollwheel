import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import heroVert from '../../shaders/hero.vert.glsl'
import heroFrag from '../../shaders/hero.frag.glsl'

export default function HeroMesh() {
    const meshRef = useRef()
    const { viewport } = useThree()

    // Mouse tracking
    const mouse = useRef(new THREE.Vector2(0, 0))
    const targetMouse = useRef(new THREE.Vector2(0, 0))

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uDistortion: { value: 0.12 },
        uOpacity: { value: 0 }
    }), [])

    useFrame((state, delta) => {
        // Lerp mouse
        targetMouse.current.set(state.mouse.x, state.mouse.y)
        mouse.current.lerp(targetMouse.current, 0.06)

        uniforms.uTime.value += delta
        uniforms.uMouse.value.copy(mouse.current)
    })

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
            <shaderMaterial
                vertexShader={heroVert}
                fragmentShader={heroFrag}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    )
}
