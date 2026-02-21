import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import useStore from './store/useStore'

import Scene from './components/webgl/Scene'
import Loader from './components/ui/Loader'
import Cursor from './components/ui/Cursor'
import Nav from './components/ui/Nav'
import PageTransition from './components/ui/PageTransition'

import Hero from './components/sections/Hero'
import Work from './components/sections/Work'
import Process from './components/sections/Process'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import ProjectDetail from './components/sections/ProjectDetail'
import NotFound from './components/sections/NotFound'

function AppContent() {
    const setLoaded = useStore((s) => s.setLoaded)
    const setTransitioning = useStore((s) => s.setTransitioning)
    const updateDevice = useStore((s) => s.updateDevice)
    const isTouch = useStore((s) => s.isTouch)
    const location = useLocation()

    useEffect(() => {
        updateDevice()
        window.addEventListener('resize', updateDevice)
        return () => window.removeEventListener('resize', updateDevice)
    }, [updateDevice])

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
        <main className="u-content">
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

            <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                    <>
                        <Hero />
                        <Work />
                        <Process />
                        <About />
                        <Contact />
                    </>
                } />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

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
