import React from 'react'

export default function Environment() {
    return (
        <>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff3d2e" />
            <fog attach="fog" args={['#0a0a09', 5, 15]} />
        </>
    )
}
