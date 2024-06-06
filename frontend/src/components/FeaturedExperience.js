import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedExperience.module.css'; // Importing the CSS module for the feature experience

const FeatureExperience = () => {
    const [experiences, setExperiences] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch('https://trip-trove-425520.wl.r.appspot.com/experiences')
            .then(response => response.json())
            .then(data => setExperiences(data))
            .catch(error => console.error('Error fetching experience data:', error));
    }, []);

    const getVisibleExperience = () => {
        if (experiences.length === 0) {
            return null;
        }
        return experiences[currentIndex];
    };

    const experience = getVisibleExperience();

    return (
        <div className={styles.featureExperience}>
            <div className={styles.content}>
                <div className={styles.featureExperienceHeader}>
                    {/* Removed the title paragraph */}
                </div>
                <div className={styles.featureExperienceSlides}>
                    {experience && (
                        <Link to={`/experiences/${experience._id}`} className={styles.featureExperienceSlide}>
                            <img src={experience.ExperienceImage} alt={experience.ExperienceName} className={styles.featureExperienceImage} />
                            <p>{experience.ExperienceName}</p>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeatureExperience;
