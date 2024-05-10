import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './DestinationList.module.css'; // Importing the CSS module

const DestinationList = () => {
  // Sample list of destinations for demonstration
  const destinations = [
    { id: 1, name: 'Paris', description: 'The City of Light' },
    { id: 2, name: 'New York', description: 'The Big Apple' },
    { id: 3, name: 'Tokyo', description: 'Land of the Rising Sun' },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Destinations</h2>
      {destinations.map((destination) => (
        <div key={destination.id} className={styles.destination}>
          <h3>{destination.name}</h3>
          <p className={styles.description}>{destination.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DestinationList;