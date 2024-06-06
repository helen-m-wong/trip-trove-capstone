import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
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
            <li><NavLink to="/faq" className={styles.footerLink} activeClassName={styles.activeLink}>FAQs</NavLink></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>DESTINATIONS</h4>
          <ul>
            <li><NavLink to="/trips" className={styles.footerLink} activeClassName={styles.activeLink}>TRIPS</NavLink></li>
            <li><NavLink to="/experiences" className={styles.footerLink} activeClassName={styles.activeLink}>EXPERIENCES</NavLink></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
