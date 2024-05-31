import React from 'react';
import Carousel from '../../components/Carousel';
import styles from './Trips.module.css'; // Importing the CSS module for other sections

function Trips() {
    return (
        <>
            {/* First section */}
            <div className={styles.firstSection}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>Expand Your World</h1>
                    <p className={styles.subtitle}>
                        Are you looking for the perfect timing for your experience? Gift the experience of a lifetime. Access your accommodation world.
                    </p>
                </div>
            </div>

            {/* Carousel Section */}
            <Carousel title="Upcoming Trips" />
        </>
    );
}

export default Trips;
