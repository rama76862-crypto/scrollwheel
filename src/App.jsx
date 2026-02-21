import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import useStore from './store/useStore'

// Core UI Components
import Scene from './components/webgl/Scene'
import Loader from './components/ui/Loader'
import Cursor from './components/ui/Cursor'
import Nav from './components/ui/Nav'
import PageTransition from './components/ui/PageTransition'

// Lazy loaded sections
const Hero = lazy(() => import('./components/sections/Hero'))
const Work = lazy(() => import('./components/sections/Work'))
const About = lazy(() => import('./components/sections/About'))
const Contact = lazy(() => import('./components/sections/Contact'))
const ProjectDetail = lazy(() => import('./components/sections/ProjectDetail'))
const NotFound = lazy(() => import('./components/sections/NotFound'))

function AppContent() {
    const setLoaded = useStore((s) => s.setLoaded)
    const setTransitioning = useStore((s) => s.setTransitioning)
    const updateDevice = useStore((s) => s.updateDevice)
    const isTouch = useStore((s) => s.isTouch)
    const location = useLocation()

    // Initialize and handle resize
    useEffect(() => {
        updateDevice()
        window.addEventListener('resize', updateDevice)
        return () => window.removeEventListener('resize', updateDevice)
    }, [updateDevice])

    // Reset transition state on navigate
    useEffect(() => {
        const timer = setTimeout(() => {
            setTransitioning(false)
        }, 10)
        return () => clearTimeout(timer)
    }, [location.pathname, setTransitioning])

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true)
        }, 2000)
        return () => clearTimeout(timer)
    }, [setLoaded])

    return (
        <main>
            <Helmet>
                <title>RAMA — Creative Developer</title>
                <meta name="description" content="Award-winning creative developer specializing in WebGL experiences, interactive installations, and immersive digital products." />
                <meta property="og:title" content="RAMA — Creative Developer" />
                <meta property="og:description" content="Award-winning creative developer specializing in WebGL experiences and immersive digital products." />
                <meta property="og:image" content="/og-image.jpg" />
                <meta property="og:type" content="website" />
                <meta name="theme-color" content="#0a0a09" />
                <link rel="canonical" href="https://rama-dev.com" />
            </Helmet>

            <Loader />
            {!isTouch && <Cursor />}
            <Nav />
            <PageTransition />

            <Suspense fallback={null}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={
                        <>
                            <Hero />
                            <Work />
                            <About />
                            <Contact />
                        </>
                    } />
                    <Route path="/project/:id" element={<ProjectDetail />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>

            <Scene />
        </main>
    )
}

export default function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}
