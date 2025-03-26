import React from 'react';
import { ThemeProviderBase } from './ThemeContext';

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: 'light' | 'dark' | 'system';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children,
  defaultMode = 'system'
}) => {
  // Determine initial mode based on defaultMode prop
  const getInitialMode = () => {
    if (defaultMode === 'system') {
      // In a real implementation, we would check system preferences
      // For now, default to light mode
      return 'light';
    }
    return defaultMode;
  };

  return (
    <ThemeProviderBase initialMode={getInitialMode()}>
      {children}
    </ThemeProviderBase>
  );
};

export default ThemeProvider;
