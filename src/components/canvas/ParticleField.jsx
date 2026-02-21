import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useStore from '@store/useStore'
import particlesVert from '@shaders/particles.vert'
import particlesFrag from '@shaders/particles.frag'

const COUNT = 6000

export default function ParticleField() {
    const meshRef = useRef()
    const scrollProgress = useStore((s) => s.scrollProgress)

    const [positions, scales, randoms] = useMemo(() => {
        const positions = new Float32Array(COUNT * 3)
        const scales = new Float32Array(COUNT)
        const randoms = new Float32Array(COUNT * 3)

        for (let i = 0; i < COUNT; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 20
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10

            scales[i] = Math.random()
            randoms[i * 3 + 0] = Math.random()
            randoms[i * 3 + 1] = Math.random()
            randoms[i * 3 + 2] = Math.random()
        }
        return [positions, scales, randoms]
    }, [])

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uSize: { value: 3.5 },
        uScrollProgress: { value: 0 },
    }), [])

    useFrame(({ clock }) => {
        if (!meshRef.current) return
        uniforms.uTime.value = clock.elapsedTime
        uniforms.uScrollProgress.value = scrollProgress
    })

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-aScale"
                    args={[scales, 1]}
                />
                <bufferAttribute
                    attach="attributes-aRandom"
                    args={[randoms, 3]}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={particlesVert}
                fragmentShader={particlesFrag}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}
