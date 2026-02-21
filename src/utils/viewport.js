/**
 * Viewport Utility
 * Handles device detection and breakpoint matching.
 */

export const breakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1440,
}

export const isMobile = () => {
    if (typeof window === 'undefined') return false
    return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < breakpoints.mobile
    )
}

export const isTablet = () => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= breakpoints.mobile && window.innerWidth < breakpoints.tablet
}

export const isTouch = () => {
    if (typeof window === 'undefined') return false
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
