import React, { useCallback, useState } from 'react';
import styles from './Header.module.css';
import { useTheme } from '@/context/ThemeContext';
import { FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'; 
import { BRAND_NAME } from '@fullstack-template/shared'; // Import brand name

// Data from JSON
const navLinks = [
  { label: "Company", href: "#company" },
  { label: "Features", href: "#features" },
  { label: "Support", href: "#support" }
];

const socialIcons = [
  { platform: "Instagram", icon: <FaInstagram />, href: "#" }, 
  { platform: "LinkedIn", icon: <FaLinkedinIn />, href: "#" },
  { platform: "X", icon: <FaXTwitter />, href: "#" }
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setThemePreference, isDark } = useTheme(); 

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleThemeCycle = useCallback(() => {
    const nextPreference = isDark ? 'light' : 'dark';
    setThemePreference(nextPreference);
  }, [isDark, setThemePreference]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/">{BRAND_NAME.toUpperCase()}</a> {/* Use brand name constant */}
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
        <nav id="header-nav" className={`${styles.nav} ${isMobileMenuOpen ? styles.navMobileOpen : ''}`}>
          {/* Centered Navigation Links */}
          <div className={styles.navLinks}>
            {navLinks.map(link => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </div>
          
          {/* Social Icons & Theme Toggle (Right Aligned on Desktop) */}
          <div className={styles.socialIcons}>
            {/* {socialIcons.map(social => (
              <a key={social.platform} href={social.href} aria-label={social.platform} className={styles.socialLink}>
                {social.icon} 
              </a>
            ))} */}
            
            {/* Theme Toggle Switch */} 
            <label 
              className={styles.themeSwitch} 
              title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            >
              <input 
                type="checkbox" 
                checked={isDark} 
                onChange={handleThemeCycle} 
              />
              <span className={styles.slider}></span> {/* Visual part of the switch */} 
            </label>
          </div>
        </nav>

      </div>
    </header>
  );
};

export default Header; 