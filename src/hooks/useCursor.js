import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { lerp } from '@utils/math'

export default function useCursor() {
    const mouse = useRef(new THREE.Vector2(0, 0))
    const lerped = useRef(new THREE.Vector2(0, 0))

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return { mouse: mouse.current, lerped: lerped.current }
}
