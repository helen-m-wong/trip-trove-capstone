import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Carousel.module.css'; // Importing the CSS module for carousel
import leftButton from '../assets/images/leftbutton.png';
import rightButton from '../assets/images/rightbutton.png';

const Carousel = ({ title }) => {
    const [trips, setTrips] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch('/api/trips')
            .then(response => response.json())
            .then(data => setTrips(data))
            .catch(error => console.error('Error fetching trip data:', error));
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + trips.length) % trips.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % trips.length);
    };

    const getVisibleImages = () => {
        if (trips.length === 0) {
            return [];
        }
        return [trips[currentIndex]];
    };

    return (
        <div className={styles.thirdSection}>
            <div className={styles.content}>
                <div className={styles.carouselHeader}>
                    <p className={styles.carouselHeaderText}>{title}</p>
                    <div className={styles.carouselButtons}>
                        <img src={leftButton} alt="Previous" className={styles.carouselButton} onClick={prevSlide} />
                        <img src={rightButton} alt="Next" className={styles.carouselButton} onClick={nextSlide} />
                    </div>
                </div>
                <div className={styles.carousel}>
                    {getVisibleImages().map((trip, index) => (
                        <Link to={`/trips/${trip._id}`} key={index} className={styles.carouselImageContainer}>
                            <img src={trip.TripImage} alt={`Slide ${index}`} className={styles.carouselImage} />
                            <div className={styles.tripInfo}>
                                <h3 className={styles.tripName}>{trip.TripName}</h3>
                                <p className={styles.tripDescription}>{trip.TripDescription}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
