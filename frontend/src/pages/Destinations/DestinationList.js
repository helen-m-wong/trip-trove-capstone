import React, { useState } from 'react';
import styles from './DestinationList.module.css'; // Importing the CSS module
import leftButton from '../../assets/images/leftbutton.png'; 
import rightButton from '../../assets/images/rightbutton.png'; 

import chinaImage from '../../assets/images/china.png';
import germanyImage from '../../assets/images/germany.png';
import austriaImage from '../../assets/images/austria.png';
import switzerlandImage from '../../assets/images/switzerland.png';
import usaImage from '../../assets/images/usa.png';
import japanImage from '../../assets/images/japan.png';
import nepalImage from '../../assets/images/nepal.png';
import singaporeImage from '../../assets/images/singapore.png';
import hongkongImage from '../../assets/images/hongkong.png';

// Example images
import exampleImage1 from '../../assets/images/exampleimage1.png';
import exampleImage2 from '../../assets/images/exampleimage2.png';
import exampleImage3 from '../../assets/images/exampleimage3.png';
import featuredExampleImage1 from '../../assets/images/featuredexample1.png';
import featuredExampleImage2 from '../../assets/images/featuredexample2.png';
import featuredExampleImage3 from '../../assets/images/featuredexample3.png';

const images = [exampleImage1, exampleImage2, exampleImage3, exampleImage1, exampleImage2];

const DestinationList = () => {
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
    <div className={styles.destinationList}>
      {/* Title Section */}
      <div className={styles.bestDestinationsSection}>
        <h2 className={styles.bestDestinationsTitleSection}>Best Destinations to Experience</h2>
      </div>

      {/* Countries Grid Section */}
      <div className={styles.bestDestinationsSection}>
        <div className={styles.countriesGrid}>
          <div className={styles.country}>
            <img src={chinaImage} alt="China" />
            <p>CHINA</p>
          </div>
          <div className={styles.country}>
            <img src={germanyImage} alt="Germany" />
            <p>GERMANY</p>
          </div>
          <div className={styles.country}>
            <img src={austriaImage} alt="Austria" />
            <p>AUSTRIA</p>
          </div>
          <div className={styles.country}>
            <img src={switzerlandImage} alt="Switzerland" />
            <p>SWITZERLAND</p>
          </div>
          <div className={styles.country}>
            <img src={usaImage} alt="United States" />
            <p>UNITED STATES</p>
          </div>
          <div className={styles.country}>
            <img src={japanImage} alt="Japan" />
            <p>JAPAN</p>
          </div>
          <div className={styles.country}>
            <img src={nepalImage} alt="Nepal" />
            <p>NEPAL</p>
          </div>
          <div className={styles.country}>
            <img src={singaporeImage} alt="Singapore" />
            <p>SINGAPORE</p>
          </div>
          <div className={styles.country}>
            <img src={hongkongImage} alt="Hong Kong" />
            <p>HONG KONG</p>
          </div>
        </div>
      </div>

      {/* Featured Experience Section */}
      <div className={styles.featuredExperienceSection}>
        <h2 className={styles.sectionTitle}>Featured Experience</h2>
        <div className={styles.featuredExperience}>
          <img src={featuredExampleImage1} alt="Large Featured" className={styles.largeImage} />
          <div className={styles.smallImages}>
            <img src={featuredExampleImage2} alt="Small Featured 1" />
            <img src={featuredExampleImage3} alt="Small Featured 2" />
          </div>
        </div>
      </div>

      {/* Third section with the carousel */}
      <div className={styles.carouselSection}>
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
              {getVisibleImages().map((image, index) => (
                  <img key={index} src={image} alt={`Slide ${index}`} className={styles.carouselImage} />
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DestinationList;
