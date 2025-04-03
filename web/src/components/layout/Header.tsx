import React from 'react';
import styles from './Header.module.css';
// Import Link from react-router-dom later if needed

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          {/* Replace with actual logo/link */}
          <a href="/">Logo</a>
        </div>
        <nav className={styles.nav}>
          {/* Replace with actual navigation links */}
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
          {/* Add Login/Signup Buttons if needed */}
        </nav>
      </div>
    </header>
  );
};

export default Header; 