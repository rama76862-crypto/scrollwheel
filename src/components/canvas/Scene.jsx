import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor, AdaptiveDpr } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import ParticleField from './ParticleField'
import DisplacementSphere from './DisplacementSphere'
import useStore from '@store/useStore'
import { useEffect } from 'react'

export default function Scene() {
    const setMouseNorm = useStore((s) => s.setMouseNorm)

    useEffect(() => {
        const handleMove = (e) => {
            setMouseNorm({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            })
        }
        window.addEventListener('mousemove', handleMove)
        return () => window.removeEventListener('mousemove', handleMove)
    }, [setMouseNorm])

    return (
        <div className="gl-canvas">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 45 }}
                dpr={[1, 2]}
                eventSource={document.getElementById('root')}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance',
                }}
            >
                <AdaptiveDpr pixelated />
                <PerformanceMonitor
                    onDecline={() => console.info('WebGL: degrading quality for performance')}
                />

                <color attach="background" args={['#080808']} />

                <Suspense fallback={null}>
                    <ParticleField />
                    <DisplacementSphere />

                    <EffectComposer multisampling={0}>
                        <Bloom
                            luminanceThreshold={0.9}
                            luminanceSmoothing={0.025}
                            intensity={0.4}
                            blendFunction={BlendFunction.ADD}
                        />
                        <Noise
                            premultiply
                            blendFunction={BlendFunction.ADD}
                            opacity={0.04}
                        />
                        <Vignette
                            offset={0.3}
                            darkness={0.85}
                            blendFunction={BlendFunction.NORMAL}
                        />
                    </EffectComposer>
                </Suspense>

                <View.Port />
            </Canvas>
        </div>
    )
}
