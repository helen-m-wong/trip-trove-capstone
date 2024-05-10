import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'; // Importing the updated CSS module
import profileIcon from '../assets/icons/profile.svg'; // Corrected import path
import searchIcon from '../assets/icons/search.svg'; // Corrected import path

const Header = () => {
  return (
    <header className={styles.navbar}>
      <ul className={styles['nav-options']}>
        <li>
          <NavLink
            to="/"
            exact
            className={(navData) => 
              navData.isActive ? styles.selected : styles['nav-item']
            }
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/destinations"
            exact
            className={(navData) => 
              navData.isActive ? styles.selected : styles['nav-item']
            }
          >
            DESTINATIONS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tours"
            exact
            className={(navData) => 
              navData.isActive ? styles.selected : styles['nav-item']
            }
          >
            TRIPS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/community"
            exact
            className={(navData) => 
              navData.isActive ? styles.selected : styles['nav-item']
            }
          >
            COMMUNITY
          </NavLink>
        </li>
      </ul>
      <div className={styles.icons}>
        <img src={profileIcon} className={styles.icon} alt="Profile Icon" />
        <img src={searchIcon} className={styles.icon} alt="search Icon" />
      </div>
    </header>
  );
};

export default Header;
