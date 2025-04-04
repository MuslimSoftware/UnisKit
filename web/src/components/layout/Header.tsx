import React, { useState } from 'react';
import styles from './Header.module.css';
// Import Link from react-router-dom later if needed

// Data from JSON
const navLinks = [
  { label: "Terminal", href: "#terminal" },
  { label: "Markets", href: "#markets" },
  { label: "Analytics", href: "#analytics" },
  { label: "Login", href: "#login" }
];

const socialIcons = [
  // Using text placeholders for icons initially
  { platform: "Instagram", icon: "Insta", href: "#" }, 
  { platform: "LinkedIn", icon: "LI", href: "#" },
  { platform: "X", icon: "X", href: "#" }
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          {/* Replace with actual logo/link */}
          <a href="/">FLUXON</a> {/* Updated logo text */} 
        </div>

        {/* Hamburger Button - Controls nav visibility on mobile */}
        <button 
          className={`${styles.hamburgerButton} ${isMobileMenuOpen ? styles.isOpen : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="header-nav" // Link button to the nav it controls
        >
          <span></span> 
          <span></span>
          <span></span>
        </button>

        {/* Navigation container - includes links and social icons */}
        {/* ID matches aria-controls for accessibility */}
        <nav id="header-nav" className={`${styles.nav} ${isMobileMenuOpen ? styles.navMobileOpen : ''}`}>
          {/* Centered Navigation Links */}
          <div className={styles.navLinks}>
            {navLinks.map(link => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </div>
          
          {/* Social Icons (Right Aligned on Desktop) */}
          <div className={styles.socialIcons}>
            {socialIcons.map(social => (
              <a key={social.platform} href={social.href} aria-label={social.platform} className={styles.socialLink}>
                {/* Replace text with actual icons/svgs later */} 
                {social.icon} 
              </a>
            ))}
          </div>
        </nav>

      </div>
    </header>
  );
};

export default Header; 