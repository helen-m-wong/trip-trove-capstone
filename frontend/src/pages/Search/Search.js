import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from '../../components/FeaturedExperience.module.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const searchQuery = query.get('query');

  useEffect(() => {
    const fetchExperiences = async () => {
        try {
            const response = await fetch(`http://localhost:3000/experiences?keyword=${searchQuery}`);
            const data = await response.json();
            if (response.status === 200) {
              console.log('Experience data retrieved');
              setSearchResults(data);
              setLoading(false);
            }
        } catch (error) {
            console.log('Error fetching experiences');
            setLoading(false);
        }
    };

    fetchExperiences();
  }, [searchQuery]);

  if (loading) return <p>Loading...</p>;

  /*
  useEffect(() => {
    fetchTrips();
  }, [query]);

  const fetchTrips = () => {
    fetch(`http://localhost:3000/trips?name=${searchQuery}`)
      .then(response => response.json())
      .then(data => setSearchResults(data))
      .catch(error => console.error('Error fetching search results:', error));
  };
  */

  return (
    <div className={styles.searchResults}>
      <h1>Search Results for "{searchQuery}"</h1>
      {searchResults.length === 0 ? (
        <p>No experiences found.</p>
      ) : (
        searchResults.map((experience) => (
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
        ))
      )}
    </div>
  );
};

export default Search;
