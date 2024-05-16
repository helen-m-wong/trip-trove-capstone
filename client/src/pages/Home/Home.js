import React from 'react';
import styles from './Home.module.css'; // Importing the CSS module
import backgroundImage1 from '../../assets/images/homepage1.jpg'; // Import the first background image
import backgroundImage2 from '../../assets/images/homepage2.webp'; // Import the second background image
import iconButtonDown from '../../assets/images/iconbuttondown.png'; 
import leftButton from '../../assets/images/leftbutton.png'; 
import rightButton from '../../assets/images/rightbutton.png'; 
import Carousel from '../../components/Carousel'; // Import your Carousel component

const Home = () => {
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
              {/* <img src={leftButton} alt="Left Button" className={styles.carouselButton} />
              <img src={rightButton} alt="Right Button" className={styles.carouselButton} /> */}
            </div>
          </div>
          <Carousel />
        </div>
      </div>

    </div>
  );
};

export default Home;
