import { useTheme } from '@/shared/context/ThemeContext';
import useThemeColors from '@/shared/hooks/useThemeColors';
import useThemeMode from '@/shared/hooks/useThemeMode';
import useThemeSpacing from '@/shared/hooks/useThemeSpacing';
import useThemeTypography from '@/shared/hooks/useThemeTypography';
import useSystemTheme from '@/shared/hooks/useSystemTheme';

/**
 * Hook that combines all theme hooks into one
 * @returns {Object} Object containing all theme utilities
 */
export const useThemeUtils = () => {
  const themeContext = useTheme();
  const { getColor, getPaletteColor, palette } = useThemeColors();
  const { mode, toggleTheme, setThemeMode, isDarkMode, isLightMode } = useThemeMode();
  const getSpacing = useThemeSpacing();
  const { getTypography, typography } = useThemeTypography();
  
  return {
    theme: themeContext.theme,
    mode,
    toggleTheme,
    setThemeMode,
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
