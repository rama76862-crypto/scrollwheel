import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import useStore from './store/useStore'

// ─── Error Boundary ──────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }
    componentDidCatch(error, info) {
        // Log to an external service if available
        console.error('[FATAL]', error, info)
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    position: 'fixed', inset: 0, background: '#0a0a09', color: '#fff',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', fontFamily: 'monospace', padding: '2rem', zIndex: 9999
                }}>
                    <div style={{ maxWidth: '400px', textAlign: 'center' }}>
                        <h1 style={{ color: '#ff4444', fontSize: '1.5rem', marginBottom: '1rem' }}>ERROR_NOT_FOUND</h1>
                        <p style={{ color: '#888', marginBottom: '2rem' }}>A critical exception occurred. The digital world has collapsed.</p>
                        <pre style={{
                            color: '#555', fontSize: '0.7rem', background: '#111',
                            padding: '1rem', borderRadius: '4px', overflowX: 'auto', textAlign: 'left'
                        }}>
                            {this.state.error?.toString()}
                        </pre>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                marginTop: '2rem', padding: '0.8rem 2rem', background: '#fff',
                                color: '#000', border: 'none', cursor: 'pointer', borderRadius: '2px',
                                fontWeight: 'bold', transition: 'opacity 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.opacity = '0.8'}
                            onMouseOut={(e) => e.target.style.opacity = '1'}
                        >
                            REBOOT_SYSTEM
                        </button>
                    </div>
                </div>
            )
        }
        return this.props.children
    }
}

import Scene from './components/webgl/Scene'
import Loader from './components/ui/Loader'
import Cursor from './components/ui/Cursor'
import Navigation from './components/ui/Navigation'
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
            <Navigation />
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
            <ErrorBoundary>
                <AppContent />
            </ErrorBoundary>
        </Router>
    )
}
