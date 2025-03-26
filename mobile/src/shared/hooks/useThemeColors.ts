import { useTheme } from '@/shared/context/ThemeContext';
import { useCallback } from 'react';
import { Theme } from '@/shared/theme/types';

/**
 * Hook to get color values from the current theme
 * @returns {Object} Object containing color getter functions
 */
export const useThemeColors = () => {
  const { theme } = useTheme();
  
  const getColor = useCallback((color: keyof Theme['palette'], variant: string = 'main') => {
    if (color in theme.palette) {
      const paletteColor = theme.palette[color as keyof Theme['palette']];
      if (typeof paletteColor === 'object' && variant in paletteColor) {
        return (paletteColor as any)[variant];
      }
    }
    return undefined;
  }, [theme]);
  
  const getPaletteColor = useCallback((colorPath: string) => {
    const parts = colorPath.split('.');
    let result: any = theme.palette;
    
    for (const part of parts) {
      if (result && part in result) {
        result = result[part];
      } else {
        return undefined;
      }
    }
    
    return result;
  }, [theme]);
  
  return {
    getColor,
    getPaletteColor,
    palette: theme.palette,
  };
};

export default useThemeColors;
