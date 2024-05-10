import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Home.module.css'; // Importing the CSS module

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <h2>Welcome to Trip Trove</h2>
      </div>
    </div>
  );
};

export default Home;