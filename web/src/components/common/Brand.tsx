import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for internal navigation
import styles from './Brand.module.css';
import { BRAND_NAME } from '@fullstack-template/shared';

interface BrandProps {
  /** Optional additional class names */
  className?: string;
  /** Optional font size override for the link */
  fontSize?: string;
}

const Brand: React.FC<BrandProps> = ({ 
  className = '',
  fontSize
}) => {
  const linkStyle = fontSize ? { fontSize } : {};

  return (
    <Link 
      to="/" 
      className={`${styles.brandLink} ${className}`}
      style={linkStyle}
      aria-label={`${BRAND_NAME} Home`}
    >
      {/* Light Logo */}
      <img 
        src="/logo-dark.webp" 
        alt=""
        className={`${styles.logoImage} ${styles.logoLight}`} 
        aria-hidden="true"
      />
      {/* Dark Logo */}
      <img 
        src="/logo-light.webp" 
        alt=""
        className={`${styles.logoImage} ${styles.logoDark}`}
        aria-hidden="true"
      />
      <span>{BRAND_NAME.toUpperCase()}</span>
    </Link>
  );
};

export default Brand; 