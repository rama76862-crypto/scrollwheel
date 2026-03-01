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

// RAMA: main.jsx loading...

const showError = (msg, err) => {
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed;inset:0;background:#200;color:#f88;padding:20px;font-family:monospace;z-index:99999;overflow:auto;';
    div.innerHTML = `<h1>Initialization Error</h1><p>${msg}</p><pre>${err?.stack || err}</pre>`;
    document.body.appendChild(div);
};

try {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, CustomEase);

    // Set GSAP defaults
    gsap.defaults({
        ease: 'expo.out',
        duration: 1.2
    });

    // Create CustomEase
    CustomEase.create('lusion', 'M0,0 C0.16,1.08 0.38,1 1,1');

    // Initialize Lenis for smooth scrolling
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
    });
    window.lenis = lenis;

    // Connect Lenis to GSAP Ticker
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(500, 33);

    // Attempt React Render
    const rootEl = document.getElementById('root');
    if (!rootEl) throw new Error("Root element #root not found in DOM");

    ReactDOM.createRoot(rootEl).render(
        <React.StrictMode>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </React.StrictMode>
    );

} catch (error) {
    console.error("RAMA: FATAL ERROR during main.jsx execution", error);
    showError("FATAL ERROR in main.jsx", error);
}
