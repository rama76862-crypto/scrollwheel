import React from 'react'
import useTransition from '../../hooks/useTransition'

/**
 * TransitionLink Component
 * Intercepts Link clicks to run the GSAP transition before navigating.
 */
export default function TransitionLink({ to, children, className }) {
    const { transitionTo } = useTransition()

    const handleClick = (e) => {
        e.preventDefault()
        transitionTo(to)
    }

    return (
        <a href={to} className={className} onClick={handleClick}>
            {children}
        </a>
    )
}
