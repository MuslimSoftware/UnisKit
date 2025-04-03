import React from 'react';
import styles from './HeroSection.module.css';
import Button from '@/components/shared/Button'; // Import Button

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div> {/* Optional overlay */}
      <div className={styles.content}>
        <h1 className={styles.title}>Build Faster, Ship Together</h1>
        <p className={styles.subtitle}>
          The ultimate template for Full Stack applications with React Native, React, and a powerful Backend.
        </p>
        <div className={styles.ctaButtons}>
          {/* Use Button component */}
          <Button variant="primary">Get Started</Button>
          <Button variant="secondary">Learn More</Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 