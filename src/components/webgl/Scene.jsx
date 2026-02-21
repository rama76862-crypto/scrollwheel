import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload, View } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import useStore from '../../store/useStore'
import Environment from './Environment'
import HeroMesh from './HeroMesh'

/**
 * Global WebGL Scene logic.
 * Optimized with frameloop="demand" and dpr capping.
 */
export default function Scene() {
    const isMobile = useStore((s) => s.isMobile)

    if (isMobile) return null

    return (
        <div className="gl-canvas">
            <Canvas
                shadows
                camera={{ position: [0, 0, 5], fov: 30 }}
                gl={{ antialias: true, alpha: true }}
                // Cap pixel ratio at 2x for performance
                dpr={[1, 2]}
                // Set frameloop to demand to save resources when nothing moves
                frameloop="demand"
                eventSource={document.getElementById('root')}
            >
                <Suspense fallback={null}>
                    <Environment />
                    <HeroMesh />

                    <EffectComposer disableNormalPass>
                        <Bloom
                            threshold={0.85}
                            intensity={0.3}
                            luminanceThreshold={0.85}
                            mipmapBlur
                        />
                        <Noise opacity={0.035} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>

                    <Preload all />
                </Suspense>

                {/* View Port for Project Portals */}
                <View.Port />
            </Canvas>
        </div>
    )
}
