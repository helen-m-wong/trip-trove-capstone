import React from 'react';
import styles from './Experiences.module.css'; // Importing the CSS module
import Carousel from '../../components/Carousel'; // Import the Carousel component
import FeaturedExperience from '../../components/FeaturedExperience';

// Example images for demonstration purposes (if needed)
import chinaImage from '../../assets/images/china.png';
import germanyImage from '../../assets/images/germany.png';
import austriaImage from '../../assets/images/austria.png';
import switzerlandImage from '../../assets/images/switzerland.png';
import usaImage from '../../assets/images/usa.png';
import japanImage from '../../assets/images/japan.png';
import nepalImage from '../../assets/images/nepal.png';
import singaporeImage from '../../assets/images/singapore.png';
import hongkongImage from '../../assets/images/hongkong.png';

// Example images for the featured experience section
import featuredExampleImage1 from '../../assets/images/featuredexample1.png';
import featuredExampleImage4 from '../../assets/images/featuredexample4.png';

function Experiences() {
    return (
        <div className={styles.experiencesPage}>

            {/* Destination List Integration */}
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
                        <img src={featuredExampleImage4} alt="Large Featured" className={styles.largeImage} />
                        <div className={styles.smallImages}>
                            <FeaturedExperience />
                            <FeaturedExperience />
                        </div>
                    </div>
                </div>

                {/* Carousel Section */}
                <Carousel title="Best Destinations to Experience" />
            </div>
        </div>
    );
}

export default Experiences;
