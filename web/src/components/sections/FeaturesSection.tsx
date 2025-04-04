import React from 'react';
import styles from './FeaturesSection.module.css';
import { BRAND_NAME } from '@fullstack-template/shared';
// Import icons later (e.g., from react-icons)

// Placeholder data
const features = [
  { icon: '📱', title: 'React Native Ready', description: 'Cross-platform mobile app foundation with Expo.' },
  { icon: '💻', title: 'React Web Frontend', description: 'Vite-powered, responsive web interface setup.' },
  { icon: '🐍', title: 'Python FastAPI Backend', description: 'Async-ready, robust API layer.' },
  { icon: '🎨', title: 'Shared Theme & Types', description: 'Consistent UI and data structures across platforms.' },
  { icon: '🔒', title: 'JWT Authentication', description: 'Secure, standard built-in auth flow (adaptable).' },
  { icon: '🔗', title: 'PNPM Monorepo', description: 'Efficiently managed codebase with shared packages.' },
];

const FeaturesSection = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>The {BRAND_NAME} Advantage</h2>
        <p className={styles.subtitle}>
          A cohesive toolkit designed for rapid development and scalability.
        </p>
        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.featureCard}>
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 