import { useTheme } from '../ThemeContext';
import { useEffect } from 'react';

/**
 * Hook to sync the theme with the system color scheme
 * @param {boolean} syncWithSystem - Whether to sync with system theme
 * @returns {void}
 */
export const useSystemTheme = (syncWithSystem = true): void => {
  const { setMode } = useTheme();
  
  useEffect(() => {
    if (syncWithSystem) {
      // In a real implementation, we would listen to system theme changes
      // For now, this is a placeholder
      const prefersDarkMode = false; // Would be determined by system
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, [syncWithSystem, setMode]);
};

export default useSystemTheme;
