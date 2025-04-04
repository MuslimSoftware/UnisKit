import React from 'react';
import styles from './HeroSection.module.css';
import Button from '@/components/shared/Button'; // Keep Button import

// Data derived from the provided JSON
const heroData = {
  badge: "Backed by ✌ AngelList",
  headlineMain: "Advanced Crypto Trading",
  headlineHighlight: "Crypto Trading", // Part to highlight
  headlineSub: "Built for Retail Investors",
  description: "Smart trading terminal, powered by real-time data and built for clarity, speed, and total control.",
  cta: {
    text: "Launch Terminal",
    href: "#launch",
  },
  features: [
    { icon: "💼", label: "Wallet Support" },
    { icon: "⚙️", label: "Fully Customizable" },
    { icon: "🛡️", label: "100% Secured", subtext: "All Systems Operational" },
    { icon: "🏎️", label: "Pro Performance" }
  ],
};

const HeroSection = () => {
  // Helper function to render the headline with highlighted part
  const renderHeadline = () => {
    const parts = heroData.headlineMain.split(heroData.headlineHighlight);
    return (
      <>
        {parts[0]}<span className={styles.headlineHighlight}>{heroData.headlineHighlight}</span>{parts[1]}
      </>
    );
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        {/* Badge */}
        <div className={styles.badge}>{heroData.badge}</div>

        {/* Headline */}
        <h1 className={styles.headline}>
          {renderHeadline()} {/* Main headline with highlight */}
          <span className={styles.headlineSub}>{heroData.headlineSub}</span> {/* Sub headline */} 
        </h1>

        {/* Description */}
        <p className={styles.description}>{heroData.description}</p>

        {/* CTA Button */} 
        <div className={styles.ctaContainer}>
          <a href={heroData.cta.href} className={styles.ctaLink}>
            <Button 
              variant="primary" // Assuming primary style matches the visual
              className={styles.ctaButton} // Add class for specific styles like glow
            >
              {heroData.cta.text}
            </Button>
          </a>
        </div>

        {/* Visual Placeholder */} 
        <div className={styles.visualPlaceholder}>
          {/* Replace with actual image/component later */}
          <p>Visual Element Placeholder</p>
        </div>
      </div>

      {/* Features Bar */} 
      <div className={styles.featuresBar}>
        {heroData.features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <span className={styles.featureIcon}>{feature.icon}</span>
            <div className={styles.featureTextContainer}>
                <span className={styles.featureLabel}>{feature.label}</span>
                {feature.subtext && <span className={styles.featureSubtext}>{feature.subtext}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection; 