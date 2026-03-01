import React from 'react'
import styles from './Grain.module.scss'

/**
 * Animated Grain Overlay
 * Provides a high-end cinematic texture to the entire application.
 */
const Grain = () => {
    return (
        <div className={styles.grainWrapper}>
            <div className={styles.grain} />
        </div>
    )
}

export default React.memo(Grain)
