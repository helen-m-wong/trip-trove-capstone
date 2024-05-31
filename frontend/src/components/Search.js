import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Search.module.css';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    fetchTrips();
  }, [query]);

  const fetchTrips = () => {
    fetch(`http://localhost:3000/trips?name=${query}`)
      .then(response => response.json())
      .then(data => setSearchResults(data))
      .catch(error => console.error('Error fetching search results:', error));
  };

  return (
    <div className={styles.searchResults}>
      <h1>Search Results for "{query}"</h1>
      {searchResults.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        searchResults.map((trip) => (
          <div key={trip._id} className={styles.tripCard}>
            <img src={trip.TripImage} alt={trip.TripName} className={styles.tripImage} />
            <div className={styles.tripInfo}>
              <h3>{trip.TripName}</h3>
              <p>{trip.TripDescription}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Search;
