import { useTheme } from '../ThemeContext';

/**
 * Hook to access the current theme mode and toggle functions
 * @returns {Object} Object containing mode, toggleTheme, and setMode functions
 */
export const useThemeMode = () => {
  const { mode, toggleTheme, setMode } = useTheme();
  
  return {
    mode,
    toggleTheme,
    setMode,
    isDarkMode: mode === 'dark',
    isLightMode: mode === 'light',
  };
};

export default useThemeMode;
