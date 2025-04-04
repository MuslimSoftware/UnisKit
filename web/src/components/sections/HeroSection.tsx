import React from 'react';
import styles from './HeroSection.module.css';
import Button from '@/components/shared/Button';
import { BRAND_NAME } from '@fullstack-template/shared';

const heroData = {
  headlineMain: `Jumpstart Your Business`,
  headlineHighlight: "Your Business",
  headlineSub: `Everything you need to start`,
  description: `${BRAND_NAME} provides a production-ready monorepo foundation. Launch your next full-stack application with confidence and speed.`,
  cta: {
    text: "Get Started", 
    href: "#features", 
  },
  features: [
    { icon: "📱", label: "React Native Expo" },
    { icon: "💻", label: "React Vite" },
    { icon: "🐍", label: "Python FastAPI" },
  ],
};

const HeroSection = () => {
  const renderHeadline = () => {
    const parts = heroData.headlineMain.split(heroData.headlineHighlight);
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}<span className={styles.headlineHighlight}>{heroData.headlineHighlight}</span>{parts[1]}
        </>
      );
    }
    return <>{heroData.headlineMain}</>;
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.headline}>
          {renderHeadline()}
          <span className={styles.headlineSub}>{heroData.headlineSub}</span>
        </h1>

        <p className={styles.description}>{heroData.description}</p>

        <div className={styles.ctaContainer}>
          <a href={heroData.cta.href} className={styles.ctaLink}> 
            <Button 
              variant="primary"
              className={styles.ctaButton}
            >
              {heroData.cta.text}
            </Button>
          </a>
        </div>

        <div className={styles.visualPlaceholder}>
          <p>{BRAND_NAME} Visual Placeholder</p>
        </div>
      </div>

      {/* Features Bar - simplified labels */} 
      <div className={styles.featuresBar}>
        {heroData.features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <span className={styles.featureIcon}>{feature.icon}</span>
            {/* Only show label in the bottom bar */}
            <span className={styles.featureLabel}>{feature.label}</span> 
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection; 