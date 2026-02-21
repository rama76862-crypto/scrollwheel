import React from 'react'
import ReactDOM from 'react-dom/client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import Lenis from 'lenis'
import * as THREE from 'three'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import useStore from './store/useStore'
import './styles/global.scss'

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, CustomEase)

// Set GSAP Defaults
gsap.defaults({
    ease: 'expo.out',
    duration: 1.2
})

// Define Custom Ease "lusion"
CustomEase.create('lusion', 'M0,0 C0.16,1.08 0.38,1 1,1')

// Initialize Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})
window.lenis = lenis

// Connect Lenis to GSAP Ticker
gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </React.StrictMode>
)
