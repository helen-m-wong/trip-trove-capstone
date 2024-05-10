import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './TourDetails.module.css';

// Mock data to represent tour details (you would replace this with actual data)
const tourData = {
  id: 1,
  title: 'Paris City Tour',
  description: 'Explore the beautiful city of Paris, with visits to the Eiffel Tower, Louvre Museum, and more.',
  image: 'https://via.placeholder.com/600x400', // Placeholder image
  additionalInfo: {
    duration: '3 days',
    price: '$499',
    difficulty: 'Moderate',
  },
};

const TourDetails = () => {
  // Use `useParams` to get the tour ID from the URL
  const { id } = useParams();

  // Here, you would fetch the actual tour details based on the ID
  // For this example, we're using mock data
  const tour = tourData; // In a real scenario, you'd fetch this from a data source

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{tour.title}</h2>
      <p className={styles.description}>{tour.description}</p>
      <img src={tour.image} alt={tour.title} className={styles.image} />
      <div className={styles.info}>
        <div className={styles['info-item']}>
          <strong>Duration:</strong> {tour.additionalInfo.duration}
        </div>
        <div className={styles['info-item']}>
          <strong>Price:</strong> {tour.additionalInfo.price}
        </div>
        <div className={styles['info-item']}>
          <strong>Difficulty:</strong> {tour.additionalInfo.difficulty}
        </div>
      </div>
    </div>
  );
};

export default TourDetails;