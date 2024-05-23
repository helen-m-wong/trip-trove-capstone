import React from 'react';
import styles from './Footer.module.css'; // Importing the CSS module

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.centeredText}>
        <p>Discover a premier digital consumer brand offering comprehensive travel information and inspiration.</p>
      </div>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h4>ABOUT</h4>
          <ul>
            <li>FAQs</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>DESTINATIONS</h4>
          <ul>
            <li>TRIPS</li>
            <li>NEWS</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>COMMUNITY</h4>
          <ul>
            <li>EVENTS</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;