import { useTheme } from '../ThemeContext';
import { useCallback } from 'react';

/**
 * Hook to get spacing values from the current theme
 * @returns {Function} Function to get spacing values
 */
export const useThemeSpacing = () => {
  const { theme } = useTheme();
  
  const getSpacing = useCallback((factor: number | string) => {
    if (typeof factor === 'number') {
      return theme.spacing(factor);
    }
    
    // Handle string values like '2' or '0.5'
    const numericValue = parseFloat(factor);
    if (!isNaN(numericValue)) {
      return theme.spacing(numericValue);
    }
    
    return undefined;
  }, [theme]);
  
  return getSpacing;
};

export default useThemeSpacing;
