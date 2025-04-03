import React from 'react';
import styles from './FeaturesSection.module.css';
// Import icons later (e.g., from react-icons)

// Placeholder data
const features = [
  { icon: '📱', title: 'React Native Ready', description: 'Mobile app foundation with Expo.' },
  { icon: '💻', title: 'React Web Frontend', description: 'Modern landing page/dashboard setup.' },
  { icon: '⚙️', title: 'Python Backend', description: 'Robust API layer with FastAPI.' },
  { icon: '🎨', title: 'Shared Theme', description: 'Consistent UI across platforms.' },
  { icon: '🔒', title: 'Authentication', description: 'Built-in auth flow (OTP + JWT).' },
  { icon: '⚡', title: 'Monorepo Setup', description: 'Managed with PNPM workspaces.' },
];

const FeaturesSection = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Everything You Need</h2>
        <p className={styles.subtitle}>
          A solid foundation with best practices baked in.
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