import { useTheme } from '../ThemeContext';
import useThemeColors from './useThemeColors';
import useThemeMode from './useThemeMode';
import useThemeSpacing from './useThemeSpacing';
import useThemeTypography from './useThemeTypography';
import useSystemTheme from './useSystemTheme';

/**
 * Hook that combines all theme hooks into one
 * @returns {Object} Object containing all theme utilities
 */
export const useThemeUtils = () => {
  const themeContext = useTheme();
  const { getColor, getPaletteColor, palette } = useThemeColors();
  const { mode, toggleTheme, setMode, isDarkMode, isLightMode } = useThemeMode();
  const getSpacing = useThemeSpacing();
  const { getTypography, typography } = useThemeTypography();
  
  return {
    theme: themeContext.theme,
    mode,
    toggleTheme,
    setMode,
    isDarkMode,
    isLightMode,
    getColor,
    getPaletteColor,
    palette,
    getSpacing,
    getTypography,
    typography,
  };
};

export default useThemeUtils;
