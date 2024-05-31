import React, { useState } from 'react';
import styles from './TourList.module.css';
import leftButton from '../../assets/images/leftbutton.png';
import rightButton from '../../assets/images/rightbutton.png';

// Example images
import exampleImage1 from '../../assets/images/exampleimage1.png';
import exampleImage2 from '../../assets/images/exampleimage2.png';
import exampleImage3 from '../../assets/images/exampleimage3.png';

const images = [exampleImage1, exampleImage2, exampleImage3, exampleImage1, exampleImage2];

const TourList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div>
      {/* First section */}
      <div className={styles.firstSection}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Expand Your World</h1>
          <p className={styles.subtitle}>
            Are you looking for the perfect timing for your experience? Gift the experience of a lifetime. Access your accommodation world.
          </p>
        </div>
      </div>

      {/* Third section with the carousel */}
      <div className={`${styles.section} ${styles.thirdSection}`}>
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
    </div>
  );
};

export default TourList;
