import { useState, useEffect } from 'react'

export default function useViewport() {
    const [viewport, setViewport] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        aspect: window.innerWidth / window.innerHeight,
    })

    useEffect(() => {
        const handleResize = () => {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
                aspect: window.innerWidth / window.innerHeight,
            })
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return viewport
}
