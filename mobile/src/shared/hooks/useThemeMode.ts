import { useTheme } from '@/shared/context/ThemeContext';

/**
 * Hook to access the current theme mode and toggle functions
 * @returns {Object} Object containing mode, toggleTheme, and setMode functions
 */
export const useThemeMode = () => {
  const { mode, toggleTheme, setThemeMode } = useTheme();
  
  return {
    mode,
    toggleTheme,
    setThemeMode,
    isDarkMode: mode === 'dark',
    isLightMode: mode === 'light',
  };
};

export default useThemeMode;
