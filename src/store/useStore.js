import { create } from 'zustand'
import { isMobile, isTablet, isTouch } from '../utils/viewport'

const useStore = create((set) => ({
    progress: 0,
    loaded: false,
    isTransitioning: false,
    activeProject: null,
    cursorType: 'default',
    menuOpen: false,

    // Device state
    isMobile: isMobile(),
    isTablet: isTablet(),
    isTouch: isTouch(),

    setProgress: (progress) => set({ progress }),
    setLoaded: (loaded) => set({ loaded }),
    setTransitioning: (isTransitioning) => set({ isTransitioning }),
    setActiveProject: (activeProject) => set({ activeProject }),
    setCursorType: (cursorType) => set({ cursorType }),
    setMenuOpen: (menuOpen) => set({ menuOpen }),

    // Update device state
    updateDevice: () => set({
        isMobile: isMobile(),
        isTablet: isTablet(),
        isTouch: isTouch(),
    })
}))

export default useStore
