import { useTheme } from '@/shared/context/ThemeContext';
import { useEffect } from 'react';

/**
 * Hook to sync the theme with the system color scheme
 * @param {boolean} syncWithSystem - Whether to sync with system theme
 * @returns {void}
 */
export const useSystemTheme = (syncWithSystem = true): void => {
  const { setThemeMode } = useTheme();
  
  useEffect(() => {
    if (syncWithSystem) {
      // In a real implementation, we would listen to system theme changes
      // For now, this is a placeholder
      const prefersDarkMode = false; // Would be determined by system
      setThemeMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, [syncWithSystem, setThemeMode]);
};

export default useSystemTheme;
