import React, { useState } from 'react';
import styles from './Carousel.module.css';
import leftButton from '../../assets/images/leftbutton.png'; 
import rightButton from '../../assets/images/rightbutton.png'; 

// Example images and titles
import exampleImage1 from '../../assets/images/exampleimage1.png';
import exampleImage2 from '../../assets/images/exampleimage2.png';
import exampleImage3 from '../../assets/images/exampleimage3.png';

const images = [
  { src: exampleImage1, title: "Destination 1" },
  { src: exampleImage2, title: "Destination 2" },
  { src: exampleImage3, title: "Destination 3" },
  { src: exampleImage1, title: "Destination 4" },
  { src: exampleImage2, title: "Destination 5" },
];

const Carousel = () => {
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
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.carouselHeader}>
          <p className={styles.carouselHeaderText}>Best Destinations to Experience</p>
          <div className={styles.carouselButtons}>
            <img src={leftButton} alt="Previous" className={styles.carouselButton} onClick={prevSlide} />
            <img src={rightButton} alt="Next" className={styles.carouselButton} onClick={nextSlide} />
          </div>
        </div>
        <div className={styles.carousel}>
          {getVisibleImages().map((item, index) => (
            <div key={index} className={styles.carouselItem}>
              <img src={item.src} alt={`Slide ${index}`} className={styles.carouselImage} />
              <p className={styles.imageTitle}>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
