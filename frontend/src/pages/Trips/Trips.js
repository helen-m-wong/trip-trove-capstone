import React, { useState, useEffect } from 'react';
//import { Link } from "react-router-dom";
import styles from './Trips.module.css'; // Importing the CSS module for carousel
import leftButton from '../../assets/images/leftbutton.png';
import rightButton from '../../assets/images/rightbutton.png';

// Example images for carousel
import exampleImage1 from '../../assets/images/exampleimage1.png';
import exampleImage2 from '../../assets/images/exampleimage2.png';
import exampleImage3 from '../../assets/images/exampleimage3.png';

const images = [exampleImage1, exampleImage2, exampleImage3, exampleImage1, exampleImage2];

function Trips() {
    const [trips, setTrips] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const getTrips = async () => {
            try {
                const res = await fetch('/trips');
                const data = await res.json();
                if (res.status === 200) {
                    console.log("Trips data retrieved");
                    setTrips(data);
                } else {
                    console.log("There was an error retrieving the data");
                }
            } catch (error) {
                console.log(error);
            }
        };
        getTrips();
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const getVisibleImages = () => {
        const visibleImages = [];
        for (let i = 0; i < 3; i++) {
            visibleImages.push(images[(currentIndex + i) % images.length]);
        }
        return visibleImages;
    };

    return (
        <>
            {/* <h2>Trips</h2>
            <Link to="/trips/add"
                style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: 'white',
                    color: 'black',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    border: 'none',
                    borderRadius: '5px',
                }}>
                Add Trip
            </Link>
            {trips.map((trip) => (
                <div key={trip._id}>
                    <Link to={`/trips/${trip._id}`} style={{ color: 'black' }}>
                        <h3>{trip.TripName}</h3>
                    </Link>
                </div>
            ))} */}

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
            <div className={styles.thirdSection}>
                <div className={styles.content}>
                    <div className={styles.carouselHeader}>
                        <p className={styles.carouselHeaderText}>Best Destinations to Experience</p>
                        <div className={styles.carouselButtons}>
                            <img src={leftButton} alt="Previous" className={styles.carouselButton} onClick={prevSlide} />
                            <img src={rightButton} alt="Next" className={styles.carouselButton} onClick={nextSlide} />
                        </div>
                    </div>
                    <div className={styles.carousel}>
                        {getVisibleImages().map((image, index) => (
                            <img key={index} src={image} alt={`Slide ${index}`} className={styles.carouselImage} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Trips;
