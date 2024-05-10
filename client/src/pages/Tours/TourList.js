import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './TourList.module.css';

// Example data for tour list
const tourListData = [
  { id: 1, title: 'Paris City Tour', description: 'Explore Paris and its famous landmarks.' },
  { id: 2, title: 'New York City Tour', description: 'Discover the highlights of New York City.' },
  { id: 3, title: 'Tokyo City Tour', description: 'Experience the vibrant city of Tokyo.' },
];

const TourList = () => {
  return (
    <div className={styles.container}>
      <h2>Available Tours</h2>
      <ul className={styles['tour-list']}>
        {tourListData.map((tour) => (
          <li key={tour.id} className={styles['tour-item']}>
            <Link to={`/tours/${tour.id}`} className={styles['tour-link']}>
              <div className={styles['tour-title']}>{tour.title}</div>
              <div className={styles['tour-description']}>{tour.description}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourList;