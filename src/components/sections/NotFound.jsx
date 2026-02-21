import React from 'react'
import { Link } from 'react-router-dom'
import SplitText from '../shared/SplitText'
import styles from './NotFound.module.scss'

export default function NotFound() {
    return (
        <section className={styles.notFound}>
            <div className={styles.content}>
                <SplitText className={`${styles.title} t-display`}>404</SplitText>
                <p className="t-body">This page has entered the digital void.</p>
                <Link to="/" className={`${styles.link} t-label`}>
                    RETURN TO HOME →
                </Link>
            </div>
        </section>
    )
}
