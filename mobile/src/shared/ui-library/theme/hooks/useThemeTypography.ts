import { useTheme } from '../ThemeContext';
import { useCallback } from 'react';
import { TextStyle } from 'react-native';
import { Theme } from '../types';

/**
 * Hook to get typography styles from the current theme
 * @returns {Object} Object containing typography getter functions
 */
export const useThemeTypography = () => {
  const { theme } = useTheme();
  
  const getTypography = useCallback((variant: keyof Theme['typography']): TextStyle => {
    if (variant in theme.typography) {
      return theme.typography[variant] as TextStyle;
    }
    return theme.typography.body1 as TextStyle;
  }, [theme]);
  
  return {
    getTypography,
    typography: theme.typography,
  };
};

export default useThemeTypography;
