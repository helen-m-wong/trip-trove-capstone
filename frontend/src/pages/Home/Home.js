import React, { useState } from 'react';
import styles from './Home.module.css'; // Importing the CSS module
import backgroundImage1 from '../../assets/images/homepage1.jpg'; // Import the first background image
import backgroundImage2 from '../../assets/images/homepage2.webp'; // Import the second background image
import iconButtonDown from '../../assets/images/iconbuttondown.png'; 
import leftButton from '../../assets/images/leftbutton.png'; 
import rightButton from '../../assets/images/rightbutton.png'; 

//Example images
import exampleImage1 from '../../assets/images/exampleimage1.png';
import exampleImage2 from '../../assets/images/exampleimage2.png';
import exampleImage3 from '../../assets/images/exampleimage3.png';

const images = [exampleImage1, exampleImage2, exampleImage3, exampleImage1, exampleImage2];

const Home = () => {
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
      {/* First div with the first background image */}
      <div className={styles.section} style={{ backgroundImage: `url(${backgroundImage1})`, backgroundSize: 'cover' }}>
        {/* Content for the first section */}
        <div className={styles.content}>
          <h1 className={styles.title}>Discover story-worthy travel moments</h1>
          <div className={styles.searchBar}>
            <input type="text" className={styles.searchInput} />
            <button className={styles.searchButton}>Search</button>
          </div>
        </div>
      </div>
      
      {/* Second div with the second background image */}
      <div className={styles.section} style={{ backgroundImage: `url(${backgroundImage2})`, backgroundSize: 'cover' }}>
        {/* Content for the second section */}
        <div className={styles.content}>
          <h2 className={styles.subtitle}>Best Destinations to Experience</h2>
          <div className={styles.buttonContainer}>
              <img src={iconButtonDown} alt="Down Arrow" className={styles.arrowImage} />
          </div>
        </div>
      </div>
      
      {/* Third section with the carousel */}
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
  );
};

export default Home;
