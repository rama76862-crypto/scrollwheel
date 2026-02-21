import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import useStore from '@store/useStore'
import dispVert from '@shaders/displacement.vert'
import dispFrag from '@shaders/displacement.frag'

export default function DisplacementSphere() {
    const meshRef = useRef()
    const scrollProgress = useStore((s) => s.scrollProgress)
    const mouseNorm = useStore((s) => s.mouseNorm)

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uScrollProgress: { value: 0 },
        uDistortion: { value: 0.55 },
        uMouse: { value: [0, 0] },
        uColorA: { value: [0.05, 0.05, 0.05] },
        uColorB: { value: [0.94, 0.93, 0.90] },
        uAccent: { value: [0.784, 0.216, 0.176] }, // #c8372d
    }), [])

    useFrame(({ clock }) => {
        if (!meshRef.current) return
        uniforms.uTime.value = clock.elapsedTime
        uniforms.uScrollProgress.value = scrollProgress
        uniforms.uMouse.value = [mouseNorm.x, mouseNorm.y]
    })

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[2.5, 64]} />
            <shaderMaterial
                vertexShader={dispVert}
                fragmentShader={dispFrag}
                uniforms={uniforms}
            />
        </mesh>
    )
}
