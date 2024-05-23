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
            to="/experiences"
            exact
            className={(navData) => 
              navData.isActive ? styles.selected : styles['nav-item']
            }
          >
            EXPERIENCES
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/trips"
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
            to="/trips/add"
            exact
            className={(navData) => 
              navData.isActive ? styles.selected : styles['nav-item']
            }
          >
            ADD TRIP
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/experiences/add"
            exact
            className={(navData) => 
              navData.isActive ? styles.selected : styles['nav-item']
            }
          >
            ADD EXPERIENCE
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
