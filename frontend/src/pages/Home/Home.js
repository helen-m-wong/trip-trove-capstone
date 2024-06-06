import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Home.module.css'; // Importing the CSS module
import backgroundImage1 from '../../assets/images/homepage1.jpg'; // Import the first background image
import backgroundImage2 from '../../assets/images/homepage2.webp'; // Import the second background image
import iconButtonDown from '../../assets/images/iconbuttondown.png';
import Carousel from '../../components/Carousel'; // Import the Carousel component

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const carouselRef = useRef(null); // Create a ref for the carousel section
  const navigate = useNavigate(); 


  const handleSearchButtonClick = (e) => {
    e.preventDefault();
    console.log(searchQuery);
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const scrollToCarousel = () => {
    carouselRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* First div with the first background image */}
      <div className={styles.section} style={{ backgroundImage: `url(${backgroundImage1})`, backgroundSize: 'cover' }}>
        {/* Content for the first section */}
        <div className={styles.content}>
          <h1 className={styles.title}>Discover story-worthy travel moments</h1>
          <div className={styles.searchBar}>
            <input
              type="text"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Handle input change
            />
            <button className={styles.searchButton} onClick={handleSearchButtonClick}>Search</button> {/* Handle button click */}
          </div>
        </div>
      </div>

      {/* Second div with the second background image */}
      <div className={styles.section} style={{ backgroundImage: `url(${backgroundImage2})`, backgroundSize: 'cover' }}>
        {/* Content for the second section */}
        <div className={styles.content}>
          <h2 className={styles.subtitle}>Best Destinations to Experience</h2>
          <div className={styles.buttonContainer}>
            <img src={iconButtonDown} alt="Down Arrow" className={styles.arrowImage} onClick={scrollToCarousel} /> {/* Scroll to carousel */}
          </div>
        </div>
      </div>

      <div className={`${styles.section} ${styles.carouselSection}`}>
        <div ref={carouselRef}>
          <Carousel title="Best Destinations to Experience" />
        </div>
      </div>


    </div>
  );
};

export default Home;
