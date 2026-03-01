import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload, View, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
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
                // Cap pixel ratio at 2x and use adaptive scaling
                dpr={[1, 2]}
                // Set frameloop to always for consistent animation timing
                frameloop="always"
                eventSource={document.getElementById('root')}
            >
                <Suspense fallback={null}>
                    <Environment />
                    <HeroMesh />

                    <EffectComposer disableNormalPass>
                        <Bloom
                            threshold={0.95}
                            intensity={0.15}
                            luminanceThreshold={0.95}
                            mipmapBlur
                        />
                        <Noise opacity={0.03} />
                        <Vignette eskil={false} offset={0.1} darkness={1.0} />
                    </EffectComposer>

                    <Preload all />
                    <AdaptiveDpr pixelated />
                    <AdaptiveEvents />
                </Suspense>

                {/* View Port for Project Portals */}
                <View.Port />
            </Canvas>
        </div>
    )
}
